import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Tell Us About Your Business",
    description:
      "Quick call or form. We learn your services, your customers, and what makes you different.",
  },
  {
    title: "We Design & Build It",
    description:
      "Custom pages, mobile-optimized, with clear calls to action. You review and approve before launch.",
  },
  {
    title: "Go Live & Start Getting Leads",
    description:
      "We handle hosting, domain setup, and launch. Your phone starts ringing from day one.",
  },
];

const includedFeatures = [
  {
    title: "Mobile-First Design",
    description:
      "Over 70% of your customers search on their phone. Your site looks perfect on every screen.",
  },
  {
    title: "SEO Built In",
    description:
      "Page titles, meta descriptions, schema markup, and fast load times. Google finds you from day one.",
  },
  {
    title: "Clear Calls to Action",
    description:
      "Every page drives visitors to call, book, or fill out a form. No confusing navigation.",
  },
  {
    title: "Fast Load Speed",
    description:
      "Built on modern frameworks. No bloated WordPress plugins slowing you down.",
  },
  {
    title: "Content That Sells",
    description:
      "We write copy that speaks to your customers — not jargon that confuses them.",
  },
  {
    title: "Ongoing Support",
    description:
      "Need updates? Changes? New pages? We&apos;re here. No ticket system, just message us.",
  },
];

const pricingTiers = [
  {
    name: "Launch",
    price: "$799",
    priceLabel: "one-time",
    highlights: [
      "Up to 5 pages",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "30 days of post-launch support",
    ],
    featured: false,
  },
  {
    name: "Scale",
    price: "$1,499",
    priceLabel: "one-time",
    highlights: [
      "Up to 10 pages",
      "Advanced SEO + blog setup",
      "Google Analytics integration",
      "Review widget integration",
      "60 days of post-launch support",
    ],
    featured: true,
  },
  {
    name: "Custom",
    price: "Custom quote",
    priceLabel: "",
    highlights: [
      "Unlimited pages",
      "E-commerce or booking integration",
      "Custom features & integrations",
      "Priority ongoing support",
      "Dedicated project manager",
    ],
    featured: false,
  },
];

const comparisonRows = [
  {
    feature: "Built for leads",
    autom8: "✅",
    diy: "❌ Templates",
    freelancer: "Maybe",
  },
  {
    feature: "SEO from day one",
    autom8: "✅",
    diy: "Basic",
    freelancer: "Extra cost",
  },
  {
    feature: "Mobile-first",
    autom8: "✅",
    diy: "✅",
    freelancer: "Varies",
  },
  {
    feature: "Ongoing support",
    autom8: "✅",
    diy: "DIY",
    freelancer: "Per-hour",
  },
  {
    feature: "Speed to launch",
    autom8: "~2 weeks",
    diy: "Days (but DIY)",
    freelancer: "4-8 weeks",
  },
  {
    feature: "Monthly cost",
    autom8: "$0 after build",
    diy: "$15-40/mo",
    freelancer: "Retainer",
  },
];

const faqs = [
  {
    question: "Do I need to provide content?",
    answer:
      "We handle the writing. Just tell us about your business and we&apos;ll create copy that converts.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can migrate and rebuild your current site into our stack. Pricing depends on scope.",
  },
  {
    question: "What platform do you build on?",
    answer:
      "Modern frameworks (Next.js) hosted on fast infrastructure. No WordPress, no page builders, no bloat.",
  },
  {
    question: "Do I own my website?",
    answer: "Yes. You own all content and assets. We handle hosting and maintenance.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "All plans include post-launch support. After that, updates are quick and affordable.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Website Creation for Local Businesses | Autom8 Everything",
  description:
    "Custom websites built for local businesses to generate more calls and booked jobs. Mobile-first, SEO-ready, and live in around two weeks.",
  path: "/services/website-creation",
  keywords: [
    "website design for local business",
    "small business website creation",
    "local business website builder",
    "seo website design",
    "website design phoenix",
  ],
});

export default function WebsiteCreationPage() {
  const serviceSchema = buildServiceSchema({
    name: "Website Creation",
    description:
      "Mobile-first, SEO-ready websites for local businesses designed to convert visitors into calls and booked jobs.",
    path: "/services/website-creation",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">WEBSITE CREATION</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            A Website That Actually Gets You Calls
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Built for local businesses. Mobile-first, SEO-ready, designed to turn visitors into booked jobs. Live in
            ~2 weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Call
            </Link>
            <Link
              href="#pricing"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <p className="text-[#8B5CF6] font-semibold mb-3">Step {index + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-8 hover:border-[#8B5CF6]/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing That Fits Your Stage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  tier.featured
                    ? "border border-[#8B5CF6]/50 bg-[#12121A] shadow-[0_0_0_1px_rgba(139,92,246,0.15)]"
                    : "border border-white/10 bg-[#12121A]"
                }`}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-2xl font-semibold">{tier.name}</h3>
                    {tier.featured ? (
                      <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">
                        Recommended
                      </span>
                    ) : null}
                  </div>
                  <p className="text-4xl font-bold leading-tight">
                    {tier.price}
                    {tier.priceLabel ? <span className="text-lg font-medium text-[#A1A1AA]"> {tier.priceLabel}</span> : null}
                  </p>
                </div>
                <ul className="space-y-3 text-[#A1A1AA] text-sm mb-8">
                  {tier.highlights.map((highlight) => (
                    <li key={highlight}>✓ {highlight}</li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-block mt-auto px-6 py-3 rounded-full font-semibold text-center ${
                    tier.featured
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white"
                      : "border border-white/20 text-white hover:border-[#8B5CF6]/60"
                  }`}
                >
                  Book a Call
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Why Autom8 Instead of Wix, Squarespace, or a Freelancer?
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-3xl">
            DIY builders look cheap at first, but templates and ongoing monthly fees add up. We build a lead-focused
            site that launches fast and keeps working without a pile of plugins and maintenance headaches.
          </p>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="bg-[#0A0A0F] text-left">
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 border-l border-white/10 font-semibold">Autom8</th>
                    <th className="p-4 border-l border-white/10 font-semibold">DIY (Wix/Squarespace)</th>
                    <th className="p-4 border-l border-white/10 font-semibold">Freelancer</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-t border-white/10">
                      <td className="p-4 text-[#A1A1AA]">{row.feature}</td>
                      <td className="p-4 border-l border-white/10 text-[#8B5CF6] font-medium">{row.autom8}</td>
                      <td className="p-4 border-l border-white/10 text-[#A1A1AA]">{row.diy}</td>
                      <td className="p-4 border-l border-white/10 text-[#A1A1AA]">{row.freelancer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Ready for a Website That Works?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">
            Book a free 15-minute call. We&apos;ll scope your project and give you a clear timeline.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Book a Call
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
