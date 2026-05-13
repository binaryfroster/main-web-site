import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.binaryfroster.com";

export const metadata: Metadata = {
  title: "Services — AI Integration, Web Development & Custom Software | Binary Froster",
  description:
    "Binary Froster builds AI chatbots, bespoke web applications, e-commerce stores, ERP systems, and SaaS products for SMEs worldwide. Get a free project quote today.",
  keywords: [
    "AI integration services",
    "custom software development",
    "web app development agency",
    "e-commerce development agency",
    "ERP software development",
    "SaaS product development",
    "business automation software",
    "Next.js React developer",
    "hire software agency UK",
    "software development India",
    "affordable web development",
  ],
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Services — AI Integration, Web & Custom Software | Binary Froster",
    description:
      "From AI chatbots to full-stack platforms. Explore how Binary Froster can build, automate, and scale your business technology.",
    url: `${SITE_URL}/services`,
    type: "website",
    siteName: "Binary Froster",
    locale: "en_GB",
    images: [{ url: `${SITE_URL}/assets/logo.webp`, width: 1024, height: 1024, alt: "Binary Froster Services" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Binaryfroster",
    creator: "@Binaryfroster",
    title: "Services — Binary Froster",
    description:
      "AI integrations, web apps, e-commerce, and SaaS development for businesses worldwide.",
    images: [`${SITE_URL}/assets/logo.webp`],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

