import { and, eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8ClientServices } from "@/lib/platform/db/schema"
import { rfCalendarWatches, rfSmsUsage, rfTenants } from "@/lib/review-funnel/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

async function getActiveRfTenantId(clientId: string): Promise<string | null> {
  const service = await platformDb.query.a8ClientServices.findFirst({
    where: and(
      eq(a8ClientServices.clientId, clientId),
      eq(a8ClientServices.serviceType, "review_funnel"),
      eq(a8ClientServices.status, "active"),
    ),
    columns: {
      rfTenantId: true,
    },
  })

  const tenantId = service?.rfTenantId?.trim()
  return tenantId || null
}

export async function GET(request: NextRequest) {
  const authResult = await requirePortalAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const rfTenantId = await getActiveRfTenantId(authResult.client.id)

  if (!rfTenantId) {
    return NextResponse.json({ error: "Review Funnel service not found" }, { status: 404 })
  }

  const tenant = await platformDb.query.rfTenants.findFirst({
    where: eq(rfTenants.id, rfTenantId),
    columns: {
      plan: true,
      smsLimitMonthly: true,
      isActive: true,
    },
  })

  if (!tenant) {
    return NextResponse.json({ error: "Review Funnel service not found" }, { status: 404 })
  }

  const [usageRow] = await platformDb
    .select({
      smsSent: sql<number>`coalesce(sum(${rfSmsUsage.count}), 0)`,
    })
    .from(rfSmsUsage)
    .where(and(eq(rfSmsUsage.tenantId, rfTenantId), sql`${rfSmsUsage.month} = to_char(now(), 'YYYY-MM')`))

  const [calendarsRow] = await platformDb
    .select({
      calendars: sql<number>`count(*)`,
    })
    .from(rfCalendarWatches)
    .where(and(eq(rfCalendarWatches.tenantId, rfTenantId), eq(rfCalendarWatches.isActive, true)))

  return NextResponse.json({
    plan: tenant.plan,
    smsUsed: Number(usageRow?.smsSent ?? 0),
    smsLimit: Number(tenant.smsLimitMonthly ?? 0),
    calendarsConnected: Number(calendarsRow?.calendars ?? 0),
    isActive: Boolean(tenant.isActive),
  })
}
