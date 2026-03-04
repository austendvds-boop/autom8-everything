import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/services", destination: "/pricing", permanent: true },
      { source: "/services/ai-automation", destination: "/services/custom-apps", permanent: true },
      { source: "/services/business-process-automation", destination: "/services/custom-apps", permanent: true },
      { source: "/services/crm-automation", destination: "/services/custom-apps", permanent: true },
      { source: "/services/email-automation-services", destination: "/services/custom-apps", permanent: true },
      { source: "/services/zapier-consulting", destination: "/services/custom-apps", permanent: true },
      { source: "/services/gohighlevel-setup", destination: "/services/custom-apps", permanent: true },
      { source: "/services/local-seo-automation", destination: "/services/seo-content", permanent: true },
      { source: "/automations", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
