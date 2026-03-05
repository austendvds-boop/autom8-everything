import { NextRequest, NextResponse } from "next/server"
import { RF_SESSION_COOKIE_NAME } from "@/lib/review-funnel/middleware"
import { reviewFunnelConfig } from "@/lib/review-funnel/config"
import { verifyMagicLink } from "@/lib/review-funnel/services/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getBaseUrl(request: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || new URL(request.url).origin
}

function buildLoginRedirect(request: NextRequest, reason: string): NextResponse {
  const loginUrl = new URL("/review-funnel/login", getBaseUrl(request))
  loginUrl.searchParams.set("error", reason)
  return NextResponse.redirect(loginUrl)
}

function buildDashboardRedirect(request: NextRequest): NextResponse {
  const dashboardUrl = new URL("/review-funnel/dashboard", getBaseUrl(request))
  return NextResponse.redirect(dashboardUrl)
}

export async function GET(request: NextRequest) {
  const token = new URL(request.url).searchParams.get("token")?.trim()

  if (!token) {
    return buildLoginRedirect(request, "missing-token")
  }

  const verified = await verifyMagicLink(token)

  if (!verified) {
    return buildLoginRedirect(request, "invalid-or-expired-link")
  }

  const response = buildDashboardRedirect(request)

  response.cookies.set({
    name: RF_SESSION_COOKIE_NAME,
    value: verified.sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: reviewFunnelConfig.RF_SESSION_TTL_HOURS * 60 * 60,
  })

  return response
}
