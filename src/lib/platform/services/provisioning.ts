import { and, eq, sql } from "drizzle-orm"
import { platformDb } from "../db/client"
import { rfTenants } from "../../review-funnel/db/schema"
import { a8ClientServices, a8Clients, type A8ClientService } from "../db/schema"
import { platformConfig } from "../config"

type ServiceType = "cadence" | "review_funnel"

function toMetadataRecord(metadata?: Record<string, unknown>): Record<string, unknown> {
  if (!metadata || typeof metadata !== "object") {
    return {}
  }

  return metadata
}

function getStringMetadataField(metadata: Record<string, unknown>, key: string): string | null {
  const value = metadata[key]

  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

async function resolveRfTenantId(clientId: string, metadata: Record<string, unknown>): Promise<string> {
  const manualTenantId = getStringMetadataField(metadata, "rfTenantId")
  if (manualTenantId) {
    return manualTenantId
  }

  const client = await platformDb.query.a8Clients.findFirst({
    where: eq(a8Clients.id, clientId),
    columns: {
      email: true,
    },
  })

  if (!client?.email) {
    throw new Error("Client not found")
  }

  const normalizedEmail = client.email.trim().toLowerCase()

  const rfTenant = await platformDb.query.rfTenants.findFirst({
    where: sql`lower(${rfTenants.ownerEmail}) = ${normalizedEmail}`,
    columns: {
      id: true,
    },
  })

  if (!rfTenant?.id) {
    throw new Error("No matching Review Funnel tenant found for this client email")
  }

  return rfTenant.id
}

async function buildServiceRecord(
  clientId: string,
  serviceType: ServiceType,
  metadata?: Record<string, unknown>,
): Promise<Pick<typeof a8ClientServices.$inferInsert, "clientId" | "serviceType" | "status" | "provisionedAt" | "pausedAt" | "cancelledAt" | "cadenceTenantId" | "rfTenantId" | "metadata" | "updatedAt">> {
  const normalizedMetadata = toMetadataRecord(metadata)
  const now = new Date()

  if (serviceType === "cadence") {
    const cadenceTenantId = getStringMetadataField(normalizedMetadata, "cadenceTenantId")

    if (!cadenceTenantId) {
      throw new Error("cadenceTenantId is required to provision Cadence")
    }

    return {
      clientId,
      serviceType,
      status: "active",
      provisionedAt: now,
      pausedAt: null,
      cancelledAt: null,
      cadenceTenantId,
      rfTenantId: null,
      metadata: normalizedMetadata,
      updatedAt: now,
    }
  }

  const rfTenantId = await resolveRfTenantId(clientId, normalizedMetadata)

  return {
    clientId,
    serviceType,
    status: "active",
    provisionedAt: now,
    pausedAt: null,
    cancelledAt: null,
    cadenceTenantId: null,
    rfTenantId,
    metadata: normalizedMetadata,
    updatedAt: now,
  }
}

export async function provisionService(
  clientId: string,
  serviceType: ServiceType,
  metadata?: Record<string, unknown>,
): Promise<A8ClientService> {
  const values = await buildServiceRecord(clientId, serviceType, metadata)

  const [service] = await platformDb
    .insert(a8ClientServices)
    .values(values)
    .onConflictDoUpdate({
      target: [a8ClientServices.clientId, a8ClientServices.serviceType],
      set: {
        status: "active",
        provisionedAt: values.provisionedAt,
        pausedAt: null,
        cancelledAt: null,
        cadenceTenantId: values.cadenceTenantId,
        rfTenantId: values.rfTenantId,
        metadata: values.metadata,
        updatedAt: values.updatedAt,
      },
    })
    .returning()

  if (!service) {
    throw new Error("Failed to provision service")
  }

  return service
}

export async function pauseService(clientId: string, serviceType: string): Promise<void> {
  await platformDb
    .update(a8ClientServices)
    .set({
      status: "paused",
      pausedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(a8ClientServices.clientId, clientId), eq(a8ClientServices.serviceType, serviceType)))
}

export async function cancelService(clientId: string, serviceType: string): Promise<void> {
  await platformDb
    .update(a8ClientServices)
    .set({
      status: "cancelled",
      cancelledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(a8ClientServices.clientId, clientId), eq(a8ClientServices.serviceType, serviceType)))
}

export async function resumeService(clientId: string, serviceType: string): Promise<void> {
  await platformDb
    .update(a8ClientServices)
    .set({
      status: "active",
      pausedAt: null,
      updatedAt: new Date(),
    })
    .where(and(eq(a8ClientServices.clientId, clientId), eq(a8ClientServices.serviceType, serviceType)))
}

interface CadenceOnboardResponse {
  result?: {
    clientId?: string
    phoneNumber?: string
  }
}

export async function provisionCadenceTenant(params: {
  businessName: string
  email: string
  phone?: string
  areaCode?: string
}): Promise<{ clientId: string; phoneNumber: string }> {
  const cadenceApiUrl = platformConfig.CADENCE_API_URL.replace(/\/+$/, "")

  const response = await fetch(`${cadenceApiUrl}/api/onboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Portal-Secret": platformConfig.PORTAL_API_SECRET,
    },
    body: JSON.stringify({
      businessName: params.businessName,
      businessType: "service",
      phone: params.phone || "",
      email: params.email,
      website: "",
      hours: "Mon-Fri 9-5",
      services: params.businessName,
      greeting: "",
      transferNumber: null,
      faqs: "",
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const bodyText = await response.text()
    throw new Error(`Cadence onboarding failed (${response.status}): ${bodyText || response.statusText}`)
  }

  const payload = (await response.json()) as CadenceOnboardResponse
  const clientId = payload.result?.clientId?.trim()
  const phoneNumber = payload.result?.phoneNumber?.trim()

  if (!clientId || !phoneNumber) {
    throw new Error("Cadence onboarding response missing clientId or phoneNumber")
  }

  return { clientId, phoneNumber }
}
