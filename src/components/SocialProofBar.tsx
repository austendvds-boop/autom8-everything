"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "TechCorp", color: "#8B5CF6" },
  { name: "DataFlow", color: "#06B6D4" },
  { name: "CloudSync", color: "#A78BFA" },
  { name: "AutoMax", color: "#10B981" },
  { name: "SmartOps", color: "#F59E0B" },
  { name: "Innovate", color: "#EF4444" },
];

const duplicatedLogos = [...logos, ...logos, ...logos];

export default function SocialProofBar() {
  return (
    <section className="py-12 bg-[#0A0A0F] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          className="text-center text-[#52525B] text-sm uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by 25+ businesses
        </motion.p>
        
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16"
            animate={{
              x: [0, -33.33 * 100],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center gap-2 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300"
              >
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ background: logo.color }}
                />
                <span className="text-xl font-semibold text-white whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
