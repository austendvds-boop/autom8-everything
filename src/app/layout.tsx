import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import { businessProfile, businessSameAs } from "@/lib/business";
import { defaultDescription, defaultOgImage, defaultTitle, siteName, siteUrl } from "@/lib/seo";
import AnalyticsClickTracker from "@/components/AnalyticsClickTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${siteUrl}/#localbusiness`,
  name: siteName,
  url: siteUrl,
  image: `${siteUrl}${defaultOgImage}`,
  email: businessProfile.email,
  ...(businessProfile.phoneE164 ? { telephone: businessProfile.phoneE164 } : {}),
  address: {
    "@type": "PostalAddress",
    ...(businessProfile.streetAddress ? { streetAddress: businessProfile.streetAddress } : {}),
    ...(businessProfile.postalCode ? { postalCode: businessProfile.postalCode } : {}),
    addressLocality: businessProfile.city,
    addressRegion: businessProfile.state,
    addressCountry: businessProfile.country,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: businessProfile.serviceAreaLabel,
  },
  priceRange: "$$$",
  sameAs: businessSameAs,
  description: defaultDescription,
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}${defaultOgImage}`,
  sameAs: businessSameAs,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "business automation",
    "ai automation",
    "workflow automation",
    "crm automation",
    "automation consulting",
    "local seo services",
    "phoenix automation agency",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Autom8 Everything - Business Automation & AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${syne.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AnalyticsClickTracker />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
