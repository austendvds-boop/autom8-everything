import type { Metadata } from "next";
import SignupClient from "./SignupClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Review Funnel Signup | Autom8 Everything",
  description: "Start your Review Funnel setup and pick the plan that fits your business.",
  path: "/review-funnel/signup",
  keywords: ["review funnel signup", "google review setup", "local business review automation"],
});

export default function ReviewFunnelSignupPage() {
  return <SignupClient />;
}
