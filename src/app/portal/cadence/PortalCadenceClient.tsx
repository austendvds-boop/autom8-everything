"use client"

import Link from "next/link"
import { Fragment, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import PortalNav from "@/components/portal/PortalNav"
import { PortalPageSkeleton } from "@/components/portal/LoadingSkeleton"
import { PortalSessionExpiredError, portalFetch } from "@/lib/platform/portal-fetch"

interface PortalMeService {
  serviceType: string
  status: string
  cadenceTenantId?: string | null
  metadata?: Record<string, unknown>
}

interface PortalMeClient {
  phone?: string | null
}

interface PortalMeResponse {
  client?: PortalMeClient
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
  tenantId: string
  greeting: string
  transferNumber: string
  bookingUrl: string
  timezone: string
  systemPrompt: string
  phoneNumber: string
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

interface CadenceUsageResponse {
  usage: {
    totalCalls: number
    totalDurationSeconds: number
  }
  plan: {
    callLimit: number
    minuteLimit: number
    overageRateCents?: number
    overageCapCents?: number
  }
  overage?: {
    preauthIntentId: string | null
    billedCents: number
    disabled: boolean
    notifiedAt: string | null
  }
}

interface ChecklistStep {
  key: string
  title: string
  complete: boolean
  sectionId?: string
  detail?: string
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

const DEFAULT_GREETING_OPTIONS = [
  "Thanks for calling. How can I help you today?",
  "Hello, thank you for calling. How can I help you today?",
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
    tenantId:
      typeof payload.tenantId === "string"
        ? payload.tenantId
        : typeof payload.id === "string"
          ? payload.id
          : "",
    greeting: typeof payload.greeting === "string" ? payload.greeting : "",
    transferNumber: typeof payload.transferNumber === "string" ? payload.transferNumber : "",
    bookingUrl: typeof payload.bookingUrl === "string" ? payload.bookingUrl : "",
    timezone:
      typeof payload.timezone === "string" && payload.timezone.trim()
        ? payload.timezone
        : "America/Phoenix",
    systemPrompt: typeof payload.systemPrompt === "string" ? payload.systemPrompt : "",
    phoneNumber:
      typeof payload.phoneNumber === "string"
        ? payload.phoneNumber
        : typeof payload.smsNumber === "string"
          ? payload.smsNumber
          : "",
    hours: normalizeHours(payload.hours),
    services: normalizeServices(payload.services),
    faqs: normalizeFaqs(payload.faqs),
  }
}

function serviceIsCadenceActive(services: PortalMeService[]): boolean {
  return services.some((service) => service.serviceType === "cadence" && service.status === "active")
}

function serviceNeedsCadenceOnboarding(services: PortalMeService[]): boolean {
  return services.some(
    (service) =>
      service.serviceType === "cadence" &&
      service.status === "active" &&
      service.metadata?.onboardingComplete === false,
  )
}

function findCadenceTenantId(services: PortalMeService[]): string {
  const service = services.find((item) => item.serviceType === "cadence" && item.status === "active")
  return service?.cadenceTenantId?.trim() || ""
}

function toSafeRatio(used: number, limit: number): number {
  if (!Number.isFinite(limit) || limit <= 0) {
    return 0
  }

  return Math.max(0, Math.min(used / limit, 1))
}

function usageFillClass(usagePercent: number): string {
  if (usagePercent >= 100) {
    return "bg-red-500"
  }

  if (usagePercent >= 80) {
    return "bg-amber-500"
  }

  return "bg-emerald-500"
}

function formatWholeNumber(value: number): string {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)).toLocaleString() : "0"
}

function roundToMinutes(totalSeconds: number): number {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return 0
  }

  return Math.ceil(totalSeconds / 60)
}

