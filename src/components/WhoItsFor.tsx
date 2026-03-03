"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cardHover, reveal, revealReduced, revealStagger } from "@/lib/motion";

const audiences = [
  {
    title: "Owners who are tired of missed leads",
    description: "You are getting inquiries, but slow follow-up means jobs slip away.",
  },
  {
    title: "Teams with too much manual work",
    description: "Your staff is busy copying info, sending reminders, and chasing updates.",
  },
  {
    title: "Businesses ready for steady growth",
    description: "You want more calls every month, not random spikes that are hard to repeat.",
  },
];

export default function WhoItsFor() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-20" {...(prefersReducedMotion ? revealReduced : reveal)}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Who This Is <span className="gradient-text">For</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">
            Built for local business owners who want more calls, more booked jobs, and less missed follow-up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-[#111118] border border-white/[0.04] rounded-3xl p-8 hover:shadow-[0_0_80px_rgba(139,92,246,0.08)] transition-shadow duration-300"
              {...revealStagger(index, prefersReducedMotion)}
              {...(prefersReducedMotion ? {} : cardHover)}
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[#A1A1AA] text-[15px] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
