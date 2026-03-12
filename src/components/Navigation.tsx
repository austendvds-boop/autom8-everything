"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { buttonHover, scaleIn } from "@/lib/motion";

const productLinks = [
  { href: "/cadence", label: "Cadence" },
  { href: "/services/review-funnel", label: "Review Funnel" },
  { href: "/services/website-creation", label: "Website Creation" },
  { href: "/services/seo-content", label: "SEO & Content" },
  { href: "/services/custom-apps", label: "Custom Apps" },
];

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const background = useMotionTemplate`rgba(14, 16, 21, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const border = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderOpacity})`;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 px-3 transition-[background-color,border-color,box-shadow] duration-300 md:px-4 ${isScrolled ? "pt-3" : "pt-0"}`}
        initial={prefersReducedMotion ? { opacity: 0 } : { y: -100 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className={`mx-auto flex h-16 items-center justify-between gap-3 border border-transparent px-6 transition-[background-color,border-color,backdrop-filter] duration-300 ${isScrolled ? "glass max-w-4xl rounded-full border-white/10 px-5 overflow-visible" : "max-w-7xl"}`}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  background,
                  backdropFilter,
                  WebkitBackdropFilter: backdropFilter,
                  border,
                  scale: navScale,
                }
          }
        >
          <BrandLogo size="sm" showDescriptor={false} className="shrink-0" />

          <nav className="hidden items-center gap-8 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
              onFocusCapture={() => setIsProductsOpen(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsProductsOpen(false);
                }
              }}
            >
              <button className="relative inline-flex items-center gap-1 text-[#9B978F] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A030]">
                Products <span className="text-xs">▼</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4A030] transition-[width] duration-300 ${isProductsOpen ? "w-full" : "w-0"}`} />
              </button>
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    className="absolute left-0 top-full origin-top-left pt-4"
                    initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
                    animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
                    exit={prefersReducedMotion ? { opacity: 0 } : "hidden"}
                    variants={prefersReducedMotion ? undefined : scaleIn}
                  >
                    <div className="w-64 rounded-2xl border border-white/10 bg-[#161920] p-3 shadow-xl">
                      {productLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block rounded-xl px-3 py-2 text-[#9B978F] transition-colors hover:bg-white/5 hover:text-[#EDEBE8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A030]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[#9B978F] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A030]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#D4A030] transition-[width] duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/portal/login"
              className="text-sm text-[#9B978F] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A030]"
            >
              Client Login
            </Link>
            <Link href="/get-started">
              <motion.button
                className="rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-6 py-2.5 text-sm font-semibold text-[#0E1015] will-change-transform"
                {...(prefersReducedMotion ? {} : buttonHover)}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          <button className="p-2 text-white md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <div className="flex h-5 w-6 flex-col justify-between">
              <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }} className="h-0.5 w-full origin-left bg-white" />
              <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="h-0.5 w-full bg-white" />
              <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }} className="h-0.5 w-full origin-left bg-white" />
            </div>
          </button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0E1015] md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex h-full flex-col items-center justify-center gap-6">
              <BrandLogo size="md" showDescriptor className="mb-4" />
              {productLinks.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                  <Link
                    href={link.href}
                    className="text-2xl font-semibold text-[#9B978F] transition-colors hover:text-white"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {navLinks.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + index * 0.08 }}>
                  <Link
                    href={link.href}
                    className="text-3xl font-semibold text-[#9B978F] transition-colors hover:text-white"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mt-2 w-56 border-t border-white/10 pt-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68 }}
              >
                <Link
                  href="/portal/login"
                  className="text-sm text-[#9B978F] transition-colors hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Client Login
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }}>
                <Link
                  href="/get-started"
                  className="mt-8 rounded-full bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-8 py-3 font-semibold text-[#0E1015]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
