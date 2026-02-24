"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck2, Check, Gauge, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const diagnosticDeck = [
  "Lead Capture Health Check",
  "Missed Follow-Up Sweep",
  "Booking Funnel Friction Scan",
  "Website Conversion Readout",
];

const liveTelemetry = [
  "Lead replied in 2m 14s",
  "Callback booked from missed call",
  "Estimate reminder delivered",
  "Review request sent after job close",
  "No-show rescued with follow-up sequence",
];

const typedLine = "Live system telemetry for calls, bookings, and follow-up";

const protocolCards = [
  {
    title: "Protocol 01 — Capture",
    body: "Every call, form, and message is routed into one clean pipeline so no lead falls through.",
  },
  {
    title: "Protocol 02 — Convert",
    body: "Custom automations trigger fast follow-up so prospects get a response while intent is high.",
  },
  {
    title: "Protocol 03 — Retain",
    body: "Post-job sequences ask for reviews, bring back past customers, and keep your calendar full.",
  },
];

export default function BCopyPageClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const heroMetaRef = useRef<HTMLDivElement | null>(null);
  const manifestoTextureRef = useRef<HTMLDivElement | null>(null);
  const featureCardRefs = useRef<HTMLDivElement[]>([]);
  const archiveRef = useRef<HTMLElement | null>(null);
  const archiveCardRefs = useRef<HTMLElement[]>([]);
  const schedulerCursorRef = useRef<SVGCircleElement | null>(null);
  const schedulerPulseRef = useRef<SVGCircleElement | null>(null);

  const [deckIndex, setDeckIndex] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0);

  const orderedDeck = useMemo(() => {
    return diagnosticDeck.map((_, i) => diagnosticDeck[(deckIndex + i) % diagnosticDeck.length]);
  }, [deckIndex]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDeckIndex((prev) => (prev + 1) % diagnosticDeck.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTypedIndex((prev) => (prev >= typedLine.length ? 0 : prev + 1));
    }, 45);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headingLines = heroHeadingRef.current?.querySelectorAll("[data-hero-line]");
      const metaItems = heroMetaRef.current?.querySelectorAll("[data-hero-meta]");

      if (headingLines?.length) {
        gsap.from(headingLines, {
          y: 56,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
        });
      }

      if (metaItems?.length) {
        gsap.from(metaItems, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.25,
        });
      }

      if (featureCardRefs.current.length) {
        gsap.from(featureCardRefs.current, {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#b-features",
            start: "top 75%",
          },
        });
      }

      if (manifestoTextureRef.current) {
        gsap.to(manifestoTextureRef.current, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: "#b-manifesto",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          {
            y: 16,
            borderRadius: "3rem",
            backgroundColor: "rgba(13, 13, 18, 0.45)",
            borderColor: "rgba(201, 168, 76, 0.22)",
          },
          {
            y: 8,
            borderRadius: "2rem",
            backgroundColor: "rgba(13, 13, 18, 0.82)",
            borderColor: "rgba(201, 168, 76, 0.5)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "+=220",
              scrub: true,
            },
          }
        );
      }

      if (archiveRef.current && archiveCardRefs.current.length === 3) {
        const [first, second, third] = archiveCardRefs.current;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: archiveRef.current,
            start: "top top",
            end: "+=2400",
            scrub: true,
            pin: true,
          },
        });

        timeline
          .to(first, { y: -80, scale: 0.92, opacity: 0.4, ease: "power2.inOut" }, 0)
          .fromTo(
            second,
            { y: 160, opacity: 0.25, scale: 1.05 },
            { y: 0, opacity: 1, scale: 1, ease: "power3.out" },
            0.18
          )
          .to(second, { y: -80, scale: 0.92, opacity: 0.4, ease: "power2.inOut" }, 0.52)
          .fromTo(
            third,
            { y: 160, opacity: 0.25, scale: 1.05 },
            { y: 0, opacity: 1, scale: 1, ease: "power3.out" },
            0.7
          );
      }

      if (schedulerCursorRef.current && schedulerPulseRef.current) {
        gsap
          .timeline({ repeat: -1, defaults: { ease: "power2.inOut" } })
          .to(schedulerCursorRef.current, { attr: { cx: 58, cy: 28 }, duration: 0.7 })
          .to(schedulerCursorRef.current, { attr: { cx: 142, cy: 78 }, duration: 0.9 })
          .to(schedulerPulseRef.current, { scale: 1.45, transformOrigin: "center", duration: 0.42 }, 0.7)
          .to(schedulerPulseRef.current, { scale: 1, duration: 0.42 }, 1.1)
          .to(schedulerCursorRef.current, { attr: { cx: 88, cy: 128 }, duration: 0.8 })
          .to(schedulerCursorRef.current, { attr: { cx: 28, cy: 48 }, duration: 0.75 });
      }

      const magneticTargets = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
      magneticTargets.forEach((el) => {
        const onMove = (event: MouseEvent) => {
          const bounds = el.getBoundingClientRect();
          const x = event.clientX - bounds.left - bounds.width / 2;
          const y = event.clientY - bounds.top - bounds.height / 2;

          gsap.to(el, {
            x: x * 0.09,
            y: y * 0.09,
            duration: 0.35,
            ease: "power2.inOut",
          });
        };

        const onLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "power2.inOut",
          });
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="b-copy-root relative isolate min-h-screen overflow-x-clip bg-[#0D0D12] text-[#FAF8F5]">
      <div className="b-noise-overlay" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-3 md:px-8">
        <nav
          ref={navRef}
          className="b-island w-full max-w-6xl border border-[#C9A84C66] bg-[#0D0D12B3] px-5 py-3 md:px-7"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#C9A84C]">Autom8 Everything</p>
              <p className="font-mono text-xs text-[#FAF8F5B3]">Midnight Luxe — Preset B</p>
            </div>
            <Link
              href="/contact"
              className="b-button b-magnetic inline-flex items-center gap-2"
              data-magnetic
            >
              <span className="relative z-10">Book a Strategy Call</span>
              <ArrowRight className="relative z-10 h-4 w-4" />
              <span className="b-button-slide" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[100dvh] items-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 md:px-10 md:pb-20">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
          alt="Cinematic office interior"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,18,0.15)_5%,rgba(13,13,18,0.72)_50%,rgba(13,13,18,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_72%,rgba(201,168,76,0.18),transparent_48%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="b-shell max-w-3xl border border-[#C9A84C4D] bg-[#0D0D12B3] p-7 backdrop-blur-md md:p-10">
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              <Sparkles className="h-4 w-4" />
              Cinematic Landing Sequence
            </p>
            <h1 ref={heroHeadingRef} className="text-balance text-4xl leading-[1.03] md:text-6xl">
              <span data-hero-line className="block font-[var(--font-playfair)] italic">
                More calls.
              </span>
              <span data-hero-line className="block font-[var(--font-inter)] font-semibold tracking-[-0.02em]">
                More booked jobs. Less missed follow-up.
              </span>
            </h1>
            <div ref={heroMetaRef} className="mt-7 space-y-4">
              <p data-hero-meta className="max-w-2xl text-base text-[#FAF8F5D1] md:text-lg">
                We build websites, custom tools, and follow-up systems for local businesses that want
                clear growth without extra chaos.
              </p>
              <div data-hero-meta className="flex flex-wrap items-center gap-3">
                <Link href="/contact" className="b-button b-magnetic inline-flex items-center gap-2" data-magnetic>
                  <span className="relative z-10">Book a Strategy Call</span>
                  <CalendarCheck2 className="relative z-10 h-4 w-4" />
                  <span className="b-button-slide" aria-hidden="true" />
                </Link>
                <span className="rounded-full border border-[#FAF8F547] px-4 py-2 font-mono text-xs text-[#FAF8F5BA]">
                  Local Preview: /b-copy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="b-features" className="px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Functional Feature Stack</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-5xl">Systems that move in real time</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div
              ref={(el) => {
                if (el) featureCardRefs.current[0] = el;
              }}
              className="b-shell b-lift min-h-[320px] border border-[#2A2A35] bg-[#111118] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Diagnostic Shuffler</p>
              <p className="mt-3 text-sm text-[#FAF8F5B8]">Cycling audits every 3 seconds to prioritize what blocks growth first.</p>
              <div className="relative mt-6 h-44">
                {orderedDeck.slice(0, 3).map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="absolute inset-x-0 rounded-[1.4rem] border border-[#C9A84C3D] bg-[#171720] px-4 py-3 transition-all duration-500"
                    style={{
                      top: `${index * 16}px`,
                      transform: `scale(${1 - index * 0.06})`,
                      opacity: 1 - index * 0.22,
                      zIndex: 10 - index,
                    }}
                  >
                    <p className="font-mono text-xs text-[#C9A84C]">PRIORITY {index + 1}</p>
                    <p className="mt-1 text-sm text-[#FAF8F5E6]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={(el) => {
                if (el) featureCardRefs.current[1] = el;
              }}
              className="b-shell b-lift min-h-[320px] border border-[#2A2A35] bg-[#111118] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Telemetry Typewriter</p>
              <p className="mt-3 text-sm text-[#FAF8F5B8]">Live feed style output so your team sees activity, not guesswork.</p>
              <div className="mt-5 rounded-2xl border border-[#2A2A35] bg-[#0D0D12] p-4">
                <p className="font-mono text-sm text-[#FAF8F5DE]">
                  {typedLine.slice(0, typedIndex)}
                  <span className="b-cursor">|</span>
                </p>
              </div>
              <div className="mt-4 space-y-2">
                {liveTelemetry.slice(0, 3).map((line) => (
                  <p key={line} className="flex items-center gap-2 font-mono text-xs text-[#FAF8F5BA]">
                    <span className="b-live-dot" />
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div
              ref={(el) => {
                if (el) featureCardRefs.current[2] = el;
              }}
              className="b-shell b-lift min-h-[320px] border border-[#2A2A35] bg-[#111118] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Cursor Protocol Scheduler</p>
              <p className="mt-3 text-sm text-[#FAF8F5B8]">Animated routing map for callbacks, reminders, and review asks.</p>
              <svg viewBox="0 0 180 150" className="mt-4 h-[170px] w-full rounded-2xl border border-[#2A2A35] bg-[#0D0D12] p-2">
                <path d="M28 48 L58 28 L142 78 L88 128 Z" fill="none" stroke="#2A2A35" strokeWidth="2" />
                <circle cx="58" cy="28" r="7" fill="#C9A84C" fillOpacity="0.4" />
                <circle cx="142" cy="78" r="7" fill="#C9A84C" fillOpacity="0.4" />
                <circle cx="88" cy="128" r="7" fill="#C9A84C" fillOpacity="0.4" />
                <circle ref={schedulerPulseRef} cx="58" cy="28" r="10" fill="#C9A84C" fillOpacity="0.16" />
                <circle ref={schedulerCursorRef} cx="28" cy="48" r="4" fill="#FAF8F5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="b-manifesto" className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <div
          ref={manifestoTextureRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,168,76,0.22),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(42,42,53,0.7),transparent_52%)]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="b-shell border border-[#C9A84C4D] bg-[#0D0D12D4] p-7 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Philosophy Manifesto</p>
            <h3 className="mt-4 text-3xl font-[var(--font-playfair)] italic md:text-5xl">
              Elegant systems. Practical outcomes.
            </h3>
          </div>
          <div className="b-shell border border-[#2A2A35] bg-[#12121ABF] p-7 md:p-10">
            <ul className="space-y-4 text-base text-[#FAF8F5D1]">
              <li className="flex gap-3"><Check className="mt-1 h-4 w-4 text-[#C9A84C]" />Design should feel premium without hiding the point.</li>
              <li className="flex gap-3"><Check className="mt-1 h-4 w-4 text-[#C9A84C]" />Automation should support your team, not replace your voice.</li>
              <li className="flex gap-3"><Check className="mt-1 h-4 w-4 text-[#C9A84C]" />Growth systems must increase calls, bookings, and follow-up consistency.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Protocol Archive</p>
        </div>
      </section>

      <section ref={archiveRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center px-4 sm:px-6 md:px-10">
          <div className="relative mx-auto h-[84vh] w-full max-w-6xl">
            {protocolCards.map((card, index) => (
              <article
                key={card.title}
                ref={(el) => {
                  if (el) archiveCardRefs.current[index] = el;
                }}
                className="b-shell absolute inset-0 flex flex-col justify-between border border-[#C9A84C52] bg-[#111118E6] p-7 md:p-10"
                style={{ zIndex: protocolCards.length - index }}
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">{card.title}</p>
                  <h4 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.02em] md:text-4xl">{card.body}</h4>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-[#2A2A35] bg-[#0D0D12] p-4">
                    <p className="font-mono text-xs text-[#C9A84C]">ENGINE LOOP</p>
                    <div className="mt-3 h-20 rounded-xl bg-[linear-gradient(90deg,rgba(201,168,76,0.06),rgba(201,168,76,0.34),rgba(201,168,76,0.06))] b-shimmer" />
                  </div>
                  <div className="rounded-[1.4rem] border border-[#2A2A35] bg-[#0D0D12] p-4">
                    <p className="font-mono text-xs text-[#C9A84C]">RESULT FLOW</p>
                    <svg viewBox="0 0 280 80" className="mt-2 h-20 w-full">
                      <path d="M10 55 C50 10 90 70 140 36 C180 12 220 68 270 30" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" className="b-wave" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Membership & Pricing</p>
          <h5 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Pick your growth protocol
          </h5>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "Launch",
                price: "$1,500",
                detail: "One-time foundation",
                points: ["Website conversion rebuild", "Lead form + call tracking", "Follow-up starter sequence"],
              },
              {
                name: "Momentum",
                price: "$3,500",
                detail: "Most selected",
                points: ["Everything in Launch", "Custom tool integration", "Monthly SEO + content + optimization"],
                featured: true,
              },
              {
                name: "Command",
                price: "Custom",
                detail: "For multi-location teams",
                points: ["Advanced routing + CRM sync", "Sales/ops dashboarding", "Priority support and iteration sprint"],
              },
            ].map((tier) => (
              <article
                key={tier.name}
                className={`b-shell b-lift border p-6 ${
                  tier.featured
                    ? "scale-[1.01] border-[#C9A84C] bg-[#16161F] shadow-[0_0_0_1px_rgba(201,168,76,0.25),0_20px_70px_rgba(0,0,0,0.45)]"
                    : "border-[#2A2A35] bg-[#111118]"
                }`}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">{tier.detail}</p>
                <p className="mt-3 text-2xl font-semibold">{tier.name}</p>
                <p className="mt-1 text-3xl font-[var(--font-playfair)] italic">{tier.price}</p>
                <ul className="mt-5 space-y-3 text-sm text-[#FAF8F5CE]">
                  {tier.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-[#C9A84C]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="b-button mt-6 inline-flex w-full items-center justify-center gap-2" data-magnetic>
                  <span className="relative z-10">Book a Strategy Call</span>
                  <ArrowRight className="relative z-10 h-4 w-4" />
                  <span className="b-button-slide" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2A2A35] px-4 py-8 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Autom8 Everything</p>
            <p className="text-sm text-[#FAF8F5BF]">Websites + custom tools + follow-up systems for local businesses.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2A2A35] bg-[#12121A] px-4 py-2 font-mono text-xs">
            <span className="b-op-dot" aria-hidden="true" />
            System Operational — Ready for strategy calls
          </div>
          <Link href="/contact" className="b-lift inline-flex items-center gap-2 text-sm text-[#C9A84C]">
            Start now <Gauge className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
