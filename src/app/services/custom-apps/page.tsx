import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Custom Apps & Tools",
  description: "Custom dashboards, booking systems, and internal tools built around your workflow.",
  path: "/services/custom-apps",
});

export default function CustomAppsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Custom Tools Built Around How You Work
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Need something specific? We build dashboards, booking systems, and internal tools that fit your team.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Lead and job dashboards",
            "Custom intake and booking flows",
            "Internal operations tools",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#111118] p-6 text-[#A1A1AA]">{item}</div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Pricing</h2>
          <p className="text-[#A1A1AA]">Custom pricing. Tell us what you need and we&apos;ll give you a flat quote.</p>
          <Link href="/contact" className="inline-block mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">Tell Us What You Need</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
