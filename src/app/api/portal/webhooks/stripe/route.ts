import { NextResponse } from "next/server"
import Stripe from "stripe"
import { handlePortalWebhookEvent } from "@/lib/platform/services/stripe-portal"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

let cachedStripeClient: Stripe | null = null

function getStripe(): Stripe {
  if (cachedStripeClient) {
    return cachedStripeClient
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim()

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }

  cachedStripeClient = new Stripe(secretKey, {
    apiVersion: "2025-02-24.acacia",
  })

  return cachedStripeClient
}

export async function POST(request: Request) {
  try {
    const webhookSecret = process.env.PORTAL_STRIPE_WEBHOOK_SECRET?.trim()

    if (!webhookSecret) {
      console.error("[PORTAL_STRIPE] Missing PORTAL_STRIPE_WEBHOOK_SECRET")
      return NextResponse.json({ received: true })
    }

    const signature = request.headers.get("stripe-signature")?.trim()

    if (!signature) {
      console.error("[PORTAL_STRIPE] Missing stripe-signature header")
      return NextResponse.json({ received: true })
    }

    const payload = await request.text()

    const event = getStripe().webhooks.constructEvent(payload, signature, webhookSecret)
    await handlePortalWebhookEvent(event)
  } catch (error) {
    console.error("[PORTAL_STRIPE] Webhook processing error", error)
  }

  return NextResponse.json({ received: true })
}
