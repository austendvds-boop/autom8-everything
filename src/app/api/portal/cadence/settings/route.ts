import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8ClientServices } from "@/lib/platform/db/schema"
import { getCadenceTenantConfig, updateCadenceTenantConfig } from "@/lib/platform/services/cadence-api"

const updateCadenceSchema = z
  .object({
    greeting: z.string().optional(),
    transferNumber: z.string().nullable().optional(),
    bookingUrl: z.string().nullable().optional(),
    timezone: z.string().optional(),
    systemPrompt: z.string().nullable().optional(),
    hours: z.unknown().optional(),
    services: z.unknown().optional(),
    faqs: z.unknown().optional(),
  })
  .strict()

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

async function getActiveCadenceTenantId(clientId: string): Promise<string | null> {
  const service = await platformDb.query.a8ClientServices.findFirst({
    where: and(
      eq(a8ClientServices.clientId, clientId),
      eq(a8ClientServices.serviceType, "cadence"),
      eq(a8ClientServices.status, "active"),
    ),
    columns: {
      cadenceTenantId: true,
    },
  })

  const cadenceTenantId = service?.cadenceTenantId?.trim()
  return cadenceTenantId || null
}

export async function GET(request: NextRequest) {
  const authResult = await requirePortalAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const cadenceTenantId = await getActiveCadenceTenantId(authResult.client.id)

  if (!cadenceTenantId) {
    return NextResponse.json({ error: "Cadence service not found" }, { status: 404 })
  }

  try {
    const config = await getCadenceTenantConfig(cadenceTenantId)
    return NextResponse.json(config)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load Cadence settings"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const authResult = await requirePortalAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const cadenceTenantId = await getActiveCadenceTenantId(authResult.client.id)

  if (!cadenceTenantId) {
    return NextResponse.json({ error: "Cadence service not found" }, { status: 404 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = updateCadenceSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid settings payload",
        details: parsedBody.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  try {
    const updated = await updateCadenceTenantConfig(cadenceTenantId, parsedBody.data)
    return NextResponse.json(updated)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update Cadence settings"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
