"use client"

import Link from "next/link"
import { Phone, Star } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { PortalPageSkeleton } from "@/components/portal/LoadingSkeleton"
import { PortalSessionExpiredError, portalFetch } from "@/lib/platform/portal-fetch"

type ServiceType = "cadence" | "review_funnel" | string

type ServiceStatus = "active" | "paused" | "cancelled" | string

interface PortalService {
  serviceType: ServiceType
  status: ServiceStatus
  cadenceTenantId: string | null
  rfTenantId: string | null
  provisionedAt: string | null
  metadata?: Record<string, unknown>
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

interface CadenceSettingsPreview {
  phoneNumber?: string | null
  smsNumber?: string | null
  ownerPhone?: string | null
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

function getCadenceNumber(payload: CadenceSettingsPreview | null): string | null {
  if (!payload) {
    return null
  }

  const options = [payload.phoneNumber, payload.smsNumber, payload.ownerPhone]

  for (const value of options) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim()
    }
  }

  return null
}

function toTitleCasePlan(plan: string): string {
  const cleaned = plan.trim().replace(/[_-]+/g, " ")

  if (!cleaned) {
    return ""
  }

  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function getReviewPlanLabel(service: PortalService | undefined): string | null {
  if (!service?.metadata || typeof service.metadata !== "object") {
    return null
  }

  const planValue = service.metadata.plan

  if (typeof planValue === "string" && planValue.trim()) {
    return toTitleCasePlan(planValue)
  }

  const planNameValue = service.metadata.planName

  if (typeof planNameValue === "string" && planNameValue.trim()) {
    return planNameValue.trim()
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
  const [cadencePhoneNumber, setCadencePhoneNumber] = useState<string | null>(null)

  const [isOpeningBilling, setIsOpeningBilling] = useState(false)
  const [billingError, setBillingError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadPortalData() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const response = await portalFetch("/api/portal/me", {
          method: "GET",
        })

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
        if (loadError instanceof PortalSessionExpiredError) {
          router.replace("/portal/login")
          return
        }

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

  const reviewPlanLabel = useMemo(() => getReviewPlanLabel(reviewService), [reviewService])

  const isMissingCadence = !cadenceService
  const isMissingReviewFunnel = !reviewService
  const showMoreProducts = isMissingCadence || isMissingReviewFunnel

  useEffect(() => {
    if (!cadenceService || cadenceService.status !== "active") {
      setCadenceCallsThisMonth(null)
      setCadencePhoneNumber(null)
      return
    }

    let isActive = true

    async function loadCadenceCardData() {
      setIsLoadingCadenceStats(true)

      const [callsResult, settingsResult] = await Promise.allSettled([
        portalFetch("/api/portal/cadence/calls?limit=1&offset=0", {
          method: "GET",
        }),
        portalFetch("/api/portal/cadence/settings", {
          method: "GET",
        }),
      ])

      if (!isActive) {
        return
      }

      if (callsResult.status === "rejected" && callsResult.reason instanceof PortalSessionExpiredError) {
        router.replace("/portal/login")
        return
      }

      if (settingsResult.status === "rejected" && settingsResult.reason instanceof PortalSessionExpiredError) {
        router.replace("/portal/login")
        return
      }

      if (callsResult.status === "fulfilled") {
        const callsResponse = callsResult.value
        const payload = (await callsResponse.json().catch(() => null)) as (PortalCallsPreview & { error?: string }) | null

        if (callsResponse.ok) {
          setCadenceCallsThisMonth(getCallCount(payload))
        } else {
          setCadenceCallsThisMonth(null)
        }
      } else {
        setCadenceCallsThisMonth(null)
      }

      if (settingsResult.status === "fulfilled") {
        const settingsResponse = settingsResult.value
        const payload = (await settingsResponse.json().catch(() => null)) as (CadenceSettingsPreview & { error?: string }) | null

        if (settingsResponse.ok) {
          setCadencePhoneNumber(getCadenceNumber(payload))
        } else {
          setCadencePhoneNumber(null)
        }
      } else {
        setCadencePhoneNumber(null)
      }

      if (isActive) {
        setIsLoadingCadenceStats(false)
      }
    }

    void loadCadenceCardData()

    return () => {
      isActive = false
    }
  }, [cadenceService])

  async function handleManageBilling() {
    setIsOpeningBilling(true)
    setBillingError(null)

    try {
      const response = await portalFetch("/api/portal/billing/portal", {
        method: "POST",
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; url?: string } | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "Could not open billing right now.")
      }

      window.location.href = payload.url
    } catch (billingOpenError) {
      if (billingOpenError instanceof PortalSessionExpiredError) {
        router.replace("/portal/login")
        return
      }

      setBillingError(
        billingOpenError instanceof Error ? billingOpenError.message : "Could not open billing right now.",
      )
      setIsOpeningBilling(false)
    }
  }

  if (isLoading) {
    return <PortalPageSkeleton cards={2} />
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#0E1015] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/[0.06] bg-[#161920]/90 p-6 text-sm text-red-300">
          {errorMessage}
        </div>
      </main>
    )
  }

  const contactName = client?.contactName || "there"
  const businessName = client?.businessName || "your business"

  return (
    <main className="min-h-screen bg-[#0E1015] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-[#EDEBE8]">Welcome back, {contactName}</h1>
          <p className="mt-2 text-sm text-[#9B978F]">{businessName}</p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cadenceService ? (
            <article className="rounded-2xl border border-white/[0.06] bg-[#161920]/90 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl" aria-hidden>
                    📞
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-[#EDEBE8]">Cadence — AI Receptionist</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-[#EDEBE8]">
                  <span className={`h-2 w-2 rounded-full ${statusBadge(cadenceService.status).dot}`} />
                  {statusBadge(cadenceService.status).label}
                </span>
              </div>

              <p className="mt-4 text-sm text-[#9B978F]">
                {isLoadingCadenceStats
                  ? "Loading call activity..."
                  : cadenceCallsThisMonth !== null
                    ? `${cadenceCallsThisMonth} calls this month`
                    : "View calls and settings"}
              </p>

              {cadencePhoneNumber ? (
                <p className="mt-2 text-sm text-[#EDEBE8]">Your Cadence number: {cadencePhoneNumber}</p>
              ) : null}

              <button
                type="button"
                onClick={() => router.push("/portal/cadence")}
                className="mt-5 inline-flex rounded-full border border-white/[0.06] px-4 py-2 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
              >
                Manage Settings
              </button>
            </article>
          ) : null}

          {reviewService ? (
            <article className="rounded-2xl border border-white/[0.06] bg-[#161920]/90 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl" aria-hidden>
                    ⭐
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-[#EDEBE8]">Review Funnel — Automated Reviews</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-[#EDEBE8]">
                  <span className={`h-2 w-2 rounded-full ${statusBadge(reviewService.status).dot}`} />
                  {statusBadge(reviewService.status).label}
                </span>
              </div>

              {reviewPlanLabel ? <p className="mt-4 text-sm text-[#EDEBE8]">Plan: {reviewPlanLabel}</p> : null}
              <p className="mt-2 text-sm text-[#9B978F]">Open your dashboard to check text message usage and customer feedback.</p>

              <Link
                href="/portal/review-funnel"
                className="mt-5 inline-flex rounded-full border border-white/[0.06] px-4 py-2 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
              >
                Open Dashboard
              </Link>
            </article>
          ) : null}

          {!cadenceService && !reviewService ? (
            <div className="rounded-2xl border border-white/[0.06] bg-[#161920]/90 p-6 text-sm text-[#9B978F]">
              No services are active on this account yet.
            </div>
          ) : null}
        </section>

        {showMoreProducts ? (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-[#EDEBE8]">More Products</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {isMissingCadence ? (
                <article className="rounded-2xl border border-dashed border-white/[0.06] bg-[#161920]/70 p-6 opacity-80">
                  <Phone className="h-6 w-6 text-[#D4A030]" aria-hidden />
                  <h3 className="mt-3 text-lg font-semibold text-[#EDEBE8]">Cadence — AI Receptionist</h3>
                  <p className="mt-2 text-sm text-[#9B978F]">
                    Never miss a call. AI answers 24/7, books appointments, answers FAQs.
                  </p>
                  <p className="mt-3 text-sm font-medium text-[#EDEBE8]">$199/mo · 7-day free trial</p>
                  <Link
                    href="/portal/checkout?product=cadence"
                    className="mt-4 inline-flex rounded-full border border-white/[0.06] px-4 py-2 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
                  >
                    Get Started
                  </Link>
                </article>
              ) : null}

              {isMissingReviewFunnel ? (
                <article className="rounded-2xl border border-dashed border-white/[0.06] bg-[#161920]/70 p-6 opacity-80">
                  <Star className="h-6 w-6 text-[#D4A030]" aria-hidden />
                  <h3 className="mt-3 text-lg font-semibold text-[#EDEBE8]">Review Funnel — Automated Reviews</h3>
                  <p className="mt-2 text-sm text-[#9B978F]">
                    Turn every appointment into a 5-star review. Automated follow-ups via text.
                  </p>
                  <p className="mt-3 text-sm font-medium text-[#EDEBE8]">From $79/mo</p>
                  <Link
                    href="/portal/checkout?product=review_funnel"
                    className="mt-4 inline-flex rounded-full border border-white/[0.06] px-4 py-2 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
                  >
                    Get Started
                  </Link>
                </article>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-white/[0.06] bg-[#161920]/90 p-6">
          <h2 className="text-lg font-semibold text-[#EDEBE8]">Account</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-[#9B978F]">Name</dt>
              <dd className="text-[#EDEBE8]">{client?.contactName || "Not available"}</dd>
            </div>
            <div>
              <dt className="text-[#9B978F]">Email</dt>
              <dd className="text-[#EDEBE8]">{client?.email || "Not available"}</dd>
            </div>
          </dl>

          {billingError ? <p className="mt-4 text-sm text-red-300">{billingError}</p> : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleManageBilling()}
              disabled={isOpeningBilling}
              className="inline-flex rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-5 py-2.5 text-sm font-semibold text-[#EDEBE8] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isOpeningBilling ? "Opening billing..." : "Manage Billing"}
            </button>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/[0.06] px-4 py-2 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
            >
              Need help?
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
