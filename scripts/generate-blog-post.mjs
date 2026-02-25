import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const queuePath = path.join(rootDir, "scripts/blog-keyword-queue.json");
const outputDir = path.join(rootDir, "content/blog");
const apiKeyPath = "C:/Users/austen/.openclaw/credentials/moonshot-api-key.txt";

const categories = ["Automation Strategy", "CRM Automation", "Local SEO", "Comparisons", "Phoenix Local"];

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toTitle(keyword) {
  return keyword
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function pickCategory(keyword) {
  const lower = keyword.toLowerCase();
  if (lower.includes("crm") || lower.includes("gohighlevel")) return "CRM Automation";
  if (lower.includes("seo")) return "Local SEO";
  if (lower.includes("vs") || lower.includes("compare")) return "Comparisons";
  if (lower.includes("phoenix")) return "Phoenix Local";
  return "Automation Strategy";
}

function pickTags(keyword, category) {
  const base = keyword.toLowerCase();
  const tags = [base, category.toLowerCase(), "phoenix automation"];
  return [...new Set(tags)].slice(0, 3);
}

function pickImage(keyword) {
  const lower = keyword.toLowerCase();
  if (lower.includes("crm")) {
    return "https://images.unsplash.com/photo-1551281044-8f7b0f63f8b0?auto=format&fit=crop&w=1600&q=80";
  }
  if (lower.includes("seo")) {
    return "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80";
  }
  if (lower.includes("hvac") || lower.includes("contractor")) {
    return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80";
  }
  return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80";
}

async function generateBody(keyword, apiKey) {
  const prompt = `Write a 500-600 word SEO blog post for autom8everything.com, a Phoenix Arizona automation agency. Topic: ${keyword}. Include: what the topic is, why local Phoenix businesses care, how Autom8 Everything helps, CTA to contact. No emojis. Plain professional tone. Output ONLY the markdown content (no code blocks, no commentary).`;

  const response = await fetch("https://api.moonshot.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "moonshot-v1-8k",
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

function escapeYaml(value) {
  return String(value).replace(/"/g, '\\"');
}

function makeMetaDescription(keyword) {
  const raw = `Learn ${keyword} strategies for Phoenix businesses with practical automation steps from Autom8 Everything.`;
  return raw.length <= 155 ? raw : `${raw.slice(0, 152)}...`;
}

async function main() {
  if (!fs.existsSync(apiKeyPath)) {
    console.log("Missing API key at credentials/moonshot-api-key.txt");
    process.exit(0);
  }

  if (!fs.existsSync(queuePath)) {
    throw new Error(`Queue file not found at ${queuePath}`);
  }

  const queueData = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  const queue = Array.isArray(queueData.queue) ? queueData.queue : [];

  if (queue.length === 0) {
    console.log("Queue empty");
    process.exit(0);
  }

  const keyword = queue[0];
  const slug = toSlug(keyword);
  const title = toTitle(keyword);
  const category = categories.includes(pickCategory(keyword)) ? pickCategory(keyword) : "Automation Strategy";
  const tags = pickTags(keyword, category);
  const publishedAt = new Date().toISOString().slice(0, 10);
  const seoTitle = `${title} | Phoenix Automation Guide | Autom8 Everything`;
  const metaDescription = makeMetaDescription(keyword);
  const featuredImage = pickImage(keyword);

  const apiKey = fs.readFileSync(apiKeyPath, "utf8").trim();
  const body = await generateBody(keyword, apiKey);

  if (!body) {
    throw new Error("Moonshot returned empty content");
  }

  const markdown = [
    "---",
    `title: \"${escapeYaml(title)}\"`,
    `seoTitle: \"${escapeYaml(seoTitle)}\"`,
    `metaDescription: \"${escapeYaml(metaDescription)}\"`,
    `category: \"${escapeYaml(category)}\"`,
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

  queueData.queue = queue.slice(1);
  queueData.published = [...(Array.isArray(queueData.published) ? queueData.published : []), keyword];
  fs.writeFileSync(queuePath, JSON.stringify(queueData, null, 2) + "\n", "utf8");

  execSync(`git add content/blog/${slug}.md scripts/blog-keyword-queue.json`, { stdio: "inherit" });
  execSync(`git commit -m \"Auto-publish: ${title}\"`, { stdio: "inherit" });
  execSync("git push origin master", { stdio: "inherit" });

  console.log(`Published: ${slug}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
