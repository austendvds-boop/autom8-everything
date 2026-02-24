import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllBlogPosts, getBlogPostBySlug } from "@/content/blogPosts";
import { buildBlogPostingSchema, buildBreadcrumbSchema, buildFaqSchema, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return buildMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      path: "/blog",
    });
  }

  return buildMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: [post.focusKeyword, ...post.tags, "phoenix automation agency"],
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const faqSchema = buildFaqSchema(post.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const blogPostingSchema = buildBlogPostingSchema({
    headline: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: [post.focusKeyword, ...post.tags],
    articleSection: post.category,
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm text-[#8B5CF6] mb-4">{post.category}</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {post.title}
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-4">{post.intro}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={`${post.slug}-${tag}`} className="text-xs rounded-full px-3 py-1 bg-[#8B5CF6]/10 text-[#C4B5FD]">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#71717A] mb-10">
            Focus keyword: {post.focusKeyword} • {post.readingMinutes} min read • Updated {post.updatedAt}
          </p>

          {post.localRelevance && (
            <section className="mb-10 rounded-xl border border-[#8B5CF6]/30 bg-[#12121A] p-5">
              <h2 className="text-xl font-semibold mb-2">Phoenix/Arizona relevance</h2>
              <p className="text-[#C4C4CC] leading-relaxed">{post.localRelevance}</p>
            </section>
          )}

          <div className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
                <div className="space-y-4 text-[#C4C4CC] leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.checklist && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-[#12121A] p-5">
                    <h3 className="font-semibold mb-3">Quick checklist</h3>
                    <ul className="space-y-2 text-[#A1A1AA] list-disc pl-5">
                      {section.checklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.example && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-[#12121A] p-5">
                    <h3 className="font-semibold mb-3">{section.example.title}</h3>
                    <ol className="space-y-2 text-[#A1A1AA] list-decimal pl-5">
                      {section.example.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </section>
            ))}
          </div>

          <section className="mt-14 rounded-2xl border border-white/10 p-8 bg-[#12121A]">
            <h2 className="text-2xl font-semibold mb-4">Related services for this topic</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {post.serviceLinks.map((link) => (
                <Link
                  key={`${post.slug}-${link.href}`}
                  href={link.href}
                  className="rounded-full border border-[#8B5CF6]/40 px-4 py-2 text-sm text-[#C4B5FD] hover:bg-[#8B5CF6]/15"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-[#A1A1AA] mb-6">
              Ready for implementation? Visit <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">all services</Link>,
              review <Link href="/locations" className="text-[#8B5CF6] hover:text-[#A78BFA]">Phoenix-area coverage</Link>, or
              <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]"> request a quote</Link>.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book Your Free Audit
            </Link>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-white/10 bg-[#12121A] p-5">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[#A1A1AA]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12">
            <Link href="/blog" className="text-[#8B5CF6] hover:text-[#A78BFA]">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
