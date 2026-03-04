import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Quick kickoff",
    description: "We learn your services, goals, and what you want the site to do for your business.",
  },
  {
    title: "Build and review",
    description: "We design and build your pages, then review everything with you before launch.",
  },
  {
    title: "Launch and support",
    description: "We publish your site and help with updates so it stays sharp as your business grows.",
  },
];

const tiers = [
  {
    name: "Launch",
    description: "Basic professional site, mobile responsive, 5 pages",
    price: "$1,500",
    highlights: ["Professional 5-page site", "Mobile responsive layout", "Clear calls to action"],
  },
  {
    name: "Scale",
    description: "Custom design, SEO optimized, blog, 10+ pages",
    price: "$3,500",
    highlights: ["Custom design and structure", "SEO-optimized service pages", "Blog setup + 10+ pages"],
  },
  {
    name: "Custom",
    description: "Full bespoke build, integrations, ongoing support",
    price: "Let's Talk",
    highlights: ["Fully bespoke build", "Integrations with your tools", "Ongoing support options"],
  },
];

const faqs = [
  {
    question: "Can you rebuild my existing site?",
    answer: "Yes. We can migrate and rebuild older websites into the Autom8 stack as an upcharge.",
  },
  {
    question: "Do I need to write all the content?",
    answer: "No. We handle the writing and structure with your input.",
  },
  {
    question: "How long does launch take?",
    answer: "Most projects launch in a few weeks depending on tier and scope.",
  },
  {
    question: "Can I start small and upgrade later?",
    answer: "Yes. Many businesses begin with Launch and upgrade as they grow.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Website Creation | Autom8 Everything",
  description: "Professional business websites with Launch, Scale, and Custom tiers.",
  path: "/services/websites",
  keywords: [
    "website creation",
    "small business website packages",
    "launch scale custom website",
    "professional local business websites",
  ],
});

export default function WebsitesPage() {
  const serviceSchema = buildServiceSchema({
    name: "Website Creation",
    description: "Professional business websites with Launch, Scale, and Custom tiers.",
    path: "/services/websites",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Website Creation</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Get a professional website that helps people choose you.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            We build clean, modern sites for non-technical business owners who want more calls, better trust, and less hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Get Started
            </Link>
            <Link
              href="#pricing"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              View Tiers
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

      <section id="pricing" className="py-20 bg-[#12121A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing Tiers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <article
                key={tier.name}
                className={`rounded-2xl p-8 border h-full flex flex-col ${
                  index === 1 ? "border-[#8B5CF6]/45 bg-[#0A0A0F]" : "border-white/10 bg-[#0A0A0F]"
                }`}
              >
                <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-[#A1A1AA] mb-4 min-h-[52px]">{tier.description}</p>
                <p className="text-4xl font-bold mb-5">{tier.price}</p>
                <ul className="space-y-2 text-[#D4D4D8] text-sm mb-8 flex-1">
                  {tier.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex w-full justify-center mt-auto px-5 py-3 rounded-full font-semibold ${
                    index === 1
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white"
                      : "border border-white/20 text-white hover:border-[#8B5CF6]/60 transition-colors"
                  }`}
                >
                  {tier.name === "Custom" ? "Let's Talk" : "Get Started"}
                </Link>
              </article>
            ))}
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
            Ready to upgrade your website?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">We&apos;ll help you choose the right tier and timeline.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
