"use client"

import Link from "next/link"
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"

type ServiceType = "cadence" | "review_funnel" | string
type ServiceStatus = "active" | "paused" | "cancelled" | string

interface CadenceCallRow {
  id?: string
  createdAt?: string
  startedAt?: string
  date?: string
  durationSeconds?: number | null
  duration?: number | null
  durationMs?: number | null
  outcome?: string | null
  status?: string | null
}

interface ServiceUsage {
  type: "cadence" | "review_funnel"
  callCount?: number
  smsCount?: number
  month?: string
  recentCalls?: CadenceCallRow[]
  error?: string
}

interface ClientServiceRecord {
  id: string
  serviceType: ServiceType
  status: ServiceStatus
  cadenceTenantId: string | null
  rfTenantId: string | null
  provisionedAt: string | null
  usage: ServiceUsage | null
}

interface ClientRecord {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string | null
  notes: string | null
  isActive: boolean
  createdAt: string
  services: ClientServiceRecord[]
}

interface ClientDetailResponse {
  client: ClientRecord
}

interface AdminClientDetailClientProps {
  clientId: string
}

interface EditFormState {
  businessName: string
  contactName: string
  email: string
  phone: string
  notes: string
}

const EMPTY_EDIT_FORM: EditFormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  notes: "",
}

function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "-"
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) {
    return "-"
  }

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

function serviceLabel(serviceType: ServiceType): string {
  if (serviceType === "cadence") {
    return "Cadence"
  }

  if (serviceType === "review_funnel") {
    return "Review Funnel"
  }

  return serviceType
}

function statusBadgeClass(status: ServiceStatus): string {
  if (status === "active") {
    return "border border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
  }

  if (status === "paused") {
    return "border border-amber-400/40 bg-amber-500/15 text-amber-100"
  }

  if (status === "cancelled") {
    return "border border-zinc-500/40 bg-zinc-500/15 text-zinc-300"
  }

  return "border border-zinc-500/40 bg-zinc-500/15 text-zinc-300"
}

function cadenceDurationLabel(call: CadenceCallRow): string {
  const secondsFromDurationSeconds = typeof call.durationSeconds === "number" ? call.durationSeconds : null
  const secondsFromDuration = typeof call.duration === "number" ? call.duration : null
  const secondsFromDurationMs = typeof call.durationMs === "number" ? Math.round(call.durationMs / 1000) : null
  const seconds = secondsFromDurationSeconds ?? secondsFromDuration ?? secondsFromDurationMs

  if (!seconds || seconds <= 0) {
    return "-"
  }

  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60

  if (remainder === 0) {
    return `${minutes}m`
  }

  return `${minutes}m ${remainder}s`
}

function cadenceCallDate(call: CadenceCallRow): string {
  return call.createdAt ?? call.startedAt ?? call.date ?? ""
}

function cadenceCallOutcome(call: CadenceCallRow): string {
  const raw = call.outcome ?? call.status

  if (!raw) {
    return "-"
  }

  return raw
    .replaceAll("_", " ")
    .split(" ")
    .map((part) => (part ? `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}` : part))
    .join(" ")
}

