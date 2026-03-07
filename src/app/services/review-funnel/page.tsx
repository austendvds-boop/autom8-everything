import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MessageSquare, MessageSquareHeart, PhoneCall, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PlanCard from "@/components/review-funnel/PlanCard";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Connect Calendar",
    description:
      "Connect your Google Calendar once, and Review Funnel knows when appointments are done.",
    icon: Calendar,
  },
  {
    title: "Automatic Text",
    description:
      "A friendly text message goes out at the right time, so your team does not need to remember follow-up.",
    icon: MessageSquare,
  },
  {
    title: "Reviews Roll In",
    description:
      "Happy customers are guided straight to your Google review page in just a few taps.",
    icon: Star,
  },
];

const plans = [
  {
    name: "Starter",
    price: "$79",
    priceSuffix: "/month",
    description: "A simple starting plan for one connected calendar.",
    features: ["1 connected calendar", "150 text messages per month", "Automatic review requests after every appointment"],
    ctaLabel: "Get Started",
    ctaHref: "/review-funnel/signup",
    ctaStyle: "solid" as const,
  },
  {
    name: "Growth",
    price: "$149",
    priceSuffix: "/month",
    description: "Built for teams that need more connected calendars and messages.",
    features: ["Up to 5 connected calendars", "600 text messages per month", "Automatic review requests after every appointment"],
    ctaLabel: "Get Started",
    ctaHref: "/review-funnel/signup",
    featured: true,
    badge: "Most Popular",
    ctaStyle: "solid" as const,
  },
  {
    name: "Pro",
    price: "Let's talk",
    description: "For businesses that need a custom setup and extra support.",
    features: ["Unlimited calendars", "Custom message volume", "Priority support"],
    ctaLabel: "Contact Us",
    ctaHref: "mailto:aust@autom8everything.com",
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

// TODO: Replace with real client testimonials — use real first name and business name when available
const testimonials = [
  {
    title: "Home Services Team",
    quote: '"The text messages go out automatically, and we started getting more reviews without adding extra work for staff."',
  },
  {
    title: "Med Spa Owner",
    quote: '"Setup was simple. Customers get a friendly follow-up and we can see everything in one place."',
  },
  {
    title: "Dental Office Manager",
    quote: '"This helped us stay consistent and collect more 5-star reviews every month."',
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
    answer: "They are automatically opted out, and no more review text messages are sent to that number.",
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
      "Automated review follow-up for local businesses with text messages, simple setup, and monthly pricing.",
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
            Your Reputation Compounds. Every Review Brings the Next Customer.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Every 5-star review makes the next customer more likely to call. Review Funnel automates the ask so your reputation grows on autopilot.
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

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">Why Reviews Compound</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { stat: "93%", text: "of consumers read reviews before choosing a local business", source: "BrightLocal 2024" },
              { stat: "266%", text: "more revenue for businesses with 50+ reviews", source: "Womply Research" },
              { stat: "5-9%", text: "revenue increase per one-star improvement on Google", source: "Harvard Business School" },
            ].map((item) => (
              <div key={item.stat} className="card-base p-8 text-center">
                <p className="text-4xl font-bold gradient-text mb-3">{item.stat}</p>
                <p className="text-[#A1A1AA] text-sm mb-2">{item.text}</p>
                <p className="text-xs text-[#52525B]">Source: {item.source}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#A1A1AA]">
            {["More reviews", "Higher ranking", "More clicks", "More customers", "More reviews"].map((step, i, arr) => (
              <React.Fragment key={step + i}>
                <span className="px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#C4B5FD] font-medium">{step}</span>
                {i < arr.length - 1 && <span className="text-[#52525B]">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Simple pricing
          </h2>
          <p className="text-[#A1A1AA] mb-10 max-w-3xl">
            Pick the plan that fits your monthly volume. Setup is quick and day-to-day use stays simple.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.title} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-3 w-6 text-[#8B5CF6]/40">→</div>
                  )}
                  <article className="card-base p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center">
                      <StepIcon className="w-7 h-7 text-[#8B5CF6]" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#8B5CF6] mb-3">Step {index + 1}</p>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-[#A1A1AA]">{step.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Testimonials
          </h2>
          <p className="text-[#A1A1AA] mb-8">What business owners love about using Review Funnel.</p>
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
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">Common Concerns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                concern: "What if customers find it annoying?",
                answer:
                  "The text is friendly, well-timed, and sent once. Customers can opt out instantly. Most people appreciate the reminder.",
              },
              {
                concern: "Will this actually work for my business?",
                answer:
                  "If your customers have phones and use Google, yes. We have seen results across home services, dental, med spa, and professional services.",
              },
              {
                concern: "I don't have time to manage another tool.",
                answer:
                  "That is the point. Set it once, and Review Funnel runs itself. Check your dashboard when you want — or don't.",
              },
            ].map((item) => (
              <article key={item.concern} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-3 text-white">{item.concern}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-heading mb-4 text-center">Even Better Together: Cadence + Review Funnel</h2>
          <p className="section-subheading mx-auto text-center mb-10">
            Cadence answers your calls and captures customer info. Review Funnel follows up and collects reviews. Together, they keep your pipeline and
            reputation growing automatically.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                <PhoneCall className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <h3 className="font-semibold mb-2">Cadence</h3>
              <p className="text-sm text-[#A1A1AA]">Answers every call → captures customer info → sends you summaries</p>
            </div>
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
                <MessageSquareHeart className="w-6 h-6 text-[#06B6D4]" />
              </div>
              <h3 className="font-semibold mb-2">Review Funnel</h3>
              <p className="text-sm text-[#A1A1AA]">Follows up after service → asks for reviews → reputation compounds</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold mb-2">$278/mo combined</p>
            <p className="text-sm text-[#A1A1AA] mb-6">Cadence $199/mo + Review Funnel Starter $79/mo</p>
            <Link href="/contact" className="btn-primary text-lg px-10 py-4">
              Start with Both
            </Link>
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
