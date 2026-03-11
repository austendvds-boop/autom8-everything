"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);

  return (
    <motion.div ref={ref} className="relative h-32 overflow-hidden pointer-events-none" style={{ opacity }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4A030]/[0.05] to-transparent" />
    </motion.div>
  );
}
