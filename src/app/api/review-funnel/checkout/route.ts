import { NextResponse } from "next/server"
import { z } from "zod"

const checkoutRequestSchema = z.object({
  email: z.string().trim().email(),
  businessName: z.string().trim().min(1).max(255),
  ownerName: z.string().trim().min(1).max(255),
  ownerPhone: z.string().trim().min(1).max(32),
  plan: z.enum(["starter", "growth"]),
  googlePlaceId: z.string().trim().min(1).max(255),
  primaryColor: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .optional(),
  promoOffer: z.string().trim().min(1).max(500).optional(),
})

type CheckoutRequest = z.infer<typeof checkoutRequestSchema>

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function toCheckoutParams(parsed: CheckoutRequest) {
  return {
    email: parsed.email,
    businessName: parsed.businessName,
    ownerName: parsed.ownerName,
    ownerPhone: parsed.ownerPhone,
    plan: parsed.plan,
    googlePlaceId: parsed.googlePlaceId,
    primaryColor: parsed.primaryColor,
    promoOffer: parsed.promoOffer,
  }
}

function toCheckoutErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.trim()

    if (
      message.includes("DATABASE_URL") ||
      message.includes("RF_ENCRYPTION_KEY") ||
      message.includes("RF_JWT_SECRET")
    ) {
      return "Review Funnel checkout is not configured yet."
    }

    if (message.length > 0) {
      return message
    }
  }

  return "Failed to create Stripe Checkout session"
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
    const { createCheckoutSession } = await import("@/lib/review-funnel/services/stripe")
    const session = await createCheckoutSession(toCheckoutParams(parsed.data))

    return NextResponse.json({
      sessionId: session.sessionId,
      url: session.url,
    })
  } catch (error) {
    return NextResponse.json({ error: toCheckoutErrorMessage(error) }, { status: 500 })
  }
}
