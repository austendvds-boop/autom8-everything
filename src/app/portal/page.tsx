import type { Metadata } from "next"
import PortalDashboardClient from "./PortalDashboardClient"

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Autom8 Everything client portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalPage() {
  return <PortalDashboardClient />
}
