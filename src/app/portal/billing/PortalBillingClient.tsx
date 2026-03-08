"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { PortalSessionExpiredError, portalFetch } from "@/lib/platform/portal-fetch"

interface UsagePayload {
  usage?: {
    totalDurationSeconds?: number
  }
  plan?: {
    minuteLimit?: number
  }
  overage?: {
    billedCents?: number
  }
}

interface OverageCardState {
  billedCents: number
  overageMinutes: number
  minuteLimit: number
}

export default function PortalBillingClient() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [overageCard, setOverageCard] = useState<OverageCardState | null>(null)

  useEffect(() => {
    let isActive = true

    async function openBillingPortal() {
      try {
        const usagePromise = Promise.race<UsagePayload | null>([
          portalFetch("/api/portal/cadence/usage", {
            method: "GET",
            cache: "no-store",
          })
            .then(async (response) => {
              if (!response.ok) {
                return null
              }
              return (await response.json().catch(() => null)) as UsagePayload | null
            })
            .catch(() => null),
          new Promise<null>((resolve) => {
            window.setTimeout(() => resolve(null), 2000)
          }),
        ])

        const billingResponse = await portalFetch("/api/portal/billing/portal", {
          method: "POST",
        })

        const billingPayload = (await billingResponse.json().catch(() => null)) as
          | { error?: string; url?: string }
          | null

        if (!billingResponse.ok || !billingPayload?.url) {
          throw new Error(billingPayload?.error || "No billing account linked. Contact support.")
        }

        const usagePayload = await usagePromise
        const minuteLimit = Number(usagePayload?.plan?.minuteLimit ?? 0)
        const minutesUsed = Math.ceil(Number(usagePayload?.usage?.totalDurationSeconds ?? 0) / 60)
        const overageMinutes = minuteLimit > 0 ? Math.max(0, minutesUsed - minuteLimit) : 0
        const billedCents = Number(usagePayload?.overage?.billedCents ?? 0)
        const shouldShowOverage = billedCents > 0 || overageMinutes > 0

        if (isActive && shouldShowOverage) {
          setOverageCard({
            billedCents,
            overageMinutes,
            minuteLimit,
          })
        }

        const redirectDelayMs = shouldShowOverage ? 1500 : 0

        window.setTimeout(() => {
          if (isActive) {
            window.location.href = billingPayload.url as string
          }
        }, redirectDelayMs)
      } catch (error) {
        if (!isActive) {
          return
        }

        if (error instanceof PortalSessionExpiredError) {
          setErrorMessage("Your session has expired. Please log in again.")
          return
        }

        setErrorMessage("No billing account linked. Contact support.")
      }
    }

    void openBillingPortal()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg space-y-4">
        <Link href="/portal" className="inline-flex text-sm text-[#C4B5FD] transition hover:text-[#DDD6FE]">
          ← Back to portal
        </Link>

        {overageCard ? (
          <div className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6">
            <h2 className="text-lg font-semibold text-white">Current Month Overage</h2>
            <p className="mt-2 text-2xl font-bold text-amber-400">${(overageCard.billedCents / 100).toFixed(2)}</p>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              {overageCard.overageMinutes} minutes over your {overageCard.minuteLimit} minute limit
            </p>
            <p className="mt-1 text-xs text-[#A1A1AA]">Rate: $0.15/min · Max: $75.00/mo</p>
          </div>
        ) : null}

        <div className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-center">
          {errorMessage ? (
            <>
              <h1 className="text-xl font-semibold text-white">Billing</h1>
              <p className="mt-3 text-sm text-[#FCA5A5]">{errorMessage}</p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-white">Opening billing...</h1>
              <p className="mt-3 text-sm text-[#A1A1AA]">Please wait while we open your secure billing page.</p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
