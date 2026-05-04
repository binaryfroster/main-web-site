import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Software Project Today",
  description:
    "Ready to build? Contact Binary Froster for a free consultation. We respond within 24 hours. Serving startups and SMEs in the UK, US, India, and worldwide.",
  keywords: [
    "contact software agency",
    "hire software developer",
    "free software development consultation",
    "get a software quote",
    "software agency UK contact",
    "outsource software development",
    "start a software project",
    "custom web development inquiry",
    "AI development quote",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Binary Froster — Free Project Consultation",
    description:
      "Start a conversation. Tell us about your project and get a free, no-obligation quote within 24 hours.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Binary Froster — Start Your Project",
    description:
      "Free 24-hour consultation for your software, AI, or web development project.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

