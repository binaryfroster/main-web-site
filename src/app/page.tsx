"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidButton from "@/components/ui/LiquidButton";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import Typewriter from "@/components/ui/Typewriter";

const ParticleCanvas = dynamic(() => import("@/components/ui/ParticleCanvas"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

/* ---------- Data ---------- */
const techStack = [
  "React", "Next.js", "Python", "Node.js", "OpenAI", "TailwindCSS",
  "Supabase", "PostgreSQL", "FastAPI", "TypeScript", "Stripe",
  "Firebase", "Docker", "AWS", "Flutter"
];

const services = [
  { t: "AI & Automation", d: "Voice AI, chatbots, stock analysis tools, dietary planners, and intelligent business automation — all powered by cutting-edge LLMs and custom ML models.", icon: "🤖", accent: "violet", tags: ["AI", "Python", "OpenAI", "Automation"] },
  { t: "Web & E-commerce", d: "High-converting landing pages, full e-commerce platforms, business websites for cafes, real estate, healthcare, and education — built to convert.", icon: "⚡", accent: "cyan", tags: ["Next.js", "React", "E-commerce", "CMS"] },
  { t: "Management Systems", d: "Custom ERP, student management, LMS, hospital management, and real estate tools — enterprise-grade systems tailored to your workflow.", icon: "📊", accent: "violet-light", tags: ["ERP", "SaaS", "Databases", "Dashboards"] },
];

const stats = [
  { n: 15, s: "+", l: "Projects Delivered" },
  { n: 8, s: "+", l: "Technology Stacks" },
  { n: 2, s: "", l: "Countries Served" },
  { n: 100, s: "%", l: "Client Data Ownership" },
];

const portfolioItems = [
  { title: "FlowOps ERP", cat: "ERP", tags: ["React", "PostgreSQL"], img: "/assets/portfolio_chatbot.png", desc: "Enterprise resource planning built for how you actually work.", size: "lg" },
  { title: "AI Diet Planner", cat: "SaaS", tags: ["OpenAI", "Next.js"], img: "/assets/diet_planner_mockup.png", desc: "Personalized nutrition plans powered by cutting-edge AI.", size: "md" },
  { title: "Voice Call Automation", cat: "AI", tags: ["Twilio", "Python"], img: "/assets/portfolio_automation.png", desc: "AI-powered inbound/outbound call handling at scale.", size: "md" },
  { title: "MediCare Hub — Hospital Mgmt", cat: "Management", tags: ["React", "HIPAA"], img: "/assets/portfolio_chatbot.png", desc: "Patient records, appointments, billing, and pharmacy integration.", size: "wide" },
  { title: "ShopLocal UK", cat: "E-commerce", tags: ["Stripe", "Next.js"], img: "/assets/portfolio_automation.png", desc: "Full e-commerce platform with inventory and shipping.", size: "md" },
];

const testimonials = [
  { name: "Sarah Mitchell", title: "CEO, Peaks Plumbing", city: "Manchester, UK", flag: "🇬🇧", quote: "Binary Froster transformed our online presence — enquiries went up 60% in the first month. Incredible attention to detail.", stars: 5 },
  { name: "James Carter", title: "Founder, ShopLocal UK", city: "London, UK", flag: "🇬🇧", quote: "They built our entire e-commerce platform in 6 weeks. Stripe integration, inventory system, everything. Flawless.", stars: 5 },
  { name: "Maria Gonzalez", title: "Director, HealthFirst", city: "New York, US", flag: "🇺🇸", quote: "The AI diet planner they developed is remarkable. Our users love the personalized meal plans. A true game-changer.", stars: 5 },
  { name: "David Chen", title: "CTO, EduTrack", city: "San Francisco, US", flag: "🇺🇸", quote: "Their student management system handled 5,000 concurrent users from day one. Rock-solid engineering.", stars: 5 },
];

/* ---------- Component ---------- */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance testimonials (pauses on manual interaction)
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  useEffect(() => {
    // ── Hero Entrance ──
    const heroTL = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        // Clear inline GSAP styles after animation — prevents ghosting on re-navigation
        gsap.set([".hero-eyebrow", ".hero-word", ".hero-typewriter", ".hero-sub", ".hero-btn", ".hero-proof", ".scroll-indicator"], { clearProps: "all" });
      },
    });
    heroTL
      .from(".hero-eyebrow", { y: -30, opacity: 0, duration: 0.5, ease: "back.out(2)" })
      .from(".hero-word", {
        y: 80, rotationX: -60, opacity: 0,
        transformPerspective: 600, stagger: 0.07, duration: 0.7, ease: "power3.out"
      }, "-=0.2")
      .from(".hero-typewriter", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .from(".hero-sub", { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .from(".hero-btn", { y: 20, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
      .from(".hero-proof", { y: 15, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.1")
      .from(".scroll-indicator", { opacity: 0, y: -10, duration: 0.5, ease: "power2.out" }, "-=0.1");

    // ── Scroll indicator fade on scroll ──
    gsap.to(".scroll-indicator", {
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "100px top", scrub: true },
      opacity: 0, pointerEvents: "none",
    });

    // ── Service cards ──
    gsap.from(".service-card", {
      scrollTrigger: { trigger: ".services-grid", start: "top 80%", toggleActions: "play none none reverse" },
      y: 100, rotationY: -25, opacity: 0, transformPerspective: 800, stagger: 0.12, duration: 0.75, ease: "power3.out",
    });

    // ── Stats counters ──
    ScrollTrigger.create({
      trigger: ".stats-section",
      start: "top 70%",
      onEnter: () => {
        document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
          const target = parseInt(el.dataset.target || "0");
          const suffix = el.dataset.suffix || "";
          const duration = 1500;
          const start = performance.now();
          function update(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            el.textContent = Math.round(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        })
      }
    });

    gsap.from(".stat-number", {
      scrollTrigger: { trigger: ".stats-section", start: "top 70%" },
      rotationX: 90, y: 40, opacity: 0, stagger: 0.15, duration: 0.6, ease: "back.out(2)", transformPerspective: 600,
    });

    // ── Bento ──
    gsap.from(".bento-lg", {
      scrollTrigger: { trigger: ".bento-grid", start: "top 75%" },
      x: -80, rotationY: 20, opacity: 0, transformPerspective: 1000, duration: 0.9, ease: "power3.out"
    });
    gsap.from(".bento-md", {
      scrollTrigger: { trigger: ".bento-grid", start: "top 70%" },
      y: 60, rotationZ: 3, opacity: 0, stagger: 0.1, transformPerspective: 800, duration: 0.7, ease: "power2.out"
    });

    // ── SaaS Promo ──
    gsap.from(".phone-mockup-wrapper", {
      scrollTrigger: { trigger: ".saas-promo", start: "top 70%" },
      y: 100, rotationX: -30, rotationY: 20, opacity: 0, transformPerspective: 1200, duration: 1.1, ease: "power3.out",
      onComplete: () => {
        gsap.to(".phone-mockup", { y: -12, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
    });
    gsap.from(".saas-promo-text .feature-item", {
      scrollTrigger: { trigger: ".saas-promo", start: "top 65%" },
      x: 60, opacity: 0, rotationY: 15, transformPerspective: 800, stagger: 0.1, duration: 0.6, ease: "power2.out",
    });

    // ── Testimonials ──
    gsap.from(".testimonials-section", {
      scrollTrigger: { trigger: ".testimonials-section", start: "top 80%" },
      y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
    });

    // ── CTA ──
    gsap.from(".cta-section", {
      scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
      scale: 0.92, rotationX: 8, opacity: 0, transformPerspective: 1400, duration: 0.9, ease: "power3.out",
    });

    return () => {
      // Kill this page's ScrollTriggers and clear any GSAP inline styles so
      // returning to this page never shows opacity:0 frozen elements
      heroTL.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.set([".hero-eyebrow", ".hero-word", ".hero-typewriter", ".hero-sub", ".hero-btn", ".hero-proof", ".scroll-indicator",
                 ".service-card", ".stat-number", ".bento-lg", ".bento-md", ".phone-mockup-wrapper",
                 ".saas-promo-text .feature-item", ".testimonials-section", ".cta-section"], { clearProps: "all" });
    };
  }, []);

  const handleManualNavigation = (index: number) => {
    setActiveTestimonial(index);
    setAutoPlay(false);
    // Resume auto-play after 8 seconds of no interaction
    setTimeout(() => setAutoPlay(true), 8000);
  };

  // Touch swipe handlers for testimonials
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const next = diff > 0
        ? (activeTestimonial + 1) % testimonials.length
        : (activeTestimonial - 1 + testimonials.length) % testimonials.length;
      handleManualNavigation(next);
    }
  };

  return (
    <div className="flex flex-col gap-32 pb-24 overflow-hidden outline-none">

      {/* ═══════ 1. HERO ═══════ */}
      <section ref={heroRef} className="hero relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Particle constellation (Layer 1) */}
        <ParticleCanvas />

        {/* Floating glass prisms (Layer 2) */}
        <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
          <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] border border-violet-500/10 rounded-3xl rotate-45 blur-[1px] opacity-10 animate-[float_20s_ease-in-out_infinite]" />
          <div className="absolute top-[30%] right-[20%] w-[200px] h-[200px] border border-cyan-400/10 rounded-2xl -rotate-12 blur-[1px] opacity-8 animate-[float_25s_ease-in-out_infinite_reverse]" />
          <div className="absolute bottom-[20%] left-[60%] w-[150px] h-[150px] border border-violet-300/8 rounded-xl rotate-30 blur-[1px] opacity-10 animate-[float_18s_ease-in-out_infinite]" />
        </div>

        {/* Content (Layer 3) */}
        <div className="container relative z-10 mx-auto px-6 max-w-[860px] text-center flex flex-col items-center">
          {/* Eyebrow */}
          <span className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/7 text-cyan-300 text-[13px] uppercase tracking-[0.1em] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Now Available · US &amp; UK Clients
          </span>

          {/* H1 */}
          <h1 className="hero-h1 text-h1 mt-8 mb-3 flex flex-wrap justify-center gap-[0.25em]">
            {"We Build Software".split(" ").map((w, i) => (
              <span key={i} className="hero-word inline-block">{w}</span>
            ))}
          </h1>
          <div className="hero-word text-h1 mb-2">
            That <span className="text-gradient">Thinks.</span>
          </div>

          {/* Typewriter */}
          <div className="hero-typewriter text-2xl md:text-3xl font-display font-medium mt-2 mb-8 h-10">
            <Typewriter />
          </div>

          {/* Sub */}
          <p className="hero-sub text-lg text-[var(--text-muted)] mb-10 max-w-[580px]">
            Custom-built technology solutions for growing businesses in the US and UK.
            From AI integrations to full e-commerce platforms — we build it, you own it.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <LiquidButton href="/contact" className="hero-btn">Start a Project →</LiquidButton>
            <LiquidButton href="/portfolio" variant="ghost" className="hero-btn">View Our Work</LiquidButton>
          </div>

          {/* Social proof */}
          <p className="hero-proof text-[13px] text-[var(--text-muted)] mt-6 flex items-center gap-2">
            Trusted by businesses across <span>🇬🇧</span> United Kingdom <span>🇺🇸</span> United States
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--text-muted)]" aria-hidden="true">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ═══════ 2. TECH MARQUEE ═══════ */}
      <section className="marquee-container relative w-full overflow-hidden border-y border-[var(--glass-border)] py-5 bg-white/[0.02]" aria-label="Technology partners">
        <div className="marquee-track flex w-max gap-6 opacity-60">
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="px-5 py-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] font-mono text-[13px] tracking-wider hover:text-cyan-400 hover:border-cyan-400/50 hover:scale-105 transition-all cursor-default whitespace-nowrap">
              {tech}
            </span>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .marquee-container { mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%); }
          .marquee-track { animation: marquee-scroll 40s linear infinite; }
          .marquee-track:hover { animation-play-state: paused; }
        `}} />
      </section>

      {/* ═══════ 3. SERVICES ═══════ */}
      <section className="services-section container mx-auto px-6 max-w-[1320px]" id="services">
        <div className="text-center mb-16">
          <span className="eyebrow">What We Do</span>
          <h2 className="text-h2 mt-4">End-to-End Digital Solutions</h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-xl mx-auto">From concept to deployment — we cover every layer of your technology stack.</p>
        </div>
        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <TiltCard key={i} className="service-card h-full">
              <GlassCard className="p-8 h-full flex flex-col gap-5 items-start hover:border-violet-500/50 transition-colors relative overflow-hidden group">
                <div className={"absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r " + (s.accent === "cyan" ? "from-cyan-400 to-cyan-600" : "from-violet-400 to-violet-600")} />
                <div className="w-14 h-14 rounded-full bg-white/5 border border-[var(--glass-border)] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-[8deg] transition-transform duration-200">{s.icon}</div>
                <h3 className="text-xl font-display font-semibold text-[var(--text-h)]">{s.t}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{s.d}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {s.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 border border-[var(--glass-border)] text-[var(--text-muted)]">{tag}</span>
                  ))}
                </div>
                <a href="/services" className="text-sm font-medium text-violet-300 hover:text-violet-200 inline-flex items-center gap-2 mt-2 group/link">
                  Explore Services <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ═══════ 4. STATS ═══════ */}
      <section className="stats-section w-full bg-[var(--bg-surface)] py-20">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i} className={"flex flex-col items-center " + (i > 0 ? "md:border-l md:border-[var(--glass-border)]" : "")}>
                <div className="text-5xl md:text-6xl font-display font-bold mb-2 text-gradient">
                  <span className="stat-number inline-block" data-target={stat.n} data-suffix={stat.s}>0{stat.s}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-[0.06em]">{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 5. PORTFOLIO BENTO ═══════ */}
      <section className="container mx-auto px-6 max-w-[1320px]" id="portfolio">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="eyebrow">Our Work</span>
            <h2 className="text-h2 mt-4">Projects That Prove It</h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-lg">A selection from our demo portfolio — real systems built to showcase our capabilities.</p>
          </div>
          <LiquidButton href="/portfolio" variant="ghost" className="hidden md:inline-flex">View All Work</LiquidButton>
        </div>
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {portfolioItems.map((proj, i) => (
            <TiltCard key={i} className={`${i === 0 ? "bento-lg" : "bento-md"} ${proj.size === "lg" ? "md:col-span-2" : proj.size === "wide" ? "md:col-span-2" : ""} h-full cursor-pointer group`}>
              <GlassCard className="h-full p-2 relative overflow-hidden bg-white/5">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A1A] via-[#060A1A]/40 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/20 text-violet-300 border border-violet-500/30">{proj.cat}</span>
                    {proj.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-[var(--text-muted)] border border-white/10">{t}</span>)}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1">{proj.title}</h3>
                  <p className="text-white/60 text-sm translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">{proj.desc}</p>
                  <span className="inline-block mt-2 text-xs text-cyan-400 translate-y-3 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100 font-medium">View Case Study →</span>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ═══════ 6. SAAS PROMO ═══════ */}
      <section className="saas-promo container mx-auto px-6 max-w-[1320px] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Phone Mockup */}
          <div className="relative flex justify-center perspective-[1000px]" aria-hidden="true">
            <div className="phone-mockup-wrapper p-1 rounded-[44px] bg-gradient-to-tr from-violet-600 via-cyan-500 to-violet-300 animate-[spin-border_3s_linear_infinite]" style={{ backgroundSize: '200% 200%' }}>
              <div className="phone-mockup relative w-[280px] h-[560px] bg-[#0A1020] rounded-[40px] overflow-hidden border-[6px] border-black">
                <img src="/assets/diet_planner_mockup.png" alt="AI Diet Planner App" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute top-16 -left-6 text-3xl animate-[float_6s_ease-in-out_infinite]">🥗</div>
            <div className="absolute top-12 -right-4 text-3xl animate-[float_7s_ease-in-out_infinite_reverse]">🍎</div>
            <div className="absolute bottom-24 -right-8 text-3xl animate-[float_8s_ease-in-out_infinite]">💪</div>
            <div className="absolute bottom-20 -left-10 text-3xl animate-[float_6s_ease-in-out_infinite_reverse]">🔥</div>
          </div>

          {/* Copy */}
          <div className="saas-promo-text">
            <span className="eyebrow">SaaS Product — Live Now</span>
            <h2 className="text-h2 mt-4 mb-6">Your AI Nutritionist, Available 24/7</h2>
            <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed">
              Binary Froster&apos;s AI Diet Planner creates personalized nutrition plans based on your goals, dietary restrictions, and health data. Powered by advanced AI — it adapts as you do.
            </p>
            <ul className="flex flex-col gap-4 mb-8">
              {["Personalized meal plans in under 60 seconds", "Tracks macros, calories, and micronutrients", "Adapts to dietary restrictions & allergies", "Available on any device, anytime"].map((item, i) => (
                <li key={i} className="feature-item flex items-center gap-3 text-[var(--text-body)] font-medium text-sm">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/7 text-cyan-300 font-display font-medium text-sm">From £7.99/month</span>
            </div>
            <LiquidButton href="/products/diet-planner">Try It Free — 7 Days</LiquidButton>
            <p className="text-xs text-[var(--text-muted)] mt-3">No credit card required.</p>
          </div>
        </div>
      </section>

      {/* ═══════ 7. TESTIMONIALS ═══════ */}
      <section className="testimonials-section container mx-auto px-6 max-w-[1000px]">
        <div className="text-center mb-12">
          <span className="eyebrow">Client Feedback</span>
          <h2 className="text-h2 mt-4">What Our Clients Say</h2>
        </div>
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <GlassCard className="p-10 max-w-xl mx-auto text-center">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-display font-bold text-lg mx-auto mb-4">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4" aria-label={`${t.stars} out of 5 stars`}>
                    {Array(t.stars).fill(0).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-cyan-400 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-[var(--text-body)] italic leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <p className="font-display font-medium text-[var(--text-h)] text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.flag} {t.city}</p>
                </GlassCard>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualNavigation(i)}
                className={"w-2.5 h-2.5 rounded-full transition-all duration-300 " + (i === activeTestimonial ? "bg-cyan-400 scale-125" : "bg-white/20 hover:bg-white/40")}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 8. CTA ═══════ */}
      <section className="cta-section container mx-auto px-6 max-w-[1000px] relative">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" aria-hidden="true">
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-violet-600/12 rounded-full blur-[80px] animate-[float_25s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[80px] animate-[float_20s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-[40%] left-[60%] w-[250px] h-[250px] bg-violet-800/8 rounded-full blur-[60px] animate-[float_22s_ease-in-out_infinite]" />
        </div>
        <GlassCard className="p-16 md:p-24 text-center border-violet-500/30 relative z-10">
          <h2 className="text-h1 mb-6">Ready to Build Something Exceptional?</h2>
          <p className="text-xl text-[var(--text-muted)] mb-12 max-w-[520px] mx-auto">
            Whether you need a website, a full platform, or an AI integration — Binary Froster delivers on time and on spec.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <LiquidButton href="/contact">Start a Project</LiquidButton>
            <LiquidButton href="/contact" variant="ghost">Schedule a Call</LiquidButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
