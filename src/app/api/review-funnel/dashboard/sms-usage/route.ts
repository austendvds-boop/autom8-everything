import { and, eq, gt, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfPendingSms, rfReviewRequests, rfSmsUsage } from "@/lib/review-funnel/db/schema"

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
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const [usage, failedRow, successRow] = await Promise.all([
    rfDb.query.rfSmsUsage.findFirst({
      where: and(eq(rfSmsUsage.tenantId, authResult.tenant.id), eq(rfSmsUsage.month, month)),
      columns: {
        count: true,
      },
    }),
    rfDb
      .select({
        count: sql<number>`count(*)`,
      })
      .from(rfPendingSms)
      .innerJoin(rfReviewRequests, eq(rfPendingSms.reviewRequestId, rfReviewRequests.id))
      .where(
        and(
          eq(rfReviewRequests.tenantId, authResult.tenant.id),
          eq(rfPendingSms.status, "failed"),
          gt(rfPendingSms.createdAt, last24Hours),
        ),
      )
      .then((rows) => rows[0]),
    rfDb
      .select({
        count: sql<number>`count(*)`,
      })
      .from(rfPendingSms)
      .innerJoin(rfReviewRequests, eq(rfPendingSms.reviewRequestId, rfReviewRequests.id))
      .where(
        and(
          eq(rfReviewRequests.tenantId, authResult.tenant.id),
          eq(rfPendingSms.status, "sent"),
          gt(rfPendingSms.createdAt, last24Hours),
        ),
      )
      .then((rows) => rows[0]),
  ])

  const used = usage?.count ?? 0
  const unlimited = authResult.tenant.smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL || authResult.tenant.plan === "pro"
  const limit = unlimited ? null : authResult.tenant.smsLimitMonthly
  const percent = !limit || limit <= 0 ? null : Math.min(100, Math.round((used / limit) * 100))
  const failedLast24Hours = Number(failedRow?.count ?? 0)
  const successesLast24Hours = Number(successRow?.count ?? 0)
  const smsHealthy = !(failedLast24Hours > 5 && successesLast24Hours === 0)

  return NextResponse.json({
    month,
    used,
    limit,
    unlimited,
    percent,
    plan: authResult.tenant.plan,
    smsHealthy,
  })
}
