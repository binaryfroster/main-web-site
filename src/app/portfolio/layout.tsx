import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.binaryfroster.com";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Software Projects | Binary Froster",
  description:
    "Browse Binary Froster's portfolio: AI-powered SaaS platforms, enterprise ERP systems, LMS platforms, e-commerce stores, and bespoke web applications. View real-world case studies.",
  keywords: [
    "software development portfolio",
    "web development case studies",
    "AI SaaS case study",
    "ERP system examples",
    "e-commerce development portfolio",
    "LMS platform development",
    "custom software examples",
    "software agency portfolio UK",
    "React Next.js portfolio",
  ],
  alternates: { canonical: `${SITE_URL}/portfolio` },
  openGraph: {
    title: "Portfolio — Case Studies & Projects | Binary Froster",
    description:
      "Real software built for real businesses. Explore ERP, SaaS, e-commerce, and AI project case studies.",
    url: `${SITE_URL}/portfolio`,
    type: "website",
    siteName: "Binary Froster",
    locale: "en_GB",
    images: [{ url: `${SITE_URL}/assets/logo.webp`, width: 1024, height: 1024, alt: "Binary Froster Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Binaryfroster",
    creator: "@Binaryfroster",
    title: "Portfolio — Binary Froster | Software Case Studies",
    description:
      "AI SaaS, ERP systems, LMS platforms, and e-commerce case studies from Binary Froster.",
    images: [`${SITE_URL}/assets/logo.webp`],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

