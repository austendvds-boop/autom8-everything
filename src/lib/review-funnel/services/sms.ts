import twilio, { type Twilio } from "twilio"
import { and, eq, sql } from "drizzle-orm"
import { reviewFunnelConfig } from "../config"
import { rfDb } from "../db/client"
import { rfLocations, rfReviewRequests, rfSmsOptOuts, rfSmsUsage, rfTenants } from "../db/schema"
import { normalizePhone } from "../utils/phone"

const DEFAULT_REVIEW_SMS_TEMPLATE =
  "Hi {customer_name}! Thanks for choosing {business_name}. We'd love your feedback — it takes 30 seconds: {funnel_url}\n\nReply STOP to opt out."
const PRO_SMS_LIMIT_SENTINEL = 999_999

let cachedTwilioClient: Twilio | null = null

export interface SmsTemplateVars {
  customer_name: string
  business_name: string
  funnel_url: string
}

export interface MonthlyLimitCheck {
  allowed: boolean
  used: number
  limit: number | null
}

export type SmsSendResult =
  | { status: "sent"; sid: string }
  | { status: "quiet_hours"; sendAfter: Date }
  | { status: "opted_out" }
  | { status: "limit_reached"; used: number; limit: number | null }
  | { status: "no_phone" }

function getTwilioClient(): Twilio {
  if (cachedTwilioClient) {
    return cachedTwilioClient
  }

  const accountSid = reviewFunnelConfig.TWILIO_ACCOUNT_SID?.trim()
  const authToken = reviewFunnelConfig.TWILIO_AUTH_TOKEN?.trim()

  if (!accountSid || !authToken) {
    throw new Error("Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN")
  }

  cachedTwilioClient = twilio(accountSid, authToken)
  return cachedTwilioClient
}

function getUsageMonth(date = new Date()): string {
  return date.toISOString().slice(0, 7)
}

function isWithinQuietHours(date: Date, quietStartHour: number, quietEndHour: number): boolean {
  if (quietStartHour === quietEndHour) {
    return false
  }

  const hour = date.getHours()

  if (quietStartHour < quietEndHour) {
    return hour >= quietStartHour && hour < quietEndHour
  }

  return hour >= quietStartHour || hour < quietEndHour
}

export function getNextAllowedSendTime(date: Date): Date {
  const quietStartHour = reviewFunnelConfig.RF_QUIET_HOURS_START
  const quietEndHour = reviewFunnelConfig.RF_QUIET_HOURS_END

  if (!isWithinQuietHours(date, quietStartHour, quietEndHour)) {
    return date
  }

  const next = new Date(date)
  next.setMinutes(0, 0, 0)

  if (quietStartHour < quietEndHour) {
    if (date.getHours() >= quietStartHour) {
      next.setDate(next.getDate() + 1)
    }
  } else if (date.getHours() >= quietStartHour) {
    next.setDate(next.getDate() + 1)
  }

  next.setHours(quietEndHour, 0, 0, 0)
  return next
}

export function interpolateTemplate(template: string, vars: SmsTemplateVars): string {
  return template.replace(/\{(customer_name|business_name|funnel_url)\}/g, (_, key: keyof SmsTemplateVars) => {
    return vars[key] ?? ""
  })
}

export async function checkOptOut(phone: string): Promise<boolean> {
  const normalizedPhone = normalizePhone(phone)

  if (!normalizedPhone) {
    return false
  }

  const record = await rfDb.query.rfSmsOptOuts.findFirst({
    where: eq(rfSmsOptOuts.phone, normalizedPhone),
    columns: { id: true },
  })

  return Boolean(record)
}

export async function checkMonthlyLimit(tenantId: string): Promise<MonthlyLimitCheck> {
  const tenant = await rfDb.query.rfTenants.findFirst({
    where: eq(rfTenants.id, tenantId),
    columns: {
      plan: true,
      smsLimitMonthly: true,
    },
  })

  if (!tenant) {
    throw new Error(`Review Funnel tenant not found: ${tenantId}`)
  }

  if (tenant.plan === "pro" || tenant.smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL) {
    return {
      allowed: true,
      used: 0,
      limit: null,
    }
  }

  const month = getUsageMonth()
  const usage = await rfDb.query.rfSmsUsage.findFirst({
    where: and(eq(rfSmsUsage.tenantId, tenantId), eq(rfSmsUsage.month, month)),
    columns: { count: true },
  })

  const used = usage?.count ?? 0
  const limit = tenant.smsLimitMonthly

  return {
    allowed: used < limit,
    used,
    limit,
  }
}

export async function incrementUsage(tenantId: string): Promise<void> {
  const month = getUsageMonth()

  await rfDb
    .insert(rfSmsUsage)
    .values({
      tenantId,
      month,
      count: 1,
    })
    .onConflictDoUpdate({
      target: [rfSmsUsage.tenantId, rfSmsUsage.month],
      set: {
        count: sql`${rfSmsUsage.count} + 1`,
      },
    })
}

