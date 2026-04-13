import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Diet Planner — Personalized Nutrition Plans",
  description: "Get personalized meal plans powered by AI. Tracks macros, adapts to allergies, and costs just £7.99/month. Try free for 7 days.",
};

export default function DietPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
