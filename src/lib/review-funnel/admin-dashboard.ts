import "server-only"
import { gte, sql } from "drizzle-orm"
import { unstable_cache } from "next/cache"
import { PRO_SMS_LIMIT_SENTINEL } from "./admin"
import { rfCalendarWatches, rfSmsUsage, rfTenants } from "./db/schema"

const STARTER_MRR_USD = 79
const GROWTH_MRR_USD = 149

async function getReviewFunnelDb() {
  const { rfDb } = await import("./db/client")
  return rfDb
}

type StripeBillingStatus = "active" | "past_due" | "cancelled"
type AttentionSeverity = 1 | 2 | 3 | 4 | 5

export interface ReviewFunnelAttentionBadge {
  key: "payment_issue" | "no_calendar" | "calendar_offline" | "no_messages_sent" | "upgrade_ready"
  label: "Payment issue" | "No calendar" | "Calendar offline" | "No messages sent" | "Upgrade ready"
  tone: "red" | "yellow" | "green"
  severity: AttentionSeverity
}

export interface ReviewFunnelAdminTenantRow {
  id: string
  businessName: string
  plan: string
  planLabel: string
  calendarsConnected: number
  textMessagesUsedThisMonth: number
  monthlyTextMessageLimit: number
  hasUnlimitedTextMessages: boolean
  subscriptionStatus: StripeBillingStatus
  joinedAt: Date
  joinedAtIso: string
  attentionBadges: ReviewFunnelAttentionBadge[]
  highestAttentionSeverity: number
}

export interface ReviewFunnelAdminTenantListData {
  usageMonth: string
  tenants: ReviewFunnelAdminTenantRow[]
}

export interface ReviewFunnelAdminStatsData {
  usageMonth: string
  starterMrr: number
  growthMrr: number
  totalMrr: number
  starterActiveTenants: number
  growthActiveTenants: number
  totalTextMessagesThisMonth: number
  newSignupsThisMonth: number
}

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
    const parsedValue = Number(value)
    return Number.isFinite(parsedValue) ? parsedValue : 0
  }

  return 0
}

function toPlanLabel(rawPlan: string): string {
  const normalized = rawPlan.trim().toLowerCase()

  if (normalized === "starter") {
    return "Starter"
  }

  if (normalized === "growth") {
    return "Growth"
  }

  if (normalized === "pro") {
    return "Pro"
  }

  return rawPlan
}

