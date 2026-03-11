"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon, ClipboardList, Wrench, PhoneCall } from "lucide-react";
import { fadeUp, slideInLeft, slideInRight, springSnappy, staggerContainer, viewportOnce } from "@/lib/motion";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Tell Us About Your Business",
    description:
      "Quick call, 15 minutes. We figure out which tools make sense and what will get you results fastest.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "We Set Everything Up",
    description:
      "Live in days, not months. We handle all the technical work - you don't touch a thing.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "Customers Start Reaching You",
    description:
      "Calls answered, reviews coming in, rankings climbing. We keep optimizing every month.",
    icon: PhoneCall,
  },
];

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="pt-16 pb-24 md:pt-20 md:pb-24 relative overflow-hidden bg-[#0E1015]">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4A030]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12 md:mb-14"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[#9B978F] text-lg md:text-xl max-w-2xl mx-auto">Simple steps. Clear timeline. No technical work on your side.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={step.number}
                className="relative"
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                initial={prefersReducedMotion ? false : undefined}
              >
                {!isLast && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#D4A030] to-[#E8C068]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                )}

                <div className="text-center">
                  <motion.div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4A030]/20 text-[#D4A030] font-mono text-sm mb-6">
                    {step.number}
                  </motion.div>

                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-[#D4A030]/[0.12] border border-white/[0.04] flex items-center justify-center"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 5 }}
                    transition={springSnappy}
                  >
                    <Icon className="w-10 h-10 text-[#D4A030]" />
                  </motion.div>

                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#9B978F] text-[15px] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-10 md:mt-12"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Link href="#services" className="btn-secondary px-8 py-4">
            See Our Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
