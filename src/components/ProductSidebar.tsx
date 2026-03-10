"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ComponentType, KeyboardEvent } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  LayoutGroup,
} from "framer-motion";
import { Check, Globe, MessageSquareHeart, PhoneCall, Wrench } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

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
  icon: ComponentType<{ className?: string }>;
  cta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  badge?: string;
};

const products: Product[] = [
  {
    tier: "hero",
    eyebrow: "AI Receptionist",
    productName: "Cadence",
    valueProp:
      "Cadence answers your phone like a real receptionist - 24/7. It handles questions, books appointments, and takes messages so no call goes unanswered.",
    price: "$199/mo",
    priceContext: "7-day free trial - No contracts - Setup in 5 minutes",
    priceAriaLabel: "Price: 199 dollars per month with a seven day free trial",
    microProof: "Never miss a customer call.",
    features: [
      "Answers calls around the clock",
      "Books appointments automatically",
      "Sounds like a real person",
      "Sends call summaries to your phone",
    ],
    icon: PhoneCall,
    badge: "7-DAY FREE TRIAL",
    cta: { href: "tel:+14806313993", label: "Call Cadence Live" },
    secondaryCta: { href: "/services/cadence", label: "How It Works" },
  },
  {
    tier: "small",
    eyebrow: "Reviews",
    productName: "Review Funnel",
    valueProp:
      "After every job, we automatically reach out to your customer and ask for a review. Happy customers get sent straight to Google. It runs itself.",
    price: "$79/mo",
    priceContext: "Set it and forget it",
    priceAriaLabel: "Review Funnel: 79 dollars per month",
    microProof: "Turn happy customers into 5-star reviews.",
    icon: MessageSquareHeart,
    cta: { href: "/services/review-funnel", label: "Get More Reviews" },
  },
  {
    tier: "small",
    eyebrow: "Websites + SEO",
    productName: "Web + Monthly SEO",
    valueProp:
      "A professional website built to turn visitors into calls, plus monthly content and local SEO so customers find you instead of your competition.",
    price: "From $499",
    priceContext: "One-time build + optional monthly plans",
    priceAriaLabel: "Websites start at 499 dollars",
    microProof: "Show up when customers search for what you do.",
    icon: Globe,
    cta: { href: "/contact", label: "Get a Free Quote" },
  },
  {
    tier: "small",
    eyebrow: "Built for You",
    productName: "Custom Apps",
    valueProp:
      "Scrapers, dashboards, automations, internal tools - if it saves you time or makes you money, we can build it.",
    price: "Custom Quote",
    priceContext: "Scoped after a short call",
    priceAriaLabel: "Custom Apps pricing is provided by quote",
    microProof: "Something specific in mind? Let's build it.",
    icon: Wrench,
    cta: { href: "/contact", label: "Let's Talk" },
  },
];

const MOBILE_PANEL_ID = "product-detail-panel-mobile";
const DESKTOP_PANEL_ID = "product-detail-panel-desktop";

