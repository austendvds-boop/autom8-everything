# SEO-B1 — Location Pages + Cadence Service SEO

**Thinking level: medium**

## Repo
- Path: `C:\Users\austen\.openclaw\workspace-coder\projects\autom8-everything`
- Branch: master

## Tasks

### 1. Add 3 new location pages (Gilbert, Peoria, Surprise)

Open `src/content/locations.ts` and add 3 new entries to the `locationPages` array. Follow the exact same structure as existing entries (Phoenix, Scottsdale, etc.).

Each entry needs:
- `slug` — lowercase city name
- `city` / `state` ("AZ")
- `title` — format: "[City] [Relevant Service] Services" (vary the service angle per city)
- `metaDescription` — unique, targets "[city] automation" keywords, under 160 chars
- `intro` — 1-2 sentences about what the city gets
- `highlights` — 3 bullet items (string array)
- `faqs` — 2 Q&A pairs relevant to that city

**Gilbert** — angle: small business automation + lead systems
**Peoria** — angle: operations automation + workflow optimization
**Surprise** — angle: growth automation + CRM systems

The dynamic route at `src/app/locations/[slug]/page.tsx` will auto-render these. The sitemap at `src/app/sitemap.ts` already auto-includes all `locationPages` entries — no sitemap edit needed for locations.

### 2. Cadence service page — schema + meta improvements (NO content changes)

File: `src/app/services/cadence/page.tsx`

**Do NOT rewrite page content, layout, or copy. Schema and meta changes only.**

#### 2a. Add pricing to ServiceSchema

The page already calls `buildServiceSchema()`. Replace that call with a manual schema object that includes an `offers` block:

```typescript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Voice Receptionist",
  name: "Cadence Voice Receptionist",
  description: "AI-powered voice receptionist that answers business calls 24/7, handles FAQs, routes urgent calls, and sends call summaries. Built for small businesses in Phoenix, Arizona.",
  provider: {
    "@type": "LocalBusiness",
    name: "Autom8 Everything",
    url: "https://autom8everything.com",
  },
  areaServed: "Phoenix, Arizona",
  url: "https://autom8everything.com/services/cadence",
  offers: {
    "@type": "Offer",
    price: "199",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "199",
      priceCurrency: "USD",
      unitText: "MONTH",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: "1",
        unitCode: "MON",
      },
    },
    description: "Monthly subscription. 7-day free trial. Cancel anytime.",
    availability: "https://schema.org/InStock",
  },
};
```

You can remove the `buildServiceSchema` import if it's no longer used on this page (check first — `buildFaqSchema` is still needed).

#### 2b. Add SEO-targeted FAQ entries

The page has a `faqs` array with 8 existing entries. **Add 8 more entries** to the same array, targeting these search terms:
- "AI phone answering"
- "AI receptionist for small business"
- "automated phone answering service Phoenix"

New FAQ entries to add:

```typescript
{
  question: "What is AI phone answering?",
  answer: "AI phone answering uses voice AI to answer your business calls in real time. It handles common questions, takes messages, and routes urgent calls — without a human receptionist.",
},
{
  question: "How does an AI receptionist work for small businesses?",
  answer: "An AI receptionist like Cadence answers every call with your custom greeting, handles FAQs about your services and hours, and sends you a summary. It works 24/7 so you never miss a lead.",
},
{
  question: "Is AI phone answering better than voicemail?",
  answer: "Yes. 80% of callers won't leave a voicemail. AI phone answering engages callers immediately, answers their questions, and captures their information — so you don't lose the lead.",
},
{
  question: "Can I use an automated phone answering service in Phoenix?",
  answer: "Yes. Cadence is built by Autom8 Everything in Phoenix, AZ and serves local businesses across the Valley. Setup takes about 5 minutes.",
},
{
  question: "How much does an AI receptionist cost compared to hiring?",
  answer: "Cadence costs $199/month. A full-time receptionist costs $2,500-$4,000+/month. You get 24/7 coverage at a fraction of the cost.",
},
{
  question: "Will callers know they're talking to AI?",
  answer: "Cadence sounds natural and conversational. Most callers don't realize it's AI — they just get their questions answered quickly.",
},
{
  question: "Can an automated phone answering service book appointments?",
  answer: "Yes. Cadence can collect caller information and schedule follow-ups based on rules you set during onboarding.",
},
{
  question: "What types of businesses use AI phone answering?",
  answer: "HVAC companies, plumbers, dentists, contractors, law firms, and any service business that loses leads to missed calls. If you rely on phone leads, Cadence helps.",
},
```

#### 2c. Update meta keywords

In the `metadata` export, update the `keywords` array to include:
```typescript
keywords: [
  "AI phone answering",
  "AI receptionist for small business",
  "automated phone answering service Phoenix",
  "voice receptionist",
  "business call answering",
  "small business phone answering",
  "cadence receptionist",
  "after hours call coverage",
],
```

#### 2d. Tighten meta title

Update the title in `buildMetadata` to:
```
"AI Phone Answering for Small Business | Cadence by Autom8 Everything"
```

### 3. Sitemap

The sitemap at `src/app/sitemap.ts` auto-includes location pages and already has `/services/cadence`. No changes needed unless the Cadence path changed (it didn't). **Verify this — if sitemap already has `/services/cadence` in `staticRoutes`, no edit needed.**

## Gate

```powershell
cd "C:\Users\austen\.openclaw\workspace-coder\projects\autom8-everything"
npm run build
```

Must exit 0, no TypeScript errors.

## Commit

```
git add -A
git commit -m "feat(seo): add Gilbert/Peoria/Surprise location pages + Cadence schema/meta SEO"
git push origin master
```

## Procurement Contract

Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps.

Every batch must end with a git commit and push to master. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it.

Coders MUST send a Telegram notification as the final step after git push:
```powershell
$ocConfig = Get-Content "C:\Users\austen\.openclaw\openclaw.json" -Raw | ConvertFrom-Json
$botToken = $ocConfig.channels.telegram.botToken
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/sendMessage" -Method Post -Body @{ chat_id = "7077676180"; text = "✅ SEO-B1 done — Gilbert/Peoria/Surprise locations + Cadence schema/meta SEO" }
```

Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
