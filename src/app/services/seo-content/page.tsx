import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "SEO & Monthly Content",
  description: "Show up on Google every month with ongoing SEO and blog content.",
  path: "/services/seo-content",
});

export default function SeoContentPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Show Up on Google Every Month
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            We improve rankings and publish content each month so your site keeps bringing in calls.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Monthly on-site SEO improvements",
            "Blog posts published on your Autom8-managed site",
            "Clear performance reporting",
            "Competing terms and location coverage",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#111118] p-6 text-[#A1A1AA]">{item}</div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Pricing</h2>
          <p className="text-[#A1A1AA]">From $500/mo. Final scope depends on locations and market competition.</p>
          <Link href="/pricing" className="inline-block mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">See Plans</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
