import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Onboarding Complete | Cadence",
  description: "Your onboarding form has been submitted successfully.",
  path: "/get-started/success",
});

export default function GetStartedSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="mesh-bg pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Cadence Onboarding</p>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">You&apos;re all set</h1>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 md:p-8">
            <p className="text-lg text-[#E4E4E7]">
              You&apos;re all set! We&apos;ll have your Cadence up and running within 24 hours. You&apos;ll receive a text with
              your new business number.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-white hover:border-[#8B5CF6]/60"
              >
                Back to home
              </Link>
              <Link
                href="/services/cadence"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 text-sm font-medium text-white"
              >
                View Cadence details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
