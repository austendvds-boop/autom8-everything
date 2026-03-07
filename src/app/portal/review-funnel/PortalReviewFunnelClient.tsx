"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { PortalSessionExpiredError, portalFetch } from "@/lib/platform/portal-fetch"

interface PortalMeResponse {
  client?: {
    id: string
  }
  services?: Array<{
    serviceType: string
    status: string
  }>
  error?: string
}

interface ReviewFunnelStatusResponse {
  plan: string
  smsUsed: number
  smsLimit: number
  calendarsConnected: number
  isActive: boolean
  error?: string
}

function toSafeRatio(used: number, limit: number): number {
  if (!Number.isFinite(limit) || limit <= 0) {
    return 0
  }

  return Math.max(0, Math.min(used / limit, 1))
}

function usageFillClass(usedRatio: number): string {
  if (usedRatio > 0.8) {
    return "bg-red-400"
  }

  if (usedRatio >= 0.6) {
    return "bg-amber-400"
  }

  return "bg-emerald-400"
}

function toPlanLabel(plan: string): string {
  const cleaned = plan.trim().replace(/[_-]+/g, " ")

  if (!cleaned) {
    return "Unknown"
  }

  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "0"
  }

  return Math.max(0, Math.round(value)).toLocaleString()
}

export default function PortalReviewFunnelClient() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<ReviewFunnelStatusResponse | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadData() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const meResponse = await portalFetch("/api/portal/me", {
          method: "GET",
          cache: "no-store",
        })


        const mePayload = (await meResponse.json().catch(() => null)) as PortalMeResponse | null

        if (!meResponse.ok || !mePayload?.client?.id) {
          throw new Error(mePayload?.error || "We could not verify your account.")
        }

        const statusResponse = await portalFetch("/api/portal/review-funnel/status", {
          method: "GET",
          cache: "no-store",
        })

        const statusPayload = (await statusResponse.json().catch(() => null)) as ReviewFunnelStatusResponse | null

        if (!statusResponse.ok || !statusPayload) {
          throw new Error(statusPayload?.error || "We could not load your Review Funnel status.")
        }

        if (!isActive) {
          return
        }

        setStatus(statusPayload)
      } catch (error) {
        if (error instanceof PortalSessionExpiredError) {
          router.replace("/portal/login")
          return
        }

        if (isActive) {
          setErrorMessage(
            error instanceof Error ? error.message : "We could not load your Review Funnel status.",
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadData()

    return () => {
      isActive = false
    }
  }, [router])

  const usageRatio = useMemo(() => toSafeRatio(status?.smsUsed ?? 0, status?.smsLimit ?? 0), [status?.smsLimit, status?.smsUsed])
  const badgeClass = status?.isActive
    ? "border-emerald-300/30 bg-emerald-500/15 text-emerald-200"
    : "border-zinc-400/30 bg-zinc-500/15 text-zinc-200"

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-[#A1A1AA]">
          Loading Review Funnel...
        </div>
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          <Link href="/portal" className="inline-flex text-sm text-[#C4B5FD] transition hover:text-[#DDD6FE]">
            ← Back to portal
          </Link>
          <div className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-sm text-red-300">{errorMessage}</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link href="/portal" className="inline-flex text-sm text-[#C4B5FD] transition hover:text-[#DDD6FE]">
          ← Back to portal
        </Link>

        <header>
          <h1 className="text-3xl font-semibold text-white">Review Funnel</h1>
          <p className="mt-2 text-sm text-[#A1A1AA]">Track your plan, text message usage, and calendar connections.</p>
        </header>

        <section className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Status</h2>
              <p className="mt-1 text-sm text-[#D4D4D8]">Plan: {toPlanLabel(status?.plan || "")}</p>
            </div>
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}>
              {status?.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm text-[#D4D4D8]">
              {formatNumber(status?.smsUsed ?? 0)} / {formatNumber(status?.smsLimit ?? 0)} text messages sent this month
            </p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all ${usageFillClass(usageRatio)}`}
                style={{ width: `${usageRatio * 100}%` }}
              />
            </div>
          </div>

          <p className="mt-5 text-sm text-[#D4D4D8]">Connected calendars: {formatNumber(status?.calendarsConnected ?? 0)}</p>
        </section>

        <section className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6">
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/review-funnel/dashboard"
              className="inline-flex rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Open Full Dashboard
            </Link>
            <Link
              href="/review-funnel/dashboard/settings"
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30"
            >
              Settings
            </Link>
            <Link
              href="/review-funnel/dashboard/reviews"
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30"
            >
              View Reviews
            </Link>
            <Link
              href="/review-funnel/dashboard/feedback"
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30"
            >
              View Feedback
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#A1A1AA]">
            Your Review Funnel dashboard has detailed analytics, settings, and calendar management.
          </p>
        </section>
      </div>
    </main>
  )
}
