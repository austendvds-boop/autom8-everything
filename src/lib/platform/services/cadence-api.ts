import { platformConfig } from "../config"

export interface CadenceTenantConfig {
  id: string
  tenantId: string
  businessName: string
  greeting: string
  transferNumber: string | null
  smsEnabled: boolean
  bookingUrl: string | null
  ownerPhone: string | null
  timezone: string | null
  fallbackMode: string | null
  intakeMode: string | null
  smsNumber: string | null
  systemPrompt: string | null
  [key: string]: unknown
}

export interface CadenceTenantUpdate {
  businessName?: string
  greeting?: string
  transferNumber?: string | null
  smsEnabled?: boolean
  bookingUrl?: string | null
  ownerPhone?: string | null
  timezone?: string | null
  fallbackMode?: string | null
  intakeMode?: string | null
  smsNumber?: string | null
  systemPrompt?: string | null
}

export interface CadenceCall {
  id: string
  clientId: string
  streamSid: string | null
  callerPhone: string | null
  startedAt: string
  endedAt: string | null
  durationSeconds: number
  transcriptTurns: number
  summaryLines: string[]
  [key: string]: unknown
}

export interface CadenceCallsResponse {
  calls: CadenceCall[]
  pagination?: {
    limit: number
    offset: number
  }
  [key: string]: unknown
}

export interface CadenceUsageResponse {
  usage: {
    totalCalls: number
    totalDurationSeconds: number
    totalTranscriptTurns: number
    monthStart: string
  }
  plan: {
    name: string
    callLimit: number
    minuteLimit: number
  }
}

export interface TestCallResponse {
  ok: boolean
  callSid?: string
  error?: string
}

function getCadenceBaseUrl(): string {
  return platformConfig.CADENCE_API_URL.replace(/\/+$/, "")
}

function buildPortalHeaders(extraHeaders?: HeadersInit): Headers {
  const headers = new Headers(extraHeaders)
  headers.set("X-Portal-Secret", platformConfig.PORTAL_API_SECRET)

  return headers
}

async function cadenceRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getCadenceBaseUrl()}${path}`, {
    ...init,
    headers: buildPortalHeaders(init?.headers),
    cache: "no-store",
  })

  if (!response.ok) {
    const bodyText = await response.text()
    throw new Error(`Cadence API request failed (${response.status}): ${bodyText || response.statusText}`)
  }

  return (await response.json()) as T
}

export async function getCadenceTenantConfig(tenantId: string): Promise<CadenceTenantConfig> {
  const payload = await cadenceRequest<{ tenant: CadenceTenantConfig }>(
    `/api/portal/tenant/${encodeURIComponent(tenantId)}`,
    { method: "GET" },
  )

  return payload.tenant
}

export async function updateCadenceTenantConfig(
  tenantId: string,
  updates: Partial<CadenceTenantUpdate>,
): Promise<CadenceTenantConfig> {
  const payload = await cadenceRequest<{ ok: true; tenant: CadenceTenantConfig }>(
    `/api/portal/tenant/${encodeURIComponent(tenantId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    },
  )

  return payload.tenant
}

export async function getCadenceRecentCalls(
  tenantId: string,
  limit?: number,
  offset?: number,
): Promise<CadenceCallsResponse> {
  const params = new URLSearchParams()

  if (typeof limit === "number" && Number.isFinite(limit)) {
    params.set("limit", String(Math.max(1, Math.floor(limit))))
  }

  if (typeof offset === "number" && Number.isFinite(offset)) {
    params.set("offset", String(Math.max(0, Math.floor(offset))))
  }

  const query = params.toString()

  return cadenceRequest<CadenceCallsResponse>(
    `/api/portal/tenant/${encodeURIComponent(tenantId)}/calls${query ? `?${query}` : ""}`,
    { method: "GET" },
  )
}

export async function getCadenceUsage(tenantId: string): Promise<CadenceUsageResponse> {
  return cadenceRequest<CadenceUsageResponse>(
    `/api/portal/tenant/${encodeURIComponent(tenantId)}/usage`,
    { method: "GET" },
  )
}

export async function triggerCadenceTestCall(tenantId: string, toPhone: string): Promise<TestCallResponse> {
  return cadenceRequest<TestCallResponse>(
    `/api/portal/tenant/${encodeURIComponent(tenantId)}/test-call`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toPhone }),
    },
  )
}
