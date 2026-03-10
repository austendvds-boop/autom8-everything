"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { springSmooth } from "@/lib/motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 5,
  perspective = 800,
  scale = 1.02,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = containerRef.current;

    if (!node) return;

    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const percentX = offsetX / (rect.width / 2);
    const percentY = offsetY / (rect.height / 2);

    rotateY.set(percentX * maxTilt);
    rotateX.set(percentY * -maxTilt);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, springSmooth);
    animate(rotateY, 0, springSmooth);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        className="will-change-transform"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale }}
        whileTap={{ scale: 0.98 }}
        transition={springSmooth}
      >
        {children}
      </motion.div>
    </div>
  );
}
