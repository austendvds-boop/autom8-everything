import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { disconnectCalendar } from "@/lib/review-funnel/services/calendar"

export async function POST(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  try {
    const result = await disconnectCalendar(authResult.tenant.id)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disconnect Google Calendar"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
