import { NextRequest, NextResponse } from "next/server"
import { platformConfig } from "@/lib/platform/config"
import { A8_PORTAL_SESSION_COOKIE_NAME } from "@/lib/platform/portal-middleware"
import { verifyPortalMagicLink } from "@/lib/platform/services/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function buildPortalRedirect(request: NextRequest): NextResponse {
  const redirectUrl = new URL("/portal", new URL(request.url).origin)
  return NextResponse.redirect(redirectUrl)
}

export async function GET(request: NextRequest) {
  const token = new URL(request.url).searchParams.get("token")?.trim()

  if (!token) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 401 })
  }

  const verified = await verifyPortalMagicLink(token)

  if (!verified) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 401 })
  }

  const response = buildPortalRedirect(request)

  response.cookies.set({
    name: A8_PORTAL_SESSION_COOKIE_NAME,
    value: verified.sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: platformConfig.A8_SESSION_TTL_HOURS * 60 * 60,
  })

  return response
}
