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

const websiteTiers = [
  {
    name: "Launch",
    bestFor: "New businesses that need a professional site fast",
    description: "A clean, mobile-ready website that makes your business look credible and easy to contact.",
    price: "$500",
    priceNote: "one-time",
    highlights: ["Up to 5 pages", "Mobile-ready design", "Contact or booking form", "Basic on-page SEO"],
  },
  {
    name: "Enterprise",
    bestFor: "Businesses that need more pages and custom features",
    description: "Everything in Launch plus custom features, more pages, and room to grow.",
    price: "$1,000",
    priceNote: "one-time",
    highlights: ["Up to 10 pages", "Everything in Launch", "Custom features and functionality", "Built for your specific workflow"],
    recommended: true,
  },
];

const monthlyPlans = [
  {
    name: "Hosting",
    price: "$50",
    priceNote: "/mo",
    description: "Keep your site running smoothly after launch.",
    highlights: ["Hosting + uptime monitoring", "1 site edit per month"],
  },
  {
    name: "Growth",
    price: "$299",
    priceNote: "/mo",
    description: "Hosting plus blog content, local SEO, and monthly reports so customers find you on Google.",
    highlights: [
      "Everything in Hosting",
      "2 blog posts published per month",
      "Google Business profile updates",
      "Local SEO optimization",
      "Monthly performance report",
    ],
    recommended: true,
  },
];

const faqs = [
  { question: "Can you rebuild my existing site?", answer: "Yes. We can migrate and rebuild older websites. Ask us for a quote." },
  { question: "Do I need to write all the content?", answer: "No. We handle the writing and structure. You just tell us about your business." },
  { question: "How long does a website take to build?", answer: "Most Launch sites are live in about a week. Enterprise projects take 2-3 weeks." },
  {
    question: "Can I start with Launch and add Growth later?",
    answer: "Yes. Many businesses start with a Launch site and Hosting, then add Growth when they are ready to invest in SEO.",
  },
  {
    question: "What is the difference between Hosting and Growth?",
    answer:
      "Hosting keeps your site running and includes 1 edit per month. Growth adds blog posts, Google Business updates, local SEO, and a monthly report so you show up in more searches.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Website Creation | Autom8 Everything",
  description: "Professional business websites starting at $500. Mobile-ready, SEO-friendly, built for local businesses.",
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
    description: "Professional business websites starting at $500. Mobile-ready, SEO-friendly, built for local businesses.",
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
            We build professional websites for local businesses. Your site will be mobile-ready, easy to find on Google,
            and designed to get you more calls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="btn-primary px-8 py-4">
              Get a Free Quote
            </Link>
            <Link href="#pricing" className="btn-secondary px-8 py-4">
              See Pricing
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
          <p className="text-xl text-[#A1A1AA] mb-6">Know what you need? Let&apos;s get started.</p>
          <Link href="/contact" className="btn-primary px-8 py-4">
            Get a Free Quote
          </Link>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#12121A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-heading mb-10 text-center">Pricing Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websiteTiers.map((tier) => (
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
                <div className="mb-5">
                  <p className="text-4xl font-bold">{tier.price}</p>
                  <p className="text-sm text-[#A1A1AA]">{tier.priceNote}</p>
                </div>
                <ul className="space-y-2 text-[#D4D4D8] text-sm mb-8 flex-1">
                  {tier.highlights.map((item) => (
                    <li key={item}>&bull; {item}</li>
                  ))}
                </ul>
                <Link href="/contact" className={tier.recommended ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>
                  Get a Free Quote
                </Link>
              </article>
            ))}
          </div>

          <h3 className="text-2xl font-semibold mt-16 mb-10 text-center">Monthly Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthlyPlans.map((plan) => (
              <article
                key={plan.name}
                className={`card-base relative p-8 h-full flex flex-col ${
                  plan.recommended ? "border-[#8B5CF6]/45 bg-[#0A0A0F]" : ""
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wide font-semibold px-3 py-1 rounded-full bg-[#8B5CF6] text-white">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-[#A1A1AA] mb-4 min-h-[72px]">{plan.description}</p>
                <div className="mb-5">
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <p className="text-sm text-[#A1A1AA]">{plan.priceNote}</p>
                </div>
                <ul className="space-y-2 text-[#D4D4D8] text-sm mb-8 flex-1">
                  {plan.highlights.map((item) => (
                    <li key={item}>&bull; {item}</li>
                  ))}
                </ul>
                <Link href="/contact" className={plan.recommended ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>
                  Get a Free Quote
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
                <div className="h-48 bg-white/[0.02] border-b border-white/5 flex items-center justify-center">
                  <span className="text-sm text-[#52525B]">Website Preview</span>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wide text-[#8B5CF6] mb-2">{industry}</p>
                  <p className="text-sm text-[#A1A1AA]">Real project screenshot and results coming soon.</p>
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
