import { NextRequest, NextResponse } from "next/server"
import { and, asc, eq, gt, isNull, lte, sql } from "drizzle-orm"
import twilio from "twilio"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfPendingSms, rfReviewRequests, rfTenants } from "@/lib/review-funnel/db/schema"
import { sendReviewRequestEmail } from "@/lib/review-funnel/services/email-review-request"
import { sendNudge, sendReviewRequest } from "@/lib/review-funnel/services/sms"

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

function isTwilioError(error: unknown): boolean {
  return error instanceof twilio.RestException
}

async function markPendingSmsFailure({
  pendingSmsId,
  reviewRequestId,
  attempts,
  errorMessage,
}: {
  pendingSmsId: string
  reviewRequestId: string
  attempts: number
  errorMessage: string
}): Promise<boolean> {
  const nextAttempts = attempts + 1

  await rfDb
    .update(rfPendingSms)
    .set({
      attempts: sql`${rfPendingSms.attempts} + 1`,
      lastError: errorMessage,
      ...(nextAttempts >= 3 ? { status: "failed" } : {}),
    })
    .where(eq(rfPendingSms.id, pendingSmsId))

  if (nextAttempts >= 3) {
    await rfDb
      .update(rfReviewRequests)
      .set({
        smsStatus: "failed",
      })
      .where(eq(rfReviewRequests.id, reviewRequestId))

    return true
  }

  return false
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const nudgeCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const queuedRows = await rfDb
    .select({
      id: rfPendingSms.id,
      reviewRequestId: rfPendingSms.reviewRequestId,
      attempts: rfPendingSms.attempts,
      customerEmail: rfReviewRequests.customerEmail,
    })
    .from(rfPendingSms)
    .innerJoin(rfReviewRequests, eq(rfPendingSms.reviewRequestId, rfReviewRequests.id))
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
  let sentEmail = 0
  let nudgesSent = 0
  let nudgesSkipped = 0

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

      if (isTwilioError(error) && row.customerEmail?.trim()) {
        try {
          await sendReviewRequestEmail(row.reviewRequestId)

          await rfDb.transaction(async (tx) => {
            await tx
              .update(rfPendingSms)
              .set({
                attempts: sql`${rfPendingSms.attempts} + 1`,
                status: "sent_email",
                lastError: errorMessage,
              })
              .where(eq(rfPendingSms.id, row.id))

            await tx
              .update(rfReviewRequests)
              .set({
                smsStatus: "sent_email",
              })
              .where(eq(rfReviewRequests.id, row.reviewRequestId))
          })

          sentEmail += 1
          continue
        } catch (emailError) {
          const emailErrorMessage = emailError instanceof Error ? emailError.message : "Unknown email fallback failure"
          const failureRecorded = await markPendingSmsFailure({
            pendingSmsId: row.id,
            reviewRequestId: row.reviewRequestId,
            attempts: row.attempts,
            errorMessage: `${errorMessage} | Email fallback failed: ${emailErrorMessage}`,
          })

          if (failureRecorded) {
            failed += 1
          }

          continue
        }
      }

      const failureRecorded = await markPendingSmsFailure({
        pendingSmsId: row.id,
        reviewRequestId: row.reviewRequestId,
        attempts: row.attempts,
        errorMessage,
      })

      if (failureRecorded) {
        failed += 1
      }
    }
  }

  const nudgeRows = await rfDb
    .select({
      reviewRequestId: rfReviewRequests.id,
    })
    .from(rfReviewRequests)
    .innerJoin(rfTenants, eq(rfReviewRequests.tenantId, rfTenants.id))
    .where(
      and(
        lte(rfReviewRequests.smsSentAt, nudgeCutoff),
        isNull(rfReviewRequests.smsReplyRating),
        isNull(rfReviewRequests.nudgeSentAt),
        gt(rfReviewRequests.expiresAt, now),
        eq(rfReviewRequests.smsStatus, "sent"),
        eq(rfTenants.plan, "growth"),
        eq(rfTenants.followUpNudgeEnabled, true),
        eq(rfTenants.isActive, true),
      ),
    )
    .orderBy(asc(rfReviewRequests.smsSentAt))
    .limit(50)

  for (const row of nudgeRows) {
    try {
      const result = await sendNudge(row.reviewRequestId)

      if (result.status === "sent") {
        nudgesSent += 1
      } else {
        nudgesSkipped += 1
      }
    } catch {
      nudgesSkipped += 1
    }
  }

  return NextResponse.json({
    processed: queuedRows.length,
    sent,
    sentEmail,
    skipped,
    failed,
    rescheduled,
    nudgesSent,
    nudgesSkipped,
  })
}
