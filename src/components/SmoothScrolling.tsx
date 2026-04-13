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

  useEffect(() => {
    // ScrollTrigger should refresh when window is resized
    ScrollTrigger.addEventListener("refreshInit", () => {
      // Any logic needed before refresh
    });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Give some time for layouts to settle then refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle route change: Reset scroll and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      // 1. Reset scroll to top immediately
      lenisRef.current.scrollTo(0, { immediate: true });
      
      // 2. Clear out any existing ScrollTriggers that might be leaking (stuck)
      // Note: Components should kill their own triggers, but we refresh globally
      
      // 3. Re-calculate all trigger positions after DOM update
      const timer = setTimeout(() => {
        ScrollTrigger.refresh(true); // pass true to force re-render
      }, 250); // Slightly longer delay to ensure Next.js transitions are done
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}
