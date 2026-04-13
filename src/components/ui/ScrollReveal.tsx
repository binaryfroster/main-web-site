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
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply stagger delay if specified
          if (stagger > 0) {
            const children = el.querySelectorAll(":scope > *");
            children.forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * stagger}ms`;
            });
          }
          
          setTimeout(() => {
            el.classList.add("visible");
          }, stagger > 0 ? 0 : 0);
          
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, threshold]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
