import type { Metadata } from "next";
import GetStartedClient from "./GetStartedClient";

export const metadata: Metadata = {
  title: "Get Started | Autom8 Everything",
  description: "Complete onboarding for your Cadence AI call assistant.",
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
