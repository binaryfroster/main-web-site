import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal — Dashboard",
  description: "Access your Binary Froster client dashboard. Track projects, view invoices, and communicate with your development team.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
