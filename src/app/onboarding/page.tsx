import type { Metadata } from "next";
import OnboardingClient from "./OnboardingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Cadence Onboarding | Autom8 Everything",
    description: "Set up your AI receptionist in 5 minutes.",
    path: "/onboarding",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}
