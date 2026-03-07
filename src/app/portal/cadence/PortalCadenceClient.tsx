"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

interface PortalMeService {
  serviceType: string
  status: string
}

interface PortalMeResponse {
  services: PortalMeService[]
}

interface BusinessHoursRow {
  dayKey: string
  dayLabel: string
  isOpen: boolean
  openTime: string
  closeTime: string
}

interface ServiceItem {
  name: string
  description: string
  price: string
}

interface FaqItem {
  question: string
  answer: string
}

interface CadenceSettingsState {
  greeting: string
  transferNumber: string
  bookingUrl: string
  timezone: string
  hours: BusinessHoursRow[]
  services: ServiceItem[]
  faqs: FaqItem[]
}

interface CadenceCall {
  id: string
  callerPhone: string | null
  startedAt: string
  endedAt: string | null
  durationSeconds: number
  summaryLines: string[]
}

interface CadenceCallsResponse {
  calls?: CadenceCall[]
  pagination?: {
    limit?: number
    offset?: number
  }
  error?: string
}

const DAYS = [
  { key: "sunday", label: "Sunday", defaultOpen: false },
  { key: "monday", label: "Monday", defaultOpen: true },
  { key: "tuesday", label: "Tuesday", defaultOpen: true },
  { key: "wednesday", label: "Wednesday", defaultOpen: true },
  { key: "thursday", label: "Thursday", defaultOpen: true },
  { key: "friday", label: "Friday", defaultOpen: true },
  { key: "saturday", label: "Saturday", defaultOpen: false },
] as const

const TIMEZONE_OPTIONS = [
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Anchorage",
  "Pacific/Honolulu",
]

const CALL_PAGE_SIZE = 10

function createDefaultHours(): BusinessHoursRow[] {
  return DAYS.map((day) => ({
    dayKey: day.key,
    dayLabel: day.label,
    isOpen: day.defaultOpen,
    openTime: "09:00",
    closeTime: "17:00",
  }))
}

function toDayKey(value: string): string {
  const normalized = value.trim().toLowerCase()
  const found = DAYS.find((day) => day.key === normalized || day.label.toLowerCase() === normalized)
  return found?.key ?? normalized
}

function normalizeHours(rawHours: unknown): BusinessHoursRow[] {
  const fallback = createDefaultHours()

  if (!rawHours) {
    return fallback
  }

  const mapped = new Map<string, BusinessHoursRow>()

  if (Array.isArray(rawHours)) {
    for (const row of rawHours) {
      if (!row || typeof row !== "object") {
        continue
      }

      const record = row as Record<string, unknown>
      const dayValue =
        typeof record.day === "string"
          ? record.day
          : typeof record.dayName === "string"
            ? record.dayName
            : typeof record.name === "string"
              ? record.name
              : null

      if (!dayValue) {
        continue
      }

      const dayKey = toDayKey(dayValue)
      mapped.set(dayKey, {
        dayKey,
        dayLabel: DAYS.find((day) => day.key === dayKey)?.label ?? dayValue,
        isOpen: Boolean(record.isOpen ?? record.open ?? record.enabled),
        openTime: typeof record.openTime === "string" ? record.openTime : "09:00",
        closeTime: typeof record.closeTime === "string" ? record.closeTime : "17:00",
      })
    }
  } else if (typeof rawHours === "object") {
    for (const [rawDay, value] of Object.entries(rawHours as Record<string, unknown>)) {
      if (!value || typeof value !== "object") {
        continue
      }

      const row = value as Record<string, unknown>
      const dayKey = toDayKey(rawDay)
      mapped.set(dayKey, {
        dayKey,
        dayLabel: DAYS.find((day) => day.key === dayKey)?.label ?? rawDay,
        isOpen: Boolean(row.isOpen ?? row.open ?? row.enabled),
        openTime: typeof row.openTime === "string" ? row.openTime : "09:00",
        closeTime: typeof row.closeTime === "string" ? row.closeTime : "17:00",
      })
    }
  }

  return DAYS.map((day) => mapped.get(day.key) ?? fallback.find((row) => row.dayKey === day.key) ?? fallback[0])
}

