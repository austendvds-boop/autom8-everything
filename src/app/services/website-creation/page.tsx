import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Website Creation Redirect | Autom8 Everything",
    description: "Legacy website creation route that now redirects to the Autom8 Everything websites service page.",
    path: "/services/website-creation",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function WebsiteCreationRedirectPage() {
  permanentRedirect("/services/websites");
}
