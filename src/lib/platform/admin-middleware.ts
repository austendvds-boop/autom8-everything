import crypto from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { platformConfig } from "./config"

const jwt: {
  sign: (payload: Record<string, unknown>, secret: string, options?: Record<string, unknown>) => string
  verify: (token: string, secret: string) => unknown
} = require("jsonwebtoken")

interface AdminSessionClaims {
  role: "platform_admin"
  iat?: number
  exp?: number
}

interface AdminAuthSuccess {
  ok: true
}

interface AdminAuthFailure {
  ok: false
  response: NextResponse<{ error: string }>
}

export type AdminAuthResult = AdminAuthSuccess | AdminAuthFailure

export const A8_ADMIN_SESSION_COOKIE_NAME = "a8_admin_session"

function secureEquals(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function verifyAdminSessionToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, platformConfig.A8_JWT_SECRET)

    if (!payload || typeof payload !== "object") {
      return false
    }

    const claims = payload as AdminSessionClaims
    return claims.role === "platform_admin"
  } catch {
    return false
  }
}

function unauthorizedAdminResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function isAdminSecretValid(candidate: string | null | undefined): boolean {
  const normalizedCandidate = candidate?.trim()

  if (!normalizedCandidate) {
    return false
  }

  return secureEquals(platformConfig.A8_ADMIN_SECRET, normalizedCandidate)
}

export function createAdminSessionToken(): string {
  return jwt.sign(
    { role: "platform_admin" },
    platformConfig.A8_JWT_SECRET,
    {
      expiresIn: "8h",
    },
  )
}

export async function requireAdminAuth(request: NextRequest): Promise<AdminAuthResult> {
  const headerSecret = request.headers.get("x-admin-secret")?.trim()

  if (isAdminSecretValid(headerSecret)) {
    return { ok: true }
  }

  const sessionToken = request.cookies.get(A8_ADMIN_SESSION_COOKIE_NAME)?.value?.trim()

  if (!sessionToken || !verifyAdminSessionToken(sessionToken)) {
    return {
      ok: false,
      response: unauthorizedAdminResponse("Admin authorization required"),
    }
  }

  return {
    ok: true,
  }
}
