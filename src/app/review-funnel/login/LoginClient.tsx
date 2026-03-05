"use client"

import { FormEvent, useMemo, useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const ERROR_COPY: Record<string, string> = {
  "missing-token": "Your sign-in link is missing. Please request a new one.",
  "invalid-or-expired-link": "That sign-in link has expired. Please request a new one.",
}

interface LoginClientProps {
  initialErrorKey?: string | null
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function LoginClient({ initialErrorKey }: LoginClientProps) {
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const urlError = useMemo(() => {
    const key = initialErrorKey?.trim() ?? ""
    return ERROR_COPY[key] ?? null
  }, [initialErrorKey])

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
        throw new Error(payload?.error || "We couldn't send your sign-in link. Please try again.")
      }

      setSent(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We couldn't send your sign-in link")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="mesh-bg pb-20 pt-32">
        <div className="mx-auto max-w-2xl px-6">
          <p className="mb-4 text-sm uppercase tracking-wide text-[#8B5CF6]">Review Funnel</p>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Sign in with your email
          </h1>
          <p className="mb-8 text-lg text-[#A1A1AA]">Enter your email and we&apos;ll send you a link to sign in.</p>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 md:p-8">
            {urlError ? <p className="mb-4 rounded-lg border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-200">{urlError}</p> : null}

            {sent ? (
              <p className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 p-4 text-emerald-200">
                Check your email for your sign-in link.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Email address</span>
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

                {error ? <p className="text-sm text-red-300">{error}</p> : null}

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Email Me a Sign-In Link"}
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
