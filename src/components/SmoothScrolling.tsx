"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis once — wire into GSAP ticker for perfect sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On every route change: scroll to top + refresh layout, do NOT kill triggers
  // (each page component is responsible for killing its own triggers in useEffect cleanup)
  useEffect(() => {
    const lenis = lenisRef.current;

    // 1. Jump to top immediately
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // 2. After Next.js paints the new page, refresh positions
    //    Dispatch resize to re-trigger IntersectionObserver (ScrollReveal)
    const t1 = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(t1);
  }, [pathname]);

  return <>{children}</>;
}
