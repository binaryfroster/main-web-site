"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "AI & Automation", "Web Development", "E-commerce", "Management Systems", "Mobile Apps"];

const services = [
  { title: "Voice Call Automation", cat: "AI & Automation", desc: "Automate inbound and outbound calls with AI voice agents.", price: "Custom quote", icon: "📞", tags: ["AI", "Twilio"] },
  { title: "AI Chatbot — Ask Me Anything", cat: "AI & Automation", desc: "GPT-powered chatbots trained on your own business data.", price: "From £1,500", icon: "💬", tags: ["OpenAI", "LangChain"] },
  { title: "AI Diet Planner (SaaS)", cat: "AI & Automation", desc: "White-label nutrition engine with personalized meal plans.", price: "£7.99/mo", icon: "🥗", tags: ["AI", "SaaS"] },
  { title: "Stock Market Analysis Tool", cat: "AI & Automation", desc: "AI-driven stock signals, pattern recognition, and portfolio tracking.", price: "Custom quote", icon: "📈", tags: ["Python", "ML"] },
  { title: "Crypto Analysis Tool", cat: "AI & Automation", desc: "Real-time crypto analytics, sentiment scoring, and alerts.", price: "Custom quote", icon: "₿", tags: ["API", "AI"] },
  { title: "Custom AI Integrations", cat: "AI & Automation", desc: "Bespoke AI solutions tailored to your business workflow.", price: "From £2,000", icon: "🧠", tags: ["OpenAI", "Custom"] },
  { title: "Landing Pages", cat: "Web Development", desc: "High-converting pages for local businesses — cafes, clinics, agencies.", price: "From £500", icon: "🏠", tags: ["Next.js", "SEO"] },
  { title: "Portfolio Websites", cat: "Web Development", desc: "Sleek personal portfolios for designers, developers, and creatives.", price: "From £600", icon: "🎨", tags: ["React", "CMS"] },
  { title: "Custom Web Applications", cat: "Web Development", desc: "Full-stack web apps with databases, auth, dashboards, and APIs.", price: "From £3,000", icon: "💻", tags: ["TypeScript", "Supabase"] },
  { title: "Full E-commerce Platforms", cat: "E-commerce", desc: "Stripe-powered shops with inventory, orders, analytics, and shipping.", price: "From £4,000", icon: "🛍️", tags: ["Stripe", "Next.js"] },
  { title: "ERP System", cat: "Management Systems", desc: "Enterprise resource planning — invoicing, HR, inventory, reporting.", price: "Custom quote", icon: "⚙️", tags: ["ERP", "PostgreSQL"] },
  { title: "Student Management System", cat: "Management Systems", desc: "Attendance, grades, timetables, and parent communication.", price: "From £5,000", icon: "🎓", tags: ["SaaS", "Dashboards"] },
  { title: "LMS — Learning Management", cat: "Management Systems", desc: "Course creation, video hosting, quizzes, and certificates.", price: "From £6,000", icon: "📚", tags: ["LMS", "SaaS"] },
  { title: "Hospital Management System", cat: "Management Systems", desc: "Patient records, appointments, billing, and pharmacy integration.", price: "Custom quote", icon: "🏥", tags: ["Healthcare", "HIPAA"] },
  { title: "Real Estate Price Prediction", cat: "Management Systems", desc: "ML model trained on property data for price forecasting.", price: "Custom quote", icon: "🏢", tags: ["ML", "Python"] },
];

const processSteps = [
  { n: 1, name: "Discover", desc: "We learn your goals, users, and constraints.", icon: "🔍" },
  { n: 2, name: "Design", desc: "Wireframes, mockups, and prototype.", icon: "✏️" },
  { n: 3, name: "Build", desc: "Development in sprints with regular check-ins.", icon: "⚡" },
  { n: 4, name: "Test", desc: "QA, performance testing, and feedback loops.", icon: "🧪" },
  { n: 5, name: "Launch", desc: "Deployment, domain setup, and handover.", icon: "🚀" },
  { n: 6, name: "Support", desc: "Ongoing maintenance and feature additions.", icon: "🛡️" },
];

const faq = [
  { q: "How long does a typical project take?", a: "Depends on scope. A landing page takes 1–2 weeks. A full web app or management system takes 4–12 weeks. We provide a timeline estimate before any work begins." },
  { q: "Do you sign NDAs?", a: "Yes. We take client confidentiality seriously and sign NDAs for any enterprise or sensitive projects." },
  { q: "Which countries do you serve?", a: "We primarily serve clients in the United Kingdom and United States, though we work remotely with clients globally." },
  { q: "What is your payment structure?", a: "We typically take 50% upfront and 50% on completion for fixed projects. Retainer contracts are billed monthly." },
  { q: "Do you offer post-launch support?", a: "Yes — every plan includes post-launch support (30–180 days depending on tier). We also offer ongoing maintenance retainers." },
  { q: "Can I own the code/source?", a: "Absolutely. On delivery, you receive full source code ownership and all credentials/access." },
  { q: "Do you work on existing codebases?", a: "Yes. We review your current stack and integrate or rebuild as needed." },
  { q: "What AI technologies do you use?", a: "OpenAI GPT-4/4o, Whisper, LangChain, custom fine-tuned models, vector databases (Pinecone/Supabase vectors), and more." },
  { q: "Can I start small and scale up?", a: "Yes. Many clients start with a landing page and grow to full platforms as their business grows." },
  { q: "How do I get started?", a: "Fill out our project inquiry form on the Contact page. We'll respond within 24 hours to schedule a discovery call." },
];

