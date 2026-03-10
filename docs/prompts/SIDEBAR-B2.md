# SIDEBAR-B2: Mobile Responsive + Animation Polish

**Thinking level: medium**

## Context
You are working on `autom8everything.com` — a Next.js 16 site with TypeScript, Tailwind CSS 4, and Framer Motion 12. Branch: `ui/framer-sidebar`.

B1 built the core `ProductSidebar` component with desktop sidebar layout and basic click-to-switch interaction. This batch polishes responsive behavior, animations, and accessibility.

## Task

### 1. Mobile/Tablet Tab Strip (`src/components/ProductSidebar.tsx`)

Replace the B1 placeholder mobile layout with a proper horizontal tab strip:

**Tablet (768px–1023px) and Mobile (< 768px):**
- Product names render as horizontal tabs in a scrollable strip at the top of the section
- Tab strip: `flex gap-2 overflow-x-auto` with `scroll-snap-type: x mandatory` and `scroll-snap-align: start` on each tab
- Hide scrollbar: `-webkit-scrollbar { display: none }` + `scrollbar-width: none` (add to globals.css under a `.hide-scrollbar` utility class)
- Each tab: `px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap` in Syne font
- Active tab: `bg-[#8B5CF6]/20 text-white border border-[#8B5CF6]/40`
- Inactive tab: `text-[#52525B] border border-transparent` → hover `text-[#A1A1AA]`
- Auto-scroll active tab into view when selection changes (use `scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })` via a ref)
- Detail panel renders below, full width, with same content as desktop

**Desktop (≥ 1024px):**
- Keep the existing sidebar layout from B1 unchanged

### 2. Framer Motion Transitions

**Detail panel transitions:**
- Wrap the detail panel content in `<AnimatePresence mode="wait">` keyed by the selected product index
- Exit animation: `opacity: 0, y: 8` over 150ms
- Enter animation: `opacity: 1, y: 0` over 300ms with `ease: [0.16, 1, 0.3, 1]`
- Use a `<motion.div>` with `key={selectedIndex}` inside AnimatePresence

**Sidebar label interactions (desktop):**
- Active indicator bar: animate its position with `motion.div` using `layoutId="sidebar-indicator"` for a smooth sliding effect between labels
- Hover: `scale(1.02)` with `transition: { duration: 0.2 }`
- Click: subtle `scale(0.98)` tap feedback

**Tab strip interactions (mobile):**
- Active tab underline or background: use `layoutId="tab-indicator"` for smooth sliding between tabs
- Tap: `whileTap={{ scale: 0.96 }}`

**Section entrance:**
- Stagger the sidebar labels on first viewport entry using the existing `staggerContainer` + `staggerItem` variants from `src/lib/motion.ts`
- Detail panel fades up on first view using `fadeUp` variant
- Use `useReducedMotion()` — if true, skip all transforms, keep only opacity transitions

### 3. Accessibility

- Sidebar/tabs use `role="tablist"` on the container, `role="tab"` on each label/tab, `role="tabpanel"` on the detail panel
- `aria-selected="true"` on the active tab, `"false"` on others
- `tabIndex={0}` on active tab, `tabIndex={-1}` on inactive tabs
- Arrow key navigation: Left/Right (mobile tabs) and Up/Down (desktop sidebar) move selection
- `aria-controls` linking tabs to the panel `id`
- Focus visible ring: use existing `:focus-visible` styles from globals.css

### 4. Detail Panel Refinements

- For the hero product (Cadence), render the features list in a subtle sub-card (same `rounded-2xl border border-white/[0.12] bg-[#0F0F18]/70` treatment from ServicesBento)
- For non-hero products, if they have no features array, show a slightly larger value prop area with the micro-proof line more prominently displayed
- Ensure the detail panel has a consistent minimum height (`min-h-[420px] lg:min-h-[480px]`) so the layout doesn't jump between products of different content lengths

### 5. Globals.css Addition

Add this utility to `src/app/globals.css`:

```css
/* Hide scrollbar for tab strips */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

### 6. No Content Changes
Do not modify any text, copy, pricing, CTAs, or feature lists. Same data, better presentation.

## Gate
```bash
npm run build
```
Must complete with zero errors.

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps. Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it. Coders MUST notify Steve as the final step after git push by POSTing to `http://localhost:18789/hooks/agent` with `Authorization: Bearer KyCiiWTXATTqCayTrPyoE9krcBzXFP7YPtzqEGlA1aA=` and body `{"message":"Batch complete. Gate ready.","agentId":"main","deliver":false}`. Write the JSON to a temp file and use `curl.exe --data-binary @file` to avoid shell escaping issues. Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
