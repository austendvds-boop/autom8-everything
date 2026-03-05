import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfReviewRequests, rfTenants } from "@/lib/review-funnel/db/schema"

const feedbackPayloadSchema = z.object({
  requestId: z.string().uuid(),
  feedbackText: z.string().trim().min(1).max(2000),
})

export const runtime = "nodejs"

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = feedbackPayloadSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid feedback payload",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const [reviewRecord] = await rfDb
    .select({
      requestId: rfReviewRequests.id,
      rating: rfReviewRequests.rating,
      ratedAt: rfReviewRequests.ratedAt,
      pageOpenedAt: rfReviewRequests.pageOpenedAt,
      promoOffer: rfTenants.promoOffer,
      promoCode: rfTenants.promoCode,
    })
    .from(rfReviewRequests)
    .innerJoin(rfTenants, eq(rfReviewRequests.tenantId, rfTenants.id))
    .where(eq(rfReviewRequests.id, parsed.data.requestId))
    .limit(1)

  if (!reviewRecord) {
    return NextResponse.json({ error: "Review request not found" }, { status: 404 })
  }

  if (!reviewRecord.rating) {
    return NextResponse.json({ error: "Please submit a rating before feedback" }, { status: 400 })
  }

  if (reviewRecord.rating === 5) {
    return NextResponse.json({ error: "Feedback is only collected for 1-4 star ratings" }, { status: 400 })
  }

  const now = new Date()

  const [updated] = await rfDb
    .update(rfReviewRequests)
    .set({
      feedbackText: parsed.data.feedbackText,
      promoShown: true,
      ratedAt: reviewRecord.ratedAt ?? now,
      pageOpenedAt: reviewRecord.pageOpenedAt ?? now,
    })
    .where(eq(rfReviewRequests.id, reviewRecord.requestId))
    .returning({
      id: rfReviewRequests.id,
      feedbackText: rfReviewRequests.feedbackText,
      promoShown: rfReviewRequests.promoShown,
      rating: rfReviewRequests.rating,
    })

  return NextResponse.json({
    request: {
      id: updated.id,
      rating: updated.rating,
      feedbackText: updated.feedbackText,
      promoShown: updated.promoShown,
    },
    promo: {
      offer: reviewRecord.promoOffer,
      code: reviewRecord.promoCode,
    },
  })
}
