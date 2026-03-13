import { and, desc, eq, gt, isNull } from "drizzle-orm"
import { NextResponse } from "next/server"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfConsentLog, rfReviewRequests, rfTenants } from "@/lib/review-funnel/db/schema"
import { checkMonthlyLimit, handleOptOut, incrementUsage } from "@/lib/review-funnel/services/sms"
import { normalizePhone } from "@/lib/review-funnel/utils/phone"

const DEFAULT_PROMO_REPLY_TEMPLATE =
  "We appreciate your feedback. We'd love to make it right — here's {code} for your next visit."
const HELP_KEYWORDS = new Set(["help", "info"])
const OPT_OUT_KEYWORDS = new Set(["stop", "stopall", "unsubscribe", "cancel", "end", "quit"])
const RATING_REPLY_PATTERN = /^[1-5]$/

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function asTrimmedString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : ""
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

function twiml(message?: string): NextResponse {
  const body = message
    ? `<Response><Message>${escapeXml(message)}</Message></Response>`
    : "<Response></Response>"

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  })
}

function isHelpMessage(messageBody: string): boolean {
  const normalized = messageBody.trim().toLowerCase()

  if (!normalized) {
    return false
  }

  const firstWord = normalized.split(/\s+/)[0] ?? ""
  return HELP_KEYWORDS.has(firstWord)
}

function isOptOutMessage(messageBody: string): boolean {
  const normalized = messageBody.trim().toLowerCase()

  if (!normalized) {
    return false
  }

  const firstWord = normalized.split(/\s+/)[0] ?? ""
  return OPT_OUT_KEYWORDS.has(firstWord)
}

function parseRatingReply(messageBody: string): number | null {
  const normalized = messageBody.trim()

  if (!RATING_REPLY_PATTERN.test(normalized)) {
    return null
  }

  return Number.parseInt(normalized, 10)
}

function interpolatePromoMessage(template: string | null, promoCode: string | null): string {
  const messageTemplate = template?.trim() || DEFAULT_PROMO_REPLY_TEMPLATE
  const normalizedPromoCode = promoCode?.trim() || null

  if (normalizedPromoCode) {
    return messageTemplate.replaceAll("{code}", normalizedPromoCode)
  }

  return messageTemplate
    .replace(/\s*[—-]\s*here's\s*\{code\}/gi, "")
    .replaceAll("{code}", "")
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim()
}

async function findLatestTenantIdByPhone(phone: string | null): Promise<string | null> {
  if (!phone) {
    return null
  }

  const latestRequest = await rfDb.query.rfReviewRequests.findFirst({
    where: eq(rfReviewRequests.customerPhone, phone),
    columns: {
      tenantId: true,
    },
    orderBy: [desc(rfReviewRequests.createdAt)],
  })

  return latestRequest?.tenantId ?? null
}

async function twimlWithUsage(message: string | undefined, tenantId?: string | null): Promise<NextResponse> {
  if (message && tenantId) {
    await incrementUsage(tenantId)
  }

  return twiml(message)
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const from = asTrimmedString(formData.get("From"))
  const body = asTrimmedString(formData.get("Body"))

  if (!from) {
    return twiml()
  }

  const normalizedPhone = normalizePhone(from)

  if (isOptOutMessage(body)) {
    await handleOptOut(from)

    await rfDb.insert(rfConsentLog).values({
      phone: normalizedPhone || from,
      tenantId: null,
      consentType: "opt_out",
      source: "twilio_inbound",
    })

    if (normalizedPhone) {
      await rfDb
        .update(rfReviewRequests)
        .set({
          smsStatus: "opted_out",
        })
        .where(eq(rfReviewRequests.customerPhone, normalizedPhone))
    }

    const tenantId = await findLatestTenantIdByPhone(normalizedPhone)
    return twimlWithUsage("You have been unsubscribed and will no longer receive review requests.", tenantId)
  }

  if (isHelpMessage(body)) {
    const tenantId = await findLatestTenantIdByPhone(normalizedPhone)
    return twimlWithUsage(
      "For help with review requests, contact the business that texted you. To stop messages, reply STOP.",
      tenantId,
    )
  }

  const rating = parseRatingReply(body)

  if (rating !== null) {
    if (!normalizedPhone) {
      return twiml()
    }

    const now = new Date()
    const [reviewRequest] = await rfDb
      .select({
        id: rfReviewRequests.id,
        tenantId: rfReviewRequests.tenantId,
        gmbLinkSent: rfReviewRequests.gmbLinkSent,
        gmbReviewUrl: rfTenants.gmbReviewUrl,
        promoMessage: rfTenants.promoMessage,
        promoCode: rfTenants.promoCode,
      })
      .from(rfReviewRequests)
      .innerJoin(rfTenants, eq(rfReviewRequests.tenantId, rfTenants.id))
      .where(
        and(
          eq(rfReviewRequests.customerPhone, normalizedPhone),
          gt(rfReviewRequests.expiresAt, now),
          isNull(rfReviewRequests.smsReplyRating),
          eq(rfTenants.isActive, true),
        ),
      )
      .orderBy(desc(rfReviewRequests.createdAt))
      .limit(1)

    if (!reviewRequest) {
      return twiml()
    }

    if (reviewRequest.gmbLinkSent && rating === 5) {
      return twiml()
    }

    await rfDb
      .update(rfReviewRequests)
      .set({
        smsReplyRating: rating,
        smsReplyReceivedAt: now,
        rating,
        ratedAt: now,
      })
      .where(eq(rfReviewRequests.id, reviewRequest.id))

    const monthlyLimit = await checkMonthlyLimit(reviewRequest.tenantId)
    if (!monthlyLimit.allowed) {
      return twiml()
    }

    if (rating === 5) {
      await rfDb
        .update(rfReviewRequests)
        .set({
          gmbLinkSent: true,
        })
        .where(eq(rfReviewRequests.id, reviewRequest.id))

      return twimlWithUsage(
        `Thank you! We'd love a Google review: ${reviewRequest.gmbReviewUrl}`,
        reviewRequest.tenantId,
      )
    }

    await rfDb
      .update(rfReviewRequests)
      .set({
        promoShown: true,
      })
      .where(eq(rfReviewRequests.id, reviewRequest.id))

    return twimlWithUsage(
      interpolatePromoMessage(reviewRequest.promoMessage, reviewRequest.promoCode),
      reviewRequest.tenantId,
    )
  }

  const tenantId = await findLatestTenantIdByPhone(normalizedPhone)
  return twimlWithUsage("Please reply with a number 1-5 to rate your experience.", tenantId)
}
