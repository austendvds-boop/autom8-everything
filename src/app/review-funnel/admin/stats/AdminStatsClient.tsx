"use client"

import { useEffect, useMemo, useState } from "react"

interface AdminStatsResponse {
  month: string
  totalTenants: number
  activeTenants: number
  totalSmsSentThisMonth: number
  mrrMonthlyUsd: number
  newSignupsThisMonth: number
  planCounts: {
    starter: number
    growth: number
    pro: number
    other: number
  }
}

function formatMonth(value: string): string {
  const [year, month] = value.split("-")

  if (!year || !month) {
    return value
  }

  const date = new Date(Number(year), Number(month) - 1, 1)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(undefined, {
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

export default function AdminStatsClient() {
  const [stats, setStats] = useState<AdminStatsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadStats() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/review-funnel/admin/stats", {
          signal: controller.signal,
        })

        const payload = (await response.json().catch(() => null)) as (AdminStatsResponse & { error?: string }) | null

        if (!response.ok) {
          throw new Error(payload?.error || "Could not load stats")
        }

        setStats(payload)
      } catch (loadError) {
        if (controller.signal.aborted) {
          return
        }

        setError(loadError instanceof Error ? loadError.message : "Could not load stats")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadStats()

    return () => controller.abort()
  }, [])

  const planRows = useMemo(() => {
    if (!stats) {
      return []
    }

    return [
      { label: "Starter", count: stats.planCounts.starter },
      { label: "Growth", count: stats.planCounts.growth },
      { label: "Pro", count: stats.planCounts.pro },
      { label: "Other", count: stats.planCounts.other },
    ]
  }, [stats])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Admin</p>
        <h2 className="mt-1 text-3xl font-semibold text-white">Stats</h2>
        <p className="mt-2 text-sm text-[#A1A1AA]">Top-line health for Review Funnel.</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 text-sm text-[#A1A1AA]">Loading stats...</div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <p className="text-sm text-[#A1A1AA]">Total tenants</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stats.totalTenants}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <p className="text-sm text-[#A1A1AA]">Total SMS sent ({formatMonth(stats.month)})</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stats.totalSmsSentThisMonth}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <p className="text-sm text-[#A1A1AA]">MRR</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(stats.mrrMonthlyUsd)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <p className="text-sm text-[#A1A1AA]">New signups ({formatMonth(stats.month)})</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stats.newSignupsThisMonth}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Tenant count by plan</h3>
              <p className="text-sm text-[#A1A1AA]">Active: {stats.activeTenants}</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/[0.02] text-left text-[#D4D4D8]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Plan</th>
                    <th className="px-4 py-3 font-medium">Tenants</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/90">
                  {planRows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
