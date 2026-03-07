import type { Metadata } from "next"
import { Suspense } from "react"
import CheckoutClient from "./CheckoutClient"

export const metadata: Metadata = {
  title: "Get Started — Autom8",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalCheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0A0A0F] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#12121A] p-6 text-[#A1A1AA]">
            Loading checkout...
          </div>
        </main>
      }
    >
      <CheckoutClient />
    </Suspense>
  )
}
