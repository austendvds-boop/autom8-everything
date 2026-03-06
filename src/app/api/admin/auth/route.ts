import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import {
  A8_ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  isAdminSecretValid,
} from "@/lib/platform/admin-middleware"

const authSchema = z.object({
  secret: z.string().trim().min(1),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = authSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Secret is required" }, { status: 400 })
  }

  if (!isAdminSecretValid(parsedBody.data.secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const sessionToken = createAdminSessionToken()
  const response = NextResponse.json({ ok: true })

  response.cookies.set({
    name: A8_ADMIN_SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
  })

  return response
}
