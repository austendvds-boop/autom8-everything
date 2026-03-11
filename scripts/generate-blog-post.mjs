import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const poolPath = path.join(rootDir, "scripts/blog-keyword-pool.json");
const outputDir = path.join(rootDir, "content/blog");
const moonshotApiUrl = "https://api.moonshot.cn/v1/chat/completions";
const moonshotApiKeyPath = "C:/Users/austen/.openclaw/credentials/moonshot-api-key.txt";
const moonshotModel = "moonshot-v1-8k";

const categoryDisplayNames = {
  cadence: "AI Voice & Answering",
  "review-funnel": "Review Automation",
  website: "Website Creation",
  seo: "Local SEO",
  newlywed: "Small Business Tips",
};

const promptsByCategory = {
  cadence: "Write a 600-800 word SEO blog post for autom8everything.com. Autom8 offers Cadence - an AI voice receptionist that answers business calls 24/7, routes urgent calls, and sends call summaries, for $199/mo. Topic: {keyword}. Include: the problem it solves, how Cadence specifically helps, a real example scenario, CTA to try Cadence free. Plain professional tone. No emojis. Output ONLY the markdown content.",
  "review-funnel": "Write a 600-800 word SEO blog post for autom8everything.com. Autom8 offers a Review Funnel - automated SMS follow-ups after every job that guide happy customers to leave Google reviews, for $79/mo. Topic: {keyword}. Include: why Google reviews matter, how the funnel works, a realistic example, CTA to get more reviews. Plain professional tone. No emojis. Output ONLY the markdown content.",
  website: "Write a 600-800 word SEO blog post for autom8everything.com. Autom8 builds professional websites for local businesses starting at $799, always bundled with monthly SEO. Topic: {keyword}. Include: what local businesses actually need in a website, why SEO must be built in from day one, how Autom8 delivers both, CTA to get a free quote. Plain professional tone. No emojis. Output ONLY the markdown content.",
  seo: "Write a 600-800 word SEO blog post for autom8everything.com. Autom8 offers monthly SEO and blog content for local businesses at $299-$599/mo. Topic: {keyword}. Include: what local SEO actually involves, why ongoing content matters, how small businesses can compete, CTA to get started. Plain professional tone. No emojis. Output ONLY the markdown content.",
  newlywed: "Write a 600-800 word SEO blog post for autom8everything.com. Autom8 builds professional websites and handles digital marketing for new business owners, starting at $799. Topic: {keyword}. Include: why the post-wedding period is great for starting a business, what digital presence new business owners need, how Autom8 makes it simple, CTA to get a free quote. Warm, practical tone. No emojis. Output ONLY the markdown content.",
};

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function keywordToTags(keyword, category) {
  const keywordTags = keyword
    .toLowerCase()
    .split(/\s+/)
    .map((part) => toSlug(part))
    .filter(Boolean);
  return [...new Set([...keywordTags, toSlug(category)])];
}

function pickImage(keyword) {
  const lower = keyword.toLowerCase();
  if (lower.includes("review") || lower.includes("google")) {
    return "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80";
  }
  if (lower.includes("website")) {
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80";
  }
  if (lower.includes("seo")) {
    return "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80";
  }
  if (lower.includes("call") || lower.includes("phone") || lower.includes("receptionist")) {
    return "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80";
  }
  return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80";
}

function makeMetaDescription(keyword) {
  const raw = `Learn how ${keyword} helps small businesses grow with practical guidance from Autom8 Everything.`;
  return raw.length <= 155 ? raw : `${raw.slice(0, 152)}...`;
}

