import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing | Autom8 Everything",
  description: "Simple pricing for Cadence, review funnel, websites, SEO/content, and custom apps.",
  path: "/pricing",
});

const websiteTiers = [
  {
    name: "Launch",
    price: "$1,500",
    details: ["5 pages", "Mobile responsive", "Professional design", "Core SEO setup"],
  },
  {
    name: "Scale",
    price: "$3,500",
    details: ["10+ pages", "Custom design", "SEO-focused structure", "Blog setup"],
    featured: true,
  },
  {
    name: "Custom",
    price: "Let's Talk",
    details: ["Bespoke build", "Advanced integrations", "Ongoing support", "Built for your workflow"],
  },
];

const faqs = [
  {
    question: "Can I start with one product and add more later?",
    answer: "Yes. Most clients start with one service and expand as they grow.",
  },
  {
    question: "Do you lock me into long contracts?",
    answer: "No. Cadence and retainers are month-to-month. Builds are scoped project by project.",
  },
  {
    question: "How do I choose the right starting point?",
    answer: "Reach out and we will recommend the fastest win based on your business goals.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            Straightforward pricing so you can pick the right product now and grow from there.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-[#8B5CF6]/40 bg-[#12121A] p-8 h-full flex flex-col">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Cadence</p>
            <h2 className="text-3xl font-semibold mb-2">$199/mo</h2>
            <p className="text-[#A1A1AA] mb-6">7-day free trial included.</p>
            <Link href="/onboarding" className="inline-flex w-fit mt-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">
              Start Free Trial
            </Link>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#12121A] p-8 h-full flex flex-col">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Review Funnel</p>
            <h2 className="text-3xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-[#A1A1AA] mb-6">Automated review collection and response support.</p>
            <Link href="/contact" className="inline-flex w-fit mt-auto px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60">
              Contact Us
            </Link>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#12121A] p-8 md:col-span-2 h-full flex flex-col">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">Website Creation</p>
            <h2 className="text-3xl font-semibold mb-6">Launch / Scale / Custom</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {websiteTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-xl p-5 border h-full flex flex-col ${tier.featured ? "border-[#8B5CF6]/50 bg-[#0A0A0F]" : "border-white/10 bg-[#0F0F16]"}`}
                >
                  <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-1">{tier.name}</p>
                  <p className="text-2xl font-semibold mb-3">{tier.price}</p>
                  <ul className="space-y-2 text-sm text-[#A1A1AA] flex-1">
                    {tier.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href="/services/websites" className="inline-flex w-fit mt-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">
              View Website Details
            </Link>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#12121A] p-8 h-full flex flex-col">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">SEO & Content</p>
            <h2 className="text-3xl font-semibold mb-2">Monthly Retainer</h2>
            <p className="text-[#A1A1AA] mb-6">Contact us for a quote based on your market and goals.</p>
            <Link href="/contact" className="inline-flex w-fit mt-auto px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60">
              Contact Us
            </Link>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#12121A] p-8 h-full flex flex-col">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Custom Apps</p>
            <h2 className="text-3xl font-semibold mb-2">Custom Scope</h2>
            <p className="text-[#A1A1AA] mb-6">Bespoke app builds for your exact workflow and business needs.</p>
            <Link href="/contact" className="inline-flex w-fit mt-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">
              Book a Consultation
            </Link>
          </article>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-[#0A0A0F] p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
