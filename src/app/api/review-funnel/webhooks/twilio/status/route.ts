import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfReviewRequests } from "@/lib/review-funnel/db/schema"

const SENT_STATUSES = new Set(["accepted", "queued", "sending", "sent"])
const DELIVERED_STATUSES = new Set(["delivered"])
const FAILED_STATUSES = new Set(["failed", "undelivered", "canceled"])

export const dynamic = "force-dynamic"

function asTrimmedString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : ""
}

function mapTwilioStatus(status: string): string | null {
  const normalized = status.toLowerCase()

  if (DELIVERED_STATUSES.has(normalized)) {
    return "delivered"
  }

  if (FAILED_STATUSES.has(normalized)) {
    return "failed"
  }

  if (SENT_STATUSES.has(normalized)) {
    return "sent"
  }

  return null
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const messageSid =
    asTrimmedString(formData.get("MessageSid")) || asTrimmedString(formData.get("SmsSid"))
  const messageStatus =
    asTrimmedString(formData.get("MessageStatus")) || asTrimmedString(formData.get("SmsStatus"))

  if (!messageSid || !messageStatus) {
    return NextResponse.json({ ok: true, ignored: true, reason: "missing_fields" })
  }

  const mappedStatus = mapTwilioStatus(messageStatus)

  if (!mappedStatus) {
    return NextResponse.json({ ok: true, ignored: true, reason: "status_unmapped" })
  }

  await rfDb
    .update(rfReviewRequests)
    .set({
      smsStatus: mappedStatus,
    })
    .where(eq(rfReviewRequests.smsSid, messageSid))

  return NextResponse.json({ ok: true })
}
