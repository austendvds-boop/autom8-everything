import type { Metadata } from "next";
import LoginClient from "./LoginClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Review Funnel Login | Autom8 Everything",
    description: "Sign in to your Review Funnel dashboard.",
    path: "/review-funnel/login",
    keywords: ["review funnel login", "business review dashboard"],
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewFunnelLoginPage() {
  return <LoginClient />;
}
