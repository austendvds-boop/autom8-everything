/** Shared design tokens — warm amber/charcoal system */

export const SECTION_PY = {
  sm: 'py-20',
  md: 'py-28',
  lg: 'py-32',
} as const;

export const CARD_BASE = 'rounded-2xl border border-white/[0.06] bg-[#161920]';

export const CARD_ELEVATED =
  'rounded-3xl border border-white/[0.06] bg-[#161920] hover:border-[#D4A030]/30 hover:shadow-[0_0_40px_rgba(212,160,48,0.20)] transition-all duration-300';

export const COLORS = {
  bgPrimary: '#0E1015',
  bgSurface: '#161920',
  bgElevated: '#1E2028',
  accent: '#D4A030',
  accentHover: '#E5B544',
  accentMuted: '#B8892A',
  accentSubtle: 'rgba(212, 160, 48, 0.10)',
  accentGlow: 'rgba(212, 160, 48, 0.20)',
  textPrimary: '#EDEBE8',
  textSecondary: '#9B978F',
  textMuted: '#5E5B56',
  borderDefault: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(212, 160, 48, 0.30)',
  borderActive: 'rgba(212, 160, 48, 0.50)',
  star: '#F59E0B',
} as const;
