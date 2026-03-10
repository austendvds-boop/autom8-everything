"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useSpring } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const stats: Stat[] = [
  { value: 25, suffix: "+", label: "Local Businesses Served" },
  { value: 500, suffix: "+", label: "Hours Given Back to Teams" },
  { value: 24, suffix: " hrs", label: "Typical Lead Response Setup" },
  { value: 5, suffix: "/5", label: "Client Satisfaction Rating", decimals: 1 },
];

function Counter({ value, suffix, label, inView, decimals }: { value: number; suffix: string; label: string; inView: boolean; decimals?: number }) {
  const [count, setCount] = useState(0);
  const motionValue = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setCount(latest);
  });

  const baseDisplayValue = value >= 100 ? Math.floor(count) : count;
  const displayValue = typeof decimals === "number" ? baseDisplayValue.toFixed(decimals) : baseDisplayValue;

  return (
    <div className="text-center will-change-transform">
      <div className="text-5xl md:text-7xl font-bold gradient-text mb-2 will-change-transform">
        {displayValue}{suffix}
      </div>
      <div className="text-[#A1A1AA] text-lg">{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#0A0A0F] relative" ref={ref}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="will-change-transform">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={inView}
                decimals={stat.decimals}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
