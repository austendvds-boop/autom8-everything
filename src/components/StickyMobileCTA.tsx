"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, PhoneCall } from "lucide-react";
import ShimmerButton from "@/components/ShimmerButton";
import { springSmooth } from "@/lib/motion";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 80 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? undefined : springSmooth}
      style={{
        background: "rgba(14, 16, 21, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex gap-3 px-4 py-3 max-w-lg mx-auto">
        <ShimmerButton href="tel:+14806313993" ariaLabel="Call Cadence" className="flex-1 py-3">
          <PhoneCall className="w-4 h-4" />
          Call Now
        </ShimmerButton>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 text-white font-semibold text-sm"
          aria-label="Book a demo"
        >
          <Calendar className="w-4 h-4" />
          Book Demo
        </Link>
      </div>
    </motion.div>
  );
}
