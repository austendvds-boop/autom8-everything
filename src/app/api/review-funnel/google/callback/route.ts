import { NextRequest, NextResponse } from "next/server"
import {
  CALENDAR_LIMIT_REACHED_MESSAGE,
  handleCallback,
  parseGoogleOAuthState,
} from "@/lib/review-funnel/services/calendar"

function buildDashboardRedirect(request: NextRequest, status: "connected" | "error", reason?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || new URL(request.url).origin
  const redirectUrl = new URL("/review-funnel/dashboard/settings", baseUrl)

  redirectUrl.searchParams.set("calendar", status)
  if (reason) {
    redirectUrl.searchParams.set("reason", reason)
  }

  return NextResponse.redirect(redirectUrl)
}

function toCalendarRedirectReason(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.trim()

    if (message === CALENDAR_LIMIT_REACHED_MESSAGE) {
      return message
    }
  }

  return "We couldn't connect your calendar. Please try again."
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const oauthError = url.searchParams.get("error")
  if (oauthError) {
    const reason = oauthError === "access_denied" ? "Calendar connection was canceled." : "We couldn't connect your calendar. Please try again."
    return buildDashboardRedirect(request, "error", reason)
  }

  const code = url.searchParams.get("code")
  const tenantId = parseGoogleOAuthState(url.searchParams.get("state")) || url.searchParams.get("tenantId")

  if (!code || !tenantId) {
    return NextResponse.json({ error: "Missing OAuth code or state" }, { status: 400 })
  }

  try {
    await handleCallback(code, tenantId)
    return buildDashboardRedirect(request, "connected")
  } catch (error) {
    return buildDashboardRedirect(request, "error", toCalendarRedirectReason(error))
  }
}
