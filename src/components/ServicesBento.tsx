"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Globe, MessageSquareHeart, PhoneCall, Search, Wrench } from "lucide-react";
import { cardHover, reveal, revealReduced, revealStagger } from "@/lib/motion";

type ProductTier = "hero" | "small";

type Product = {
  tier: ProductTier;
  eyebrow: string;
  productName: string;
  valueProp: string;
  price: string;
  priceContext: string;
  priceAriaLabel: string;
  microProof: string;
  features?: string[];
  icon: React.ComponentType<{ className?: string }>;
  cta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  badge?: string;
};

const products: Product[] = [
  {
    tier: "hero",
    eyebrow: "Featured",
    productName: "Cadence",
    valueProp:
      "Every missed call is a customer your competitor answers instead. Cadence is your AI voice receptionist — answering calls, handling questions, and sending you summaries, 24/7.",
    price: "$199/mo",
    priceContext: "7-day free trial • cancel anytime",
    priceAriaLabel: "Price: 199 dollars per month with a seven day free trial",
    microProof: "Live in 5 minutes. Try it right now.",
    features: [
      "Answers missed and after-hours calls",
      "Handles your common business questions",
      "Sends call summaries to your phone",
      "Books or routes calls based on your rules",
    ],
    icon: PhoneCall,
    badge: "7-DAY FREE TRIAL",
    cta: { href: "tel:+14806313993", label: "Call (480) 631-3993" },
    secondaryCta: { href: "/services/cadence", label: "Learn More" },
  },
  {
    tier: "small",
    eyebrow: "Reviews",
    productName: "Review Funnel",
    valueProp:
      "Ask for reviews automatically after each job and keep responses consistent so your reputation keeps growing.",
    price: "$79/mo",
    priceContext: "Starter plan • set it and forget it",
    priceAriaLabel: "Review Funnel starts at 79 dollars per month",
    microProof: "5-minute setup without the tech headache",
    badge: "Pairs with Cadence",
    icon: MessageSquareHeart,
    cta: { href: "/review-funnel/signup", label: "Get Started" },
  },
  {
    tier: "small",
    eyebrow: "Websites",
    productName: "Website Creation",
    valueProp:
      "Professional sites built to turn visitors into calls, with Launch, Scale, and Custom options based on your stage.",
    price: "From $1,500",
    priceContext: "Launch / Scale / Custom tiers",
    priceAriaLabel: "Website Creation starts at 1500 dollars",
    microProof: "Clear offer pages built for real customers",
    badge: "Foundation",
    icon: Globe,
    cta: { href: "/services/websites", label: "See Website Tiers" },
  },
  {
    tier: "small",
    eyebrow: "Growth",
    productName: "SEO & Content",
    valueProp:
      "Monthly blog posts and local SEO work that helps your business show up in search and stay visible over time.",
    price: "Monthly Retainer",
    priceContext: "Contact us for scope",
    priceAriaLabel: "SEO and Content is offered as a monthly retainer",
    microProof: "Steady ranking gains with consistent publishing",
    badge: "Ongoing Growth",
    icon: Search,
    cta: { href: "/services/seo-content", label: "See SEO & Content" },
  },
  {
    tier: "small",
    eyebrow: "Built for You",
    productName: "Custom Apps",
    valueProp:
      "Need something specific? We build custom tools for your workflow, from lead scrapers to internal dashboards.",
    price: "Custom Quote",
    priceContext: "Scoped after a short call",
    priceAriaLabel: "Custom Apps pricing is provided by quote",
    microProof: "Built around how your team already works",
    badge: "Advanced",
    icon: Wrench,
    cta: { href: "/services/custom-apps", label: "Book a Consultation" },
  },
];

