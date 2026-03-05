import { NextRequest, NextResponse } from "next/server"
import { verifySession } from "./services/auth"
import type { RfTenant } from "./db/schema"
import { RF_SESSION_COOKIE_NAME } from "./constants"

export interface ReviewFunnelAuthSuccess {
  ok: true
  tenant: RfTenant
  sessionToken: string
}

export interface ReviewFunnelAuthFailure {
  ok: false
  response: NextResponse<{ error: string }>
}

export type ReviewFunnelAuthResult = ReviewFunnelAuthSuccess | ReviewFunnelAuthFailure

export function unauthorizedReviewFunnelResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 })
}

function extractBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) return null

  const [scheme, token] = authorizationHeader.split(" ")
  if (scheme?.toLowerCase() !== "bearer" || !token) return null

  return token.trim() || null
}

export function getReviewFunnelSessionToken(request: NextRequest): string | null {
  const authHeaderToken = extractBearerToken(request.headers.get("authorization"))
  if (authHeaderToken) return authHeaderToken

  const cookieToken = request.cookies.get(RF_SESSION_COOKIE_NAME)?.value
  return cookieToken?.trim() || null
}

export async function requireReviewFunnelDashboardAuth(request: NextRequest): Promise<ReviewFunnelAuthResult> {
  const sessionToken = getReviewFunnelSessionToken(request)

  if (!sessionToken) {
    return {
      ok: false,
      response: unauthorizedReviewFunnelResponse("Missing session token"),
    }
  }

  const tenant = await verifySession(sessionToken)

  if (!tenant) {
    return {
      ok: false,
      response: unauthorizedReviewFunnelResponse("Invalid or expired session"),
    }
  }

  return {
    ok: true,
    tenant,
    sessionToken,
  }
}
