"use client"

import { useEffect, useState } from "react"
import BrandLogo from "@/components/BrandLogo"
import PortalNav from "@/components/portal/PortalNav"
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
    <div className="min-h-screen bg-[#0E1015]">
      <PortalNav />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg space-y-4">
          {overageCard ? (
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-[#EDEBE8]">Current Month Overage</h2>
              <p className="mt-2 text-2xl font-bold text-amber-400">${(overageCard.billedCents / 100).toFixed(2)}</p>
              <p className="mt-1 text-sm text-[#9B978F]">
                {overageCard.overageMinutes} minutes over your {overageCard.minuteLimit} minute limit
              </p>
              <p className="mt-1 text-xs text-[#9B978F]">Rate: $0.15/min - Max: $75.00/mo</p>
            </div>
          ) : null}

          <div className="card-base p-6 text-center">
            <BrandLogo size="sm" showDescriptor={false} as="span" />
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#D4A030]">Client Portal</p>
            {errorMessage ? (
              <>
                <h1 className="mt-2 text-xl font-semibold text-[#EDEBE8]">Billing</h1>
                <p className="mt-3 text-sm text-[#FCA5A5]">{errorMessage}</p>
              </>
            ) : (
              <>
                <h1 className="mt-2 text-xl font-semibold text-[#EDEBE8]">Opening billing...</h1>
                <p className="mt-3 text-sm text-[#9B978F]">Please wait while we open your secure billing page.</p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
