import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — AI Integration, Web Development & Custom Software",
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
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — AI Integration, Web & Custom Software | Binary Froster",
    description:
      "From AI chatbots to full-stack platforms. Explore how Binary Froster can build, automate, and scale your business technology.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Binary Froster",
    description:
      "AI integrations, web apps, e-commerce, and SaaS development for businesses worldwide.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

