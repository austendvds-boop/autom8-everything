import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Website Creation for Local Businesses",
  description:
    "Fast, clear websites built to get more calls. See plans and compare website options on Autom8 pricing.",
  path: "/services/website-creation",
});

export default function WebsiteCreationPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            A Website That Actually Gets You Calls
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            We build fast, clean websites that help local customers find you and contact you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Clear service pages that rank on Google",
            "Fast mobile performance",
            "Simple contact flow that drives calls",
            "Local SEO foundations built in",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#111118] p-6 text-[#A1A1AA]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing Anchor
          </h2>
          <p className="text-3xl font-semibold text-white mb-2">From $799</p>
          <p className="text-[#A1A1AA] max-w-3xl">
            Launch, Scale, and Custom website plans are listed on the pricing page with full breakdowns and what&apos;s included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              See Plans
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
