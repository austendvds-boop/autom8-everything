"use client"

import { useEffect, useState } from "react"

interface SuccessClientProps {
  email: string | null
}

export default function SuccessClient({ email }: SuccessClientProps) {
  const [showSpinner, setShowSpinner] = useState(true)

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
              <p className="text-lg font-semibold text-white">Setting up your account...</p>
            </div>
          </div>

          <div
            className={`space-y-4 transition-opacity duration-500 ${showSpinner ? "pointer-events-none h-0 overflow-hidden opacity-0" : "opacity-100"}`}
          >
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">Welcome to Autom8</h1>
            <p className="text-sm text-[#D4D4D8]">
              Your account is being set up. Check your email for a login link.
            </p>

            {email ? (
              <p className="rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-sm text-[#E4E4E7]">
                We&apos;ll send your login link to <span className="font-medium text-white">{email}</span>.
              </p>
            ) : null}

            <a
              href="/portal/login"
              className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Already have a login link? Go to Portal →
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
