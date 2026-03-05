import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PlanCard from "@/components/review-funnel/PlanCard";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Connect Calendar",
    description:
      "Connect your Google Calendar once, and Review Funnel knows when appointments are done.",
  },
  {
    title: "Automatic SMS",
    description:
      "A friendly text goes out at the right time, so your team does not need to remember follow-up.",
  },
  {
    title: "Reviews Roll In",
    description:
      "Happy customers are guided straight to your Google review page in just a few taps.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$79",
    priceSuffix: "/mo",
    description: "Perfect for a single location that wants simple, reliable review follow-up.",
    features: ["Up to 150 SMS/month", "Google Calendar connection", "Custom message template", "Email support"],
    ctaLabel: "Get Started",
    ctaHref: "/review-funnel/signup",
    ctaStyle: "solid" as const,
  },
  {
    name: "Growth",
    price: "$129",
    priceSuffix: "/mo",
    description: "For busy teams that want more monthly volume and room to grow.",
    features: ["Up to 500 SMS/month", "Everything in Starter", "Priority setup help", "Multi-location ready"],
    ctaLabel: "Get Started",
    ctaHref: "/review-funnel/signup",
    featured: true,
    badge: "MOST POPULAR",
    ctaStyle: "solid" as const,
  },
  {
    name: "Pro",
    price: "Contact Us",
    description: "For high-volume businesses that need custom limits and hands-on rollout support.",
    features: ["Unlimited monthly SMS", "Advanced routing options", "Custom onboarding", "Direct support"],
    ctaLabel: "Contact Us",
    ctaHref: "/contact",
    ctaStyle: "outline" as const,
  },
];

const comparisonRows = [
  {
    feature: "Asks after every appointment",
    manual: "Easy to forget when the day gets busy",
    funnel: "Automatic follow-up every time",
  },
  {
    feature: "Timing",
    manual: "Sent late, or not at all",
    funnel: "Sent at the right time without manual work",
  },
  {
    feature: "Consistency",
    manual: "Different wording from person to person",
    funnel: "One clear message in your brand voice",
  },
  {
    feature: "Owner visibility",
    manual: "Hard to know what was sent",
    funnel: "Track requests and responses in one place",
  },
  {
    feature: "Team effort",
    manual: "Constant reminders and follow-up tasks",
    funnel: "Set it once and let it run",
  },
];

const testimonials = [
  {
    title: "[Placeholder] HVAC Company",
    quote: "Add customer story here once first production testimonials are approved.",
  },
  {
    title: "[Placeholder] Med Spa",
    quote: "Add customer story here once first production testimonials are approved.",
  },
  {
    title: "[Placeholder] Dental Office",
    quote: "Add customer story here once first production testimonials are approved.",
  },
];

const faqs = [
  {
    question: "How long does setup take?",
    answer: "Most businesses can connect everything in about 5 minutes.",
  },
  {
    question: "Do I need to learn new software?",
    answer: "No. We keep it simple so you can run this without the tech headache.",
  },
  {
    question: "Can I edit the review text message?",
    answer: "Yes. You can customize the message so it sounds like your business.",
  },
  {
    question: "What if a customer replies STOP?",
    answer: "They are automatically opted out, and no more review texts are sent to that number.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Plans are month-to-month and you can cancel whenever you need to.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Review Funnel for Local Businesses | Autom8 Everything",
  description:
    "Get more 5-star reviews with automatic follow-up texts. Simple setup, clear pricing, and no tech headache.",
  path: "/services/review-funnel",
  keywords: [
    "review funnel",
    "google review automation",
    "review request text messages",
    "local business reputation",
    "set it and forget it reviews",
  ],
});

export default function ReviewFunnelPage() {
  const serviceSchema = buildServiceSchema({
    name: "Review Funnel",
    description:
      "Automated review follow-up for local businesses with SMS requests, simple setup, and monthly pricing.",
    path: "/services/review-funnel",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Review Funnel</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            More 5-star reviews, without the tech headache.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Review Funnel sends review requests automatically after each appointment, so you can set it and forget it while your online reputation keeps
            growing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/review-funnel/signup"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-8 py-4 text-center font-semibold text-white"
            >
              Get Started
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-center font-semibold text-white hover:border-[#8B5CF6]/60"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#A1A1AA]">Dead simple setup. Most businesses are live in about 5 minutes.</p>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Simple pricing
          </h2>
          <p className="text-[#A1A1AA] mb-10 max-w-3xl">
            Pick the plan that fits your monthly volume. No bloated setup process, no complicated dashboard work.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]" id="comparison">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Review Funnel vs manual follow-up
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-3xl">Manual follow-up breaks when your team gets busy. This keeps the process consistent every day.</p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0A0F]">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-5 py-4 text-sm font-semibold text-white">What matters</th>
                  <th className="px-5 py-4 text-sm font-semibold text-[#A1A1AA]">Manual follow-up</th>
                  <th className="px-5 py-4 text-sm font-semibold text-[#C4B5FD]">Review Funnel</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5 last:border-b-0">
                    <td className="px-5 py-4 text-sm font-medium text-white">{row.feature}</td>
                    <td className="px-5 py-4 text-sm text-[#A1A1AA]">{row.manual}</td>
                    <td className="px-5 py-4 text-sm text-[#DDD6FE]">{row.funnel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#8B5CF6] mb-3">Step {index + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Testimonials
          </h2>
          <p className="text-[#A1A1AA] mb-8">Placeholder section for approved customer quotes.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-[#0A0A0F] p-6">
                <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">{item.title}</p>
                <p className="text-[#A1A1AA] leading-relaxed">{item.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Ready to stop chasing reviews manually?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">Start now and be live in about 5 minutes.</p>
          <Link
            href="/review-funnel/signup"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-8 py-4 font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
