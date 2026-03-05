import { and, desc, eq, gte, lte, sql, type SQL } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfReviewRequests } from "@/lib/review-funnel/db/schema"

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(5).max(100).default(20),
  dateFrom: z.string().trim().optional(),
  dateTo: z.string().trim().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  smsStatus: z.string().trim().max(20).optional(),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function normalizeParam(value: string | null): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function parseDate(value: string | undefined, mode: "start" | "end"): Date | null {
  if (!value) {
    return null
  }

  const suffix = mode === "start" ? "T00:00:00.000Z" : "T23:59:59.999Z"
  const parsed = new Date(`${value}${suffix}`)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed
}

function toInt(value: number | string | null | undefined): number {
  if (typeof value === "number") {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

function buildWhereClause(filters: {
  tenantId: string
  dateFrom: Date | null
  dateTo: Date | null
  rating?: number
  smsStatus?: string
}): SQL<unknown> {
  const clauses: SQL<unknown>[] = [eq(rfReviewRequests.tenantId, filters.tenantId)]

  if (filters.dateFrom) {
    clauses.push(gte(rfReviewRequests.appointmentEnd, filters.dateFrom))
  }

  if (filters.dateTo) {
    clauses.push(lte(rfReviewRequests.appointmentEnd, filters.dateTo))
  }

  if (typeof filters.rating === "number") {
    clauses.push(eq(rfReviewRequests.rating, filters.rating))
  }

  if (filters.smsStatus) {
    clauses.push(eq(rfReviewRequests.smsStatus, filters.smsStatus))
  }

  if (clauses.length === 1) {
    return clauses[0]
  }

  return and(...clauses) as SQL<unknown>
}

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const searchParams = request.nextUrl.searchParams

  const parsedQuery = querySchema.safeParse({
    page: normalizeParam(searchParams.get("page")),
    pageSize: normalizeParam(searchParams.get("pageSize")),
    dateFrom: normalizeParam(searchParams.get("dateFrom")),
    dateTo: normalizeParam(searchParams.get("dateTo")),
    rating: normalizeParam(searchParams.get("rating")),
    smsStatus: normalizeParam(searchParams.get("smsStatus")),
  })

  if (!parsedQuery.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters",
        details: parsedQuery.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const dateFrom = parseDate(parsedQuery.data.dateFrom, "start")
  const dateTo = parseDate(parsedQuery.data.dateTo, "end")

  if (parsedQuery.data.dateFrom && !dateFrom) {
    return NextResponse.json({ error: "Invalid dateFrom parameter" }, { status: 400 })
  }

  if (parsedQuery.data.dateTo && !dateTo) {
    return NextResponse.json({ error: "Invalid dateTo parameter" }, { status: 400 })
  }

  if (dateFrom && dateTo && dateFrom.getTime() > dateTo.getTime()) {
    return NextResponse.json({ error: "dateFrom cannot be after dateTo" }, { status: 400 })
  }

  const whereClause = buildWhereClause({
    tenantId: authResult.tenant.id,
    dateFrom,
    dateTo,
    rating: parsedQuery.data.rating,
    smsStatus: parsedQuery.data.smsStatus,
  })

  const [countResult] = await rfDb
    .select({
      count: sql<number>`count(*)`,
    })
    .from(rfReviewRequests)
    .where(whereClause)

  const totalItems = toInt(countResult?.count)
  const page = parsedQuery.data.page
  const pageSize = parsedQuery.data.pageSize
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const rows = await rfDb.query.rfReviewRequests.findMany({
    where: whereClause,
    columns: {
      id: true,
      customerName: true,
      appointmentEnd: true,
      createdAt: true,
      rating: true,
      smsStatus: true,
      pageOpenedAt: true,
    },
    orderBy: [desc(rfReviewRequests.appointmentEnd), desc(rfReviewRequests.createdAt)],
    limit: pageSize,
    offset,
  })

  return NextResponse.json({
    items: rows.map((row) => ({
      id: row.id,
      customerName: row.customerName,
      appointmentEnd: row.appointmentEnd.toISOString(),
      createdAt: row.createdAt.toISOString(),
      rating: row.rating,
      smsStatus: row.smsStatus,
      pageOpenedAt: row.pageOpenedAt?.toISOString() ?? null,
    })),
    pagination: {
      page: safePage,
      pageSize,
      totalItems,
      totalPages,
    },
    filters: {
      dateFrom: parsedQuery.data.dateFrom ?? null,
      dateTo: parsedQuery.data.dateTo ?? null,
      rating: parsedQuery.data.rating ?? null,
      smsStatus: parsedQuery.data.smsStatus ?? null,
    },
  })
}
