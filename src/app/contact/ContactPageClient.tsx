"use client";

import Link from "next/link";
import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Check, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { businessProfile } from "@/lib/business";
import { trackContactFormSubmit } from "@/lib/analytics";
import { buttonHover, fadeUp, viewportOnce } from "@/lib/motion";

const helpOptions = ["Phone Answering", "Website", "Reviews", "SEO", "Not Sure Yet"];

export default function ContactPageClient() {
  const prefersReducedMotion = useReducedMotion();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    helpWith: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleHelp = (option: string) => {
    setFormState((prev) => ({
      ...prev,
      helpWith: prev.helpWith.includes(option) ? prev.helpWith.filter((item) => item !== option) : [...prev.helpWith, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);

    trackContactFormSubmit({
      page_type: "contact",
      lead_type: "contact_form",
    });
  };

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-[#0A0A0F]">
        <Navigation />

        <section className="mesh-bg pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.h1 className="mb-6 text-5xl font-semibold will-change-transform md:text-7xl" style={{ fontFamily: "var(--font-playfair), serif" }} variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} animate="visible">
              Tell Us About <span className="gradient-text">Your Business</span>
            </motion.h1>
            <motion.p className="mx-auto max-w-2xl text-xl text-[#A1A1AA] will-change-transform" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} animate="visible" transition={prefersReducedMotion ? undefined : { delay: 0.12 }}>
              Fill out this quick intake form and we&apos;ll recommend the best next step.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <motion.div className="rounded-2xl border border-white/5 bg-[#12121A] p-8 will-change-transform" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce} transition={prefersReducedMotion ? undefined : { delay: 0.08 }}>
                <h2 className="mb-6 text-2xl font-semibold">Quick Intake Form</h2>
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/20">
                      <Check className="h-8 w-8 text-[#10B981]" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Thanks - we got it</h3>
                    <p className="text-[#A1A1AA]">We&apos;ll follow up within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#1A1A23] px-4 py-3" placeholder="Name *" />
                    <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#1A1A23] px-4 py-3" placeholder="Email *" />
                    <input value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#1A1A23] px-4 py-3" placeholder="Business name" />
                    <input value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#1A1A23] px-4 py-3" placeholder="Phone number (optional)" />

                    <div>
                      <p className="mb-2 text-sm text-[#A1A1AA]">What do you need help with?</p>
                      <div className="flex flex-wrap gap-2">
                        {helpOptions.map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => toggleHelp(option)}
                            className={`rounded-full border px-3 py-2 text-sm ${formState.helpWith.includes(option) ? "border-[#D4A030] bg-[#D4A030]/20 text-white" : "border-white/15 text-[#A1A1AA]"}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full resize-none rounded-lg border border-white/10 bg-[#1A1A23] px-4 py-3" placeholder="Anything else we should know? *" />

                    <motion.button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4A030] to-[#E8C068] py-4 font-semibold text-[#0E1015] disabled:opacity-50 will-change-transform" {...(prefersReducedMotion ? {} : buttonHover)}>
                      {isSubmitting ? "Sending..." : <><Send className="h-5 w-5" /> Send Intake</>}
                    </motion.button>
                  </form>
                )}
              </motion.div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/5 bg-[#12121A] p-8">
                  <h3 className="mb-4 text-xl font-semibold">Prefer to try something first?</h3>
                  <p className="mb-6 text-[#A1A1AA]">Start Cadence free and see live phone answering in minutes.</p>
                  <Link href="/get-started" className="inline-block rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-[#D4A030]/60">Start Free Trial</Link>
                </div>

                <div className="rounded-2xl border border-white/5 bg-[#12121A] p-8">
                  <h2 className="mb-6 text-2xl font-semibold">Business Info</h2>
                  <div className="space-y-5 text-[#A1A1AA]">
                    <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#D4A030]" />{businessProfile.email}</p>
                    {businessProfile.phoneDisplay && <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#D4A030]" />{businessProfile.phoneDisplay}</p>}
                    <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#D4A030]" />{businessProfile.city}, {businessProfile.state}</p>
                    <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-[#D4A030]" />Response within 24 hours</p>
                  </div>
                  <Link href={`mailto:${businessProfile.email}?subject=Book%20a%20call`} className="mt-6 inline-block rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-[#D4A030]/60">Book a Call</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
