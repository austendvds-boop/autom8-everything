import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { locationPages } from "@/content/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Phoenix Metro Automation Locations",
  description:
    "Explore Autom8 Everything location pages across Phoenix, Scottsdale, Glendale, Tempe, Mesa, and Chandler.",
  path: "/locations",
  keywords: [
    "phoenix automation agency",
    "scottsdale automation services",
    "tempe small business automation",
    "automation services glendale az",
  ],
});

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Phoenix Metro <span className="gradient-text">Service Areas</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
            Local automation and SEO execution for service businesses across Phoenix and surrounding cities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationPages.map((location) => (
            <article key={location.slug} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
              <h2 className="text-2xl font-semibold mb-3">{location.city}, {location.state}</h2>
              <p className="text-[#A1A1AA] mb-5">{location.intro}</p>
              <Link href={`/locations/${location.slug}`} className="text-[#8B5CF6] hover:text-[#A78BFA]">
                View location page →
              </Link>
            </article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-14 rounded-2xl border border-white/10 p-8 bg-[#12121A]">
          <h2 className="text-2xl font-semibold mb-3">Ready to implement in your market?</h2>
          <p className="text-[#A1A1AA] mb-6">
            Review our <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">automation services</Link>, learn tactics in the
            <Link href="/blog" className="text-[#8B5CF6] hover:text-[#A78BFA]"> blog</Link>, and request your roadmap on the
            <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]"> contact page</Link>.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