const getStripeSubscriptionStatus = unstable_cache(
  async (subscriptionId: string): Promise<string | null> => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim()

    if (!stripeSecretKey) {
      return null
    }

    const response = await fetch(`https://api.stripe.com/v1/subscriptions/${encodeURIComponent(subscriptionId)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json().catch(() => null)) as { status?: unknown } | null

    return typeof payload?.status === "string" ? payload.status : null
  },
  ["rf-admin-stripe-subscription-status"],
  { revalidate: 300 },
)

function mapStripeBillingStatus(status: string | null | undefined): {
  status: StripeBillingStatus
  hasPaymentIssue: boolean
} {
  const normalized = status?.trim().toLowerCase()

  if (normalized === "past_due" || normalized === "unpaid") {
    return {
      status: "past_due",
      hasPaymentIssue: true,
    }
  }

  if (normalized === "active" || normalized === "trialing") {
    return {
      status: "active",
      hasPaymentIssue: false,
    }
  }

  return {
    status: "cancelled",
    hasPaymentIssue: false,
  }
}

function buildAttentionBadges(input: {
  hasPaymentIssue: boolean
  totalCalendarConnections: number
  activeCalendarConnections: number
  totalMessagesSentAllTime: number
  textMessagesUsedThisMonth: number
  monthlyTextMessageLimit: number
}): ReviewFunnelAttentionBadge[] {
  const badges: ReviewFunnelAttentionBadge[] = []

  if (input.hasPaymentIssue) {
    badges.push({
      key: "payment_issue",
      label: "Payment issue",
      tone: "red",
      severity: 1,
    })
  }

  if (input.totalCalendarConnections === 0) {
    badges.push({
      key: "no_calendar",
      label: "No calendar",
      tone: "red",
      severity: 2,
    })
  }

  if (input.totalCalendarConnections > 0 && input.activeCalendarConnections === 0) {
    badges.push({
      key: "calendar_offline",
      label: "Calendar offline",
      tone: "yellow",
      severity: 3,
    })
  }

  if (input.totalMessagesSentAllTime === 0) {
    badges.push({
      key: "no_messages_sent",
      label: "No messages sent",
      tone: "red",
      severity: 4,
    })
  }

  const canComputeUpgradeReadiness =
    input.monthlyTextMessageLimit > 0 && input.monthlyTextMessageLimit < PRO_SMS_LIMIT_SENTINEL
  const hasReachedUpgradeThreshold =
    canComputeUpgradeReadiness && input.textMessagesUsedThisMonth / input.monthlyTextMessageLimit >= 0.8

  if (hasReachedUpgradeThreshold) {
    badges.push({
      key: "upgrade_ready",
      label: "Upgrade ready",
      tone: "green",
      severity: 5,
    })
  }

  return badges
}

function highestSeverity(badges: ReviewFunnelAttentionBadge[]): number {
  if (badges.length === 0) {
    return Number.POSITIVE_INFINITY
  }

  return badges.reduce((lowest, badge) => Math.min(lowest, badge.severity), Number.POSITIVE_INFINITY)
}

export async function getReviewFunnelAdminTenantListData(): Promise<ReviewFunnelAdminTenantListData> {
  const month = usageMonth()
  const rfDb = await getReviewFunnelDb()

  const rows = await rfDb
    .select({
      id: rfTenants.id,
      businessName: rfTenants.businessName,
      plan: rfTenants.plan,
      monthlyTextMessageLimit: rfTenants.smsLimitMonthly,
      stripeSubscriptionId: rfTenants.stripeSubscriptionId,
      isActive: rfTenants.isActive,
      joinedAt: rfTenants.createdAt,
      activeCalendarConnections: sql<number>`coalesce((
        select count(*)::int
        from ${rfCalendarWatches}
        where ${rfCalendarWatches.tenantId} = ${rfTenants.id}
          and ${rfCalendarWatches.isActive} = true
      ), 0)`,
      totalCalendarConnections: sql<number>`coalesce((
        select count(*)::int
        from ${rfCalendarWatches}
        where ${rfCalendarWatches.tenantId} = ${rfTenants.id}
      ), 0)`,
      textMessagesUsedThisMonth: sql<number>`coalesce((
        select ${rfSmsUsage.count}
        from ${rfSmsUsage}
        where ${rfSmsUsage.tenantId} = ${rfTenants.id}
          and ${rfSmsUsage.month} = ${month}
        limit 1
      ), 0)`,
      totalMessagesSentAllTime: sql<number>`coalesce((
        select sum(${rfSmsUsage.count})::int
        from ${rfSmsUsage}
        where ${rfSmsUsage.tenantId} = ${rfTenants.id}
      ), 0)`,
    })
    .from(rfTenants)

  const tenants = await Promise.all(
    rows.map(async (row): Promise<ReviewFunnelAdminTenantRow> => {
      const activeCalendarConnections = toInt(row.activeCalendarConnections)
      const totalCalendarConnections = toInt(row.totalCalendarConnections)
      const textMessagesUsedThisMonth = toInt(row.textMessagesUsedThisMonth)
      const totalMessagesSentAllTime = toInt(row.totalMessagesSentAllTime)

      const stripeSubscriptionStatus = row.stripeSubscriptionId
        ? await getStripeSubscriptionStatus(row.stripeSubscriptionId)
        : null

      const mappedStripeStatus = mapStripeBillingStatus(
        stripeSubscriptionStatus ?? (row.isActive ? "active" : "cancelled"),
      )

      const attentionBadges = buildAttentionBadges({
        hasPaymentIssue: mappedStripeStatus.hasPaymentIssue,
        totalCalendarConnections,
        activeCalendarConnections,
        totalMessagesSentAllTime,
        textMessagesUsedThisMonth,
        monthlyTextMessageLimit: row.monthlyTextMessageLimit,
      })

      return {
        id: row.id,
        businessName: row.businessName,
        plan: row.plan,
        planLabel: toPlanLabel(row.plan),
        calendarsConnected: activeCalendarConnections,
        textMessagesUsedThisMonth,
        monthlyTextMessageLimit: row.monthlyTextMessageLimit,
        hasUnlimitedTextMessages: row.monthlyTextMessageLimit >= PRO_SMS_LIMIT_SENTINEL,
        subscriptionStatus: mappedStripeStatus.status,
        joinedAt: row.joinedAt,
        joinedAtIso: row.joinedAt.toISOString(),
        attentionBadges,
        highestAttentionSeverity: highestSeverity(attentionBadges),
      }
    }),
  )

  tenants.sort((left, right) => {
    if (left.highestAttentionSeverity !== right.highestAttentionSeverity) {
      return left.highestAttentionSeverity - right.highestAttentionSeverity
    }

    return right.joinedAt.getTime() - left.joinedAt.getTime()
  })

  return {
    usageMonth: month,
    tenants,
  }
}

export async function getReviewFunnelAdminStatsData(): Promise<ReviewFunnelAdminStatsData> {
  const month = usageMonth()
  const rfDb = await getReviewFunnelDb()
  const tenantList = await getReviewFunnelAdminTenantListData()

  const starterActiveTenants = tenantList.tenants.filter(
    (tenant) => tenant.plan.trim().toLowerCase() === "starter" && tenant.subscriptionStatus === "active",
  ).length

  const growthActiveTenants = tenantList.tenants.filter(
    (tenant) => tenant.plan.trim().toLowerCase() === "growth" && tenant.subscriptionStatus === "active",
  ).length

  const [totalMessagesRow] = await rfDb
    .select({
      totalMessages: sql<number>`coalesce(sum(${rfSmsUsage.count})::int, 0)`,
    })
    .from(rfSmsUsage)
    .where(sql`${rfSmsUsage.month} = ${month}`)

  const [newSignupsRow] = await rfDb
    .select({
      count: sql<number>`count(*)::int`,
    })
    .from(rfTenants)
    .where(gte(rfTenants.createdAt, monthStart()))

  const starterMrr = starterActiveTenants * STARTER_MRR_USD
  const growthMrr = growthActiveTenants * GROWTH_MRR_USD

  return {
    usageMonth: month,
    starterMrr,
    growthMrr,
    totalMrr: starterMrr + growthMrr,
    starterActiveTenants,
    growthActiveTenants,
    totalTextMessagesThisMonth: toInt(totalMessagesRow?.totalMessages),
    newSignupsThisMonth: toInt(newSignupsRow?.count),
  }
}
