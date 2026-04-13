"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PageLoader() {
  const [complete, setComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already loaded
    if (sessionStorage.getItem("bf-loaded")) {
      setTimeout(() => setComplete(true), 0);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);
    const chars = "01";

    const drawRain = () => {
      ctx.fillStyle = "rgba(6,10,26,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#7F77DD";
      ctx.font = "14px 'JetBrains Mono', monospace";
      
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 18, y * 18);
        drops[i] = y * 18 > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };

    const rainInterval = setInterval(drawRain, 50);

    setTimeout(() => {
      clearInterval(rainInterval);
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            sessionStorage.setItem("bf-loaded", "1");
            setComplete(true);
          },
        });
      }
    }, 1800);

    return () => clearInterval(rainInterval);
  }, []);

  if (complete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#060A1A] flex flex-col items-center justify-center gap-6"
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-25" />
      <div className="relative flex flex-col items-center gap-4">
        {/* Frost Crystal SVG */}
        <img
          src="/assets/logo.png"
          alt="Binary Froster"
          className="w-16 h-16 object-contain opacity-0 scale-90"
          style={{ animation: "logo-entrance 0.8s ease-out forwards 0.2s" }}
        />

        <span
          className="text-h3 opacity-0 translate-y-3"
          style={{ animation: "fade-up 0.5s ease forwards 0.9s" }}
        >
          Binary Froster
        </span>
      </div>
      <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden z-10">
        <div
          className="h-full w-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #7F77DD, #00BFBF)",
            animation: "load-bar 1.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards 0.3s",
          }}
        />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes logo-entrance { 
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fade-up { to { opacity: 1; transform: translateY(0); } }
        @keyframes load-bar { to { width: 100%; } }
      `}} />
    </div>
  );
}
