import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Review Funnel for Local Businesses",
  description: "Get more 5-star reviews automatically with a simple post-job follow-up system.",
  path: "/services/review-funnel",
});

export default function ReviewFunnelPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Get More 5-Star Reviews on Autopilot
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            After each job, we ask for feedback. Happy customers are guided to Google. Issues are handled privately.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Automatic follow-up requests",
            "Public review routing",
            "Private issue capture",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#111118] p-6 text-[#A1A1AA]">{item}</div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Pricing</h2>
          <p className="text-[#A1A1AA]">$149/mo per location with setup included.</p>
          <Link href="/pricing" className="inline-block mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">See Plans</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
