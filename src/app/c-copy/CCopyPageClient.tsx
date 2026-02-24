"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, CircleDot } from "lucide-react";

const diagnosticQueue = [
  "Missed calls are not being followed up quickly.",
  "Website visitors are leaving before booking.",
  "Review requests are not sent after completed jobs.",
  "Lead notes are scattered across multiple apps.",
];

const activityFeed = [
  "New lead received from website form",
  "Text follow-up sent in under 2 minutes",
  "Consult call booked for tomorrow",
  "Review request sent after job completion",
];

const protocolCards = [
  {
    title: "Signal 01 — Capture Every Lead",
    copy: "We connect your website, calls, and messages into one place so no opportunity gets lost.",
  },
  {
    title: "Signal 02 — Respond Fast",
    copy: "We set up automatic follow-ups so prospects hear from your business while interest is still high.",
  },
  {
    title: "Signal 03 — Keep Customers Coming Back",
    copy: "We add reminders and review requests that help you win repeat jobs and stronger local trust.",
  },
];

export default function CCopyPageClient({ fontClassName }: { fontClassName: string }) {
  const [queueIndex, setQueueIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQueueIndex((prev) => (prev + 1) % diagnosticQueue.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const orderedQueue = useMemo(
    () => diagnosticQueue.map((_, i) => diagnosticQueue[(queueIndex + i) % diagnosticQueue.length]),
    [queueIndex]
  );

  return (
    <div className={`${fontClassName} c-copy-root min-h-screen bg-[var(--c-black)] text-[var(--c-offwhite)]`}>
      <header className="sticky top-0 z-40 border-b border-[var(--c-red)]/35 bg-[var(--c-black)]/95 backdrop-blur-sm">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div>
            <p className="c-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-red)]">Autom8 Everything</p>
            <p className="c-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-paper)]/80">Preset C · Brutalist Signal</p>
          </div>
          <Link href="/contact" className="c-cta">
            Start Your Build
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </header>

      <main>
        <section className="c-grid-frame px-4 pb-14 pt-12 sm:px-6 sm:pt-16 md:pb-20">
          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div className="space-y-6">
              <p className="c-mono text-xs uppercase tracking-[0.18em] text-[var(--c-red)]">Cinematic Architecture · Clear Messaging</p>
              <h1 className="text-pretty text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl">
                Stop losing good leads.
                <span className="c-serif block text-[var(--c-paper)]">Get a website and follow-up system that helps your business book more jobs.</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--c-offwhite)]/88 sm:text-lg">
                We build clear, high-converting websites, simple custom tools, and automated follow-up that keeps your team on track.
                You get more calls answered, more appointments booked, and less manual busywork.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/contact" className="c-cta">
                  Book a Strategy Call
                  <CalendarDays className="h-4 w-4" />
                </Link>
                <span className="c-mono inline-flex items-center rounded-full border border-[var(--c-paper)]/35 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--c-paper)]/85">
                  Local Preview · /c-copy
                </span>
              </div>
            </div>

            <aside className="c-panel">
              <p className="c-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-red)]">Diagnostic Signal</p>
              <p className="mt-4 text-lg font-medium leading-snug">{orderedQueue[0]}</p>
              <ul className="mt-5 space-y-3">
                {orderedQueue.slice(1).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--c-offwhite)]/82">
                    <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c-red)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
            <article className="c-panel min-h-[210px]">
              <p className="c-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-red)]">Signal Feed</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--c-offwhite)]/86">
                {activityFeed.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--c-red)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="c-panel min-h-[210px]">
              <p className="c-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-red)]">Offer Stack</p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--c-offwhite)]/88">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--c-red)]" />Website creation focused on calls and bookings</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--c-red)]" />Custom tools for your exact workflow</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--c-red)]" />Monthly SEO and content to keep leads coming in</li>
              </ul>
            </article>

            <article className="c-panel min-h-[210px]">
              <p className="c-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-red)]">Outcome</p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Clear system. Faster response. More booked jobs.</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--c-offwhite)]/82">
                Built for local businesses that want growth without adding complexity.
              </p>
            </article>
          </div>
        </section>

        <section className="c-grid-frame px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2">
            <article className="c-panel">
              <p className="c-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-red)]">Brutalist Signal Manifesto</p>
              <h2 className="c-serif mt-4 text-4xl leading-[1.05] sm:text-5xl">Sharp visuals. Zero fluff. Real business outcomes.</h2>
            </article>
            <article className="c-panel">
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--c-offwhite)]/88 sm:text-base">
                <li>• You should always know where your leads come from.</li>
                <li>• Your team should have one simple process to follow every day.</li>
                <li>• Your website should make it easy for people to call, book, and trust you.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <p className="c-mono text-xs uppercase tracking-[0.2em] text-[var(--c-red)]">Protocol Archive</p>
            <div className="mt-5 space-y-4">
              {protocolCards.map((card, index) => (
                <article key={card.title} className="c-panel c-archive-card">
                  <p className="c-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-red)]">Step {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{card.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--c-offwhite)]/85 sm:text-base">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="c-grid-frame px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <p className="c-mono text-xs uppercase tracking-[0.2em] text-[var(--c-red)]">Plans</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Choose the support level that fits your business.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="c-panel">
                <p className="c-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-red)]">Build</p>
                <p className="mt-3 text-2xl font-semibold">$1,500 one-time</p>
                <p className="mt-2 text-sm text-[var(--c-offwhite)]/84">Website, lead routing, and baseline follow-up setup.</p>
              </article>

              <article className="c-panel border-[var(--c-red)] bg-[var(--c-paper)] text-[var(--c-black)]">
                <p className="c-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-red)]">Grow · Most Popular</p>
                <p className="mt-3 text-2xl font-semibold">$3,500 setup + monthly</p>
                <p className="mt-2 text-sm text-[var(--c-black)]/80">Everything in Build plus custom tools, SEO, and monthly content.</p>
              </article>

              <article className="c-panel">
                <p className="c-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-red)]">Scale</p>
                <p className="mt-3 text-2xl font-semibold">Custom plan</p>
                <p className="mt-2 text-sm text-[var(--c-offwhite)]/84">For multi-location teams that need deeper integrations and reporting.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--c-red)]/35 px-4 py-8 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">Autom8 Everything</p>
            <p className="text-sm text-[var(--c-offwhite)]/82">Websites, custom tools, and follow-up systems for local business growth.</p>
          </div>
          <Link href="/contact" className="c-cta w-fit">
            Review My Current Setup
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
