# Conversion + Tracking Setup (GSC + GA4)

## Scope
This document defines the implementation checklist for:
- Google Search Console (GSC)
- Google Analytics 4 (GA4)
- Conversion event design
- Event naming standards

---

## 1) Google Search Console Setup

### Property setup
- [ ] Create/verify Domain property for `autom8everything.com`
- [ ] Add URL-prefix property for `https://autom8everything.com`
- [ ] Submit sitemap: `https://autom8everything.com/sitemap.xml`
- [ ] Validate robots access (`/robots.txt`)

### Initial checks
- [ ] Coverage/indexing check for core routes:
  - `/services`
  - `/services/*` landing pages
  - `/locations/*` pages
  - `/blog/*` article pages
- [ ] Confirm canonical is self-referential for indexable pages
- [ ] Set up email alerts for indexing/security/manual action

### Weekly operating rhythm
- [ ] New indexed pages vs submitted pages
- [ ] Query impressions + CTR trend by page group
- [ ] Core Web Vitals + mobile usability
- [ ] Crawl anomalies (404, soft-404, redirect loops)

---

## 2) GA4 Setup

### Property + stream
- [ ] Create GA4 property: `Autom8 Everything - Website`
- [ ] Configure Web Stream for `autom8everything.com`
- [ ] Install GA4 tag via GTM or gtag in production build
- [ ] Enable Enhanced Measurement (except duplicate events handled by GTM)

### Core dimensions to pass (custom params)
- `page_type` (home, service, location, blog, contact)
- `service_line` (ai-automation, crm-automation, local-seo, etc.)
- `city` (phoenix, scottsdale, glendale, tempe, mesa, chandler)
- `cta_location` (hero, mid-content, footer, blog-cta, nav)
- `lead_type` (contact_form, strategy_call, quote_request)

### Conversion config in GA4
Mark these as key events:
- `generate_lead`
- `book_strategy_call`
- `request_quote`

---

## 3) Event Naming Standard

### Rules
1. Use `snake_case`
2. Verb-first event names when possible
3. Keep event names stable over time
4. Put context in params, not event name variants

### Standard event map

| Event | Trigger | Required Params |
|---|---|---|
| `view_service_page` | Service page load | `service_line`, `page_type` |
| `view_location_page` | Location page load | `city`, `page_type` |
| `view_blog_post` | Blog detail page load | `post_slug`, `focus_keyword`, `page_type` |
| `click_cta` | Any high-intent CTA click | `cta_location`, `cta_text`, `page_type` |
| `start_contact_form` | First interaction with contact form | `page_type`, `lead_type` |
| `submit_contact_form` | Contact form submit success | `lead_type`, `page_type` |
| `request_quote` | Quote CTA click/submit | `service_line`, `city` (optional) |
| `book_strategy_call` | Strategy call click | `cta_location`, `page_type` |
| `generate_lead` | Final qualified lead action | `lead_type`, `source_page` |

### Parameter naming
- Lowercase strings
- Hyphenated slugs for route-derived values (`service_line`, `post_slug`)
- Avoid mixed naming styles (`camelCase` and `snake_case` in the same schema)

---

## 4) GTM Data Layer Shape (recommended)

```js
window.dataLayer.push({
  event: "click_cta",
  page_type: "blog",
  cta_location: "blog-cta",
  cta_text: "Book Your Free Audit",
  service_line: "crm-automation",
  city: "phoenix"
});
```

---

## 5) QA Checklist Before Launch

- [ ] Event fires once per action (no duplicates)
- [ ] Conversion events marked as key events in GA4
- [ ] Parameters appear in DebugView + Realtime
- [ ] Contact form success state tracked correctly
- [ ] CTA clicks tracked across desktop/mobile nav
- [ ] Blog + location + service page views tracked with proper context params

---

## 6) 30-Day Reporting Views

Create dashboards for:
1. Lead funnel by page type (`service` vs `location` vs `blog`)
2. CTA performance by placement (`hero`, `mid-content`, `footer`)
3. Top landing pages by conversion rate
4. Organic traffic pages with highest lead generation

---

## Blockers / Dependencies
- Final GTM container ID not yet provided
- Final CRM destination mapping for lead events not yet confirmed
- Placeholder business phone currently in site schema/content; replace with final production NAP data
