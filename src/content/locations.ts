export type LocationPage = {
  slug: string;
  city: string;
  state: string;
  title: string;
  metaDescription: string;
  intro: string;
  highlights: string[];
  faqs: { question: string; answer: string }[];
};

export const locationPages: LocationPage[] = [
  {
    slug: "phoenix",
    city: "Phoenix",
    state: "AZ",
    title: "Phoenix Automation Agency Services",
    metaDescription:
      "Phoenix automation agency services for CRM workflows, AI operations, and local SEO systems that increase qualified leads.",
    intro:
      "We help Phoenix service businesses build automation systems that improve response speed, reduce manual admin, and increase close rates.",
    highlights: [
      "Lead capture and response automations tuned for local-intent traffic",
      "CRM automation for routing, follow-up, and pipeline hygiene",
      "Local SEO infrastructure with service pages, schema, and citation consistency",
    ],
    faqs: [
      {
        question: "Do you work with Phoenix-only companies?",
        answer: "No. Phoenix is our local hub, but we support Arizona and remote teams across the U.S.",
      },
      {
        question: "What can launch first for Phoenix businesses?",
        answer: "Most engagements start with lead response automation and CRM handoff workflows.",
      },
    ],
  },
  {
    slug: "scottsdale",
    city: "Scottsdale",
    state: "AZ",
    title: "Scottsdale Web Design and Automation Services",
    metaDescription:
      "Scottsdale web design and automation services for premium service brands that need better lead handling and conversion systems.",
    intro:
      "Scottsdale businesses can combine premium web experiences with backend automation to create a faster and more reliable sales process.",
    highlights: [
      "Conversion-first service page architecture with automation-ready forms",
      "Automated appointment reminders and lead routing sequences",
      "CRM and reporting setup for clear attribution and close-rate visibility",
    ],
    faqs: [
      {
        question: "Can you improve an existing Scottsdale website?",
        answer: "Yes, we can layer automation and SEO improvements onto your current site without a full rebuild.",
      },
      {
        question: "Do Scottsdale campaigns include local SEO?",
        answer: "Yes, we include local intent optimization and citation consistency plans where relevant.",
      },
    ],
  },
  {
    slug: "glendale",
    city: "Glendale",
    state: "AZ",
    title: "Automation Services Glendale AZ",
    metaDescription:
      "Automation services in Glendale AZ for service businesses that need faster lead response and stronger operations.",
    intro:
      "Our Glendale automation services focus on practical systems that help owners respond faster and operate with less manual overhead.",
    highlights: [
      "Immediate lead acknowledgment and qualification workflows",
      "Pipeline automation to reduce stale opportunities",
      "Location-aware SEO and internal linking support",
    ],
    faqs: [
      {
        question: "How quickly can Glendale workflows go live?",
        answer: "Simple lead workflows can often launch within 1-2 weeks.",
      },
      {
        question: "Do you support Glendale multi-location companies?",
        answer: "Yes, we build systems that can scale across multiple city pages and teams.",
      },
    ],
  },
  {
    slug: "tempe",
    city: "Tempe",
    state: "AZ",
    title: "Tempe Small Business Automation Services",
    metaDescription:
      "Tempe small business automation services for CRM setup, workflow optimization, and local lead conversion systems.",
    intro:
      "Tempe teams use our automation frameworks to reduce repetitive operations and improve consistency across lead and delivery workflows.",
    highlights: [
      "Lead-to-appointment automations for faster pipeline movement",
      "Email and SMS follow-up sequences by lifecycle stage",
      "Monthly workflow optimization and reporting",
    ],
    faqs: [
      {
        question: "Do Tempe projects include analytics tracking?",
        answer: "Yes, we define key conversion events and connect them to your reporting stack.",
      },
      {
        question: "Can we keep our current CRM?",
        answer: "In most cases yes. We integrate and optimize your existing CRM first.",
      },
    ],
  },
  {
    slug: "mesa",
    city: "Mesa",
    state: "AZ",
    title: "Mesa Business Automation Services",
    metaDescription:
      "Mesa business automation services for operations, CRM workflows, and local growth systems.",
    intro:
      "Mesa business owners use automation to streamline team handoffs, protect follow-up speed, and improve client delivery consistency.",
    highlights: [
      "Business process automation for daily operations",
      "CRM automation for lead assignment and follow-up",
      "Service-page SEO support for Mesa local search intent",
    ],
    faqs: [
      {
        question: "What industries do you support in Mesa?",
        answer: "We primarily support service businesses including home services, professional services, and agencies.",
      },
      {
        question: "Do you offer ongoing optimization?",
        answer: "Yes, we provide monthly optimization and performance review support.",
      },
    ],
  },
  {
    slug: "chandler",
    city: "Chandler",
    state: "AZ",
    title: "Chandler Automation Agency Services",
    metaDescription:
      "Chandler automation agency services for high-intent lead workflows, CRM operations, and local SEO execution.",
    intro:
      "Our Chandler automation agency services combine growth-focused workflow design with local SEO support and measurable conversion tracking.",
    highlights: [
      "End-to-end sales workflow automation",
      "AI-assisted operations workflows for lean teams",
      "Local content and citation support tied to conversion goals",
    ],
    faqs: [
      {
        question: "Can Chandler teams start with one service?",
        answer: "Yes, many clients start with CRM or lead automation and expand in phases.",
      },
      {
        question: "Will automation replace our team?",
        answer: "No. Automation reduces repetitive tasks so your team can focus on higher-value client work.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return locationPages.find((location) => location.slug === slug);
}
