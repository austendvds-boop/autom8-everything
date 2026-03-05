import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thanks for your feedback",
  description: "Your response has been recorded. Thank you for taking the time to share feedback.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function FunnelThanksPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0F] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#12121A] p-8 text-center shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">Review Funnel</p>
        <h1 className="mt-3 text-3xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Thank you!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8]">
          Your feedback helps us keep improving the customer experience.
        </p>
      </div>
    </main>
  )
}
