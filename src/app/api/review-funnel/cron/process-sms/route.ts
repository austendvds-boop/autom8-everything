import { NextRequest, NextResponse } from "next/server"

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

  return NextResponse.json({
    processed: 0,
    queued: 0,
    skipped: true,
    reason: "process-sms cron will be implemented in Batch 3",
  })
}
