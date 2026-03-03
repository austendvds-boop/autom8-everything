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

type PricingRow = {
  eyebrow: string;
  name: string;
  price: string;
  context: string;
  includes: string[];
  primaryCta: { href: string; label: string };
  learnMoreHref?: string;
};

const pricingRows: PricingRow[] = [
  {
    eyebrow: "AI Voice Agent",
    name: "Cadence Phone Answering",
    price: "$199/mo",
    context: "No setup fee. Cancel anytime. 7-day free trial included.",
    includes: ["24/7 call answering", "Appointment booking", "FAQ handling", "Live call transfer", "Call summaries"],
    primaryCta: { href: "/cadence/get-started", label: "Start Free Trial" },
    learnMoreHref: "/services/cadence",
  },
  {
    eyebrow: "Website Creation",
    name: "Website Plans",
    price: "From $799",
    context: "Launch, Scale, and Custom plans. Existing site migration is quoted after review.",
    includes: ["Conversion-focused page structure", "SEO-ready technical setup", "Mobile-first performance", "Form and lead-flow integration", "Launch support"],
    primaryCta: { href: "/contact", label: "Book a Call" },
    learnMoreHref: "/services/website-creation",
  },
  {
    eyebrow: "Reputation",
    name: "Review Funnel",
    price: "$149/mo",
    context: "Per location. Setup included.",
    includes: ["Automated review requests", "Public review routing", "Private issue capture", "Simple monthly management"],
    primaryCta: { href: "/contact", label: "Book a Call" },
    learnMoreHref: "/services/review-funnel",
  },
  {
    eyebrow: "Search & Content",
    name: "SEO + Monthly Content",
    price: "From $500/mo",
    context: "Scope depends on location count and market competition.",
    includes: ["Monthly on-site SEO improvements", "Blog publishing", "Local visibility improvements", "Ranking and performance reporting"],
    primaryCta: { href: "/contact", label: "Book a Call" },
    learnMoreHref: "/services/seo-content",
  },
  {
    eyebrow: "Custom Build",
    name: "Custom Apps",
    price: "Custom quote",
    context: "Tell us what you need and we will scope a flat quote.",
    includes: ["Dashboards and internal tools", "Custom booking and intake flows", "Workflow automation", "Integration planning"],
    primaryCta: { href: "/contact", label: "Book a Call" },
    learnMoreHref: "/services/custom-apps",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing That&apos;s Clear and Simple
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            One place to compare every Autom8 plan. Pick what fits now, then add more as you grow.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          {pricingRows.map((row, index) => (
            <div
              key={row.name}
              className={`rounded-3xl border bg-[#111118] p-8 md:p-10 ${
                index === 0 ? "border-[#8B5CF6]/40" : "border-white/10"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,1fr,auto] gap-8 items-start">
                <div>
                  <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">{row.eyebrow}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {row.name}
                  </h2>
                  <p className="text-3xl font-semibold text-white mb-2">{row.price}</p>
                  <p className="text-[#A1A1AA]">{row.context}</p>
                </div>

                <ul className="space-y-2 text-sm text-[#A1A1AA]">
                  {row.includes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 lg:items-end">
                  <Link
                    href={row.primaryCta.href}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold whitespace-nowrap ${
                      row.primaryCta.label === "Start Free Trial"
                        ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white"
                        : "border border-white/20 text-white hover:border-[#8B5CF6]/60"
                    }`}
                  >
                    {row.primaryCta.label}
                  </Link>
                  {row.learnMoreHref && (
                    <Link href={row.learnMoreHref} className="text-sm text-[#A78BFA] hover:text-[#8B5CF6]">
                      Learn More →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-10 text-center">
          <p className="text-[#A1A1AA]">
            Not sure which plan fits?{" "}
            <Link href="/contact" className="text-[#A78BFA] hover:text-[#8B5CF6]">
              Tell us about your business
            </Link>{" "}
            and we&apos;ll recommend one.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
