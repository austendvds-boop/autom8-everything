"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowUpDown, Search } from "lucide-react"

type TenantSortField = "created_at" | "plan" | "status"
type SortDirection = "asc" | "desc"

interface AdminTenantRow {
  id: string
  businessName: string
  ownerName: string
  ownerEmail: string
  plan: string
  calendarsConnected: number
  smsUsedThisMonth: number
  smsLimitMonthly: number
  smsLimitUnlimited: boolean
  isActive: boolean
  createdAt: string
}

interface AdminTenantListResponse {
  usageMonth: string
  tenants: AdminTenantRow[]
}

function formatDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatPlan(plan: string): string {
  const normalized = plan.trim().toLowerCase()

  if (normalized === "starter") return "Starter"
  if (normalized === "growth") return "Growth"
  if (normalized === "pro") return "Pro"

  return plan
}

function formatUsageMonth(month: string): string {
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

export default function AdminTenantsClient() {
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<TenantSortField>("created_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tenants, setTenants] = useState<AdminTenantRow[]>([])
  const [usageMonth, setUsageMonth] = useState<string>("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim())
    }, 250)

    return () => clearTimeout(timeout)
  }, [searchInput])

  useEffect(() => {
    const controller = new AbortController()

    async function loadTenants() {
      setIsLoading(true)
      setError(null)

      try {
        const searchParams = new URLSearchParams({
          sort: sortField,
          direction: sortDirection,
        })

        if (search) {
          searchParams.set("search", search)
        }

        const response = await fetch(`/api/review-funnel/admin/tenants?${searchParams.toString()}`, {
          signal: controller.signal,
        })

        const payload = (await response.json().catch(() => null)) as
          | (AdminTenantListResponse & { error?: string })
          | null

        if (!response.ok) {
          throw new Error(payload?.error || "Could not load tenants")
        }

        setTenants(payload?.tenants ?? [])
        setUsageMonth(payload?.usageMonth ?? "")
      } catch (loadError) {
        if (controller.signal.aborted) {
          return
        }

        setError(loadError instanceof Error ? loadError.message : "Could not load tenants")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadTenants()

    return () => controller.abort()
  }, [search, sortDirection, sortField])

  const usageMonthLabel = useMemo(() => {
    return usageMonth ? formatUsageMonth(usageMonth) : "this month"
  }, [usageMonth])

  function toggleSort(field: TenantSortField) {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
      return
    }

    setSortField(field)
    setSortDirection(field === "created_at" ? "desc" : "asc")
  }

  function sortLabel(field: TenantSortField): string {
    if (sortField !== field) {
      return ""
    }

    return sortDirection === "asc" ? "(ascending)" : "(descending)"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Admin</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">Tenants</h2>
          <p className="mt-2 text-sm text-[#A1A1AA]">Search by business name or owner email.</p>
        </div>

        <label className="relative block w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search businesses or emails"
            className="w-full rounded-lg border border-white/10 bg-[#101018] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
          />
        </label>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12121A]">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/[0.02] text-[#D4D4D8]">
            <tr>
              <th className="px-4 py-3 font-medium">Business Name</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">
                <button
                  type="button"
                  onClick={() => toggleSort("plan")}
                  className="inline-flex items-center gap-1 text-left transition hover:text-white"
                >
                  Plan <ArrowUpDown className="h-3.5 w-3.5" />
                  <span className="sr-only">{sortLabel("plan")}</span>
                </button>
              </th>
              <th className="px-4 py-3 font-medium">Calendars Connected</th>
              <th className="px-4 py-3 font-medium">SMS Used/Limit ({usageMonthLabel})</th>
              <th className="px-4 py-3 font-medium">
                <button
                  type="button"
                  onClick={() => toggleSort("status")}
                  className="inline-flex items-center gap-1 text-left transition hover:text-white"
                >
                  Status <ArrowUpDown className="h-3.5 w-3.5" />
                  <span className="sr-only">{sortLabel("status")}</span>
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button
                  type="button"
                  onClick={() => toggleSort("created_at")}
                  className="inline-flex items-center gap-1 text-left transition hover:text-white"
                >
                  Created At <ArrowUpDown className="h-3.5 w-3.5" />
                  <span className="sr-only">{sortLabel("created_at")}</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/90">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-[#A1A1AA]">
                  Loading tenants...
                </td>
              </tr>
            ) : tenants.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-[#A1A1AA]">
                  No tenants found.
                </td>
              </tr>
            ) : (
              tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium text-white">
                    <Link href={`/review-funnel/admin/tenants/${tenant.id}`} className="hover:text-[#C4B5FD]">
                      {tenant.businessName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{tenant.ownerName}</td>
                  <td className="px-4 py-3 text-[#C4B5FD]">{tenant.ownerEmail}</td>
                  <td className="px-4 py-3">{formatPlan(tenant.plan)}</td>
                  <td className="px-4 py-3">{tenant.calendarsConnected}</td>
                  <td className="px-4 py-3">
                    {tenant.smsUsedThisMonth} / {tenant.smsLimitUnlimited ? "Unlimited" : tenant.smsLimitMonthly}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        tenant.isActive
                          ? "border border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                          : "border border-zinc-500/40 bg-zinc-500/10 text-zinc-300"
                      }`}
                    >
                      {tenant.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#D4D4D8]">{formatDate(tenant.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
