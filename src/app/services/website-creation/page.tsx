import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Website Creation for Local Businesses",
  description:
    "Fast, clear websites built to get more calls. Launch from $799, Scale from $1,499, and Custom from $2,499+.",
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
            <div key={item} className="rounded-2xl border border-white/10 bg-[#111118] p-6 text-[#A1A1AA]">{item}</div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>Website Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#111118] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[#8B5CF6] mb-2">Launch</p>
              <p className="text-2xl font-semibold mb-3">$799</p>
              <ul className="space-y-2 text-[#A1A1AA] text-sm">
                <li>• Quick launch essentials</li>
                <li>• Core pages and mobile-ready layout</li>
                <li>• Fast path to go live</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111118] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[#8B5CF6] mb-2">Scale</p>
              <p className="text-2xl font-semibold mb-3">$1,499</p>
              <ul className="space-y-2 text-[#A1A1AA] text-sm">
                <li>• Conversion-focused page structure</li>
                <li>• Key integrations for forms and follow-up</li>
                <li>• Built to support lead growth</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111118] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[#8B5CF6] mb-2">Custom</p>
              <p className="text-2xl font-semibold mb-3">$2,499+</p>
              <ul className="space-y-2 text-[#A1A1AA] text-sm">
                <li>• Bespoke functionality and workflows</li>
                <li>• Advanced logic and custom page needs</li>
                <li>• Scope tailored to your operation</li>
              </ul>
            </div>
          </div>

          <p className="text-[#A1A1AA] mt-6">Existing site clone/migration is an upcharge, quoted after review.</p>
          <Link href="/contact" className="inline-block mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">
            Get a Quote
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
