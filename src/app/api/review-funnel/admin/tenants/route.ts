import { asc, desc, ilike, or, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireReviewFunnelAdminAuth } from "@/lib/review-funnel/admin-middleware"
import { PRO_SMS_LIMIT_SENTINEL } from "@/lib/review-funnel/admin"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfLocations, rfSmsUsage, rfTenants } from "@/lib/review-funnel/db/schema"

const querySchema = z
  .object({
    search: z.string().trim().max(255).optional(),
    sort: z.enum(["created_at", "plan", "status"]).default("created_at"),
    direction: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict()

function usageMonth(date = new Date()): string {
  return date.toISOString().slice(0, 7)
}

function toInt(value: number | string | null | undefined): number {
  if (typeof value === "number") {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedQuery = querySchema.safeParse({
    search: request.nextUrl.searchParams.get("search") ?? undefined,
    sort: request.nextUrl.searchParams.get("sort") ?? undefined,
    direction: request.nextUrl.searchParams.get("direction") ?? undefined,
  })

  if (!parsedQuery.success) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 })
  }

  const { search, sort, direction } = parsedQuery.data
  const month = usageMonth()
  const orderDirection = direction === "asc" ? asc : desc

  const orderByClause =
    sort === "plan"
      ? orderDirection(rfTenants.plan)
      : sort === "status"
        ? orderDirection(rfTenants.isActive)
        : orderDirection(rfTenants.createdAt)

  const rows = await rfDb
    .select({
      id: rfTenants.id,
      businessName: rfTenants.businessName,
      ownerName: rfTenants.ownerName,
      ownerEmail: rfTenants.ownerEmail,
      plan: rfTenants.plan,
      smsLimitMonthly: rfTenants.smsLimitMonthly,
      isActive: rfTenants.isActive,
      createdAt: rfTenants.createdAt,
      calendarsConnected: sql<number>`coalesce((
        select count(*)::int
        from ${rfLocations}
        where ${rfLocations.tenantId} = ${rfTenants.id}
          and ${rfLocations.isActive} = true
          and ${rfLocations.calendarId} is not null
      ), 0)`,
      smsUsedThisMonth: sql<number>`coalesce((
        select ${rfSmsUsage.count}
        from ${rfSmsUsage}
        where ${rfSmsUsage.tenantId} = ${rfTenants.id}
          and ${rfSmsUsage.month} = ${month}
        limit 1
      ), 0)`,
    })
    .from(rfTenants)
    .where(
      search
        ? or(
            ilike(rfTenants.businessName, `%${search}%`),
            ilike(rfTenants.ownerEmail, `%${search}%`),
          )
        : undefined,
    )
    .orderBy(orderByClause, desc(rfTenants.createdAt))

  return NextResponse.json({
    usageMonth: month,
    tenants: rows.map((row) => ({
      id: row.id,
      businessName: row.businessName,
      ownerName: row.ownerName,
      ownerEmail: row.ownerEmail,
      plan: row.plan,
      calendarsConnected: toInt(row.calendarsConnected),
      smsUsedThisMonth: toInt(row.smsUsedThisMonth),
      smsLimitMonthly: row.smsLimitMonthly,
      smsLimitUnlimited:
        row.plan === "pro" || row.smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL,
      isActive: row.isActive,
      createdAt: row.createdAt.toISOString(),
    })),
  })
}
