# RUNBOOK — Metadata, NAP, and Share Preview Operations

## 1) Required env for launch
Set in deployment environment:

- `NEXT_PUBLIC_SITE_URL=https://autom8everything.com`
- `NEXT_PUBLIC_BUSINESS_NAME=Autom8 Everything`
- `NEXT_PUBLIC_BUSINESS_EMAIL=hello@autom8everything.com`
- `NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY=<final public phone>`
- `NEXT_PUBLIC_BUSINESS_PHONE_E164=<final e164 phone, ex +1602...>`
- `NEXT_PUBLIC_BUSINESS_STREET_ADDRESS=<optional>`
- `NEXT_PUBLIC_BUSINESS_POSTAL_CODE=<optional>`
- `NEXT_PUBLIC_BUSINESS_CITY=Phoenix`
- `NEXT_PUBLIC_BUSINESS_STATE=AZ`
- `NEXT_PUBLIC_BUSINESS_COUNTRY=US`
- `NEXT_PUBLIC_BUSINESS_SERVICE_AREA_LABEL=Serving Arizona and remote clients across the U.S.`

## 2) Build verification
```bash
npm run build
```
Expected:
- Build succeeds
- App route map includes `/robots.txt` and `/sitemap.xml`

## 3) Local metadata checks
```bash
npm run start -- --port 4010
```
Then verify in browser/view-source or with curl:
- `/`
- `/services`
- `/contact`
- `/blog`

Check for:
- `title`
- `meta[name=description]`
- `link[rel=canonical]`
- `meta[property=og:title|og:description|og:image]`
- `meta[name=twitter:card]`

## 4) JSON-LD check
On homepage source, locate `application/ld+json` and confirm:
- `@type = LocalBusiness`
- Name/email/location values are correct
- `telephone` appears only if phone env vars are set

Optional validator:
- https://validator.schema.org/

## 5) OG/share debugger checks (post-deploy)
Run each URL through:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- X Card Validator alternative checks (or inspect Open Graph fetch via social preview tools)

Confirm:
- title, description, and image (`/og/autom8-share.png`) are correct

## 6) Sitemap/robots checks
- `https://autom8everything.com/robots.txt`
- `https://autom8everything.com/sitemap.xml`

Confirm sitemap includes:
- Home, services pages, blog index + posts, locations index + city pages, contact/legal

## 7) Release gate
Do not mark final launch complete until:
- Final phone number is set in both display and E.164 env vars
- (Optional) street address/postal code finalized if public address strategy requires it
