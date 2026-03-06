import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfLocations, rfReviewRequests, rfTenants } from "@/lib/review-funnel/db/schema"

const paramsSchema = z.object({
  requestId: z.string().uuid(),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function sanitizeHexColor(color: string | null, fallback: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(color ?? "") ? (color as string) : fallback
}

export async function GET(_request: Request, { params }: { params: Promise<{ requestId: string }> }) {
  const parsedParams = paramsSchema.safeParse(await params)

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid review request id" }, { status: 400 })
  }

  const { requestId } = parsedParams.data

  const [record] = await rfDb
    .select({
      requestId: rfReviewRequests.id,
      customerName: rfReviewRequests.customerName,
      pageOpenedAt: rfReviewRequests.pageOpenedAt,
      rating: rfReviewRequests.rating,
      ratedAt: rfReviewRequests.ratedAt,
      googleReviewClicked: rfReviewRequests.googleReviewClicked,
      feedbackText: rfReviewRequests.feedbackText,

      businessName: rfTenants.businessName,
      logoUrl: rfTenants.logoUrl,
      primaryColor: rfTenants.primaryColor,
      accentColor: rfTenants.accentColor,
      promoOffer: rfTenants.promoOffer,
      promoCode: rfTenants.promoCode,
      tenantGmbReviewUrl: rfTenants.gmbReviewUrl,
      yelpReviewUrl: rfTenants.yelpReviewUrl,
      reviewPlatform: rfTenants.reviewPlatform,
      locationGmbReviewUrl: rfLocations.gmbReviewUrl,
    })
    .from(rfReviewRequests)
    .innerJoin(rfTenants, eq(rfReviewRequests.tenantId, rfTenants.id))
    .leftJoin(rfLocations, eq(rfReviewRequests.locationId, rfLocations.id))
    .where(and(eq(rfReviewRequests.id, requestId), eq(rfTenants.isActive, true)))
    .limit(1)

  if (!record) {
    return NextResponse.json({ error: "Review request not found" }, { status: 404 })
  }

  const pageOpenedAt = record.pageOpenedAt ?? new Date()

  if (!record.pageOpenedAt) {
    await rfDb
      .update(rfReviewRequests)
      .set({
        pageOpenedAt,
      })
      .where(eq(rfReviewRequests.id, record.requestId))
  }

  return NextResponse.json({
    request: {
      id: record.requestId,
      customerName: record.customerName,
      pageOpenedAt: pageOpenedAt.toISOString(),
      rating: record.rating,
      ratedAt: record.ratedAt?.toISOString() ?? null,
      googleReviewClicked: record.googleReviewClicked,
      feedbackText: record.feedbackText,
      feedbackSubmitted: Boolean(record.feedbackText?.trim()),
    },
    tenant: {
      businessName: record.businessName,
      logoUrl: record.logoUrl,
      primaryColor: sanitizeHexColor(record.primaryColor, "#8B5CF6"),
      accentColor: sanitizeHexColor(record.accentColor, "#06B6D4"),
      promoOffer: record.promoOffer,
      promoCode: record.promoCode,
      gmbReviewUrl: record.locationGmbReviewUrl ?? record.tenantGmbReviewUrl,
      yelpReviewUrl: record.yelpReviewUrl,
      reviewPlatform: record.reviewPlatform,
    },
  })
}
