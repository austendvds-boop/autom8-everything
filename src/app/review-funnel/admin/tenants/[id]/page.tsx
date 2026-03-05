import type { Metadata } from "next"
import AdminTenantDetailClient from "./AdminTenantDetailClient"

export const metadata: Metadata = {
  title: "Review Funnel Admin | Business Detail",
  description: "Internal Review Funnel business detail view.",
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
  const { id } = await params

  return <AdminTenantDetailClient tenantId={id} />
}
