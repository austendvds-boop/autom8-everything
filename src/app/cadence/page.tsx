import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CadenceLandingClient from "./CadenceLandingClient";

export const metadata: Metadata = buildMetadata({
  title: "Cadence - AI Receptionist for Small Business | Autom8 Everything",
  description:
    "Never miss another call. Cadence answers your business phone 24/7, handles FAQs, routes urgent calls, and sends you a summary. 7-day free trial, $199/mo.",
  path: "/cadence",
  keywords: [
    "AI receptionist",
    "AI phone answering",
    "small business phone answering",
    "automated receptionist",
    "cadence AI",
    "24/7 call answering",
  ],
});

export default function CadenceLandingPage() {
  return <CadenceLandingClient />;
}
