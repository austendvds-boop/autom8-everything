"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import CadenceDemoPlaceholder from "@/components/CadenceDemoPlaceholder";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import ComparisonTable from "@/components/ComparisonTable";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShimmerButton from "@/components/ShimmerButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const features = [
  { title: "Answers Every Call", description: "No voicemail, no hold music. Customers get a real answer in seconds." },
  { title: "Handles Your FAQs", description: "Hours, services, pricing, next steps. Cadence knows your answers." },
  { title: "Routes Calls Intelligently", description: "Urgent? Transfer to you. Routine? Handle and summarize." },
  { title: "Sends Call Summaries", description: "Get a text or email after every call with who called, what they needed, and what happened." },
  { title: "Books and Schedules", description: "Cadence can collect info and schedule follow-ups based on your rules." },
  { title: "Works 24/7/365", description: "Nights, weekends, holidays. Your phone is always answered." },
];

export default function CadencePageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>AI Voice Receptionist</motion.p>
          <AnimatedHeadline text="Every Missed Call Is Money Walking Out the Door." className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }} />
          <motion.p className="text-xl text-[#A1A1AA] max-w-3xl" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Cadence answers your business calls in seconds day and night. No hold times. No voicemail. Just a professional voice that knows your business.
          </motion.p>
          <motion.div className="mt-8 flex flex-col sm:flex-row gap-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <ShimmerButton href="tel:+14806313993" size="lg">Call Cadence Live (480) 631-3993</ShimmerButton>
            <ShimmerButton href="/portal/checkout?product=cadence" variant="secondary" size="lg">Start Your 7-Day Free Trial</ShimmerButton>
          </motion.div>
        </div>
      </section>
      <CadenceDemoPlaceholder />
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Everything Cadence Does For You</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <ComparisonTable
        title="Cadence vs the Alternatives"
        subtitle="See how Cadence compares to what most businesses do today."
        columns={[{ label: "Voicemail" }, { label: "Hiring a Receptionist" }, { label: "Cadence", highlight: true }]}
        rows={[
          { feature: "Availability", values: ["When you remember to check", "Business hours only", "24/7/365"] },
          { feature: "Monthly cost", values: ["Free (but costly)", "$2,500-$4,000+", "$199/mo"] },
          { feature: "Setup time", values: ["Instant", "Weeks to hire + train", "5 minutes"] },
        ]}
      />
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 className="section-heading mb-8" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Frequently Asked Questions</motion.h2>
          <motion.div className="space-y-4" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {[
              { question: "Do I need a new phone number?", answer: "No. You can keep your current number and forward calls to Cadence." },
              { question: "How long does setup take?", answer: "Most businesses are live the same day. Onboarding typically takes about 5 minutes." },
              { question: "Can Cadence transfer urgent calls to me?", answer: "Yes. You can set rules for when a call should go straight to you or your team." },
              { question: "Is there a long-term contract?", answer: "No. Cadence is month-to-month. Cancel anytime." },
              { question: "What happens after the trial?", answer: "If you keep it, your plan moves to $199/month. If not, you can cancel before billing starts." },
            ].map((faq) => (
              <motion.div key={faq.question} variants={staggerItem} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 className="section-heading mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Ready to Stop Losing Calls?</motion.h2>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <ShimmerButton href="tel:+14806313993" size="lg">Call (480) 631-3993</ShimmerButton>
            <ShimmerButton href="/portal/checkout?product=cadence" variant="secondary" size="lg">Start Your Free Trial Online</ShimmerButton>
          </motion.div>
        </div>
      </section>
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
