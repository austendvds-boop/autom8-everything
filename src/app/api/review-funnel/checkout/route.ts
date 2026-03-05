import { NextResponse } from "next/server"
import { z } from "zod"
import { createCheckoutSession, type CreateCheckoutSessionParams } from "@/lib/review-funnel/services/stripe"

const checkoutRequestSchema = z.object({
  email: z.string().trim().email(),
  businessName: z.string().trim().min(1).max(255),
  ownerName: z.string().trim().min(1).max(255),
  ownerPhone: z.string().trim().min(1).max(32),
  plan: z.enum(["starter", "growth", "pro"]),
  googlePlaceId: z.string().trim().min(1).max(255),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function toCheckoutParams(parsed: z.infer<typeof checkoutRequestSchema>): CreateCheckoutSessionParams {
  return {
    email: parsed.email,
    businessName: parsed.businessName,
    ownerName: parsed.ownerName,
    ownerPhone: parsed.ownerPhone,
    plan: parsed.plan,
    googlePlaceId: parsed.googlePlaceId,
  }
}

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = checkoutRequestSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid checkout payload",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  try {
    const session = await createCheckoutSession(toCheckoutParams(parsed.data))

    return NextResponse.json({
      sessionId: session.sessionId,
      url: session.url,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create Stripe Checkout session"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
