import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getLocationBySlug, locationPages } from "@/content/locations";
import { buildBreadcrumbSchema, buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return locationPages.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return buildMetadata({
      title: "Location Not Found",
      description: "This location page could not be found.",
      path: "/locations",
    });
  }

  return buildMetadata({
    title: location.title,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    keywords: [
      `${location.city.toLowerCase()} automation agency`,
      `${location.city.toLowerCase()} business automation services`,
      "local automation consultant",
    ],
  });
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const faqSchema = buildFaqSchema(location.faqs);
  const serviceSchema = buildServiceSchema({
    name: `${location.city} Automation Services`,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    areaServed: `${location.city}, ${location.state}`,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: `${location.city}, ${location.state}`, path: `/locations/${location.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm text-[#8B5CF6] mb-4">Service Area</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {location.title}
          </h1>
          <p className="text-xl text-[#A1A1AA]">{location.intro}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">What we implement in {location.city}</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            {location.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-white/10 bg-[#12121A] p-7">
            <h2 className="text-2xl font-semibold mb-3">Build your local automation system</h2>
            <p className="text-[#A1A1AA] mb-5">
              Review our <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">service offerings</Link>, explore
              <Link href="/services/local-seo-automation" className="text-[#8B5CF6] hover:text-[#A78BFA]"> local SEO automation</Link>, and
              request your <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">custom roadmap</Link>.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Request a Quote
            </Link>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {location.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-white/10 bg-[#12121A] p-5">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[#A1A1AA]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
