"use client";

import { useState, useRef, useEffect } from "react";

// ── Helpers ────────────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Bot Reply Logic ────────────────────────────────────────────────────────
function getBotReply(input: string): string {
  const q = input.toLowerCase().trim();

  // === SERVICES ===
  if (/services?|what do you (do|build|make|offer)|capabilities|specializ/.test(q)) {
    return "We offer 6 core service areas:\n\n🤖 **AI & Automation** — Chatbots, voice AI, stock analysis, business automation (from £1,500)\n⚡ **Web & E-commerce** — Landing pages, business sites, full e-commerce platforms (from £800)\n📊 **Management Systems** — ERP, LMS, hospital management, student portals (from £3,000)\n🏠 **Real Estate Tech** — Property portals, price prediction, agent dashboards (from £2,000)\n🛒 **SaaS Development** — Full product builds with subscriptions & billing (from £5,000)\n🔗 **Custom Integrations** — API connections, CRMs, third-party tools (from £500)\n\nWhich service interests you most?";
  }

  // === PRICING ===
  if (/pric|cost|how much|rate|budget|package|quot|fee|cheap|afford|invest/.test(q)) {
    return "Here's a quick pricing guide:\n\n💡 **Starter** — £800–2K: Landing pages, simple websites, small integrations\n🚀 **Growth** — £2K–8K: Full business sites, e-commerce, management tools\n🏢 **Enterprise** — £8K–25K+: ERP systems, SaaS products, complex AI solutions\n\n📦 **Retainer Plans** from £500/month for ongoing support & development\n\nAll quotes are bespoke — fill out our inquiry form for a free estimate tailored to your project!";
  }

  // === PORTFOLIO / WORK ===
  if (/portfolio|work|project|example|case study|built|previous|past|show me|client/.test(q)) {
    return "We've delivered 15+ projects! Here are some highlights:\n\n🏆 **FlowOps ERP** — Saved a 200-person manufacturer 40% on processing time\n🛒 **ShopLocal UK** — £50K+ revenue generated in first 3 months\n🤖 **Voice Call Automation** — 70% of customer calls fully automated\n📚 **LearnBridge LMS** — £30K/month recurring revenue for our client\n🏥 **MediCare Hub** — 100% paperless clinic in 60 days\n\nVisit **binaryfroster.com/portfolio** to explore all 15 projects with full case studies!";
  }

  // === ABOUT / WHO ARE YOU ===
  if (/about|who are you|company|team|founded|binary frost|tell me about|background/.test(q)) {
    return "**Binary Froster** is a premium software agency serving businesses worldwide, with a strong presence in the 🇬🇧 UK and 🇮🇳 India.\n\nWe build AI integrations, custom web apps, e-commerce platforms, and enterprise management systems — all from scratch. You own the code, the data, and the IP. No lock-in. Ever.\n\n📍 Operating since 2023\n👁 15+ projects delivered\n🌍 Clients in London, Manchester, Mumbai, and Delhi\n📧 binaryfroster@gmail.com";
  }

  // === CONTACT / GET IN TOUCH ===
  if (/contact|reach|email|phone|call|speak|talk to|get in touch|meet|book|schedule/.test(q)) {
    return "There are a few ways to reach us:\n\n📧 **Email:** binaryfroster@gmail.com\n⏱ **Response time:** Within 24 hours (Mon–Fri)\n🕒 **Hours:** 9am–6pm UK GMT / 10am–7pm IST\n\nYou can also:\n→ Fill out our **project inquiry form** on this page for a detailed estimate\n→ Book a free **30-min discovery call** (click the calendar button on the left)\n→ Connect on LinkedIn: in.linkedin.com/in/binary-froster\n\nWe look forward to hearing from you!";
  }

  // === TIMELINE / HOW LONG ===
  if (/how long|timeline|deadline|time|fast|quick|duration|week|month|deliver/.test(q)) {
    return "Typical delivery timelines:\n\n⚡ **Simple landing page:** 1–2 weeks\n🌐 **Business website:** 2–4 weeks\n🛒 **E-commerce platform:** 4–8 weeks\n🤖 **AI integration:** 3–6 weeks\n📊 **Management system:** 8–16 weeks\n🏢 **Full SaaS product:** 10–20 weeks\n\nWe work in 2-week sprints with weekly updates, so you always know where things stand. Rush delivery available — just mention your deadline in the inquiry form!";
  }

  // === TECH STACK ===
  if (/tech|stack|language|framework|react|next|python|node|database|tools|use/.test(q)) {
    return "Our tech stack is carefully chosen for performance:\\ reliability:\n\n⚛️ **Frontend:** React, Next.js, TypeScript, TailwindCSS, GSAP\n🐍 **Backend:** Python (FastAPI), Node.js, Express\n🗄️ **Database:** PostgreSQL, Supabase, MongoDB, Firebase\n🤖 **AI/ML:** OpenAI GPT-4, LangChain, scikit-learn, Whisper\n☁️ **Cloud:** AWS, GCP, Vercel, Docker\n💳 **Payments:** Stripe, Stripe Connect\n\nWe pick the right tool for the job — not whatever we're comfortable with. Your project gets the best fit.";
  }

  // === AI SPECIFICALLY ===
  if (/ai|artificial intel|chatbot|gpt|openai|llm|machine learning|ml|automation|voice/.test(q)) {
    return "AI is one of our strongest areas! We build:\n\n💬 **Custom chatbots** — Trained on your data using RAG + LangChain (from £1,500)\n📞 **Voice AI agents** — Inbound/outbound calls using Whisper + GPT-4 + Twilio (from £3,000)\n📈 **Market analysis tools** — Stock/crypto signals + ML pattern recognition (from £2,500)\n🔄 **Business automation** — Workflows, email sequences, data pipelines (from £800)\n\nAll AI projects come with a 30-day post-launch support guarantee. Ask about our AI discovery session!";
  }

  // === E-COMMERCE ===
  if (/ecommerce|e-commerce|shop|store|sell|woocommerce|shopify|stripe|payment/.test(q)) {
    return "We build powerful e-commerce solutions from scratch (no Shopify templates!):\n\n✅ Multi-vendor marketplace support (Stripe Connect)\n✅ Real-time inventory management\n✅ Automated shipping & labels\n✅ Customer loyalty programmes\n✅ Full admin dashboard\n\n📦 **Our client ShopLocal UK** generated £50K in revenue in their first 3 months.\n\nPricing starts from **£2,500** for a full e-commerce platform. What kind of store are you building?";
  }

  // === PROCESS / HOW IT WORKS ===
  if (/process|how (does|do) it work|step|methodology|approach|start|begin|next step/.test(q)) {
    return "Our process in 5 simple steps:\n\n1️⃣ **Discovery Call** (Free, 30 min) — We understand your goals & constraints\n2️⃣ **Proposal & Quote** — Detailed scope, timeline, and fixed price (within 48hrs)\n3️⃣ **Design Sprint** — Wireframes & UI mockups for your approval\n4️⃣ **Build & Test** — 2-week sprints with weekly progress updates\n5️⃣ **Launch & Support** — Deploy, train your team, 30-day support included\n\n👉 Ready to start? Fill out the inquiry form or book a discovery call!";
  }

  // === SUPPORT / MAINTENANCE ===
  if (/support|maintain|maintain|after launch|post launch|bug|fix|ongoing|retainer/.test(q)) {
    return "We have two post-launch options:\n\n🛡️ **Included (all projects):** 30 days of bug fixes & deployment support, free of charge\n\n🔄 **Retainer Plans** (ongoing):\n• Basic: £500/month — Bug fixes + minor updates (5hrs)\n• Growth: £1,000/month — New features + priority support (12hrs)\n• Enterprise: £2,000/month — Dedicated dev + 24hr response (30hrs)\n\nMost clients start with the Growth retainer after launch. Want to know more?";
  }

  // === GUARANTEE / QUALITY ===
  if (/guarantee|quality|refund|confident|trust|review|testimonial|rating/.test(q)) {
    return "We stand behind our work:\n\n✅ **Fixed-price quotes** — No surprise invoices\n✅ **You own everything** — Code, IP, data. No lock-in\n✅ **30-day post-launch support** — We don't disappear after delivery\n✅ **Real client results** — 15+ projects, 5-star ratings\n\n📣 Client feedback: \"They built our entire e-commerce platform in 6 weeks. Stripe integration, inventory system, everything. Flawless.\" — James Carter, ShopLocal UK\n\nWe also offer milestone-based payments so you only pay as we deliver.";
  }

  // === GREETINGS ===
  if (/^(hi|hello|hey|good (morning|afternoon|evening)|hiya|sup|howdy)/.test(q)) {
    return "Hello! 👋 Great to hear from you. I can help you with:\n\n→ Our **services** and what we build\n→ **Pricing** and packages\n→ **Portfolio** and past projects\n→ **Contact** details and booking a call\n→ Our **process** and timelines\n\nWhat would you like to know?";
  }

  // === THANKS ===
  if (/thank|thanks|cheers|appreciate|helpful/.test(q)) {
    return "You're very welcome! 😊 If you have any more questions, feel free to ask. Ready to take the next step? Fill out our project form or book a free discovery call — we'd love to work with you!";
  }

  // === DEFAULT FALLBACK ===
  return "Great question! 🤔 For the most accurate answer, I'd recommend:\n\n→ **Emailing us:** binaryfroster@gmail.com\n→ **Booking a free call:** Use the calendar on the left\n→ **Submitting your project:** Fill out the form above\n\nOr try asking about our **services**, **pricing**, **portfolio**, or **process** — I know all about those! 😊";
}

