import crypto from "node:crypto"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { RF_ADMIN_SESSION_COOKIE_NAME, RF_ADMIN_SESSION_TTL_HOURS } from "./admin"

const jwt: {
  sign: (payload: Record<string, unknown>, secret: string, options?: Record<string, unknown>) => string
  verify: (token: string, secret: string) => unknown
} = require("jsonwebtoken")

interface ReviewFunnelAdminClaims {
  role: "review-funnel-admin"
  iat?: number
  exp?: number
}

interface ReviewFunnelAdminAuthSuccess {
  ok: true
}

interface ReviewFunnelAdminAuthFailure {
  ok: false
  response: NextResponse<{ error: string }>
}

export type ReviewFunnelAdminAuthResult = ReviewFunnelAdminAuthSuccess | ReviewFunnelAdminAuthFailure

const ADMIN_SECRET_HEADER_CANDIDATES = ["ADMIN_SECRET", "admin_secret", "x-admin-secret"] as const

function getRfAdminSecret(): string | null {
  const secret = process.env.RF_ADMIN_SECRET?.trim()
  return secret && secret.length > 0 ? secret : null
}

function secureEquals(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function verifyReviewFunnelAdminSessionToken(token: string): boolean {
  const secret = getRfAdminSecret()
  if (!secret) {
    return false
  }

  try {
    const payload = jwt.verify(token, secret)

    if (!payload || typeof payload !== "object") {
      return false
    }

    const claims = payload as ReviewFunnelAdminClaims
    return claims.role === "review-funnel-admin"
  } catch {
    return false
  }
}

function getAdminSecretFromRequestHeaders(request: NextRequest): string | null {
  for (const headerName of ADMIN_SECRET_HEADER_CANDIDATES) {
    const value = request.headers.get(headerName)?.trim()
    if (value) {
      return value
    }
  }

  return null
}

export function isReviewFunnelAdminSecretValid(candidate: string | null | undefined): boolean {
  const secret = getRfAdminSecret()
  const normalizedCandidate = candidate?.trim()

  if (!secret || !normalizedCandidate) {
    return false
  }

  return secureEquals(secret, normalizedCandidate)
}

export function createReviewFunnelAdminSessionToken(): string {
  const secret = getRfAdminSecret()

  if (!secret) {
    throw new Error("RF_ADMIN_SECRET is not configured")
  }

  return jwt.sign(
    { role: "review-funnel-admin" },
    secret,
    {
      expiresIn: `${RF_ADMIN_SESSION_TTL_HOURS}h`,
    },
  )
}

export function getReviewFunnelAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: RF_ADMIN_SESSION_TTL_HOURS * 60 * 60,
  }
}

export function clearReviewFunnelAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: RF_ADMIN_SESSION_COOKIE_NAME,
    value: "",
    ...getReviewFunnelAdminCookieOptions(),
    maxAge: 0,
  })
}

export function unauthorizedReviewFunnelAdminResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function isReviewFunnelAdminRequestAuthorized(request: NextRequest): boolean {
  const headerSecret = getAdminSecretFromRequestHeaders(request)

  if (isReviewFunnelAdminSecretValid(headerSecret)) {
    return true
  }

  const cookieToken = request.cookies.get(RF_ADMIN_SESSION_COOKIE_NAME)?.value?.trim()

  if (!cookieToken) {
    return false
  }

  return verifyReviewFunnelAdminSessionToken(cookieToken)
}

export async function isReviewFunnelAdminPageAuthorized(): Promise<boolean> {
  const cookieStore = await cookies()
  const cookieToken = cookieStore.get(RF_ADMIN_SESSION_COOKIE_NAME)?.value?.trim()

  if (!cookieToken) {
    return false
  }

  return verifyReviewFunnelAdminSessionToken(cookieToken)
}

export async function requireReviewFunnelAdminAuth(request: NextRequest): Promise<ReviewFunnelAdminAuthResult> {
  if (!getRfAdminSecret()) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Review Funnel admin access is not configured" }, { status: 500 }),
    }
  }

  if (!isReviewFunnelAdminRequestAuthorized(request)) {
    return {
      ok: false,
      response: unauthorizedReviewFunnelAdminResponse("Admin authorization required"),
    }
  }

  return {
    ok: true,
  }
}
