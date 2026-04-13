"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  stagger = 0,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Always reset visibility on mount so re-entering a page re-triggers animations
    el.classList.remove("visible");

    // Respect reduced-motion preference — just show immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("visible");
      return;
    }

    const trigger = () => {
      if (stagger > 0) {
        const kids = el.querySelectorAll(":scope > *");
        kids.forEach((child, i) => {
          (child as HTMLElement).style.transitionDelay = `${i * stagger}ms`;
        });
      }
      el.classList.add("visible");
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) trigger();
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    // Safety net: if the element is already fully in viewport on mount (e.g. top of page),
    // fire it after a brief delay so CSS transition has time to attach
    const safetyCheck = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) trigger();
    }, 120);

    return () => {
      observer.disconnect();
      clearTimeout(safetyCheck);
    };
  }, [stagger, threshold]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
