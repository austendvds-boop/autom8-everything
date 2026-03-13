"use client"

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import BrandingPreview from "@/components/review-funnel/BrandingPreview"
import CalendarStatus from "@/components/review-funnel/CalendarStatus"
import SmsTemplateEditor from "@/components/review-funnel/SmsTemplateEditor"

type SettingsTab = "profile" | "sms" | "calendar" | "billing"

type ReviewPlatform = "google" | "yelp" | "both"

interface ProfileResponse {
  profile: {
    businessName: string
    promoOffer: string
    promoMessage: string | null
    promoCode: string | null
    primaryColor: string
    accentColor: string
    logoUrl: string | null
    ownerName: string
    ownerEmail: string
    ownerPhone: string
    reviewPlatform: ReviewPlatform
    yelpReviewUrl: string | null
    overageBillingEnabled: boolean
    followUpNudgeEnabled: boolean
  }
  calendar: {
    connected: boolean
    googleEmail: string | null
    activeWatchCount: number
  }
}

interface SmsResponse {
  smsTemplate: string
  smsDelayMinutes: number
  quietHours: {
    start: number
    end: number
  }
}

interface BillingResponse {
  plan: string
  isActive: boolean
  planAmountMonthlyUsd: number | null
  smsUsedThisMonth: number
  smsLimitMonthly: number | null
  smsLimitUnlimited: boolean
  usageMonth: string
  overageBillingEnabled: boolean
  followUpNudgeEnabled: boolean
}

interface ProfileFormState {
  businessName: string
  promoOffer: string
  promoMessage: string
  promoCode: string
  primaryColor: string
  accentColor: string
  reviewPlatform: ReviewPlatform
  yelpReviewUrl: string
}

type BillingPreferenceKey = "overageBillingEnabled" | "followUpNudgeEnabled"

interface SmsFormState {
  smsTemplate: string
  smsDelayMinutes: number
}

const TAB_ORDER: Array<{ key: SettingsTab; label: string }> = [
  { key: "profile", label: "Your Business" },
  { key: "sms", label: "Text Messages" },
  { key: "calendar", label: "Calendar" },
  { key: "billing", label: "Billing" },
]

const DEFAULT_PROFILE: ProfileFormState = {
  businessName: "",
  promoOffer: "",
  promoMessage: "",
  promoCode: "",
  primaryColor: "#8B5CF6",
  accentColor: "#06B6D4",
  reviewPlatform: "google",
  yelpReviewUrl: "",
}

const DEFAULT_SMS: SmsFormState = {
  smsTemplate:
    "Hi {customer_name}! Thanks for choosing {business_name}. We'd love your feedback — it takes 30 seconds: {funnel_url}\\n\\nReply STOP to opt out.",
  smsDelayMinutes: 60,
}

function isValidHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value)
}

function normalizePlan(plan: string): string {
  return plan.charAt(0).toUpperCase() + plan.slice(1)
}

function toCalendarConnectErrorMessage(message: string | null | undefined): string {
  const normalizedMessage = message?.trim()

  if (!normalizedMessage) {
    return "We couldn't connect your calendar. Please try again."
  }

  return "We couldn't connect your calendar. Please try again."
}

