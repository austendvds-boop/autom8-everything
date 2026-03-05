import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfSmsUsage } from "@/lib/review-funnel/db/schema"

const PRO_SMS_LIMIT_SENTINEL = 999_999

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getUsageMonth(date = new Date()): string {
  return date.toISOString().slice(0, 7)
}

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const month = getUsageMonth()

  const usage = await rfDb.query.rfSmsUsage.findFirst({
    where: and(eq(rfSmsUsage.tenantId, authResult.tenant.id), eq(rfSmsUsage.month, month)),
    columns: {
      count: true,
    },
  })

  const used = usage?.count ?? 0
  const unlimited = authResult.tenant.smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL || authResult.tenant.plan === "pro"
  const limit = unlimited ? null : authResult.tenant.smsLimitMonthly
  const percent = !limit || limit <= 0 ? null : Math.min(100, Math.round((used / limit) * 100))

  return NextResponse.json({
    month,
    used,
    limit,
    unlimited,
    percent,
    plan: authResult.tenant.plan,
  })
}
