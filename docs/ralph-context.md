# Ralph Context — Autom8 CRO Passover

## B1: Design Tokens
- Created: `src/lib/design-tokens.ts` — exports SECTION_PY, CARD_BASE, CARD_ELEVATED, COLORS
- Modified: `src/app/globals.css` — added .card-base, .card-elevated, .btn-primary, .btn-secondary, .btn-ghost, .section-heading, .section-subheading, CSS custom properties for section spacing
- Branch: ui/cro-passover created from master
- Gotchas: Tailwind v4 uses @theme inline block — new CSS classes are plain CSS, not @apply. Components can use these classes directly via className.
