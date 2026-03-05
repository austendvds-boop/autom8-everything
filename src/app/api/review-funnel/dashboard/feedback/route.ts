import { and, desc, eq, gte, lte, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfReviewRequests } from "@/lib/review-funnel/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const items = await rfDb.query.rfReviewRequests.findMany({
    where: and(
      eq(rfReviewRequests.tenantId, authResult.tenant.id),
      gte(rfReviewRequests.rating, 1),
      lte(rfReviewRequests.rating, 4),
      sql`length(trim(coalesce(${rfReviewRequests.feedbackText}, ''))) > 0`,
    ),
    columns: {
      id: true,
      customerName: true,
      rating: true,
      feedbackText: true,
      promoShown: true,
      promoRedeemed: true,
      ratedAt: true,
      createdAt: true,
    },
    orderBy: [desc(rfReviewRequests.ratedAt), desc(rfReviewRequests.createdAt)],
    limit: 500,
  })

  return NextResponse.json({
    items: items.map((item) => ({
      id: item.id,
      customerName: item.customerName,
      rating: item.rating ?? 0,
      feedbackText: item.feedbackText ?? "",
      promoShown: item.promoShown,
      promoRedeemed: item.promoRedeemed,
      ratedAt: item.ratedAt?.toISOString() ?? item.createdAt.toISOString(),
    })),
    totalItems: items.length,
  })
}
