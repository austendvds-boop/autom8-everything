import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: "Automation Strategy" | "CRM Automation" | "Local SEO" | "Comparisons" | "Phoenix Local";
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
  featuredImage: string;
  draft: boolean;
  content: string;
  focusKeyword: string;
};

const blogDir = path.join(process.cwd(), "content/blog");

function estimateReadingMinutes(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function toSlug(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function readPostFile(fileName: string): BlogPost {
  const slug = toSlug(fileName);
  const raw = fs.readFileSync(path.join(blogDir, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    seoTitle: String(data.seoTitle ?? data.title ?? slug),
    metaDescription: String(data.metaDescription ?? ""),
    category: (data.category ?? "Automation Strategy") as BlogPost["category"],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    publishedAt: String(data.publishedAt ?? new Date().toISOString().slice(0, 10)),
    readingMinutes: estimateReadingMinutes(content),
    featuredImage: String(data.featuredImage ?? ""),
    draft: Boolean(data.draft),
    content,
    focusKeyword: Array.isArray(data.tags) && data.tags.length > 0 ? String(data.tags[0]) : String(data.title ?? slug),
  };
}

export function getAllPosts() {
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map(readPostFile)
    .filter((post) => !post.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const fileName = `${slug}.md`;
  const fullPath = path.join(blogDir, fileName);

  if (!fs.existsSync(fullPath)) return undefined;

  const post = readPostFile(fileName);
  if (post.draft) return undefined;
  return post;
}
