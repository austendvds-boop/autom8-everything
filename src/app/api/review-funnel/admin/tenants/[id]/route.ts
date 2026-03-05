import { and, desc, eq, inArray, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import {
  getReviewFunnelCalendarLimit,
  getReviewFunnelPlanAmountMonthlyUsd,
  getReviewFunnelSmsLimitMonthly,
  normalizeReviewFunnelPlan,
  PRO_SMS_LIMIT_SENTINEL,
  REVIEW_FUNNEL_PLAN_CONFIG,
  type ReviewFunnelAdminPlan,
} from "@/lib/review-funnel/admin"
import { requireReviewFunnelAdminAuth } from "@/lib/review-funnel/admin-middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import {
  rfCalendarWatches,
  rfLocations,
  rfReviewRequests,
  rfSmsUsage,
  rfTenants,
  type NewRfTenant,
} from "@/lib/review-funnel/db/schema"

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const patchSchema = z
  .object({
    status: z.enum(["active", "inactive"]).optional(),
    plan: z.enum(["starter", "growth", "pro"]).optional(),
  })
  .strict()
  .refine((value) => value.status !== undefined || value.plan !== undefined, {
    message: "At least one update field is required",
  })

function usageMonth(date = new Date()): string {
  return date.toISOString().slice(0, 7)
}

function getLastUsageMonths(count: number, date = new Date()): string[] {
  const months: string[] = []
  const cursor = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))

  for (let index = 0; index < count; index += 1) {
    const year = cursor.getUTCFullYear()
    const month = String(cursor.getUTCMonth() + 1).padStart(2, "0")
    months.push(`${year}-${month}`)
    cursor.setUTCMonth(cursor.getUTCMonth() - 1)
  }

  return months
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

