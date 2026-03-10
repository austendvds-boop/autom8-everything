import type { Metadata } from "next";
import { DM_Serif_Display, Space_Grotesk, Space_Mono } from "next/font/google";
import CCopyPageClient from "./CCopyPageClient";
import "./c-copy.css";
import { buildMetadata } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Preset C Local Preview",
    description: "Local preview route for Preset C Brutalist Signal cinematic landing page.",
    path: "/c-copy",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function CCopyPage() {
  const fontClassName = `${spaceGrotesk.variable} ${dmSerifDisplay.variable} ${spaceMono.variable}`;

  return <CCopyPageClient fontClassName={fontClassName} />;
}
