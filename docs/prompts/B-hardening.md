# B-hardening: Production SEO & Legal Hardening

## Thinking level: medium

## Context
- Repo: `austendvds-boop/autom8-everything`
- Branch: `master`
- Domain: `https://autom8everything.com`
- Stack: Next.js App Router + TypeScript + Tailwind
- OG image: `/og/autom8-share.png` (exists in `public/og/`)
- SEO helpers: `src/lib/seo.ts` exports `buildMetadata()`, `siteUrl`, `siteName`, `defaultOgImage`, `defaultTitle`, `defaultDescription`, `toAbsoluteUrl()`, `buildServiceSchema()`, `buildFaqSchema()`
- Business config: `src/lib/business.ts` exports `businessProfile` and `businessSameAs`
- Root layout: `src/app/layout.tsx` already has root-level `metadata` with OG, Twitter, canonical, and a `LocalBusiness` JSON-LD script

## Tasks

### 1. OG/Twitter Social Meta Audit

Audit every `page.tsx` file under `src/app/`. For each **public** page (not portal, admin, review-funnel/dashboard, or `/r/` routes), ensure metadata is exported via `buildMetadata()` or a static `metadata` export that includes:
- `title` (unique, descriptive)
- `description` (unique, plain language)
- `openGraph.title`, `openGraph.description`, `openGraph.url`, `openGraph.type`, `openGraph.images`
- `twitter.card` (`summary_large_image`), `twitter.title`, `twitter.description`

The `buildMetadata()` helper in `src/lib/seo.ts` already produces all OG + Twitter fields. **Use it everywhere possible** — just pass `title`, `description`, `path`, and optionally `keywords`.

Pages that currently lack metadata or use incomplete metadata:
- `src/app/services/page.tsx` — NO metadata export. Add one using `buildMetadata()`.
- `src/app/services/website-creation/page.tsx` — NO metadata export (it's a redirect page, but add `robots: { index: false }` metadata).
- `src/app/automations/page.tsx` — verify it has full OG/Twitter via `buildMetadata()`.
- `src/app/b-copy/page.tsx` and `src/app/c-copy/page.tsx` — these are test/copy pages. Add `robots: { index: false }` metadata if not present.

For all other public pages, spot-check that they use `buildMetadata()` and have real (not placeholder) title/description values. Fix any that don't.

### 2. Canonical Tags

Every public page's metadata must include `alternates: { canonical: "/path" }`. The `buildMetadata()` helper already sets this from the `path` param. Verify all pages using `buildMetadata()` pass the correct `path`. For pages with static `metadata` exports, ensure `alternates.canonical` is set.

Root layout already sets `alternates: { canonical: "/" }` as default. This is correct.

### 3. Schema Markup

The root layout (`src/app/layout.tsx`) currently has a `LocalBusiness` JSON-LD schema. Update/supplement it:

**a) Change `@type` from `LocalBusiness` to an array `["LocalBusiness", "ProfessionalService"]`** so the schema covers both types.

**b) Add a `WebSite` schema** with `SearchAction` (sitelinks search box). Add this as a second `<script type="application/ld+json">` in the `<body>` of `layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Autom8 Everything",
  "url": "https://autom8everything.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://autom8everything.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

Use the `siteUrl` and `siteName` imports from `@/lib/seo` for the values.

**c) Remove `streetAddress` and `postalCode` from the existing LocalBusiness address** if they are empty strings. The business is a service-area business — an empty `streetAddress` is worse than omitting it. The current code conditionally spreads them only when truthy, which is correct. Verify it works (if env vars are empty, those fields should not appear in the output).

**d) Add `Organization` schema** as a third JSON-LD block:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Autom8 Everything",
  "url": "https://autom8everything.com",
  "logo": "https://autom8everything.com/og/autom8-share.png",
  "sameAs": []
}
```

Use `siteUrl`, `siteName`, `defaultOgImage`, and `businessSameAs` from the existing imports.

### 4. Sitemap Audit

File: `src/app/sitemap.ts`