const pricingTiers = [
  {
    name: "Starter", best: "Freelancers & small businesses",
    monthly: "£500–1,500", yearly: "£400–1,200",
    features: ["Landing pages & basic web apps", "Up to 5 pages", "Basic SEO setup", "1 revision round", "30-day post-launch support"],
    missing: ["AI integrations", "Client portal access"],
    featured: false, cta: "Get Started"
  },
  {
    name: "Growth", best: "Growing SMBs",
    monthly: "£2,000–5,000", yearly: "£1,600–4,000",
    features: ["Full web apps & e-commerce", "AI integrations (chatbot, automation)", "Management systems", "3 revision rounds", "Client portal access", "90-day post-launch support", "Priority support (48hr)"],
    missing: [],
    featured: true, cta: "Start Building"
  },
  {
    name: "Enterprise", best: "Large businesses & complex projects",
    monthly: "Custom Quote", yearly: "Custom Quote",
    features: ["Full SaaS platforms", "Dedicated project manager", "Custom AI model training", "ERP / Hospital / LMS systems", "Unlimited revisions", "6-month post-launch support", "NDA available", "Direct Slack/Teams access"],
    missing: [],
    featured: false, cta: "Contact Us"
  },
];

import { filterServices, type ServiceItem } from "@/utils/filtering";

