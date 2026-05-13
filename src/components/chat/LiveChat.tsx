"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getBotReply } from "./botBrain";

// ── Types ──────────────────────────────────────────────────────────────────
type Msg = { from: "bot" | "user"; text: string; time: string };

function timeNow(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarkdown(text: string): string {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

// ── Quick Chips ────────────────────────────────────────────────────────────
const QUICK_CHIPS = [
  { label: "🛠 Services", value: "services" },
  { label: "💰 Pricing", value: "pricing" },
  { label: "📂 Portfolio", value: "portfolio" },
  { label: "🤖 AI", value: "AI solutions" },
  { label: "📞 Contact", value: "contact" },
  { label: "⏱ Timeline", value: "timeline" },
  { label: "⚙️ Tech Stack", value: "tech stack" },
  { label: "❓ Help", value: "help" },
];

// ── Typing Dots ────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="self-start max-w-[85%]">
      <div className="px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl rounded-bl-none">
        <div className="flex gap-1 items-center h-4">
          <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-[bounce_1.4s_ease-in-out_infinite]" />
          <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
          <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hi there! 👋 I'm the Binary Froster assistant.\n\nI can answer questions about our **services**, **pricing**, **portfolio**, **AI solutions**, and more.\n\nHow can I help you today?", time: timeNow() },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { from: "user", text: text.trim(), time: timeNow() };
    setMsgs((p) => [...p, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate typing delay (300-800ms)
    const delay = 400 + Math.random() * 400;
    setTimeout(() => {
      const reply = getBotReply(text);
      setMsgs((p) => [...p, { from: "bot", text: reply, time: timeNow() }]);
      setTyping(false);
    }, delay);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col items-end gap-3">
      {/* ── Chat Window ─────────────────────────────────────── */}
      {open && (
        <div className="w-[min(380px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-120px))] flex flex-col overflow-hidden rounded-none border border-[var(--glass-border)] bg-[var(--bg-surface)]/97 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] animate-[slide-up_0.3s_cubic-bezier(0.16,1,0.3,1)]">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--glass-border)] bg-gradient-to-r from-violet-600/10 to-cyan-600/5 flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                BF
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[var(--bg-surface)]" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-semibold text-[var(--text-h)] truncate">Binary Froster</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                Online — typically replies instantly
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-h)] transition-all"
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto px-4 py-4 flex flex-col gap-3 scroll-smooth">
            {msgs.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"} animate-[fade-in_0.2s_ease-out]`}
              >
                {msg.from === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-1 shadow-sm">
                    BF
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.from === "user" ? "order-first" : ""}`}>
                  <div
                    className={
                      "px-3.5 py-2.5 text-[13px] leading-[1.6] rounded-2xl break-words " +
                      (msg.from === "bot"
                        ? "bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-bl-sm text-[var(--text-body)]"
                        : "bg-gradient-to-br from-violet-600 to-violet-700 border border-violet-500/30 rounded-br-sm text-white shadow-[0_2px_12px_rgba(139,92,246,0.25)]")
                    }
                  >
                    <p
                      className="whitespace-pre-line [&_strong]:font-semibold [&_strong]:text-[var(--text-h)]"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />
                  </div>
                  <span className={`text-[10px] mt-1 block ${msg.from === "user" ? "text-right" : "text-left"} text-[var(--text-muted)] opacity-50`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {typing && <TypingIndicator />}
            <div ref={endRef} />
          </div>

          {/* Quick Chips */}
          <div className="px-3 py-2 flex gap-1.5 overflow-x-auto scrollbar-none border-t border-[var(--glass-border)]/50 flex-shrink-0">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.value}
                onClick={() => sendMessage(chip.value)}
                disabled={typing}
                className="px-2.5 py-1 text-[10px] font-medium rounded-none border border-violet-500/30 bg-violet-500/8 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all flex-shrink-0 disabled:opacity-40 whitespace-nowrap"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-3 pb-3 pt-1 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={typing}
              className="flex-grow bg-[var(--glass-bg)] border border-white/20 focus:ring-2 focus:ring-[var(--text-h)] focus:border-[var(--text-h)] rounded-none px-4 py-2.5 text-[var(--text-h)] text-sm focus:outline-none transition-all disabled:opacity-50 placeholder:text-[var(--text-muted)]"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-violet-600 to-violet-700 border border-violet-500/40 rounded-none text-white hover:from-violet-500 hover:to-violet-600 active:scale-95 transition-all flex items-center justify-center shadow-[0_2px_16px_rgba(139,92,246,0.3)] disabled:opacity-40"
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div className="px-3 pb-2 flex-shrink-0">
            <p className="text-center text-[9px] text-[var(--text-muted)] opacity-40">
              Powered by Binary Froster • <a href="/contact" className="hover:text-violet-400 transition-colors">Contact us</a> for complex queries
            </p>
          </div>
        </div>
      )}

      {/* ── Toggle Button ───────────────────────────────────── */}
      <button
        onClick={() => setOpen(!open)}
        className="group w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-violet-700 border border-violet-500/40 flex items-center justify-center shadow-[0_4px_24px_rgba(139,92,246,0.4)] hover:shadow-[0_4px_32px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all relative"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
        {!open && (
          <>
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-cyan-400" />
          </>
        )}
      </button>
    </div>
  );
}
