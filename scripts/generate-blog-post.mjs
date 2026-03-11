import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const poolPath = path.join(rootDir, "scripts/blog-keyword-pool.json");
const blogDir = path.join(rootDir, "content/blog");
const openaiKeyPath = "C:/Users/austen/.openclaw/credentials/openai-api-key.txt";
const vercelTokenPath = "C:/Users/austen/.openclaw/credentials/vercel-token.txt";
const OPENAI_MODEL = "gpt-4.1";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const categoryConfig = {
  "ai-receptionist": {
    display: "AI Voice & Answering",
    serviceUrl: "/services/cadence",
    serviceName: "Cadence",
    serviceDesc: "AI voice receptionist that answers calls 24/7, books appointments, and handles FAQs - starting at $79/mo",
  },
  "review-automation": {
    display: "Review Automation",
    serviceUrl: "/services/review-funnel",
    serviceName: "Review Funnel",
    serviceDesc: "automated review collection system that sends follow-up texts after every job and guides happy customers to leave Google reviews - $79/mo",
  },
  "small-business-websites": {
    display: "Website Design",
    serviceUrl: "/services/websites",
    serviceName: "Website Creation",
    serviceDesc: "professional websites for local businesses starting at $799, always bundled with monthly SEO",
  },
  "local-seo": {
    display: "Local SEO",
    serviceUrl: "/services/seo",
    serviceName: "SEO & Content",
    serviceDesc: "monthly SEO and blog content for local businesses at $299-$599/mo",
  },
  "business-automation": {
    display: "Business Automation",
    serviceUrl: "/services/custom-apps",
    serviceName: "Custom Apps",
    serviceDesc: "custom business software and workflow automation tailored to how your business actually runs",
  },
};

const featuredImages = {
  "ai-receptionist": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
  "review-automation": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
  "small-business-websites": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  "local-seo": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
  "business-automation": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
};

