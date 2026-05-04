"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidButton from "@/components/ui/LiquidButton";
import GlassCard from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { n: "01", title: "Hyper-Personalized Meal Plans", desc: "AI analyzes your age, weight, goals, allergies, and dietary preferences to create meal plans unique to you — not recycled templates.", icon: "/images/icons/icon_discover.png", align: "left" },
  { n: "02", title: "Real-Time Macro Tracking", desc: "Log your meals with a tap. The AI monitors your calorie, protein, carb, and fat intake and adjusts future meals to keep you on track.", icon: "/images/icons/icon_scalable.png", align: "right" },
  { n: "03", title: "Allergy & Preference Aware", desc: "Vegan, keto, halal, gluten-free, nut-free — the engine respects your restrictions and finds delicious alternatives automatically.", icon: "/images/icons/icon_security.png", align: "left" },
  { n: "04", title: "Conversational AI Interface", desc: "Just type 'I had a huge burger for lunch' and the AI recalibrates the rest of your day. Natural language, zero friction.", icon: "/images/icons/icon_communication.png", align: "right" },
  { n: "05", title: "Weekly Shopping Lists", desc: "Auto-generated shopping lists based on your meal plan, optimized by local grocery availability and budget preferences.", icon: "/images/icons/icon_pricing.png", align: "left" },
];

const testimonials = [
  { name: "Emma T.", quote: "Lost 8kg in 3 months. The meal plans actually taste good — I never felt like I was on a diet.", stars: 5, city: "London, UK" },
  { name: "Marcus R.", quote: "As someone with multiple allergies, this is the first planner that actually understands my needs.", stars: 5, city: "New York, US" },
  { name: "Priya S.", quote: "The conversational UI is genius — I just tell it what I ate and it adjusts everything. So easy.", stars: 5, city: "Manchester, UK" },
];

