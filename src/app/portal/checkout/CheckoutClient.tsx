"use client"

import Link from "next/link"
import { FormEvent, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"

type ProductType = "cadence" | "review_funnel"
type ReviewPlan = "starter" | "growth"

function isProduct(value: string | null): value is ProductType {
  return value === "cadence" || value === "review_funnel"
}

function getFallbackBusinessName(email: string): string {
  const [prefix] = email.trim().split("@")
  return prefix?.trim() || email.trim()
}

export default function CheckoutClient() {
  const searchParams = useSearchParams()

  const requestedProduct = useMemo(() => {
    const fromQuery = searchParams.get("product")
    return isProduct(fromQuery) ? fromQuery : null
  }, [searchParams])

  const [product, setProduct] = useState<ProductType>(requestedProduct || "cadence")
  const [plan, setPlan] = useState<ReviewPlan>("starter")

  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isCadence = product === "cadence"

  useEffect(() => {
    if (requestedProduct) {
      setProduct(requestedProduct)
    }
  }, [requestedProduct])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isCadence && !businessName.trim()) {
      setErrorMessage("Please enter your business name.")
      return
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/portal/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: isCadence ? getFallbackBusinessName(email) : businessName.trim(),
          email: email.trim(),
          phone: isCadence ? undefined : phone.trim() || undefined,
          product,
          plan: isCadence ? undefined : plan,
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; url?: string } | null

      if (response.status === 400) {
        throw new Error("Please fill in all required fields.")
      }

      if (response.status >= 500) {
        throw new Error("Something went wrong on our end. Please try again in a moment.")
      }

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "Something went wrong on our end. Please try again in a moment.")
      }

      window.location.assign(payload.url)
    } catch (error) {
      const fallbackMessage = "Could not connect. Please check your internet and try again."
      if (error instanceof TypeError) {
        setErrorMessage(fallbackMessage)
      } else if (error instanceof Error && error.message) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(fallbackMessage)
      }
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0E1015]">
      <Navigation />
      <section className="px-4 py-10 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="space-y-2">
            <Link href="/portal" className="inline-flex text-sm text-[#D4A030] transition hover:text-[#E5B544]">
              Back to portal
            </Link>
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4A030]">Client Portal</p>
            <h1 className="text-3xl font-semibold text-[#EDEBE8] sm:text-4xl">Start your account</h1>
            <p className="text-sm text-[#9B978F]">
              {isCadence
                ? "Start your 7-day free trial. Just enter your email - we'll set everything up after."
                : "Pick your service, enter your details, and we'll take you to secure checkout."}
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setProduct("cadence")}
              className={`rounded-2xl border p-5 text-left transition ${
                product === "cadence"
                  ? "card-elevated border-[rgba(212,160,48,0.50)] bg-[#161920]"
                  : "card-base hover:border-[rgba(212,160,48,0.30)]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#D4A030]">Cadence</p>
              <h2 className="mt-2 text-xl font-semibold text-[#EDEBE8]">AI Receptionist</h2>
              <p className="mt-1 text-sm text-[#EDEBE8]">$199/month</p>
              <p className="mt-2 text-sm text-[#9B978F]">Includes a 7-day free trial before billing starts.</p>
            </button>

            <button
              type="button"
              onClick={() => setProduct("review_funnel")}
              className={`rounded-2xl border p-5 text-left transition ${
                product === "review_funnel"
                  ? "card-elevated border-[rgba(212,160,48,0.50)] bg-[#161920]"
                  : "card-base hover:border-[rgba(212,160,48,0.30)]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#D4A030]">Review Funnel</p>
              <h2 className="mt-2 text-xl font-semibold text-[#EDEBE8]">Review Growth</h2>
              <p className="mt-1 text-sm text-[#EDEBE8]">Starter $79/month - Growth $149/month</p>
              <p className="mt-2 text-sm text-[#9B978F]">Automatically asks happy customers for fresh reviews.</p>
            </button>
          </section>

          <form onSubmit={handleSubmit} className="card-base space-y-5 p-6 sm:p-7">
            {isCadence ? (
              <label className="block">
                <span className="mb-2 block text-sm text-[#EDEBE8]">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@business.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                />
              </label>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-sm text-[#EDEBE8]">Business name</span>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                      placeholder="Sunrise Plumbing"
                      className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-sm text-[#EDEBE8]">Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@business.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-sm text-[#EDEBE8]">Phone (optional)</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="(480) 555-1234"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    />
                  </label>
                </div>

                <fieldset>
                  <legend className="mb-2 block text-sm text-[#EDEBE8]">Choose your plan</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setPlan("starter")}
                      className={`rounded-xl border p-4 text-left transition ${
                        plan === "starter"
                          ? "border-[#D4A030] bg-[#0E1015]"
                          : "border-white/[0.06] bg-[#0E1015]/60 hover:border-[#D4A030]/30"
                      }`}
                    >
                      <p className="text-sm font-semibold text-[#EDEBE8]">Starter</p>
                      <p className="mt-1 text-sm text-[#9B978F]">$79/month</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlan("growth")}
                      className={`rounded-xl border p-4 text-left transition ${
                        plan === "growth"
                          ? "border-[#D4A030] bg-[#0E1015]"
                          : "border-white/[0.06] bg-[#0E1015]/60 hover:border-[#D4A030]/30"
                      }`}
                    >
                      <p className="text-sm font-semibold text-[#EDEBE8]">Growth</p>
                      <p className="mt-1 text-sm text-[#9B978F]">$149/month</p>
                    </button>
                  </div>
                </fieldset>
              </>
            )}

            {errorMessage ? (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <p>{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-red-100 underline"
                >
                  Try Again
                </button>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-6 py-3 text-sm font-semibold text-[#0E1015] transition hover:shadow-[0_0_30px_rgba(212,160,48,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Redirecting to secure checkout..." : "Continue to checkout"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  )
}
