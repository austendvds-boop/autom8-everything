import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Autom8 Pricing",
  description: "Simple pricing for Cadence, websites, review funnels, SEO, and custom apps.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing That&apos;s Clear and Simple
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">No hidden fees. No long-term contracts. Pick what you need now and add more later.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-[#8B5CF6]/40 bg-[#111118] p-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Start Free</p>
            <h2 className="text-2xl font-semibold mb-2">Cadence Phone Answering</h2>
            <p className="text-[#A1A1AA] mb-2">$199/mo after 7-day free trial</p>
            <p className="text-[#A1A1AA] mb-6">No setup fee. Cancel anytime.</p>
            <Link href="/cadence/get-started" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">Start Free Trial</Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111118] p-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Build Your Foundation</p>
            <h2 className="text-2xl font-semibold mb-2">Website + Review Funnel</h2>
            <p className="text-[#A1A1AA] mb-6">Starting at $2,500 for website projects. Review funnels from $149/mo.</p>
            <Link href="/contact" className="inline-block px-6 py-3 rounded-full border border-white/20 text-white font-semibold">Get a Quote</Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111118] p-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Grow Every Month</p>
            <h2 className="text-2xl font-semibold mb-2">SEO + Monthly Content</h2>
            <p className="text-[#A1A1AA] mb-6">From $500/mo. Scope depends on your locations and competition.</p>
            <Link href="/contact" className="inline-block px-6 py-3 rounded-full border border-white/20 text-white font-semibold">Book a Quick Call</Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-10 text-center">
          <p className="text-[#A1A1AA]">Not sure where to start? Tell us about your business and we&apos;ll recommend a plan.</p>
          <Link href="/contact" className="inline-block mt-4 text-[#A78BFA] hover:text-[#8B5CF6]">Go to intake form →</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