/* ─── Detail panel content (shared between mobile & desktop) ─── */
function DetailPanelContent({ product }: { product: Product }) {
  const Icon = product.icon;
  const isHero = product.tier === "hero";
  const features = Array.isArray(product.features) ? product.features : [];
  const hasFeatures = features.length > 0;

  return (
    <div className="bg-[#111118]/60 border border-white/[0.06] rounded-3xl p-8 md:p-10 min-h-[420px] lg:min-h-[480px]">
      {isHero ? (
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-7 md:gap-10 items-start">
          {/* Left column */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6]">
                {product.eyebrow}
              </span>
              {product.badge && (
                <span className="inline-flex items-center text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] border border-[#DDD6FE]/70 ring-1 ring-[#DDD6FE]/35 text-white shadow-[0_0_30px_rgba(167,139,250,0.5)]">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/[0.22] shadow-[0_0_20px_rgba(139,92,246,0.24)] flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-[#8B5CF6]" />
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {product.productName}
            </h3>

            <p className="text-[#A1A1AA] text-[15px] leading-relaxed max-w-2xl mb-4">
              {product.valueProp}
            </p>

            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />

            <p
              aria-label={product.priceAriaLabel}
              className="text-4xl font-extrabold text-white"
            >
              {product.price}
            </p>
            <p className="text-xs text-[#A78BFA] mt-2 mb-4">{product.priceContext}</p>

            <div className="inline-flex items-center gap-1.5 text-xs text-[#A78BFA] font-medium mb-6">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{product.microProof}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <a
                href={product.cta.href}
                className="inline-flex items-center justify-center min-h-11 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white text-sm font-semibold"
              >
                {product.cta.label}
              </a>
              {product.secondaryCta && (
                <Link
                  href={product.secondaryCta.href}
                  className="inline-flex items-center justify-center min-h-11 px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:border-[#8B5CF6]/60 transition-colors"
                >
                  {product.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {/* Right column - features sub-card */}
          <div className="rounded-2xl border border-white/[0.12] bg-[#0F0F18]/70 p-5 md:p-6 shadow-[inset_0_0_60px_rgba(139,92,246,0.1)]">
            <p className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6] mb-4">
              What Cadence handles
            </p>
            <ul className="space-y-3">
              {features.map((feature) => (
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
      ) : (
        /* Non-hero layout */
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#8B5CF6]">
              {product.eyebrow}
            </span>
            {product.badge && (
              <span className="text-[10px] uppercase tracking-[0.12em] font-medium px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A78BFA]">
                {product.badge}
              </span>
            )}
          </div>

          <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/[0.12] flex items-center justify-center mb-4">
            <Icon className="w-5 h-5 text-[#8B5CF6]" />
          </div>

          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {product.productName}
          </h3>

          <p
            className={`text-[#A1A1AA] leading-relaxed ${
              !hasFeatures ? "text-base mb-6" : "text-[15px] mb-5"
            }`}
          >
            {product.valueProp}
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5" />

          <p
            aria-label={product.priceAriaLabel}
            className="text-4xl font-extrabold text-white"
          >
            {product.price}
          </p>
          <p className="text-xs text-[#71717A] mt-1 mb-4">{product.priceContext}</p>

          <div
            className={`inline-flex items-center gap-1.5 font-medium mb-6 ${
              !hasFeatures ? "text-sm text-[#A78BFA]" : "text-xs text-[#A78BFA]"
            }`}
          >
            <Check
              className={!hasFeatures ? "w-4 h-4" : "w-3.5 h-3.5"}
              aria-hidden="true"
            />
            <span>{product.microProof}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <Link
              href={product.cta.href}
              className="inline-flex items-center justify-center min-h-11 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white text-sm font-semibold"
            >
              {product.cta.label}
            </Link>
            {product.secondaryCta && (
              <Link
                href={product.secondaryCta.href}
                className="inline-flex items-center justify-center min-h-11 px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:border-[#8B5CF6]/60 transition-colors"
              >
                {product.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Animated detail panel wrapper ─── */
function AnimatedDetailPanel({
  product,
  selectedIndex,
  panelId,
  labelledBy,
  useFadeUp,
}: {
  product: Product;
  selectedIndex: number;
  panelId: string;
  labelledBy: string;
  useFadeUp: boolean;
}) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndex}
          initial={useFadeUp ? { opacity: 0, y: 8 } : { opacity: 0 }}
          animate={useFadeUp ? { opacity: 1, y: 0 } : { opacity: 1 }}
          exit={
            useFadeUp
              ? { opacity: 0, y: 8, transition: { duration: 0.15 } }
              : { opacity: 0, transition: { duration: 0.15 } }
          }
          transition={
            useFadeUp
              ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.3 }
          }
        >
          <DetailPanelContent product={product} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Main component ─── */
export default function ProductSidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const selectedProduct = products[selectedIndex];
  const useFadeUp = !prefersReducedMotion;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sidebarRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll active tab into view (mobile)
  useEffect(() => {
    const activeTab = tabRefs.current[selectedIndex];
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation
  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, direction: "horizontal" | "vertical") => {
      const prev = direction === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const next = direction === "horizontal" ? "ArrowRight" : "ArrowDown";

      if (e.key === prev) {
        e.preventDefault();
        const newIndex = selectedIndex > 0 ? selectedIndex - 1 : products.length - 1;
        setSelectedIndex(newIndex);
        if (direction === "horizontal") {
          tabRefs.current[newIndex]?.focus();
        } else {
          sidebarRefs.current[newIndex]?.focus();
        }
      } else if (e.key === next) {
        e.preventDefault();
        const newIndex = selectedIndex < products.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(newIndex);
        if (direction === "horizontal") {
          tabRefs.current[newIndex]?.focus();
        } else {
          sidebarRefs.current[newIndex]?.focus();
        }
      }
    },
    [selectedIndex],
  );

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-transparent relative" id="services">
      <div className="section-glow section-glow--purple top-8 right-0" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          variants={useFadeUp ? fadeUp : undefined}
          initial={useFadeUp ? "hidden" : { opacity: 0 }}
          whileInView={useFadeUp ? "visible" : { opacity: 1 }}
          viewport={viewportOnce}
          transition={useFadeUp ? undefined : { duration: 0.3 }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Products That Keep Your Business{" "}
            <span className="gradient-text">Running Smoothly</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">
            Start with one or combine a few. Each one works on its own - no bundles, no upsells.
          </p>
        </motion.div>

        <LayoutGroup>
          {/* ─── Mobile/Tablet layout (< 1024px) ─── */}
          <div className="lg:hidden">
            {/* Tab strip */}
            <motion.div
              role="tablist"
              aria-label="Product selector"
              aria-orientation="horizontal"
              className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-6"
              style={{ scrollSnapType: "x mandatory" }}
              variants={useFadeUp ? staggerContainer : undefined}
              initial={useFadeUp ? "hidden" : { opacity: 0 }}
              whileInView={useFadeUp ? "visible" : { opacity: 1 }}
              viewport={viewportOnce}
              transition={useFadeUp ? undefined : { duration: 0.3 }}
            >
              {products.map((product, index) => {
                const isActive = selectedIndex === index;
                return (
                  <motion.button
                    key={product.productName}
                    id={`product-tab-mobile-${index}`}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={MOBILE_PANEL_ID}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(e) => handleTabKeyDown(e, "horizontal")}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                    variants={useFadeUp ? staggerItem : undefined}
                    className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[#52525B] border border-transparent hover:text-[#A1A1AA]"
                    }`}
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      scrollSnapAlign: "start",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute inset-0 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{product.productName}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Detail panel */}
            <motion.div
              variants={useFadeUp ? fadeUp : undefined}
              initial={useFadeUp ? "hidden" : { opacity: 0 }}
              whileInView={useFadeUp ? "visible" : { opacity: 1 }}
              viewport={viewportOnce}
              transition={useFadeUp ? undefined : { duration: 0.3 }}
            >
              <AnimatedDetailPanel
                product={selectedProduct}
                selectedIndex={selectedIndex}
                panelId={MOBILE_PANEL_ID}
                labelledBy={`product-tab-mobile-${selectedIndex}`}
                useFadeUp={useFadeUp}
              />
            </motion.div>
          </div>

          {/* ─── Desktop layout (≥ 1024px) ─── */}
          <div className="hidden lg:grid lg:grid-cols-[28%_72%] lg:gap-8 items-start">
            {/* Sidebar labels */}
            <motion.nav
              role="tablist"
              aria-label="Product selector"
              aria-orientation="vertical"
              className="relative flex flex-col gap-6 pt-4"
              variants={useFadeUp ? staggerContainer : undefined}
              initial={useFadeUp ? "hidden" : { opacity: 0 }}
              whileInView={useFadeUp ? "visible" : { opacity: 1 }}
              viewport={viewportOnce}
              transition={useFadeUp ? undefined : { duration: 0.3 }}
            >
              {products.map((product, index) => {
                const isActive = selectedIndex === index;
                return (
                  <motion.button
                    key={product.productName}
                    id={`product-tab-${index}`}
                    ref={(el) => {
                      sidebarRefs.current[index] = el;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={DESKTOP_PANEL_ID}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(e) => handleTabKeyDown(e, "vertical")}
                    variants={useFadeUp ? staggerItem : undefined}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`relative text-left text-4xl lg:text-5xl font-extrabold cursor-pointer leading-tight transition-colors duration-200 pl-[calc(3px+1.25rem)] ${
                      isActive ? "text-white" : "text-[#52525B] hover:text-[#A1A1AA]"
                    }`}
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      ...(isActive
                        ? { textShadow: "0 0 30px rgba(139,92,246,0.3)" }
                        : {}),
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-indicator"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B5CF6] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {product.productName}
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* Detail panel */}
            <motion.div
              variants={useFadeUp ? fadeUp : undefined}
              initial={useFadeUp ? "hidden" : { opacity: 0 }}
              whileInView={useFadeUp ? "visible" : { opacity: 1 }}
              viewport={viewportOnce}
              transition={useFadeUp ? undefined : { duration: 0.3 }}
            >
              <AnimatedDetailPanel
                product={selectedProduct}
                selectedIndex={selectedIndex}
                panelId={DESKTOP_PANEL_ID}
                labelledBy={`product-tab-${selectedIndex}`}
                useFadeUp={useFadeUp}
              />
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
