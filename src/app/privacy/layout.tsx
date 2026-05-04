import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — How We Use Your Data",
  description:
    "Read Binary Froster's Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and US privacy laws.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
