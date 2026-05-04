"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";
import useEmblaCarousel from "embla-carousel-react";
import {
  BackgroundBeams,
  ShimmerButton,
  Magnetic,
  AnimatedGroup,
  InView,
  TextEffect,
} from "@/components/ui/premium";

const categories = ["All", "Web & Business", "AI & Automation", "E-commerce", "Management Systems", "Real Estate"];

type Accent = "violet" | "cyan" | "emerald" | "amber" | "rose" | "indigo";

interface Project {
  title: string;
  cat: string;
  desc: string;
  tech: string[];
  img: string;
  size: string;
  accent: Accent;
  stat: string;
  statLabel: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  deliveryTime: string;
  industry: string;
  gallery?: string[];
}

const projects: Project[] = [
  { title: "Brew House Co.", cat: "Web & Business", desc: "Stylish landing page for a premium UK cafe chain.", tech: ["Next.js", "TailwindCSS", "SEO"], img: "/assets/portfolio_chatbot.png", size: "lg", accent: "amber", stat: "+40%", statLabel: "Walk-in Traffic", deliveryTime: "3 weeks", industry: "Hospitality", challenge: "Create a visually compelling online presence that captures the warmth and quality of a boutique cafe brand while driving foot traffic.", solution: "We designed a fast, SEO-optimized landing page with rich imagery, integrated Google Maps, and an online booking widget that increased walk-ins by 40%.", outcomes: ["40% increase in walk-in traffic", "98 Lighthouse performance score", "First page Google ranking within 3 weeks"] },
  { title: "Peaks Plumbing", cat: "Web & Business", desc: "Local business lead-gen site with booking system.", tech: ["React", "Stripe", "CMS"], img: "/assets/portfolio_automation.png", size: "md", accent: "cyan", stat: "+60%", statLabel: "Monthly Enquiries", deliveryTime: "2 weeks", industry: "Trade Services", challenge: "Replace an outdated static website with a modern lead-generation machine for a regional plumbing company.", solution: "Built a responsive site with instant quote calculator, online booking, and CRM integration that captures and qualifies leads automatically.", outcomes: ["60% more monthly enquiries", "Automated booking saves 10hrs/week", "Mobile-first design"] },
  { title: "Designer Portfolio", cat: "Web & Business", desc: "Minimalist creative portfolio with animation.", tech: ["GSAP", "Next.js"], img: "/assets/diet_planner_mockup.png", size: "md", accent: "violet", stat: "+300%", statLabel: "Client Enquiries", deliveryTime: "2 weeks", industry: "Creative", challenge: "Create a portfolio that stands out in a sea of template-based designer sites.", solution: "Custom scroll-driven animations, case study deep-dives, and a CMS backend so the designer can update projects without touching code.", outcomes: ["300% more client enquiries", "Featured on Awwwards", "Sub-2s load time"] },
  { title: "Real Estate Website", cat: "Real Estate", desc: "Property listings with map integration and filtering.", tech: ["React", "Mapbox", "PostgreSQL"], img: "/assets/portfolio_chatbot.png", size: "md", accent: "emerald", stat: "2K+", statLabel: "Active Listings", deliveryTime: "5 weeks", industry: "Real Estate", challenge: "Build a property listing platform with real-time map search, filtering, and agent dashboards.", solution: "Interactive Mapbox integration with PostgreSQL-backed property data, advanced filtering, and a responsive agent portal for managing listings.", outcomes: ["2,000+ active property listings", "Map-based search reduces bounce rate 35%", "Agent dashboard saves 15hrs/week"] },
  { title: "ShopLocal UK", cat: "E-commerce", desc: "Full e-commerce platform with inventory, orders, and shipping.", tech: ["Next.js", "Stripe", "Supabase"], img: "/assets/portfolio_automation.png", size: "wide", accent: "rose", stat: "£50K+", statLabel: "Revenue in 3 Months", deliveryTime: "8 weeks", industry: "Retail", challenge: "Launch a multi-vendor marketplace supporting local UK businesses with complex shipping and inventory needs.", solution: "End-to-end e-commerce with Stripe Connect for vendor payouts, real-time inventory sync, automated shipping label generation, and a customer loyalty programme.", outcomes: ["£50K+ revenue in first 3 months", "50+ active vendors onboarded", "99.9% uptime since launch"] },
  { title: "FlowOps ERP", cat: "Management Systems", desc: "Enterprise resource planning — invoicing, HR, inventory, reporting.", tech: ["React", "PostgreSQL", "Node.js"], img: "/assets/portfolio_chatbot.png", size: "lg", accent: "indigo", stat: "40%", statLabel: "Faster Processing", deliveryTime: "12 weeks", industry: "Manufacturing", challenge: "Replace a fragmented mix of spreadsheets and legacy tools with a unified ERP system for a 200-person manufacturing company.", solution: "Custom ERP with modules for HR, invoicing, inventory management, and executive dashboards — all unified under a single authentication system.", outcomes: ["40% faster order processing", "Zero data silos", "ROI positive in 6 months"] },
  { title: "EduTrack", cat: "Management Systems", desc: "Student management with attendance, grades, and parent comms.", tech: ["TypeScript", "Supabase"], img: "/assets/diet_planner_mockup.png", size: "md", accent: "violet", stat: "5K+", statLabel: "Concurrent Users", deliveryTime: "10 weeks", industry: "Education", challenge: "Build a student management system that handles 5,000+ concurrent users during exam season.", solution: "Scalable architecture with Supabase real-time subscriptions for live grade updates, attendance tracking, and a parent communication portal.", outcomes: ["5,000 concurrent users on day one", "95% teacher adoption rate", "Parent satisfaction up 55%"] },
  { title: "LearnBridge LMS", cat: "Management Systems", desc: "Course creation, video hosting, quizzes, and certificates.", tech: ["React", "AWS S3", "Stripe"], img: "/assets/portfolio_automation.png", size: "md", accent: "cyan", stat: "£30K", statLabel: "Monthly Recurring Revenue", deliveryTime: "14 weeks", industry: "EdTech", challenge: "Create a learning management system that rivals Udemy's feature set but at a fraction of the cost.", solution: "Video hosting on AWS S3 with adaptive streaming, interactive quiz builder, progress tracking, and automated certificate generation with Stripe-powered course sales.", outcomes: ["200+ courses published", "4.8/5 average student rating", "£30K monthly recurring revenue"] },
  { title: "MediCare Hub", cat: "Management Systems", desc: "Patient records, appointments, billing, and pharmacy integration.", tech: ["React", "PostgreSQL", "HIPAA"], img: "/assets/portfolio_chatbot.png", size: "md", accent: "emerald", stat: "100%", statLabel: "Paperless in 60 Days", deliveryTime: "16 weeks", industry: "Healthcare", challenge: "Digitize a multi-location clinic's paper-based patient management while meeting strict healthcare compliance.", solution: "HIPAA-compliant system with encrypted patient records, appointment scheduling, automated billing, and pharmacy integration for prescription management.", outcomes: ["100% paperless within 60 days", "HIPAA compliance achieved", "30min saved per patient visit"] },
  { title: "Real Estate Price Predictor", cat: "Real Estate", desc: "ML model trained on property data for price forecasting.", tech: ["Python", "scikit-learn", "FastAPI"], img: "/assets/portfolio_automation.png", size: "md", accent: "amber", stat: "92%", statLabel: "Prediction Accuracy", deliveryTime: "8 weeks", industry: "PropTech", challenge: "Predict UK property prices with sufficient accuracy to inform investment decisions.", solution: "Machine learning pipeline processing 500K+ historical transactions, deployed as a FastAPI microservice with a user-friendly frontend for agents.", outcomes: ["92% prediction accuracy", "500K+ data points processed", "Used by 15+ estate agents"] },
  { title: "Voice Call Automation", cat: "AI & Automation", desc: "Automated inbound/outbound calls with AI voice agents.", tech: ["Twilio", "OpenAI", "Python"], img: "/assets/diet_planner_mockup.png", size: "md", accent: "violet", stat: "70%", statLabel: "Calls Fully Automated", deliveryTime: "6 weeks", industry: "Customer Service", challenge: "Automate a high-volume customer service phone line without sacrificing customer experience.", solution: "AI voice agent powered by OpenAI Whisper and GPT-4, integrated with Twilio for call handling, CRM for context, and escalation rules for complex queries.", outcomes: ["70% of calls fully automated", "Average handle time reduced by 3min", "Customer satisfaction maintained at 4.5/5"] },
  { title: "Stock Market Analysis", cat: "AI & Automation", desc: "AI-driven stock signals, pattern recognition, and portfolio tracking.", tech: ["Python", "ML", "API"], img: "/assets/portfolio_chatbot.png", size: "md", accent: "cyan", stat: "500", statLabel: "Stocks Tracked in Real-Time", deliveryTime: "10 weeks", industry: "FinTech", challenge: "Build an AI-powered stock analysis tool that identifies trading opportunities in real-time.", solution: "ML models trained on 10 years of market data with pattern recognition, sentiment analysis from news feeds, and portfolio tracking with risk scoring.", outcomes: ["Real-time processing of 500 stocks", "Pattern detection accuracy: 78%", "Used by 200+ retail traders"] },
  { title: "Crypto Analysis Tool", cat: "AI & Automation", desc: "Real-time crypto analytics, sentiment scoring, and alerts.", tech: ["React", "Python", "API"], img: "/assets/portfolio_automation.png", size: "md", accent: "rose", stat: "2K+", statLabel: "Tokens Tracked", deliveryTime: "8 weeks", industry: "Crypto", challenge: "Provide real-time crypto market analytics with sentiment analysis and alerting capabilities.", solution: "Multi-exchange data aggregation, social media sentiment scoring using NLP, customizable price and volume alerts, and portfolio rebalancing suggestions.", outcomes: ["Tracks 2,000+ tokens", "Sentiment analysis from 50+ sources", "Alert delivery within 2 seconds"] },
  { title: "AI Diet Planner", cat: "AI & Automation", desc: "Personalized nutrition plans powered by AI. SaaS product.", tech: ["OpenAI", "Next.js", "Stripe"], img: "/assets/diet_planner_mockup.png", size: "wide", accent: "emerald", stat: "85%", statLabel: "User Retention After Trial", deliveryTime: "10 weeks", industry: "Health & Wellness", challenge: "Create a consumer SaaS product that generates truly personalized meal plans, not generic diet advice.", solution: "GPT-4 powered nutrition engine that considers dietary preferences, allergies, health goals, and shopping habits to generate weekly meal plans in under 60 seconds.", outcomes: ["Plans generated in under 60 seconds", "85% user retention after free trial", "4.7/5 App Store rating"] },
  { title: "Ask Me Anything Chatbot", cat: "AI & Automation", desc: "GPT-powered chatbot trained on business-specific data.", tech: ["LangChain", "OpenAI", "Supabase"], img: "/assets/portfolio_chatbot.png", size: "md", accent: "indigo", stat: "90%", statLabel: "Queries Resolved Automatically", deliveryTime: "4 weeks", industry: "SaaS / Support", challenge: "Build a chatbot that can answer questions about a company's products, policies, and services with high accuracy.", solution: "RAG-based chatbot using LangChain with Supabase vector store, trained on 500+ internal documents, with conversational memory and fallback to human agents.", outcomes: ["90% query resolution without human", "Trained on 500+ documents", "Handles 1,000+ queries daily"] },
];

