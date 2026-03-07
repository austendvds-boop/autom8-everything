import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, FileText, Globe, MapPin, PhoneCall, Search, Star } from "lucide-react";
import ComparisonTable from "@/components/ComparisonTable";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
    description: "We keep refining pages and local SEO signals so your visibility keeps climbing.",
  },
];

const deliverables = [
  { title: "2–4 blog posts per month", description: "Targeting local search terms your customers already use.", icon: FileText },
  { title: "Service page optimization", description: "Better structure, headings, and internal links for ranking.", icon: Search },
  {
    title: "Google Business Profile management",
    description: "Optimized listing, posts, and review response support.",
    icon: MapPin,
  },
  {
    title: "Local citation management",
    description: "Consistent business info across directories and platforms.",
    icon: Globe,
  },
  { title: "Monthly performance report", description: "Clear metrics on rankings, traffic, and lead trends.", icon: BarChart3 },
];

const faqs = [
  {
    question: "How long until I see results?",
    answer: "Most businesses see traction in a few months, then results compound with consistency.",
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
  description: "Monthly local SEO and blog publishing to help your business rank higher and get more inbound leads.",
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
    description: "Monthly local SEO and content publishing service for long-term search growth.",
    path: "/services/seo-content",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">SEO & Content</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Get Found on Google. Get Called. Get Booked.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Monthly local SEO and content that builds compounding visibility. Show up in the map pack, earn organic
            traffic, and turn searches into service calls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="btn-primary px-8 py-4">
              Contact Us
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
                period: "Month 1–2",
                phase: "Foundation",
                detail: "Keyword research, technical fixes, initial content, Google Business Profile optimization",
              },
              { period: "Month 3–4", phase: "Traction", detail: "Rankings start moving, traffic increases, local visibility improves" },
              {
                period: "Month 5–6",
                phase: "Momentum",
                detail: "Map pack visibility, inbound lead growth, content library building",
              },
              {
                period: "Month 6+",
                phase: "Compounding",
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
          <p className="mt-8 text-sm text-[#A1A1AA] italic">SEO is not instant. It is a compounding investment that builds over time.</p>
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
          { feature: "ROI timeline", values: ["Short-term only", "Compounds over months and years"] },
          { feature: "Algorithm updates", values: ["You fall behind", "We adapt for you"] },
        ]}
      />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">SEO Works Best as Part of Your Growth Stack</h2>
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
              Build Your Full Growth Stack
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="section-heading">Pricing</h2>
          <div className="card-base border-[#8B5CF6]/40 p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Monthly Retainer</p>
            <p className="text-4xl font-bold mb-3">Contact Us</p>
            <p className="text-[#A1A1AA] mb-6">Scope depends on your market, goals, and how much content you want each month.</p>
            <Link href="/contact" className="btn-primary px-8 py-4">
              Contact Us
            </Link>
            <div className="mt-6 text-left max-w-sm mx-auto">
              <p className="text-sm text-[#A1A1AA] mb-3">What affects pricing:</p>
              <ul className="space-y-1.5 text-sm text-[#A1A1AA]">
                <li>• Market competitiveness in your area</li>
                <li>• Number of service areas to target</li>
                <li>• Monthly content volume</li>
                <li>• Current site health and authority</li>
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
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
