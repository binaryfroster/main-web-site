import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work — Portfolio",
  description: "Explore Binary Froster's demo projects: ERP systems, LMS platforms, e-commerce stores, AI tools, and more.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
