# QA — Launch Readiness (2026-02-23)

## Scope
- Metadata + canonical + robots + sitemap
- NAP/schema placeholder removal
- OG/Twitter share tags
- Route/link sanity and build stability

## Implemented
- Standardized business identity defaults in `src/lib/business.ts`:
  - default email now `hello@autom8everything.com`
  - added optional `NEXT_PUBLIC_BUSINESS_STREET_ADDRESS` and `NEXT_PUBLIC_BUSINESS_POSTAL_CODE`
- Updated LocalBusiness JSON-LD in `src/app/layout.tsx`:
  - `streetAddress` and `postalCode` included only when configured
  - `areaServed` now uses `businessProfile.serviceAreaLabel`
- Updated `.env.example`:
  - removed placeholder phone values
  - added optional street/postal env keys

## Verified Evidence
1. Build
   - Command: `npm run build`
   - Result: PASS (static generation complete; no build errors)

2. Metadata tags (local runtime checks)
   - Checked: `/`, `/services`, `/contact`, `/blog`
   - Verified present on each page:
     - `<title>`
     - `<meta name="description">`
     - `<link rel="canonical">`
     - OG tags (`og:title`, `og:description`, `og:image`)
     - `twitter:card`

3. Robots + sitemap
   - `http://localhost:4010/robots.txt` returns allow-all + sitemap reference
   - `http://localhost:4010/sitemap.xml` returns expected core + service + blog + location URLs

4. JSON-LD schema
   - Homepage `LocalBusiness` JSON-LD verified present
   - No placeholder phone emitted when phone env vars are blank
   - NAP fields now env-driven and safe for production override

5. Internal links sanity
   - Extracted internal href targets from source and confirmed key routes exist:
     - `/services`, `/services/*`, `/locations`, `/locations/phoenix`, `/blog`, `/automations`, `/contact`

## Open Blocker (Needs Austen)
- Final verified production phone number (display + E.164) not provided in repo.
- Optional: publish full street address + postal code if desired for citations/GBP consistency.

## Acceptance Checklist
- [x] 1) `npm run build` clean
- [x] 2) No broken routes observed in generated route map
- [x] 3) Per-page metadata + canonical + robots + sitemap verified
- [~] 4) Placeholder NAP/schema values removed from code defaults; final real phone/address still pending owner input
- [x] 5) OG + Twitter tags render in page source
- [x] 6) Internal links sane + sitemap includes key pages
- [x] 7) Evidence documented (implemented vs verified)
