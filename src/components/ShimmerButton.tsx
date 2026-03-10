"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springSnappy } from "@/lib/motion";

export interface ShimmerButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
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
  primary: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white shimmer-btn",
  secondary: "bg-transparent border border-white/20 text-white",
} as const;

export default function ShimmerButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
}: ShimmerButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const classes = [
    "rounded-full font-semibold inline-flex items-center justify-center gap-2 will-change-transform",
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
      <motion.a href={href} onClick={onClick} className={classes} {...interactionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={classes} {...interactionProps}>
      {children}
    </motion.button>
  );
}
