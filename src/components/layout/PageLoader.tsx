"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(0);

  const loaderRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // 1. Initial mount check
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // 2. Determine if we should show the loader
  useEffect(() => {
    if (mounted && !sessionStorage.getItem("bf-loaded")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      
      // Fallback: If image takes too long or onLoad fails, force start animation after 1 second
      const timer = setTimeout(() => {
        setAssetsLoaded(1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // 3. GSAP Sequence (Calibrated for ~2 seconds — fast and snappy)
  useGSAP(() => {
    if (!show || assetsLoaded < 1 || !loaderRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("bf-loaded", "1");
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.3,
          pointerEvents: "none",
          onComplete: () => setShow(false)
        });
      }
    });

    // Initial states
    gsap.set(welcomeRef.current, { opacity: 0, y: 15 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });

    // Sequence breakdown — fast but elegant:
    tl.to(welcomeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(welcomeRef.current, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, "+=0.3")
      .to(logoRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" })
      .to(logoRef.current, { opacity: 0, scale: 1.2, duration: 0.3, ease: "power2.in" }, "+=0.2");

  }, { dependencies: [show, assetsLoaded], scope: loaderRef });

  if (!mounted || !show) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#000] flex items-center justify-center overflow-hidden"
    >
      {/* 1. Welcome Message */}
      <div 
        ref={welcomeRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none opacity-0"
      >
        <span className="font-display font-bold text-5xl md:text-7xl tracking-tighter text-gradient-welcome text-center px-4">
          BINARY FROSTER
        </span>
      </div>

      {/* 2. Brand Logo Centerstage */}
      <div ref={logoRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 md:w-48 md:h-48 opacity-0 flex items-center justify-center">
        <Image
          src="/assets/logo.webp"
          alt="Binary Froster"
          fill
          priority
          sizes="(max-width: 768px) 128px, 192px"
          onLoad={() => setAssetsLoaded(prev => prev + 1)}
          className="object-contain"
          draggable={false}
        />
      </div>



      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 bg-radial-gradient from-violet-900/20 to-transparent opacity-50" />
    </div>
  );
}
