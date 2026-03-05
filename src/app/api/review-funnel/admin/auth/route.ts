import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import {
  clearReviewFunnelAdminSessionCookie,
  createReviewFunnelAdminSessionToken,
  getReviewFunnelAdminCookieOptions,
  isReviewFunnelAdminSecretValid,
} from "@/lib/review-funnel/admin-middleware"
import { RF_ADMIN_SESSION_COOKIE_NAME } from "@/lib/review-funnel/admin"

const authBodySchema = z
  .object({
    password: z.string().trim().min(1).optional(),
    secret: z.string().trim().min(1).optional(),
  })
  .strict()
  .refine((value) => Boolean(value.password ?? value.secret), {
    message: "Password is required",
  })

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  if (!process.env.RF_ADMIN_SECRET?.trim()) {
    return NextResponse.json({ error: "RF_ADMIN_SECRET is not configured" }, { status: 500 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = authBodySchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 })
  }

  const passwordCandidate = parsedBody.data.password ?? parsedBody.data.secret

  if (!isReviewFunnelAdminSecretValid(passwordCandidate)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
  }

  const sessionToken = createReviewFunnelAdminSessionToken()
  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: RF_ADMIN_SESSION_COOKIE_NAME,
    value: sessionToken,
    ...getReviewFunnelAdminCookieOptions(),
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  clearReviewFunnelAdminSessionCookie(response)
  return response
}
