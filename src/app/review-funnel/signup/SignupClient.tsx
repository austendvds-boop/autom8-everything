"use client"

import { FormEvent, useMemo, useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

type Plan = "starter" | "growth" | "pro"

interface PlaceSearchResult {
  placeId: string
  name: string
  address: string
}

interface SignupFormState {
  businessName: string
  ownerName: string
  email: string
  phone: string
  googleSearch: string
  googlePlaceId: string
  selectedPlaceLabel: string
  primaryColor: string
  promoOffer: string
  plan: Plan
}

const initialFormState: SignupFormState = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  googleSearch: "",
  googlePlaceId: "",
  selectedPlaceLabel: "",
  primaryColor: "#8B5CF6",
  promoOffer: "10% off your next visit",
  plan: "starter",
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value.trim())
}

function planLabel(plan: Plan): string {
  if (plan === "starter") return "Starter"
  if (plan === "growth") return "Growth"
  return "Pro"
}

export default function SignupClient() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<SignupFormState>(initialFormState)
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false)
  const [places, setPlaces] = useState<PlaceSearchResult[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canContinue = useMemo(() => {
    if (step === 1) {
      return (
        form.businessName.trim().length > 1 &&
        form.ownerName.trim().length > 1 &&
        isValidEmail(form.email) &&
        form.phone.trim().length >= 7
      )
    }

    if (step === 2) {
      return form.googlePlaceId.trim().length > 0
    }

    if (step === 3) {
      return isHexColor(form.primaryColor) && form.promoOffer.trim().length > 2
    }

    return true
  }, [form, step])

  function updateField<K extends keyof SignupFormState>(key: K, value: SignupFormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  async function searchPlaces(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    const query = form.googleSearch.trim()

    if (query.length < 2) {
      setError("Please type at least 2 letters to search")
      return
    }

    setError(null)
    setIsSearchingPlaces(true)

    try {
      const response = await fetch(`/api/review-funnel/google/places-search?q=${encodeURIComponent(query)}`)
      const payload = (await response.json().catch(() => null)) as
        | { results?: PlaceSearchResult[]; error?: string }
        | null

      if (!response.ok) {
        throw new Error(payload?.error || "We could not search Google right now")
      }

      const nextResults = payload?.results ?? []
      setPlaces(nextResults)

      if (nextResults.length === 0) {
        setError("No matches found. Try a different name or paste your Google Place ID below.")
      }
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "Could not search for your business")
    } finally {
      setIsSearchingPlaces(false)
    }
  }

  function selectPlace(place: PlaceSearchResult) {
    updateField("googlePlaceId", place.placeId)
    updateField("selectedPlaceLabel", `${place.name}${place.address ? ` — ${place.address}` : ""}`)
    setError(null)
  }

  function goNextStep() {
    if (!canContinue) {
      setError("Please complete this step before continuing")
      return
    }

    setError(null)
    setStep((current) => Math.min(4, current + 1))
  }

  async function submitSignup() {
    if (form.plan === "pro") {
      window.location.href = "/contact?topic=review-funnel-pro"
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/review-funnel/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          businessName: form.businessName.trim(),
          ownerName: form.ownerName.trim(),
          ownerPhone: form.phone.trim(),
          plan: form.plan,
          googlePlaceId: form.googlePlaceId.trim(),
          primaryColor: form.primaryColor.trim(),
          promoOffer: form.promoOffer.trim(),
        }),
      })

      const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "We could not start checkout")
      }

      window.location.href = payload.url
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not start your signup")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">Review Funnel Signup</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Set up your Review Funnel
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-8">
            This takes a few quick steps. We&apos;ll guide you through everything.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between text-sm text-[#A1A1AA]">
              <p>Step {step} of 4</p>
              <p>{step === 1 ? "Business Info" : step === 2 ? "Google Business" : step === 3 ? "Branding" : "Plan"}</p>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Business name</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.businessName}
                    onChange={(event) => updateField("businessName", event.target.value)}
                    placeholder="Your business"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Owner name</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.ownerName}
                    onChange={(event) => updateField("ownerName", event.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@business.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Phone</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <form onSubmit={searchPlaces} className="space-y-3">
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Search your business on Google</label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      value={form.googleSearch}
                      onChange={(event) => updateField("googleSearch", event.target.value)}
                      placeholder="Business name and city"
                    />
                    <button
                      type="submit"
                      disabled={isSearchingPlaces}
                      className="rounded-lg border border-white/20 px-5 py-3 font-semibold disabled:opacity-60"
                    >
                      {isSearchingPlaces ? "Searching..." : "Search"}
                    </button>
                  </div>
                </form>

                {places.length > 0 && (
                  <div className="space-y-2">
                    {places.map((place) => {
                      const selected = form.googlePlaceId === place.placeId

                      return (
                        <button
                          key={place.placeId}
                          type="button"
                          onClick={() => selectPlace(place)}
                          className="w-full rounded-lg border px-4 py-3 text-left"
                          style={{
                            borderColor: selected ? "#8B5CF6" : "rgba(255,255,255,0.1)",
                            background: selected ? "rgba(139,92,246,0.12)" : "rgba(10,10,15,0.7)",
                          }}
                        >
                          <p className="font-medium text-white">{place.name}</p>
                          {place.address && <p className="text-sm text-[#A1A1AA]">{place.address}</p>}
                        </button>
                      )
                    })}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Google Place ID</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.googlePlaceId}
                    onChange={(event) => updateField("googlePlaceId", event.target.value)}
                    placeholder="Paste Place ID if needed"
                  />
                  {form.selectedPlaceLabel && <p className="mt-2 text-sm text-[#A1A1AA]">Selected: {form.selectedPlaceLabel}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Primary color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="h-12 w-16 rounded border border-white/20 bg-transparent"
                      value={isHexColor(form.primaryColor) ? form.primaryColor : "#8B5CF6"}
                      onChange={(event) => updateField("primaryColor", event.target.value)}
                    />
                    <input
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      value={form.primaryColor}
                      onChange={(event) => updateField("primaryColor", event.target.value)}
                      placeholder="#8B5CF6"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Promo offer text</label>
                  <textarea
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.promoOffer}
                    onChange={(event) => updateField("promoOffer", event.target.value)}
                    placeholder="10% off your next visit"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    {
                      key: "starter" as const,
                      title: "Starter",
                      price: "$79/mo",
                      detail: "Great for one location getting started",
                    },
                    {
                      key: "growth" as const,
                      title: "Growth",
                      price: "$129/mo",
                      detail: "More messages and room to grow",
                    },
                    {
                      key: "pro" as const,
                      title: "Pro",
                      price: "Contact us",
                      detail: "For advanced teams with custom needs",
                    },
                  ].map((planOption) => {
                    const selected = form.plan === planOption.key

                    return (
                      <button
                        type="button"
                        key={planOption.key}
                        onClick={() => updateField("plan", planOption.key)}
                        className="rounded-2xl border p-4 text-left transition"
                        style={{
                          borderColor: selected ? "#8B5CF6" : "rgba(255,255,255,0.12)",
                          background: selected ? "rgba(139,92,246,0.12)" : "rgba(10,10,15,0.75)",
                        }}
                      >
                        <p className="text-sm uppercase tracking-wide text-[#A1A1AA]">{planOption.title}</p>
                        <p className="mt-1 text-2xl font-semibold text-white">{planOption.price}</p>
                        <p className="mt-2 text-sm text-[#A1A1AA]">{planOption.detail}</p>
                      </button>
                    )
                  })}
                </div>

                <div className="rounded-lg border border-white/10 bg-[#0A0A0F] p-4 text-sm text-[#D4D4D8]">
                  <p className="mb-1">Business: {form.businessName || "—"}</p>
                  <p className="mb-1">Email: {form.email || "—"}</p>
                  <p className="mb-1">Google Place ID: {form.googlePlaceId || "—"}</p>
                  <p>Selected plan: {planLabel(form.plan)}</p>
                </div>
              </div>
            )}

            {error && <p className="text-sm text-red-300">{error}</p>}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setStep((current) => Math.max(1, current - 1))
                }}
                disabled={step === 1 || isSubmitting}
                className="rounded-lg border border-white/20 px-5 py-3 disabled:opacity-50"
              >
                Back
              </button>

              {step < 4 && (
                <button
                  type="button"
                  onClick={goNextStep}
                  disabled={!canContinue}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 font-semibold text-white disabled:opacity-50"
                >
                  Continue
                </button>
              )}

              {step === 4 && (
                <button
                  type="button"
                  onClick={submitSignup}
                  disabled={isSubmitting}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 font-semibold text-white disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Starting checkout..."
                    : form.plan === "pro"
                      ? "Contact Us for Pro"
                      : "Continue to Checkout"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
