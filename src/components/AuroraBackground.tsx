"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type OrbConfig = {
  className: string;
  background: string;
  animate: {
    x: number[];
    y: number[];
  };
  duration: number;
};

const orbConfigs: OrbConfig[] = [
  {
    className: "left-[-12%] top-[-14%] h-[22rem] w-[22rem] sm:h-[34rem] sm:w-[34rem]",
    background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.16) 45%, rgba(139, 92, 246, 0) 72%)",
    animate: {
      x: [0, 100, -50, 80, 0],
      y: [0, -80, 60, -40, 0],
    },
    duration: 20,
  },
  {
    className: "right-[-10%] top-[10%] h-[20rem] w-[20rem] sm:h-[32rem] sm:w-[32rem]",
    background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.14) 42%, rgba(6, 182, 212, 0) 74%)",
    animate: {
      x: [0, -110, 70, -60, 0],
      y: [0, 70, -50, 40, 0],
    },
    duration: 25,
  },
  {
    className: "left-1/2 top-[28%] h-[18rem] w-[18rem] -translate-x-1/2 sm:h-[28rem] sm:w-[28rem]",
    background: "radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, rgba(6, 182, 212, 0.12) 48%, rgba(139, 92, 246, 0) 75%)",
    animate: {
      x: [0, 20, -15, 10, 0],
      y: [0, -60, 50, -30, 0],
    },
    duration: 30,
  },
];

export default function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMobileState);
      return () => mediaQuery.removeEventListener("change", updateMobileState);
    }

    mediaQuery.addListener(updateMobileState);
    return () => mediaQuery.removeListener(updateMobileState);
  }, []);

  const visibleOrbs = isMobile ? orbConfigs.slice(0, 2) : orbConfigs;
  const blurClassName = isMobile ? "blur-[80px]" : "blur-[120px]";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {visibleOrbs.map((orb) => {
        const baseClassName = `absolute rounded-full ${blurClassName} ${orb.className}`;

        if (prefersReducedMotion) {
          return <div key={orb.className} className={baseClassName} style={{ background: orb.background }} />;
        }

        return (
          <motion.div
            key={orb.className}
            className={baseClassName}
            style={{ background: orb.background, willChange: "transform" }}
            animate={orb.animate}
            transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
