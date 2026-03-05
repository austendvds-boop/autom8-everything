import type { Metadata } from "next"
import { redirect } from "next/navigation"
import AdminTenantDetailClient from "./AdminTenantDetailClient"
import AdminShell from "@/components/review-funnel/admin/AdminShell"
import { isReviewFunnelAdminPageAuthorized } from "@/lib/review-funnel/admin-middleware"

export const metadata: Metadata = {
  title: "Review Funnel Admin | Tenant Detail",
  description: "Internal Review Funnel tenant detail view.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

export default async function ReviewFunnelAdminTenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const isAuthorized = await isReviewFunnelAdminPageAuthorized()

  if (!isAuthorized) {
    redirect("/review-funnel/admin/login")
  }

  const { id } = await params

  return (
    <AdminShell>
      <AdminTenantDetailClient tenantId={id} />
    </AdminShell>
  )
}
