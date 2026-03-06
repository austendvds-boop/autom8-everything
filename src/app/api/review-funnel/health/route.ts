import { NextResponse } from "next/server"
import { sql } from "drizzle-orm"
import { rfDb } from "@/lib/review-funnel/db/client"

export const dynamic = "force-dynamic"

export async function GET() {
  const checks: Record<string, boolean> = {}

  try {
    await rfDb.execute(sql`SELECT 1`)
    checks.database = true
  } catch {
    checks.database = false
  }

  checks.DATABASE_URL = Boolean(process.env.DATABASE_URL?.trim())
  checks.RF_ENCRYPTION_KEY = Boolean(process.env.RF_ENCRYPTION_KEY?.trim())
  checks.RF_JWT_SECRET = Boolean(process.env.RF_JWT_SECRET?.trim())
  checks.GOOGLE_CLIENT_ID = Boolean(process.env.GOOGLE_CLIENT_ID?.trim())
  checks.GOOGLE_CLIENT_SECRET = Boolean(process.env.GOOGLE_CLIENT_SECRET?.trim())
  checks.TWILIO_ACCOUNT_SID = Boolean(process.env.TWILIO_ACCOUNT_SID?.trim())
  checks.STRIPE_SECRET_KEY = Boolean(process.env.STRIPE_SECRET_KEY?.trim())
  checks.CRON_SECRET = Boolean(process.env.CRON_SECRET?.trim())
  checks.GOOGLE_PLACES_API_KEY = Boolean(process.env.GOOGLE_PLACES_API_KEY?.trim())

  const allHealthy = Object.values(checks).every(Boolean)

  return NextResponse.json({ healthy: allHealthy, checks }, { status: allHealthy ? 200 : 503 })
}
