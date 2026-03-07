import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8ClientServices } from "@/lib/platform/db/schema"
import { getCadenceUsage } from "@/lib/platform/services/cadence-api"

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
    const usage = await getCadenceUsage(cadenceTenantId)
    return NextResponse.json(usage)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load usage"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
