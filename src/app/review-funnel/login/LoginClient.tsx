"use client"

import { FormEvent, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const ERROR_COPY: Record<string, string> = {
  "missing-token": "Your login link is missing. Please request a new one.",
  "invalid-or-expired-link": "That login link has expired. Please request a fresh link.",
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function LoginClient() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const urlError = useMemo(() => {
    const key = searchParams.get("error") ?? ""
    return ERROR_COPY[key] ?? null
  }, [searchParams])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalized = email.trim().toLowerCase()

    if (!isValidEmail(normalized)) {
      setError("Please enter a valid email address")
      return
    }

    setError(null)
    setIsSending(true)

    try {
      const response = await fetch("/api/review-funnel/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalized }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "We could not send your login link. Please try again.")
      }

      setSent(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not send your login link")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Review Funnel</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Log in with your email
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-8">
            Enter your email and we&apos;ll send you a secure login link.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 md:p-8">
            {urlError && <p className="mb-4 rounded-lg border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-200">{urlError}</p>}

            {sent ? (
              <p className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 p-4 text-emerald-200">
                Check your email for a login link.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@business.com"
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
                    autoComplete="email"
                    required
                  />
                </label>

                {error && <p className="text-sm text-red-300">{error}</p>}

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Send Login Link"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
