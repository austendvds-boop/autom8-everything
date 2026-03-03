"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Globe, PhoneCall, Star, TrendingUp, Wrench } from "lucide-react";
import { cardHover, reveal, revealReduced, revealStagger } from "@/lib/motion";

type ProductTier = "hero" | "primary" | "secondary";

type Product = {
  tier: ProductTier;
  eyebrow: string;
  productName: string;
  valueProp: string;
  price: string;
  priceContext: string;
  priceAriaLabel: string;
  microProof: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  badge?: string;
  hoverBorderClass?: string;
  hoverGlowClass?: string;
  hoverOverlayClass?: string;
};

const products: Product[] = [
  {
    tier: "hero",
    eyebrow: "AI Voice Agent",
    productName: "Cadence",
    valueProp: "AI answers calls, books jobs, and handles FAQs 24/7.",
    price: "$199/mo",
    priceContext: "after 7-day free trial | no contracts",
    priceAriaLabel: "Price: 199 dollars per month after a seven day free trial with no contracts",
    microProof: "Live in 5 minutes",
    icon: PhoneCall,
    badge: "FREE TRIAL",
    cta: { href: "/cadence/get-started", label: "Start Free Trial" },
    secondaryCta: { href: "/services/cadence", label: "Learn More" },
  },
  {
    tier: "primary",
    eyebrow: "Web Development",
    productName: "Websites That Convert",
    valueProp: "High-converting websites built fast to drive more local calls.",
    price: "From $799",
    priceContext: "one-time | 3 tiers available",
    priceAriaLabel: "Price: from 799 dollars one time with three available tiers",
    microProof: "Launch in 2 weeks",
    icon: Globe,
    cta: { href: "/pricing", label: "See Plans" },
    hoverBorderClass: "hover:border-[#8B5CF6]/35",
    hoverGlowClass: "hover:shadow-[0_0_0_1px_rgba(139,92,246,0.32),0_0_78px_rgba(139,92,246,0.12)]",
    hoverOverlayClass: "group-hover:from-[#8B5CF6]/[0.04]",
  },
  {
    tier: "primary",
    eyebrow: "Search & Content",
    productName: "Monthly SEO",
    valueProp: "Monthly SEO and content that steadily grows qualified local traffic.",
    price: "From $500/mo",
    priceContext: "monthly | no long-term contracts",
    priceAriaLabel: "Price: from 500 dollars per month with no long term contracts",
    microProof: "Results within 90 days",
    icon: TrendingUp,
    cta: { href: "/pricing", label: "See Plans" },
    hoverBorderClass: "hover:border-[#06B6D4]/35",
    hoverGlowClass: "hover:shadow-[0_0_0_1px_rgba(6,182,212,0.32),0_0_78px_rgba(6,182,212,0.12)]",
    hoverOverlayClass: "group-hover:from-[#06B6D4]/[0.05]",
  },
  {
    tier: "secondary",
    eyebrow: "Reputation",
    productName: "Review Autopilot",
    valueProp: "Automate review requests and protect your reputation privately.",
    price: "From $149/mo",
    priceContext: "per location",
    priceAriaLabel: "Price: from 149 dollars per month per location",
    microProof: "Avg 4.8 star increase",
    icon: Star,
    cta: { href: "/pricing", label: "See Plans" },
    hoverBorderClass: "hover:border-[#A78BFA]/35",
    hoverGlowClass: "hover:shadow-[0_0_0_1px_rgba(167,139,250,0.30),0_0_78px_rgba(167,139,250,0.12)]",
    hoverOverlayClass: "group-hover:from-[#A78BFA]/[0.05]",
  },
  {
    tier: "secondary",
    eyebrow: "Custom Build",
    productName: "Custom Apps",
    valueProp: "Custom systems built around your workflow, team, and goals.",
    price: "Custom quote",
    priceContext: "scoped after a call",
    priceAriaLabel: "Price: custom quote scoped after a discovery call",
    microProof: "Your workflow, not ours",
    icon: Wrench,
    cta: { href: "/contact", label: "Book Call" },
    hoverBorderClass: "hover:border-[#7C3AED]/35",
    hoverGlowClass: "hover:shadow-[0_0_0_1px_rgba(124,58,237,0.30),0_0_78px_rgba(124,58,237,0.12)]",
    hoverOverlayClass: "group-hover:from-[#7C3AED]/[0.05]",
  },
];

