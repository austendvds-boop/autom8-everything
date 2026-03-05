import type { Metadata } from "next"
import AdminLoginClient from "./AdminLoginClient"

export const metadata: Metadata = {
  title: "Review Funnel Admin Login | Autom8 Everything",
  description: "Sign in to the internal Review Funnel admin panel.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

export default function ReviewFunnelAdminLoginPage() {
  return <AdminLoginClient />
}
