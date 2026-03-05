export const RF_ADMIN_SESSION_COOKIE_NAME = "rf_admin_session"
export const RF_ADMIN_SESSION_TTL_HOURS = 8
export const PRO_SMS_LIMIT_SENTINEL = 999_999

export const REVIEW_FUNNEL_PLAN_CONFIG = {
  starter: {
    label: "Starter",
    amountMonthlyUsd: 79,
    smsLimitMonthly: 150,
    calendarLimit: 1,
  },
  growth: {
    label: "Growth",
    amountMonthlyUsd: 149,
    smsLimitMonthly: 600,
    calendarLimit: 5,
  },
  pro: {
    label: "Pro",
    amountMonthlyUsd: 0,
    smsLimitMonthly: PRO_SMS_LIMIT_SENTINEL,
    calendarLimit: PRO_SMS_LIMIT_SENTINEL,
  },
} as const

export type ReviewFunnelAdminPlan = keyof typeof REVIEW_FUNNEL_PLAN_CONFIG

export function normalizeReviewFunnelPlan(plan: string | null | undefined): ReviewFunnelAdminPlan | null {
  const normalized = plan?.trim().toLowerCase()

  if (normalized === "starter" || normalized === "growth" || normalized === "pro") {
    return normalized
  }

  return null
}

export function getReviewFunnelPlanAmountMonthlyUsd(plan: string | null | undefined): number {
  const normalized = normalizeReviewFunnelPlan(plan)

  if (!normalized) {
    return 0
  }

  return REVIEW_FUNNEL_PLAN_CONFIG[normalized].amountMonthlyUsd
}

export function getReviewFunnelSmsLimitMonthly(plan: ReviewFunnelAdminPlan): number {
  return REVIEW_FUNNEL_PLAN_CONFIG[plan].smsLimitMonthly
}

export function getReviewFunnelCalendarLimit(plan: ReviewFunnelAdminPlan): number {
  return REVIEW_FUNNEL_PLAN_CONFIG[plan].calendarLimit
}
