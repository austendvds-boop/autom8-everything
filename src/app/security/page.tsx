import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description: "Security approach for automation systems, data handling, and integrations at Autom8 Everything.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Security
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-6">
            We implement least-privilege access, environment-based credentials, and staged rollout checks for automation systems.
          </p>
          <p className="text-[#A1A1AA] text-lg mb-6">
            Sensitive production credentials should always be stored in provider-managed secret stores, never hardcoded in repositories.
          </p>
          <p className="text-[#A1A1AA] text-lg">
            For security questionnaire requests, <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">contact us directly</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
