import { NextResponse } from "next/server"
import { z } from "zod"
import { generateMagicLink } from "@/lib/review-funnel/services/auth"
import { sendReviewFunnelMagicLinkEmail } from "@/lib/review-funnel/services/magic-link-email"

const loginPayloadSchema = z.object({
  email: z.string().trim().email(),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function successResponse() {
  return NextResponse.json({
    success: true,
    message: "Check your email",
  })
}

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = loginPayloadSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please enter a valid email",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const email = parsed.data.email.trim().toLowerCase()

  try {
    const token = await generateMagicLink(email)
    await sendReviewFunnelMagicLinkEmail({
      toEmail: email,
      token,
    })

    return successResponse()
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send login link"

    if (message.toLowerCase().includes("no active review funnel tenant")) {
      return successResponse()
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
