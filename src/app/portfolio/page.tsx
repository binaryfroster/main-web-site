"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web & Business", "AI & Automation", "E-commerce", "Management Systems", "Real Estate"];

const projects = [
  { title: "Brew House Co.", cat: "Web & Business", desc: "Stylish landing page for a premium UK cafe chain.", tech: ["Next.js", "TailwindCSS", "SEO"], img: "/assets/portfolio_chatbot.png", size: "lg", challenge: "Create a visually compelling online presence that captures the warmth and quality of a boutique cafe brand while driving foot traffic.", solution: "We designed a fast, SEO-optimized landing page with rich imagery, integrated Google Maps, and an online booking widget that increased walk-ins by 40%.", outcomes: ["40% increase in walk-in traffic", "98 Lighthouse performance score", "First page Google ranking within 3 weeks"] },
  { title: "Peaks Plumbing", cat: "Web & Business", desc: "Local business lead-gen site with booking system.", tech: ["React", "Stripe", "CMS"], img: "/assets/portfolio_automation.png", size: "md", challenge: "Replace an outdated static website with a modern lead-generation machine for a regional plumbing company.", solution: "Built a responsive site with instant quote calculator, online booking, and CRM integration that captures and qualifies leads automatically.", outcomes: ["60% more monthly enquiries", "Automated booking saves 10hrs/week", "Mobile-first design"] },
  { title: "Designer Portfolio", cat: "Web & Business", desc: "Minimalist creative portfolio with animation.", tech: ["GSAP", "Next.js"], img: "/assets/diet_planner_mockup.png", size: "md", challenge: "Create a portfolio that stands out in a sea of template-based designer sites.", solution: "Custom scroll-driven animations, case study deep-dives, and a CMS backend so the designer can update projects without touching code.", outcomes: ["300% more client enquiries", "Featured on Awwwards", "Sub-2s load time"] },
  { title: "Real Estate Website", cat: "Real Estate", desc: "Property listings with map integration and filtering.", tech: ["React", "Mapbox", "PostgreSQL"], img: "/assets/portfolio_chatbot.png", size: "md", challenge: "Build a property listing platform with real-time map search, filtering, and agent dashboards.", solution: "Interactive Mapbox integration with PostgreSQL-backed property data, advanced filtering, and a responsive agent portal for managing listings.", outcomes: ["2,000+ active property listings", "Map-based search reduces bounce rate 35%", "Agent dashboard saves 15hrs/week"] },
  { title: "ShopLocal UK", cat: "E-commerce", desc: "Full e-commerce platform with inventory, orders, and shipping.", tech: ["Next.js", "Stripe", "Supabase"], img: "/assets/portfolio_automation.png", size: "wide", challenge: "Launch a multi-vendor marketplace supporting local UK businesses with complex shipping and inventory needs.", solution: "End-to-end e-commerce with Stripe Connect for vendor payouts, real-time inventory sync, automated shipping label generation, and a customer loyalty programme.", outcomes: ["£50K+ revenue in first 3 months", "50+ active vendors onboarded", "99.9% uptime since launch"] },
  { title: "FlowOps ERP", cat: "Management Systems", desc: "Enterprise resource planning — invoicing, HR, inventory, reporting.", tech: ["React", "PostgreSQL", "Node.js"], img: "/assets/portfolio_chatbot.png", size: "lg", challenge: "Replace a fragmented mix of spreadsheets and legacy tools with a unified ERP system for a 200-person manufacturing company.", solution: "Custom ERP with modules for HR, invoicing, inventory management, and executive dashboards — all unified under a single authentication system.", outcomes: ["40% faster order processing", "Zero data silos", "ROI positive in 6 months"] },
  { title: "EduTrack", cat: "Management Systems", desc: "Student management with attendance, grades, and parent comms.", tech: ["TypeScript", "Supabase"], img: "/assets/diet_planner_mockup.png", size: "md", challenge: "Build a student management system that handles 5,000+ concurrent users during exam season.", solution: "Scalable architecture with Supabase real-time subscriptions for live grade updates, attendance tracking, and a parent communication portal.", outcomes: ["5,000 concurrent users on day one", "95% teacher adoption rate", "Parent satisfaction up 55%"] },
  { title: "LearnBridge LMS", cat: "Management Systems", desc: "Course creation, video hosting, quizzes, and certificates.", tech: ["React", "AWS S3", "Stripe"], img: "/assets/portfolio_automation.png", size: "md", challenge: "Create a learning management system that rivals Udemy's feature set but at a fraction of the cost.", solution: "Video hosting on AWS S3 with adaptive streaming, interactive quiz builder, progress tracking, and automated certificate generation with Stripe-powered course sales.", outcomes: ["200+ courses published", "4.8/5 average student rating", "£30K monthly recurring revenue"] },
  { title: "MediCare Hub", cat: "Management Systems", desc: "Patient records, appointments, billing, and pharmacy integration.", tech: ["React", "PostgreSQL", "HIPAA"], img: "/assets/portfolio_chatbot.png", size: "md", challenge: "Digitize a multi-location clinic's paper-based patient management while meeting strict healthcare compliance.", solution: "HIPAA-compliant system with encrypted patient records, appointment scheduling, automated billing, and pharmacy integration for prescription management.", outcomes: ["100% paperless within 60 days", "HIPAA compliance achieved", "30min saved per patient visit"] },
  { title: "Real Estate Price Predictor", cat: "Real Estate", desc: "ML model trained on property data for price forecasting.", tech: ["Python", "scikit-learn", "FastAPI"], img: "/assets/portfolio_automation.png", size: "md", challenge: "Predict UK property prices with sufficient accuracy to inform investment decisions.", solution: "Machine learning pipeline processing 500K+ historical transactions, deployed as a FastAPI microservice with a user-friendly frontend for agents.", outcomes: ["92% prediction accuracy", "500K+ data points processed", "Used by 15+ estate agents"] },
  { title: "Voice Call Automation", cat: "AI & Automation", desc: "Automated inbound/outbound calls with AI voice agents.", tech: ["Twilio", "OpenAI", "Python"], img: "/assets/diet_planner_mockup.png", size: "md", challenge: "Automate a high-volume customer service phone line without sacrificing customer experience.", solution: "AI voice agent powered by OpenAI Whisper and GPT-4, integrated with Twilio for call handling, CRM for context, and escalation rules for complex queries.", outcomes: ["70% of calls fully automated", "Average handle time reduced by 3min", "Customer satisfaction maintained at 4.5/5"] },
  { title: "Stock Market Analysis", cat: "AI & Automation", desc: "AI-driven stock signals, pattern recognition, and portfolio tracking.", tech: ["Python", "ML", "API"], img: "/assets/portfolio_chatbot.png", size: "md", challenge: "Build an AI-powered stock analysis tool that identifies trading opportunities in real-time.", solution: "ML models trained on 10 years of market data with pattern recognition, sentiment analysis from news feeds, and portfolio tracking with risk scoring.", outcomes: ["Real-time processing of 500 stocks", "Pattern detection accuracy: 78%", "Used by 200+ retail traders"] },
  { title: "Crypto Analysis Tool", cat: "AI & Automation", desc: "Real-time crypto analytics, sentiment scoring, and alerts.", tech: ["React", "Python", "API"], img: "/assets/portfolio_automation.png", size: "md", challenge: "Provide real-time crypto market analytics with sentiment analysis and alerting capabilities.", solution: "Multi-exchange data aggregation, social media sentiment scoring using NLP, customizable price and volume alerts, and portfolio rebalancing suggestions.", outcomes: ["Tracks 2,000+ tokens", "Sentiment analysis from 50+ sources", "Alert delivery within 2 seconds"] },
  { title: "AI Diet Planner", cat: "AI & Automation", desc: "Personalized nutrition plans powered by AI. SaaS product.", tech: ["OpenAI", "Next.js", "Stripe"], img: "/assets/diet_planner_mockup.png", size: "wide", challenge: "Create a consumer SaaS product that generates truly personalized meal plans, not generic diet advice.", solution: "GPT-4 powered nutrition engine that considers dietary preferences, allergies, health goals, and shopping habits to generate weekly meal plans in under 60 seconds.", outcomes: ["Plans generated in under 60 seconds", "85% user retention after free trial", "4.7/5 App Store rating"] },
  { title: "Ask Me Anything Chatbot", cat: "AI & Automation", desc: "GPT-powered chatbot trained on business-specific data.", tech: ["LangChain", "OpenAI", "Supabase"], img: "/assets/portfolio_chatbot.png", size: "md", challenge: "Build a chatbot that can answer questions about a company's products, policies, and services with high accuracy.", solution: "RAG-based chatbot using LangChain with Supabase vector store, trained on 500+ internal documents, with conversational memory and fallback to human agents.", outcomes: ["90% query resolution without human", "Trained on 500+ documents", "Handles 1,000+ queries daily"] },
];

