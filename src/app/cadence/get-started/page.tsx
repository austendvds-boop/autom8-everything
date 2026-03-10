import type { Metadata } from "next";
import CadenceGetStartedClient from "./CadenceGetStartedClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Cadence Onboarding - Get Started",
    description: "Set up your Cadence AI receptionist in minutes.",
    path: "/cadence/get-started",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function CadenceGetStartedPage() {
  return <CadenceGetStartedClient />;
}
