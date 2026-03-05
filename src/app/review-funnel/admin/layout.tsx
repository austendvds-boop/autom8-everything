import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import AdminShell from "@/components/review-funnel/admin/AdminShell"
import { isReviewFunnelAdminPageAuthorized } from "@/lib/review-funnel/admin-middleware"

export const dynamic = "force-dynamic"

export default async function ReviewFunnelAdminLayout({ children }: { children: ReactNode }) {
  const hasValidAdminSession = await isReviewFunnelAdminPageAuthorized()

  if (!hasValidAdminSession) {
    redirect("/review-funnel/admin/login")
  }

  return <AdminShell>{children}</AdminShell>
}
