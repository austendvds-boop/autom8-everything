import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { reviewFunnelConfig } from "@/lib/review-funnel/config"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfTenants } from "@/lib/review-funnel/db/schema"

const DEFAULT_SMS_TEMPLATE =
  "Hi {customer_name}! Thanks for choosing {business_name}. We'd love your feedback — it takes 30 seconds: {funnel_url}\\n\\nReply STOP to opt out."

const smsPatchSchema = z
  .object({
    smsTemplate: z.string().trim().min(1).max(2000).optional(),
    smsDelayMinutes: z.coerce.number().int().min(0).max(1440).optional(),
  })
  .strict()

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  return NextResponse.json({
    smsTemplate: authResult.tenant.smsTemplate ?? DEFAULT_SMS_TEMPLATE,
    smsDelayMinutes: authResult.tenant.smsDelayMinutes,
    quietHours: {
      start: reviewFunnelConfig.RF_QUIET_HOURS_START,
      end: reviewFunnelConfig.RF_QUIET_HOURS_END,
    },
  })
}

export async function PATCH(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = smsPatchSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid SMS settings payload",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const payload = parsed.data
  const hasOwn = (key: keyof typeof payload) => Object.prototype.hasOwnProperty.call(payload, key)

  const updateData: {
    smsTemplate?: string | null
    smsDelayMinutes?: number
    updatedAt: Date
  } = {
    updatedAt: new Date(),
  }

  if (hasOwn("smsTemplate")) {
    updateData.smsTemplate = payload.smsTemplate ?? null
  }

  if (hasOwn("smsDelayMinutes") && payload.smsDelayMinutes !== undefined) {
    updateData.smsDelayMinutes = payload.smsDelayMinutes
  }

  if (Object.keys(updateData).length === 1) {
    return NextResponse.json({ error: "No SMS fields provided" }, { status: 400 })
  }

  const [updated] = await rfDb
    .update(rfTenants)
    .set(updateData)
    .where(eq(rfTenants.id, authResult.tenant.id))
    .returning({
      smsTemplate: rfTenants.smsTemplate,
      smsDelayMinutes: rfTenants.smsDelayMinutes,
    })

  return NextResponse.json({
    smsTemplate: updated.smsTemplate ?? DEFAULT_SMS_TEMPLATE,
    smsDelayMinutes: updated.smsDelayMinutes,
    quietHours: {
      start: reviewFunnelConfig.RF_QUIET_HOURS_START,
      end: reviewFunnelConfig.RF_QUIET_HOURS_END,
    },
  })
}
