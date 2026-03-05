import type { Metadata } from "next"
import DashboardOverview from "./DashboardOverview"

export const metadata: Metadata = {
  title: "Review Funnel Dashboard",
  description: "Overview of review performance, text message usage, and calendar connection status.",
}

export default function ReviewFunnelDashboardPage() {
  return <DashboardOverview />
}
