import type { Metadata } from "next"
import OnboardingWizardClient from "./OnboardingWizardClient"

export const metadata: Metadata = {
  title: "Client Portal - Cadence Onboarding",
  description: "Finish your Cadence onboarding inside the client portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalOnboardingPage() {
  return <OnboardingWizardClient />
}
