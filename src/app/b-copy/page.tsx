import type { Metadata } from "next";
import BCopyPageClient from "./BCopyPageClient";
import "./b-copy.css";

export const metadata: Metadata = {
  title: "Preset B Local Preview",
  description: "Local preview route for Preset B Midnight Luxe cinematic landing page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BCopyPage() {
  return <BCopyPageClient />;
}
