import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Software Projects",
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
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Case Studies & Projects | Binary Froster",
    description:
      "Real software built for real businesses. Explore ERP, SaaS, e-commerce, and AI project case studies.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Binary Froster | Software Case Studies",
    description:
      "AI SaaS, ERP systems, LMS platforms, and e-commerce case studies from Binary Froster.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

