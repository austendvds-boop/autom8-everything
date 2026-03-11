"use client";

import { Fragment, type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  staggerDelay?: number;
  startDelay?: number;
  style?: CSSProperties;
  gradientWords?: string[];
}

const wordVariant: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const gradientStyle: CSSProperties = {
  background: "linear-gradient(135deg, #D4A030, #E8C068)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function AnimatedHeadline({
  text,
  className,
  as = "h1",
  staggerDelay = 0.08,
  startDelay = 0,
  style,
  gradientWords,
}: AnimatedHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;
  const MotionTag = as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.h1;

  // Strip punctuation for matching (e.g., "Losing" matches "Losing.")
  const isGradientWord = (word: string) => {
    if (!gradientWords || gradientWords.length === 0) return false;
    const stripped = word.replace(/[^a-zA-Z]/g, "");
    return gradientWords.some((gw) => stripped === gw);
  };

  if (prefersReducedMotion) {
    return (
      <Tag className={className} style={style}>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            {isGradientWord(word) ? <span style={gradientStyle}>{word}</span> : word}
            {index < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        ...staggerContainer,
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: startDelay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              variants={wordVariant}
              style={isGradientWord(word) ? gradientStyle : undefined}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