const stopWords = new Set([
  "a",
  "an",
  "the",
  "for",
  "in",
  "of",
  "to",
  "is",
  "and",
  "or",
  "how",
  "your",
  "with",
  "that",
  "from",
  "what",
  "does",
  "do",
  "can",
]);

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeYaml(value) {
  return String(value).replace(/"/g, '\\"');
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

function buildTags(keyword, category) {
  const keywordTags = keyword
    .toLowerCase()
    .split(/\s+/)
    .map((word) => toSlug(word))
    .filter((word) => word && !stopWords.has(word));

  return [...new Set([...keywordTags, category])];
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw };
  }

  const parts = raw.split("---");
  if (parts.length < 3) {
    return { data: {}, content: raw };
  }

  const frontmatter = parts[1];
  const content = parts.slice(2).join("---").trimStart();
  const data = {};
  const lines = frontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.trim();

    if (key === "tags") {
      if (value.startsWith("[") && value.endsWith("]")) {
        data.tags = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
        continue;
      }

      const tags = [];
      let nextIndex = index + 1;
      while (nextIndex < lines.length) {
        const nextLine = lines[nextIndex];
        const tagMatch = nextLine.match(/^\s*-\s*(.+)\s*$/);
        if (!tagMatch) break;
        tags.push(tagMatch[1].trim().replace(/^["']|["']$/g, ""));
        nextIndex += 1;
      }
      data.tags = tags;
      index = nextIndex - 1;
      continue;
    }

    data[key] = value.replace(/^["']|["']$/g, "");
  }

  return { data, content };
}

function selectKeyword(pool) {
  const rotation = pool.categoryRotation;
  const lastCat = pool.lastCategory;
  const startIdx = lastCat ? (rotation.indexOf(lastCat) + 1) % rotation.length : 0;

  for (let offset = 0; offset < rotation.length; offset += 1) {
    const category = rotation[(startIdx + offset) % rotation.length];
    const candidates = pool.pool.filter((entry) => entry.category === category && !entry.used);
    if (candidates.length === 0) continue;

    const cityHist = pool.cityHistory || {};
    candidates.sort((a, b) => {
      const aLast = cityHist[`${category}:${a.city}`] || 0;
      const bLast = cityHist[`${category}:${b.city}`] || 0;
      return aLast - bLast;
    });

    return { entry: candidates[0], category };
  }

  return null;
}

function findRelatedPosts(entry) {
  if (!fs.existsSync(blogDir)) return [];

  const currentTags = new Set(buildTags(entry.keyword, entry.category));
  const related = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data } = parseFrontmatter(raw);
      const title = typeof data.title === "string" ? data.title : slug;
      const category = typeof data.category === "string" ? data.category : "";
      const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
      const tagOverlap = tags.filter((tag) => currentTags.has(toSlug(tag))).length;
      const categoryMatch = category === categoryConfig[entry.category]?.display ? 1 : 0;
      const score = categoryMatch * 10 + tagOverlap;

      return { slug, title, score };
    })
    .filter((post) => post.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, 3)
    .map(({ slug, title }) => ({ slug, title }));

  return related.slice(0, related.length >= 2 ? 3 : related.length);
}

async function generatePost({ keyword, title, city, category, relatedPosts }) {
  const config = categoryConfig[category];
  if (!config) {
    throw new Error(`Unsupported category: ${category}`);
  }

  const relatedPostsPromptSection =
    relatedPosts.length > 0
      ? `- Naturally include these internal links somewhere in the body (as markdown links):\n${relatedPosts
          .map((post) => `  - [${post.title}](/blog/${post.slug})`)
          .join("\n")}`
      : "";

  const prompt = `You are a blog writer for Autom8 Everything (autom8everything.com), a small business automation agency in ${city}, Arizona.

Write a blog post targeting the keyword "${keyword}".

Title: ${title}

Requirements:
- 900-1100 words
- Structure: engaging intro (2-3 paragraphs), 3-4 H2 sections with practical content, FAQ section with 3 questions and answers, CTA paragraph
- Plain English. Write for busy small business owners who are not technical. If a mom wouldn't understand a sentence, rewrite it.
- Mention ${city} and the Phoenix metro area naturally - don't force it
- The CTA should mention Autom8 Everything's ${config.serviceName} (${config.serviceDesc}) and link to ${config.serviceUrl}
- DO NOT use the word "leverage". DO NOT use emojis. DO NOT use "In today's..." openers.
- Outcome-focused: talk about what the reader gets, not how the tech works
${relatedPostsPromptSection ? `${relatedPostsPromptSection}\n` : ""}Output ONLY the markdown body content (no frontmatter, no title heading). Start with the first paragraph.`;

  const openaiKey = fs.readFileSync(openaiKeyPath, "utf8").trim();
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  const json = await response.json();
  return json?.choices?.[0]?.message?.content?.trim() || "";
}

async function main() {
  if (!fs.existsSync(openaiKeyPath)) {
    console.log(`Missing OpenAI key at ${openaiKeyPath}`);
    process.exit(0);
  }

  if (!fs.existsSync(poolPath)) {
    throw new Error(`Pool file not found at ${poolPath}`);
  }

  const pool = JSON.parse(fs.readFileSync(poolPath, "utf8"));
  const selection = selectKeyword(pool);

  if (!selection) {
    console.log("Keyword pool exhausted");
    process.exit(0);
  }

  const { entry, category } = selection;
  const poolEntry = pool.pool.find(
    (item) => item.keyword === entry.keyword && item.category === category && item.city === entry.city,
  );

  if (!poolEntry) {
    throw new Error(`Selected keyword entry not found in pool: ${entry.keyword}`);
  }

  poolEntry.used = true;
  pool.lastCategory = category;
  pool.cityHistory = pool.cityHistory || {};
  pool.cityHistory[`${category}:${entry.city}`] = Date.now();
  fs.writeFileSync(poolPath, `${JSON.stringify(pool, null, 2)}\n`, "utf8");

  const relatedPosts = findRelatedPosts(entry);
  const body = await generatePost({ ...entry, category, relatedPosts });
  if (!body) {
    throw new Error("OpenAI returned empty content");
  }

  const slug = toSlug(entry.keyword);
  const metaDescription = truncate(
    `Learn how ${entry.keyword} can help your ${entry.city} business grow. Practical tips from Autom8 Everything.`,
    155,
  );
  const tags = buildTags(entry.keyword, category);
  const publishedAt = new Date().toISOString().slice(0, 10);
  const frontmatter = [
    "---",
    `title: "${escapeYaml(entry.title)}"`,
    `seoTitle: "${escapeYaml(`${entry.title} | Autom8 Everything`)}"`,
    `metaDescription: "${escapeYaml(metaDescription)}"`,
    `category: "${categoryConfig[category].display}"`,
    `tags: [${tags.map((tag) => `"${escapeYaml(tag)}"`).join(", ")}]`,
    `publishedAt: ${publishedAt}`,
    `featuredImage: "${featuredImages[category]}"`,
    "draft: false",
    "---",
    "",
  ].join("\n");

  fs.mkdirSync(blogDir, { recursive: true });
  const postPath = path.join(blogDir, `${slug}.md`);
  fs.writeFileSync(postPath, `${frontmatter}${body.trim()}\n`, "utf8");

  execSync(`git add content/blog/${slug}.md scripts/blog-keyword-pool.json`, { stdio: "inherit" });
  execSync(`git commit -m "Auto-publish: ${entry.title}"`, { stdio: "inherit" });
  execSync("git push origin feature/blog-pipeline", { stdio: "inherit" });

  const vercelToken = fs.readFileSync(vercelTokenPath, "utf8").trim();
  execSync(`npx vercel --prod --yes --token ${vercelToken}`, { cwd: rootDir, stdio: "inherit" });

  try {
    await fetch("https://www.google.com/ping?sitemap=https://autom8everything.com/sitemap.xml");
    console.log("Sitemap ping sent");
  } catch (error) {
    console.log("Sitemap ping failed (non-fatal):", error.message);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
