"use client";

import { motion, useReducedMotion } from "framer-motion";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

const stats = [
  { value: "25+", label: "Businesses Served" },
  { value: "24-Hour", label: "Setup" },
  { value: "5.0/5", label: "Client Rating" },
];

export default function SocialProofBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-8 bg-[#0A0A0F] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p className="text-center text-[#A1A1AA] text-sm uppercase tracking-widest mb-6" {...(prefersReducedMotion ? revealReduced : reveal)}>
          Helping 25+ local businesses get more calls every month
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-[#111118] px-6 py-4 text-center"
              {...revealStagger(index, prefersReducedMotion)}
            >
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-[#A1A1AA]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
