import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Review Autom8 Everything engagement terms and service expectations.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Terms of Service
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-6">
            Service scope, delivery timelines, and payment terms are finalized in signed proposals and statements of work.
          </p>
          <p className="text-[#A1A1AA] text-lg mb-6">
            Automation and SEO outcomes depend on implementation quality, collaboration cadence, and platform access provided by the client.
          </p>
          <p className="text-[#A1A1AA] text-lg">
            Need formal contract details? <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">Request terms</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
