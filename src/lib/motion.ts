export const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export const revealReduced = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

export const revealStagger = (index: number, reduced: boolean | null | undefined = false) => {
  const base = reduced ? revealReduced : reveal;
  return {
    ...base,
    transition: { ...base.transition, delay: index * 0.1 },
  };
};

export const cardHover = {
  whileHover: { y: -6, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
};

export const buttonHover = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};