const accentConfig: Record<Accent, { bar: string; badge: string; badgeText: string; stat: string; glow: string }> = {
  violet:  { bar: "from-violet-500 to-violet-700", badge: "bg-violet-500/15 border-violet-500/30 text-violet-300",   badgeText: "text-violet-300",  stat: "text-violet-400", glow: "hover:shadow-[0_0_30px_rgba(127,119,221,0.25)]" },
  cyan:    { bar: "from-cyan-400 to-cyan-600",     badge: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",         badgeText: "text-cyan-300",    stat: "text-cyan-400",   glow: "hover:shadow-[0_0_30px_rgba(0,191,191,0.25)]" },
  emerald: { bar: "from-emerald-500 to-emerald-700",badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",badgeText: "text-emerald-300",stat: "text-emerald-400",glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]" },
  amber:   { bar: "from-amber-400 to-amber-600",   badge: "bg-amber-500/15 border-amber-500/30 text-amber-300",      badgeText: "text-amber-300",   stat: "text-amber-400",  glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]" },
  rose:    { bar: "from-rose-500 to-rose-700",     badge: "bg-rose-500/15 border-rose-500/30 text-rose-300",         badgeText: "text-rose-300",    stat: "text-rose-400",   glow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]" },
  indigo:  { bar: "from-indigo-500 to-indigo-700", badge: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",   badgeText: "text-indigo-300",  stat: "text-indigo-400", glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]" },
};

export default function PortfolioPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [modal, setModal] = useState<Project | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape" && modal) setModal(null); };
    document.addEventListener("keydown", handleEscape);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", handleEscape); };
  }, [modal]);

  const filtered = projects.filter((p) => activeCat === "All" || p.cat === activeCat);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden" ref={containerRef}>
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <BackgroundBeams className="opacity-20" />
      </div>
      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* ── Header ── */}
        <header className="text-center mb-14">
          <span className="eyebrow">Our Portfolio</span>
          <h1 className="text-h1 mt-4 mb-4">
            Work That Speaks for Itself.
          </h1>
          <p className="text-[var(--text-muted)] mt-4 max-w-xl mx-auto text-lg">
            Explore real results across AI, web, e-commerce, and enterprise systems.
          </p>

        {/* Category Filters — boxed pill buttons */}
        <div className="flex justify-center gap-2.5 mt-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
              onClick={() => setActiveCat(cat)}
              className={
                "px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-250 " +
                (activeCat === cat
                  ? "bg-[var(--violet-600)] border-[var(--violet-500)] text-white shadow-[0_0_20px_rgba(83,74,183,0.4)] scale-[1.04]"
                  : "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)] hover:border-[var(--violet-500)]/60 hover:text-[var(--text-h)] hover:bg-[var(--glass-bg-hover)]")
              }
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-5">
          Showing <span className="font-semibold text-[var(--text-body)]">{filtered.length}</span> projects
        </p>
      </header>

        {/* ── Portfolio Grid ── */}
        <AnimatedGroup
          preset="blur-slide"
          className="portfolio-grid grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px] md:auto-rows-[280px]"
        >
          {filtered.map((proj) => {
            const ac = accentConfig[proj.accent];
            return (
              <TiltCard
                key={proj.title}
                className={
                  "portfolio-card cursor-pointer group h-full " +
                  (proj.size === "lg" ? "md:col-span-2 md:row-span-2" : proj.size === "wide" ? "md:col-span-2" : "")
                }
              >
                <div
                  onClick={() => setModal(proj)}
                  className={"relative w-full h-full rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-surface)] transition-all duration-300 " + ac.glow}
                >
                  {/* Accent top bar */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${ac.bar} z-10`} />

                  <Image 
                    src={proj.img} 
                    alt={proj.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 group-hover:from-black/95 transition-all duration-400" />

                  {/* Stat badge — top right */}
                  <div className="absolute top-4 right-4 flex flex-col items-end z-10">
                    <span className={`text-xl font-display font-black leading-none ${ac.stat} drop-shadow-lg`}>{proj.stat}</span>
                    <span className="text-white/60 text-[9px] font-medium text-right leading-tight mt-0.5 max-w-[80px]">{proj.statLabel}</span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex gap-1.5 mb-2.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${ac.badge}`}>{proj.cat}</span>
                      {proj.tech.slice(0, 2).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/10 border border-white/15 text-white/70">{t}</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white leading-snug">{proj.title}</h3>
                    <p className="text-white/55 text-xs mt-1.5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 leading-relaxed">
                      {proj.desc}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 mt-2.5 text-xs font-semibold translate-y-3 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100 ${ac.badgeText}`}>
                      View Case Study
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </AnimatedGroup>

        {/* ── CTA Banner ── */}
        <InView>
          <div className="mt-20 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/10 rounded-full blur-[60px]" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px]" />
            </div>
            <span className="eyebrow relative z-10">Ready to Join This List?</span>
            <TextEffect className="text-h2 mt-4 mb-4 relative z-10" preset="fade" per="word">
              Let&apos;s Build Your Success Story
            </TextEffect>
            <p className="text-[var(--text-muted)] max-w-md mx-auto mb-8 relative z-10">
              Every project above started with a single conversation. Yours could be next.
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <Magnetic intensity={0.3}>
                <ShimmerButton
                  background="radial-gradient(ellipse at bottom, #1a1552 0%, #060A1A 100%)"
                  className="px-8 py-3.5 text-sm font-medium"
                >
                  <Link href="/contact" className="text-inherit no-underline">Start a Project →</Link>
                </ShimmerButton>
              </Magnetic>
              <LiquidButton href="/services" variant="ghost">Explore Services</LiquidButton>
            </div>
          </div>
        </InView>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-[820px] max-h-[92vh] bg-[var(--bg-surface)] rounded-t-3xl md:rounded-3xl border border-[var(--glass-border)] overflow-y-auto animate-[modal-up_0.35s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-[3000] hover:bg-black/70 transition-colors text-lg font-light"
              aria-label="Close modal"
            >✕</button>

            {/* Image Carousel */}
            <div className="overflow-hidden relative group" ref={emblaRef}>
              <div className="flex">
                {(modal.gallery || [
                  modal.img,
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
                  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
                ]).map((imgSrc, idx) => (
                  <div className="flex-[0_0_100%] min-w-0 relative h-[320px] md:h-[380px]" key={idx}>
                    <Image 
                      src={imgSrc} 
                      alt={`${modal.title} screenshot ${idx + 1}`} 
                      fill
                      sizes="(max-width: 820px) 100vw, 820px"
                      className="object-cover" 
                    />
                  </div>
                ))}
              </div>
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent pointer-events-none" />
              <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20 text-lg">←</button>
              <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20 text-lg">→</button>
            </div>

            {/* Content */}
            <div className="p-7 md:p-10">
              {/* Category + Meta */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`px-3 py-1 rounded-lg text-[11px] font-semibold border ${accentConfig[modal.accent].badge}`}>
                  {modal.cat}
                </span>
                <span className="px-3 py-1 rounded-lg text-[11px] font-mono bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] flex items-center gap-1.5">
                  <Image src="/images/icons/icon_industry.png" alt="Industry" width={12} height={12} /> {modal.industry}
                </span>
                <span className="px-3 py-1 rounded-lg text-[11px] font-mono bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] flex items-center gap-1.5">
                  <Image src="/images/icons/icon_timer.png" alt="Delivery" width={12} height={12} /> {modal.deliveryTime} delivery
                </span>
              </div>

              <h2 id="modal-title" className="text-h2 mb-2">{modal.title}</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8 text-base">{modal.desc}</p>

              {/* Challenge / Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Image src="/images/icons/icon_discover.png" alt="Challenge" width={22} height={22} />
                    <h4 className="font-display font-semibold text-[var(--text-h)] text-sm">The Challenge</h4>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{modal.challenge}</p>
                </div>
                <div className="p-5 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Image src="/images/icons/icon_build.png" alt="Solution" width={22} height={22} />
                    <h4 className="font-display font-semibold text-[var(--text-h)] text-sm">Our Solution</h4>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{modal.solution}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="font-display font-semibold text-[var(--text-h)] text-sm mb-3 flex items-center gap-2">
                  <Image src="/images/icons/icon_design.png" alt="Tech" width={18} height={18} /> Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modal.tech.map((t) => (
                    <span key={t} className="px-3.5 py-1.5 rounded-lg text-xs font-mono border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-body)] hover:border-[var(--violet-500)]/50 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Outcomes */}
              <div className="mb-8">
                <h4 className="font-display font-semibold text-[var(--text-h)] text-sm mb-3 flex items-center gap-2">
                  <Image src="/images/icons/icon_scalable.png" alt="Outcomes" width={18} height={18} /> Key Outcomes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {modal.outcomes.map((outcome, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${accentConfig[modal.accent].badge} flex flex-col gap-2`}>
                      <Image src={["/images/icons/icon_launch.png", "/images/icons/icon_build.png", "/images/icons/icon_security.png"][i] || "/images/icons/icon_support.png"} alt="Outcome" width={24} height={24} />
                      <span className="text-xs font-semibold text-[var(--text-h)] leading-snug">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs — two prominent boxed buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[var(--glass-border)]">
                <LiquidButton href="/contact" className="flex-1 justify-center">
                  Build Something Similar →
                </LiquidButton>
                <LiquidButton href="/contact?service=quote" variant="ghost" className="flex-1 justify-center">
                  Get a Free Quote
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
