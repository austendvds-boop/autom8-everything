import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Read how Autom8 Everything handles website data and contact requests.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Privacy Policy
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-6">
            We only collect information submitted through forms or direct email and use it to respond to inquiries and deliver services.
          </p>
          <p className="text-[#A1A1AA] text-lg mb-6">
            For account-level integrations and tracking, data handling rules are defined in client agreements and platform-specific settings.
          </p>
          <p className="text-[#A1A1AA] text-lg">
            Questions about data handling? <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">Contact us</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
