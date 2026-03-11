"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springSnappy } from "@/lib/motion";

export interface ShimmerButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-10 py-4 text-lg",
} as const;

const variantClasses = {
  primary: "bg-gradient-to-r from-[#D4A030] to-[#E8C068] text-[#0E1015] shimmer-btn",
  secondary: "bg-transparent border border-white/20 text-white hover:border-[#D4A030]/50",
} as const;

export default function ShimmerButton({
  children,
  href,
  onClick,
  ariaLabel,
  variant = "primary",
  size = "md",
  className,
}: ShimmerButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const classes = [
    "rounded-full font-semibold inline-flex items-center justify-center gap-2 will-change-transform select-none",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const interactionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: springSnappy,
      };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} className={classes} aria-label={ariaLabel} {...interactionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={classes} aria-label={ariaLabel} {...interactionProps}>
      {children}
    </motion.button>
  );
}
