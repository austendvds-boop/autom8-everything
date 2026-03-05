import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfLocations } from "@/lib/review-funnel/db/schema"

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const locationPatchSchema = z
  .object({
    name: z.string().trim().min(1).max(255).optional(),
    googlePlaceId: z.string().trim().max(255).optional().nullable(),
    gmbReviewUrl: z.string().trim().url().max(2000).optional().nullable(),
    calendarId: z.string().trim().max(255).optional().nullable(),
    smsSenderNumber: z.string().trim().max(20).optional().nullable(),
    isActive: z.boolean().optional(),
  })
  .strict()

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function normalizeNullableString(value: string | null | undefined): string | null | undefined {
  if (value === undefined) {
    return undefined
  }

  if (value === null) {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)
  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid location id" }, { status: 400 })
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedPayload = locationPatchSchema.safeParse(rawBody)
  if (!parsedPayload.success) {
    return NextResponse.json(
      {
        error: "Invalid location payload",
        details: parsedPayload.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const payload = parsedPayload.data
  const hasOwn = (key: keyof typeof payload) => Object.prototype.hasOwnProperty.call(payload, key)

  const updateData: {
    name?: string
    googlePlaceId?: string | null
    gmbReviewUrl?: string | null
    calendarId?: string | null
    smsSenderNumber?: string | null
    isActive?: boolean
  } = {}

  if (hasOwn("name") && payload.name !== undefined) {
    updateData.name = payload.name
  }

  if (hasOwn("googlePlaceId")) {
    updateData.googlePlaceId = normalizeNullableString(payload.googlePlaceId)
  }

  if (hasOwn("gmbReviewUrl")) {
    updateData.gmbReviewUrl = normalizeNullableString(payload.gmbReviewUrl)
  }

  if (hasOwn("calendarId")) {
    updateData.calendarId = normalizeNullableString(payload.calendarId)
  }

  if (hasOwn("smsSenderNumber")) {
    updateData.smsSenderNumber = normalizeNullableString(payload.smsSenderNumber)
  }

  if (hasOwn("isActive") && payload.isActive !== undefined) {
    updateData.isActive = payload.isActive
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No location fields provided" }, { status: 400 })
  }

  const [updated] = await rfDb
    .update(rfLocations)
    .set(updateData)
    .where(and(eq(rfLocations.id, parsedParams.data.id), eq(rfLocations.tenantId, authResult.tenant.id)))
    .returning({
      id: rfLocations.id,
      name: rfLocations.name,
      googlePlaceId: rfLocations.googlePlaceId,
      gmbReviewUrl: rfLocations.gmbReviewUrl,
      calendarId: rfLocations.calendarId,
      smsSenderNumber: rfLocations.smsSenderNumber,
      isActive: rfLocations.isActive,
      createdAt: rfLocations.createdAt,
    })

  if (!updated) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 })
  }

  return NextResponse.json({
    location: {
      ...updated,
      createdAt: updated.createdAt.toISOString(),
    },
  })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const parsedParams = paramsSchema.safeParse(await params)
  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid location id" }, { status: 400 })
  }

  const deletedRows = await rfDb
    .delete(rfLocations)
    .where(and(eq(rfLocations.id, parsedParams.data.id), eq(rfLocations.tenantId, authResult.tenant.id)))
    .returning({
      id: rfLocations.id,
    })

  if (deletedRows.length === 0) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    id: deletedRows[0].id,
  })
}
