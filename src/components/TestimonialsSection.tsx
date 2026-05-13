"use client";

import { useEffect, useRef, useState } from "react";
import { TextEffect } from "@/components/ui/premium";

const TESTIMONIALS = [
  {
    // PLACEHOLDER
    client: "James Whitfield",
    role: "Head of Digital",
    company: "FlowOps Ltd",
    quote: "Binary Froster delivered our high-performance e-commerce engine in just 6 weeks when others quoted 6 months. Their extreme development speed gave us a massive first-mover advantage in the UK market.",
    outcome: "Speed",
  },
  {
    // PLACEHOLDER
    client: "Sarah Chen",
    role: "COO",
    company: "MediCare Hub",
    quote: "We saved over 50% compared to traditional enterprise agency quotes without sacrificing architectural robustness. Receiving 100% code ownership with zero ongoing licensing fees was a complete game-changer for our operating budget.",
    outcome: "Price",
  },
  {
    // PLACEHOLDER
    client: "Tom Rashid",
    role: "Founder",
    company: "Launchify",
    quote: "The code quality and AI integrations built into our SaaS platform are absolutely state-of-the-art. Every milestone was hit flawlessly with crystal-clear direct communication from their senior engineers.",
    outcome: "Quality",
  },
];

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto px-6 max-w-[1320px] my-20">
      <div className="text-center mb-16">
        <span className="eyebrow">Client Success</span>
        <TextEffect className="text-h2 mt-4" preset="blur" per="word">
          Proven Outcomes
        </TextEffect>
        <p className="text-[var(--text-muted)] mt-4 max-w-xl mx-auto leading-relaxed text-base">
          Hear directly from SME leaders across the UK and US who rely on our engineered platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => {
          const showImmediately = prefersReduced || isVisible;
          return (
            <div
              key={idx}
              style={{
                transitionDelay: prefersReduced ? "0ms" : `${idx * 60}ms`,
              }}
              className={`bg-[#111111] border border-[#2a2a2a] border-l-[3px] border-l-[#B8F564] rounded-[16px] p-6 flex flex-col justify-between transition-all duration-500 transform ${
                showImmediately ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {/* PLACEHOLDER */}
              <div>
                {/* 5 x #B8F564 stars */}
                <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#B8F564"
                      className="text-[#B8F564]"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[var(--text-h)] text-sm leading-relaxed italic mb-6">
                  “{t.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#1e1e1e]">
                {/* Avatar initials circle */}
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center font-display font-bold text-sm text-[#B8F564] shrink-0">
                  {t.client.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-sm text-[var(--text-h)] truncate">
                    {t.client}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    {t.role} · <span className="text-[#B8F564]">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
