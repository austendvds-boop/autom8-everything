"use client";

import { motion, useReducedMotion } from "framer-motion";
import { reveal, revealReduced } from "@/lib/motion";

const proofStats = [
  {
    stat: "80%",
    context: "of callers won't leave a voicemail",
    source: "Ruby Receptionist",
  },
  {
    stat: "$1,000+",
    context: "average value of a missed service call",
    source: "Industry average",
  },
  {
    stat: "93%",
    context: "of consumers read reviews before choosing",
    source: "BrightLocal 2024",
  },
];

export default function ProofBar() {
  const prefersReducedMotion = useReducedMotion();
  const revealPreset = prefersReducedMotion ? revealReduced : reveal;

  return (
    <section className="py-12 bg-[#12121A] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proofStats.map((item) => (
            <motion.div key={item.stat} className="text-center" {...revealPreset}>
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{item.stat}</p>
              <p className="text-[#A1A1AA] text-sm mb-1">{item.context}</p>
              <p className="text-[#52525B] text-xs">Source: {item.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