export default function ServicesBento() {
  const prefersReducedMotion = useReducedMotion();
  const revealPreset = prefersReducedMotion ? revealReduced : reveal;
  const hero = products.find((product) => product.tier === "hero");
  const nonHero = products.filter((product) => product.tier === "small");

  if (!hero) return null;

  const HeroIcon = hero.icon;
  const heroFeatures = Array.isArray(hero.features) ? hero.features : [];

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-transparent relative" id="services">
      <div className="section-glow section-glow--purple top-8 right-0" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-14 md:mb-16" {...revealPreset} initial={false}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Products That Keep Your Business <span className="gradient-text">Running Smoothly</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">
            Start with one tool or combine a few. Everything is built to be simple for real business owners.
          </p>
        </motion.div>

        <motion.article
          aria-label={hero.productName}
          className="group relative overflow-hidden rounded-3xl border border-transparent bg-[linear-gradient(140deg,rgba(21,18,33,0.96),rgba(15,15,24,0.96))_padding-box,linear-gradient(135deg,rgba(139,92,246,0.72),rgba(6,182,212,0.42))_border-box] p-7 md:p-10 mb-4 shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_0_88px_rgba(139,92,246,0.16)] hover:shadow-[0_0_0_1px_rgba(167,139,250,0.42),0_0_120px_rgba(139,92,246,0.24)] transition-all duration-300"
          {...revealStagger(0, prefersReducedMotion)}
          initial={false}
          {...(prefersReducedMotion ? {} : cardHover)}
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          whileTap={prefersReducedMotion ? {} : { y: -2 }}
        >
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.28),transparent_60%)] opacity-90 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/[0.11] via-transparent to-[#06B6D4]/[0.08]" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-7 md:gap-10 items-start">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6]">{hero.eyebrow}</span>
                {hero.badge && (
                  <span className="inline-flex items-center text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] border border-[#DDD6FE]/70 ring-1 ring-[#DDD6FE]/35 text-white shadow-[0_0_30px_rgba(167,139,250,0.5)]">
                    {hero.badge}
                  </span>
                )}
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/[0.22] shadow-[0_0_20px_rgba(139,92,246,0.24)] flex items-center justify-center mb-4">
                <HeroIcon className="w-5 h-5 text-[#8B5CF6]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
                {hero.productName}
              </h3>

              <p className="text-[#A1A1AA] text-[15px] leading-relaxed max-w-2xl mb-4">{hero.valueProp}</p>
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />

              <p
                aria-label={hero.priceAriaLabel}
                className="text-4xl md:text-5xl font-extrabold text-white/95 group-hover:text-white transition-colors duration-300"
              >
                {hero.price}
              </p>
              <p className="text-xs text-[#A78BFA] mt-2 mb-4">{hero.priceContext}</p>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#A78BFA] font-medium mb-6">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{hero.microProof}</span>
              </div>

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

            <div className="rounded-2xl border border-white/[0.12] bg-[#0F0F18]/70 p-5 md:p-6 shadow-[inset_0_0_60px_rgba(139,92,246,0.1)]">
              <p className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6] mb-4">What Cadence handles</p>
              <ul className="space-y-3">
                {heroFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-[#D4D4D8]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {nonHero.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.article
                key={product.productName}
                aria-label={product.productName}
                className="group relative overflow-hidden bg-[#111118] border border-white/[0.06] rounded-3xl p-7 md:p-9 min-h-[320px] hover:border-[#8B5CF6]/35 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.32),0_0_78px_rgba(139,92,246,0.12)] transition-all duration-300"
                {...revealStagger(index + 1, prefersReducedMotion)}
                initial={false}
                {...(prefersReducedMotion ? {} : cardHover)}
                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                whileTap={prefersReducedMotion ? {} : { y: -2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 to-transparent group-hover:from-[#8B5CF6]/[0.04] transition-opacity duration-500" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6]">{product.eyebrow}</div>
                    {product.badge && (
                      <span className="text-[10px] uppercase tracking-[0.12em] font-medium px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A78BFA]">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/[0.12] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#8B5CF6]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {product.productName}
                  </h3>

                  <p className="text-[#A1A1AA] text-[15px] leading-relaxed mb-5">{product.valueProp}</p>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5" />

                  <p
                    aria-label={product.priceAriaLabel}
                    className="text-2xl md:text-[2rem] font-bold text-white/90 group-hover:text-white transition-colors duration-300"
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
                      className="inline-flex items-center justify-center min-h-11 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white text-sm font-semibold"
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
