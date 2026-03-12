"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PortalNav from "@/components/portal/PortalNav"
import { PortalPageSkeleton } from "@/components/portal/LoadingSkeleton"
import { PortalSessionExpiredError, portalFetch } from "@/lib/platform/portal-fetch"

type FormState = {
  businessName: string
  businessDescription: string
  hours: string
  faqs: string
  transferNumber: string
  areaCode: string
}

type FieldKey = keyof FormState
type Errors = Partial<Record<FieldKey, string>>

const initialState: FormState = {
  businessName: "",
  businessDescription: "",
  hours: "",
  faqs: "",
  transferNumber: "",
  areaCode: "",
}

const fieldsByStep: Record<number, FieldKey[]> = {
  1: ["businessName", "businessDescription"],
  2: ["hours", "faqs"],
  3: ["transferNumber", "areaCode"],
  4: [],
}

function validateField(field: FieldKey, value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return "This field is required."
  }

  if (field === "transferNumber" && !/^\+1\d{10}$/.test(trimmed)) {
    return "Transfer number must be in +1XXXXXXXXXX format."
  }

  if (field === "areaCode" && !/^\d{3}$/.test(trimmed)) {
    return "Area code must be exactly 3 digits."
  }

  return null
}

function validateStep(form: FormState, step: number): Errors {
  return (fieldsByStep[step] ?? []).reduce<Errors>((acc, field) => {
    const error = validateField(field, form[field])
    if (error) {
      acc[field] = error
    }
    return acc
  }, {})
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null
  }

  return <p className="mt-2 text-sm text-red-300">{error}</p>
}

export default function OnboardingWizardClient() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadOnboarding() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const response = await portalFetch("/api/portal/onboarding", {
          method: "GET",
          cache: "no-store",
        })

        const payload = (await response.json().catch(() => null)) as
          | {
              onboardingComplete?: boolean
              savedData?: Partial<FormState>
              error?: string
            }
          | null

        if (!response.ok) {
          throw new Error(payload?.error || "Could not load your onboarding details.")
        }

        if (!isActive) {
          return
        }

        if (payload?.onboardingComplete) {
          router.replace("/portal/cadence")
          return
        }

        setForm((prev) => ({
          ...prev,
          businessName: payload?.savedData?.businessName || prev.businessName,
          businessDescription: payload?.savedData?.businessDescription || prev.businessDescription,
          hours: payload?.savedData?.hours || prev.hours,
          faqs: payload?.savedData?.faqs || prev.faqs,
          transferNumber: payload?.savedData?.transferNumber || prev.transferNumber,
          areaCode: payload?.savedData?.areaCode || prev.areaCode,
        }))
      } catch (loadError) {
        if (loadError instanceof PortalSessionExpiredError) {
          router.replace("/portal/login")
          return
        }

        if (isActive) {
          setErrorMessage(loadError instanceof Error ? loadError.message : "Could not load your onboarding details.")
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadOnboarding()

    return () => {
      isActive = false
    }
  }, [router])

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timer = window.setTimeout(() => {
      setToastMessage(null)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [toastMessage])

  function updateField(field: FieldKey, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleNext() {
    const nextErrors = validateStep(form, step)
    setErrors((prev) => ({ ...prev, ...nextErrors }))

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setStep((current) => Math.min(4, current + 1))
  }

  async function handleSubmit() {
    const nextErrors = {
      ...validateStep(form, 1),
      ...validateStep(form, 2),
      ...validateStep(form, 3),
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await portalFetch("/api/portal/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Could not complete your onboarding.")
      }

      setToastMessage("Your AI receptionist is being set up!")
      window.setTimeout(() => {
        router.push("/portal/cadence")
      }, 500)
    } catch (submitError) {
      if (submitError instanceof PortalSessionExpiredError) {
        router.replace("/portal/login")
        return
      }

      setErrorMessage(submitError instanceof Error ? submitError.message : "Could not complete your onboarding.")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <PortalPageSkeleton cards={1} />
  }

  return (
    <div className="min-h-screen bg-[#0E1015]">
      <PortalNav />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {toastMessage ? (
            <div className="fixed right-4 top-4 z-50 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 shadow-lg">
              {toastMessage}
            </div>
          ) : null}

          <header>
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4A030]">Cadence Setup</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#EDEBE8] sm:text-4xl">Finish setting up your AI receptionist</h1>
            <p className="mt-2 text-sm text-[#9B978F]">Step {step} of 4</p>
          </header>

          <section className="card-base space-y-6 p-6 sm:p-8">
            {step === 1 ? (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm text-[#EDEBE8]">Business name</span>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(event) => updateField("businessName", event.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
                  />
                  <FieldError error={errors.businessName} />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#EDEBE8]">Business description</span>
                  <textarea
                    rows={5}
                    value={form.businessDescription}
                    onChange={(event) => updateField("businessDescription", event.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
                  />
                  <FieldError error={errors.businessDescription} />
                </label>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm text-[#EDEBE8]">Hours of operation</span>
                  <textarea
                    rows={5}
                    value={form.hours}
                    onChange={(event) => updateField("hours", event.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
                  />
                  <FieldError error={errors.hours} />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#EDEBE8]">FAQs</span>
                  <textarea
                    rows={6}
                    value={form.faqs}
                    onChange={(event) => updateField("faqs", event.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
                  />
                  <FieldError error={errors.faqs} />
                </label>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm text-[#EDEBE8]">Transfer number</span>
                  <input
                    type="tel"
                    value={form.transferNumber}
                    onChange={(event) => updateField("transferNumber", event.target.value)}
                    placeholder="+14805551234"
                    className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                  />
                  <FieldError error={errors.transferNumber} />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#EDEBE8]">Preferred area code</span>
                  <input
                    type="text"
                    value={form.areaCode}
                    onChange={(event) => updateField("areaCode", event.target.value)}
                    placeholder="602"
                    className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                  />
                  <FieldError error={errors.areaCode} />
                </label>
              </>
            ) : null}

            {step === 4 ? (
              <div className="rounded-2xl border border-white/[0.06] bg-[#0E1015] p-5">
                <h2 className="text-lg font-semibold text-[#EDEBE8]">Review your setup</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-[#9B978F]">Business name</dt>
                    <dd className="text-[#EDEBE8]">{form.businessName}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9B978F]">Description</dt>
                    <dd className="whitespace-pre-wrap text-[#EDEBE8]">{form.businessDescription}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9B978F]">Hours</dt>
                    <dd className="whitespace-pre-wrap text-[#EDEBE8]">{form.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9B978F]">FAQs</dt>
                    <dd className="whitespace-pre-wrap text-[#EDEBE8]">{form.faqs}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9B978F]">Transfer number</dt>
                    <dd className="text-[#EDEBE8]">{form.transferNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9B978F]">Area code</dt>
                    <dd className="text-[#EDEBE8]">{form.areaCode}</dd>
                  </div>
                </dl>
              </div>
            ) : null}

            {errorMessage ? <p className="text-sm text-red-300">{errorMessage}</p> : null}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(1, current - 1))}
                disabled={step === 1 || isSubmitting}
                className="rounded-full border border-white/[0.06] px-5 py-3 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30 disabled:opacity-40"
              >
                Back
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-5 py-3 text-sm font-semibold text-[#0E1015] transition hover:shadow-[0_0_30px_rgba(212,160,48,0.2)]"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={isSubmitting}
                  className="rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-5 py-3 text-sm font-semibold text-[#0E1015] transition hover:shadow-[0_0_30px_rgba(212,160,48,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Setting up..." : "Set Up My Receptionist"}
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