export async function handleOptOut(phone: string): Promise<boolean> {
  const normalizedPhone = normalizePhone(phone)

  if (!normalizedPhone) {
    return false
  }

  await rfDb
    .insert(rfSmsOptOuts)
    .values({
      phone: normalizedPhone,
    })
    .onConflictDoNothing({
      target: rfSmsOptOuts.phone,
    })

  return true
}

export async function sendReviewRequest(reviewRequestId: string): Promise<SmsSendResult> {
  const reviewRequest = await rfDb.query.rfReviewRequests.findFirst({
    where: eq(rfReviewRequests.id, reviewRequestId),
    columns: {
      id: true,
      tenantId: true,
      locationId: true,
      customerName: true,
      customerPhone: true,
    },
  })

  if (!reviewRequest) {
    throw new Error(`Review request not found: ${reviewRequestId}`)
  }

  const tenant = await rfDb.query.rfTenants.findFirst({
    where: and(eq(rfTenants.id, reviewRequest.tenantId), eq(rfTenants.isActive, true)),
    columns: {
      id: true,
      businessName: true,
      smsTemplate: true,
      smsSenderNumber: true,
    },
  })

  if (!tenant) {
    throw new Error(`Active tenant not found for review request: ${reviewRequestId}`)
  }

  const location = reviewRequest.locationId
    ? await rfDb.query.rfLocations.findFirst({
        where: and(eq(rfLocations.id, reviewRequest.locationId), eq(rfLocations.tenantId, tenant.id)),
        columns: {
          smsSenderNumber: true,
        },
      })
    : null

  const toPhone = normalizePhone(reviewRequest.customerPhone)

  if (!toPhone) {
    await rfDb
      .update(rfReviewRequests)
      .set({
        smsStatus: "no_phone",
      })
      .where(eq(rfReviewRequests.id, reviewRequest.id))

    return { status: "no_phone" }
  }

  const now = new Date()
  const nextAllowedSendTime = getNextAllowedSendTime(now)

  if (nextAllowedSendTime.getTime() !== now.getTime()) {
    return {
      status: "quiet_hours",
      sendAfter: nextAllowedSendTime,
    }
  }

  const optedOut = await checkOptOut(toPhone)

  if (optedOut) {
    await rfDb
      .update(rfReviewRequests)
      .set({
        smsStatus: "opted_out",
      })
      .where(eq(rfReviewRequests.id, reviewRequest.id))

    return { status: "opted_out" }
  }

  const monthlyLimit = await checkMonthlyLimit(tenant.id)

  if (!monthlyLimit.allowed) {
    await rfDb
      .update(rfReviewRequests)
      .set({
        smsStatus: "limit_reached",
      })
      .where(eq(rfReviewRequests.id, reviewRequest.id))

    return {
      status: "limit_reached",
      used: monthlyLimit.used,
      limit: monthlyLimit.limit,
    }
  }

  const senderNumber =
    location?.smsSenderNumber?.trim() ||
    tenant.smsSenderNumber?.trim() ||
    reviewFunnelConfig.RF_TWILIO_PHONE_NUMBER?.trim() ||
    undefined

  const messagingServiceSid = reviewFunnelConfig.RF_TWILIO_MESSAGING_SERVICE_SID?.trim() || undefined

  if (!senderNumber && !messagingServiceSid) {
    throw new Error("Missing SMS sender configuration (RF_TWILIO_PHONE_NUMBER or RF_TWILIO_MESSAGING_SERVICE_SID)")
  }

  const template = tenant.smsTemplate?.trim() || DEFAULT_REVIEW_SMS_TEMPLATE
  const funnelUrl = new URL(`/r/${reviewRequest.id}`, reviewFunnelConfig.NEXT_PUBLIC_SITE_URL).toString()
  const messageBody = interpolateTemplate(template, {
    customer_name: reviewRequest.customerName?.trim() || "there",
    business_name: tenant.businessName,
    funnel_url: funnelUrl,
  })

  const statusCallback = new URL(
    "/api/review-funnel/webhooks/twilio/status",
    reviewFunnelConfig.NEXT_PUBLIC_SITE_URL,
  ).toString()

  const messagePayload: {
    to: string
    body: string
    statusCallback: string
    from?: string
    messagingServiceSid?: string
  } = {
    to: toPhone,
    body: messageBody,
    statusCallback,
    ...(senderNumber ? { from: senderNumber } : {}),
    ...(!senderNumber && messagingServiceSid ? { messagingServiceSid } : {}),
  }

  const message = await getTwilioClient().messages.create(messagePayload)

  await rfDb
    .update(rfReviewRequests)
    .set({
      smsStatus: "sent",
      smsSentAt: now,
      smsSid: message.sid,
    })
    .where(eq(rfReviewRequests.id, reviewRequest.id))

  await incrementUsage(tenant.id)

  return {
    status: "sent",
    sid: message.sid,
  }
}
