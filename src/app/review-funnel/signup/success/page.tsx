import Link from "next/link"
import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Review Funnel Signup Success",
  description: "Your Review Funnel signup is complete.",
}

export default function ReviewFunnelSignupSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">You&apos;re in</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Welcome to Review Funnel
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-8">
            Your account is ready. Next, connect your Google Calendar so review requests can go out automatically.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-8">
            <p className="text-[#D4D4D8] mb-6">This takes about 2 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/review-funnel/login"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 font-semibold text-white"
              >
                Connect Google Calendar
              </Link>
              <Link
                href="/review-funnel/login"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
