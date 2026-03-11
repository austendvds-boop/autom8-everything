"use client"

import { useEffect, useState } from "react"

interface SuccessClientProps {
  email: string | null
  product: "cadence" | "review_funnel" | null
}

const PRODUCT_COPY = {
  cadence: {
    spinner: "Setting up your AI receptionist...",
    title: "Cadence setup is underway",
    description: "Your AI receptionist is being set up. Provisioning starts automatically after payment.",
    detail: "Open the portal dashboard to track your account and access your tools as soon as setup finishes.",
  },
  review_funnel: {
    spinner: "Activating your Review Funnel...",
    title: "Review Funnel is active",
    description: "Your Review Funnel is active and ready for the next login step.",
    detail: "Open the portal dashboard to manage billing, account access, and connected services.",
  },
  default: {
    spinner: "Setting up your account...",
    title: "Welcome to Autom8",
    description: "Your account is being set up. Check your email for a login link.",
    detail: "Open the portal dashboard to continue once your login link arrives.",
  },
} as const

export default function SuccessClient({ email, product }: SuccessClientProps) {
  const [showSpinner, setShowSpinner] = useState(true)
  const copy =
    product === "cadence"
      ? PRODUCT_COPY.cadence
      : product === "review_funnel"
        ? PRODUCT_COPY.review_funnel
        : PRODUCT_COPY.default

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSpinner(false)
    }, 3000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center">
        <section className="w-full rounded-2xl border border-white/10 bg-[#12121A] p-7 sm:p-9">
          <div
            className={`transition-opacity duration-500 ${showSpinner ? "opacity-100" : "pointer-events-none h-0 overflow-hidden opacity-0"}`}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#A78BFA] border-t-transparent"
              />
              <p className="text-lg font-semibold text-white">{copy.spinner}</p>
            </div>
          </div>

          <div
            className={`space-y-4 transition-opacity duration-500 ${showSpinner ? "pointer-events-none h-0 overflow-hidden opacity-0" : "opacity-100"}`}
          >
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">{copy.title}</h1>
            <p className="text-sm text-[#D4D4D8]">{copy.description}</p>
            <p className="text-sm text-[#D4D4D8]">{copy.detail}</p>

            {email ? (
              <p className="rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-sm text-[#E4E4E7]">
                We&apos;ll send your login link to <span className="font-medium text-white">{email}</span>.
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/portal"
                className="inline-flex select-none justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Go to Portal Dashboard
              </a>
              <a
                href="/portal/login"
                className="inline-flex justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
              >
                Open Portal Login
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
