import type { Metadata } from "next"
import { getReviewFunnelAdminStatsData } from "@/lib/review-funnel/admin-dashboard"

export const metadata: Metadata = {
  title: "Review Funnel Admin | Stats",
  description: "Internal Review Funnel admin stats.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

function formatMonth(value: string): string {
  const [year, month] = value.split("-")

  if (!year || !month) {
    return value
  }

  const parsedDate = new Date(Number(year), Number(month) - 1, 1)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  })
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export default async function ReviewFunnelAdminStatsPage() {
  const stats = await getReviewFunnelAdminStatsData()
  const monthLabel = formatMonth(stats.usageMonth)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Admin</p>
        <h2 className="mt-1 text-3xl font-semibold text-white">Stats</h2>
        <p className="mt-2 text-sm text-[#A1A1AA]">Current month: {monthLabel}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <p className="text-sm text-[#A1A1AA]">Starter MRR</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(stats.starterMrr)}</p>
          <p className="mt-1 text-xs text-[#A1A1AA]">{stats.starterActiveTenants} active Starter businesses × $79</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <p className="text-sm text-[#A1A1AA]">Growth MRR</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(stats.growthMrr)}</p>
          <p className="mt-1 text-xs text-[#A1A1AA]">{stats.growthActiveTenants} active Growth businesses × $149</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <p className="text-sm text-[#A1A1AA]">Total MRR</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(stats.totalMrr)}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <p className="text-sm text-[#A1A1AA]">Total text messages sent this month</p>
          <p className="mt-2 text-3xl font-semibold text-white">{stats.totalTextMessagesThisMonth}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <p className="text-sm text-[#A1A1AA]">New signups this month</p>
          <p className="mt-2 text-3xl font-semibold text-white">{stats.newSignupsThisMonth}</p>
        </div>
      </div>
    </div>
  )
}
