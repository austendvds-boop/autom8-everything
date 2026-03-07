import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
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
    bestFor: "New businesses that need a professional presence fast",
    description: "A clean, mobile-ready site that makes calling you the obvious next step.",
    price: "$1,500",
    highlights: [
      "Professional 5-page site",
      "Mobile responsive layout",
      "Every page drives visitors to call or contact",
      "Clear service descriptions",
      "Basic local SEO setup",
    ],
  },
  {
    name: "Scale",
    bestFor: "Businesses ready to rank on Google and capture leads",
    description: "A custom site built to rank for your target keywords and convert traffic into calls.",
    price: "$3,500",
    highlights: [
      "Custom design and brand identity",
      "Service pages built to rank for target keywords",
      "Blog setup for ongoing content",
      "10+ optimized pages",
      "Conversion-optimized CTAs on every page",
    ],
    recommended: true,
  },
  {
    name: "Custom",
    bestFor: "Multi-location or complex businesses that need tools to work together",
    description: "A fully bespoke build with integrations, custom features, and ongoing support.",
    price: "Let's Talk",
    highlights: [
      "Fully bespoke design and architecture",
      "Connects with the tools you already use",
      "Custom features and functionality",
      "Ongoing support and updates",
      "Priority development queue",
    ],
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
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Website Creation</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            A Website That Gets Picked, Trusted, and Contacted.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Most local business websites exist but don&apos;t convert. We build sites that rank on Google, earn trust in
            seconds, and make calling you the obvious next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="btn-primary px-8 py-4">
              Get Started
            </Link>
            <Link href="#pricing" className="btn-secondary px-8 py-4">
              View Tiers
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">Why Your Website Matters More Than You Think</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "75%", text: "of consumers judge credibility by website design", source: "Stanford Research" },
              { stat: "88%", text: "of users won't return after a bad mobile experience", source: "Sweor" },
              { stat: "60%+", text: "of local search traffic comes from mobile devices", source: "Google" },
            ].map((item) => (
              <div key={item.stat} className="card-base p-8 text-center">
                <p className="text-4xl font-bold gradient-text mb-3">{item.stat}</p>
                <p className="text-[#A1A1AA] text-sm mb-2">{item.text}</p>
                <p className="text-xs text-[#52525B]">Source: {item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="card-base p-6">
                <p className="text-[#8B5CF6] font-semibold mb-3">Step {index + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl text-[#A1A1AA] mb-6">Ready to upgrade? Let&apos;s pick your tier.</p>
          <Link href="/contact" className="btn-primary px-8 py-4">
            Get Started
          </Link>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#12121A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-heading mb-10 text-center">Pricing Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className={`card-base relative p-8 h-full flex flex-col ${
                  tier.recommended ? "border-[#8B5CF6]/45 bg-[#0A0A0F]" : ""
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wide font-semibold px-3 py-1 rounded-full bg-[#8B5CF6] text-white">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-xs text-[#8B5CF6] uppercase tracking-wide mb-2">Best for: {tier.bestFor}</p>
                <p className="text-[#A1A1AA] mb-4 min-h-[72px]">{tier.description}</p>
                <p className="text-4xl font-bold mb-5">{tier.price}</p>
                <ul className="space-y-2 text-[#D4D4D8] text-sm mb-8 flex-1">
                  {tier.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <Link href="/contact" className={tier.recommended ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>
                  {tier.name === "Custom" ? "Let's Talk" : "Get Started"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10 text-center">Built for Real Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Home Services", "Medical Practice", "Professional Services"].map((industry) => (
              <div key={industry} className="card-base overflow-hidden">
                {/* Screenshot placeholder */}
                <div className="h-48 bg-white/[0.02] border-b border-white/5 flex items-center justify-center">
                  <span className="text-sm text-[#52525B]">Website Preview</span>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wide text-[#8B5CF6] mb-2">{industry}</p>
                  <p className="text-sm text-[#A1A1AA]">
                    {/* TODO: Add real screenshot, business name, and results */}
                    Real project screenshot and results coming soon.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-heading mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="section-heading mb-4">Your Website Should Work as Hard as You Do.</h2>
          <p className="text-[#A1A1AA] text-lg mb-8">We&apos;ll help you choose the right tier and timeline.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+14806313993" className="btn-primary px-8 py-4">
              Call (480) 631-3993
            </a>
            <Link href="/contact" className="btn-secondary px-8 py-4">
              Fill Out the Form
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
