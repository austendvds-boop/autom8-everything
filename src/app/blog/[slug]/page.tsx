import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { buildBlogPostingSchema, buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

function parseMarkdown(content: string) {
  const lines = content.split("\n");
  const blocks: Array<{ type: "h2" | "p"; value: string }> = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", value: trimmed.replace(/^##\s+/, "") });
      continue;
    }
    if (!trimmed.startsWith("#")) {
      blocks.push({ type: "p", value: trimmed });
    }
  }

  return blocks;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const blocks = parseMarkdown(post.content);
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
    keywords: [post.focusKeyword, ...post.tags],
    articleSection: post.category,
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm text-[#8B5CF6] mb-4">{post.category}</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={`${post.slug}-${tag}`} className="text-xs rounded-full px-3 py-1 bg-[#8B5CF6]/10 text-[#C4B5FD]">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#71717A] mb-10">
            Focus keyword: {post.focusKeyword} • {post.readingMinutes} min read • Published {post.publishedAt}
          </p>

          <div className="space-y-6 text-[#C4C4CC] leading-relaxed">
            {blocks.map((block, idx) =>
              block.type === "h2" ? (
                <h2 key={`${block.value}-${idx}`} className="text-2xl font-semibold text-white mt-6">
                  {block.value}
                </h2>
              ) : (
                <p key={`${block.value.slice(0, 24)}-${idx}`}>{block.value}</p>
              )
            )}
          </div>

          <section className="mt-14 rounded-2xl border border-white/10 p-8 bg-[#12121A]">
            <h2 className="text-2xl font-semibold mb-4">Ready to implement this in your business?</h2>
            <p className="text-[#A1A1AA] mb-6">
              Explore our <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">automation services</Link>, review
              Phoenix-area coverage in the <Link href="/locations" className="text-[#8B5CF6] hover:text-[#A78BFA]">location hub</Link>, or
              <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]"> request a quote</Link>.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book Your Free Audit
            </Link>
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
