"use client";

import { useState, useEffect } from "react";

const phrases = ["AI Systems.", "Web Applications.", "SaaS Products.", "Automation Tools."];

export default function Typewriter() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }, 40);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <span className="inline-flex items-baseline gap-0">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-400">
        {text}
      </span>
      <span className="w-[2px] h-[1em] bg-cyan-400 inline-block ml-1 animate-[blink-cursor_1s_step-end_infinite]" />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }` }} />
    </span>
  );
}
