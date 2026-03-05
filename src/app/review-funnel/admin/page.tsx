import type { Metadata } from "next"
import Link from "next/link"
import {
  type ReviewFunnelAttentionBadge,
  getReviewFunnelAdminTenantListData,
} from "@/lib/review-funnel/admin-dashboard"

export const metadata: Metadata = {
  title: "Review Funnel Admin | Businesses",
  description: "Internal Review Funnel business management panel.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

function formatDate(value: string): string {
  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return "-"
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatUsageMonth(value: string): string {
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

function badgeStyle(badge: ReviewFunnelAttentionBadge): { chip: string; dot: string } {
  if (badge.tone === "red") {
    return {
      chip: "border-red-400/35 bg-red-500/10 text-red-200",
      dot: "bg-red-400",
    }
  }

  if (badge.tone === "yellow") {
    return {
      chip: "border-amber-400/35 bg-amber-500/10 text-amber-200",
      dot: "bg-amber-300",
    }
  }

  return {
    chip: "border-emerald-400/35 bg-emerald-500/10 text-emerald-200",
    dot: "bg-emerald-300",
  }
}

function statusStyle(status: "active" | "past_due" | "cancelled") {
  if (status === "active") {
    return "border-emerald-400/35 bg-emerald-500/10 text-emerald-200"
  }

  if (status === "past_due") {
    return "border-amber-400/35 bg-amber-500/10 text-amber-200"
  }

  return "border-zinc-500/40 bg-zinc-500/10 text-zinc-300"
}

export default async function ReviewFunnelAdminPage() {
  const tenantList = await getReviewFunnelAdminTenantListData()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Admin</p>
        <h2 className="mt-1 text-3xl font-semibold text-white">Businesses</h2>
        <p className="mt-2 text-sm text-[#A1A1AA]">
          Sorted by needs attention first, then newest joined date. Text message usage month: {" "}
          {formatUsageMonth(tenantList.usageMonth)}.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12121A]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/[0.02] text-[#D4D4D8]">
              <tr>
                <th className="px-4 py-3 font-medium">Business name</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Calendars connected</th>
                <th className="px-4 py-3 font-medium">Text messages used this month / monthly limit</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-white/90">
              {tenantList.tenants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-[#A1A1AA]">
                    No businesses yet.
                  </td>
                </tr>
              ) : (
                tenantList.tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 align-top">
                      <Link href={`/review-funnel/admin/tenants/${tenant.id}`} className="font-medium text-white hover:text-[#C4B5FD]">
                        {tenant.businessName}
                      </Link>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {tenant.attentionBadges.map((badge) => {
                          const style = badgeStyle(badge)

                          return (
                            <span
                              key={badge.key}
                              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${style.chip}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
                              {badge.label}
                            </span>
                          )
                        })}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">{tenant.planLabel}</td>
                    <td className="px-4 py-3 align-top">{tenant.calendarsConnected}</td>
                    <td className="px-4 py-3 align-top">
                      {tenant.textMessagesUsedThisMonth} / {tenant.hasUnlimitedTextMessages ? "Unlimited" : tenant.monthlyTextMessageLimit}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle(tenant.subscriptionStatus)}`}>
                        {tenant.subscriptionStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top text-[#D4D4D8]">{formatDate(tenant.joinedAtIso)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
