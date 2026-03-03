import type { Metadata } from "next";
import CadenceGetStartedClient from "./CadenceGetStartedClient";

export const metadata: Metadata = {
  title: "Cadence Onboarding — Get Started",
  description: "Set up your Cadence AI receptionist in minutes."
};

export default function CadenceGetStartedPage() {
  return <CadenceGetStartedClient />;
}
