# SEO-B2 — BOFU Blog Posts + Internal Link Refresh

**Thinking level: medium**

## Repo
- Path: `C:\Users\austen\.openclaw\workspace-coder\projects\autom8-everything`
- Branch: master

## Tasks

### 1. Write 3 BOFU blog posts

Create 3 new markdown files in `content/blog/`. Use the same frontmatter format as existing posts (see `content/blog/automation-agency-pricing-guide.md` for reference).

Each post: 800-1200 words, H2 structure, FAQ section at bottom with 5 Q&A pairs, internal links to relevant service pages, CTA paragraph linking to /contact.

#### Post 1: `content/blog/how-much-does-automation-cost.md`

```yaml
---
title: "How Much Does Business Automation Cost? Real Pricing Breakdown"
seoTitle: "How Much Does Business Automation Cost? Pricing Guide 2026 | Autom8 Everything"
metaDescription: "Business automation costs $1,500-$15,000+ depending on scope. See real pricing for CRM workflows, AI systems, and full automation builds."
category: "Automation Strategy"
tags: ["automation agency pricing", "automation services cost", "how much does business automation cost"]
publishedAt: 2026-03-10
featuredImage: ""
draft: false
---
```

**Content outline:**
- H2: What determines automation cost
- H2: Typical pricing ranges (CRM automation $1,500-$3,000, AI workflows $3,000-$8,000, full-stack builds $8,000-$15,000+)
- H2: Monthly vs one-time pricing models
- H2: What's included at each tier (reference /pricing page)
- H2: How to know if automation is worth the investment
- H2: Frequently Asked Questions (5 Q&A pairs targeting "automation services cost", "how much does business automation cost", "automation agency pricing")
- CTA section: link to /contact and /pricing

Internal links to include: `/services/custom-apps`, `/pricing`, `/contact`, `/blog/automation-agency-pricing-guide` (related existing post)

#### Post 2: `content/blog/automation-agency-vs-hiring-in-house.md`

```yaml
---
title: "Automation Agency vs Hiring In-House: Which Is Right for Your Business?"
seoTitle: "Automation Agency vs Hiring In-House: Cost & ROI Comparison | Autom8 Everything"
metaDescription: "Should you hire an automation specialist or use an agency? Compare costs, timelines, and outcomes to make the right call for your business."
category: "Comparisons"
tags: ["automation agency vs hiring", "should I hire an automation specialist", "automation consultant"]
publishedAt: 2026-03-10
featuredImage: ""
draft: false
---
```

**Content outline:**
- H2: The real cost of hiring in-house (salary $70-120k + benefits + ramp time)
- H2: What an automation agency delivers differently (breadth of tools, no ramp, project-based)
- H2: When hiring makes sense (dedicated full-time automation role, large org)
- H2: When an agency is the better bet (small-mid business, project-based, need speed)
- H2: Hybrid approach — agency builds, team maintains
- H2: Frequently Asked Questions (5 Q&A pairs targeting "automation agency vs hiring", "should I hire an automation specialist")
- CTA section: link to /contact and /services/custom-apps

Internal links to include: `/services/custom-apps`, `/services/cadence`, `/pricing`, `/contact`

#### Post 3: `content/blog/how-long-does-automation-setup-take.md`

```yaml
---
title: "How Long Does Business Automation Take to Set Up?"
seoTitle: "How Long Does Automation Setup Take? Timeline Guide | Autom8 Everything"
metaDescription: "Most business automation projects launch in 1-4 weeks. See realistic timelines for CRM, AI, and workflow automation implementation."
category: "Automation Strategy"
tags: ["automation implementation timeline", "how long does business automation take", "automation setup time"]
publishedAt: 2026-03-10
featuredImage: ""
draft: false
---
```

**Content outline:**
- H2: Quick wins — what launches in days (Cadence AI receptionist: same day, basic CRM automations: 3-5 days)
- H2: Standard builds — 1-2 weeks (CRM workflows, lead routing, follow-up sequences)
- H2: Complex implementations — 2-4 weeks (custom apps, multi-system integrations, full-stack builds)
- H2: What slows projects down (unclear requirements, missing access, scope creep)
- H2: How to speed up your automation timeline
- H2: Frequently Asked Questions (5 Q&A pairs targeting "automation implementation timeline", "how long does business automation take")
- CTA section: link to /contact and /get-started

Internal links to include: `/services/cadence`, `/services/review-funnel`, `/get-started`, `/contact`

### 2. Internal link refresh on existing location pages

Open `src/content/locations.ts` and update the 6 existing location entries to add internal link references in their `highlights` arrays. For each city, add or modify 1-2 highlight items to naturally reference `/services/review-funnel` and `/services/cadence`.

**Important:** The highlights render as plain `<li>` text — they don't support JSX links. Instead, update the CTA section in `src/app/locations/[slug]/page.tsx` to include links to review-funnel and cadence.

Find the "Build your local automation system" card section (around line 65-80). Update the paragraph to include links to both services:

```tsx
<p className="text-[#A1A1AA] mb-5">
  Review our <Link href="/pricing" className="text-[#8B5CF6] hover:text-[#A78BFA]">service offerings</Link>, explore
  <Link href="/services/seo-content" className="text-[#8B5CF6] hover:text-[#A78BFA]"> local SEO automation</Link>,
  try <Link href="/services/cadence" className="text-[#8B5CF6] hover:text-[#A78BFA]">Cadence AI receptionist</Link> for after-hours calls, or set up a
  <Link href="/services/review-funnel" className="text-[#8B5CF6] hover:text-[#A78BFA]"> review collection system</Link> to build your reputation. Ready?
  <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]"> Request your custom roadmap</Link>.
</p>
```

This adds contextual internal links to `/services/cadence` and `/services/review-funnel` on ALL location pages (existing + new) through the shared template.

## Gate

```powershell
cd "C:\Users\austen\.openclaw\workspace-coder\projects\autom8-everything"
npm run build
```

Must exit 0, no TypeScript errors.

## Commit

```
git add -A
git commit -m "feat(seo): 3 BOFU blog posts + internal links to cadence/review-funnel on location pages"
git push origin master
```

## Procurement Contract

Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps.

Every batch must end with a git commit and push to master. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it.

Coders MUST send a Telegram notification as the final step after git push:
```powershell
$ocConfig = Get-Content "C:\Users\austen\.openclaw\openclaw.json" -Raw | ConvertFrom-Json
$botToken = $ocConfig.channels.telegram.botToken
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/sendMessage" -Method Post -Body @{ chat_id = "7077676180"; text = "✅ SEO-B2 done — 3 BOFU blog posts + internal link refresh on location pages" }
```

Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
