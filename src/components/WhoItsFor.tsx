"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame, HardHat, Heart, Home, Scale, Sparkles } from "lucide-react";
import { buttonHover, cardHover, fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const verticals = [
  {
    title: "HVAC & Plumbing",
    description: "Answer emergency calls 24/7. Win reviews after every service visit.",
    icon: Flame,
  },
  {
    title: "Roofing & Landscaping",
    description: "Never miss a storm-season lead. Build your reputation job by job.",
    icon: Home,
  },
  {
    title: "Dental & Medical",
    description: "Keep your front desk focused on patients, not phone tag.",
    icon: Heart,
  },
  {
    title: "Med Spa & Wellness",
    description: "Fill your appointment book without chasing leads manually.",
    icon: Sparkles,
  },
  {
    title: "Legal & Professional",
    description: "Capture every intake call. Route to the right person instantly.",
    icon: Scale,
  },
  {
    title: "General Contractors",
    description: "One number, always answered. Summaries after every call.",
    icon: HardHat,
  },
];

export default function WhoItsFor() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="pt-14 pb-20 md:pt-20 md:pb-24 bg-[#0E1015]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12 md:mb-14"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
            Built for Local Businesses That Rely on Calls and Reviews
          </h2>
          <p className="text-[#9B978F] text-lg md:text-xl max-w-3xl mx-auto">
            Whether you run a crew, manage a front desk, or own a practice — Autom8 is built for operators like you.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {verticals.map((vertical) => {
            const Icon = vertical.icon;
            return (
              <motion.div
                key={vertical.title}
                className="card-base rounded-3xl p-7 border border-white/[0.06] hover:shadow-[0_0_40px_rgba(212,160,48,0.20)] hover:border-[rgba(212,160,48,0.30)] transition-all duration-300"
                variants={staggerItem}
                {...(prefersReducedMotion ? {} : cardHover)}
              >
                <div className="w-11 h-11 rounded-xl bg-[rgba(212,160,48,0.10)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#D4A030]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{vertical.title}</h3>
                <p className="text-[#9B978F] text-[15px] leading-relaxed">{vertical.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.a
            href="/contact"
            className="btn-secondary px-8 py-4"
            {...(prefersReducedMotion ? {} : buttonHover)}
          >
            See How It Works for Your Industry
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
