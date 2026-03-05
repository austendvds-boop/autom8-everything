import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { reviewFunnelConfig } from "../config"
import { reviewFunnelSchema } from "./schema"

neonConfig.fetchConnectionCache = true

export function createReviewFunnelDb(databaseUrl = reviewFunnelConfig.DATABASE_URL) {
  const sql = neon(databaseUrl)
  return drizzle(sql, { schema: reviewFunnelSchema })
}

type ReviewFunnelDb = ReturnType<typeof createReviewFunnelDb>

const globalForReviewFunnelDb = globalThis as typeof globalThis & {
  __reviewFunnelDb?: ReviewFunnelDb
}

export const rfDb = globalForReviewFunnelDb.__reviewFunnelDb ?? createReviewFunnelDb()

if (process.env.NODE_ENV !== "production") {
  globalForReviewFunnelDb.__reviewFunnelDb = rfDb
}

export type { ReviewFunnelDb }
