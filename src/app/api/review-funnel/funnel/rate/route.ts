import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfReviewRequests } from "@/lib/review-funnel/db/schema"

const ratePayloadSchema = z.object({
  requestId: z.string().uuid(),
  rating: z.coerce.number().int().min(1).max(5),
  googleReviewClicked: z.boolean().optional(),
})

export const runtime = "nodejs"

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = ratePayloadSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid rating payload",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const existingRequest = await rfDb.query.rfReviewRequests.findFirst({
    where: eq(rfReviewRequests.id, parsed.data.requestId),
    columns: {
      id: true,
      pageOpenedAt: true,
      ratedAt: true,
      googleReviewClicked: true,
    },
  })

  if (!existingRequest) {
    return NextResponse.json({ error: "Review request not found" }, { status: 404 })
  }

  const now = new Date()
  const updateData: {
    rating: number
    ratedAt: Date
    pageOpenedAt: Date
    googleReviewClicked?: boolean
  } = {
    rating: parsed.data.rating,
    ratedAt: existingRequest.ratedAt ?? now,
    pageOpenedAt: existingRequest.pageOpenedAt ?? now,
  }

  if (parsed.data.googleReviewClicked || existingRequest.googleReviewClicked) {
    updateData.googleReviewClicked = true
  }

  const [updatedRequest] = await rfDb
    .update(rfReviewRequests)
    .set(updateData)
    .where(eq(rfReviewRequests.id, existingRequest.id))
    .returning({
      id: rfReviewRequests.id,
      rating: rfReviewRequests.rating,
      ratedAt: rfReviewRequests.ratedAt,
      pageOpenedAt: rfReviewRequests.pageOpenedAt,
      googleReviewClicked: rfReviewRequests.googleReviewClicked,
    })

  return NextResponse.json({
    request: {
      id: updatedRequest.id,
      rating: updatedRequest.rating,
      ratedAt: updatedRequest.ratedAt?.toISOString() ?? null,
      pageOpenedAt: updatedRequest.pageOpenedAt?.toISOString() ?? null,
      googleReviewClicked: updatedRequest.googleReviewClicked,
    },
  })
}
