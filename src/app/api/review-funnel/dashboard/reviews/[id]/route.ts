import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfLocations, rfReviewRequests } from "@/lib/review-funnel/db/schema"

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 })
  }

  const reviewId = parsedParams.data.id

  const [record] = await rfDb
    .select({
      id: rfReviewRequests.id,
      customerName: rfReviewRequests.customerName,
      customerPhone: rfReviewRequests.customerPhone,
      customerEmail: rfReviewRequests.customerEmail,
      rating: rfReviewRequests.rating,
      feedbackText: rfReviewRequests.feedbackText,
      smsStatus: rfReviewRequests.smsStatus,
      smsSentAt: rfReviewRequests.smsSentAt,
      smsScheduledAt: rfReviewRequests.smsScheduledAt,
      smsSid: rfReviewRequests.smsSid,
      pageOpenedAt: rfReviewRequests.pageOpenedAt,
      appointmentEnd: rfReviewRequests.appointmentEnd,
      promoShown: rfReviewRequests.promoShown,
      promoRedeemed: rfReviewRequests.promoRedeemed,
      createdAt: rfReviewRequests.createdAt,
      locationName: rfLocations.name,
    })
    .from(rfReviewRequests)
    .leftJoin(rfLocations, eq(rfReviewRequests.locationId, rfLocations.id))
    .where(and(eq(rfReviewRequests.id, reviewId), eq(rfReviewRequests.tenantId, authResult.tenant.id)))
    .limit(1)

  if (!record) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  }

  return NextResponse.json({
    review: {
      id: record.id,
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      customerEmail: record.customerEmail,
      rating: record.rating,
      feedbackText: record.feedbackText,
      smsStatus: record.smsStatus,
      smsSentAt: record.smsSentAt?.toISOString() ?? null,
      smsScheduledAt: record.smsScheduledAt?.toISOString() ?? null,
      smsSid: record.smsSid,
      pageOpenedAt: record.pageOpenedAt?.toISOString() ?? null,
      appointmentEnd: record.appointmentEnd.toISOString(),
      promoShown: record.promoShown,
      promoRedeemed: record.promoRedeemed,
      createdAt: record.createdAt.toISOString(),
      locationName: record.locationName,
    },
  })
}
