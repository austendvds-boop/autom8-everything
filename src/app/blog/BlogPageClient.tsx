"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { BlogPost } from "@/lib/blog";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const featuredPosts = posts.slice(0, 4);
  const trendingPosts = posts.slice(0, 6);
  const categories = [...new Set(posts.map((post) => post.category))];
  const tags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 18);
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="mesh-bg pt-32 pb-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.h1 className="mb-6 text-5xl font-semibold will-change-transform md:text-7xl" style={{ fontFamily: "var(--font-playfair), serif" }} variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} animate="visible">
            Helpful Reads for <span className="gradient-text">Local Business Owners</span>
          </motion.h1>
          <motion.p className="mx-auto max-w-3xl text-xl text-[#A1A1AA] will-change-transform" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} animate="visible" transition={prefersReducedMotion ? undefined : { delay: 0.12 }}>
            Tips and guides to help you answer more calls, get more reviews, and grow without the tech headache.
          </motion.p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl space-y-12 px-6">
          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-7">
            <h2 className="mb-4 text-2xl font-semibold">Featured guides</h2>
            <motion.div className="grid grid-cols-1 gap-5 md:grid-cols-2" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
              {featuredPosts.map((post) => (
                <motion.article key={post.slug} className="flex h-full flex-col rounded-xl border border-white/10 bg-[#0f0f15] p-5 will-change-transform" variants={staggerItem}>
                  <p className="mb-2 text-xs text-[#D4A030]">{post.category}</p>
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#D4A030] transition-colors">
                    <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                  </Link>
                  <p className="mb-3 text-sm text-[#A1A1AA]">{post.metaDescription}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex text-sm text-[#D4A030] hover:text-[#E5B544]">
                    Read guide →
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#12121A] p-7 lg:col-span-2">
              <h2 className="mb-4 text-2xl font-semibold">Trending now</h2>
              <div className="space-y-3">
                {trendingPosts.map((post, index) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="flex items-start justify-between gap-4 rounded-lg border border-white/10 px-4 py-3 hover:border-[#D4A030]/30">
                    <div>
                      <p className="mb-1 text-xs text-[#D4A030]">#{index + 1} · {post.focusKeyword}</p>
                      <p className="font-medium">{post.title}</p>
                    </div>
                    <span className="text-xs text-[#71717A]">{post.readingMinutes} min</span>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="space-y-6 rounded-2xl border border-white/10 bg-[#12121A] p-7">
              <div>
                <h2 className="mb-3 text-lg font-semibold">Browse by category</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-full border border-white/15 px-3 py-1 text-sm text-[#C4C4CC]">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-3 text-lg font-semibold">Popular topic tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[rgba(212,160,48,0.10)] px-3 py-1 text-xs text-[#E8C068]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {posts.length > 0 && (
            <div>
              <h2 className="mb-8 text-3xl font-semibold" style={{ fontFamily: "var(--font-playfair), serif" }}>
                All articles ({posts.length})
              </h2>
              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.02,
                    },
                  },
                }}
                initial={prefersReducedMotion ? false : "hidden"}
                animate="visible"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {posts.map((post) => (
                  <motion.article key={post.slug} className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#12121A] p-6 will-change-transform" variants={staggerItem}>
                    <p className="mb-3 text-sm text-[#D4A030]">{post.category}</p>
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#D4A030] transition-colors">
                      <h3 className="mb-3 text-xl font-semibold">{post.title}</h3>
                    </Link>
                    <p className="mb-4 text-[#A1A1AA]">{post.metaDescription}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={`${post.slug}-${tag}`} className="rounded-full border border-white/10 px-2 py-1 text-[11px] uppercase tracking-wide text-[#71717A]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mb-5 text-xs text-[#71717A]">Focus keyword: {post.focusKeyword} • {post.readingMinutes} min read</p>
                    <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex text-[#D4A030] hover:text-[#E5B544]">
                      Read article →
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          )}

          <div className="mt-14 rounded-2xl border border-white/10 bg-[#12121A] p-8">
            <h2 className="mb-3 text-2xl font-semibold">Need execution, not just ideas?</h2>
            <p className="mb-6 text-[#A1A1AA]">
              Explore our <Link href="/pricing" className="text-[#D4A030] hover:text-[#E5B544]">automation services</Link>, review Phoenix-area coverage in the <Link href="/locations" className="text-[#D4A030] hover:text-[#E5B544]">location hub</Link>, and request a <Link href="/contact" className="text-[#D4A030] hover:text-[#E5B544]">quote or strategy call</Link>.
            </p>
            <Link href="/contact" className="inline-block select-none rounded-full bg-gradient-to-r from-[#D4A030] to-[#E8C068] px-6 py-3 font-semibold text-[#0E1015]">
              Book a Free Automation Audit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
