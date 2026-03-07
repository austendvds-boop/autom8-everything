"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type ServiceType = "cadence" | "review_funnel" | string

type ServiceStatus = "active" | "paused" | "cancelled" | string

interface PortalService {
  serviceType: ServiceType
  status: ServiceStatus
  cadenceTenantId: string | null
  rfTenantId: string | null
  provisionedAt: string | null
}

interface PortalClient {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string | null
}

interface PortalMeResponse {
  client: PortalClient
  services: PortalService[]
}

interface PortalCallsPreview {
  callCount?: number
  total?: number
  count?: number
  calls?: unknown[]
}

function statusBadge(status: ServiceStatus) {
  if (status === "active") {
    return {
      dot: "bg-emerald-400",
      label: "Active",
    }
  }

  if (status === "paused") {
    return {
      dot: "bg-amber-400",
      label: "Paused",
    }
  }

  return {
    dot: "bg-zinc-400",
    label: "Inactive",
  }
}

function getCallCount(payload: PortalCallsPreview | null): number | null {
  if (!payload) {
    return null
  }

  const possibleCount = [payload.callCount, payload.total, payload.count]

  for (const value of possibleCount) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value
    }
  }

  if (Array.isArray(payload.calls)) {
    return payload.calls.length
  }

  return null
}

export default function PortalDashboardClient() {
  const router = useRouter()
  const [client, setClient] = useState<PortalClient | null>(null)
  const [services, setServices] = useState<PortalService[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [isLoadingCadenceStats, setIsLoadingCadenceStats] = useState(false)
  const [cadenceCallsThisMonth, setCadenceCallsThisMonth] = useState<number | null>(null)

  const [isOpeningBilling, setIsOpeningBilling] = useState(false)
  const [billingError, setBillingError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadPortalData() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const response = await fetch("/api/portal/me", {
          method: "GET",
          cache: "no-store",
        })

        if (response.status === 401) {
          router.replace("/portal/login")
          return
        }

        const payload = (await response.json().catch(() => null)) as (PortalMeResponse & { error?: string }) | null

        if (!response.ok || !payload?.client) {
          throw new Error(payload?.error || "We could not load your portal right now.")
        }

        if (!isActive) {
          return
        }

        setClient(payload.client)
        setServices(payload.services ?? [])
      } catch (loadError) {
        if (isActive) {
          setErrorMessage(loadError instanceof Error ? loadError.message : "We could not load your portal right now.")
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadPortalData()

    return () => {
      isActive = false
    }
  }, [router])

  const cadenceService = useMemo(
    () => services.find((service) => service.serviceType === "cadence"),
    [services],
  )

  const reviewService = useMemo(
    () => services.find((service) => service.serviceType === "review_funnel"),
    [services],
  )

  useEffect(() => {
    if (!cadenceService || cadenceService.status !== "active") {
      return
    }

    let isActive = true

    async function loadCadenceStats() {
      setIsLoadingCadenceStats(true)

      try {
        const response = await fetch("/api/portal/cadence/calls?limit=1&offset=0", {
          method: "GET",
          cache: "no-store",
        })

        const payload = (await response.json().catch(() => null)) as (PortalCallsPreview & { error?: string }) | null

        if (!response.ok) {
          throw new Error(payload?.error || "Could not load call stats")
        }

        if (isActive) {
          setCadenceCallsThisMonth(getCallCount(payload))
        }
      } catch {
        if (isActive) {
          setCadenceCallsThisMonth(null)
        }
      } finally {
        if (isActive) {
          setIsLoadingCadenceStats(false)
        }
      }
    }

    void loadCadenceStats()

    return () => {
      isActive = false
    }
  }, [cadenceService])

  async function handleManageBilling() {
    setIsOpeningBilling(true)
    setBillingError(null)

    try {
      const response = await fetch("/api/portal/billing/portal", {
        method: "POST",
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; url?: string } | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "Could not open billing right now.")
      }

      window.location.href = payload.url
    } catch (billingOpenError) {
      setBillingError(
        billingOpenError instanceof Error ? billingOpenError.message : "Could not open billing right now.",
      )
      setIsOpeningBilling(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-[#A1A1AA]">Loading your portal...</div>
        </div>
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-sm text-red-300">
          {errorMessage}
        </div>
      </main>
    )
  }

  const contactName = client?.contactName || "there"
  const businessName = client?.businessName || "your business"

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-white">Welcome back, {contactName}</h1>
          <p className="mt-2 text-sm text-[#A1A1AA]">{businessName}</p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cadenceService ? (
            <article className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl" aria-hidden>
                    📞
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Cadence AI Receptionist</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#D4D4D8]">
                  <span className={`h-2 w-2 rounded-full ${statusBadge(cadenceService.status).dot}`} />
                  {statusBadge(cadenceService.status).label}
                </span>
              </div>

              <p className="mt-4 text-sm text-[#A1A1AA]">
                {isLoadingCadenceStats
                  ? "Loading call activity..."
                  : cadenceCallsThisMonth !== null
                    ? `${cadenceCallsThisMonth} calls this month`
                    : "View calls and settings"}
              </p>

              <button
                type="button"
                onClick={() => router.push("/portal/cadence")}
                className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30"
              >
                Manage
              </button>
            </article>
          ) : null}

          {reviewService ? (
            <article className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl" aria-hidden>
                    ⭐
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Review Funnel</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#D4D4D8]">
                  <span className={`h-2 w-2 rounded-full ${statusBadge(reviewService.status).dot}`} />
                  {statusBadge(reviewService.status).label}
                </span>
              </div>

              <p className="mt-4 text-sm text-[#A1A1AA]">Open your dashboard to check recent reviews and updates.</p>

              <a
                href="/review-funnel/dashboard"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30"
              >
                Open Dashboard
              </a>
            </article>
          ) : null}

          {!cadenceService && !reviewService ? (
            <div className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-sm text-[#A1A1AA]">
              No services are active on this account yet.
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6">
          <h2 className="text-lg font-semibold text-white">Billing</h2>
          <p className="mt-2 text-sm text-[#A1A1AA]">Open your secure billing page to manage payment details and invoices.</p>

          {billingError ? <p className="mt-3 text-sm text-red-300">{billingError}</p> : null}

          <button
            type="button"
            onClick={() => void handleManageBilling()}
            disabled={isOpeningBilling}
            className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isOpeningBilling ? "Opening billing..." : "Manage Billing"}
          </button>
        </section>
      </div>
    </main>
  )
}
