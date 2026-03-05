import { and, desc, eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfCalendarWatches, rfGoogleOauthTokens, rfReviewRequests } from "@/lib/review-funnel/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function toNumber(value: number | string | null | undefined): number {
  if (typeof value === "number") {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const [aggregate] = await rfDb
    .select({
      totalRequests: sql<number>`count(*)`,
      totalRated: sql<number>`count(${rfReviewRequests.rating})`,
      averageRating: sql<string | null>`avg(${rfReviewRequests.rating})`,
      fiveStarCount: sql<number>`count(*) filter (where ${rfReviewRequests.rating} = 5)`,
      smsSentCount: sql<number>`count(*) filter (where ${rfReviewRequests.smsSentAt} is not null)`,
      pageOpenedCount: sql<number>`count(*) filter (where ${rfReviewRequests.pageOpenedAt} is not null)`,
    })
    .from(rfReviewRequests)
    .where(eq(rfReviewRequests.tenantId, authResult.tenant.id))

  const recentReviews = await rfDb.query.rfReviewRequests.findMany({
    where: eq(rfReviewRequests.tenantId, authResult.tenant.id),
    columns: {
      id: true,
      customerName: true,
      rating: true,
      smsStatus: true,
      pageOpenedAt: true,
      appointmentEnd: true,
    },
    orderBy: [desc(rfReviewRequests.createdAt)],
    limit: 10,
  })

  const oauthToken = await rfDb.query.rfGoogleOauthTokens.findFirst({
    where: eq(rfGoogleOauthTokens.tenantId, authResult.tenant.id),
    columns: {
      googleEmail: true,
    },
  })

  const [watchCountRow] = await rfDb
    .select({
      count: sql<number>`count(*)`,
    })
    .from(rfCalendarWatches)
    .where(and(eq(rfCalendarWatches.tenantId, authResult.tenant.id), eq(rfCalendarWatches.isActive, true)))

  const totalRated = toNumber(aggregate?.totalRated)
  const averageRating = toNumber(aggregate?.averageRating)
  const fiveStarCount = toNumber(aggregate?.fiveStarCount)
  const smsSentCount = toNumber(aggregate?.smsSentCount)
  const pageOpenedCount = toNumber(aggregate?.pageOpenedCount)
  const conversionRate = smsSentCount > 0 ? (totalRated / smsSentCount) * 100 : 0

  return NextResponse.json({
    stats: {
      totalReviews: totalRated,
      averageRating,
      fiveStarCount,
      conversionRate,
      smsSentCount,
      pageOpenedCount,
      ratedCount: totalRated,
      totalRequests: toNumber(aggregate?.totalRequests),
    },
    calendar: {
      connected: Boolean(oauthToken),
      googleEmail: oauthToken?.googleEmail ?? null,
      activeWatchCount: toNumber(watchCountRow?.count),
    },
    recentReviews: recentReviews.map((review) => ({
      id: review.id,
      customerName: review.customerName,
      rating: review.rating,
      smsStatus: review.smsStatus,
      pageOpenedAt: review.pageOpenedAt?.toISOString() ?? null,
      appointmentEnd: review.appointmentEnd.toISOString(),
    })),
  })
}
