import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminAuth } from "@/lib/platform/admin-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8Clients } from "@/lib/platform/db/schema"
import { generatePortalMagicLink } from "@/lib/platform/services/auth"
import { sendWelcomeEmail } from "@/lib/platform/services/email"
import {
  cancelService,
  pauseService,
  provisionService,
  resumeService,
} from "@/lib/platform/services/provisioning"

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const provisionSchema = z.object({
  serviceType: z.enum(["cadence", "review_funnel"]),
  cadenceTenantId: z.string().trim().min(1).optional(),
  rfTenantId: z.string().uuid().optional(),
})

const cancelSchema = z.object({
  serviceType: z.string().trim().min(1),
})

const updateStatusSchema = z.object({
  serviceType: z.string().trim().min(1),
  action: z.enum(["pause", "resume"]),
})

function serviceLabel(serviceType: "cadence" | "review_funnel"): "cadence" | "review_funnel" {
  return serviceType
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)
  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid client id" }, { status: 400 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = provisionSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid service payload",
        details: parsedBody.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const clientId = parsedParams.data.id
  const payload = parsedBody.data

  const client = await platformDb.query.a8Clients.findFirst({
    where: eq(a8Clients.id, clientId),
  })

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  try {
    const metadata: Record<string, unknown> = {
      ...(payload.cadenceTenantId ? { cadenceTenantId: payload.cadenceTenantId } : {}),
      ...(payload.rfTenantId ? { rfTenantId: payload.rfTenantId } : {}),
    }

    const service = await provisionService(clientId, payload.serviceType, metadata)

    const magicLinkToken = await generatePortalMagicLink(client.email)

    await sendWelcomeEmail({
      toEmail: client.email,
      clientName: client.businessName,
      serviceName: serviceLabel(payload.serviceType),
      magicLinkToken,
    })

    return NextResponse.json({
      ok: true,
      service,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to add service",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)
  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid client id" }, { status: 400 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = cancelSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json({ error: "serviceType is required" }, { status: 400 })
  }

  await cancelService(parsedParams.data.id, parsedBody.data.serviceType)

  return NextResponse.json({ ok: true })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)
  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid client id" }, { status: 400 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = updateStatusSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid service status payload" }, { status: 400 })
  }

  if (parsedBody.data.action === "pause") {
    await pauseService(parsedParams.data.id, parsedBody.data.serviceType)
  } else {
    await resumeService(parsedParams.data.id, parsedBody.data.serviceType)
  }

  return NextResponse.json({ ok: true })
}
