import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Business Automation Blog for Phoenix, AZ Service Companies",
  description:
    "Explore practical guides on business automation, CRM workflows, and local SEO systems for Phoenix and Arizona service businesses.",
  path: "/blog",
  keywords: [
    "business automation blog",
    "phoenix automation agency",
    "crm automation best practices",
    "local seo automation",
  ],
});

const posts = getAllPosts();
const featuredPosts = posts.slice(0, 4);
const trendingPosts = posts.slice(0, 6);
const categories = [...new Set(posts.map((post) => post.category))];
const tags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 18);

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pt-32 pb-16 mesh-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Business Automation <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            Tactical playbooks for Phoenix and Arizona businesses that want better lead response, cleaner CRM operations, and
            measurable local SEO growth.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-7">
            <h2 className="text-2xl font-semibold mb-4">Featured guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="rounded-xl border border-white/10 p-5 bg-[#0f0f15]">
                  <p className="text-xs text-[#8B5CF6] mb-2">{post.category}</p>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-3">{post.metaDescription}</p>
                  <Link href={`/blog/${post.slug}`} className="text-[#8B5CF6] hover:text-[#A78BFA] text-sm">
                    Read guide →
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#12121A] p-7">
              <h2 className="text-2xl font-semibold mb-4">Trending now</h2>
              <div className="space-y-3">
                {trendingPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex items-start justify-between gap-4 rounded-lg border border-white/10 px-4 py-3 hover:border-[#8B5CF6]/50"
                  >
                    <div>
                      <p className="text-xs text-[#8B5CF6] mb-1">#{index + 1} · {post.focusKeyword}</p>
                      <p className="font-medium">{post.title}</p>
                    </div>
                    <span className="text-xs text-[#71717A]">{post.readingMinutes} min</span>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-[#12121A] p-7 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Browse by category</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-full border border-white/15 px-3 py-1 text-sm text-[#C4C4CC]">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-3">Popular topic tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#8B5CF6]/10 text-[#C4B5FD] px-3 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
              All articles ({posts.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.slug} className="bg-[#12121A] border border-white/10 rounded-2xl p-6">
                  <p className="text-sm text-[#8B5CF6] mb-3">{post.category}</p>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-[#A1A1AA] mb-4">{post.metaDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={`${post.slug}-${tag}`} className="text-[11px] uppercase tracking-wide text-[#71717A] border border-white/10 rounded-full px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#71717A] mb-5">
                    Focus keyword: {post.focusKeyword} • {post.readingMinutes} min read
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-[#8B5CF6] hover:text-[#A78BFA]">
                    Read article →
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 p-8 bg-[#12121A]">
            <h2 className="text-2xl font-semibold mb-3">Need execution, not just ideas?</h2>
            <p className="text-[#A1A1AA] mb-6">
              Explore our <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">automation services</Link>, review
              Phoenix-area coverage in the <Link href="/locations" className="text-[#8B5CF6] hover:text-[#A78BFA]">location hub</Link>, and
              request a <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">quote or strategy call</Link>.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Free Automation Audit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
