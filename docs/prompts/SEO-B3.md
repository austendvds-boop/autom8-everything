# SEO-B3 — GA4 Script Setup

**Thinking level: low**

## Repo
- Path: `C:\Users\austen\.openclaw\workspace-coder\projects\autom8-everything`
- Branch: master

## Context

- All 3 service pages (websites, seo-content, custom-apps) **already have FAQSchema**. No FAQ work needed.
- The site uses `src/lib/analytics.ts` which pushes events to `window.gtag` — but the GA4 script tag is never loaded in `layout.tsx`. This means all analytics events are silently dropped.
- Need to add the GA4 gtag.js snippet to the layout so analytics actually works.

## Tasks

### 1. Add GA4 script to layout.tsx

Open `src/app/layout.tsx`.

Create a new component `GoogleAnalytics` (can be inline in layout or a separate file at `src/components/GoogleAnalytics.tsx`). Use `next/script` for proper loading:

```tsx
// src/components/GoogleAnalytics.tsx
"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
```

Then in `layout.tsx`, import and add `<GoogleAnalytics />` right after `<AnalyticsClickTracker />` inside the `<body>` tag.

**Key requirement:** If `NEXT_PUBLIC_GA4_ID` is not set or empty, the component renders nothing — no script tags, no errors, no build failures.

### 2. Add env var to .env.example

Open `.env.example` and add after the site URL section:

```
# Google Analytics 4
NEXT_PUBLIC_GA4_ID=
```

### 3. Verify no hardcoded placeholder IDs

Search the codebase for any `G-XXXXXXXXXX` or similar placeholder GA4 IDs. If found, remove them. The env var is the single source of truth.

## Gate

```powershell
cd "C:\Users\austen\.openclaw\workspace-coder\projects\autom8-everything"
npm run build
```

Must exit 0, no TypeScript errors. The build should pass even without `NEXT_PUBLIC_GA4_ID` set (component returns null).

## Commit

```
git add -A
git commit -m "feat(analytics): add GA4 gtag.js script via NEXT_PUBLIC_GA4_ID env var"
git push origin master
```

## Procurement Contract

Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps.

Every batch must end with a git commit and push to master. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it.

Coders MUST send a Telegram notification as the final step after git push:
```powershell
$ocConfig = Get-Content "C:\Users\austen\.openclaw\openclaw.json" -Raw | ConvertFrom-Json
$botToken = $ocConfig.channels.telegram.botToken
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/sendMessage" -Method Post -Body @{ chat_id = "7077676180"; text = "✅ SEO-B3 done — GA4 gtag.js script added via env var" }
```

Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
