import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/og");
mkdirSync(outDir, { recursive: true });

// 1200x630 OG image — Autom8 brand colors (dark bg, gold chevron mark, gold wordmark)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4A030"/>
      <stop offset="100%" stop-color="#E8C068"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4A030" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#E8C068" stop-opacity="0.04"/>
    </linearGradient>
    <radialGradient id="bg-glow" cx="30%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1A1508" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0E1015" stop-opacity="1"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-glow)"/>

  <!-- Subtle grid lines -->
  <line x1="0" y1="315" x2="1200" y2="315" stroke="rgba(212,160,48,0.06)" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="rgba(212,160,48,0.06)" stroke-width="1"/>

  <!-- Brand mark (chevrons) -->
  <g fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(80, 195)">
    <path d="M0 0 L80 120 L0 240" stroke="url(#gold)" stroke-width="22"/>
    <path d="M56 0 L136 120 L56 240" stroke="url(#gold)" stroke-width="22" opacity="0.6"/>
    <path d="M112 0 L192 120 L112 240" stroke="url(#gold)" stroke-width="22" opacity="0.28"/>
  </g>

  <!-- Mark backdrop glow -->
  <ellipse cx="220" cy="315" rx="180" ry="160" fill="rgba(212,160,48,0.07)"/>

  <!-- Wordmark: Autom8 -->
  <text x="330" y="295" font-family="Georgia, serif" font-size="96" font-weight="700" fill="#EDEBE8" letter-spacing="-3">Autom</text>
  <text x="797" y="295" font-family="Georgia, serif" font-size="96" font-weight="700" fill="url(#gold)" letter-spacing="-3">8</text>

  <!-- Descriptor -->
  <text x="332" y="352" font-family="Arial, sans-serif" font-size="22" font-weight="600" fill="#9B978F" letter-spacing="6" text-transform="uppercase">EVERYTHING</text>

  <!-- Tagline -->
  <text x="332" y="430" font-family="Arial, sans-serif" font-size="30" fill="#C9C4BB" letter-spacing="-0.5">Tools for local businesses — without the tech headache.</text>

  <!-- Border -->
  <rect x="2" y="2" width="1196" height="626" rx="0" fill="none" stroke="rgba(212,160,48,0.15)" stroke-width="2"/>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile(join(outDir, "autom8-share.png"));

console.log("✓ autom8-share.png (1200x630)");