export default function ServicesBento() {
  const prefersReducedMotion = useReducedMotion();
  const revealPreset = prefersReducedMotion ? revealReduced : reveal;
  const hero = products.find((product) => product.tier === "hero");
  const nonHero = products.filter((product) => product.tier !== "hero");

  if (!hero) return null;

  const HeroIcon = hero.icon;

  return (
    <section className="py-32 bg-transparent relative" id="services">
      <div className="section-glow section-glow--purple top-8 right-0" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-20" {...revealPreset}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Everything Your Business Needs to <span className="gradient-text">Grow</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">
            Pick what you need now. Add more later. No long-term contracts on any of it.
          </p>
        </motion.div>

        <motion.article
          aria-label={hero.productName}
          className="group relative overflow-hidden bg-[#111118] border border-[#8B5CF6]/20 rounded-3xl p-6 md:p-10 mb-6 shadow-[0_0_60px_rgba(139,92,246,0.06)] hover:border-[#8B5CF6]/40 hover:shadow-[0_0_100px_rgba(139,92,246,0.14)] transition-all duration-300"
          {...revealStagger(0, prefersReducedMotion)}
          {...(prefersReducedMotion ? {} : cardHover)}
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          whileTap={prefersReducedMotion ? {} : { y: -2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/[0.06] via-transparent to-[#06B6D4]/[0.04]" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 md:gap-8 items-start">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6]">{hero.eyebrow}</span>
                {hero.badge && (
                  <span className="text-xs tracking-wide px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA]">
                    {hero.badge}
                  </span>
                )}
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/[0.12] flex items-center justify-center mb-4">
                <HeroIcon className="w-5 h-5 text-[#8B5CF6]" />
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {hero.productName}
              </h3>

              <p className="text-[#A1A1AA] text-[15px] leading-relaxed max-w-2xl mb-4">{hero.valueProp}</p>
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link
                  href={hero.cta.href}
                  className="inline-flex items-center justify-center min-h-11 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white text-sm font-semibold"
                >
                  {hero.cta.label}
                </Link>
                {hero.secondaryCta && (
                  <Link
                    href={hero.secondaryCta.href}
                    className="inline-flex items-center justify-center min-h-11 px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:border-[#8B5CF6]/60 transition-colors"
                  >
                    {hero.secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-[#0A0A0F]/40 rounded-2xl p-6 md:min-w-[240px] shadow-[inset_0_0_40px_rgba(139,92,246,0.04)]">
              <p className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6] mb-2">Pricing</p>
              <p
                aria-label={hero.priceAriaLabel}
                className="text-4xl font-extrabold text-white/95 group-hover:text-white transition-colors duration-300"
              >
                {hero.price}
              </p>
              <p className="text-xs text-[#71717A] mt-1 mb-3">{hero.priceContext}</p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#A78BFA] font-medium">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{hero.microProof}</span>
              </div>
            </div>
          </div>
        </motion.article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nonHero.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.article
                key={product.productName}
                aria-label={product.productName}
                className={`group relative overflow-hidden bg-[#111118] border border-white/[0.06] rounded-3xl p-6 md:p-8 min-h-[320px] ${product.hoverBorderClass ?? "hover:border-[#8B5CF6]/35"} ${product.hoverGlowClass ?? "hover:shadow-[0_0_0_1px_rgba(139,92,246,0.32),0_0_78px_rgba(139,92,246,0.12)]"} transition-all duration-300`}
                {...revealStagger(index + 1, prefersReducedMotion)}
                {...(prefersReducedMotion ? {} : cardHover)}
                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                whileTap={prefersReducedMotion ? {} : { y: -2 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 to-transparent ${product.hoverOverlayClass ?? "group-hover:from-[#8B5CF6]/[0.04]"} transition-opacity duration-500`}
                />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6] mb-2">{product.eyebrow}</div>

                  <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/[0.12] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#8B5CF6]" />
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {product.productName}
                  </h3>

                  <p className="text-[#A1A1AA] text-[15px] leading-relaxed line-clamp-2 mb-5">{product.valueProp}</p>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5" />

                  <p
                    aria-label={product.priceAriaLabel}
                    className="text-2xl md:text-3xl font-extrabold text-white/90 group-hover:text-white transition-colors duration-300"
                  >
                    {product.price}
                  </p>
                  <p className="text-xs text-[#71717A] mt-1 mb-4">{product.priceContext}</p>

                  <div className="inline-flex items-center gap-1.5 text-xs text-[#A78BFA] font-medium mb-4">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{product.microProof}</span>
                  </div>

                  <div className="mt-auto pt-2">
                    <Link
                      href={product.cta.href}
                      className="inline-flex items-center justify-center min-h-11 px-5 py-2.5 rounded-full bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
                    >
                      {product.cta.label}
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
