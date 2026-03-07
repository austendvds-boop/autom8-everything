"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type ServiceType = "cadence" | "review_funnel" | string
type ServiceStatus = "active" | "paused" | "cancelled" | string

interface ClientServiceSummary {
  serviceType: ServiceType
  status: ServiceStatus
  provisionedAt: string | null
}

interface ClientListItem {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string | null
  isActive: boolean
  createdAt: string
  services: ClientServiceSummary[]
}

interface ClientsResponse {
  clients: ClientListItem[]
}

interface NewClientFormState {
  businessName: string
  contactName: string
  email: string
  phone: string
  notes: string
}

const EMPTY_FORM: NewClientFormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  notes: "",
}

function formatDate(value: string): string {
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

function serviceLabel(serviceType: ServiceType): string {
  if (serviceType === "cadence") {
    return "Cadence"
  }

  if (serviceType === "review_funnel") {
    return "Review Funnel"
  }

  return serviceType
}

function serviceBadgeClass(serviceType: ServiceType): string {
  if (serviceType === "cadence") {
    return "border border-[#8B5CF6]/40 bg-[#8B5CF6]/20 text-[#DDD6FE]"
  }

  if (serviceType === "review_funnel") {
    return "border border-sky-400/40 bg-sky-500/15 text-sky-200"
  }

  return "border border-zinc-500/40 bg-zinc-500/15 text-zinc-200"
}

function statusDotClass(status: ServiceStatus): string {
  if (status === "active") {
    return "bg-emerald-400"
  }

  if (status === "paused") {
    return "bg-amber-400"
  }

  if (status === "cancelled") {
    return "bg-zinc-400"
  }

  return "bg-zinc-500"
}

export default function AdminClientsClient() {
  const router = useRouter()
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false)

  const [clients, setClients] = useState<ClientListItem[]>([])
  const [isLoadingClients, setIsLoadingClients] = useState(false)
  const [clientsError, setClientsError] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [isNewClientOpen, setIsNewClientOpen] = useState(false)
  const [newClientForm, setNewClientForm] = useState<NewClientFormState>(EMPTY_FORM)
  const [newClientError, setNewClientError] = useState<string | null>(null)
  const [isCreatingClient, setIsCreatingClient] = useState(false)

  async function loadClients() {
    setIsLoadingClients(true)
    setClientsError(null)

    try {
      const response = await fetch("/api/admin/clients", {
        method: "GET",
      })

      if (response.status === 401) {
        setAuthStatus("unauthenticated")
        setClients([])
        return
      }

      const payload = (await response.json().catch(() => null)) as (ClientsResponse & { error?: string }) | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not load clients")
      }

      setAuthStatus("authenticated")
      setClients(payload?.clients ?? [])
    } catch (loadError) {
      setClientsError(loadError instanceof Error ? loadError.message : "Could not load clients")
    } finally {
      setIsLoadingClients(false)
    }
  }

  useEffect(() => {
    void loadClients()
  }, [])

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return clients
    }

    return clients.filter((client) => {
      return (
        client.businessName.toLowerCase().includes(query) ||
        client.contactName.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
      )
    })
  }, [clients, search])

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
      await loadClients()
    } catch (loginError) {
      setAuthError(loginError instanceof Error ? loginError.message : "Could not sign in")
    } finally {
      setIsSubmittingLogin(false)
    }
  }

  async function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsCreatingClient(true)
    setNewClientError(null)

    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: newClientForm.businessName,
          contactName: newClientForm.contactName,
          email: newClientForm.email,
          phone: newClientForm.phone.trim() || undefined,
          notes: newClientForm.notes.trim() || undefined,
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || "Could not create client")
      }

      setIsNewClientOpen(false)
      setNewClientForm(EMPTY_FORM)
      await loadClients()
    } catch (createError) {
      setNewClientError(createError instanceof Error ? createError.message : "Could not create client")
    } finally {
      setIsCreatingClient(false)
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
          <p className="mt-2 text-sm text-[#A1A1AA]">Enter the admin password to open client management.</p>

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
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Admin Dashboard</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">Client Management</h1>
            <p className="mt-2 text-sm text-[#A1A1AA]">Search, add, and open client records.</p>
          </div>

          <button
            type="button"
            onClick={() => setIsNewClientOpen(true)}
            className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-95"
          >
            New Client
          </button>
        </header>

        <section className="bg-[#12121A] border border-white/8 rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <label className="w-full sm:max-w-sm">
              <span className="mb-2 block text-sm text-[#A1A1AA]">Search clients</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Business, contact, or email"
                className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-sm text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none"
              />
            </label>
          </div>

          {clientsError ? <p className="mb-4 text-sm text-red-300">{clientsError}</p> : null}

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="hidden grid-cols-[1.6fr_1.3fr_1.6fr_1.5fr_1fr] gap-3 bg-white/[0.02] px-4 py-3 text-xs font-medium uppercase tracking-wide text-[#A1A1AA] md:grid">
              <span>Business</span>
              <span>Contact</span>
              <span>Email</span>
              <span>Services</span>
              <span>Created</span>
            </div>

            <div className="divide-y divide-white/5">
              {isLoadingClients ? (
                <div className="px-4 py-6 text-sm text-[#A1A1AA]">Loading clients...</div>
              ) : filteredClients.length === 0 ? (
                <div className="px-4 py-6 text-sm text-[#A1A1AA]">No clients found.</div>
              ) : (
                filteredClients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => router.push(`/admin/clients/${client.id}`)}
                    className="grid w-full grid-cols-1 gap-2 px-4 py-4 text-left transition hover:bg-white/[0.02] md:grid-cols-[1.6fr_1.3fr_1.6fr_1.5fr_1fr] md:items-center"
                  >
                    <div>
                      <p className="font-medium text-white">{client.businessName}</p>
                      <p className="mt-1 text-xs text-[#71717A] md:hidden">Created {formatDate(client.createdAt)}</p>
                    </div>

                    <p className="text-sm text-[#D4D4D8]">{client.contactName}</p>
                    <p className="text-sm text-[#C4B5FD] break-all">{client.email}</p>

                    <div className="flex flex-wrap gap-2">
                      {client.services.length === 0 ? (
                        <span className="text-xs text-[#71717A]">No services</span>
                      ) : (
                        client.services.map((service) => (
                          <span
                            key={`${client.id}-${service.serviceType}`}
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${serviceBadgeClass(
                              service.serviceType,
                            )}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${statusDotClass(service.status)}`} />
                            {serviceLabel(service.serviceType)}
                          </span>
                        ))
                      )}
                    </div>

                    <p className="hidden text-sm text-[#A1A1AA] md:block">{formatDate(client.createdAt)}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {isNewClientOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl bg-[#12121A] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Add New Client</h2>
                <p className="mt-1 text-sm text-[#A1A1AA]">Create a client record before adding services.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsNewClientOpen(false)
                  setNewClientError(null)
                }}
                className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white transition hover:border-white/30"
              >
                Close
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleCreateClient}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Business Name</span>
                  <input
                    required
                    value={newClientForm.businessName}
                    onChange={(event) => setNewClientForm((prev) => ({ ...prev, businessName: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                    placeholder="Business name"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Contact Name</span>
                  <input
                    required
                    value={newClientForm.contactName}
                    onChange={(event) => setNewClientForm((prev) => ({ ...prev, contactName: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                    placeholder="Contact name"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Email</span>
                  <input
                    required
                    type="email"
                    value={newClientForm.email}
                    onChange={(event) => setNewClientForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                    placeholder="email@example.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[#D4D4D8]">Phone (optional)</span>
                  <input
                    value={newClientForm.phone}
                    onChange={(event) => setNewClientForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                    placeholder="(555) 555-5555"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-[#D4D4D8]">Notes (optional)</span>
                <textarea
                  rows={3}
                  value={newClientForm.notes}
                  onChange={(event) => setNewClientForm((prev) => ({ ...prev, notes: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#0A0A0F] px-4 py-2.5 text-white focus:border-[#8B5CF6] focus:outline-none"
                  placeholder="Important context for this client"
                />
              </label>

              {newClientError ? <p className="text-sm text-red-300">{newClientError}</p> : null}

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewClientOpen(false)
                    setNewClientError(null)
                  }}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingClient}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCreatingClient ? "Creating..." : "Create Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}
