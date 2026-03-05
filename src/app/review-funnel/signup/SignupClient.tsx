"use client"

import Link from "next/link"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function SignupClient() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pb-20 pt-32 mesh-bg">
        <div className="mx-auto max-w-2xl px-6">
          <p className="mb-4 text-sm uppercase tracking-wide text-[#8B5CF6]">Review Funnel</p>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Review Funnel signup is being finalized
          </h1>
          <p className="mb-8 text-lg text-[#A1A1AA]">
            We&apos;re finishing the onboarding flow now. For immediate setup, contact us and we&apos;ll get you started.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 md:p-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 font-semibold text-white"
            >
              Contact us to get started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