function normalizeServices(rawServices: unknown): ServiceItem[] {
  if (!Array.isArray(rawServices)) {
    return []
  }

  return rawServices
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null
      }

      const row = item as Record<string, unknown>
      return {
        name: typeof row.name === "string" ? row.name : "",
        description: typeof row.description === "string" ? row.description : "",
        price: typeof row.price === "string" ? row.price : row.price != null ? String(row.price) : "",
      }
    })
    .filter((item): item is ServiceItem => Boolean(item))
}

function normalizeFaqs(rawFaqs: unknown): FaqItem[] {
  if (!Array.isArray(rawFaqs)) {
    return []
  }

  return rawFaqs
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null
      }

      const row = item as Record<string, unknown>
      return {
        question: typeof row.question === "string" ? row.question : "",
        answer: typeof row.answer === "string" ? row.answer : "",
      }
    })
    .filter((item): item is FaqItem => Boolean(item))
}

function maskPhone(phone: string | null): string {
  if (!phone) {
    return "Unknown"
  }

  const digits = phone.replace(/\D/g, "")

  if (digits.length < 4) {
    return "(***) ***-****"
  }

  return `(***) ***-${digits.slice(-4)}`
}

function formatDuration(totalSeconds: number): string {
  const safe = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60

  if (minutes === 0) {
    return `${seconds}s`
  }

  return `${minutes}m ${seconds}s`
}

