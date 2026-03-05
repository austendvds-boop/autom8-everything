"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
  const [hasSearchedPlaces, setHasSearchedPlaces] = useState(false)
  const [isPlacesOpen, setIsPlacesOpen] = useState(false)
  const [places, setPlaces] = useState<PlaceSearchResult[]>([])
  const [placesError, setPlacesError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const autocompleteRef = useRef<HTMLDivElement | null>(null)

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

  const shouldRenderPlacesDropdown =
    form.googleSearch.trim().length >= 3 && (isPlacesOpen || isSearchingPlaces || hasSearchedPlaces || !!placesError || places.length > 0)

  function updateField<K extends keyof SignupFormState>(key: K, value: SignupFormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent | TouchEvent) {
      if (!autocompleteRef.current) return

      if (!autocompleteRef.current.contains(event.target as Node)) {
        setIsPlacesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("touchstart", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("touchstart", handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    const query = form.googleSearch.trim()

    if (query.length < 3) {
      setPlaces([])
      setPlacesError(null)
      setHasSearchedPlaces(false)
      setIsSearchingPlaces(false)
      return
    }

    const abortController = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      setIsSearchingPlaces(true)
      setHasSearchedPlaces(false)
      setPlacesError(null)

      try {
        const response = await fetch(`/api/review-funnel/google/places-search?q=${encodeURIComponent(query)}`, {
          signal: abortController.signal,
        })

        const payload = (await response.json().catch(() => null)) as
          | { results?: PlaceSearchResult[]; error?: string }
          | null

        if (!response.ok) {
          throw new Error(payload?.error || "We could not search Google right now")
        }

        setPlaces(payload?.results ?? [])
      } catch (searchError) {
        if (abortController.signal.aborted) return

        setPlaces([])
        setPlacesError(searchError instanceof Error ? searchError.message : "Could not search for your business")
      } finally {
        if (!abortController.signal.aborted) {
          setIsSearchingPlaces(false)
          setHasSearchedPlaces(true)
        }
      }
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
      abortController.abort()
    }
  }, [form.googleSearch])

  function selectPlace(place: PlaceSearchResult) {
    updateField("googlePlaceId", place.placeId)
    updateField("selectedPlaceLabel", `${place.name}${place.address ? ` — ${place.address}` : ""}`)
    setPlacesError(null)
    setError(null)
    setIsPlacesOpen(false)
  }

  function goNextStep() {
    if (!canContinue) {
      setError("Please fill this out before you continue.")
      return
    }

    setError(null)
    setStep((current) => Math.min(4, current + 1))
  }

  async function submitSignup(selectedPlan: Plan = form.plan) {
    if (selectedPlan === "pro") {
      window.location.href = "mailto:hello@autom8everything.com?subject=Review%20Funnel%20Pro"
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
          plan: selectedPlan,
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
              <p>{step === 1 ? "Your Business" : step === 2 ? "Find Your Business" : step === 3 ? "Your Style" : "Pick a Plan"}</p>
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
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Your name</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.ownerName}
                    onChange={(event) => updateField("ownerName", event.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Best email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@business.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Best phone number</label>
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
                <div className="space-y-3" ref={autocompleteRef}>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Find your business on Google</label>

                  <div className="relative">
                    <input
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      value={form.googleSearch}
                      onChange={(event) => {
                        const nextValue = event.target.value

                        setForm((previous) => ({
                          ...previous,
                          googleSearch: nextValue,
                          googlePlaceId: "",
                          selectedPlaceLabel: "",
                        }))

                        setError(null)
                        setPlacesError(null)
                        setHasSearchedPlaces(false)
                        setIsPlacesOpen(nextValue.trim().length >= 3)
                      }}
                      onFocus={() => {
                        if (
                          form.googleSearch.trim().length >= 3 ||
                          isSearchingPlaces ||
                          hasSearchedPlaces ||
                          !!placesError ||
                          places.length > 0
                        ) {
                          setIsPlacesOpen(true)
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          setIsPlacesOpen(false)
                        }
                      }}
                      placeholder="Business name and city"
                    />

                    {shouldRenderPlacesDropdown && (
                      <div
                        className={`absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#12121A] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-150 ${
                          isPlacesOpen ? "translate-y-0 opacity-100" : "-translate-y-1 pointer-events-none opacity-0"
                        }`}
                      >
                        <div className="max-h-72 overflow-y-auto py-1">
                          {isSearchingPlaces && (
                            <div className="flex items-center gap-3 px-4 py-3 text-sm text-[#A1A1AA]">
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
                              Looking for matches...
                            </div>
                          )}

                          {!isSearchingPlaces && placesError && (
                            <p className="px-4 py-3 text-sm text-red-300">{placesError}</p>
                          )}

                          {!isSearchingPlaces && !placesError && hasSearchedPlaces && places.length === 0 && (
                            <p className="px-4 py-3 text-sm text-[#A1A1AA]">No match yet. Try adding your city name.</p>
                          )}

                          {!isSearchingPlaces && !placesError && places.length > 0 && (
                            <div className="divide-y divide-white/5">
                              {places.map((place) => {
                                const selected = form.googlePlaceId === place.placeId

                                return (
                                  <button
                                    key={place.placeId}
                                    type="button"
                                    onClick={() => selectPlace(place)}
                                    className={`w-full px-4 py-3.5 text-left transition-colors duration-150 ${
                                      selected ? "bg-[#2A1E45]" : "hover:bg-white/5"
                                    }`}
                                  >
                                    <p className="font-medium text-white">{place.name}</p>
                                    {place.address && <p className="mt-1 text-sm text-[#A1A1AA]">{place.address}</p>}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {form.googleSearch.trim().length > 0 && form.googleSearch.trim().length < 3 && (
                    <p className="text-xs text-[#71717A]">Type at least 3 letters to start searching.</p>
                  )}
                </div>

                <div className="rounded-lg border border-white/10 bg-[#0A0A0F] p-4">
                  <p className="text-sm font-medium text-[#D4D4D8]">Your Business</p>
                  {form.selectedPlaceLabel ? (
                    <p className="mt-1 text-sm text-[#A1A1AA]">{form.selectedPlaceLabel}</p>
                  ) : (
                    <p className="mt-1 text-sm text-[#A1A1AA]">
                      Pick your business from the list above so we can send people to the right Google review page.
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-[#D4D4D8]">Customize what your customers see after their appointment.</p>

                <div>
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Your brand color</label>
                  <p className="mb-2 text-sm text-[#A1A1AA]">
                    This color shows up on the review page your customers see after their appointment.
                  </p>
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
                  <label className="mb-2 block text-sm text-[#D4D4D8]">Special offer for feedback</label>
                  <p className="mb-2 text-sm text-[#A1A1AA]">
                    If someone had a less-than-great visit, we&apos;ll show this offer to help win them back. Example: &quot;10% off your
                    next visit&quot;
                  </p>
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
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      key: "starter" as const,
                      title: "Starter",
                      price: "$79/mo",
                      features: ["1 Google Calendar", "150 review requests/mo", "Magic link login", "Full dashboard"],
                      ctaLabel: "Start with Starter",
                    },
                    {
                      key: "growth" as const,
                      title: "Growth",
                      price: "$149/mo",
                      badge: "Most Popular",
                      features: ["Up to 5 Google Calendars", "600 review requests/mo", "All Starter features"],
                      ctaLabel: "Start with Growth",
                    },
                    {
                      key: "pro" as const,
                      title: "Pro",
                      price: "Let's talk",
                      features: ["Unlimited calendars", "Unlimited review requests", "All Growth features", "Priority support"],
                      ctaLabel: "Contact Us",
                    },
                  ].map((planOption) => {
                    const selected = form.plan === planOption.key
                    const isPro = planOption.key === "pro"

                    return (
                      <article
                        key={planOption.key}
                        className="rounded-2xl border p-5"
                        style={{
                          borderColor: selected ? "#8B5CF6" : "rgba(255,255,255,0.12)",
                          background: selected ? "rgba(139,92,246,0.12)" : "rgba(10,10,15,0.75)",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm uppercase tracking-wide text-[#A1A1AA]">{planOption.title}</p>
                          {planOption.badge ? (
                            <span className="rounded-full border border-[#C4B5FD]/50 bg-[#8B5CF6]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#DDD6FE]">
                              {planOption.badge}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-2 text-2xl font-semibold text-white">{planOption.price}</p>

                        <ul className="mt-4 space-y-2 text-sm text-[#D4D4D8]">
                          {planOption.features.map((feature) => (
                            <li key={feature}>• {feature}</li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          onClick={() => {
                            updateField("plan", planOption.key)
                            void submitSignup(planOption.key)
                          }}
                          disabled={isSubmitting && !isPro}
                          className={`mt-5 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                            isPro
                              ? "border border-white/20 text-white hover:border-[#8B5CF6]/60"
                              : "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white disabled:opacity-50"
                          }`}
                        >
                          {isSubmitting && !isPro && form.plan === planOption.key
                            ? "Opening secure checkout..."
                            : planOption.ctaLabel}
                        </button>
                      </article>
                    )
                  })}
                </div>

                <div className="rounded-lg border border-white/10 bg-[#0A0A0F] p-4 text-sm text-[#D4D4D8]">
                  <p className="mb-1">Business Name: {form.businessName || "—"}</p>
                  <p className="mb-1">Contact Email: {form.email || "—"}</p>
                  <p className="mb-1">Your Business: {form.selectedPlaceLabel || form.businessName || "—"}</p>
                  <p>Selected Plan: {planLabel(form.plan)}</p>
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
                Go Back
              </button>

              {step < 4 && (
                <button
                  type="button"
                  onClick={goNextStep}
                  disabled={!canContinue}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 font-semibold text-white disabled:opacity-50"
                >
                  Next
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
