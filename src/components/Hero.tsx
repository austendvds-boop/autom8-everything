"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import GradientMesh from "@/components/GradientMesh";
import BrandLogo from "@/components/BrandLogo";
import { buttonHover, fadeUp, revealReduced, springSmooth, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const ctaVariants = {
  hidden: fadeUp.hidden,
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...(staggerContainer.visible && "transition" in staggerContainer.visible ? staggerContainer.visible.transition : {}),
      delay: 0.9,
      ...springSmooth,
    },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 500], [0, -150]);

  const fadeUpProps = prefersReducedMotion
    ? revealReduced
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
        variants: fadeUp,
      };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0E1015]">
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { y: meshY }}>
        <GradientMesh />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
        <motion.div className="mb-6 flex justify-center" {...fadeUpProps}>
          <BrandLogo
            size="sm"
            showDescriptor={false}
            className="rounded-full border border-white/10 bg-[rgba(22,25,32,0.80)] px-4 py-2 backdrop-blur-xl"
          />
        </motion.div>

        <motion.p className="text-xs uppercase tracking-[0.12em] font-semibold text-[#D4A030] mb-4" {...fadeUpProps}>
          Tools for local businesses
        </motion.p>

        <AnimatedHeadline
          text="Stop Losing Calls. Start Winning Customers."
          as="h1"
          className="text-[2.5rem] md:text-[4.5rem] lg:text-[5rem] font-extrabold tracking-[-0.03em] leading-[1.1] mb-6"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
          gradientWords={["Losing", "Winning"]}
        />

        <motion.p
          className="text-lg md:text-xl text-[#9B978F] max-w-3xl mx-auto mb-10"
          {...(prefersReducedMotion
            ? revealReduced
            : {
                initial: "hidden" as const,
                whileInView: "visible" as const,
                viewport: viewportOnce,
                variants: fadeUp,
                transition: { ...springSmooth, delay: 0.6 },
              })}
        >
          Answer every call, collect more reviews, and get found online — without the tech headache.
        </motion.p>

        <motion.div
          className="flex items-center justify-center"
          {...(prefersReducedMotion
            ? revealReduced
            : {
                initial: "hidden" as const,
                whileInView: "visible" as const,
                viewport: viewportOnce,
                variants: ctaVariants,
              })}
        >
          <motion.a
            href="#services"
            className="btn-primary text-lg px-12 py-4 shadow-[0_0_30px_rgba(212,160,48,0.3)]"
            variants={prefersReducedMotion ? undefined : staggerItem}
            {...(prefersReducedMotion ? {} : buttonHover)}
          >
            Explore Products
          </motion.a>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-[#9B978F] flex items-center justify-center gap-3 flex-wrap"
          {...(prefersReducedMotion
            ? revealReduced
            : {
                initial: "hidden" as const,
                whileInView: "visible" as const,
                viewport: viewportOnce,
                variants: fadeUp,
                transition: { ...springSmooth, delay: 1.1 },
              })}
        >
          <span>7-day free trial</span>
          <span className="text-white/15">·</span>
          <span>No contracts</span>
          <span className="text-white/15">·</span>
          <span>Setup in 5 minutes</span>
        </motion.p>
      </div>
    </section>
  );
}
