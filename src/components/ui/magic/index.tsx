"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState, useId, useMemo, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Animated Beam ───────────────────────────────────────────────────────────
interface AnimatedBeamProps {
  className?: string;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  containerRef: React.RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration: durationProp,
  delay = 0,
  gradientStartColor = "#9c40ff",
  gradientStopColor = "#ffaa40",
}: AnimatedBeamProps) {
  const id = useId();
  const duration = durationProp ?? 5.5;
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current || !svgRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;

      if (svgRef.current) {
        svgRef.current.setAttribute("width", String(svgWidth));
        svgRef.current.setAttribute("height", String(svgHeight));
        svgRef.current.style.position = "absolute";
        svgRef.current.style.top = "0";
        svgRef.current.style.left = "0";
        svgRef.current.style.overflow = "visible";
        svgRef.current.style.pointerEvents = "none";
        svgRef.current.style.zIndex = "0";
      }

      const startX = fromRect.left - containerRect.left + fromRect.width / 2;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;
      const endX = toRect.left - containerRect.left + toRect.width / 2;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;

      const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
      if (pathRef.current) pathRef.current.setAttribute("d", d);
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg ref={svgRef} className={cn("pointer-events-none absolute", className)}>
      <defs>
        <linearGradient id={`${id}-gradient`} gradientUnits="userSpaceOnUse">
          <stop stopColor={gradientStartColor} stopOpacity="0" offset="0%" />
          <stop stopColor={gradientStartColor} offset="32.5%" />
          <stop stopColor={gradientStopColor} offset="67.5%" />
          <stop stopColor={gradientStopColor} stopOpacity="0" offset="100%" />
        </linearGradient>
      </defs>
      {/* Static dim path */}
      <path ref={pathRef} fill="none" stroke="#ffffff10" strokeWidth={2} />
      {/* Animated glowing path */}
      <motion.path
        fill="none"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={2}
        initial={{ pathLength: 0, pathOffset: reverse ? -1 : 1 }}
        animate={{ pathLength: 1, pathOffset: 0 }}
        transition={{
          pathLength: { duration, delay, ease: "linear", repeat: Infinity, repeatType: "loop" },
          pathOffset: { duration, delay, ease: "linear", repeat: Infinity, repeatType: "loop" },
        }}
        d=""
        ref={(el) => {
          if (el && pathRef.current) el.setAttribute("d", pathRef.current.getAttribute("d") ?? "");
        }}
      />
    </svg>
  );
}

// ─── Number Ticker ────────────────────────────────────────────────────────────
interface NumberTickerProps {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  className?: string;
}

export function NumberTicker({
  value,
  startValue = 1,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(direction === "down" ? value : startValue);
  const [isInView, setIsInView] = useState(false);

  // Audit the IntersectionObserver binding — fix root margin and threshold (use threshold: 0.1, rootMargin: "0px 0px -50px 0px")
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Add a useEffect fallback trigger with 300ms delay that fires on mount independent of scroll position
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const transformed = useTransform(motionVal, (latest) => {
    const val = Math.max(1, Number(latest.toFixed(decimalPlaces)));
    return Intl.NumberFormat("en-US", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(val);
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const target = direction === "down" ? startValue : value;
        animate(motionVal, target, { duration: 2, ease: "easeOut" });
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionVal, value, startValue, direction, delay, isInView]);

  useEffect(() => {
    return transformed.on("change", (val) => {
      if (ref.current && val !== "0") {
        ref.current.textContent = val;
      }
    });
  }, [transformed]);

  return (
    <span className={cn("inline-block tabular-nums tracking-wider", className)} ref={ref}>
      {Intl.NumberFormat("en-US", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(
        Math.max(1, value)
      )}
    </span>
  );
}

// ─── Shimmer Button ───────────────────────────────────────────────────────────
interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children: ReactNode;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "radial-gradient(ellipse at bottom, #1a1a2e 0%, #16213e 100%)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-white",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden [border-radius:var(--radius)]",
          "before:absolute before:inset-0 before:aspect-square before:size-full before:rotate-[-90deg] before:animate-[shimmer_var(--speed)_infinite] before:bg-[conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] before:opacity-0 before:transition-opacity before:duration-300 before:[background-size:300%_300%] before:[offset-anchor:calc(50%+var(--size)*cos(var(--angle)))_calc(50%+var(--size)*sin(var(--angle)))]",
          "group-hover:before:opacity-100"
        )}
      />
      <div className="absolute inset-[1px] rounded-[calc(var(--radius)-1px)] bg-black/80" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

// ─── Meteors ──────────────────────────────────────────────────────────────────
interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, i) => {
        // Deterministic seed per index to avoid hydration mismatch
        const seed = (i + 1) * 9301 + 49297;
        const rng = (offset: number) => ((seed * (offset + 1)) % 233280) / 233280;
        return {
          id: i,
          top: `${rng(0) * 100}%`,
          left: `${rng(1) * 100}%`,
          delay: `${rng(2) * 2}s`,
          duration: `${rng(3) * 8 + 4}s`,
        };
      }),
    [number]
  );

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map(({ id, top, left, delay, duration }) => (
        <span
          key={id}
          className="absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-[meteor_linear_infinite] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={{ top, left, animationDelay: delay, animationDuration: duration }}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
}

// ─── Text Reveal ─────────────────────────────────────────────────────────────
interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("relative z-0 mx-auto", className)}>
      <p className="flex flex-wrap gap-x-2">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="text-white"
          >
            {word}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
