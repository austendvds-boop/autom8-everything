"use client"

import { FormEvent, useState } from "react"
import BrandLogo from "@/components/BrandLogo"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import ShimmerButton from "@/components/ShimmerButton"

const GOOGLE_OAUTH_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true"

interface PortalLoginClientProps {
  oauthError?: string
}

export default function PortalLoginClient({ oauthError }: PortalLoginClientProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const oauthErrorMessage =
    oauthError === "no_account"
      ? "No account found with that Google email. Please use the email you signed up with."
      : oauthError === "oauth_failed"
        ? "Google sign-in could not be completed. Please try again."
        : null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.")
      return
    }

    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/portal/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "We could not send your login link. Please try again.")
      }

      setSuccessMessage("Check your email for a login link.")
      setEmail("")
    } catch (submitError) {
      setErrorMessage(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0E1015]">
      <Navigation />
      <section className="mesh-bg px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
          <div className="card-base w-full p-6 sm:p-8">
            <BrandLogo size="sm" showDescriptor={false} as="span" />
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#D4A030]">Client Portal</p>
            <h1 className="mt-2 text-2xl font-semibold text-[#EDEBE8]">Sign in with your email</h1>
            <p className="mt-2 text-sm text-[#9B978F]">
              Enter the email for your account and we will send you a secure sign-in link.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm text-[#EDEBE8]">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@business.com"
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                />
              </label>

              {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}
              {oauthErrorMessage ? <p className="text-sm text-red-300">{oauthErrorMessage}</p> : null}
              {errorMessage ? <p className="text-sm text-red-300">{errorMessage}</p> : null}

              <ShimmerButton
                type="submit"
                size="md"
                className="w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending link..." : "Send login link"}
              </ShimmerButton>
            </form>

            {GOOGLE_OAUTH_ENABLED ? (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.06]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[#161920] px-4 text-[#5E5B56]">or</span>
                  </div>
                </div>

                <a
                  href="/api/portal/auth/google"
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-white/[0.06] px-6 py-3 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M21.6 12.23c0-.68-.06-1.33-.18-1.95H12v3.69h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.97-4.33 2.97-7.26Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.24-2.5c-.9.6-2.05.94-3.37.94-2.59 0-4.79-1.75-5.57-4.1H3.08v2.58A9.98 9.98 0 0 0 12 22Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.43 13.9A5.98 5.98 0 0 1 6.12 12c0-.66.11-1.3.31-1.9V7.52H3.08A9.98 9.98 0 0 0 2 12c0 1.61.39 3.13 1.08 4.48l3.35-2.58Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.98c1.47 0 2.78.5 3.82 1.49l2.87-2.87C16.95 2.98 14.7 2 12 2a9.98 9.98 0 0 0-8.92 5.52l3.35 2.58c.78-2.35 2.98-4.12 5.57-4.12Z"
                    />
                  </svg>
                  Continue with Google
                </a>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
