"use client"

import { FormEvent, useState } from "react"
import BrandLogo from "@/components/BrandLogo"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import ShimmerButton from "@/components/ShimmerButton"

export default function PortalLoginClient() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
              {errorMessage ? <p className="text-sm text-red-300">{errorMessage}</p> : null}

              <ShimmerButton
                type="submit"
                size="md"
                className="w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending link..." : "Send login link"}
              </ShimmerButton>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
