"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShimmerButton from "@/components/ShimmerButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/motion";

const benefits = [
  "Every 5-star review makes the next customer more likely to call.",
  "Automatic follow-up every time without extra staff work.",
  "Happy customers are guided straight to your Google review page.",
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
          <motion.p className="text-xl text-[#A1A1AA] max-w-3xl" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Every 5-star review makes the next customer more likely to call. Review Funnel automates the ask so your reputation grows on autopilot.
          </motion.p>
          <motion.div className="mt-8 flex flex-col sm:flex-row gap-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <ShimmerButton href="/portal/checkout?product=review_funnel" size="lg">Get More Reviews</ShimmerButton>
            <ShimmerButton href="#how-it-works" variant="secondary" size="lg">See How It Works</ShimmerButton>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Why Reviews Compound</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {benefits.map((benefit) => (
              <motion.article key={benefit} variants={scaleIn} className="card-base p-6">
                <p className="text-[#A1A1AA]">{benefit}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <section id="how-it-works" className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 className="section-heading mb-6" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Simple pricing</motion.h2>
          <motion.p className="text-4xl font-bold mb-6" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>$79/mo</motion.p>
          <ShimmerButton href="/portal/checkout?product=review_funnel" size="lg">Get More Reviews</ShimmerButton>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 className="section-heading mb-8" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Frequently asked questions</motion.h2>
          <motion.div className="space-y-4" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {[
              { question: "How long does setup take?", answer: "Most businesses can connect everything in about 5 minutes." },
              { question: "Do I need to learn new software?", answer: "No. We keep it simple so you can run this without the tech headache." },
              { question: "Can I edit the review text message?", answer: "Yes. You can customize the message so it sounds like your business." },
              { question: "Can I cancel anytime?", answer: "Yes. Plans are month-to-month and you can cancel whenever you need to." },
            ].map((faq) => (
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
            Ready to stop chasing reviews manually?
          </motion.h2>
          <ShimmerButton href="/portal/checkout?product=review_funnel" size="lg">Get More Reviews</ShimmerButton>
        </div>
      </section>
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
