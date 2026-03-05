import { NextResponse } from "next/server"
import { RF_SESSION_COOKIE_NAME } from "@/lib/review-funnel/constants"

export const runtime = "nodejs"

export async function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: RF_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  })

  return response
}
