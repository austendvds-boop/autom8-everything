import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfReviewRequests } from "@/lib/review-funnel/db/schema"
import { handleOptOut } from "@/lib/review-funnel/services/sms"
import { normalizePhone } from "@/lib/review-funnel/utils/phone"

const OPT_OUT_KEYWORDS = new Set(["stop", "stopall", "unsubscribe", "cancel", "end", "quit"])

export const dynamic = "force-dynamic"

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

function isOptOutMessage(messageBody: string): boolean {
  const normalized = messageBody.trim().toLowerCase()

  if (!normalized) {
    return false
  }

  const firstWord = normalized.split(/\s+/)[0] ?? ""
  return OPT_OUT_KEYWORDS.has(firstWord)
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const from = asTrimmedString(formData.get("From"))
  const body = asTrimmedString(formData.get("Body"))

  if (!from || !isOptOutMessage(body)) {
    return twiml()
  }

  await handleOptOut(from)

  const normalizedPhone = normalizePhone(from)
  if (normalizedPhone) {
    await rfDb
      .update(rfReviewRequests)
      .set({
        smsStatus: "opted_out",
      })
      .where(eq(rfReviewRequests.customerPhone, normalizedPhone))
  }

  return twiml("You have been unsubscribed and will no longer receive review requests.")
}
