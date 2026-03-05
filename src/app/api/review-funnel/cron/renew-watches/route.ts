import { NextRequest, NextResponse } from "next/server"
import { and, eq, lte } from "drizzle-orm"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfCalendarWatches } from "@/lib/review-funnel/db/schema"
import { renewWatch } from "@/lib/review-funnel/services/calendar"

const RENEW_THRESHOLD_MS = 2 * 24 * 60 * 60 * 1000

function isAuthorizedCronRequest(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim()
  if (!cronSecret) {
    return false
  }

  const authorizationHeader = request.headers.get("authorization")?.trim()
  const explicitCronHeader = request.headers.get("x-cron-secret")?.trim()

  return authorizationHeader === `Bearer ${cronSecret}` || explicitCronHeader === cronSecret
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const renewalCutoff = new Date(Date.now() + RENEW_THRESHOLD_MS)

  const expiringWatches = await rfDb.query.rfCalendarWatches.findMany({
    where: and(
      eq(rfCalendarWatches.isActive, true),
      lte(rfCalendarWatches.expiration, renewalCutoff),
    ),
  })

  let renewed = 0
  let failed = 0
  const failures: Array<{ watchId: string; error: string }> = []

  for (const watch of expiringWatches) {
    try {
      await renewWatch(watch.id)
      renewed += 1
    } catch (error) {
      failed += 1
      failures.push({
        watchId: watch.id,
        error: error instanceof Error ? error.message : "Unknown renewal failure",
      })
    }
  }

  return NextResponse.json({
    checked: expiringWatches.length,
    renewed,
    failed,
    failures,
  })
}
