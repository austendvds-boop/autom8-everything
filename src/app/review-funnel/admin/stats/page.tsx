import type { Metadata } from "next"
import { redirect } from "next/navigation"
import AdminStatsClient from "./AdminStatsClient"
import AdminShell from "@/components/review-funnel/admin/AdminShell"
import { isReviewFunnelAdminPageAuthorized } from "@/lib/review-funnel/admin-middleware"

export const metadata: Metadata = {
  title: "Review Funnel Admin | Stats",
  description: "Internal Review Funnel admin stats.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

export default async function ReviewFunnelAdminStatsPage() {
  const isAuthorized = await isReviewFunnelAdminPageAuthorized()

  if (!isAuthorized) {
    redirect("/review-funnel/admin/login")
  }

  return (
    <AdminShell>
      <AdminStatsClient />
    </AdminShell>
  )
}