// ── LiveChat Component ─────────────────────────────────────────────────────
export default function LiveChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi there! 👋 I'm the Binary Froster assistant. I can tell you all about our services, pricing, portfolio, and team. What would you like to know?", time: "just now" },
    { from: "bot", text: "Quick options: type **services**, **pricing**, **portfolio**, **about us**, **contact**, or ask anything!", time: "just now" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages(prev => [...prev, { from: "user", text: userText, time: "now" }]);
    setChatInput("");
    setTimeout(() => {
      const reply = getBotReply(userText);
      setChatMessages(prev => [...prev, { from: "bot", text: reply, time: "just now" }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 700);
  };

  const handleQuickReply = (chip: string) => {
    const reply = getBotReply(chip);
    setChatMessages(prev => [
      ...prev,
      { from: "user", text: chip, time: "now" },
      { from: "bot", text: reply, time: "just now" }
    ]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {chatOpen && (
        <div className="w-[min(320px,calc(100vw-3rem))] h-[420px] bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-[slide-up_0.35s_cubic-bezier(0.16,1,0.3,1)]">
          {/* Header */}
          <div className="p-4 border-b border-[var(--glass-border)] flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-200">
              BF
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-h)]">Binary Froster Support</p>
              <p className="text-xs text-green-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online now
              </p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="ml-auto w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-h)] transition-colors text-sm"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={msg.from === "bot" ? "self-start max-w-[90%]" : "self-end max-w-[85%]"}>
                <div className={
                  "px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl " +
                  (msg.from === "bot"
                    ? "bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-bl-none text-[var(--text-body)]"
                    : "bg-violet-600 border border-violet-500/40 rounded-br-none text-white")
                }>
                  <p className="whitespace-pre-line" dangerouslySetInnerHTML={{
                    __html: escapeHtml(msg.text)
                      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  }} />
                  <span className="text-[10px] opacity-40 mt-1.5 block">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <div className="p-3 border-t border-[var(--glass-border)] flex gap-2 flex-shrink-0">
            <input
              type="text"
              placeholder="Ask anything: pricing, services..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleChatSend()}
              className="flex-grow bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] focus:border-violet-500 rounded-xl px-3.5 py-2.5 text-[var(--text-h)] text-sm focus:outline-none transition-colors"
            />
            <button
              onClick={handleChatSend}
              className="w-11 h-11 flex-shrink-0 bg-violet-600 border-2 border-violet-500 rounded-xl text-white hover:bg-violet-500 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_18px_rgba(83,74,183,0.5)]"
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          {/* Quick reply chips */}
          <div className="px-3 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
            {["Services", "Pricing", "Portfolio", "Contact"].map((chip) => (
              <button
                key={chip}
                onClick={() => handleQuickReply(chip)}
                className="px-3 py-1 text-[11px] font-semibold rounded-lg border-2 border-violet-500/40 bg-violet-600/10 text-violet-300 hover:bg-violet-600/25 hover:border-violet-500 transition-all flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="w-16 h-16 rounded-2xl bg-violet-600 border-2 border-violet-500 flex items-center justify-center shadow-[0_8px_32px_rgba(83,74,183,0.55)] hover:shadow-[0_8px_40px_rgba(83,74,183,0.75)] hover:scale-105 active:scale-95 transition-all relative"
        aria-label={chatOpen ? "Close chat" : "Open chat"}
      >
        {chatOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
        {!chatOpen && (
          <>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-[8px] font-black text-black flex items-center justify-center">!</span>
          </>
        )}
      </button>
    </div>
  );
}
