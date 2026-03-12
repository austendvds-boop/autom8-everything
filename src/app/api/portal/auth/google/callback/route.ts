import { NextRequest, NextResponse } from "next/server"
import { and, eq, sql } from "drizzle-orm"
import { platformConfig } from "@/lib/platform/config"
import { platformDb } from "@/lib/platform/db/client"
import { a8Clients } from "@/lib/platform/db/schema"
import { A8_PORTAL_SESSION_COOKIE_NAME } from "@/lib/platform/portal-middleware"
import { createPortalSession } from "@/lib/platform/services/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PORTAL_OAUTH_STATE_COOKIE_NAME = "portal_oauth_state"

interface GoogleTokenResponse {
  id_token?: string
}

interface GoogleIdTokenClaims {
  email?: string
  name?: string
}

function getBaseUrl(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || new URL(request.url).origin
}

function buildLoginRedirect(request: NextRequest, error?: string) {
  const redirectUrl = new URL("/portal/login", getBaseUrl(request))

  if (error) {
    redirectUrl.searchParams.set("error", error)
  }

  return redirectUrl
}

function clearOauthStateCookie(response: NextResponse) {
  response.cookies.set({
    name: PORTAL_OAUTH_STATE_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}

function decodeJwtPayload(token: string): GoogleIdTokenClaims | null {
  const segments = token.split(".")

  if (segments.length < 2 || !segments[1]) {
    return null
  }

  try {
    const payload = Buffer.from(segments[1], "base64url").toString("utf8")
    return JSON.parse(payload) as GoogleIdTokenClaims
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")?.trim()
  const state = url.searchParams.get("state")?.trim()
  const storedState = request.cookies.get(PORTAL_OAUTH_STATE_COOKIE_NAME)?.value?.trim()

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim()
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim()

  if (!code || !state || !storedState || state !== storedState || !clientId || !clientSecret) {
    const response = NextResponse.redirect(buildLoginRedirect(request, "oauth_failed"))
    clearOauthStateCookie(response)
    return response
  }

  try {
    const redirectUri = new URL("/api/portal/auth/google/callback", getBaseUrl(request)).toString()
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange OAuth code")
    }

    const tokenPayload = (await tokenResponse.json()) as GoogleTokenResponse
    const claims = tokenPayload.id_token ? decodeJwtPayload(tokenPayload.id_token) : null
    const normalizedEmail = claims?.email?.trim().toLowerCase()

    if (!normalizedEmail) {
      throw new Error("Google account email missing")
    }

    const client = await platformDb.query.a8Clients.findFirst({
      where: and(
        eq(a8Clients.isActive, true),
        sql`lower(${a8Clients.email}) = ${normalizedEmail}`,
      ),
    })

    if (!client) {
      const response = NextResponse.redirect(buildLoginRedirect(request, "no_account"))
      clearOauthStateCookie(response)
      return response
    }

    const response = NextResponse.redirect(new URL("/portal", getBaseUrl(request)))
    response.cookies.set({
      name: A8_PORTAL_SESSION_COOKIE_NAME,
      value: createPortalSession(client.id),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: platformConfig.A8_SESSION_TTL_HOURS * 60 * 60,
    })
    clearOauthStateCookie(response)

    return response
  } catch {
    const response = NextResponse.redirect(buildLoginRedirect(request, "oauth_failed"))
    clearOauthStateCookie(response)
    return response
  }
}
