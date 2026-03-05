import type { Metadata } from "next"
import SettingsClient from "./SettingsClient"

export const metadata: Metadata = {
  title: "Review Funnel Settings",
  description: "Configure Review Funnel profile, SMS, calendar, and billing settings.",
}

export default function ReviewFunnelSettingsPage() {
  return <SettingsClient />
}
