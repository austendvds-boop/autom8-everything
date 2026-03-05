import { NextResponse } from "next/server"
import { constructStripeWebhookEvent, handleWebhookEvent } from "@/lib/review-funnel/services/stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")?.trim()

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  const payload = await request.text()

  let event
  try {
    event = constructStripeWebhookEvent(payload, signature)
  } catch {
    return NextResponse.json({ error: "Invalid Stripe webhook signature" }, { status: 400 })
  }

  try {
    await handleWebhookEvent(event)
    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to process Stripe webhook"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
