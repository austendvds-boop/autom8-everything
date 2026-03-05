import { NextRequest, NextResponse } from "next/server"
import { processWebhookNotification } from "@/lib/review-funnel/services/calendar"

export async function POST(request: NextRequest) {
  const channelId = request.headers.get("x-goog-channel-id")?.trim()
  const resourceId = request.headers.get("x-goog-resource-id")?.trim()

  if (!channelId) {
    return NextResponse.json({ error: "Missing X-Goog-Channel-ID header" }, { status: 400 })
  }

  try {
    const result = await processWebhookNotification(channelId, resourceId)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Failed to process Google Calendar webhook" }, { status: 500 })
  }
}
