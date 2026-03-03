import type { Metadata } from "next";
import { Suspense } from "react";
import CadenceWelcomeClient from "./CadenceWelcomeClient";

export const metadata: Metadata = {
  title: "Cadence Welcome",
  description: "Your Cadence provisioning status"
};

export default function CadenceWelcomePage() {
  return (
    <Suspense fallback={null}>
      <CadenceWelcomeClient />
    </Suspense>
  );
}
