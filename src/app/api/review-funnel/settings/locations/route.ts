import { desc, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfLocations } from "@/lib/review-funnel/db/schema"

const locationCreateSchema = z
  .object({
    name: z.string().trim().min(1).max(255),
    googlePlaceId: z.string().trim().max(255).optional(),
    gmbReviewUrl: z.string().trim().url().max(2000).optional(),
    calendarId: z.string().trim().max(255).optional(),
    smsSenderNumber: z.string().trim().max(20).optional(),
    isActive: z.boolean().optional(),
  })
  .strict()

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function normalizeString(value: string | undefined): string | null {
  if (value === undefined) {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const locations = await rfDb.query.rfLocations.findMany({
    where: eq(rfLocations.tenantId, authResult.tenant.id),
    columns: {
      id: true,
      name: true,
      googlePlaceId: true,
      gmbReviewUrl: true,
      calendarId: true,
      smsSenderNumber: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: [desc(rfLocations.createdAt)],
  })

  return NextResponse.json({
    items: locations.map((location) => ({
      ...location,
      createdAt: location.createdAt.toISOString(),
    })),
    totalItems: locations.length,
  })
}

export async function POST(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  if (authResult.tenant.plan === "starter") {
    return NextResponse.json(
      { error: "Multiple locations are available on Growth and Pro plans." },
      { status: 403 },
    )
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = locationCreateSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid location payload",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const payload = parsed.data

  const [created] = await rfDb
    .insert(rfLocations)
    .values({
      tenantId: authResult.tenant.id,
      name: payload.name,
      googlePlaceId: normalizeString(payload.googlePlaceId),
      gmbReviewUrl: normalizeString(payload.gmbReviewUrl),
      calendarId: normalizeString(payload.calendarId),
      smsSenderNumber: normalizeString(payload.smsSenderNumber),
      isActive: payload.isActive ?? true,
    })
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

  return NextResponse.json(
    {
      location: {
        ...created,
        createdAt: created.createdAt.toISOString(),
      },
    },
    { status: 201 },
  )
}
