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
    background: "radial-gradient(circle, rgba(212, 160, 48, 0.22) 0%, rgba(212, 160, 48, 0.10) 45%, rgba(212, 160, 48, 0) 72%)",
    animate: { x: [0, 80, -40, 60, 0], y: [0, -60, 50, -30, 0] },
    duration: 20,
  },
  {
    className: "right-[-10%] top-[10%] h-[20rem] w-[20rem] sm:h-[32rem] sm:w-[32rem]",
    background: "radial-gradient(circle, rgba(232, 192, 104, 0.16) 0%, rgba(232, 192, 104, 0.08) 42%, rgba(232, 192, 104, 0) 74%)",
    animate: { x: [0, -90, 60, -50, 0], y: [0, 50, -40, 30, 0] },
    duration: 25,
  },
  {
    className: "left-1/2 top-[28%] h-[18rem] w-[18rem] -translate-x-1/2 sm:h-[28rem] sm:w-[28rem]",
    background: "radial-gradient(circle, rgba(184, 137, 42, 0.14) 0%, rgba(212, 160, 48, 0.07) 48%, rgba(184, 137, 42, 0) 75%)",
    animate: { x: [0, 15, -12, 8, 0], y: [0, -50, 40, -25, 0] },
    duration: 30,
  },
];

export default function GradientMesh() {
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
