import type { Variants } from "framer-motion";

const easeExpoOut = [0.16, 1, 0.3, 1] as const;
const easeStandard = [0.4, 0, 0.2, 1] as const;

// Spring configs
export const springSmooth = { type: "spring" as const, stiffness: 100, damping: 20, mass: 0.5 };
export const springSnappy = { type: "spring" as const, stiffness: 400, damping: 25 };
export const springDramatic = { type: "spring" as const, stiffness: 80, damping: 15 };

// Viewport config
export const viewportOnce = { once: true, margin: "-80px" as const };

// Variant objects
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeExpoOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeExpoOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: springSmooth },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeExpoOut } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeExpoOut } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springSmooth },
};

export const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { duration: 0.8, ease: easeExpoOut },
};

export const revealReduced = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: viewportOnce,
  transition: { duration: 0.4, ease: easeExpoOut },
};

export const revealStagger = (index: number, reduced: boolean | null | undefined = false) => {
  const base = reduced ? revealReduced : reveal;
  return {
    ...base,
    transition: { ...base.transition, delay: index * 0.1 },
  };
};

export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.3, ease: easeStandard } },
};

export const buttonHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: springSnappy,
};

export const textLineReveal = (lineIndex: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeExpoOut, delay: lineIndex * 0.06 },
  },
});
