import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { generateAuthUrl } from "@/lib/review-funnel/services/calendar"

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  try {
    const url = generateAuthUrl(authResult.tenant.id)
    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate Google OAuth URL"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
