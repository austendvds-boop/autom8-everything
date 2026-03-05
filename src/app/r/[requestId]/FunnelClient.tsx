"use client"

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import StarRating from "@/components/review-funnel/StarRating"

const DEFAULT_PRIMARY = "#8B5CF6"
const DEFAULT_ACCENT = "#06B6D4"

type FunnelStep = "rating" | "five-star" | "feedback" | "thanks"

interface FunnelApiPayload {
  tenant: {
    businessName: string
    logoUrl: string | null
    primaryColor: string
    accentColor: string
    promoOffer: string
    promoCode: string | null
    gmbReviewUrl: string | null
  }
  request: {
    id: string
    customerName: string | null
    pageOpenedAt: string | null
    rating: number | null
    ratedAt: string | null
    googleReviewClicked: boolean
    feedbackText: string | null
    feedbackSubmitted: boolean
  }
}

interface FunnelClientProps {
  requestId: string
}

function sanitizeHexColor(color: string | undefined | null, fallback: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(color ?? "") ? (color as string) : fallback
}

function getInitialStep(payload: FunnelApiPayload): FunnelStep {
  const rating = payload.request.rating

  if (!rating) {
    return "rating"
  }

  if (rating === 5) {
    return payload.request.googleReviewClicked ? "thanks" : "five-star"
  }

  return payload.request.feedbackSubmitted ? "thanks" : "feedback"
}

