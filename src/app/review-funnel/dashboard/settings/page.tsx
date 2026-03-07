import type { Metadata } from "next"
import SettingsClient from "./SettingsClient"

export const metadata: Metadata = {
  title: "Review Funnel Settings",
  description: "Set up your business details, text messages, calendar, and billing.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReviewFunnelSettingsPage() {
  return <SettingsClient />
}
