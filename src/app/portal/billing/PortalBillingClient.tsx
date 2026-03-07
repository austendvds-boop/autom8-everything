"use client"

import { useEffect, useState } from "react"

export default function PortalBillingClient() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    async function openBillingPortal() {
      try {
        const response = await fetch("/api/portal/billing/portal", {
          method: "POST",
        })

        const payload = (await response.json().catch(() => null)) as { error?: string; url?: string } | null

        if (!response.ok || !payload?.url) {
          throw new Error(payload?.error || "No billing account linked. Contact support.")
        }

        if (isActive) {
          window.location.href = payload.url
        }
      } catch {
        if (isActive) {
          setErrorMessage("No billing account linked. Contact support.")
        }
      }
    }

    void openBillingPortal()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-center">
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
    </main>
  )
}