export default function FunnelClient({ requestId }: FunnelClientProps) {
  const [funnelData, setFunnelData] = useState<FunnelApiPayload | null>(null)
  const [step, setStep] = useState<FunnelStep>("rating")
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const primaryColor = useMemo(
    () => sanitizeHexColor(funnelData?.tenant.primaryColor, DEFAULT_PRIMARY),
    [funnelData?.tenant.primaryColor],
  )
  const accentColor = useMemo(
    () => sanitizeHexColor(funnelData?.tenant.accentColor, DEFAULT_ACCENT),
    [funnelData?.tenant.accentColor],
  )

  const ctaGradient = useMemo(
    () => `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
    [primaryColor, accentColor],
  )

  const loadFunnel = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch(`/api/review-funnel/funnel/${requestId}`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("We couldn't load this review request.")
      }

      const payload = (await response.json()) as FunnelApiPayload

      setFunnelData(payload)
      setSelectedRating(payload.request.rating)
      setFeedbackText(payload.request.feedbackText ?? "")
      setStep(getInitialStep(payload))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong loading this page.")
    } finally {
      setIsLoading(false)
    }
  }, [requestId])

  useEffect(() => {
    void loadFunnel()
  }, [loadFunnel])

  async function submitRating(rating: number, options?: { googleReviewClicked?: boolean; silent?: boolean }) {
    setSelectedRating(rating)
    setErrorMessage(null)

    if (!options?.silent) {
      setIsSubmitting(true)
    }

    try {
      const response = await fetch("/api/review-funnel/funnel/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          rating,
          googleReviewClicked: options?.googleReviewClicked,
        }),
      })

      if (!response.ok) {
        throw new Error("Could not save your rating. Please try again.")
      }

      const payload = (await response.json()) as {
        request: {
          rating: number | null
          ratedAt: string | null
          pageOpenedAt: string | null
          googleReviewClicked: boolean
        }
      }

      setFunnelData((current) => {
        if (!current) {
          return current
        }

        return {
          ...current,
          request: {
            ...current.request,
            rating: payload.request.rating,
            ratedAt: payload.request.ratedAt,
            pageOpenedAt: payload.request.pageOpenedAt,
            googleReviewClicked: payload.request.googleReviewClicked,
          },
        }
      })

      if (rating === 5) {
        setStep(options?.googleReviewClicked ? "thanks" : "five-star")
      } else {
        setStep("feedback")
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save your rating.")
    } finally {
      if (!options?.silent) {
        setIsSubmitting(false)
      }
    }
  }

  async function handleFeedbackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedFeedback = feedbackText.trim()

    if (!trimmedFeedback) {
      setErrorMessage("Please share a quick note so we can improve.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/review-funnel/funnel/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          feedbackText: trimmedFeedback,
        }),
      })

      if (!response.ok) {
        throw new Error("Could not submit your feedback. Please try again.")
      }

      setFunnelData((current) => {
        if (!current) {
          return current
        }

        return {
          ...current,
          request: {
            ...current.request,
            feedbackText: trimmedFeedback,
            feedbackSubmitted: true,
          },
        }
      })

      setStep("thanks")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit feedback.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleGoogleReviewClick() {
    if (!funnelData) {
      return
    }

    const url = funnelData.tenant.gmbReviewUrl?.trim()

    if (!url) {
      setErrorMessage("Google review link is unavailable. Thank you for your feedback!")
      setStep("thanks")
      return
    }

    window.open(url, "_blank", "noopener,noreferrer")
    setStep("thanks")
    void submitRating(5, { googleReviewClicked: true, silent: true })
  }

  const customerName = funnelData?.request.customerName?.trim() || "there"
  const businessName = funnelData?.tenant.businessName || "our team"

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0F] px-4 py-6 sm:px-6 sm:py-10">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `${primaryColor}33` }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `${accentColor}29` }}
      />

      <section className="relative mx-auto w-full max-w-xl">
        <div
          className="rounded-3xl border bg-[#12121A]/95 p-5 shadow-2xl backdrop-blur sm:p-8"
          style={{ borderColor: `${primaryColor}44` }}
        >
          {funnelData?.tenant.logoUrl ? (
            <div className="mb-5 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={funnelData.tenant.logoUrl}
                alt={`${businessName} logo`}
                className="h-16 w-16 rounded-2xl border border-white/10 bg-white object-contain p-1.5 shadow-md sm:h-20 sm:w-20"
              />
            </div>
          ) : null}

          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">Customer feedback</p>
          <h1
            className="mt-3 text-center text-2xl font-semibold leading-tight text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Hi {customerName}, how was your experience with {businessName}?
          </h1>

          {isLoading ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-[#A1A1AA]">
              Loading your review link...
            </div>
          ) : null}

          {!isLoading && errorMessage ? (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
              {errorMessage}
            </div>
          ) : null}

          {!isLoading && funnelData ? (
            <div className="mt-7 space-y-6">
              {step === "rating" ? (
                <div className="space-y-5">
                  <StarRating
                    value={selectedRating}
                    onChange={(rating) => {
                      if (isSubmitting) {
                        return
                      }

                      void submitRating(rating)
                    }}
                    disabled={isSubmitting}
                    primaryColor={primaryColor}
                    accentColor={accentColor}
                  />
                </div>
              ) : null}

              {step === "five-star" ? (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-emerald-300/25 bg-emerald-500/10 p-4 text-center text-emerald-50">
                    <p className="text-lg font-semibold">Glad you had a great experience!</p>
                    <p className="mt-1 text-sm text-emerald-100/90">Would you share it on Google?</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleReviewClick}
                    disabled={isSubmitting}
                    className="w-full rounded-2xl px-5 py-4 text-base font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background: ctaGradient }}
                  >
                    Leave a Google review
                  </button>
                </div>
              ) : null}

              {step === "feedback" ? (
                <form className="space-y-5" onSubmit={(event) => void handleFeedbackSubmit(event)}>
                  <div className="rounded-2xl border p-4" style={{ borderColor: `${accentColor}55`, background: `${accentColor}14` }}>
                    <p className="text-sm font-semibold text-white">{funnelData.tenant.promoOffer}</p>
                    {funnelData.tenant.promoCode ? (
                      <p className="mt-1 text-xs text-[#E4E4E7]">
                        Promo code: <span className="font-semibold tracking-wide">{funnelData.tenant.promoCode}</span>
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="feedback" className="mb-2 block text-sm font-medium text-[#E4E4E7]">
                      Tell us what could have been better
                    </label>
                    <textarea
                      id="feedback"
                      value={feedbackText}
                      onChange={(event) => setFeedbackText(event.target.value)}
                      rows={5}
                      maxLength={2000}
                      disabled={isSubmitting}
                      className="w-full rounded-2xl border border-white/15 bg-[#0D0D13] p-4 text-white placeholder:text-[#71717A] focus:border-transparent focus:outline-none focus:ring-2"
                      style={{
                        boxShadow: `0 0 0 0 ${primaryColor}`,
                        caretColor: primaryColor,
                      }}
                      placeholder="Share your feedback..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || feedbackText.trim().length === 0}
                    className="w-full rounded-2xl px-5 py-4 text-base font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background: ctaGradient }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit feedback"}
                  </button>
                </form>
              ) : null}

              {step === "thanks" ? (
                <div className="space-y-4 text-center">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xl font-semibold text-white">Thank you!</p>
                    {selectedRating === 5 || funnelData.request.rating === 5 ? (
                      <p className="mt-2 text-sm text-[#D4D4D8]">We really appreciate your support.</p>
                    ) : (
                      <>
                        <p className="mt-2 text-sm text-[#D4D4D8]">Thanks for the honest feedback — we appreciate it.</p>
                        <p className="mt-3 text-sm text-white">{funnelData.tenant.promoOffer}</p>
                        {funnelData.tenant.promoCode ? (
                          <p className="text-xs text-[#A1A1AA]">
                            Use code <span className="font-semibold tracking-wide text-white">{funnelData.tenant.promoCode}</span>
                          </p>
                        ) : null}
                      </>
                    )}
                  </div>

                  <Link href={`/r/${requestId}/thanks`} className="inline-block text-sm font-medium text-[#C4B5FD] hover:text-[#DDD6FE]">
                    Continue
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
