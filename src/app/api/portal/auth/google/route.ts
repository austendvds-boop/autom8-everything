import crypto from "node:crypto"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PORTAL_OAUTH_STATE_COOKIE_NAME = "portal_oauth_state"
const PORTAL_OAUTH_STATE_MAX_AGE_SECONDS = 10 * 60

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://autom8everything.com"
}

export async function GET() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim()

  if (!clientId) {
    return NextResponse.redirect(new URL("/portal/login", getBaseUrl()))
  }

  const state = crypto.randomBytes(32).toString("base64url")
  const redirectUri = new URL("/api/portal/auth/google/callback", getBaseUrl()).toString()
  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")

  googleUrl.searchParams.set("client_id", clientId)
  googleUrl.searchParams.set("redirect_uri", redirectUri)
  googleUrl.searchParams.set("scope", "openid email profile")
  googleUrl.searchParams.set("response_type", "code")
  googleUrl.searchParams.set("prompt", "select_account")
  googleUrl.searchParams.set("state", state)

  const response = NextResponse.redirect(googleUrl)
  response.cookies.set({
    name: PORTAL_OAUTH_STATE_COOKIE_NAME,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: PORTAL_OAUTH_STATE_MAX_AGE_SECONDS,
  })

  return response
}
