"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, PhoneCall } from "lucide-react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex gap-3 px-4 py-3 max-w-lg mx-auto">
        <a
          href="tel:+14806313993"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold text-sm"
          aria-label="Call Cadence"
        >
          <PhoneCall className="w-4 h-4" />
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 text-white font-semibold text-sm"
          aria-label="Book a demo"
        >
          <Calendar className="w-4 h-4" />
          Book Demo
        </Link>
      </div>
    </div>
  );
}
