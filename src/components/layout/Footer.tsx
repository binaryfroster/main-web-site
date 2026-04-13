"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="border-t border-white/8 bg-[#0D1530] py-16 relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-[200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-violet-800/8 blur-[80px]" />
        <div className="absolute -top-[150px] left-[20%] w-[400px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 max-w-[1320px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm text-text-muted">
          
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/logo.png"
                alt="Binary Froster Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-display font-bold text-lg text-text-h">Binary Froster</span>
            </div>
            <p className="leading-relaxed mb-6 text-sm">
              Precision-Built Technology for Growing Businesses.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", icon: "in" },
                { name: "GitHub", icon: "GH" },
                { name: "Twitter", icon: "X" },
                { name: "Instagram", icon: "IG" },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  title={s.name}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-text-muted hover:text-white hover:bg-white/10 hover:scale-110 hover:rotate-[8deg] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-display text-text-h font-semibold mb-4 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Home", "Services", "Portfolio", "Products", "About", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="hover:text-cyan-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="font-display text-text-h font-semibold mb-4 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-2.5">
              {["AI & Automation", "Web Development", "E-commerce", "Management Systems", "AI Diet Planner", "Custom Integrations"].map((svc) => (
                <li key={svc}>
                  <a href="/services" className="hover:text-cyan-400 transition-colors text-sm">{svc}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact + Newsletter */}
          <div>
            <h4 className="font-display text-text-h font-semibold mb-4 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <span className="text-base">📧</span>
                <a href="mailto:hello@binaryfroster.com" className="hover:text-cyan-400 transition-colors">hello@binaryfroster.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="text-base">⏱️</span>
                Mon–Fri, 9am–6pm UK/EST
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="text-base">🌍</span>
                Serving US &amp; United Kingdom
              </li>
            </ul>

            {/* Newsletter */}
            <p className="text-xs text-text-muted mb-2">Get tech tips in your inbox</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                Subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-grow bg-white/5 border border-white/10 border-r-0 rounded-l-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400 placeholder-white/20"
                  required
                />
                <button type="submit" className="px-3 py-2 bg-violet-500/20 border border-violet-500/30 rounded-r-lg text-violet-200 hover:bg-violet-500/30 transition-colors text-sm">
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted tracking-wider">
          <p>© {new Date().getFullYear()} Binary Froster. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
