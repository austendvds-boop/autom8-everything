import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8ClientServices } from "@/lib/platform/db/schema"
import { triggerCadenceTestCall } from "@/lib/platform/services/cadence-api"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const testCallSchema = z
  .object({
    toPhone: z.string().trim().min(1, "Phone number is required"),
  })
  .strict()

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

export async function POST(request: NextRequest) {
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

  const parsedBody = testCallSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: parsedBody.error.issues[0]?.message || "Phone number is required",
      },
      { status: 400 },
    )
  }

  try {
    const result = await triggerCadenceTestCall(cadenceTenantId, parsedBody.data.toPhone)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not start test call"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
