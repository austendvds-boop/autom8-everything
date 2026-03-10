"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function ScrollFade() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);

  return (
    <motion.div ref={ref} className="relative h-32 overflow-hidden pointer-events-none" style={prefersReducedMotion ? undefined : { opacity }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/[0.05] to-transparent" />
    </motion.div>
  );
}
