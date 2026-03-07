import Link from "next/link"

export default function PortalReviewFunnelPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 text-center">
        <h1 className="text-2xl font-semibold text-white">Review Funnel</h1>
        <p className="mt-2 text-sm text-[#A1A1AA]">
          Open your Review Funnel dashboard to manage your settings and see new reviews.
        </p>
        <Link
          href="/review-funnel/dashboard"
          className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Open Review Funnel Dashboard
        </Link>
      </div>
    </main>
  )
}
