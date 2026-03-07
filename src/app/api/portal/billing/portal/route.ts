import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8Clients } from "@/lib/platform/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

let cachedStripeClient: Stripe | null = null

function getStripeClient(): Stripe {
  if (cachedStripeClient) {
    return cachedStripeClient
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim()

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }

  cachedStripeClient = new Stripe(secretKey)
  return cachedStripeClient
}

export async function POST(request: NextRequest) {
  const authResult = await requirePortalAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const client = await platformDb.query.a8Clients.findFirst({
    where: eq(a8Clients.id, authResult.client.id),
    columns: {
      stripeCustomerId: true,
    },
  })

  const stripeCustomerId = client?.stripeCustomerId?.trim()

  if (!stripeCustomerId) {
    return NextResponse.json({ error: "No billing account linked" }, { status: 400 })
  }

  try {
    const portalSession = await getStripeClient().billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: "https://autom8everything.com/portal",
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create billing portal session"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
