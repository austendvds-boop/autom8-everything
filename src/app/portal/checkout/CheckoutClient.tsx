"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

type ProductType = "cadence" | "review_funnel"
type ReviewPlan = "starter" | "growth"

const AREA_CODES = [
  { value: "480", label: "480 (Phoenix, AZ)" },
  { value: "602", label: "602 (Phoenix, AZ)" },
  { value: "623", label: "623 (West Valley, AZ)" },
  { value: "520", label: "520 (Tucson, AZ)" },
  { value: "303", label: "303 (Denver, CO)" },
  { value: "702", label: "702 (Las Vegas, NV)" },
  { value: "214", label: "214 (Dallas, TX)" },
  { value: "305", label: "305 (Miami, FL)" },
]

function isProduct(value: string | null): value is ProductType {
  return value === "cadence" || value === "review_funnel"
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
  const [areaCode, setAreaCode] = useState("480")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (requestedProduct) {
      setProduct(requestedProduct)
    }
  }, [requestedProduct])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!businessName.trim()) {
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
          businessName: businessName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          areaCode: product === "cadence" ? areaCode : undefined,
          product,
          plan: product === "review_funnel" ? plan : undefined,
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; url?: string } | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "We could not start checkout. Please try again.")
      }

      window.location.assign(payload.url)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not start checkout. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8B5CF6]">Autom8 Client Portal</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Start your account</h1>
          <p className="text-sm text-[#A1A1AA]">
            Pick your service, enter your details, and we&apos;ll take you to secure checkout.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setProduct("cadence")}
            className={`rounded-2xl border p-5 text-left transition ${
              product === "cadence"
                ? "border-[#8B5CF6] bg-[#12121A]"
                : "border-white/10 bg-[#12121A]/70 hover:border-white/25"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[#A1A1AA]">Cadence</p>
            <h2 className="mt-2 text-xl font-semibold text-white">AI Receptionist</h2>
            <p className="mt-1 text-sm text-[#D4D4D8]">$199/month</p>
            <p className="mt-2 text-sm text-[#A1A1AA]">Includes a 7-day free trial before billing starts.</p>
          </button>

          <button
            type="button"
            onClick={() => setProduct("review_funnel")}
            className={`rounded-2xl border p-5 text-left transition ${
              product === "review_funnel"
                ? "border-[#8B5CF6] bg-[#12121A]"
                : "border-white/10 bg-[#12121A]/70 hover:border-white/25"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[#A1A1AA]">Review Funnel</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Review Growth</h2>
            <p className="mt-1 text-sm text-[#D4D4D8]">Starter $79/month • Growth $149/month</p>
            <p className="mt-2 text-sm text-[#A1A1AA]">Automatically asks happy customers for fresh reviews.</p>
          </button>
        </section>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[#12121A] p-6 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm text-[#D4D4D8]">Business name</span>
              <input
                type="text"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Sunrise Plumbing"
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm text-[#D4D4D8]">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@business.com"
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm text-[#D4D4D8]">Phone (optional)</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(480) 555-1234"
                autoComplete="tel"
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
              />
            </label>
          </div>

          {product === "cadence" ? (
            <label>
              <span className="mb-2 block text-sm text-[#D4D4D8]">Area code for your new line</span>
              <select
                value={areaCode}
                onChange={(event) => setAreaCode(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white focus:border-[#8B5CF6] focus:outline-none"
              >
                {AREA_CODES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <fieldset>
              <legend className="mb-2 block text-sm text-[#D4D4D8]">Choose your plan</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPlan("starter")}
                  className={`rounded-xl border p-4 text-left transition ${
                    plan === "starter"
                      ? "border-[#8B5CF6] bg-[#0A0A0F]"
                      : "border-white/10 bg-[#0A0A0F]/60 hover:border-white/25"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">Starter</p>
                  <p className="mt-1 text-sm text-[#A1A1AA]">$79/month</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan("growth")}
                  className={`rounded-xl border p-4 text-left transition ${
                    plan === "growth"
                      ? "border-[#8B5CF6] bg-[#0A0A0F]"
                      : "border-white/10 bg-[#0A0A0F]/60 hover:border-white/25"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">Growth</p>
                  <p className="mt-1 text-sm text-[#A1A1AA]">$149/month</p>
                </button>
              </div>
            </fieldset>
          )}

          {errorMessage ? (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              <p>{errorMessage}</p>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-red-100 underline"
              >
                Try again
              </button>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Redirecting to secure checkout..." : "Continue to checkout"}
          </button>
        </form>
      </div>
    </main>
  )
}
