"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShimmerButton from "@/components/ShimmerButton";
import TiltCard from "@/components/TiltCard";
import { fadeUp, scaleIn, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const featuredScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 12, mass: 0.8 },
  },
};

const websiteTiers = [
  {
    name: "Launch",
    price: "$500",
    details: ["Up to 5 pages", "Mobile-ready", "Contact/booking form", "Basic on-page SEO"],
  },
  {
    name: "Enterprise",
    price: "$1,000",
    details: ["Up to 10 pages", "Everything in Launch", "Custom features", "Built for your workflow"],
    featured: true,
  },
];

const faqs = [
  {
    question: "Can I start with one product and add more later?",
    answer: "Yes. Most clients start with one service and expand as they grow.",
  },
  {
    question: "Do you lock me into long contracts?",
    answer: "No. Cadence and retainers are month-to-month. Builds are scoped project by project.",
  },
  {
    question: "How do I choose the right starting point?",
    answer: "Reach out and we will recommend the fastest win based on your business goals.",
  },
];

export default function PricingPageClient() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-semibold mb-6 will-change-transform"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Pricing
          </motion.h1>
          <motion.p
            className="text-xl text-[#A1A1AA] max-w-3xl mx-auto will-change-transform"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
          >
            Straightforward pricing so you can pick the right product now and grow from there.
          </motion.p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={scaleIn} className="will-change-transform">
              <TiltCard className="h-full">
                <article className="glass-card rounded-2xl border border-[#8B5CF6]/40 bg-[#12121A] p-8 h-full flex flex-col">
                  <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Cadence</p>
                  <h2 className="text-3xl font-semibold mb-2">$199/mo</h2>
                  <p className="text-[#A1A1AA] mb-6">7-day free trial included.</p>
                  <ShimmerButton href="/portal/checkout?product=cadence" className="w-fit mt-auto">
                    Start Free Trial
                  </ShimmerButton>
                </article>
              </TiltCard>
            </motion.div>

            <motion.div variants={scaleIn} className="will-change-transform">
              <TiltCard className="h-full">
                <article className="glass-card rounded-2xl border border-white/10 bg-[#12121A] p-8 h-full flex flex-col">
                  <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Review Funnel</p>
                  <h2 className="text-3xl font-semibold mb-2">$79/mo</h2>
                  <p className="text-[#A1A1AA] mb-6">Automatic review follow-ups after every job. Set it and forget it.</p>
                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <ShimmerButton href="/portal/checkout?product=review_funnel" className="w-fit">
                      Get More Reviews
                    </ShimmerButton>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          </motion.div>

          <article className="rounded-2xl border border-white/10 bg-[#12121A] p-8 h-full flex flex-col">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">Website Creation</p>
            <h2 className="text-3xl font-semibold mb-6">Launch / Enterprise</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {websiteTiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  variants={tier.featured ? featuredScale : scaleIn}
                  className={`rounded-xl p-5 border h-full flex flex-col will-change-transform ${tier.featured ? "border-[#8B5CF6]/50 bg-[#0A0A0F]" : "border-white/10 bg-[#0F0F16]"}`}
                >
                  <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-1">{tier.name}</p>
                  <p className="text-2xl font-semibold mb-3">{tier.price}</p>
                  <ul className="space-y-2 text-sm text-[#A1A1AA] flex-1">
                    {tier.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
            <ShimmerButton href="/contact" className="w-fit mt-auto">
              Get a Free Quote
            </ShimmerButton>
          </article>

          <motion.article
            className="rounded-2xl border border-white/10 bg-[#12121A] p-8 md:col-span-2 h-full flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3 will-change-transform" variants={fadeUp}>
              Monthly Plans
            </motion.p>
            <motion.h2 className="text-3xl font-semibold mb-2 will-change-transform" variants={fadeUp}>
              Add-on to any website
            </motion.h2>
            <motion.p className="text-[#A1A1AA] mb-6 will-change-transform" variants={fadeUp}>
              Keep your site running and growing after launch.
            </motion.p>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" variants={staggerContainer}>
              <motion.div variants={staggerItem} className="rounded-xl p-5 border border-white/10 bg-[#0F0F16] h-full flex flex-col will-change-transform">
                <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-1">Hosting</p>
                <p className="text-2xl font-semibold mb-3">$50<span className="text-base text-[#A1A1AA]">/mo</span></p>
                <ul className="space-y-2 text-sm text-[#A1A1AA] flex-1">
                  <li className="flex items-start gap-2.5"><Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden /><span>Hosting + uptime monitoring</span></li>
                  <li className="flex items-start gap-2.5"><Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden /><span>1 site edit per month</span></li>
                </ul>
              </motion.div>
              <motion.div variants={staggerItem} className="rounded-xl p-5 border border-[#8B5CF6]/50 bg-[#0A0A0F] h-full flex flex-col will-change-transform">
                <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-1">Growth</p>
                <p className="text-2xl font-semibold mb-3">$299<span className="text-base text-[#A1A1AA]">/mo</span></p>
                <ul className="space-y-2 text-sm text-[#A1A1AA] flex-1">
                  <li className="flex items-start gap-2.5"><Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden /><span>Everything in Hosting</span></li>
                  <li className="flex items-start gap-2.5"><Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden /><span>2 blog posts per month</span></li>
                  <li className="flex items-start gap-2.5"><Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden /><span>Google Business profile updates</span></li>
                  <li className="flex items-start gap-2.5"><Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden /><span>Local SEO optimization</span></li>
                  <li className="flex items-start gap-2.5"><Check className="h-4 w-4 shrink-0 mt-0.5 text-[#8B5CF6]" aria-hidden /><span>Monthly performance report</span></li>
                </ul>
              </motion.div>
            </motion.div>
            <ShimmerButton href="/contact" className="w-fit mt-auto">
              Get a Free Quote
            </ShimmerButton>
          </motion.article>

          <motion.article
            className="rounded-2xl border border-white/10 bg-[#12121A] p-8 h-full flex flex-col"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Custom Apps</p>
            <h2 className="text-3xl font-semibold mb-2">Custom Scope</h2>
            <p className="text-[#A1A1AA] mb-6">Bespoke app builds for your exact workflow and business needs.</p>
            <ShimmerButton href="/contact" className="w-fit mt-auto">
              Let's Talk
            </ShimmerButton>
          </motion.article>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-8 will-change-transform"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {faqs.map((faq) => (
              <motion.div key={faq.question} className="rounded-2xl border border-white/10 bg-[#0A0A0F] p-6 will-change-transform" variants={fadeUp}>
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
