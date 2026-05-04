import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Binary Froster — AI & Custom Software Development",
    short_name: "Binary Froster",
    description:
      "AI integrations, web apps, SaaS, e-commerce, and ERP development for SMEs worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#060A1A",
    theme_color: "#060A1A",
    icons: [
      {
        src: "/assets/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["business", "technology"],
    lang: "en",
    dir: "ltr",
  };
}
