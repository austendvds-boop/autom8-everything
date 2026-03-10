import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, FileText, Globe, MapPin, PhoneCall, Search, Star } from "lucide-react";
import ComparisonTable from "@/components/ComparisonTable";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Find what your customers search",
    description: "We map the local search terms that matter for your business.",
  },
  {
    title: "Publish useful content every month",
    description: "We post clear articles and service content that answer real customer questions.",
  },
  {
    title: "Improve rankings over time",
    description: "We keep refining pages and local SEO so your visibility keeps climbing.",
  },
];

const deliverables = [
  { title: "2 blog posts per month", description: "Targeting local search terms your customers already use.", icon: FileText },
  { title: "Google Business profile updates", description: "Keep your listing current so you show up in the map pack.", icon: MapPin },
  { title: "Local SEO optimization", description: "On-page improvements so your pages rank for local searches.", icon: Search },
  { title: "Monthly performance report", description: "Clear numbers on rankings, traffic, and what is working.", icon: BarChart3 },
  { title: "Hosting + 1 site edit per month", description: "Your site stays up, fast, and current.", icon: Globe },
];

const faqs = [
  {
    question: "How long until I see results?",
    answer: "Most businesses see traction in a few months, then results build over time with consistency.",
  },
  {
    question: "Do you write the content?",
    answer: "Yes. We write and publish content for you each month.",
  },
  {
    question: "Do you only work on sites you build?",
    answer: "Our best results come from websites in the Autom8 stack. Migration from other platforms is available as an upcharge.",
  },
  {
    question: "Is this a one-time project?",
    answer: "No. SEO and content work best as an ongoing monthly service.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "SEO & Content for Local Businesses | Autom8 Everything",
  description: "Monthly local SEO and blog content for $299/mo. Show up in local Google searches and get more calls.",
  path: "/services/seo-content",
  keywords: [
    "local seo",
    "monthly seo service",
    "business blog content",
    "google rankings for local business",
  ],
});

export default function SeoContentPage() {
  const serviceSchema = buildServiceSchema({
    name: "SEO & Content",
    description: "Monthly local SEO and blog content for $299/mo. Show up in local Google searches and get more calls.",
    path: "/services/seo-content",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">SEO & Content</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Show Up When Customers Search for What You Do.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            We publish fresh content to your site every month and keep your Google Business profile up to date. Customers
            find you instead of your competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="btn-primary px-8 py-4">
              Get a Free Quote
            </Link>
            <Link href="#how-it-works" className="btn-secondary px-8 py-4">
              How It Works
            </Link>
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

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">What to Expect and When</h2>
          <div className="space-y-6">
            {[
              {
                period: "Month 1-2",
                phase: "Foundation",
                detail: "Keyword research, technical fixes, initial content, Google Business Profile optimization",
              },
              { period: "Month 3-4", phase: "Traction", detail: "Rankings start moving, traffic increases, local visibility improves" },
              {
                period: "Month 5-6",
                phase: "Momentum",
                detail: "Map pack visibility, inbound lead growth, content library building",
              },
              {
                period: "Month 6+",
                phase: "Long-term growth",
                detail: "Consistent leads, expanding keyword coverage, competitive positioning",
              },
            ].map((item, i) => (
              <div key={item.period} className="flex items-start gap-6">
                <div className="w-20 shrink-0">
                  <p className="text-sm font-semibold text-[#8B5CF6]">{item.period}</p>
                </div>
                <div className="flex-1 card-base p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.phase}</h3>
                  <p className="text-[#A1A1AA] text-sm">{item.detail}</p>
                </div>
                {i < 3 && <div className="hidden md:block w-px h-8 bg-[#8B5CF6]/20 ml-10 mt-16" />}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#A1A1AA] italic">SEO is not instant. It is an investment that builds over time.</p>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">What We Deliver Every Month</h2>
          <div className="space-y-4">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-base p-6 flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-[#A1A1AA]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ComparisonTable
        title="SEO Is Not a Project. It's a Growth Engine."
        subtitle="See why consistent monthly work outperforms one-time fixes."
        columns={[{ label: "One-Time SEO Audit" }, { label: "Monthly SEO Retainer", highlight: true }]}
        rows={[
          { feature: "Rankings stability", values: ["Temporary boost", "Sustained and improving"] },
          { feature: "Content freshness", values: ["Stale after launch", "New content every month"] },
          { feature: "Competitive response", values: ["Competitors catch up", "You stay ahead"] },
          { feature: "ROI timeline", values: ["Short-term only", "Builds over months and years"] },
          { feature: "Algorithm updates", values: ["You fall behind", "We adapt for you"] },
        ]}
      />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">SEO Works Best Alongside Your Other Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                pair: "SEO + Website",
                description: "A fast, well-structured site ranks better and converts more of the traffic SEO drives.",
                icon: Globe,
              },
              {
                pair: "SEO + Reviews",
                description: "More reviews improve your local pack ranking. SEO drives the traffic to see them.",
                icon: Star,
              },
              {
                pair: "SEO + Cadence",
                description: "More visibility means more calls. Cadence makes sure every call gets answered.",
                icon: PhoneCall,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.pair} className="card-base p-6">
                  <div className="w-10 h-10 mb-4 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.pair}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="btn-primary px-8 py-4">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="section-heading">Pricing</h2>
          <div className="card-base border-[#8B5CF6]/40 p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Growth Plan</p>
            <p className="text-4xl font-bold mb-3">$299/mo</p>
            <p className="text-[#A1A1AA] mb-6">Add-on to any website plan. Includes hosting.</p>
            <Link href="/contact" className="btn-primary px-8 py-4">
              Get a Free Quote
            </Link>
            <div className="mt-6 text-left max-w-sm mx-auto">
              <ul className="space-y-1.5 text-sm text-[#A1A1AA]">
                <li>&bull; Hosting + uptime</li>
                <li>&bull; 1 site edit/mo</li>
                <li>&bull; 2 blog posts/mo</li>
                <li>&bull; Google Business updates</li>
                <li>&bull; Local SEO</li>
                <li>&bull; Monthly report</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
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

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="section-heading mb-4">Ready to grow your search traffic each month?</h2>
          <p className="text-[#A1A1AA] text-lg mb-8">We will show you exactly where to start.</p>
          <Link href="/contact" className="btn-primary px-8 py-4">
            Get a Free Quote
          </Link>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
