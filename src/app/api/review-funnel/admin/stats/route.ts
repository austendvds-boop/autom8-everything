import { eq, gte, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { getReviewFunnelPlanAmountMonthlyUsd } from "@/lib/review-funnel/admin"
import { requireReviewFunnelAdminAuth } from "@/lib/review-funnel/admin-middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfSmsUsage, rfTenants } from "@/lib/review-funnel/db/schema"

function usageMonth(date = new Date()): string {
  return date.toISOString().slice(0, 7)
}

function monthStart(date = new Date()): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0))
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

  const month = usageMonth()

  const [smsTotalRow] = await rfDb
    .select({
      total: sql<number>`coalesce(sum(${rfSmsUsage.count}), 0)`,
    })
    .from(rfSmsUsage)
    .where(eq(rfSmsUsage.month, month))

  const planRows = await rfDb
    .select({
      plan: rfTenants.plan,
      count: sql<number>`count(*)`,
    })
    .from(rfTenants)
    .groupBy(rfTenants.plan)

  const activeTenants = await rfDb
    .select({
      plan: rfTenants.plan,
    })
    .from(rfTenants)
    .where(eq(rfTenants.isActive, true))

  const [newSignupsRow] = await rfDb
    .select({
      count: sql<number>`count(*)`,
    })
    .from(rfTenants)
    .where(gte(rfTenants.createdAt, monthStart()))

  const planCounts = {
    starter: 0,
    growth: 0,
    pro: 0,
    other: 0,
  }

  for (const row of planRows) {
    const normalizedPlan = row.plan?.trim().toLowerCase()
    const count = toInt(row.count)

    if (normalizedPlan === "starter" || normalizedPlan === "growth" || normalizedPlan === "pro") {
      planCounts[normalizedPlan] += count
      continue
    }

    planCounts.other += count
  }

  const mrrMonthlyUsd = activeTenants.reduce((total, row) => {
    return total + getReviewFunnelPlanAmountMonthlyUsd(row.plan)
  }, 0)

  return NextResponse.json({
    month,
    totalTenants: planCounts.starter + planCounts.growth + planCounts.pro + planCounts.other,
    activeTenants: activeTenants.length,
    totalSmsSentThisMonth: toInt(smsTotalRow?.total),
    mrrMonthlyUsd,
    newSignupsThisMonth: toInt(newSignupsRow?.count),
    planCounts,
  })
}
