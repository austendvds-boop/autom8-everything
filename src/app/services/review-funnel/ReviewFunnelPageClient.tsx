"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShimmerButton from "@/components/ShimmerButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/motion";

const steps = [
  {
    title: "Connect your calendar",
    description: "Link your Google Calendar so we know when appointments end.",
  },
  {
    title: "Customer gets a text",
    description: "A few minutes after their appointment, they receive a text asking to rate 1-5.",
  },
  {
    title: "5 stars -> Google review",
    description: "Happy customers get sent straight to your Google review page.",
  },
  {
    title: "1-4 stars -> Promo code",
    description: "Unhappy customers get a reason to come back instead of posting a bad review.",
  },
  {
    title: "Track it all",
    description: "See ratings, reviews, and redemptions in your dashboard.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$79/mo",
    features: [
      "Unlimited calendars",
      "200 texts per month",
      "Automatic review requests",
    ],
    ctaLabel: "Sign Up Now",
    href: "/review-funnel/signup?plan=starter",
  },
  {
    name: "Growth",
    price: "$149/mo",
    features: [
      "Unlimited calendars",
      "500 texts per month",
      "24-hour follow-up nudge",
      "Automatic review requests",
    ],
    ctaLabel: "Sign Up Now",
    href: "/review-funnel/signup?plan=growth",
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "Contact Us",
    features: [
      "Unlimited calendars",
      "Custom message volume",
      "Priority support",
    ],
    ctaLabel: "Contact Us",
    href: "/contact",
  },
];

const faqs = [
  { question: "How long does setup take?", answer: "Most businesses can connect everything in about 5 minutes." },
  { question: "Do I need to learn new software?", answer: "No. We keep it simple so you can run this without the tech headache." },
  { question: "Can I edit the review text message?", answer: "Yes. You can customize the message so it sounds like your business." },
  {
    question: "What happens with negative feedback?",
    answer: "Instead of a public 1-star review, unhappy customers get a promo code to come back. You keep the feedback private and turn a bad experience into a second chance.",
  },
  { question: "Can I cancel anytime?", answer: "Yes. Plans are month-to-month and you can cancel whenever you need to." },
];

export default function ReviewFunnelPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Review Funnel</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }} variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Your Reputation Compounds. Every Review Brings the Next Customer.
          </motion.h1>
          <motion.p className="text-xl text-[#A1A1AA] max-w-3xl mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Every 5-star review makes the next customer more likely to call. Review Funnel automates the ask so your reputation grows on autopilot.
          </motion.p>
          <motion.p className="text-lg text-white max-w-3xl" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Turn unhappy customers into repeat business. Turn happy ones into 5-star reviews.
          </motion.p>
          <motion.div className="mt-8 flex flex-col sm:flex-row gap-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <ShimmerButton href="/review-funnel/signup" size="lg">Sign Up Now</ShimmerButton>
            <ShimmerButton href="#pricing" variant="secondary" size="lg">See Plans</ShimmerButton>
          </motion.div>
        </div>
      </section>
      <section id="how-it-works" className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>How It Works</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {steps.map((step, index) => (
              <motion.article key={step.title} variants={scaleIn} className="card-base p-6 h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4A030]/40 bg-[#0A0A0F] text-sm font-semibold text-[#D4A030]">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.article className="card-base p-8 md:p-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <p className="text-lg font-semibold text-white mb-3">Bad experience? Instead of a 1-star review, they get a reason to come back.</p>
            <p className="text-[#A1A1AA]">
              Every unhappy customer is an opportunity. Instead of losing them to a public complaint, you keep the feedback private and give them a reason to try again.
            </p>
          </motion.article>
        </div>
      </section>
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <h2 className="section-heading mb-4">Simple pricing</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {pricingTiers.map((tier) => (
              <motion.article key={tier.name} variants={scaleIn} className={`card-base p-6 h-full flex flex-col ${tier.badge ? "border-[#D4A030]/40 shadow-[0_0_40px_rgba(212,160,48,0.08)]" : ""}`}>
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-2xl font-semibold">{tier.name}</h3>
                    {tier.badge ? (
                      <span className="rounded-full border border-[#D4A030]/40 bg-[#D4A030]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#D4A030]">
                        {tier.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-3xl font-bold text-white">{tier.price}</p>
                </div>
                <ul className="space-y-3 text-sm text-[#A1A1AA] mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-[#D4A030]" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <ShimmerButton href={tier.href} className="w-full justify-center">
                  {tier.ctaLabel}
                </ShimmerButton>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 className="section-heading mb-8" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Frequently asked questions</motion.h2>
          <motion.div className="space-y-4" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {faqs.map((faq) => (
              <motion.article key={faq.question} variants={scaleIn} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }} variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Ready to turn every appointment into a growth opportunity?
          </motion.h2>
          <ShimmerButton href="/review-funnel/signup" size="lg">Sign Up Now</ShimmerButton>
        </div>
      </section>
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
