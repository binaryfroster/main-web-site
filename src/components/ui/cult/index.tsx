"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Direction-Aware Hover Card ───────────────────────────────────────────────
type Direction = "top" | "bottom" | "left" | "right";

function getDirection(e: MouseEvent, el: HTMLElement): Direction {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const angle = Math.atan2(y, x) * (180 / Math.PI);

  if (angle >= -45 && angle < 45) return "right";
  if (angle >= 45 && angle < 135) return "bottom";
  if (angle >= -135 && angle < -45) return "top";
  return "left";
}

const directionVariants = {
  top: { y: "-100%" },
  bottom: { y: "100%" },
  left: { x: "-100%" },
  right: { x: "100%" },
};

interface DirectionAwareHoverProps {
  children: ReactNode;
  overlay: ReactNode;
  className?: string;
  overlayClassName?: string;
}

export function DirectionAwareHover({ children, overlay, className, overlayClassName }: DirectionAwareHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>("right");
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) setDirection(getDirection(e.nativeEvent, ref.current));
    setHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) setDirection(getDirection(e.nativeEvent, ref.current));
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className={cn("absolute inset-0 z-10", overlayClassName)}
            initial={directionVariants[direction]}
            animate={{ x: 0, y: 0 }}
            exit={directionVariants[direction]}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {overlay}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Canvas Reveal Effect ─────────────────────────────────────────────────────
interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
}

export function CanvasRevealEffect({
  containerClassName,
  animationSpeed = 5,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  dotSize = 3,
}: CanvasRevealEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.floor(canvas.width / (dotSize * 2));
      const rows = Math.floor(canvas.height / (dotSize * 2));

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSize * 2 + dotSize;
          const y = j * dotSize * 2 + dotSize;
          const dist = Math.sqrt((x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2);
          const wave = Math.sin(dist / 30 - t) * 0.5 + 0.5;
          const colorIdx = Math.floor(wave * colors.length) % colors.length;
          const [r, g, b] = colors[colorIdx];
          const opacityIdx = Math.floor(wave * opacities.length) % opacities.length;
          const opacity = opacities[opacityIdx];
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      t += animationSpeed / 1000;
      animRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [animationSpeed, colors, dotSize, opacities]);

  return (
    <div className={cn("absolute inset-0", containerClassName)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

// ─── Terminal Demo ────────────────────────────────────────────────────────────
interface TerminalLine {
  type: "input" | "output" | "error";
  text: string;
  delay?: number;
}

interface TerminalDemoProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
}

export function TerminalDemo({ lines, title = "terminal", className }: TerminalDemoProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let idx = 0;
    const show = () => {
      if (idx < lines.length) {
        idx++;
        setVisibleCount(idx);
        const delay = lines[idx - 1]?.delay ?? 500;
        setTimeout(show, delay);
      }
    };
    show();
  }, [lines]);

  const colors = { input: "text-green-400", output: "text-white/80", error: "text-red-400" };

  return (
    <div className={cn("rounded-xl border border-white/10 bg-black/80 font-mono text-sm", className)}>
      {/* Title bar */}
      <div className="flex items-center gap-2 rounded-t-xl border-b border-white/10 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-auto text-white/30 text-xs">{title}</span>
      </div>
      {/* Content */}
      <div className="p-4 space-y-1">
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("flex gap-2", colors[line.type])}
          >
            {line.type === "input" && <span className="text-green-600">$</span>}
            <span>{line.text}</span>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block h-4 w-2 bg-white/60"
        />
      </div>
    </div>
  );
}

// ─── Dynamic Island ───────────────────────────────────────────────────────────
interface DynamicIslandProps {
  children: ReactNode;
  expanded?: boolean;
  className?: string;
}

export function DynamicIsland({ children, expanded = false, className }: DynamicIslandProps) {
  return (
    <motion.div
      className={cn(
        "relative mx-auto flex items-center justify-center overflow-hidden rounded-[50px] bg-black text-white",
        className
      )}
      animate={{
        width: expanded ? 320 : 120,
        height: expanded ? 80 : 36,
        borderRadius: expanded ? 24 : 50,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={expanded ? "expanded" : "compact"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="flex w-full items-center justify-center px-4"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ─── BgAnimate Button ─────────────────────────────────────────────────────────
interface BgAnimateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  gradient?: string;
  className?: string;
}

export function BgAnimateButton({
  children,
  gradient = "from-[#6344F5] via-[#AE48FF] to-[#18CCFC]",
  className,
  ...props
}: BgAnimateButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[2px] font-medium transition-all focus:outline-none",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 h-full w-full bg-gradient-to-r",
          gradient,
          "animate-[spin_3s_linear_infinite] rounded-full blur-sm group-hover:blur-md"
        )}
      />
      <span className="relative flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white transition-all group-hover:bg-black/80">
        {children}
      </span>
    </button>
  );
}
