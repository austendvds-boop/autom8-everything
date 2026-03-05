"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginClient() {
  const router = useRouter()

  const [secret, setSecret] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!secret.trim()) {
      setError("Please enter your admin password")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/review-funnel/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not sign in")
      }

      router.push("/review-funnel/admin")
      router.refresh()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not sign in")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      <section className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-white/10 bg-[#12121A] p-8 shadow-[0_0_60px_rgba(139,92,246,0.12)]">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Review Funnel Admin</p>
          <h1 className="mb-2 text-3xl font-semibold">Sign in</h1>
          <p className="mb-6 text-sm text-[#A1A1AA]">Enter the admin password to open Austen&apos;s control panel.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-[#D4D4D8]">Admin password</span>
              <input
                type="password"
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
                autoComplete="current-password"
                autoFocus
                required
              />
            </label>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
