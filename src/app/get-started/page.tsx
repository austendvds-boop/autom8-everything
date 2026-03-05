import type { Metadata } from "next";
import GetStartedClient from "./GetStartedClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Get Started | Cadence Onboarding",
  description: "Complete the Cadence onboarding wizard for your business in a few quick steps.",
  path: "/get-started",
  keywords: ["cadence onboarding", "ai receptionist onboarding", "autom8 everything get started"],
});

export default function GetStartedPage() {
  return <GetStartedClient />;
}