export default function ServicesPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    gsap.from(".service-header span, .service-header h1, .service-header p", {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.1
    });

    gsap.from(".process-step", {
      scrollTrigger: { trigger: ".process-timeline", start: "top 75%" },
      y: 50, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out",
    });

    gsap.from(".pricing-card", {
      scrollTrigger: { trigger: ".pricing-grid", start: "top 75%" },
      y: 60, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const filtered = filterServices(services as ServiceItem[], activeCat, search);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* 3D Grid Background */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-[linear-gradient(rgba(127,119,221,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(127,119,221,0.15)_1px,transparent_1px)] bg-[size:50px_50px] [transform:rotateX(75deg)] origin-bottom z-[-1] opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* HERO */}
        <header className="service-header text-center mb-16 relative z-10 max-w-[800px] mx-auto">
          <span className="eyebrow">What We Offer</span>
          <h1 className="text-h1 mt-4">End-to-End Technology Services</h1>
          <p className="text-[var(--text-muted)] mt-4 text-lg">From AI-powered automations to complete SaaS platforms — every project is custom-built to your exact requirements.</p>
          {/* Search */}
          <div className="mt-8 relative max-w-md mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl pl-11 pr-4 py-3 text-[var(--text-h)] placeholder-[var(--text-hint)] focus:outline-none focus:border-[var(--cyan-500)] focus:shadow-[0_0_0_3px_rgba(0,191,191,0.15)] transition-all text-sm"
              id="service-search"
              aria-label="Search services"
            />
          </div>
        </header>

        {/* FILTER BAR */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap relative z-10" role="tablist" aria-label="Filter services by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              role="tab"
              aria-selected={activeCat === cat}
              className={"px-5 py-2 rounded-full border transition-all duration-300 text-sm font-medium " + (activeCat === cat ? "bg-violet-500/20 border-violet-400 text-violet-100 shadow-[0_0_15px_rgba(127,119,221,0.3)]" : "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)] hover:text-[var(--text-h)] hover:border-[var(--glass-border-h)]")}
            >
              {cat}
            </button>
          ))}
          <span className="ml-4 text-xs text-[var(--text-muted)] self-center">Showing {filtered.length} of {services.length} services</span>
        </div>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-32" role="tabpanel">
          {filtered.map((svc, i) => (
            <div key={svc.title} className="transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" style={{ transitionDelay: `${i * 0.04}s` }}>
              <TiltCard className="h-full group">
                <GlassCard className="p-7 h-full flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="text-3xl group-hover:scale-115 group-hover:rotate-[8deg] transition-transform duration-200">{svc.icon}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/20">{svc.cat.split(" ")[0]}</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-[var(--text-h)]">{svc.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-grow">{svc.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map((tag) => <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-[var(--glass-border)] text-[var(--text-muted)]">{tag}</span>)}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--glass-border)]">
                    <span className="text-cyan-400 font-mono text-sm">{svc.price}</span>
                    <a href="/contact" className="text-xs text-violet-300 hover:text-violet-200 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">Get a Quote →</a>
                  </div>
                </GlassCard>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* PROCESS TIMELINE */}
        <div className="process-timeline mb-32 relative z-10">
          <div className="text-center mb-16">
            <span className="eyebrow">Our Process</span>
            <h2 className="text-h2 mt-4">How We Work</h2>
            <p className="text-[var(--text-muted)] mt-3">A structured process that keeps your project on track, on budget, and on time.</p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[calc(8.33%+32px)] right-[calc(8.33%+32px)] h-[2px] bg-[var(--glass-border)]" aria-hidden="true">
              <div className="w-full h-full bg-gradient-to-r from-violet-500/50 via-cyan-500/50 to-violet-500/50" style={{ backgroundSize: '200% 100%', animation: 'shimmer 3s ease infinite' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
              {processSteps.map((step) => (
                <div key={step.n} className="process-step text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-sm flex items-center justify-center text-2xl mb-4 relative z-10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,191,191,0.15)] transition-all">
                    {step.icon}
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-violet-500/30 border border-violet-500/50 flex items-center justify-center text-[10px] font-mono text-violet-200">{step.n}</span>
                  </div>
                  <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-1">{step.name}</h4>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* PRICING */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-10">
            <span className="eyebrow">Pricing</span>
            <h2 className="text-h2 mt-4">Transparent Pricing</h2>
            <p className="text-[var(--text-muted)] mt-3">No hidden fees. Clear deliverables. Fixed or retainer — your choice.</p>
          </div>
          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full p-1">
              <button onClick={() => setYearly(false)} className={"px-5 py-2 rounded-full text-sm font-medium transition-all " + (!yearly ? "bg-violet-500/25 text-white shadow-[0_0_12px_rgba(127,119,221,0.3)]" : "text-[var(--text-muted)] hover:text-[var(--text-h)]")}>Monthly</button>
              <button onClick={() => setYearly(true)} className={"px-5 py-2 rounded-full text-sm font-medium transition-all " + (yearly ? "bg-violet-500/25 text-white shadow-[0_0_12px_rgba(127,119,221,0.3)]" : "text-[var(--text-muted)] hover:text-[var(--text-h)]")}>Yearly — Save 20%</button>
            </div>
          </div>
          <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <GlassCard
                key={i}
                className={
                  "pricing-card p-8 relative " +
                  (tier.featured
                    ? "border-violet-500/50 shadow-[0_0_30px_rgba(127,119,221,0.15)] scale-[1.03] z-10"
                    : "")
                }
              >
                {tier.featured && (
                  <>
                    <div className="absolute -inset-[1px] rounded-2xl z-[-1] overflow-hidden">
                      <div className="absolute inset-0 bg-[conic-gradient(from_var(--border-angle),#7F77DD,#00BFBF,#7F77DD)] animate-[spin-border_3s_linear_infinite]" />
                      <div className="absolute inset-[1px] rounded-2xl bg-[var(--bg-surface)]" />
                    </div>
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-500/30 border border-violet-500/50 text-[10px] text-violet-200 font-mono">Most Popular</span>
                  </>
                )}
                <p className="text-xs text-[var(--text-muted)] mb-2">Best for: {tier.best}</p>
                <h3 className="text-2xl font-display font-bold text-[var(--text-h)] mb-1">{tier.name}</h3>
                <div className="text-2xl font-display font-medium text-cyan-400 mb-6">{yearly ? tier.yearly : tier.monthly}</div>
                <ul className="flex flex-col gap-2.5 mb-6">
                  {tier.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-body)]"><span className="text-cyan-400 mt-0.5 flex-shrink-0">✓</span>{f}</li>)}
                  {tier.missing.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><span className="mt-0.5 flex-shrink-0 opacity-40">✗</span>{f}</li>)}
                </ul>
                <LiquidButton href="/contact" variant={tier.featured ? "primary" : "ghost"} className="w-full">
                  {tier.cta}
                </LiquidButton>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow">FAQ</span>
            <h2 className="text-h2 mt-4">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3" role="list">
            {faq.map((item, i) => (
              <GlassCard
                key={i}
                className={"cursor-pointer transition-all " + (openFaq === i ? "border-violet-500/30" : "")}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                role="listitem"
              >
                <div className="p-5 flex justify-between items-center gap-4">
                  <h4 className="font-display font-medium text-[var(--text-h)] text-[15px]">{item.q}</h4>
                  <span className={"text-xl text-[var(--text-muted)] transition-transform duration-300 flex-shrink-0 " + (openFaq === i ? "rotate-45" : "rotate-0")} aria-hidden="true">+</span>
                </div>
                <div
                  className={"overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " + (openFaq === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0")}
                  aria-hidden={openFaq !== i}
                >
                  <p className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed">{item.a}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
