"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Hours Saved This Year" },
  { value: 25, suffix: "+", label: "Businesses Automated" },
  { value: 99.9, suffix: "%", label: "Uptime Guaranteed" },
  { value: 4.9, suffix: "/5", label: "Average Rating" },
];

function Counter({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  const displayValue = value >= 100 ? Math.floor(count) : count;

  return (
    <div className="text-center">
      <div className="text-5xl md:text-7xl font-bold gradient-text mb-2">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={inView}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
