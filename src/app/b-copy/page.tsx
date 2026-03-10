import type { Metadata } from "next";
import BCopyPageClient from "./BCopyPageClient";
import "./b-copy.css";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Preset B Local Preview",
    description: "Local preview route for Preset B Midnight Luxe cinematic landing page.",
    path: "/b-copy",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function BCopyPage() {
  return <BCopyPageClient />;
}
