"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import BrandingPreview from "@/components/review-funnel/BrandingPreview"
import CalendarStatus from "@/components/review-funnel/CalendarStatus"
import SmsTemplateEditor from "@/components/review-funnel/SmsTemplateEditor"

type SettingsTab = "profile" | "sms" | "calendar" | "billing"

interface ProfileResponse {
  profile: {
    businessName: string
    promoOffer: string
    promoCode: string | null
    primaryColor: string
    accentColor: string
    logoUrl: string | null
    ownerName: string
    ownerEmail: string
    ownerPhone: string
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
}

interface ProfileFormState {
  businessName: string
  promoOffer: string
  promoCode: string
  primaryColor: string
  accentColor: string
}

interface SmsFormState {
  smsTemplate: string
  smsDelayMinutes: number
}

const TAB_ORDER: Array<{ key: SettingsTab; label: string }> = [
  { key: "profile", label: "Profile" },
  { key: "sms", label: "SMS" },
  { key: "calendar", label: "Calendar" },
  { key: "billing", label: "Billing" },
]

const DEFAULT_PROFILE: ProfileFormState = {
  businessName: "",
  promoOffer: "",
  promoCode: "",
  primaryColor: "#8B5CF6",
  accentColor: "#06B6D4",
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

  const [isLoading, setIsLoading] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingSms, setIsSavingSms] = useState(false)
  const [isCalendarBusy, setIsCalendarBusy] = useState(false)
  const [isBillingBusy, setIsBillingBusy] = useState(false)

  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
        throw new Error((profilePayload as { error?: string } | null)?.error || "Failed to load profile settings")
      }

      if (!smsResponse.ok || !smsPayload || !("smsTemplate" in smsPayload)) {
        throw new Error((smsPayload as { error?: string } | null)?.error || "Failed to load SMS settings")
      }

      if (!billingResponse.ok || !billingPayload || !("plan" in billingPayload)) {
        throw new Error((billingPayload as { error?: string } | null)?.error || "Failed to load billing settings")
      }

      setProfile({
        businessName: profilePayload.profile.businessName,
        promoOffer: profilePayload.profile.promoOffer,
        promoCode: profilePayload.profile.promoCode ?? "",
        primaryColor: profilePayload.profile.primaryColor,
        accentColor: profilePayload.profile.accentColor,
      })
      setOwnerEmail(profilePayload.profile.ownerEmail)
      setOwnerName(profilePayload.profile.ownerName)
      setOwnerPhone(profilePayload.profile.ownerPhone)
      setCalendar(profilePayload.calendar)

      setSmsConfig({
        smsTemplate: smsPayload.smsTemplate,
        smsDelayMinutes: smsPayload.smsDelayMinutes,
      })

      setBilling(billingPayload)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load settings")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSettings()
  }, [loadSettings])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const url = new URL(window.location.href)
    const calendarParam = url.searchParams.get("calendar")
    const reason = url.searchParams.get("reason")

    if (calendarParam === "connected") {
      setStatusMessage("Google Calendar connected successfully.")
      url.searchParams.delete("calendar")
      url.searchParams.delete("reason")
      window.history.replaceState({}, "", url.toString())
      return
    }

    if (calendarParam === "error") {
      setErrorMessage(reason ? `Google Calendar connection failed: ${reason}` : "Google Calendar connection failed")
      url.searchParams.delete("calendar")
      url.searchParams.delete("reason")
      window.history.replaceState({}, "", url.toString())
    }
  }, [])

  async function saveProfileSettings() {
    if (!isValidHexColor(profile.primaryColor) || !isValidHexColor(profile.accentColor)) {
      setErrorMessage("Primary and accent colors must be valid hex values (e.g. #8B5CF6)")
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
          promoCode: profile.promoCode,
          primaryColor: profile.primaryColor,
          accentColor: profile.accentColor,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | ProfileResponse
        | { profile?: ProfileResponse["profile"]; error?: string }
        | null

      if (!response.ok) {
        throw new Error((payload as { error?: string } | null)?.error || "Failed to save profile settings")
      }

      if (payload && "profile" in payload && payload.profile) {
        const nextProfile = payload.profile

        setProfile((current) => ({
          ...current,
          businessName: nextProfile.businessName,
          promoOffer: nextProfile.promoOffer,
          promoCode: nextProfile.promoCode ?? "",
          primaryColor: nextProfile.primaryColor,
          accentColor: nextProfile.accentColor,
        }))
      }

      setStatusMessage("Profile settings saved")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to save profile settings")
    } finally {
      setIsSavingProfile(false)
    }
  }

  async function saveSmsSettings() {
    if (smsConfig.smsDelayMinutes < 0 || smsConfig.smsDelayMinutes > 1440) {
      setErrorMessage("SMS delay must be between 0 and 1440 minutes")
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
        throw new Error((payload as { error?: string } | null)?.error || "Failed to save SMS settings")
      }

      setSmsConfig({
        smsTemplate: payload.smsTemplate,
        smsDelayMinutes: payload.smsDelayMinutes,
      })
      setStatusMessage("SMS settings saved")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to save SMS settings")
    } finally {
      setIsSavingSms(false)
    }
  }

  async function handleCalendarConnect() {
    setIsCalendarBusy(true)
    setErrorMessage(null)

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
      setErrorMessage(error instanceof Error ? error.message : "Unable to connect Google Calendar")
      setIsCalendarBusy(false)
    }
  }

  async function handleCalendarDisconnect() {
    setIsCalendarBusy(true)
    setStatusMessage(null)
    setErrorMessage(null)

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
        throw new Error(payload?.error || "Unable to open Stripe billing portal")
      }

      window.location.assign(payload.url)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to open billing portal")
      setIsBillingBusy(false)
    }
  }

  const billingUsageText = useMemo(() => {
    if (!billing) {
      return "—"
    }

    if (billing.smsLimitUnlimited) {
      return `${billing.smsUsedThisMonth.toLocaleString()} used (unlimited plan)`
    }

    return `${billing.smsUsedThisMonth.toLocaleString()} / ${(billing.smsLimitMonthly ?? 0).toLocaleString()} used`
  }, [billing])

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Settings
        </h2>
        <p className="mt-1 text-sm text-[#A1A1AA]">Manage branding, SMS behavior, calendar sync, and billing.</p>
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

      {isLoading ? <p className="text-sm text-[#A1A1AA]">Loading settings...</p> : null}

      {!isLoading && activeTab === "profile" ? (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_1fr]">
          <article className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
            <h3 className="text-lg font-semibold text-white">Business profile</h3>
            <p className="mt-1 text-sm text-[#A1A1AA]">Update your public-facing brand and promo details.</p>

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
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Promo offer</span>
                <textarea
                  value={profile.promoOffer}
                  onChange={(event) => setProfile((prev) => ({ ...prev, promoOffer: event.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Promo code</span>
                <input
                  type="text"
                  value={profile.promoCode}
                  onChange={(event) => setProfile((prev) => ({ ...prev, promoCode: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                  placeholder="WELCOME10"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Primary color</span>
                <input
                  type="text"
                  value={profile.primaryColor}
                  onChange={(event) => setProfile((prev) => ({ ...prev, primaryColor: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
                  placeholder="#8B5CF6"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Accent color</span>
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
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Owner</span>
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
                {isSavingProfile ? "Saving..." : "Save profile"}
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
          <h3 className="text-lg font-semibold text-white">SMS settings</h3>
          <p className="mt-1 text-sm text-[#A1A1AA]">Adjust timing and messaging for review requests.</p>

          <div className="mt-4">
            <SmsTemplateEditor
              value={smsConfig.smsTemplate}
              onChange={(nextTemplate) => setSmsConfig((prev) => ({ ...prev, smsTemplate: nextTemplate }))}
              businessNamePreview={profile.businessName || "Your Business"}
              disabled={isSavingSms}
            />
          </div>

          <label className="mt-4 block max-w-xs">
            <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Delay after appointment (minutes)</span>
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
              {isSavingSms ? "Saving..." : "Save SMS settings"}
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
        />
      ) : null}

      {!isLoading && activeTab === "billing" ? (
        <section className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <h3 className="text-lg font-semibold text-white">Billing</h3>
          <p className="mt-1 text-sm text-[#A1A1AA]">Review plan details and open the Stripe customer portal.</p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
              <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Current plan</span>
              {billing ? normalizePlan(billing.plan) : "—"}
            </p>
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
              <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Plan price</span>
              {billing?.planAmountMonthlyUsd ? `$${billing.planAmountMonthlyUsd}/mo` : "Custom"}
            </p>
            <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
              <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">SMS usage</span>
              {billingUsageText}
            </p>
          </div>

          <p className="mt-3 text-sm text-[#A1A1AA]">Account status: {billing?.isActive ? "Active" : "Inactive"}</p>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => void handleManageBilling()}
              disabled={isBillingBusy}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBillingBusy ? "Opening portal..." : "Manage Billing"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
