import { NextRequest, NextResponse } from "next/server"
import type { A8Client } from "./db/schema"
import { verifyPortalSession } from "./services/auth"

export const A8_PORTAL_SESSION_COOKIE_NAME = "a8_portal_session"

interface PortalAuthSuccess {
  ok: true
  client: A8Client
  sessionToken: string
}

interface PortalAuthFailure {
  ok: false
  response: NextResponse<{ error: string }>
}

export type PortalAuthResult = PortalAuthSuccess | PortalAuthFailure

function unauthorizedPortalResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 })
}

function extractBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null
  }

  const [scheme, token] = authorizationHeader.split(" ")

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null
  }

  const trimmed = token.trim()
  return trimmed.length > 0 ? trimmed : null
}

function getPortalSessionToken(request: NextRequest): string | null {
  const authHeaderToken = extractBearerToken(request.headers.get("authorization"))

  if (authHeaderToken) {
    return authHeaderToken
  }

  const cookieToken = request.cookies.get(A8_PORTAL_SESSION_COOKIE_NAME)?.value?.trim()
  return cookieToken || null
}

export async function requirePortalAuth(request: NextRequest): Promise<PortalAuthResult> {
  const sessionToken = getPortalSessionToken(request)

  if (!sessionToken) {
    return {
      ok: false,
      response: unauthorizedPortalResponse("Missing session token"),
    }
  }

  const client = await verifyPortalSession(sessionToken)

  if (!client) {
    return {
      ok: false,
      response: unauthorizedPortalResponse("Invalid or expired session"),
    }
  }

  return {
    ok: true,
    client,
    sessionToken,
  }
}
