import { and, desc, eq, inArray } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfPendingSms, rfReviewRequests } from "@/lib/review-funnel/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const recentAttempts = await rfDb
    .select({
      status: rfPendingSms.status,
    })
    .from(rfPendingSms)
    .innerJoin(rfReviewRequests, eq(rfPendingSms.reviewRequestId, rfReviewRequests.id))
    .where(
      and(
        eq(rfReviewRequests.tenantId, authResult.tenant.id),
        inArray(rfPendingSms.status, ["sent", "failed", "sent_email"]),
      ),
    )
    .orderBy(desc(rfPendingSms.createdAt))
    .limit(5)

  const smsLimited = recentAttempts.length === 5 && recentAttempts.every((attempt) => attempt.status !== "sent")

  return NextResponse.json({
    smsLimited,
  })
}
