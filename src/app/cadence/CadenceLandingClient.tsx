"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShimmerButton from "@/components/ShimmerButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const features = [
  {
    title: "Answers Every Call",
    description: "No voicemail, no hold music. Customers get a real answer in seconds, 24/7/365.",
  },
  {
    title: "Knows Your Business",
    description:
      "Hours, services, pricing, FAQs - Cadence learns your answers so customers get the right info every time.",
  },
  {
    title: "Routes Urgent Calls",
    description:
      "Set your own rules for when a call goes straight to you or your team. Everything else is handled.",
  },
  {
    title: "Sends Call Summaries",
    description: "Get a text or email after every call with who called, what they needed, and what Cadence did.",
  },
  {
    title: "Books and Schedules",
    description: "Cadence can collect contact info and help customers take the next step - no extra tools needed.",
  },
  {
    title: "5-Minute Setup",
    description: "Tell us about your business, pick an area code, and you're live. No hardware, no IT, no contracts.",
  },
] as const;

const steps = [
  {
    title: "Tell Us About Your Business",
    description:
      "Fill out a quick form with your hours, services, and how you want calls handled. Takes about 5 minutes.",
  },
  {
    title: "We Set Up Your AI Receptionist",
    description:
      "Cadence gets a local phone number and learns your business details. You can test it before going live.",
  },
  {
    title: "Start Answering Calls",
    description:
      "Forward your existing number to Cadence or share your new number. Every call is answered, summarized, and tracked.",
  },
] as const;

const pricingFeatures = [
  "Unlimited calls",
  "24/7/365 coverage",
  "Call summaries via text or email",
  "Your own local phone number",
] as const;

export default function CadenceLandingClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0E1015] pb-20 md:pb-0">
      <Navigation />

      <section className="mesh-bg pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            className="text-sm uppercase tracking-wide text-[#D4A030] mb-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            AI Voice Receptionist
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-semibold mb-6 text-[#EDEBE8]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Stop Losing Customers to Voicemail
          </motion.h1>
          <motion.p
            className="text-xl text-[#9B978F] max-w-3xl mb-8"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Cadence answers your business calls in seconds - day and night. No hold times, no voicemail, no missed
            revenue. Just a professional voice that knows your business.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ShimmerButton href="/portal/checkout?product=cadence" size="lg">
              Start Your 7-Day Free Trial
            </ShimmerButton>
            <ShimmerButton href="tel:+14806313993" variant="secondary" size="lg">
              Call Cadence Live: (480) 631-3993
            </ShimmerButton>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#161920] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            className="section-heading mb-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Hear Cadence in Action
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto mb-8"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Call our demo line and experience what your customers will hear.
          </motion.p>
          <motion.a
            href="tel:+14806313993"
            className="btn-primary inline-flex text-lg px-10 py-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Call (480) 631-3993
          </motion.a>
          <motion.p
            className="text-sm text-[#5E5B56] mt-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Free. No signup required. Just dial and listen.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="section-heading mb-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Everything Cadence Does For You
          </motion.h2>
          <motion.p
            className="section-subheading mb-12"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            One tool. No apps to install. No staff to train.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem} className="card-base p-6">
                <h3 className="text-lg font-semibold text-[#EDEBE8] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#9B978F] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#161920] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            className="section-heading mb-12 text-center"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            How It Works
          </motion.h2>
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={staggerItem} className="flex items-start gap-6">
                <span className="w-12 h-12 rounded-full bg-[#D4A030]/10 flex items-center justify-center text-lg text-[#D4A030] font-semibold shrink-0">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-[#EDEBE8] mb-2">{step.title}</h3>
                  <p className="text-[#9B978F]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            className="section-heading mb-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Simple Pricing
          </motion.h2>
          <motion.p
            className="text-5xl font-semibold text-[#EDEBE8] mb-2"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            $199<span className="text-2xl text-[#9B978F]">/mo</span>
          </motion.p>
          <motion.p
            className="text-[#9B978F] mb-8"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            7-day free trial included. No contract. Cancel anytime.
          </motion.p>
          <motion.div
            className="max-w-md mx-auto space-y-4 mb-8"
            variants={staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            {pricingFeatures.map((feature) => (
              <motion.div
                key={feature}
                variants={staggerItem}
                className="flex items-center gap-3 text-[#EDEBE8] justify-center"
              >
                <Check className="h-5 w-5 text-[#D4A030]" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ShimmerButton href="/portal/checkout?product=cadence">Start Your Free Trial</ShimmerButton>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#161920] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="section-heading mb-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Ready to Stop Losing Calls?
          </motion.h2>
          <motion.p
            className="text-xl text-[#9B978F] mb-8"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Set up in 5 minutes. Try it free for 7 days.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ShimmerButton href="/portal/checkout?product=cadence" size="lg">
              Start Free Trial
            </ShimmerButton>
            <ShimmerButton href="tel:+14806313993" variant="secondary" size="lg">
              Call (480) 631-3993
            </ShimmerButton>
          </motion.div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
