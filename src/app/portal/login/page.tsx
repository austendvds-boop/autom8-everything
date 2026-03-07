import type { Metadata } from "next"
import PortalLoginClient from "./PortalLoginClient"

export const metadata: Metadata = {
  title: "Client Portal Login",
  description: "Autom8 Everything client portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalLoginPage() {
  return <PortalLoginClient />
}
