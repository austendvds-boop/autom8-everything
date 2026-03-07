import type { Metadata } from "next"
import PortalBillingClient from "./PortalBillingClient"

export const metadata: Metadata = {
  title: "Client Portal — Billing",
  description: "Autom8 Everything client portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalBillingPage() {
  return <PortalBillingClient />
}
