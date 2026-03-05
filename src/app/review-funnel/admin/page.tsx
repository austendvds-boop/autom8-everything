import type { Metadata } from "next"
import { redirect } from "next/navigation"
import AdminTenantsClient from "./AdminTenantsClient"
import AdminShell from "@/components/review-funnel/admin/AdminShell"
import { isReviewFunnelAdminPageAuthorized } from "@/lib/review-funnel/admin-middleware"

export const metadata: Metadata = {
  title: "Review Funnel Admin | Tenants",
  description: "Internal Review Funnel tenant management panel.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

export default async function ReviewFunnelAdminPage() {
  const isAuthorized = await isReviewFunnelAdminPageAuthorized()

  if (!isAuthorized) {
    redirect("/review-funnel/admin/login")
  }

  return (
    <AdminShell>
      <AdminTenantsClient />
    </AdminShell>
  )
}
