"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import GlassCard from "@/components/ui/GlassCard";
import LiquidButton from "@/components/ui/LiquidButton";
import TiltCard from "@/components/ui/TiltCard";

import { validateContactForm, type ContactFormData, type FormErrors } from "@/utils/validation";

export default function ContactPage() {
  const [budget, setBudget] = useState(5000);
  const [chatOpen, setChatOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", company: "", service: "", desc: "", heard: "" });
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi! 👋 How can we help you today?", time: "just now" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const budgetLabel = () => {
    if (budget < 1000) return "Under £1,000";
    if (budget >= 50000) return "£50,000+";
    const low = Math.floor(budget / 1000) * 1000;
    const high = low + 2000;
    return `£${low.toLocaleString()} – £${high.toLocaleString()}`;
  };

  useEffect(() => {
    gsap.from(".contact-elem", {
      y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
    });

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const validate = (): boolean => {
    const newErrors = validateContactForm(formData);
    setErrors(newErrors);

    // Shake invalid fields
    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach(field => {
        const el = document.getElementById(`field-${field}`);
        if (el) el.style.animation = "shake 0.5s ease-in-out";
        setTimeout(() => { if (el) el.style.animation = ""; }, 500);
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { from: "user", text: chatInput, time: "now" }]);
    setChatInput("");
    // Simulate bot typing
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        from: "bot",
        text: "Thanks for reaching out! One of our team members will get back to you shortly. In the meantime, feel free to fill out the project inquiry form for a detailed estimate.",
        time: "just now"
      }]);
    }, 1500);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 animate-[drift-grid_60s_linear_infinite]" />
        <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-cyan-500/8 to-transparent blur-[80px]" />
      </div>


      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="contact-elem">
              <span className="eyebrow">Get in Touch</span>
              <h1 className="text-h1 mt-4 mb-4">Let&apos;s Build Something Together.</h1>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Tell us about your project and we&apos;ll get back to you within 24 hours. No commitments — just a friendly conversation about what you need.
              </p>
            </div>

            {/* Info Cards */}
            <TiltCard className="contact-elem">
              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-xl">📧</span>
                  <div>
                    <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-1">Email</h4>
                    <a href="mailto:hello@binaryfroster.com" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">hello@binaryfroster.com</a>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
            <TiltCard className="contact-elem">
              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-xl">⏱️</span>
                  <div>
                    <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-1">Response Time</h4>
                    <p className="text-[var(--text-muted)] text-sm">Within 24 hours (Mon–Fri)</p>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
            <TiltCard className="contact-elem">
              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-xl">🌍</span>
                  <div>
                    <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-1">Coverage</h4>
                    <p className="text-[var(--text-muted)] text-sm">Serving UK &amp; US clients</p>
                    <p className="text-[var(--text-muted)] text-xs mt-1">UK: 9am–6pm GMT &nbsp;|&nbsp; US: 9am–5pm EST</p>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>

            <div className="contact-elem mt-4">
              <p className="text-[var(--text-muted)] text-sm mb-3">Prefer to talk? Schedule a 30-min discovery call.</p>
              <LiquidButton variant="ghost" href="#">Book a Call</LiquidButton>
            </div>

            {/* Socials */}
            <div className="contact-elem flex gap-4 mt-4">
              {[
                { name: "LinkedIn", initial: "Li" },
                { name: "GitHub", initial: "Gh" },
                { name: "Twitter/X", initial: "X" },
                { name: "Instagram", initial: "Ig" },
              ].map((s) => (
                <a key={s.name} href="#" className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-cyan-400 hover:border-cyan-400/30 transition-all text-xs font-mono" aria-label={s.name}>
                  {s.initial}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — FORM */}
          <div className="lg:col-span-3 contact-elem">
            <GlassCard className="p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-[var(--text-h)] mb-3">Message Sent!</h3>
                  <p className="text-[var(--text-muted)] mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <LiquidButton variant="ghost" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", company: "", service: "", desc: "", heard: "" }); }}>Send Another Message</LiquidButton>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-display font-medium text-[var(--text-h)] mb-8">Project Inquiry</h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
                    {/* Name */}
                    <div id="field-name" className="relative">
                      <input type="text" id="name" value={formData.name} onChange={e => updateField("name", e.target.value)} placeholder=" " className={"peer w-full bg-[var(--glass-bg)] border rounded-lg px-4 pt-5 pb-2 text-[var(--text-h)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,191,191,0.15)] transition-all text-sm " + (errors.name ? "border-red-500" : "border-[var(--glass-border)] focus:border-cyan-400")} />
                      <label htmlFor="name" className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)] transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-cyan-400 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:translate-y-0 pointer-events-none">Full Name</label>
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div id="field-email" className="relative">
                      <input type="email" id="email" value={formData.email} onChange={e => updateField("email", e.target.value)} placeholder=" " className={"peer w-full bg-[var(--glass-bg)] border rounded-lg px-4 pt-5 pb-2 text-[var(--text-h)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,191,191,0.15)] transition-all text-sm " + (errors.email ? "border-red-500" : "border-[var(--glass-border)] focus:border-cyan-400")} />
                      <label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)] transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-cyan-400 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:translate-y-0 pointer-events-none">Email Address</label>
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Company */}
                    <div className="relative">
                      <input type="text" id="company" value={formData.company} onChange={e => updateField("company", e.target.value)} placeholder=" " className="peer w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 pt-5 pb-2 text-[var(--text-h)] focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,191,191,0.15)] transition-all text-sm" />
                      <label htmlFor="company" className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)] transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-cyan-400 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:translate-y-0 pointer-events-none">Company / Organisation (optional)</label>
                    </div>

                    {/* Service Select */}
                    <div id="field-service" className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">Service Needed</label>
                      <select value={formData.service} onChange={e => updateField("service", e.target.value)} className={"bg-[var(--glass-bg)] border rounded-lg px-4 py-3 text-[var(--text-h)] text-sm focus:outline-none transition-colors appearance-none cursor-pointer " + (errors.service ? "border-red-500" : "border-[var(--glass-border)] focus:border-cyan-400")}>
                        <option value="" className="bg-[var(--bg-surface)]">Select a service...</option>
                        <option value="landing" className="bg-[var(--bg-surface)]">Landing Page / Website</option>
                        <option value="ecom" className="bg-[var(--bg-surface)]">E-commerce Platform</option>
                        <option value="ai" className="bg-[var(--bg-surface)]">AI Integration / Chatbot</option>
                        <option value="mgmt" className="bg-[var(--bg-surface)]">Management System (ERP/LMS/Hospital)</option>
                        <option value="voice" className="bg-[var(--bg-surface)]">Voice Automation</option>
                        <option value="diet" className="bg-[var(--bg-surface)]">AI Diet Planner (subscribe)</option>
                        <option value="saas" className="bg-[var(--bg-surface)]">Full SaaS Development</option>
                        <option value="custom" className="bg-[var(--bg-surface)]">Custom / Not sure</option>
                      </select>
                      {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                    </div>

                    {/* Budget Slider */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">Estimated Budget</label>
                        <span className="text-sm text-cyan-400 font-mono">{budgetLabel()}</span>
                      </div>
                      <input type="range" min="500" max="50000" step="500" value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white/90 [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-cyan-400/40 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125" />
                      <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                        <span>£500</span><span>£50,000+</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div id="field-desc" className="relative">
                      <textarea id="desc" rows={4} value={formData.desc} onChange={e => updateField("desc", e.target.value)} placeholder=" " className={"peer w-full bg-[var(--glass-bg)] border rounded-lg px-4 pt-6 pb-3 text-[var(--text-h)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,191,191,0.15)] transition-all text-sm resize-none " + (errors.desc ? "border-red-500" : "border-[var(--glass-border)] focus:border-cyan-400")} />
                      <label htmlFor="desc" className="absolute left-4 top-4 text-sm text-[var(--text-muted)] transition-all duration-200 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px] pointer-events-none">Tell us about your project...</label>
                      {errors.desc && <p className="text-red-400 text-xs mt-1">{errors.desc}</p>}
                    </div>

                    {/* How heard */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">How did you hear about us?</label>
                      <select value={formData.heard} onChange={e => updateField("heard", e.target.value)} className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-[var(--text-h)] text-sm focus:outline-none focus:border-cyan-400 transition-colors appearance-none cursor-pointer">
                        <option value="" className="bg-[var(--bg-surface)]">Select...</option>
                        <option value="google" className="bg-[var(--bg-surface)]">Google Search</option>
                        <option value="linkedin" className="bg-[var(--bg-surface)]">LinkedIn</option>
                        <option value="twitter" className="bg-[var(--bg-surface)]">Twitter/X</option>
                        <option value="referral" className="bg-[var(--bg-surface)]">Referral</option>
                        <option value="freelance" className="bg-[var(--bg-surface)]">Freelance Platform</option>
                        <option value="other" className="bg-[var(--bg-surface)]">Other</option>
                      </select>
                    </div>

                    <LiquidButton type="submit" isLoading={isSubmitting} className="w-full mt-2">Send Message →</LiquidButton>
                  </form>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* LIVE CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-[999]">
        {chatOpen && (
          <div className="mb-3 w-80 h-[420px] bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-[slide-up_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="p-4 border-b border-[var(--glass-border)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-200">BF</div>
              <div>
                <p className="text-sm font-medium text-[var(--text-h)]">Binary Froster Support</p>
                <p className="text-xs text-cyan-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-h)] transition-colors" aria-label="Close chat">✕</button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={msg.from === "bot" ? "self-start" : "self-end"}>
                  <div className={msg.from === "bot"
                    ? "bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl rounded-bl-none px-3 py-2 max-w-[80%]"
                    : "bg-violet-500/20 border border-violet-500/30 rounded-xl rounded-br-none px-3 py-2 max-w-[80%]"
                  }>
                    <p className="text-sm text-[var(--text-body)]">{msg.text}</p>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[var(--glass-border)] flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleChatSend()}
                className="flex-grow bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-[var(--text-h)] text-sm focus:outline-none focus:border-cyan-400"
              />
              <button onClick={handleChatSend} className="px-3 py-2 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-200 hover:bg-violet-500/30 transition-colors text-sm" aria-label="Send message">↑</button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:bg-white/15 transition-all group relative"
          aria-label={chatOpen ? "Close chat" : "Open chat"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
          {!chatOpen && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />}
          {!chatOpen && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400" />}
        </button>
      </div>

    </div>
  );
}