function BillingToggle({
  label,
  description,
  checked,
  disabled = false,
  isSaving = false,
  onToggle,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  isSaving?: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#D4D4D8]">{label}</p>
          <p className="text-sm text-[#A1A1AA]">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={onToggle}
          disabled={disabled || isSaving}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition ${
            checked
              ? "border-[#06B6D4]/70 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]"
              : "border-white/10 bg-white/10"
          } ${disabled || isSaving ? "cursor-not-allowed opacity-60" : ""}`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
      </div>
      {isSaving ? <p className="mt-3 text-xs text-[#A1A1AA]">Saving...</p> : null}
    </div>
  )
}

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

  const [profile, setProfile] = useState<ProfileFormState>(DEFAULT_PROFILE)
  const [smsConfig, setSmsConfig] = useState<SmsFormState>(DEFAULT_SMS)
  const [calendar, setCalendar] = useState<ProfileResponse["calendar"]>({
    connected: false,
    googleEmail: null,
    activeWatchCount: 0,
  })
  const [billing, setBilling] = useState<BillingResponse | null>(null)

  const [ownerEmail, setOwnerEmail] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null)
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [isSavingSms, setIsSavingSms] = useState(false)
  const [isCalendarBusy, setIsCalendarBusy] = useState(false)
  const [isBillingBusy, setIsBillingBusy] = useState(false)
  const [savingBillingPreference, setSavingBillingPreference] = useState<BillingPreferenceKey | null>(null)

  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [calendarErrorMessage, setCalendarErrorMessage] = useState<string | null>(null)

  const loadSettings = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const [profileResponse, smsResponse, billingResponse] = await Promise.all([
        fetch("/api/review-funnel/settings/profile", { cache: "no-store" }),
        fetch("/api/review-funnel/settings/sms", { cache: "no-store" }),
        fetch("/api/review-funnel/settings/billing", { cache: "no-store" }),
      ])

      const profilePayload = (await profileResponse.json().catch(() => null)) as ProfileResponse | { error?: string } | null
      const smsPayload = (await smsResponse.json().catch(() => null)) as SmsResponse | { error?: string } | null
      const billingPayload = (await billingResponse.json().catch(() => null)) as BillingResponse | { error?: string } | null

      if (!profileResponse.ok || !profilePayload || !("profile" in profilePayload)) {
        throw new Error((profilePayload as { error?: string } | null)?.error || "Failed to load business settings")
      }

      if (!smsResponse.ok || !smsPayload || !("smsTemplate" in smsPayload)) {
        throw new Error((smsPayload as { error?: string } | null)?.error || "Failed to load text message settings")
      }

      if (!billingResponse.ok || !billingPayload || !("plan" in billingPayload)) {
        throw new Error((billingPayload as { error?: string } | null)?.error || "Failed to load billing settings")
      }

      setProfile({
        businessName: profilePayload.profile.businessName,
        promoOffer: profilePayload.profile.promoOffer,
        promoMessage: profilePayload.profile.promoMessage ?? "",
        promoCode: profilePayload.profile.promoCode ?? "",
        primaryColor: profilePayload.profile.primaryColor,
        accentColor: profilePayload.profile.accentColor,
        reviewPlatform: profilePayload.profile.reviewPlatform ?? "google",
        yelpReviewUrl: profilePayload.profile.yelpReviewUrl ?? "",
      })
      setLogoUrl(profilePayload.profile.logoUrl ?? null)
      setOwnerEmail(profilePayload.profile.ownerEmail)
      setOwnerName(profilePayload.profile.ownerName)
      setOwnerPhone(profilePayload.profile.ownerPhone)
      setCalendar(profilePayload.calendar)

      setSmsConfig({
        smsTemplate: smsPayload.smsTemplate,
        smsDelayMinutes: smsPayload.smsDelayMinutes,
      })

      setBilling({
        ...billingPayload,
        overageBillingEnabled:
          billingPayload.overageBillingEnabled ?? profilePayload.profile.overageBillingEnabled ?? false,
        followUpNudgeEnabled:
          billingPayload.followUpNudgeEnabled ?? profilePayload.profile.followUpNudgeEnabled ?? false,
      })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load your settings")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSettings()
  }, [loadSettings])

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl)
      }
    }
  }, [logoPreviewUrl])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const url = new URL(window.location.href)
    const calendarParam = url.searchParams.get("calendar")
    const reason = url.searchParams.get("reason")

    if (calendarParam === "connected") {
      setActiveTab("calendar")
      setCalendarErrorMessage(null)
      setStatusMessage("Google Calendar connected successfully.")
      url.searchParams.delete("calendar")
      url.searchParams.delete("reason")
      window.history.replaceState({}, "", url.toString())
      return
    }

    if (calendarParam === "error") {
      setActiveTab("calendar")
      setCalendarErrorMessage(toCalendarConnectErrorMessage(reason))
      url.searchParams.delete("calendar")
      url.searchParams.delete("reason")
      window.history.replaceState({}, "", url.toString())
    }
  }, [])

  async function saveProfileSettings() {
    if (!isValidHexColor(profile.primaryColor) || !isValidHexColor(profile.accentColor)) {
      setErrorMessage("Please use a full color code like #8B5CF6 for both color fields.")
      return
    }

    setIsSavingProfile(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/review-funnel/settings/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: profile.businessName,
          promoOffer: profile.promoOffer,
          promoMessage: profile.promoMessage,
          promoCode: profile.promoCode,
          primaryColor: profile.primaryColor,
          accentColor: profile.accentColor,
          reviewPlatform: profile.reviewPlatform,
          yelpReviewUrl: profile.reviewPlatform === "google" ? null : profile.yelpReviewUrl,
          overageBillingEnabled: billing?.overageBillingEnabled ?? false,
          followUpNudgeEnabled: billing?.followUpNudgeEnabled ?? false,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | ProfileResponse
        | { profile?: ProfileResponse["profile"]; error?: string }
        | null

      if (!response.ok) {
        throw new Error((payload as { error?: string } | null)?.error || "Failed to save your business settings")
      }

      if (payload && "profile" in payload && payload.profile) {
        const nextProfile = payload.profile

        setProfile((current) => ({
          ...current,
          businessName: nextProfile.businessName,
          promoOffer: nextProfile.promoOffer,
          promoMessage: nextProfile.promoMessage ?? "",
          promoCode: nextProfile.promoCode ?? "",
          primaryColor: nextProfile.primaryColor,
          accentColor: nextProfile.accentColor,
          reviewPlatform: nextProfile.reviewPlatform ?? current.reviewPlatform,
          yelpReviewUrl: nextProfile.yelpReviewUrl ?? "",
        }))
        setLogoUrl(nextProfile.logoUrl ?? null)
        setBilling((current) =>
          current
            ? {
                ...current,
                overageBillingEnabled: nextProfile.overageBillingEnabled,
                followUpNudgeEnabled: nextProfile.followUpNudgeEnabled,
              }
            : current
        )
      }

      setStatusMessage("Your business settings were saved.")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to save your business settings")
    } finally {
      setIsSavingProfile(false)
    }
  }

  function handleLogoFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl)
    }

    setSelectedLogoFile(file)
    setLogoPreviewUrl(URL.createObjectURL(file))
    setErrorMessage(null)
  }

  async function uploadLogo() {
    if (!selectedLogoFile) {
      return
    }

    setIsUploadingLogo(true)
    setErrorMessage(null)
    setStatusMessage(null)

    try {
      const formData = new FormData()
      formData.append("logo", selectedLogoFile)

      const response = await fetch("/api/review-funnel/settings/logo", {
        method: "POST",
        body: formData,
      })

      const payload = (await response.json().catch(() => null)) as { logoUrl?: string; error?: string } | null

      if (!response.ok || !payload?.logoUrl) {
        throw new Error(payload?.error || "Failed to upload your logo")
      }

      setLogoUrl(payload.logoUrl)
      setSelectedLogoFile(null)
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl)
      }
      setLogoPreviewUrl(null)
      setStatusMessage("Your logo was uploaded.")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload your logo")
    } finally {
      setIsUploadingLogo(false)
    }
  }

  async function saveSmsSettings() {
    if (smsConfig.smsDelayMinutes < 0 || smsConfig.smsDelayMinutes > 1440) {
      setErrorMessage("Send delay must be between 0 and 1,440 minutes.")
      return
    }

    setIsSavingSms(true)
    setStatusMessage(null)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/review-funnel/settings/sms", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smsTemplate: smsConfig.smsTemplate,
          smsDelayMinutes: smsConfig.smsDelayMinutes,
        }),
      })

      const payload = (await response.json().catch(() => null)) as SmsResponse | { error?: string } | null

      if (!response.ok || !payload || !("smsTemplate" in payload)) {
        throw new Error((payload as { error?: string } | null)?.error || "Failed to save text message settings")
      }

      setSmsConfig({
        smsTemplate: payload.smsTemplate,
        smsDelayMinutes: payload.smsDelayMinutes,
      })
      setStatusMessage("Your text message settings were saved.")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to save your text message settings")
    } finally {
      setIsSavingSms(false)
    }
  }

  async function handleCalendarConnect() {
    setIsCalendarBusy(true)
    setErrorMessage(null)
    setCalendarErrorMessage(null)

    try {
      const response = await fetch("/api/review-funnel/google/auth-url", {
        cache: "no-store",
      })

      const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "Unable to start Google Calendar connection")
      }

      window.location.assign(payload.url)
    } catch (error) {
      setCalendarErrorMessage(toCalendarConnectErrorMessage(error instanceof Error ? error.message : null))
      setIsCalendarBusy(false)
    }
  }

  async function handleCalendarDisconnect() {
    setIsCalendarBusy(true)
    setStatusMessage(null)
    setErrorMessage(null)
    setCalendarErrorMessage(null)

    try {
      const response = await fetch("/api/review-funnel/google/disconnect", {
        method: "POST",
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to disconnect Google Calendar")
      }

      await loadSettings()
      setStatusMessage("Google Calendar disconnected")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to disconnect Google Calendar")
    } finally {
      setIsCalendarBusy(false)
    }
  }

  async function handleManageBilling() {
    setIsBillingBusy(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/review-funnel/settings/billing/portal", {
        method: "POST",
      })

      const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || "Unable to open your billing page")
      }

      window.location.assign(payload.url)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to open your billing page")
      setIsBillingBusy(false)
    }
  }

  async function handleBillingPreferenceToggle(key: BillingPreferenceKey) {
    if (!billing) {
      return
    }

    const nextValue = !billing[key]
    const previousBilling = billing

    setSavingBillingPreference(key)
    setStatusMessage(null)
    setErrorMessage(null)
    setBilling({
      ...billing,
      [key]: nextValue,
    })

    try {
      const response = await fetch("/api/review-funnel/settings/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: profile.businessName,
          promoOffer: profile.promoOffer,
          promoMessage: profile.promoMessage,
          promoCode: profile.promoCode,
          primaryColor: profile.primaryColor,
          accentColor: profile.accentColor,
          reviewPlatform: profile.reviewPlatform,
          yelpReviewUrl: profile.reviewPlatform === "google" ? null : profile.yelpReviewUrl,
          overageBillingEnabled:
            key === "overageBillingEnabled" ? nextValue : previousBilling.overageBillingEnabled,
          followUpNudgeEnabled:
            key === "followUpNudgeEnabled" ? nextValue : previousBilling.followUpNudgeEnabled,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | ProfileResponse
        | { profile?: ProfileResponse["profile"]; error?: string }
        | null

      if (!response.ok) {
        throw new Error((payload as { error?: string } | null)?.error || "Failed to update billing preferences")
      }

      if (payload && "profile" in payload && payload.profile) {
        const nextProfile = payload.profile

        setProfile((current) => ({
          ...current,
          businessName: nextProfile.businessName,
          promoOffer: nextProfile.promoOffer,
          promoMessage: nextProfile.promoMessage ?? "",
          promoCode: nextProfile.promoCode ?? "",
          primaryColor: nextProfile.primaryColor,
          accentColor: nextProfile.accentColor,
          reviewPlatform: nextProfile.reviewPlatform ?? current.reviewPlatform,
          yelpReviewUrl: nextProfile.yelpReviewUrl ?? "",
        }))
        setBilling((current) =>
          current
            ? {
                ...current,
                overageBillingEnabled: nextProfile.overageBillingEnabled,
                followUpNudgeEnabled: nextProfile.followUpNudgeEnabled,
              }
            : current
        )
      }

      setStatusMessage("Billing preferences updated.")
    } catch (error) {
      setBilling(previousBilling)
      setErrorMessage(error instanceof Error ? error.message : "Failed to update billing preferences")
    } finally {
      setSavingBillingPreference(null)
    }
  }

  const billingUsageText = useMemo(() => {
    if (!billing) {
      return "-"
    }

    return `${billing.smsUsedThisMonth.toLocaleString()} text messages sent`
  }, [billing])

  const billingLimitText = useMemo(() => {
    if (!billing) {
      return "-"
    }

    if (billing.plan === "pro" || billing.smsLimitUnlimited) {
      return "Unlimited"
    }

    return (billing.smsLimitMonthly ?? 0).toLocaleString()
  }, [billing])

  const followUpNudgeLocked = billing?.plan === "starter"

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Settings
        </h2>
        <p className="mt-1 text-sm text-[#A1A1AA]">Update your business info, text messages, calendar, and billing.</p>
      </section>

      {statusMessage ? (
        <p className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">{statusMessage}</p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{errorMessage}</p>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-[#12121A] p-2">
        <div className="flex flex-wrap gap-2">
          {TAB_ORDER.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? "bg-[#8B5CF6]/20 text-white"
                  : "text-[#A1A1AA] hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {isLoading ? <p className="text-sm text-[#A1A1AA]">Loading your settings...</p> : null}

      {!isLoading && activeTab === "profile" ? (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_1fr]">
          <article className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
            <h3 className="text-lg font-semibold text-white">Your business details</h3>
            <p className="mt-1 text-sm text-[#A1A1AA]">Update what customers see on your review page.</p>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Business logo</p>
              <p className="mt-1 text-xs text-[#A1A1AA]">This logo appears at the top of your review page.</p>
              <div className="mt-3 flex items-center gap-3">
                {(logoPreviewUrl || logoUrl) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoPreviewUrl || logoUrl || ""}
                    alt="Business logo preview"
                    className="h-14 w-14 rounded-xl border border-white/10 bg-white object-contain p-1"
                  />
                ) : null}
                <label className="inline-flex cursor-pointer rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15">
                  {logoUrl || logoPreviewUrl ? "Change logo" : "Upload logo"}
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={handleLogoFileChange} />
                </label>
                {selectedLogoFile ? (
                  <button
                    type="button"
                    onClick={() => void uploadLogo()}
                    disabled={isUploadingLogo}
                    className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUploadingLogo ? "Uploading..." : "Save logo"}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Business name</span>
                <input
                  type="text"
                  value={profile.businessName}
                  onChange={(event) => setProfile((prev) => ({ ...prev, businessName: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Special offer for feedback</span>
                <p className="mb-2 text-xs text-[#A1A1AA]">Shown to unhappy customers to help win them back.</p>
                <textarea
                  value={profile.promoOffer}
                  onChange={(event) => setProfile((prev) => ({ ...prev, promoOffer: event.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#D4D4D8]">Promo message template</span>
                <p className="mb-2 text-xs text-[#D4D4D8]">Message sent to customers who rate 1-4 stars</p>
                <p className="mb-2 text-xs text-[#A1A1AA]">
                  This is what customers see when they give less-than-perfect feedback. Use {"{code}"} to insert your
                  promo code.
                </p>
                <textarea
                  value={profile.promoMessage}
                  onChange={(event) => setProfile((prev) => ({ ...prev, promoMessage: event.target.value.slice(0, 500) }))}
                  rows={4}
                  maxLength={500}
                  placeholder="We appreciate your feedback. We'd love to make it right — here's {code} for your next visit."
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                />
                <p className="mt-2 text-right text-xs text-[#A1A1AA]">{profile.promoMessage.length}/500</p>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Offer code (optional)</span>
                <input
                  type="text"
                  value={profile.promoCode}
                  onChange={(event) => setProfile((prev) => ({ ...prev, promoCode: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                  placeholder="WELCOME10"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Review platform</span>
                <select
                  value={profile.reviewPlatform}
                  onChange={(event) =>
                    setProfile((prev) => ({ ...prev, reviewPlatform: event.target.value as ReviewPlatform }))
                  }
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                >
                  <option value="google">Google</option>
                  <option value="yelp">Yelp</option>
                  <option value="both">Both</option>
                </select>
              </label>

              {(profile.reviewPlatform === "yelp" || profile.reviewPlatform === "both") ? (
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Yelp review URL</span>
                  <input
                    type="url"
                    value={profile.yelpReviewUrl}
                    onChange={(event) => setProfile((prev) => ({ ...prev, yelpReviewUrl: event.target.value }))}
                    className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                    placeholder="https://www.yelp.com/writeareview/biz/your-business-id"
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Your brand color</span>
                <p className="mb-2 text-xs text-[#A1A1AA]">This is the main color customers will see on your review page.</p>
                <input
                  type="text"
                  value={profile.primaryColor}
                  onChange={(event) => setProfile((prev) => ({ ...prev, primaryColor: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                  placeholder="#8B5CF6"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Second brand color</span>
                <p className="mb-2 text-xs text-[#A1A1AA]">Used on buttons and highlights.</p>
                <input
                  type="text"
                  value={profile.accentColor}
                  onChange={(event) => setProfile((prev) => ({ ...prev, accentColor: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                  placeholder="#06B6D4"
                />
              </label>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm text-[#D4D4D8]">
              <p className="rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Account owner</span>
                {ownerName || "—"}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Email</span>
                {ownerEmail || "—"}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Phone</span>
                {ownerPhone || "—"}
              </p>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => void saveProfileSettings()}
                disabled={isSavingProfile}
                className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingProfile ? "Saving..." : "Save business details"}
              </button>
            </div>
          </article>

          <BrandingPreview
            businessName={profile.businessName}
            promoOffer={profile.promoOffer}
            promoCode={profile.promoCode}
            primaryColor={profile.primaryColor}
            accentColor={profile.accentColor}
          />
        </section>
      ) : null}

      {!isLoading && activeTab === "sms" ? (
        <section className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <h3 className="text-lg font-semibold text-white">Text message settings</h3>
          <p className="mt-1 text-sm text-[#A1A1AA]">Choose what your text says and when it gets sent.</p>

          <div className="mt-4">
            <SmsTemplateEditor
              value={smsConfig.smsTemplate}
              onChange={(nextTemplate) => setSmsConfig((prev) => ({ ...prev, smsTemplate: nextTemplate }))}
              businessNamePreview={profile.businessName || "Your Business"}
              disabled={isSavingSms}
            />
          </div>

          <label className="mt-4 block max-w-xs">
            <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">How long to wait after the appointment (minutes)</span>
            <input
              type="number"
              min={0}
              max={1440}
              value={smsConfig.smsDelayMinutes}
              onChange={(event) => {
                const parsed = Number(event.target.value)
                setSmsConfig((prev) => ({
                  ...prev,
                  smsDelayMinutes: Number.isFinite(parsed) ? parsed : prev.smsDelayMinutes,
                }))
              }}
              className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
            />
          </label>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => void saveSmsSettings()}
              disabled={isSavingSms}
              className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSavingSms ? "Saving..." : "Save text message settings"}
            </button>
          </div>
        </section>
      ) : null}

      {!isLoading && activeTab === "calendar" ? (
        <CalendarStatus
          connected={calendar.connected}
          googleEmail={calendar.googleEmail}
          activeWatchCount={calendar.activeWatchCount}
          isBusy={isCalendarBusy}
          onConnect={handleCalendarConnect}
          onDisconnect={handleCalendarDisconnect}
          errorMessage={calendarErrorMessage}
        />
      ) : null}

      {!isLoading && activeTab === "billing" ? (
        <section className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <h3 className="text-lg font-semibold text-white">Billing</h3>
          <p className="mt-1 text-sm text-[#A1A1AA]">Review your plan details and open your secure billing page.</p>

          <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
              <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Current plan</span>
              {billing ? normalizePlan(billing.plan) : "-"}
            </p>
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
              <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Plan price</span>
              {billing?.planAmountMonthlyUsd ? `$${billing.planAmountMonthlyUsd}/mo` : "Custom"}
            </p>
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
              <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Text message usage</span>
              {billingUsageText}
            </p>
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
              <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">SMS limit</span>
              {billingLimitText}
            </p>
          </div>

          <p className="mt-3 text-sm text-[#A1A1AA]">Account status: {billing?.isActive ? "Active" : "Inactive"}</p>

          <div className="mt-5 space-y-3">
            <BillingToggle
              label="Allow overage texts"
              description="When enabled, texts continue beyond your monthly limit and are billed per-text. When disabled, texts stop at your limit."
              checked={billing?.overageBillingEnabled ?? false}
              isSaving={savingBillingPreference === "overageBillingEnabled"}
              onToggle={() => void handleBillingPreferenceToggle("overageBillingEnabled")}
            />

            <BillingToggle
              label="24-hour follow-up nudge"
              description={
                followUpNudgeLocked
                  ? "Available on Growth plan"
                  : "Send one reminder text 24 hours after the initial message if the customer hasn't replied."
              }
              checked={billing?.followUpNudgeEnabled ?? false}
              disabled={followUpNudgeLocked}
              isSaving={savingBillingPreference === "followUpNudgeEnabled"}
              onToggle={() => void handleBillingPreferenceToggle("followUpNudgeEnabled")}
            />
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => void handleManageBilling()}
              disabled={isBillingBusy}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBillingBusy ? "Opening billing page..." : "Manage Billing"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
