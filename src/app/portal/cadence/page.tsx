import type { Metadata } from "next"
import PortalCadenceClient from "./PortalCadenceClient"

export const metadata: Metadata = {
  title: "Client Portal — Cadence Settings",
  description: "Autom8 Everything client portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalCadencePage() {
  return <PortalCadenceClient />
}