Current `staticRoutes` list:
```
"", "/pricing", "/services/cadence", "/services/websites", "/services/review-funnel",
"/services/seo-content", "/services/custom-apps", "/about", "/blog", "/locations",
"/contact", "/get-started", "/privacy", "/terms", "/security"
```

**Add missing public pages:**
- `/review-funnel/signup` — this is a public signup page, should be in the sitemap
- `/services` — if the services index page is a real public page (not a redirect), add it
- `/automations` — if it's a real public page, add it

**Verify NO portal/admin/dashboard routes** are in the list. Currently none are — this is correct.

**Set priority values more granularly:**
- Homepage (`""`): `1.0`
- Service pages + pricing: `0.9`
- About, contact, blog index, locations index, get-started: `0.8`
- Blog posts: `0.7`
- Location pages: `0.7`
- Legal pages (privacy, terms, security): `0.3`
- Signup pages: `0.6`

**Set changeFrequency:**
- Blog posts: `weekly`
- Service/pricing pages: `monthly`
- Legal/about/contact: `yearly`
- Homepage: `weekly`

### 5. noindex Sweep

Scan all page files for non-portal pages that should be noindexed. These transactional/confirmation/test routes should have `robots: { index: false, follow: false }` in metadata:

- `src/app/get-started/success/page.tsx` — already has noindex ✅
- `src/app/onboarding/success/page.tsx` — already has noindex ✅
- `src/app/cadence/welcome/page.tsx` — already has noindex ✅
- `src/app/b-copy/page.tsx` — **add noindex if missing**
- `src/app/c-copy/page.tsx` — **add noindex if missing**
- `src/app/services/website-creation/page.tsx` — this is a redirect, **add noindex**
- `src/app/onboarding/page.tsx` — verify; if it's an intake form, it may be fine indexed or may need noindex. Use judgment: if it's behind a flow (user should arrive from a CTA, not search), noindex it.
- `src/app/automations/page.tsx` — verify if this is a real public page or a legacy/test route. If legacy/test, noindex it.

### 6. Legal Copy Check

**Read `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` fully.**

The privacy page already has real content (data collection, SMS consent, cookies, etc.) — verify it is complete and professional. If any sections are placeholder/lorem ipsum, replace them.

The terms page already has real content (payments, IP, text message terms, etc.) — verify it is complete. If any sections are placeholder, replace them.

Both pages should:
- Reference "Autom8 Everything" by name
- State Arizona jurisdiction
- NOT include a physical address (service-area business)
- Use plain language (no legalese jargon)
- Include an effective date
- Include contact email `hello@autom8everything.com` or `aust@autom8everything.com`

If both are already complete and professional, leave them alone.

### 7. Internal Link Audit

**Footer (`src/components/Footer.tsx`):**
- Current links look correct. Verify:
  - `Client Login` links to `https://cadence-m48n.onrender.com/login` — this is an external Cadence dashboard link. Verify it's intentional (not a dead link or placeholder).
  - No `href="#"` placeholders.
  - All product links point to real `/services/*` routes.
  - `Client Portal` link to `/portal/login` should exist in company links.

- Check if there's a `Client Portal` link. From CODER-CONTEXT: Batch 16 added a `Client Portal` link to `/portal/login` in the Company column. Verify it's still present. If not, add it.

**Navigation (`src/components/Navigation.tsx`):**
- Verify all links point to real routes.
- No `href="#"` placeholders.
- Product dropdown links all go to real `/services/*` pages.

Fix any broken or placeholder links found.

## Gate
```powershell
npm run build
```
Must pass with zero errors. Warnings OK.

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps.

Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it.

Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.

## Commit message
```
chore: production SEO hardening — meta, schema, sitemap, legal, links
```

## Telegram Notification (FINAL step after git push)
```powershell
Invoke-RestMethod -Uri "https://api.telegram.org/bot7819337210:AAHVCzBBcKQjDfhHVRuclnA-2yDjUvHg3IM/sendMessage" -Method POST -ContentType "application/json" -Body '{"chat_id":"7077676180","text":"✅ autom8-hardening complete. Commit pushed to master."}'
```