function escapeYaml(value) {
  return String(value).replace(/"/g, '\\"');
}

function getSortedEntries(entries) {
  return [...entries].sort((left, right) => {
    const leftPriority = Number.isFinite(left?.priority) ? left.priority : Number.MAX_SAFE_INTEGER;
    const rightPriority = Number.isFinite(right?.priority) ? right.priority : Number.MAX_SAFE_INTEGER;
    return leftPriority - rightPriority;
  });
}

function selectKeyword(poolData) {
  const rotation = Array.isArray(poolData.categoryRotation) ? poolData.categoryRotation : [];
  const published = new Set(Array.isArray(poolData.published) ? poolData.published : []);

  if (rotation.length === 0) {
    return null;
  }

  const lastIndex = rotation.indexOf(poolData.lastCategory);
  const startIndex = lastIndex === -1 ? 0 : (lastIndex + 1) % rotation.length;

  for (let offset = 0; offset < rotation.length; offset += 1) {
    const category = rotation[(startIndex + offset) % rotation.length];
    const entries = Array.isArray(poolData.pool?.[category]) ? getSortedEntries(poolData.pool[category]) : [];
    const match = entries.find((entry) => !published.has(entry.keyword));
    if (match) {
      return { category, entry: match };
    }
  }

  return null;
}

async function generateBody(category, keyword, moonshotApiKey) {
  const template = promptsByCategory[category];

  if (!template) {
    throw new Error(`Unsupported category: ${category}`);
  }

  const prompt = template.replace("{keyword}", keyword);
  const response = await fetch(moonshotApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${moonshotApiKey}`,
    },
    body: JSON.stringify({
      model: moonshotModel,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Moonshot API error ${response.status}: ${text}`);
  }

  const json = await response.json();
  return json?.choices?.[0]?.message?.content?.trim() || "";
}

async function main() {
  if (!fs.existsSync(moonshotApiKeyPath)) {
    console.log("Missing Moonshot API key at C:/Users/austen/.openclaw/credentials/moonshot-api-key.txt");
    process.exit(0);
  }

  if (!fs.existsSync(poolPath)) {
    throw new Error(`Pool file not found at ${poolPath}`);
  }

  const poolData = JSON.parse(fs.readFileSync(poolPath, "utf8"));
  const selection = selectKeyword(poolData);

  if (!selection) {
    console.log("Keyword pool exhausted");
    process.exit(0);
  }

  const { category, entry } = selection;
  const { keyword, title } = entry;
  const slug = toSlug(keyword);
  const displayCategory = categoryDisplayNames[category] || "General";
  const tags = keywordToTags(keyword, category);
  const publishedAt = new Date().toISOString().slice(0, 10);
  const seoTitle = `${title} | Autom8 Everything`;
  const metaDescription = makeMetaDescription(keyword);
  const featuredImage = pickImage(keyword);

  const moonshotApiKey = fs.readFileSync(moonshotApiKeyPath, "utf8").trim();
  const body = await generateBody(category, keyword, moonshotApiKey);

  if (!body) {
    throw new Error("Moonshot returned empty content");
  }

  poolData.lastCategory = category;
  poolData.published = [...(Array.isArray(poolData.published) ? poolData.published : []), keyword];
  fs.writeFileSync(poolPath, JSON.stringify(poolData, null, 2) + "\n", "utf8");

  const markdown = [
    "---",
    `title: \"${escapeYaml(title)}\"`,
    `seoTitle: \"${escapeYaml(seoTitle)}\"`,
    `metaDescription: \"${escapeYaml(metaDescription)}\"`,
    `category: \"${escapeYaml(displayCategory)}\"`,
    `tags: [${tags.map((tag) => `\"${escapeYaml(tag)}\"`).join(", ")}]`,
    `publishedAt: ${publishedAt}`,
    `featuredImage: \"${escapeYaml(featuredImage)}\"`,
    "draft: false",
    "---",
    "",
    body,
    "",
  ].join("\n");

  fs.mkdirSync(outputDir, { recursive: true });
  const postPath = path.join(outputDir, `${slug}.md`);
  fs.writeFileSync(postPath, markdown, "utf8");

  execSync(`git add content/blog/${slug}.md scripts/blog-keyword-pool.json`, { stdio: "inherit" });
  execSync(`git commit -m \"Auto-publish: ${title}\"`, { stdio: "inherit" });
  execSync("git push origin master", { stdio: "inherit" });

  console.log(`Published: ${slug}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

