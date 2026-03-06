import { permanentRedirect } from "next/navigation";

export default function WebsiteCreationRedirectPage() {
  permanentRedirect("/services/websites");
}
