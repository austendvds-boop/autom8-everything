import { NextResponse } from "next/server"
import { z } from "zod"
import { createPortalCheckoutSession } from "@/lib/platform/services/stripe-portal"

const checkoutRequestSchema = z
  .object({
    email: z.string().trim().email(),
    businessName: z.string().trim().min(1).max(255).optional(),
    phone: z.string().trim().max(32).optional(),
    areaCode: z.string().trim().regex(/^\d{3}$/).optional(),
    product: z.enum(["cadence", "review_funnel"]),
    plan: z.enum(["starter", "growth"]).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.product === "review_funnel" && !value.businessName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessName"],
        message: "Business name is required",
      })
    }

    if (value.product === "review_funnel" && value.plan && !["starter", "growth"].includes(value.plan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plan"],
        message: "Plan must be starter or growth",
      })
    }
  })

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getAllowedOrigin(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!siteUrl) {
    return "https://autom8everything.com"
  }

  try {
    return new URL(siteUrl).origin
  } catch {
    return "https://autom8everything.com"
  }
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": getAllowedOrigin(),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(),
  })
}

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400, headers: getCorsHeaders() })
  }

  const parsed = checkoutRequestSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check your details and try again.",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      {
        status: 400,
        headers: getCorsHeaders(),
      },
    )
  }

  const payload = parsed.data
  const businessName = payload.businessName?.trim() || payload.email.split("@")[0] || "Business"

  try {
    const session = await createPortalCheckoutSession({
      email: payload.email,
      businessName,
      phone: payload.phone,
      areaCode: payload.areaCode,
      product: payload.product,
      plan: payload.product === "review_funnel" ? payload.plan || "starter" : undefined,
    })

    return NextResponse.json({ url: session.url }, { headers: getCorsHeaders() })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not start checkout"

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
        headers: getCorsHeaders(),
      },
    )
  }
}
