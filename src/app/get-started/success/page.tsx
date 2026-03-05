import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Onboarding Complete | Autom8 Everything",
  description: "Your Cadence onboarding details were submitted successfully.",
};

export default function GetStartedSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="mesh-bg pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[#8B5CF6]/30 bg-[#12121A]/90 p-8 text-center">
            <h1 className="mb-4 text-3xl font-semibold">You&apos;re all set!</h1>
            <p className="mx-auto max-w-2xl text-[#D4D4D8]">
              We&apos;ll have your Cadence up and running within 24 hours. You&apos;ll receive a text with your new
              business number.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 text-sm font-medium text-white"
            >
              Return to home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