function scrollToSection(sectionId: string): void {
  if (typeof window === "undefined") {
    return
  }

  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: "smooth", block: "start" })
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
  const [expandedCallIds, setExpandedCallIds] = useState<Set<string>>(new Set())

  const [usage, setUsage] = useState<CadenceUsageResponse | null>(null)
  const [usageUnavailable, setUsageUnavailable] = useState(false)

  const [portalPhone, setPortalPhone] = useState("")
  const [cadenceTenantId, setCadenceTenantId] = useState("")
  const [isChecklistDismissed, setIsChecklistDismissed] = useState(true)
  const [hasCompletedTestCall, setHasCompletedTestCall] = useState(false)

  const [testCallPhone, setTestCallPhone] = useState("")
  const [testCallStatus, setTestCallStatus] = useState<"idle" | "calling" | "success">("idle")
  const [testCallError, setTestCallError] = useState<string | null>(null)

  const serializedInitial = useMemo(
    () => (initialSettings ? JSON.stringify(initialSettings) : null),
    [initialSettings],
  )
  const serializedCurrent = useMemo(() => JSON.stringify(settings), [settings])
  const hasUnsavedChanges = Boolean(serializedInitial && serializedInitial !== serializedCurrent)

  const onboardingKey = useMemo(() => {
    const keySource = settings.tenantId || cadenceTenantId
    return keySource ? `cadence_onboarding_dismissed_${keySource}` : ""
  }, [cadenceTenantId, settings.tenantId])

  const completedTestKey = useMemo(() => {
    const keySource = settings.tenantId || cadenceTenantId
    return keySource ? `cadence_test_completed_${keySource}` : ""
  }, [cadenceTenantId, settings.tenantId])

  const minutesUsed = roundToMinutes(usage?.usage?.totalDurationSeconds ?? 0)
  const minuteLimit = usage?.plan?.minuteLimit ?? 0
  const usagePercent = minuteLimit > 0 ? Math.min((minutesUsed / minuteLimit) * 100, 100) : 0
  const isOverLimit = minuteLimit > 0 && minutesUsed >= minuteLimit

  const cadenceNumber = settings.phoneNumber.trim() || portalPhone.trim() || "Not available yet"
  const greetingLooksCustom =
    settings.greeting.trim().length > 0 &&
    !DEFAULT_GREETING_OPTIONS.includes(settings.greeting.trim())

  const checklistSteps = useMemo<ChecklistStep[]>(() => {
    const openHoursCount = settings.hours.filter((hour) => hour.isOpen).length
    const hasServicesOrFaqs = settings.services.length > 0 || settings.faqs.length > 0

    return [
      {
        key: "account",
        title: "Account created",
        complete: true,
      },
      {
        key: "greeting",
        title: "Set your greeting",
        complete: greetingLooksCustom,
        sectionId: "cadence-greeting",
      },
      {
        key: "hours",
        title: "Add your business hours",
        complete: openHoursCount > 0,
        sectionId: "cadence-hours",
      },
      {
        key: "services-faqs",
        title: "Set your services & FAQs",
        complete: hasServicesOrFaqs,
        sectionId: "cadence-services",
      },
      {
        key: "test",
        title: "Test your number",
        complete: hasCompletedTestCall,
        sectionId: "cadence-test-mode",
      },
      {
        key: "go-live",
        title: "Go live! Share your Cadence number",
        complete: cadenceNumber !== "Not available yet",
        detail: cadenceNumber,
      },
    ]
  }, [cadenceNumber, greetingLooksCustom, hasCompletedTestCall, settings.faqs.length, settings.hours, settings.services.length])

  const completedChecklistCount = checklistSteps.filter((step) => step.complete).length

  useEffect(() => {
    let isActive = true

    async function loadInitialData() {
      setIsLoading(true)
      setSettingsError(null)
      setUsageUnavailable(false)

      try {
        const authResponse = await portalFetch("/api/portal/me", {
          method: "GET",
          cache: "no-store",
        })


        const authPayload = (await authResponse.json().catch(() => null)) as (PortalMeResponse & { error?: string }) | null

        if (!authResponse.ok || !authPayload) {
          throw new Error(authPayload?.error || "Could not verify your account.")
        }

        if (!serviceIsCadenceActive(authPayload.services ?? [])) {
          throw new Error("Cadence is not active on this account.")
        }

        if (serviceNeedsCadenceOnboarding(authPayload.services ?? [])) {
          router.replace("/portal/onboarding")
          return
        }

        const activeCadenceTenantId = findCadenceTenantId(authPayload.services ?? [])

        const [settingsResponse, callsResponse, usageResponse] = await Promise.all([
          portalFetch("/api/portal/cadence/settings", {
            method: "GET",
            cache: "no-store",
          }),
          portalFetch(`/api/portal/cadence/calls?limit=${CALL_PAGE_SIZE}&offset=0`, {
            method: "GET",
            cache: "no-store",
          }),
          portalFetch("/api/portal/cadence/usage", {
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

        const usagePayload = (await usageResponse.json().catch(() => null)) as (CadenceUsageResponse & { error?: string }) | null

        if (!isActive) {
          return
        }

        setPortalPhone(authPayload.client?.phone?.trim() || "")
        setCadenceTenantId(activeCadenceTenantId)

        setSettings(normalized)
        setInitialSettings(normalized)

        const firstCalls = Array.isArray(callsPayload?.calls) ? callsPayload.calls : []
        setCalls(firstCalls)
        setCallsOffset(firstCalls.length)
        setHasMoreCalls(firstCalls.length === CALL_PAGE_SIZE)

        if (usageResponse.ok && usagePayload && "usage" in usagePayload && "plan" in usagePayload) {
          setUsage({
            usage: {
              totalCalls: Number(usagePayload.usage?.totalCalls ?? 0),
              totalDurationSeconds: Number(usagePayload.usage?.totalDurationSeconds ?? 0),
            },
            plan: {
              callLimit: Number(usagePayload.plan?.callLimit ?? 0),
              minuteLimit: Number(usagePayload.plan?.minuteLimit ?? 0),
              overageRateCents:
                typeof usagePayload.plan?.overageRateCents === "number"
                  ? usagePayload.plan.overageRateCents
                  : undefined,
              overageCapCents:
                typeof usagePayload.plan?.overageCapCents === "number"
                  ? usagePayload.plan.overageCapCents
                  : undefined,
            },
            overage: usagePayload.overage
              ? {
                  preauthIntentId: usagePayload.overage.preauthIntentId ?? null,
                  billedCents: Number(usagePayload.overage.billedCents ?? 0),
                  disabled: Boolean(usagePayload.overage.disabled),
                  notifiedAt: usagePayload.overage.notifiedAt ?? null,
                }
              : undefined,
          })
          setUsageUnavailable(false)
        } else {
          setUsage(null)
          setUsageUnavailable(true)
        }
      } catch (loadError) {
        if (loadError instanceof PortalSessionExpiredError) {
          router.replace("/portal/login")
          return
        }

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

  useEffect(() => {
    if (!onboardingKey || typeof window === "undefined") {
      return
    }

    const wasDismissed = window.localStorage.getItem(onboardingKey) === "1"
    setIsChecklistDismissed(wasDismissed)
  }, [onboardingKey])

  useEffect(() => {
    if (!completedTestKey || typeof window === "undefined") {
      return
    }

    const completed = window.localStorage.getItem(completedTestKey) === "1"
    setHasCompletedTestCall(completed)
  }, [completedTestKey])

  useEffect(() => {
    if (!testCallPhone.trim()) {
      const fallbackPhone = portalPhone.trim() || settings.transferNumber.trim()
      if (fallbackPhone) {
        setTestCallPhone(fallbackPhone)
      }
    }
  }, [portalPhone, settings.transferNumber, testCallPhone])

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

      if (settings.systemPrompt !== initialSettings.systemPrompt) {
        updates.systemPrompt = settings.systemPrompt.trim() || null
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

      const response = await portalFetch("/api/portal/cadence/settings", {
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
      if (error instanceof PortalSessionExpiredError) {
        router.replace("/portal/login")
        return
      }

      setSaveError(error instanceof Error ? error.message : "Could not save your settings.")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleLoadMoreCalls() {
    setIsLoadingCalls(true)
    setCallsError(null)

    try {
      const response = await portalFetch(`/api/portal/cadence/calls?limit=${CALL_PAGE_SIZE}&offset=${callsOffset}`, {
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
      if (error instanceof PortalSessionExpiredError) {
        router.replace("/portal/login")
        return
      }

      setCallsError(error instanceof Error ? error.message : "Could not load more calls.")
    } finally {
      setIsLoadingCalls(false)
    }
  }

  function toggleCallExpanded(callId: string) {
    setExpandedCallIds((previous) => {
      const next = new Set(previous)
      if (next.has(callId)) {
        next.delete(callId)
      } else {
        next.add(callId)
      }
      return next
    })
  }

  async function handleTestCall() {
    const toPhone = testCallPhone.trim()
    if (!toPhone) {
      setTestCallError("Please enter the phone number where we should call you.")
      return
    }

    setTestCallStatus("calling")
    setTestCallError(null)

    try {
      const response = await portalFetch("/api/portal/cadence/test-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toPhone }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Could not start your test call.")
      }

      setTestCallStatus("success")

      if (completedTestKey && typeof window !== "undefined") {
        window.localStorage.setItem(completedTestKey, "1")
        setHasCompletedTestCall(true)
      }

      window.setTimeout(() => {
        setTestCallStatus("idle")
      }, 30000)
    } catch (error) {
      if (error instanceof PortalSessionExpiredError) {
        router.replace("/portal/login")
        return
      }

      setTestCallStatus("idle")
      setTestCallError(error instanceof Error ? error.message : "Could not start your test call.")
    }
  }

  function handleDismissChecklist() {
    if (!onboardingKey || typeof window === "undefined") {
      setIsChecklistDismissed(true)
      return
    }

    window.localStorage.setItem(onboardingKey, "1")
    setIsChecklistDismissed(true)
  }

  if (isLoading) {
    return <PortalPageSkeleton cards={3} />
  }

  if (settingsError) {
    return (
      <div className="min-h-screen bg-[#0E1015]">
        <PortalNav />
        <main className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-white/[0.06] bg-[#161920]/90 p-6 text-sm text-red-300">
            {settingsError}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0E1015]">
      <PortalNav />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
      {toastMessage ? (
        <div className="fixed bottom-4 right-4 z-40 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">
          {toastMessage}
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <Link href="/portal" className="text-sm text-[#D4A030] transition hover:text-[#E5B544]">
            ← Back to portal
          </Link>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#D4A030]">Cadence Settings</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#EDEBE8]">Cadence Settings</h1>
          <p className="mt-2 text-sm text-[#9B978F]">Update how your receptionist answers calls for your business.</p>
        </div>

        <section className="card-elevated space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-[#EDEBE8]">Plan Usage</h2>
            <Link href="/portal/billing" className="text-sm text-[#D4A030] transition hover:text-[#E5B544]">
              Manage Billing
            </Link>
          </div>

          {usageUnavailable || !usage ? (
            <p className="text-sm text-[#9B978F]">Usage data unavailable</p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-[#EDEBE8]">
                {minuteLimit > 0
                  ? `${formatWholeNumber(minutesUsed)} of ${formatWholeNumber(minuteLimit)} minutes used this month`
                  : `${formatWholeNumber(minutesUsed)} minutes used this month`}
              </p>

              {minuteLimit > 0 ? (
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all ${usageFillClass(usagePercent)}`}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              ) : null}

              {isOverLimit ? (
                <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                  <p className="text-sm font-medium text-amber-400">You&apos;ve exceeded your monthly limit</p>
                  <p className="mt-1 text-xs text-amber-300/70">
                    Overage rate: ${((usage.plan.overageRateCents || 15) / 100).toFixed(2)} per minute
                    {usage.overage?.billedCents
                      ? ` · Current overage: $${(usage.overage.billedCents / 100).toFixed(2)}`
                      : ""}
                  </p>
                </div>
              ) : null}

              {usage.overage?.disabled ? (
                <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <p className="text-sm font-medium text-red-400">Your Cadence line is temporarily paused</p>
                  <p className="mt-1 text-xs text-red-300/70">
                    We couldn&apos;t authorize your payment method for overage charges. Update your payment method to
                    resume.
                  </p>
                  <a
                    href="/portal/billing"
                    className="mt-2 inline-block text-xs font-medium text-red-300 underline hover:text-red-200"
                  >
                    Update payment method →
                  </a>
                </div>
              ) : null}
            </div>
          )}
        </section>

        {!isChecklistDismissed ? (
          <section className="card-base space-y-4 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#EDEBE8]">Getting Started Checklist</h2>
              <p className="text-sm text-[#9B978F]">
                {completedChecklistCount} of {checklistSteps.length} complete
              </p>
            </div>

            <div className="space-y-2">
              {checklistSteps.map((step) => (
                <div
                  key={step.key}
                  className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 ${
                    step.complete
                      ? "border-white/[0.06] bg-white/[0.01]"
                      : "border-[rgba(212,160,48,0.18)] bg-[rgba(212,160,48,0.07)]"
                  }`}
                >
                  <span className={`mt-0.5 text-sm ${step.complete ? "text-emerald-400" : "text-[#D4A030]"}`}>
                    {step.complete ? "✓" : "○"}
                  </span>

                  <div className="flex-1 text-sm">
                    {step.complete ? (
                      <p className="text-[#EDEBE8]">{step.title}</p>
                    ) : step.sectionId ? (
                      <button
                        type="button"
                        onClick={() => scrollToSection(step.sectionId as string)}
                        className="text-left text-[#D4A030] transition hover:text-[#E5B544]"
                      >
                        {step.title}
                      </button>
                    ) : (
                      <p className="text-[#EDEBE8]">{step.title}</p>
                    )}

                    {step.detail ? <p className="mt-1 text-xs text-[#9B978F]">{step.detail}</p> : null}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleDismissChecklist}
              className="rounded-full border border-white/[0.06] px-4 py-2 text-xs font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
            >
              Dismiss checklist
            </button>
          </section>
        ) : null}

        <section className="card-base space-y-6 p-6">
          <div id="cadence-greeting">
            <label className="mb-2 block text-sm text-[#EDEBE8]">Greeting</label>
            <textarea
              rows={4}
              value={settings.greeting}
              onChange={(event) => setSettings((prev) => ({ ...prev, greeting: event.target.value }))}
              className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
              placeholder="How should Cadence greet callers?"
            />
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <label className="mb-2 block text-sm text-[#EDEBE8]">AI Personality & Instructions</label>
            <p className="mb-3 text-sm text-[#9B978F]">
              This is the script your AI receptionist follows. It determines how calls are handled, what information is collected, and how callers are helped.
            </p>
            <textarea
              rows={8}
              value={settings.systemPrompt}
              onChange={(event) => setSettings((prev) => ({ ...prev, systemPrompt: event.target.value }))}
              className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-3 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
              placeholder="Describe how your receptionist should handle calls."
            />
            <p className="mt-2 text-xs text-[#9B978F]">{settings.systemPrompt.length} characters</p>
            <p className="mt-1 text-xs text-amber-200">Changes take effect on the next incoming call.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-6 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm text-[#EDEBE8]">Transfer Number</span>
              <input
                type="text"
                value={settings.transferNumber}
                onChange={(event) => setSettings((prev) => ({ ...prev, transferNumber: event.target.value }))}
                className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-2.5 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
                placeholder="Where to transfer live calls"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm text-[#EDEBE8]">Booking URL</span>
              <input
                type="text"
                value={settings.bookingUrl}
                onChange={(event) => setSettings((prev) => ({ ...prev, bookingUrl: event.target.value }))}
                className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-2.5 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
                placeholder="Where callers can book online"
              />
            </label>
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <label className="mb-2 block text-sm text-[#EDEBE8]">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(event) => setSettings((prev) => ({ ...prev, timezone: event.target.value }))}
              className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-2.5 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
            >
              {TIMEZONE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div id="cadence-hours" className="border-t border-white/[0.06] pt-6">
            <h2 className="text-lg font-semibold text-[#EDEBE8]">Business Hours</h2>
            <div className="mt-3 space-y-3">
              {settings.hours.map((hourRow, index) => (
                <div
                  key={hourRow.dayKey}
                  className="grid grid-cols-1 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.01] p-3 md:grid-cols-[1fr_auto_1fr_1fr]"
                >
                  <p className="text-sm font-medium text-[#EDEBE8]">{hourRow.dayLabel}</p>

                  <label className="inline-flex items-center gap-2 text-sm text-[#EDEBE8]">
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
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] px-3 py-2 text-[#EDEBE8] disabled:opacity-50"
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
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] px-3 py-2 text-[#EDEBE8] disabled:opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>

          <div id="cadence-services" className="border-t border-white/[0.06] pt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#EDEBE8]">Services</h2>
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    services: [...prev.services, { name: "", description: "", price: "" }],
                  }))
                }
                className="rounded-full border border-white/[0.06] px-4 py-2 text-xs font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
              >
                Add service
              </button>
            </div>

            <div className="space-y-3">
              {settings.services.length === 0 ? (
                <p className="text-sm text-[#9B978F]">No services added yet.</p>
              ) : (
                settings.services.map((service, index) => (
                  <div key={`service-${index}`} className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-3 space-y-3">
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
                        className="rounded-lg border border-white/[0.06] bg-[#0E1015] px-3 py-2 text-[#EDEBE8]"
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
                        className="rounded-lg border border-white/[0.06] bg-[#0E1015] px-3 py-2 text-[#EDEBE8]"
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
                      className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] px-3 py-2 text-[#EDEBE8]"
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

          <div id="cadence-faqs" className="border-t border-white/[0.06] pt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#EDEBE8]">Frequently Asked Questions</h2>
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    faqs: [...prev.faqs, { question: "", answer: "" }],
                  }))
                }
                className="rounded-full border border-white/[0.06] px-4 py-2 text-xs font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30"
              >
                Add question
              </button>
            </div>

            <div className="space-y-3">
              {settings.faqs.length === 0 ? (
                <p className="text-sm text-[#9B978F]">No questions added yet.</p>
              ) : (
                settings.faqs.map((faq, index) => (
                  <div key={`faq-${index}`} className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-3 space-y-3">
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
                      className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] px-3 py-2 text-[#EDEBE8]"
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
                      className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] px-3 py-2 text-[#EDEBE8]"
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

          <section id="cadence-test-mode" className="border-t border-white/[0.06] pt-6">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 space-y-3">
              <h2 className="text-lg font-semibold text-[#EDEBE8]">Test Your AI Receptionist</h2>
              <p className="text-sm text-[#9B978F]">
                Hear exactly what your callers will hear. We&apos;ll call you and connect to your Cadence number.
              </p>

              <label className="block">
                <span className="mb-2 block text-sm text-[#EDEBE8]">Your phone number</span>
                <input
                  type="text"
                  value={testCallPhone}
                  onChange={(event) => setTestCallPhone(event.target.value)}
                  placeholder="Where we should call you"
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0E1015] px-4 py-2.5 text-[#EDEBE8] focus:border-[#D4A030] focus:outline-none"
                />
              </label>

              <button
                type="button"
                onClick={() => void handleTestCall()}
                disabled={testCallStatus === "calling"}
                className="inline-flex rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-5 py-2.5 text-sm font-semibold text-[#0E1015] transition hover:shadow-[0_0_30px_rgba(212,160,48,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {testCallStatus === "calling"
                  ? "Calling..."
                  : testCallStatus === "success"
                    ? "Call initiated! Pick up your phone."
                    : "Call Me"}
              </button>

              {testCallError ? <p className="text-sm text-red-300">{testCallError}</p> : null}
              <p className="text-xs text-[#9B978F]">You can test up to 3 times per hour.</p>
            </div>
          </section>

          {saveError ? <p className="text-sm text-red-300">{saveError}</p> : null}

          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={isSaving || !hasUnsavedChanges}
            className="inline-flex rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-5 py-2.5 text-sm font-semibold text-[#0E1015] transition hover:shadow-[0_0_30px_rgba(212,160,48,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : hasUnsavedChanges ? "Save changes" : "Saved"}
          </button>
        </section>

        <section className="card-base p-6">
          <h2 className="text-lg font-semibold text-[#EDEBE8]">Recent Calls</h2>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-[#9B978F]">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Caller</th>
                  <th className="pb-3 pr-4">Duration</th>
                  <th className="pb-3">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-[#EDEBE8]">
                {calls.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-[#9B978F]">
                      No calls yet.
                    </td>
                  </tr>
                ) : (
                  calls.map((call) => {
                    const isExpanded = expandedCallIds.has(call.id)
                    const summaryLines = Array.isArray(call.summaryLines) ? call.summaryLines.filter(Boolean) : []

                    return (
                      <Fragment key={call.id}>
                        <tr
                          className="cursor-pointer transition hover:bg-white/[0.02]"
                          onClick={() => toggleCallExpanded(call.id)}
                        >
                          <td className="py-3 pr-4 whitespace-nowrap">{formatDateTime(call.startedAt)}</td>
                          <td className="py-3 pr-4 whitespace-nowrap">{maskPhone(call.callerPhone)}</td>
                          <td className="py-3 pr-4 whitespace-nowrap">{formatDuration(call.durationSeconds)}</td>
                          <td className="py-3 max-w-xl">
                            <div className="flex items-center justify-between gap-3">
                              <span className="truncate">{firstSummaryLine(call.summaryLines)}</span>
                              <span className="text-xs text-[#9B978F]">{isExpanded ? "▾" : "▸"}</span>
                            </div>
                          </td>
                        </tr>
                        {isExpanded ? (
                          <tr key={`${call.id}-expanded`}>
                            <td colSpan={4} className="pb-4 pl-4 pr-4 text-[#EDEBE8]">
                              {summaryLines.length > 0 ? (
                                <ul className="list-disc space-y-1 pl-5 text-sm">
                                  {summaryLines.map((line, lineIndex) => (
                                    <li key={`${call.id}-summary-${lineIndex}`}>{line}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-[#9B978F]">No summary available</p>
                              )}
                            </td>
                          </tr>
                        ) : null}
                      </Fragment>
                    )
                  })
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
              className="mt-4 rounded-full border border-white/[0.06] px-4 py-2 text-sm font-semibold text-[#EDEBE8] transition hover:border-[#D4A030]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingCalls ? "Loading..." : "Load more"}
            </button>
          ) : null}
        </section>
      </div>
      </main>
    </div>
  )
}

