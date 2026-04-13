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

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Wire Lenis into GSAP ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On every route change: scroll to top + refresh all observers
  useEffect(() => {
    const lenis = lenisRef.current;

    // 1. Jump scroll to top immediately (no animation — page already changed)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // 2. Kill any ScrollTriggers left over from the previous page
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // 3. After Next.js finishes painting the new page DOM, refresh everything
    //    Two-pass refresh: first quick pass catches gross layout, second catches lazy images etc.
    const t1 = setTimeout(() => {
      // Force IntersectionObservers (ScrollReveal) to re-evaluate by simulating a resize
      window.dispatchEvent(new Event("resize"));
      ScrollTrigger.refresh(true);
    }, 100);

    const t2 = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return <>{children}</>;
}
