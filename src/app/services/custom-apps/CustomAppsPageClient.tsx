"use client";

import { Clock, ShieldCheck, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShimmerButton from "@/components/ShimmerButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const roiItems = [
  { title: "Time Saved", description: "If your team spends 5 hours per week on a manual process, a custom tool pays for itself in months.", icon: Clock },
  { title: "Errors Eliminated", description: "Automated workflows don't forget steps, miss follow-ups, or enter data wrong.", icon: ShieldCheck },
  { title: "Competitive Edge", description: "Your competitors use the same off-the-shelf tools. A custom build is yours alone.", icon: Zap },
];

export default function CustomAppsPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Custom Apps</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }} variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            When Off-the-Shelf Tools Don&apos;t Fit, We Build What Does.
          </motion.h1>
          <motion.p className="text-xl text-[#A1A1AA] max-w-3xl" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Scrapers, dashboards, automations, internal tools - if it saves you time or makes you money, we can build it.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 mt-8" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <ShimmerButton href="/contact" size="lg">Let&apos;s Talk</ShimmerButton>
            <ShimmerButton href="#how-it-works" variant="secondary" size="lg">How It Works</ShimmerButton>
          </motion.div>
        </div>
      </section>
      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>The ROI of a Custom Tool</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {roiItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={staggerItem} className="card-base p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-[#12121A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 className="section-heading mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Need a custom tool built around your process?</motion.h2>
          <ShimmerButton href="/contact" size="lg">Let&apos;s Talk</ShimmerButton>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 className="section-heading mb-8" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>Frequently Asked Questions</motion.h2>
          <motion.div className="space-y-4" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {[
              { question: "What kinds of apps do you build?", answer: "Dashboards, lead tools, workflow automations, booking tools, and other business-specific systems." },
              { question: "Can you build something like a realtor scraper?", answer: "Yes. That is exactly the kind of custom build we handle." },
              { question: "How is pricing handled?", answer: "After a consultation, we give you a clear project scope and quote." },
              { question: "Do you support the app after launch?", answer: "Yes. We can support updates, fixes, and new features after go-live." },
            ].map((faq) => (
              <motion.div key={faq.question} variants={staggerItem} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