function formatDateTime(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function firstSummaryLine(summaryLines: string[] | null | undefined): string {
  if (!summaryLines || summaryLines.length === 0) {
    return "No summary available"
  }

  return summaryLines[0]
}

function normalizeSettings(raw: unknown): CadenceSettingsState {
  const payload = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {}

  return {
    greeting: typeof payload.greeting === "string" ? payload.greeting : "",
    transferNumber: typeof payload.transferNumber === "string" ? payload.transferNumber : "",
    bookingUrl: typeof payload.bookingUrl === "string" ? payload.bookingUrl : "",
    timezone:
      typeof payload.timezone === "string" && payload.timezone.trim()
        ? payload.timezone
        : "America/Phoenix",
    hours: normalizeHours(payload.hours),
    services: normalizeServices(payload.services),
    faqs: normalizeFaqs(payload.faqs),
  }
}

function serviceIsCadenceActive(services: PortalMeService[]): boolean {
  return services.some((service) => service.serviceType === "cadence" && service.status === "active")
}

export default function PortalCadenceClient() {
  const router = useRouter()

  const [settings, setSettings] = useState<CadenceSettingsState>(normalizeSettings(null))
  const [initialSettings, setInitialSettings] = useState<CadenceSettingsState | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [settingsError, setSettingsError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [calls, setCalls] = useState<CadenceCall[]>([])
  const [isLoadingCalls, setIsLoadingCalls] = useState(false)
  const [callsError, setCallsError] = useState<string | null>(null)
  const [hasMoreCalls, setHasMoreCalls] = useState(false)
  const [callsOffset, setCallsOffset] = useState(0)

  const serializedInitial = useMemo(
    () => (initialSettings ? JSON.stringify(initialSettings) : null),
    [initialSettings],
  )
  const serializedCurrent = useMemo(() => JSON.stringify(settings), [settings])
  const hasUnsavedChanges = Boolean(serializedInitial && serializedInitial !== serializedCurrent)

  useEffect(() => {
    let isActive = true

    async function loadInitialData() {
      setIsLoading(true)
      setSettingsError(null)

      try {
        const authResponse = await fetch("/api/portal/me", {
          method: "GET",
          cache: "no-store",
        })

        if (authResponse.status === 401) {
          router.replace("/portal/login")
          return
        }

        const authPayload = (await authResponse.json().catch(() => null)) as (PortalMeResponse & { error?: string }) | null

        if (!authResponse.ok || !authPayload) {
          throw new Error(authPayload?.error || "Could not verify your account.")
        }

        if (!serviceIsCadenceActive(authPayload.services ?? [])) {
          throw new Error("Cadence is not active on this account.")
        }

        const [settingsResponse, callsResponse] = await Promise.all([
          fetch("/api/portal/cadence/settings", {
            method: "GET",
            cache: "no-store",
          }),
          fetch(`/api/portal/cadence/calls?limit=${CALL_PAGE_SIZE}&offset=0`, {
            method: "GET",
            cache: "no-store",
          }),
        ])

        const settingsPayload = (await settingsResponse.json().catch(() => null)) as { error?: string } | null

        if (!settingsResponse.ok) {
          throw new Error(settingsPayload?.error || "Could not load your Cadence settings.")
        }

        const normalized = normalizeSettings(settingsPayload)

        const callsPayload = (await callsResponse.json().catch(() => null)) as CadenceCallsResponse | null

        if (!callsResponse.ok) {
          throw new Error(callsPayload?.error || "Could not load recent calls.")
        }

        if (!isActive) {
          return
        }

        setSettings(normalized)
        setInitialSettings(normalized)

        const firstCalls = Array.isArray(callsPayload?.calls) ? callsPayload.calls : []
        setCalls(firstCalls)
        setCallsOffset(firstCalls.length)
        setHasMoreCalls(firstCalls.length === CALL_PAGE_SIZE)
      } catch (loadError) {
        if (isActive) {
          setSettingsError(
            loadError instanceof Error ? loadError.message : "Could not load your Cadence settings.",
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialData()

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

    return () => {
      window.clearTimeout(timer)
    }
  }, [toastMessage])

  async function handleSave() {
    if (!initialSettings) {
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      const updates: Record<string, unknown> = {}

      if (settings.greeting !== initialSettings.greeting) {
        updates.greeting = settings.greeting
      }

      if (settings.transferNumber !== initialSettings.transferNumber) {
        updates.transferNumber = settings.transferNumber.trim() || null
      }

      if (settings.bookingUrl !== initialSettings.bookingUrl) {
        updates.bookingUrl = settings.bookingUrl.trim() || null
      }

      if (settings.timezone !== initialSettings.timezone) {
        updates.timezone = settings.timezone
      }

      if (JSON.stringify(settings.hours) !== JSON.stringify(initialSettings.hours)) {
        updates.hours = settings.hours
      }

      if (JSON.stringify(settings.services) !== JSON.stringify(initialSettings.services)) {
        updates.services = settings.services
      }

      if (JSON.stringify(settings.faqs) !== JSON.stringify(initialSettings.faqs)) {
        updates.faqs = settings.faqs
      }

      if (Object.keys(updates).length === 0) {
        setToastMessage("No changes to save yet.")
        setIsSaving(false)
        return
      }

      const response = await fetch("/api/portal/cadence/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not save your settings.")
      }

      const normalized = normalizeSettings(payload)
      setSettings(normalized)
      setInitialSettings(normalized)
      setToastMessage("Settings saved")
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save your settings.")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleLoadMoreCalls() {
    setIsLoadingCalls(true)
    setCallsError(null)

    try {
      const response = await fetch(`/api/portal/cadence/calls?limit=${CALL_PAGE_SIZE}&offset=${callsOffset}`, {
        method: "GET",
        cache: "no-store",
      })

      const payload = (await response.json().catch(() => null)) as CadenceCallsResponse | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not load more calls.")
      }

      const nextCalls = Array.isArray(payload?.calls) ? payload.calls : []
      setCalls((previous) => [...previous, ...nextCalls])
      setCallsOffset((previous) => previous + nextCalls.length)
      setHasMoreCalls(nextCalls.length === CALL_PAGE_SIZE)
    } catch (error) {
      setCallsError(error instanceof Error ? error.message : "Could not load more calls.")
    } finally {
      setIsLoadingCalls(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-[#A1A1AA]">
          Loading Cadence settings...
        </div>
      </main>
    )
  }

  if (settingsError) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-sm text-red-300">
          {settingsError}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      {toastMessage ? (
        <div className="fixed bottom-4 right-4 z-40 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">
          {toastMessage}
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <Link href="/portal" className="text-sm text-[#C4B5FD] transition hover:text-[#DDD6FE]">
            ← Back to portal
          </Link>
          <h1 className="mt-3 text-3xl font-semibold text-white">Cadence Settings</h1>
          <p className="mt-2 text-sm text-[#A1A1AA]">Update how your receptionist answers calls for your business.</p>
        </div>

        <section className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-[#D4D4D8]">Greeting</label>
            <textarea
              rows={4}
              value={settings.greeting}
              onChange={(event) => setSettings((prev) => ({ ...prev, greeting: event.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white focus:border-[#8B5CF6] focus:outline-none"
              placeholder="How should Cadence greet callers?"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm text-[#D4D4D8]">Transfer Number</span>
              <input
                type="text"
                value={settings.transferNumber}
                onChange={(event) => setSettings((prev) => ({ ...prev, transferNumber: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                placeholder="Where to transfer live calls"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm text-[#D4D4D8]">Booking URL</span>
              <input
                type="text"
                value={settings.bookingUrl}
                onChange={(event) => setSettings((prev) => ({ ...prev, bookingUrl: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                placeholder="Where callers can book online"
              />
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#D4D4D8]">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(event) => setSettings((prev) => ({ ...prev, timezone: event.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
            >
              {TIMEZONE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">Business Hours</h2>
            <div className="mt-3 space-y-3">
              {settings.hours.map((hourRow, index) => (
                <div
                  key={hourRow.dayKey}
                  className="grid grid-cols-1 items-center gap-3 rounded-xl border border-white/8 bg-white/[0.01] p-3 md:grid-cols-[1fr_auto_1fr_1fr]"
                >
                  <p className="text-sm font-medium text-white">{hourRow.dayLabel}</p>

                  <label className="inline-flex items-center gap-2 text-sm text-[#D4D4D8]">
                    <input
                      type="checkbox"
                      checked={hourRow.isOpen}
                      onChange={(event) =>
                        setSettings((prev) => {
                          const nextHours = [...prev.hours]
                          nextHours[index] = { ...nextHours[index], isOpen: event.target.checked }
                          return { ...prev, hours: nextHours }
                        })
                      }
                    />
                    Open
                  </label>

                  <input
                    type="time"
                    value={hourRow.openTime}
                    onChange={(event) =>
                      setSettings((prev) => {
                        const nextHours = [...prev.hours]
                        nextHours[index] = { ...nextHours[index], openTime: event.target.value }
                        return { ...prev, hours: nextHours }
                      })
                    }
                    disabled={!hourRow.isOpen}
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-white disabled:opacity-50"
                  />

                  <input
                    type="time"
                    value={hourRow.closeTime}
                    onChange={(event) =>
                      setSettings((prev) => {
                        const nextHours = [...prev.hours]
                        nextHours[index] = { ...nextHours[index], closeTime: event.target.value }
                        return { ...prev, hours: nextHours }
                      })
                    }
                    disabled={!hourRow.isOpen}
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-white disabled:opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Services</h2>
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    services: [...prev.services, { name: "", description: "", price: "" }],
                  }))
                }
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/30"
              >
                Add service
              </button>
            </div>

            <div className="space-y-3">
              {settings.services.length === 0 ? (
                <p className="text-sm text-[#A1A1AA]">No services added yet.</p>
              ) : (
                settings.services.map((service, index) => (
                  <div key={`service-${index}`} className="rounded-xl border border-white/8 bg-white/[0.01] p-3 space-y-3">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <input
                        type="text"
                        value={service.name}
                        onChange={(event) =>
                          setSettings((prev) => {
                            const next = [...prev.services]
                            next[index] = { ...next[index], name: event.target.value }
                            return { ...prev, services: next }
                          })
                        }
                        placeholder="Service name"
                        className="rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-white"
                      />
                      <input
                        type="text"
                        value={service.price}
                        onChange={(event) =>
                          setSettings((prev) => {
                            const next = [...prev.services]
                            next[index] = { ...next[index], price: event.target.value }
                            return { ...prev, services: next }
                          })
                        }
                        placeholder="Price"
                        className="rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-white"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={service.description}
                      onChange={(event) =>
                        setSettings((prev) => {
                          const next = [...prev.services]
                          next[index] = { ...next[index], description: event.target.value }
                          return { ...prev, services: next }
                        })
                      }
                      placeholder="Short description"
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          services: prev.services.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                      className="text-xs font-semibold text-red-300 transition hover:text-red-200"
                    >
                      Remove service
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    faqs: [...prev.faqs, { question: "", answer: "" }],
                  }))
                }
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/30"
              >
                Add question
              </button>
            </div>

            <div className="space-y-3">
              {settings.faqs.length === 0 ? (
                <p className="text-sm text-[#A1A1AA]">No questions added yet.</p>
              ) : (
                settings.faqs.map((faq, index) => (
                  <div key={`faq-${index}`} className="rounded-xl border border-white/8 bg-white/[0.01] p-3 space-y-3">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(event) =>
                        setSettings((prev) => {
                          const next = [...prev.faqs]
                          next[index] = { ...next[index], question: event.target.value }
                          return { ...prev, faqs: next }
                        })
                      }
                      placeholder="Question"
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-white"
                    />

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(event) =>
                        setSettings((prev) => {
                          const next = [...prev.faqs]
                          next[index] = { ...next[index], answer: event.target.value }
                          return { ...prev, faqs: next }
                        })
                      }
                      placeholder="Answer"
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-3 py-2 text-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          faqs: prev.faqs.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                      className="text-xs font-semibold text-red-300 transition hover:text-red-200"
                    >
                      Remove question
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {saveError ? <p className="text-sm text-red-300">{saveError}</p> : null}

          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={isSaving || !hasUnsavedChanges}
            className="inline-flex rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : hasUnsavedChanges ? "Save changes" : "Saved"}
          </button>
        </section>

        <section className="rounded-2xl border border-white/8 bg-[#12121A]/90 p-6">
          <h2 className="text-lg font-semibold text-white">Recent Calls</h2>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-[#A1A1AA]">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Caller</th>
                  <th className="pb-3 pr-4">Duration</th>
                  <th className="pb-3">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-[#D4D4D8]">
                {calls.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-[#A1A1AA]">
                      No calls yet.
                    </td>
                  </tr>
                ) : (
                  calls.map((call) => (
                    <tr key={call.id}>
                      <td className="py-3 pr-4 whitespace-nowrap">{formatDateTime(call.startedAt)}</td>
                      <td className="py-3 pr-4 whitespace-nowrap">{maskPhone(call.callerPhone)}</td>
                      <td className="py-3 pr-4 whitespace-nowrap">{formatDuration(call.durationSeconds)}</td>
                      <td className="py-3 max-w-xl truncate">{firstSummaryLine(call.summaryLines)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {callsError ? <p className="mt-3 text-sm text-red-300">{callsError}</p> : null}

          {hasMoreCalls ? (
            <button
              type="button"
              onClick={() => void handleLoadMoreCalls()}
              disabled={isLoadingCalls}
              className="mt-4 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingCalls ? "Loading..." : "Load more"}
            </button>
          ) : null}
        </section>
      </div>
    </main>
  )
}
