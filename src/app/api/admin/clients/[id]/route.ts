import { eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminAuth } from "@/lib/platform/admin-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8ClientServices, a8Clients } from "@/lib/platform/db/schema"
import { getCadenceRecentCalls, getCadenceTenantConfig } from "@/lib/platform/services/cadence-api"

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const updateClientSchema = z
  .object({
    businessName: z.string().trim().min(1).optional(),
    contactName: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    phone: z.string().trim().max(20).optional().nullable(),
    notes: z.string().trim().optional().nullable(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  })

function currentMonthKey(date = new Date()): string {
  return date.toISOString().slice(0, 7)
}

function extractCadenceCallCount(payload: unknown): number {
  if (!payload || typeof payload !== "object") {
    return 0
  }

  const candidate = payload as Record<string, unknown>

  const possibleKeys = ["callCount", "callsCount", "totalCalls", "total", "count"]

  for (const key of possibleKeys) {
    const value = candidate[key]
    if (typeof value === "number" && Number.isFinite(value)) {
      return value
    }
  }

  if (Array.isArray(candidate.calls)) {
    return candidate.calls.length
  }

  return 0
}

function extractCadenceRecentCalls(payload: unknown): unknown[] {
  if (!payload || typeof payload !== "object") {
    return []
  }

  const candidate = payload as Record<string, unknown>

  if (!Array.isArray(candidate.calls)) {
    return []
  }

  return candidate.calls.slice(0, 20)
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid client id" }, { status: 400 })
  }

  const clientId = parsedParams.data.id

  const client = await platformDb.query.a8Clients.findFirst({
    where: eq(a8Clients.id, clientId),
  })

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  const services = await platformDb.query.a8ClientServices.findMany({
    where: eq(a8ClientServices.clientId, clientId),
  })

  const usageMonth = currentMonthKey()

  const servicesWithUsage = await Promise.all(
    services.map(async (service) => {
      if (service.serviceType === "cadence" && service.cadenceTenantId) {
        try {
          const [tenantConfig, callsResponse] = await Promise.all([
            getCadenceTenantConfig(service.cadenceTenantId),
            getCadenceRecentCalls(service.cadenceTenantId, 100, 0),
          ])

          return {
            ...service,
            usage: {
              type: "cadence",
              callCount: extractCadenceCallCount(callsResponse),
              recentCalls: extractCadenceRecentCalls(callsResponse),
              tenantConfig,
            },
          }
        } catch (error) {
          return {
            ...service,
            usage: {
              type: "cadence",
              callCount: 0,
              error: error instanceof Error ? error.message : "Failed to load Cadence usage",
            },
          }
        }
      }

      if (service.serviceType === "review_funnel" && service.rfTenantId) {
        const result = await platformDb.execute<{ count: number }>(
          sql`select coalesce(sum(count), 0)::int as count from rf_sms_usage where tenant_id = ${service.rfTenantId} and month = ${usageMonth}`,
        )

        const smsCount = Number(result.rows[0]?.count ?? 0)

        return {
          ...service,
          usage: {
            type: "review_funnel",
            month: usageMonth,
            smsCount,
          },
        }
      }

      return {
        ...service,
        usage: null,
      }
    }),
  )

  return NextResponse.json({
    client: {
      ...client,
      services: servicesWithUsage,
    },
  })
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

  const parsedBody = updateClientSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid client update payload",
        details: parsedBody.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const payload = parsedBody.data

  const [updatedClient] = await platformDb
    .update(a8Clients)
    .set({
      businessName: payload.businessName,
      contactName: payload.contactName,
      email: payload.email?.toLowerCase(),
      phone: payload.phone === undefined ? undefined : payload.phone,
      notes: payload.notes === undefined ? undefined : payload.notes,
      isActive: payload.isActive,
      updatedAt: new Date(),
    })
    .where(eq(a8Clients.id, parsedParams.data.id))
    .returning()

  if (!updatedClient) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  return NextResponse.json({
    client: updatedClient,
  })
}
