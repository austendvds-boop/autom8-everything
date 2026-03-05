"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

interface TenantRecord {
  id: string
  businessName: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  googlePlaceId: string | null
  gmbReviewUrl: string
  plan: "starter" | "growth" | "pro" | string
  planLabel: string
  planAmountMonthlyUsd: number
  smsLimitMonthly: number
  smsLimitUnlimited: boolean
  calendarLimit: number | null
  isActive: boolean
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  createdAt: string
  updatedAt: string
}

interface CalendarConnection {
  id: string
  locationName: string
  calendarId: string | null
  smsSenderNumber: string | null
  isActive: boolean
  activeWatchCount: number
  createdAt: string
}

interface SmsUsageHistoryRow {
  month: string
  count: number
}

interface ReviewRequestRow {
  id: string
  customerName: string | null
  customerPhone: string | null
  customerEmail: string | null
  appointmentEnd: string
  smsStatus: string
  rating: number | null
  feedbackText: string | null
  createdAt: string
  locationName: string | null
}

interface TenantDetailResponse {
  tenant: TenantRecord
  smsSummary: {
    month: string
    usedThisMonth: number
  }
  smsUsageHistory: SmsUsageHistoryRow[]
  calendarConnections: CalendarConnection[]
  recentReviewRequests: ReviewRequestRow[]
}

interface AdminTenantDetailClientProps {
  tenantId: string
}

function formatDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function formatShortDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatMonthLabel(month: string): string {
  const [year, rawMonth] = month.split("-")

  if (!year || !rawMonth) {
    return month
  }

  const date = new Date(Number(year), Number(rawMonth) - 1, 1)

  if (Number.isNaN(date.getTime())) {
    return month
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

export default function AdminTenantDetailClient({ tenantId }: AdminTenantDetailClientProps) {
  const [data, setData] = useState<TenantDetailResponse | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth" | "pro">("starter")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const loadTenant = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/review-funnel/admin/tenants/${tenantId}`)
      const payload = (await response.json().catch(() => null)) as (TenantDetailResponse & { error?: string }) | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not load tenant")
      }

      if (!payload) {
        throw new Error("No tenant data returned")
      }

      setData(payload)

      const tenantPlan = payload.tenant.plan
      if (tenantPlan === "starter" || tenantPlan === "growth" || tenantPlan === "pro") {
        setSelectedPlan(tenantPlan)
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load tenant")
    } finally {
      setIsLoading(false)
    }
  }, [tenantId])

  useEffect(() => {
    void loadTenant()
  }, [loadTenant])

  const smsLimitLabel = useMemo(() => {
    if (!data) {
      return "-"
    }

    return data.tenant.smsLimitUnlimited ? "Unlimited" : String(data.tenant.smsLimitMonthly)
  }, [data])

  async function applyTenantUpdate(payload: { status?: "active" | "inactive"; plan?: "starter" | "growth" | "pro" }) {
    setIsSaving(true)
    setError(null)
    setSaveMessage(null)

    try {
      const response = await fetch(`/api/review-funnel/admin/tenants/${tenantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const responsePayload = (await response.json().catch(() => null)) as
        | { error?: string; tenant?: TenantRecord }
        | null

      if (!response.ok) {
        throw new Error(responsePayload?.error || "Could not save tenant")
      }

      setSaveMessage("Changes saved")
      await loadTenant()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not save tenant")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleStatusToggle() {
    if (!data) {
      return
    }

    await applyTenantUpdate({
      status: data.tenant.isActive ? "inactive" : "active",
    })
  }

  async function handlePlanChange() {
    await applyTenantUpdate({
      plan: selectedPlan,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Admin</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">Tenant detail</h2>
        </div>

        <Link
          href="/review-funnel/admin"
          className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15"
        >
          Back to tenants
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
      ) : null}

      {saveMessage ? (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {saveMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 text-sm text-[#A1A1AA]">Loading tenant details...</div>
      ) : data ? (
        <>
          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
            <h3 className="text-2xl font-semibold text-white">{data.tenant.businessName}</h3>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              {data.tenant.ownerName} · {data.tenant.ownerEmail}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                <p className="text-xs uppercase tracking-wide text-[#71717A]">Plan</p>
                <p className="mt-2 text-lg font-semibold text-white">{data.tenant.planLabel}</p>
                <p className="text-xs text-[#A1A1AA]">{formatCurrency(data.tenant.planAmountMonthlyUsd)} / month</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                <p className="text-xs uppercase tracking-wide text-[#71717A]">Status</p>
                <p className="mt-2 text-lg font-semibold text-white">{data.tenant.isActive ? "Active" : "Inactive"}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                <p className="text-xs uppercase tracking-wide text-[#71717A]">SMS used this month</p>
                <p className="mt-2 text-lg font-semibold text-white">{data.smsSummary.usedThisMonth}</p>
                <p className="text-xs text-[#A1A1AA]">Limit: {smsLimitLabel}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                <p className="text-xs uppercase tracking-wide text-[#71717A]">Calendars connected</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {data.calendarConnections.filter((item) => item.calendarId).length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <h3 className="text-lg font-semibold text-white">Tenant info</h3>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-[#A1A1AA]">Owner</dt>
                  <dd className="text-white">{data.tenant.ownerName}</dd>
                </div>
                <div>
                  <dt className="text-[#A1A1AA]">Email</dt>
                  <dd className="text-white">{data.tenant.ownerEmail}</dd>
                </div>
                <div>
                  <dt className="text-[#A1A1AA]">Phone</dt>
                  <dd className="text-white">{data.tenant.ownerPhone}</dd>
                </div>
                <div>
                  <dt className="text-[#A1A1AA]">Google place id</dt>
                  <dd className="break-all text-white">{data.tenant.googlePlaceId || "-"}</dd>
                </div>
                <div>
                  <dt className="text-[#A1A1AA]">Review link</dt>
                  <dd className="break-all text-white">{data.tenant.gmbReviewUrl}</dd>
                </div>
                <div>
                  <dt className="text-[#A1A1AA]">Created</dt>
                  <dd className="text-white">{formatDate(data.tenant.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-[#A1A1AA]">Stripe customer id</dt>
                  <dd className="break-all text-white">{data.tenant.stripeCustomerId || "-"}</dd>
                </div>
                <div>
                  <dt className="text-[#A1A1AA]">Stripe subscription id</dt>
                  <dd className="break-all text-white">{data.tenant.stripeSubscriptionId || "-"}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <h3 className="text-lg font-semibold text-white">Actions</h3>

              <div className="mt-4 space-y-4">
                <button
                  type="button"
                  onClick={() => void handleStatusToggle()}
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {data.tenant.isActive ? "Deactivate" : "Reactivate"}
                </button>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Change plan</label>
                  <select
                    value={selectedPlan}
                    onChange={(event) => setSelectedPlan(event.target.value as "starter" | "growth" | "pro")}
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                  >
                    <option value="starter">Starter</option>
                    <option value="growth">Growth</option>
                    <option value="pro">Pro</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => void handlePlanChange()}
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save plan
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <h3 className="text-lg font-semibold text-white">Calendar connections</h3>
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/[0.02] text-left text-[#D4D4D8]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Location</th>
                      <th className="px-4 py-3 font-medium">Calendar ID</th>
                      <th className="px-4 py-3 font-medium">Watchers</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/90">
                    {data.calendarConnections.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-4 text-center text-[#A1A1AA]">
                          No calendar connections found.
                        </td>
                      </tr>
                    ) : (
                      data.calendarConnections.map((connection) => (
                        <tr key={connection.id}>
                          <td className="px-4 py-3">{connection.locationName}</td>
                          <td className="px-4 py-3">{connection.calendarId || "-"}</td>
                          <td className="px-4 py-3">{connection.activeWatchCount}</td>
                          <td className="px-4 py-3">{connection.isActive ? "Active" : "Inactive"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
              <h3 className="text-lg font-semibold text-white">SMS usage (last 3 months)</h3>
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/[0.02] text-left text-[#D4D4D8]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Month</th>
                      <th className="px-4 py-3 font-medium">SMS sent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/90">
                    {data.smsUsageHistory.map((entry) => (
                      <tr key={entry.month}>
                        <td className="px-4 py-3">{formatMonthLabel(entry.month)}</td>
                        <td className="px-4 py-3">{entry.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
            <h3 className="text-lg font-semibold text-white">Recent review requests (last 20)</h3>
            <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/[0.02] text-left text-[#D4D4D8]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Appointment End</th>
                    <th className="px-4 py-3 font-medium">SMS Status</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/90">
                  {data.recentReviewRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 text-center text-[#A1A1AA]">
                        No review requests found.
                      </td>
                    </tr>
                  ) : (
                    data.recentReviewRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-4 py-3">
                          <div>{request.customerName || "Unknown"}</div>
                          <div className="text-xs text-[#A1A1AA]">{request.customerPhone || request.customerEmail || "-"}</div>
                        </td>
                        <td className="px-4 py-3">{request.locationName || "-"}</td>
                        <td className="px-4 py-3">{formatShortDate(request.appointmentEnd)}</td>
                        <td className="px-4 py-3">{request.smsStatus}</td>
                        <td className="px-4 py-3">{request.rating ?? "-"}</td>
                        <td className="px-4 py-3">{formatShortDate(request.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
