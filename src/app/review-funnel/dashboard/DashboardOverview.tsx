"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import CalendarStatus from "@/components/review-funnel/CalendarStatus"
import StatsCard from "@/components/review-funnel/StatsCard"

interface StatsPayload {
  stats: {
    totalReviews: number
    averageRating: number
    fiveStarCount: number
    conversionRate: number
    smsSentCount: number
    pageOpenedCount: number
    ratedCount: number
  }
  calendar: {
    connected: boolean
    googleEmail: string | null
    activeWatchCount: number
  }
  recentReviews: Array<{
    id: string
    customerName: string | null
    rating: number | null
    smsStatus: string
    pageOpenedAt: string | null
    appointmentEnd: string
  }>
}

interface SmsUsagePayload {
  month: string
  used: number
  limit: number | null
  unlimited: boolean
  percent: number | null
}

function formatDate(value: string | null): string {
  if (!value) {
    return "—"
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return "—"
  }

  return parsed.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatSmsStatus(status: string): string {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function DashboardOverview() {
  const [statsPayload, setStatsPayload] = useState<StatsPayload | null>(null)
  const [smsUsage, setSmsUsage] = useState<SmsUsagePayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCalendarBusy, setIsCalendarBusy] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [calendarError, setCalendarError] = useState<string | null>(null)

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const [statsResponse, usageResponse] = await Promise.all([
        fetch("/api/review-funnel/dashboard/stats", { cache: "no-store" }),
        fetch("/api/review-funnel/dashboard/sms-usage", { cache: "no-store" }),
      ])

      if (!statsResponse.ok) {
        throw new Error("Could not load dashboard stats")
      }

      if (!usageResponse.ok) {
        throw new Error("Could not load text message usage")
      }

      const stats = (await statsResponse.json()) as StatsPayload
      const usage = (await usageResponse.json()) as SmsUsagePayload

      setStatsPayload(stats)
      setSmsUsage(usage)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load dashboard")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadDashboardData()
  }, [loadDashboardData])

  async function handleCalendarConnect() {
    setCalendarError(null)
    setIsCalendarBusy(true)

    try {
      const response = await fetch("/api/review-funnel/google/auth-url", {
        method: "GET",
        cache: "no-store",
      })

      const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "Unable to start Google Calendar connection")
      }

      window.location.assign(payload.url)
    } catch (error) {
      setCalendarError(error instanceof Error ? error.message : "Unable to connect calendar")
      setIsCalendarBusy(false)
    }
  }

  async function handleCalendarDisconnect() {
    setCalendarError(null)
    setIsCalendarBusy(true)

    try {
      const response = await fetch("/api/review-funnel/google/disconnect", {
        method: "POST",
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to disconnect calendar")
      }

      await loadDashboardData()
    } catch (error) {
      setCalendarError(error instanceof Error ? error.message : "Unable to disconnect calendar")
    } finally {
      setIsCalendarBusy(false)
    }
  }

  const usagePercent = useMemo(() => {
    if (!smsUsage) {
      return 0
    }

    if (smsUsage.unlimited) {
      return smsUsage.used > 0 ? 100 : 0
    }

    return Math.min(100, Math.max(0, smsUsage.percent ?? 0))
  }, [smsUsage])

  const stats = statsPayload?.stats

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Overview
        </h2>
        <p className="mt-1 text-sm text-[#A1A1AA]">Track reviews, text message performance, and customer follow-through at a glance.</p>
      </section>

      {errorMessage ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{errorMessage}</p>
      ) : null}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total reviews"
          value={isLoading || !stats ? "—" : stats.totalReviews.toLocaleString()}
          subtitle={isLoading || !stats ? undefined : `${stats.ratedCount.toLocaleString()} customers left a rating`}
        />
        <StatsCard
          title="Average rating"
          value={isLoading || !stats ? "—" : `${stats.averageRating.toFixed(1)}★`}
          subtitle={isLoading || !stats ? undefined : "Across all submitted ratings"}
        />
        <StatsCard
          title="5★ reviews"
          value={isLoading || !stats ? "—" : stats.fiveStarCount.toLocaleString()}
          subtitle={isLoading || !stats ? undefined : "Happy customers redirected to Google"}
        />
        <StatsCard
          title="Response rate"
          value={isLoading || !stats ? "—" : `${stats.conversionRate.toFixed(1)}%`}
          subtitle={
            isLoading || !stats
              ? undefined
              : `${stats.smsSentCount.toLocaleString()} text messages sent • ${stats.pageOpenedCount.toLocaleString()} opened`
          }
        />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
        <article className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Text message usage</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Current month usage</h3>
            </div>

            {smsUsage ? (
              <p className="text-sm font-medium text-[#D4D4D8]">
                {smsUsage.used.toLocaleString()} / {smsUsage.unlimited ? "Unlimited" : smsUsage.limit?.toLocaleString() ?? "0"}
              </p>
            ) : null}
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] transition-all"
              style={{ width: `${usagePercent}%` }}
            />
          </div>

          {smsUsage ? (
            <p className="mt-3 text-sm text-[#A1A1AA]">
              {smsUsage.unlimited
                ? `Unlimited plan active • ${smsUsage.used.toLocaleString()} text messages sent in ${smsUsage.month}`
                : `${smsUsage.percent ?? 0}% of ${smsUsage.limit?.toLocaleString() ?? "0"} text messages used in ${smsUsage.month}`}
            </p>
          ) : (
            <p className="mt-3 text-sm text-[#A1A1AA]">Loading usage details...</p>
          )}
        </article>

        <CalendarStatus
          connected={Boolean(statsPayload?.calendar.connected)}
          googleEmail={statsPayload?.calendar.googleEmail}
          activeWatchCount={statsPayload?.calendar.activeWatchCount ?? 0}
          isBusy={isCalendarBusy}
          onConnect={handleCalendarConnect}
          onDisconnect={handleCalendarDisconnect}
          errorMessage={calendarError}
        />
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">Recent reviews</h3>
          <span className="text-xs text-[#A1A1AA]">Last 10</span>
        </div>

        {isLoading ? (
          <p className="text-sm text-[#A1A1AA]">Loading recent reviews...</p>
        ) : !statsPayload || statsPayload.recentReviews.length === 0 ? (
          <p className="text-sm text-[#A1A1AA]">No review activity yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-[#A1A1AA]">
                  <th className="px-3 py-2 font-medium">Customer</th>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Rating</th>
                  <th className="px-3 py-2 font-medium">Text Status</th>
                  <th className="px-3 py-2 font-medium">Page Opened</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {statsPayload.recentReviews.map((review) => (
                  <tr key={review.id} className="text-[#E4E4E7]">
                    <td className="px-3 py-2.5">{review.customerName?.trim() || "Unknown"}</td>
                    <td className="px-3 py-2.5">{formatDate(review.appointmentEnd)}</td>
                    <td className="px-3 py-2.5">{review.rating ? `${review.rating}★` : "—"}</td>
                    <td className="px-3 py-2.5">{formatSmsStatus(review.smsStatus)}</td>
                    <td className="px-3 py-2.5">{review.pageOpenedAt ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