interface ModalData {
  title: string;
  cat: string;
  desc: string;
  tech: string[];
  img: string;
  challenge: string;
  solution: string;
  outcomes: string[];
}

export default function PortfolioPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [modal, setModal] = useState<ModalData | null>(null);

  useEffect(() => {
    const cardsAnim = gsap.from(".portfolio-card", {
      y: 80, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: ".portfolio-grid", start: "top 85%" }
    });
    return () => {
      cardsAnim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.set(".portfolio-card", { clearProps: "all" });
    };
  }, []);

  // Lock body scroll when modal is open + Escape key
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modal) setModal(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modal]);

  const filtered = projects.filter((p) => activeCat === "All" || p.cat === activeCat);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Header */}
        <header className="text-center mb-12">
          <span className="eyebrow">Our Portfolio</span>
          <h1 className="text-h1 mt-4">Work That Speaks for Itself.</h1>
          <p className="text-[var(--text-muted)] mt-4 max-w-xl mx-auto text-lg">Explore our demo projects across AI, web, e-commerce, and enterprise systems.</p>
          
          {/* Filters */}
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(cat)} className={"px-5 py-2 rounded-full border transition-all duration-300 text-sm font-medium " + (activeCat === cat ? "bg-violet-500/20 border-violet-400 text-violet-100 shadow-[0_0_15px_rgba(127,119,221,0.3)]" : "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)] hover:text-[var(--text-h)] hover:border-[var(--glass-border-h)]")}>
                {cat}
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">Showing all {filtered.length} projects</p>
        </header>

        {/* Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px]">
          {filtered.map((proj) => (
            <TiltCard key={proj.title} className={"portfolio-card cursor-pointer group h-full " + (proj.size === "lg" ? "md:col-span-2 md:row-span-2" : proj.size === "wide" ? "md:col-span-2" : "")}>
              <div onClick={() => setModal(proj)} className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-white/5">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A1A] via-[#060A1A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex gap-1.5 mb-2">
                    {proj.tech.slice(0, 3).map((t) => <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 border border-white/10 text-white/70">{t}</span>)}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">{proj.title}</h3>
                  <p className="text-white/50 text-xs mt-1 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">{proj.desc}</p>
                  <span className="inline-block mt-2 text-xs text-cyan-400 translate-y-3 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100 font-medium">View Project →</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[2000] flex items-end justify-center"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-[780px] max-h-[90vh] bg-[var(--bg-surface)] rounded-t-3xl border border-[var(--glass-border)] overflow-y-auto animate-[modal-up_0.35s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white z-10 hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >✕</button>
            {/* Image */}
            <img src={modal.img} alt={modal.title} className="w-full h-[300px] object-cover" />
            {/* Content */}
            <div className="p-8">
              <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/20">{modal.cat}</span>
              <h2 id="modal-title" className="text-h2 mt-4 mb-3">{modal.title}</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">{modal.desc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-2">The Challenge</h4>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{modal.challenge}</p>
                </div>
                <div>
                  <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-2">Our Solution</h4>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{modal.solution}</p>
                </div>
              </div>

              <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {modal.tech.map((t) => <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-[var(--glass-border)] text-[var(--text-body)]">{t}</span>)}
              </div>

              {/* Outcomes */}
              <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-3">Key Outcomes</h4>
              <ul className="flex flex-col gap-2 mb-8">
                {modal.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-body)]">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4">
                <LiquidButton href="/contact">Build Something Similar</LiquidButton>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
