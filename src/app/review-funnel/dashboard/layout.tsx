import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import DashboardLayout from "@/components/review-funnel/DashboardLayout"
import { RF_SESSION_COOKIE_NAME } from "@/lib/review-funnel/constants"

interface ReviewFunnelDashboardLayoutProps {
  children: ReactNode
}

export const dynamic = "force-dynamic"

export default async function ReviewFunnelDashboardRootLayout({ children }: ReviewFunnelDashboardLayoutProps) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(RF_SESSION_COOKIE_NAME)?.value?.trim()

  if (!sessionToken) {
    redirect("/review-funnel/login")
  }

  const { verifySession } = await import("@/lib/review-funnel/services/auth")
  const tenant = await verifySession(sessionToken)

  if (!tenant) {
    redirect("/review-funnel/login")
  }

  return <DashboardLayout businessName={tenant.businessName}>{children}</DashboardLayout>
}
