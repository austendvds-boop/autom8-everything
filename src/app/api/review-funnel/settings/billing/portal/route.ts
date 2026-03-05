import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { createBillingPortalSession } from "@/lib/review-funnel/services/stripe"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  try {
    const url = await createBillingPortalSession(authResult.tenant.id)
    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create Stripe billing portal session"
    const status = message.toLowerCase().includes("missing a stripe customer") ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