function serializeTenant(tenant: {
  id: string
  businessName: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  googlePlaceId: string | null
  gmbReviewUrl: string
  plan: string
  smsLimitMonthly: number
  calendarLimit: number
  isActive: boolean
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  createdAt: Date
  updatedAt: Date
}) {
  const normalizedPlan = normalizeReviewFunnelPlan(tenant.plan)

  return {
    id: tenant.id,
    businessName: tenant.businessName,
    ownerName: tenant.ownerName,
    ownerEmail: tenant.ownerEmail,
    ownerPhone: tenant.ownerPhone,
    googlePlaceId: tenant.googlePlaceId,
    gmbReviewUrl: tenant.gmbReviewUrl,
    plan: tenant.plan,
    planLabel: normalizedPlan ? REVIEW_FUNNEL_PLAN_CONFIG[normalizedPlan].label : tenant.plan,
    planAmountMonthlyUsd: getReviewFunnelPlanAmountMonthlyUsd(tenant.plan),
    smsLimitMonthly: tenant.smsLimitMonthly,
    smsLimitUnlimited: tenant.smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL,
    calendarLimit: tenant.calendarLimit >= PRO_SMS_LIMIT_SENTINEL ? null : tenant.calendarLimit,
    isActive: tenant.isActive,
    stripeCustomerId: tenant.stripeCustomerId,
    stripeSubscriptionId: tenant.stripeSubscriptionId,
    createdAt: tenant.createdAt.toISOString(),
    updatedAt: tenant.updatedAt.toISOString(),
  }
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireReviewFunnelAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid tenant id" }, { status: 400 })
  }

  const tenantId = parsedParams.data.id

  const tenant = await rfDb.query.rfTenants.findFirst({
    where: eq(rfTenants.id, tenantId),
    columns: {
      id: true,
      businessName: true,
      ownerName: true,
      ownerEmail: true,
      ownerPhone: true,
      googlePlaceId: true,
      gmbReviewUrl: true,
      plan: true,
      smsLimitMonthly: true,
      calendarLimit: true,
      isActive: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
  }

  const currentMonth = usageMonth()
  const usageMonths = getLastUsageMonths(3)

  const [currentUsage] = await rfDb
    .select({
      total: sql<number>`coalesce(sum(${rfSmsUsage.count}), 0)`,
    })
    .from(rfSmsUsage)
    .where(and(eq(rfSmsUsage.tenantId, tenantId), eq(rfSmsUsage.month, currentMonth)))

  const usageRows = await rfDb
    .select({
      month: rfSmsUsage.month,
      count: rfSmsUsage.count,
    })
    .from(rfSmsUsage)
    .where(
      and(
        eq(rfSmsUsage.tenantId, tenantId),
        inArray(rfSmsUsage.month, usageMonths),
      ),
    )
    .orderBy(desc(rfSmsUsage.month))

  const usageByMonth = new Map(usageRows.map((entry) => [entry.month, entry.count]))

  const calendarConnections = await rfDb
    .select({
      id: rfLocations.id,
      locationName: rfLocations.name,
      calendarId: rfLocations.calendarId,
      smsSenderNumber: rfLocations.smsSenderNumber,
      isActive: rfLocations.isActive,
      createdAt: rfLocations.createdAt,
      activeWatchCount: sql<number>`coalesce((
        select count(*)::int
        from ${rfCalendarWatches}
        where ${rfCalendarWatches.locationId} = ${rfLocations.id}
          and ${rfCalendarWatches.isActive} = true
      ), 0)`,
    })
    .from(rfLocations)
    .where(eq(rfLocations.tenantId, tenantId))
    .orderBy(desc(rfLocations.createdAt))

  const recentReviewRequests = await rfDb
    .select({
      id: rfReviewRequests.id,
      customerName: rfReviewRequests.customerName,
      customerPhone: rfReviewRequests.customerPhone,
      customerEmail: rfReviewRequests.customerEmail,
      appointmentEnd: rfReviewRequests.appointmentEnd,
      smsStatus: rfReviewRequests.smsStatus,
      rating: rfReviewRequests.rating,
      feedbackText: rfReviewRequests.feedbackText,
      createdAt: rfReviewRequests.createdAt,
      locationName: rfLocations.name,
    })
    .from(rfReviewRequests)
    .leftJoin(rfLocations, eq(rfReviewRequests.locationId, rfLocations.id))
    .where(eq(rfReviewRequests.tenantId, tenantId))
    .orderBy(desc(rfReviewRequests.createdAt))
    .limit(20)

  return NextResponse.json({
    tenant: serializeTenant(tenant),
    smsSummary: {
      month: currentMonth,
      usedThisMonth: toInt(currentUsage?.total),
    },
    smsUsageHistory: usageMonths.map((month) => ({
      month,
      count: usageByMonth.get(month) ?? 0,
    })),
    calendarConnections: calendarConnections.map((connection) => ({
      id: connection.id,
      locationName: connection.locationName,
      calendarId: connection.calendarId,
      smsSenderNumber: connection.smsSenderNumber,
      isActive: connection.isActive,
      activeWatchCount: toInt(connection.activeWatchCount),
      createdAt: connection.createdAt.toISOString(),
    })),
    recentReviewRequests: recentReviewRequests.map((requestRow) => ({
      id: requestRow.id,
      customerName: requestRow.customerName,
      customerPhone: requestRow.customerPhone,
      customerEmail: requestRow.customerEmail,
      appointmentEnd: requestRow.appointmentEnd.toISOString(),
      smsStatus: requestRow.smsStatus,
      rating: requestRow.rating,
      feedbackText: requestRow.feedbackText,
      createdAt: requestRow.createdAt.toISOString(),
      locationName: requestRow.locationName,
    })),
  })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireReviewFunnelAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid tenant id" }, { status: 400 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = patchSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid tenant update payload",
        details: parsedBody.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const tenantId = parsedParams.data.id
  const payload = parsedBody.data

  const updateData: Partial<NewRfTenant> & { updatedAt: Date } = {
    updatedAt: new Date(),
  }

  if (payload.status) {
    updateData.isActive = payload.status === "active"
  }

  if (payload.plan) {
    const normalizedPlan = payload.plan as ReviewFunnelAdminPlan
    updateData.plan = normalizedPlan
    updateData.smsLimitMonthly = getReviewFunnelSmsLimitMonthly(normalizedPlan)
    updateData.calendarLimit = getReviewFunnelCalendarLimit(normalizedPlan)
  }

  const [updatedTenant] = await rfDb
    .update(rfTenants)
    .set(updateData)
    .where(eq(rfTenants.id, tenantId))
    .returning({
      id: rfTenants.id,
      businessName: rfTenants.businessName,
      ownerName: rfTenants.ownerName,
      ownerEmail: rfTenants.ownerEmail,
      ownerPhone: rfTenants.ownerPhone,
      googlePlaceId: rfTenants.googlePlaceId,
      gmbReviewUrl: rfTenants.gmbReviewUrl,
      plan: rfTenants.plan,
      smsLimitMonthly: rfTenants.smsLimitMonthly,
      calendarLimit: rfTenants.calendarLimit,
      isActive: rfTenants.isActive,
      stripeCustomerId: rfTenants.stripeCustomerId,
      stripeSubscriptionId: rfTenants.stripeSubscriptionId,
      createdAt: rfTenants.createdAt,
      updatedAt: rfTenants.updatedAt,
    })

  if (!updatedTenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
  }

  return NextResponse.json({
    tenant: serializeTenant(updatedTenant),
  })
}
