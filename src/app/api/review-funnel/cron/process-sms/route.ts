import { NextRequest, NextResponse } from "next/server"
import { and, asc, eq, lte, sql } from "drizzle-orm"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfPendingSms } from "@/lib/review-funnel/db/schema"
import { sendReviewRequest } from "@/lib/review-funnel/services/sms"

export const dynamic = "force-dynamic"

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

  const now = new Date()

  const queuedRows = await rfDb
    .select({
      id: rfPendingSms.id,
      reviewRequestId: rfPendingSms.reviewRequestId,
      attempts: rfPendingSms.attempts,
    })
    .from(rfPendingSms)
    .where(
      and(
        eq(rfPendingSms.status, "queued"),
        lte(rfPendingSms.sendAfter, now),
        sql`${rfPendingSms.attempts} < 3`,
      ),
    )
    .orderBy(asc(rfPendingSms.sendAfter))
    .limit(50)

  let sent = 0
  let skipped = 0
  let failed = 0
  let rescheduled = 0

  for (const row of queuedRows) {
    try {
      const result = await sendReviewRequest(row.reviewRequestId)

      switch (result.status) {
        case "sent": {
          sent += 1

          await rfDb
            .update(rfPendingSms)
            .set({
              status: "sent",
              lastError: null,
            })
            .where(eq(rfPendingSms.id, row.id))
          break
        }

        case "quiet_hours": {
          rescheduled += 1

          await rfDb
            .update(rfPendingSms)
            .set({
              status: "queued",
              sendAfter: result.sendAfter,
              lastError: null,
            })
            .where(eq(rfPendingSms.id, row.id))
          break
        }

        case "opted_out":
        case "no_phone": {
          skipped += 1

          await rfDb
            .update(rfPendingSms)
            .set({
              status: "skipped",
              lastError: null,
            })
            .where(eq(rfPendingSms.id, row.id))
          break
        }

        case "limit_reached": {
          await rfDb
            .update(rfPendingSms)
            .set({
              status: "limit_reached",
              lastError: null,
            })
            .where(eq(rfPendingSms.id, row.id))
          break
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown SMS processing failure"
      const nextAttempts = row.attempts + 1

      await rfDb
        .update(rfPendingSms)
        .set({
          attempts: sql`${rfPendingSms.attempts} + 1`,
          lastError: errorMessage,
          ...(nextAttempts >= 3 ? { status: "failed" } : {}),
        })
        .where(eq(rfPendingSms.id, row.id))

      if (nextAttempts >= 3) {
        failed += 1
      }
    }
  }

  return NextResponse.json({
    processed: queuedRows.length,
    sent,
    skipped,
    failed,
    rescheduled,
  })
}
