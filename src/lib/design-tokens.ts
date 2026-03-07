/** Shared design tokens for consistent section spacing and card styling */

export const SECTION_PY = {
  sm: 'py-20',
  md: 'py-28',
  lg: 'py-32',
} as const;

export const CARD_BASE = 'rounded-2xl border border-white/[0.06] bg-[#111118]';

export const CARD_ELEVATED =
  'rounded-3xl border border-white/[0.06] bg-[#111118] hover:border-[#8B5CF6]/35 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.32),0_0_78px_rgba(139,92,246,0.12)] transition-all duration-300';

export const COLORS = {
  bgPrimary: '#0A0A0F',
  bgSurface: '#12121A',
  bgElevated: '#1A1A23',
  accentPrimary: '#8B5CF6',
  accentSecondary: '#06B6D4',
  accentTertiary: '#A78BFA',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#52525B',
} as const;