export default function AdminClientDetailClient({ clientId }: AdminClientDetailClientProps) {
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false)

  const [client, setClient] = useState<ClientRecord | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<EditFormState>(EMPTY_EDIT_FORM)
  const [isSavingClient, setIsSavingClient] = useState(false)
  const [saveClientError, setSaveClientError] = useState<string | null>(null)

  const [serviceTypeToAdd, setServiceTypeToAdd] = useState<"cadence" | "review_funnel">("cadence")
  const [cadenceAccountId, setCadenceAccountId] = useState("")
  const [isAddingService, setIsAddingService] = useState(false)
  const [serviceActionError, setServiceActionError] = useState<string | null>(null)
  const [serviceSuccessMessage, setServiceSuccessMessage] = useState<string | null>(null)

  const loadClient = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: "GET",
      })

      if (response.status === 401) {
        setAuthStatus("unauthenticated")
        setClient(null)
        return
      }

      const payload = (await response.json().catch(() => null)) as (ClientDetailResponse & { error?: string }) | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not load client")
      }

      if (!payload?.client) {
        throw new Error("Client record not found")
      }

      setAuthStatus("authenticated")
      setClient(payload.client)
      setEditForm({
        businessName: payload.client.businessName,
        contactName: payload.client.contactName,
        email: payload.client.email,
        phone: payload.client.phone ?? "",
        notes: payload.client.notes ?? "",
      })
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load client")
    } finally {
      setIsLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    void loadClient()
  }, [loadClient])

  const cadenceService = useMemo(() => {
    if (!client) {
      return null
    }

    return client.services.find((service) => service.serviceType === "cadence" && service.status !== "cancelled") ?? null
  }, [client])

  const reviewFunnelService = useMemo(() => {
    if (!client) {
      return null
    }

    return (
      client.services.find((service) => service.serviceType === "review_funnel" && service.status !== "cancelled") ??
      null
    )
  }, [client])

  const cadenceRecentCalls = useMemo(() => {
    if (!cadenceService?.usage || cadenceService.usage.type !== "cadence") {
      return []
    }

    return Array.isArray(cadenceService.usage.recentCalls) ? cadenceService.usage.recentCalls : []
  }, [cadenceService])

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!password.trim()) {
      setAuthError("Enter your admin password.")
      return
    }

    setIsSubmittingLogin(true)
    setAuthError(null)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret: password }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Incorrect password")
      }

      setPassword("")
      await loadClient()
    } catch (loginError) {
      setAuthError(loginError instanceof Error ? loginError.message : "Could not sign in")
    } finally {
      setIsSubmittingLogin(false)
    }
  }

  async function handleSaveClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!client) {
      return
    }

    setIsSavingClient(true)
    setSaveClientError(null)

    try {
      const response = await fetch(`/api/admin/clients/${client.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: editForm.businessName,
          contactName: editForm.contactName,
          email: editForm.email,
          phone: editForm.phone.trim() || null,
          notes: editForm.notes.trim() || null,
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not save client")
      }

      setIsEditing(false)
      await loadClient()
    } catch (saveError) {
      setSaveClientError(saveError instanceof Error ? saveError.message : "Could not save client")
    } finally {
      setIsSavingClient(false)
    }
  }

  async function handleAddService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!client) {
      return
    }

    setIsAddingService(true)
    setServiceActionError(null)
    setServiceSuccessMessage(null)

    try {
      const body: {
        serviceType: "cadence" | "review_funnel"
        cadenceTenantId?: string
      } = {
        serviceType: serviceTypeToAdd,
      }

      if (serviceTypeToAdd === "cadence") {
        if (!cadenceAccountId.trim()) {
          throw new Error("Enter the Cadence account ID before adding this service.")
        }

        body.cadenceTenantId = cadenceAccountId.trim()
      }

      const response = await fetch(`/api/admin/clients/${client.id}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not add service")
      }

      setCadenceAccountId("")
      setServiceSuccessMessage(`Service added. Welcome email sent to ${client.email}.`)
      await loadClient()
    } catch (addError) {
      setServiceActionError(addError instanceof Error ? addError.message : "Could not add service")
    } finally {
      setIsAddingService(false)
    }
  }

  async function handleServiceStatusChange(serviceType: ServiceType, action: "pause" | "resume") {
    if (!client) {
      return
    }

    setServiceActionError(null)
    setServiceSuccessMessage(null)

    try {
      const response = await fetch(`/api/admin/clients/${client.id}/services`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceType, action }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || `Could not ${action} service`)
      }

      await loadClient()
    } catch (serviceError) {
      setServiceActionError(serviceError instanceof Error ? serviceError.message : "Could not update service")
    }
  }

  async function handleCancelService(serviceType: ServiceType) {
    if (!client) {
      return
    }

    setServiceActionError(null)
    setServiceSuccessMessage(null)

    try {
      const response = await fetch(`/api/admin/clients/${client.id}/services`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceType }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not cancel service")
      }

      await loadClient()
    } catch (serviceError) {
      setServiceActionError(serviceError instanceof Error ? serviceError.message : "Could not cancel service")
    }
  }

  if (authStatus === "checking") {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#12121A] p-8 text-[#A1A1AA]">
          Checking admin access...
        </div>
      </main>
    )
  }

  if (authStatus === "unauthenticated") {
    return (
      <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#12121A] p-8">
          <h1 className="text-2xl font-semibold text-white">Admin Sign In</h1>
          <p className="mt-2 text-sm text-[#A1A1AA]">Enter the admin password to view this client.</p>

          <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm text-[#D4D4D8]">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-3 text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
                placeholder="Enter password"
              />
            </div>

            {authError ? <p className="text-sm text-red-300">{authError}</p> : null}

            <button
              type="submit"
              disabled={isSubmittingLogin}
              className="w-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmittingLogin ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href="/admin/clients"
              className="inline-flex items-center text-sm text-[#C4B5FD] transition hover:text-white"
            >
              ← Back to clients
            </Link>
            <h1 className="mt-3 text-3xl font-semibold text-white">{client?.businessName || "Client"}</h1>
            <p className="mt-2 text-sm text-[#A1A1AA]">
              {client?.contactName || "-"} · {client?.email || "-"} · {client?.phone || "No phone on file"}
            </p>
          </div>

          {client ? (
            <button
              type="button"
              onClick={() => {
                setIsEditing((prev) => !prev)
                setSaveClientError(null)
              }}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/35"
            >
              {isEditing ? "Close Edit" : "Edit Client"}
            </button>
          ) : null}
        </div>

        {error ? <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div> : null}

        {isLoading ? (
          <div className="rounded-2xl border border-white/8 bg-[#12121A] p-6 text-sm text-[#A1A1AA]">Loading client details...</div>
        ) : null}

        {client && isEditing ? (
          <section className="bg-[#12121A] border border-white/8 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white">Edit Client Info</h2>

            <form className="mt-4 space-y-4" onSubmit={handleSaveClient}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Business Name</span>
                  <input
                    required
                    value={editForm.businessName}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, businessName: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Contact Name</span>
                  <input
                    required
                    value={editForm.contactName}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, contactName: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Email</span>
                  <input
                    required
                    type="email"
                    value={editForm.email}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Phone</span>
                  <input
                    value={editForm.phone}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label>
                <span className="mb-2 block text-sm text-[#D4D4D8]">Notes</span>
                <textarea
                  rows={3}
                  value={editForm.notes}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, notes: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                />
              </label>

              {saveClientError ? <p className="text-sm text-red-300">{saveClientError}</p> : null}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingClient}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingClient ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        ) : null}

        {client ? (
          <section className="bg-[#12121A] border border-white/8 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">Services</h2>
              <p className="text-sm text-[#A1A1AA]">Manage active services for this client.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {client.services.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4 text-sm text-[#A1A1AA]">No services yet.</div>
              ) : (
                client.services.map((service) => {
                  const isCadence = service.serviceType === "cadence"
                  const isPaused = service.status === "paused"
                  const canPause = service.status === "active"
                  const canResume = service.status === "paused"
                  const callCount = isCadence && service.usage?.type === "cadence" ? service.usage.callCount ?? 0 : null
                  const textCount =
                    service.serviceType === "review_funnel" && service.usage?.type === "review_funnel"
                      ? service.usage.smsCount ?? 0
                      : null

                  return (
                    <article key={service.id} className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{serviceLabel(service.serviceType)}</h3>
                          <p className="mt-1 text-xs text-[#A1A1AA]">Added {formatDate(service.provisionedAt)}</p>
                        </div>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(service.status)}`}>
                          {service.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-[#D4D4D8]">
                        {isCadence ? (
                          <p>
                            Calls this month: <span className="font-semibold text-white">{callCount ?? 0}</span>
                          </p>
                        ) : (
                          <p>
                            Text messages this month: <span className="font-semibold text-white">{textCount ?? 0}</span>
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={!canPause && !canResume}
                          onClick={() =>
                            handleServiceStatusChange(service.serviceType, canPause ? "pause" : "resume")
                          }
                          className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {canPause ? "Pause" : canResume ? "Resume" : isPaused ? "Paused" : "Unavailable"}
                        </button>

                        <button
                          type="button"
                          disabled={service.status === "cancelled"}
                          onClick={() => handleCancelService(service.serviceType)}
                          className="rounded-full border border-red-400/40 px-4 py-2 text-xs font-semibold text-red-200 transition hover:border-red-300/60 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </article>
                  )
                })
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
              <h3 className="text-base font-semibold text-white">Add Service</h3>
              <p className="mt-1 text-sm text-[#A1A1AA]">
                Pick a service and we will send a welcome email after setup is complete.
              </p>

              <form className="mt-4 space-y-4" onSubmit={handleAddService}>
                <label className="block">
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Service Type</span>
                  <select
                    value={serviceTypeToAdd}
                    onChange={(event) => setServiceTypeToAdd(event.target.value as "cadence" | "review_funnel")}
                    className="w-full rounded-xl border border-white/10 bg-[#12121A] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                  >
                    <option value="cadence">Cadence</option>
                    <option value="review_funnel">Review Funnel</option>
                  </select>
                </label>

                {serviceTypeToAdd === "cadence" ? (
                  <label className="block">
                    <span className="mb-2 block text-sm text-[#D4D4D8]">Cadence Account ID</span>
                    <input
                      value={cadenceAccountId}
                      onChange={(event) => setCadenceAccountId(event.target.value)}
                      placeholder="Paste the Cadence account ID"
                      className="w-full rounded-xl border border-white/10 bg-[#12121A] px-4 py-2.5 text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
                    />
                  </label>
                ) : (
                  <p className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-sm text-blue-100">
                    Review Funnel account will be matched automatically using this client&#39;s email.
                  </p>
                )}

                {serviceActionError ? <p className="text-sm text-red-300">{serviceActionError}</p> : null}
                {serviceSuccessMessage ? <p className="text-sm text-emerald-300">{serviceSuccessMessage}</p> : null}

                <button
                  type="submit"
                  disabled={isAddingService}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAddingService ? "Adding Service..." : "Add Service"}
                </button>
              </form>
            </div>
          </section>
        ) : null}

        {client ? (
          <section className="bg-[#12121A] border border-white/8 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white">Usage</h2>
            <p className="mt-1 text-sm text-[#A1A1AA]">Recent activity for active services.</p>

            <div className="mt-4 space-y-4">
              {cadenceService?.status === "active" ? (
                <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                  <h3 className="text-base font-semibold text-white">Cadence Calls</h3>
                  {cadenceRecentCalls.length === 0 ? (
                    <p className="mt-3 text-sm text-[#A1A1AA]">No recent calls available yet.</p>
                  ) : (
                    <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                      <div className="grid grid-cols-3 gap-3 bg-white/[0.02] px-3 py-2 text-xs uppercase tracking-wide text-[#A1A1AA]">
                        <span>Date</span>
                        <span>Duration</span>
                        <span>Outcome</span>
                      </div>
                      <div className="divide-y divide-white/5">
                        {cadenceRecentCalls.map((call, index) => (
                          <div
                            key={call.id || `${cadenceCallDate(call)}-${index}`}
                            className="grid grid-cols-3 gap-3 px-3 py-2.5 text-sm text-[#D4D4D8]"
                          >
                            <span>{formatDateTime(cadenceCallDate(call))}</span>
                            <span>{cadenceDurationLabel(call)}</span>
                            <span>{cadenceCallOutcome(call)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {reviewFunnelService?.status === "active" ? (
                <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                  <h3 className="text-base font-semibold text-white">Review Funnel Text Messages</h3>
                  <p className="mt-2 text-sm text-[#D4D4D8]">
                    This month: <span className="font-semibold text-white">{reviewFunnelService.usage?.smsCount ?? 0}</span>
                  </p>
                </div>
              ) : null}

              {!cadenceService && !reviewFunnelService ? (
                <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4 text-sm text-[#A1A1AA]">
                  Add a service to start tracking usage.
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
