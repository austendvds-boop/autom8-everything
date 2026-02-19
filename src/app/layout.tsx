import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// Playfair Display as Instrument Serif alternative (elegant serif)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "autom8 everything | From Chaos to Autopilot",
  description: "The automation system for modern businesses. Save 20+ hours per week with intelligent workflows that handle your repetitive tasks.",
  keywords: ["automation", "business automation", "workflow automation", "productivity", "CRM sync", "email automation"],
  authors: [{ name: "autom8" }],
  openGraph: {
    title: "autom8 everything | From Chaos to Autopilot",
    description: "The automation system for modern businesses. Save 20+ hours per week.",
    type: "website",
    locale: "en_US",
    siteName: "autom8",
  },
  twitter: {
    card: "summary_large_image",
    title: "autom8 everything",
    description: "From chaos to autopilot. The automation system for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}
        style={{
          fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
