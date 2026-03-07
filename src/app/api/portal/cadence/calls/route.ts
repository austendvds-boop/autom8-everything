import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8ClientServices } from "@/lib/platform/db/schema"
import { getCadenceRecentCalls } from "@/lib/platform/services/cadence-api"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function parseIntParam(rawValue: string | null, fallback: number, min: number): number {
  if (!rawValue) {
    return fallback
  }

  const parsed = Number.parseInt(rawValue, 10)

  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return Math.max(min, parsed)
}

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

  const searchParams = new URL(request.url).searchParams
  const limit = parseIntParam(searchParams.get("limit"), 50, 1)
  const offset = parseIntParam(searchParams.get("offset"), 0, 0)

  try {
    const calls = await getCadenceRecentCalls(cadenceTenantId, limit, offset)
    return NextResponse.json(calls)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load recent calls"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
