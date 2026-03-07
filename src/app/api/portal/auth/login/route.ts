import { NextResponse } from "next/server"
import { z } from "zod"
import { generatePortalMagicLink } from "@/lib/platform/services/auth"
import { sendPortalMagicLinkEmail } from "@/lib/platform/services/email"

const loginPayloadSchema = z.object({
  email: z.string().trim().email(),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = loginPayloadSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Please enter a valid email",
        details: parsedBody.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const email = parsedBody.data.email.trim().toLowerCase()

  try {
    const token = await generatePortalMagicLink(email)

    await sendPortalMagicLinkEmail({
      toEmail: email,
      token,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : ""

    if (message.includes("no active portal client")) {
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: "Failed to send login link" }, { status: 500 })
  }
}
