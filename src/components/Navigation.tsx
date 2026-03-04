"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { buttonHover } from "@/lib/motion";

const productLinks = [
  { href: "/services/cadence", label: "Cadence" },
  { href: "/services/review-funnel", label: "Review Funnel" },
  { href: "/services/websites", label: "Website Creation" },
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
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 md:px-4 ${
          isScrolled ? "pt-3" : "pt-0"
        }`}
        initial={prefersReducedMotion ? { opacity: 0 } : { y: -100 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`h-16 flex items-center justify-between gap-3 transition-all duration-300 border border-transparent ${
            isScrolled ? "glass max-w-4xl mx-auto rounded-full border-white/10 px-5" : "max-w-7xl mx-auto px-6"
          }`}
        >
          <BrandLogo size="sm" showDescriptor={false} className="shrink-0" />

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="relative text-[#A1A1AA] group-hover:text-white transition-colors inline-flex items-center gap-1">
                Products <span className="text-xs">▾</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
              </button>
              <div className="absolute top-full left-0 pt-4 hidden group-hover:block">
                <div className="w-64 rounded-2xl border border-white/10 bg-[#111118] p-3 shadow-xl">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-xl px-3 py-2 text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative text-[#A1A1AA] hover:text-white transition-colors group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://cadence-m48n.onrender.com/login"
              className="text-sm text-[#A1A1AA] hover:text-white transition-colors"
            >
              Client Login
            </Link>
            <Link href="/onboarding">
              <motion.button
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-medium text-sm"
                {...buttonHover}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }} className="w-full h-0.5 bg-white origin-left" />
              <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="w-full h-0.5 bg-white" />
              <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }} className="w-full h-0.5 bg-white origin-left" />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0A0F] md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              <BrandLogo size="md" showDescriptor className="mb-4" />
              {productLinks.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                  <Link
                    href={link.href}
                    className="text-2xl font-semibold"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
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
                    className="text-3xl font-semibold"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Link
                  href="/onboarding"
                  className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-medium"
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
