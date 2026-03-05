import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfSmsUsage } from "@/lib/review-funnel/db/schema"

const PRO_SMS_LIMIT_SENTINEL = 999_999

function usageMonth(date = new Date()): string {
  return date.toISOString().slice(0, 7)
}

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const month = usageMonth()

  const usage = await rfDb.query.rfSmsUsage.findFirst({
    where: and(eq(rfSmsUsage.tenantId, authResult.tenant.id), eq(rfSmsUsage.month, month)),
    columns: {
      count: true,
    },
  })

  return NextResponse.json({
    tenantId: authResult.tenant.id,
    plan: authResult.tenant.plan,
    planAmountMonthlyUsd:
      authResult.tenant.plan === "starter"
        ? 79
        : authResult.tenant.plan === "growth"
          ? 129
          : authResult.tenant.plan === "pro"
            ? 199
            : null,
    isActive: authResult.tenant.isActive,
    stripeCustomerId: authResult.tenant.stripeCustomerId,
    stripeSubscriptionId: authResult.tenant.stripeSubscriptionId,
    smsLimitMonthly:
      authResult.tenant.smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL
        ? null
        : authResult.tenant.smsLimitMonthly,
    smsLimitUnlimited: authResult.tenant.smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL,
    smsUsedThisMonth: usage?.count ?? 0,
    usageMonth: month,
  })
}
