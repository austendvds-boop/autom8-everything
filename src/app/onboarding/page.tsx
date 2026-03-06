import type { Metadata } from "next";
import OnboardingClient from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Cadence Onboarding | Autom8 Everything",
  description: "Set up your AI receptionist in 5 minutes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}
