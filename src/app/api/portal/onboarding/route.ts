import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8Clients, a8ClientServices } from "@/lib/platform/db/schema"
import { provisionCadenceTenant } from "@/lib/platform/services/provisioning"

const onboardingSchema = z.object({
  businessName: z.string().trim().min(1).max(255),
  businessDescription: z.string().trim().min(1),
  hours: z.string().trim().min(1),
  faqs: z.string().trim().min(1),
  transferNumber: z.string().trim().regex(/^\+1\d{10}$/),
  areaCode: z.string().trim().regex(/^\d{3}$/),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getSavedString(metadata: Record<string, unknown>, key: string): string {
  const value = metadata[key]
  return typeof value === "string" ? value : ""
}

export async function GET(request: NextRequest) {
  const authResult = await requirePortalAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const service = await platformDb.query.a8ClientServices.findFirst({
    where: and(eq(a8ClientServices.clientId, authResult.client.id), eq(a8ClientServices.serviceType, "cadence")),
    columns: {
      cadenceTenantId: true,
      metadata: true,
    },
  })

  const metadata = service?.metadata ?? {}

  return NextResponse.json({
    onboardingComplete: metadata.onboardingComplete === true,
    cadenceTenantId: service?.cadenceTenantId ?? null,
    savedData: {
      businessName: authResult.client.businessName ?? "",
      businessDescription: getSavedString(metadata, "businessDescription"),
      hours: getSavedString(metadata, "hours"),
      faqs: getSavedString(metadata, "faqs"),
      transferNumber: getSavedString(metadata, "transferNumber"),
      areaCode: getSavedString(metadata, "areaCode"),
    },
  })
}

export async function POST(request: NextRequest) {
  const authResult = await requirePortalAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const service = await platformDb.query.a8ClientServices.findFirst({
    where: and(eq(a8ClientServices.clientId, authResult.client.id), eq(a8ClientServices.serviceType, "cadence")),
  })

  if (!service) {
    return NextResponse.json({ error: "Cadence is not active on this account." }, { status: 404 })
  }

  if ((service.metadata ?? {}).onboardingComplete === true && service.cadenceTenantId) {
    return NextResponse.json({ error: "Cadence onboarding is already complete." }, { status: 409 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = onboardingSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check your details and try again.",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const payload = parsed.data
  const now = new Date()

  await platformDb
    .update(a8Clients)
    .set({
      businessName: payload.businessName,
      contactName: payload.businessName,
      updatedAt: now,
    })
    .where(eq(a8Clients.id, authResult.client.id))

  const { clientId: cadenceTenantId } = await provisionCadenceTenant({
    businessName: payload.businessName,
    businessDescription: payload.businessDescription,
    hours: payload.hours,
    faqs: payload.faqs,
    transferNumber: payload.transferNumber,
    email: authResult.client.email,
    phone: authResult.client.phone || undefined,
    areaCode: payload.areaCode,
  })

  await platformDb
    .update(a8ClientServices)
    .set({
      cadenceTenantId,
      provisionedAt: now,
      metadata: {
        ...(service.metadata ?? {}),
        onboardingComplete: true,
        businessDescription: payload.businessDescription,
        hours: payload.hours,
        faqs: payload.faqs,
        transferNumber: payload.transferNumber,
        areaCode: payload.areaCode,
      },
      updatedAt: now,
    })
    .where(eq(a8ClientServices.id, service.id))

  return NextResponse.json({ ok: true, cadenceTenantId })
}
