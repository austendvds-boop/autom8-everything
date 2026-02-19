"use client";

import { motion } from "framer-motion";
import { LucideIcon, Search, Wrench, Rocket } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "We Discover",
    description: "We analyze your current workflows and identify automation opportunities.",
    icon: Search,
  },
  {
    number: "02",
    title: "We Build",
    description: "Custom automation workflows tailored to your business.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "You Scale",
    description: "Watch your business grow while we handle the repetitive work.",
    icon: Rocket,
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Three simple steps to transform your business operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Connector line */}
                {!isLast && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                )}

                <div className="text-center">
                  {/* Step number */}
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] font-mono text-sm mb-6"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#1A1A23] border border-white/10 flex items-center justify-center group-hover:border-[#8B5CF6]/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: index === 1 ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-10 h-10 text-[#8B5CF6]" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#A1A1AA] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
