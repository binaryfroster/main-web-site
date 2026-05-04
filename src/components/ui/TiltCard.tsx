"use client";

import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
}

export default function TiltCard({ children, className = "", glare = true }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ transform: "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: "" });
  // removed unused isHovered state

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    
    const max = 13;
    const rotX = -dy * max;
    const rotY = dx * max;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`,
      transition: "transform 0.05s linear"
    });

    if (glare) {
      const gx = ((dx + 1) / 2) * 100;
      const gy = ((dy + 1) / 2) * 100;
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)",
      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
    });
    if (glare) {
      setGlareStyle({ opacity: 0, background: glareStyle.background });
    }
    
    // Reset transition duration after snap back
    setTimeout(() => {
      setStyle({
        transform: "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)",
        transition: "transform 0.05s linear"
      });
    }, 500);
  };

  return (
    <div
      ref={cardRef}
      className={`relative transform-style-3d will-change-transform ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-inherit transition-opacity duration-300"
          style={glareStyle}
        />
      )}
      {children}
    </div>
  );
}
