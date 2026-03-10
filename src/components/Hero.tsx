"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PhoneCall } from "lucide-react";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import AuroraBackground from "@/components/AuroraBackground";
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
  const auroraY = useTransform(scrollY, [0, 500], [0, -150]);

  const fadeUpProps = prefersReducedMotion
    ? revealReduced
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
        variants: fadeUp,
      };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { y: auroraY }}>
        <AuroraBackground />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
        <motion.div className="mb-8 flex justify-center" {...fadeUpProps}>
          <BrandLogo
            size="md"
            showDescriptor={false}
            className="rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur"
          />
        </motion.div>

        <motion.p className="text-sm uppercase tracking-widest text-[#8B5CF6] mb-4" {...fadeUpProps}>
          Tools for local businesses
        </motion.p>

        <AnimatedHeadline
          text="Stop Losing Calls. Start Winning Customers."
          as="h1"
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.02em] leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        />

        <motion.p
          className="text-xl md:text-2xl text-[#A1A1AA] max-w-4xl mx-auto mb-10"
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
          Answer every call, collect more reviews, and get found online - without the tech headache.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            href="tel:+14806313993"
            className="btn-primary text-lg gap-2 px-10 py-4 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            variants={prefersReducedMotion ? undefined : staggerItem}
            {...(prefersReducedMotion ? {} : buttonHover)}
          >
            <PhoneCall className="w-5 h-5" />
            Call Cadence Live
          </motion.a>

          <motion.a
            href="#services"
            className="btn-secondary text-lg px-8 py-4"
            variants={prefersReducedMotion ? undefined : staggerItem}
            {...(prefersReducedMotion ? {} : buttonHover)}
          >
            See Our Products
          </motion.a>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-[#A1A1AA] flex items-center justify-center gap-3 flex-wrap"
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
          <span className="text-white/20">•</span>
          <span>No contracts</span>
          <span className="text-white/20">•</span>
          <span>Setup in 5 minutes</span>
        </motion.p>
      </div>
    </section>
  );
}
