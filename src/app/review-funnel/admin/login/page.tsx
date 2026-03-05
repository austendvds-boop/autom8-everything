import type { Metadata } from "next"
import { redirect } from "next/navigation"
import AdminLoginClient from "./AdminLoginClient"
import { isReviewFunnelAdminPageAuthorized } from "@/lib/review-funnel/admin-middleware"

export const metadata: Metadata = {
  title: "Review Funnel Admin Login | Autom8 Everything",
  description: "Sign in to the internal Review Funnel admin panel.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

export default async function ReviewFunnelAdminLoginPage() {
  const isAuthorized = await isReviewFunnelAdminPageAuthorized()

  if (isAuthorized) {
    redirect("/review-funnel/admin")
  }

  return <AdminLoginClient />
}
