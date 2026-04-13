"use client";

import { useRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 + "%";
    const y = ((e.clientY - rect.top) / rect.height) * 100 + "%";
    
    cardRef.current.style.setProperty("--mouse-x", x);
    cardRef.current.style.setProperty("--mouse-y", y);
  };

  return (
    <div
      ref={cardRef}
      className={"glass " + className}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