export default function DietPlannerPage() {
  const [yearly, setYearly] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(".dp-eyebrow", { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" })
      .from(".dp-h1", { y: 80, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .from(".dp-sub", { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(".dp-cta", { y: 20, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
      .from(".dp-phone", { y: 100, rotationX: -20, opacity: 0, transformPerspective: 1000, duration: 0.9, ease: "power3.out" }, "-=0.5");

    // Float the phone continuously
    gsap.to(".dp-phone", {
      y: -15, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.5,
    });

    // Feature sections
    gsap.utils.toArray<HTMLElement>(".feature-section").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: { trigger: section, start: "top 80%" },
        y: 60, opacity: 0, duration: 0.7, ease: "power3.out",
      });
    });

    // Pricing
    gsap.from(".pricing-section", {
      scrollTrigger: { trigger: ".pricing-section", start: "top 75%" },
      y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
    });

    // Testimonials
    gsap.from(".dp-testimonials", {
      scrollTrigger: { trigger: ".dp-testimonials", start: "top 80%" },
      y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.set(".dp-eyebrow, .dp-h1, .dp-sub, .dp-cta, .dp-phone, .feature-section, .pricing-section, .dp-testimonials", { clearProps: "all" });
    };
  }, []);

  // Auto rotate testimonials (pauses on manual interaction)
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleManualNavigation = (index: number) => {
    setActiveTestimonial(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  return (
    <div className="bg-[var(--bg-void)] text-[var(--text-h)] overflow-hidden">
      
      {/* ═══════ HERO ═══════ */}
      <section className="min-h-[95vh] flex items-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px] animate-[float_25s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] animate-[float_20s_ease-in-out_infinite_reverse]" />
        </div>

        <div className="container mx-auto px-6 max-w-[1320px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          {/* Copy */}
          <div className="max-w-[560px]">
            <span className="dp-eyebrow eyebrow">SaaS Product — Live Now</span>
            <h1 className="dp-h1 text-h1 mt-6 mb-6">
              Your AI Nutritionist,{" "}
              <span className="text-gradient">Available 24/7.</span>
            </h1>
            <p className="dp-sub text-xl text-[var(--text-muted)] leading-relaxed mb-10">
              Personalized meal plans in under 60 seconds. Tracks macros, adapts to your allergies, and learns your preferences over time.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <LiquidButton href="#pricing" className="dp-cta">Try Free — 7 Days</LiquidButton>
              <LiquidButton href="#features" variant="ghost" className="dp-cta">See Features</LiquidButton>
            </div>
            <p className="dp-cta text-xs text-[var(--text-muted)]">No credit card required. Cancel anytime.</p>

            {/* Trust badges */}
            <div className="dp-cta flex items-center gap-6 mt-8 pt-8 border-t border-[var(--glass-border)]">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-[var(--text-h)]">4.7★</div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">Rating</div>
              </div>
              <div className="w-px h-10 bg-[var(--glass-border)]" />
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-[var(--text-h)]">10K+</div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">Users</div>
              </div>
              <div className="w-px h-10 bg-[var(--glass-border)]" />
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-[var(--text-h)]">&lt;60s</div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">Plan Time</div>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="hidden lg:flex justify-center relative" aria-hidden="true">
            <div className="dp-phone relative">
              {/* Phone */}
              <div className="relative w-[300px] h-[620px] bg-[#060A1A] rounded-[45px] border-[8px] border-[#111827] shadow-[0_30px_100px_rgba(0,191,191,0.2)] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#111827] rounded-b-3xl z-20 flex justify-center items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-12 h-2 rounded-full bg-white/10" />
                </div>
                <div className="relative w-full h-full z-10">
                  <Image 
                    src="/assets/diet_planner_mockup.png" 
                    alt="AI Diet Planner App" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
              {/* Orbiting icons */}
              <div className="absolute -left-12 top-[15%] animate-[float_5s_ease-in-out_infinite]"><Image src="/images/icons/icon_test.png" alt="Icon" width={36} height={36} /></div>
              <div className="absolute -right-10 top-[25%] animate-[float_6s_ease-in-out_infinite_reverse]"><Image src="/images/icons/icon_timer.png" alt="Icon" width={36} height={36} /></div>
              <div className="absolute -left-10 bottom-[30%] animate-[float_7s_ease-in-out_infinite]"><Image src="/images/icons/icon_ai.png" alt="Icon" width={30} height={30} /></div>
              <div className="absolute -right-14 bottom-[20%] animate-[float_5s_ease-in-out_infinite_reverse]"><Image src="/images/icons/icon_launch.png" alt="Icon" width={30} height={30} /></div>
              <div className="absolute left-1/2 -bottom-8 animate-[float_8s_ease-in-out_infinite]"><Image src="/images/icons/icon_build.png" alt="Icon" width={30} height={30} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" className="py-32 container mx-auto px-6 max-w-[1100px]">
        <div className="text-center mb-20">
          <span className="eyebrow">Features</span>
          <h2 className="text-h2 mt-4">Not Just Another Meal Planner</h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-xl mx-auto">Five pillars of intelligence that make our diet planner genuinely different.</p>
        </div>

        <div className="flex flex-col gap-0 snap-y snap-mandatory overflow-y-auto h-[80vh] scrollbar-hide rounded-[40px] border border-[var(--glass-border)] bg-white/[0.02] shadow-inner">
          {features.map((feat, i) => (
            <div key={i} className={"feature-section min-h-[80vh] snap-center grid grid-cols-1 md:grid-cols-2 gap-16 items-center p-12 lg:p-24 " + (feat.align === "right" ? "md:flex-row-reverse bg-gradient-to-br from-transparent to-violet-500/5" : "bg-gradient-to-bl from-transparent to-cyan-500/5")}>
              <div className={feat.align === "right" ? "md:order-2" : ""}>
                <div className="text-cyan-400 font-mono text-sm mb-4 tracking-widest uppercase">Feature {feat.n}</div>
                <h3 className="text-h3 mb-4">{feat.title}</h3>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">{feat.desc}</p>
              </div>
              <div className={feat.align === "right" ? "md:order-1" : ""}>
                <GlassCard className="p-12 flex items-center justify-center aspect-square shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-24 h-24 transition-transform duration-700 group-hover:scale-110">
                    <Image src={feat.icon} alt={feat.title} fill className="object-contain" />
                  </div>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" className="pricing-section py-32 bg-[var(--bg-base)]">
        <div className="container mx-auto px-6 max-w-[900px]">
          <div className="text-center mb-12">
            <span className="eyebrow">Pricing</span>
            <h2 className="text-h2 mt-4">Simple, Honest Pricing</h2>
            <p className="text-[var(--text-muted)] mt-4">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full p-1">
              <button onClick={() => setYearly(false)} className={"px-5 py-2 rounded-full text-sm font-medium transition-all " + (!yearly ? "bg-violet-500/25 text-white shadow-[0_0_12px_rgba(127,119,221,0.3)]" : "text-[var(--text-muted)] hover:text-[var(--text-h)]")}>Monthly</button>
              <button onClick={() => setYearly(true)} className={"px-5 py-2 rounded-full text-sm font-medium transition-all " + (yearly ? "bg-violet-500/25 text-white shadow-[0_0_12px_rgba(127,119,221,0.3)]" : "text-[var(--text-muted)] hover:text-[var(--text-h)]")}>Yearly — Save 20%</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic */}
            <GlassCard className="p-8">
              <h3 className="text-2xl font-display font-bold text-[var(--text-h)] mb-1">Basic</h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">Perfect for getting started</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-display font-bold text-cyan-400">{yearly ? "£5.99" : "£7.99"}</span>
                <span className="text-[var(--text-muted)] text-sm mb-1">/month</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {["Personalized meal plans", "Macro & calorie tracking", "Allergy & preference support", "Weekly shopping lists", "7-day free trial"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-body)]">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <LiquidButton variant="ghost" className="w-full">Start Free Trial</LiquidButton>
            </GlassCard>

            {/* Pro */}
            <GlassCard className="p-8 border-violet-500/50 shadow-[0_0_30px_rgba(127,119,221,0.15)] relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-t-2xl" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-500/30 border border-violet-500/50 text-[10px] text-violet-200 font-mono">Best Value</span>
              <h3 className="text-2xl font-display font-bold text-[var(--text-h)] mb-1">Pro</h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">For serious health goals</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-display font-bold text-cyan-400">{yearly ? "£11.99" : "£15.99"}</span>
                <span className="text-[var(--text-muted)] text-sm mb-1">/month</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {["Everything in Basic", "Conversational AI interface", "Advanced macro optimization", "Recipe alternatives & variations", "Priority support", "Family plan (up to 4 members)"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-body)]">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <LiquidButton className="w-full">Start Free Trial</LiquidButton>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="dp-testimonials py-32 container mx-auto px-6 max-w-[800px]">
        <div className="text-center mb-12">
          <span className="eyebrow">Testimonials</span>
          <h2 className="text-h2 mt-4">What Users Say</h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <GlassCard className="p-10 text-center max-w-lg mx-auto">
                  <div className="flex justify-center gap-1 mb-4">
                    {Array(t.stars).fill(0).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-cyan-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-[var(--text-body)] italic leading-relaxed mb-6 text-lg">&ldquo;{t.quote}&rdquo;</p>
                  <p className="font-display font-medium text-[var(--text-h)] text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.city}</p>
                </GlassCard>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => handleManualNavigation(i)} className={"w-2.5 h-2.5 rounded-full transition-all duration-300 " + (i === activeTestimonial ? "bg-cyan-400 scale-125" : "bg-white/20 hover:bg-white/40")} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-32 bg-[var(--bg-base)]">
        <div className="container mx-auto px-6 max-w-[700px] text-center">
          <h2 className="text-h1 mb-6">Start Eating Smarter Today.</h2>
          <p className="text-xl text-[var(--text-muted)] mb-10 leading-relaxed">Join 10,000+ users who&apos;ve transformed their nutrition with AI. Start your free 7-day trial — no credit card required.</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-grow bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full px-6 py-3.5 text-[var(--text-h)] placeholder-[var(--text-hint)] focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(0,191,191,0.15)] transition-all text-sm"
            />
            <LiquidButton>Get Started</LiquidButton>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">Free 7-day trial · No credit card required · Cancel anytime</p>
        </div>
      </section>
    </div>
  );
}
