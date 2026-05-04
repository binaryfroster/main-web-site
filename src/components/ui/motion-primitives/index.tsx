"use client";

import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { useRef, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

// ─── InView ───────────────────────────────────────────────────────────────────
interface InViewProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  transition?: Transition;
  viewOptions?: Parameters<typeof useInView>[1];
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function InView({
  children,
  className,
  variants = defaultVariants,
  transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  viewOptions = { once: true, margin: "0px 0px -80px 0px" },
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedGroup ────────────────────────────────────────────────────────────
interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: "fade" | "slide" | "scale" | "blur" | "blur-slide";
}

const presetVariants = {
  fade: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
    item: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } },
  },
  slide: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } },
    item: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } },
  },
  scale: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
    item: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } },
  },
  blur: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } },
    item: { hidden: { opacity: 0, filter: "blur(8px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6 } } },
  },
  "blur-slide": {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
    item: { hidden: { opacity: 0, filter: "blur(8px)", y: 24 }, visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } },
  },
};

export function AnimatedGroup({ children, className, variants, preset = "slide" }: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const selected = variants ?? presetVariants[preset];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selected.container}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={selected.item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={selected.item}>{children}</motion.div>}
    </motion.div>
  );
}

// ─── TextEffect ───────────────────────────────────────────────────────────────
type TextEffectPer = "word" | "char" | "line";
type TextEffectPreset = "fade" | "slide" | "scale" | "blur";

interface TextEffectProps {
  children: string;
  per?: TextEffectPer;
  preset?: TextEffectPreset;
  className?: string;
  delay?: number;
  trigger?: boolean;
}

const textPresets: Record<TextEffectPreset, Variants> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slide: { hidden: { opacity: 0, y: "100%" }, visible: { opacity: 1, y: "0%" } },
  scale: { hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(12px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
};

export function TextEffect({ children, per = "word", preset = "fade", className, delay = 0, trigger = true }: TextEffectProps) {
  const tokens = per === "char" ? children.split("") : per === "line" ? children.split("\n") : children.split(" ");

  return (
    <motion.p
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
      className={cn("flex flex-wrap", className)}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={textPresets[preset]}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={per === "line" ? "block" : "inline-block mr-[0.25em]"}
        >
          {token}
          {i < tokens.length - 1 && per === "char" ? "" : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

// ─── Magnetic ─────────────────────────────────────────────────────────────────
interface MagneticProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function Magnetic({ children, intensity = 0.5, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * intensity;
    const y = (e.clientY - rect.top - rect.height / 2) * intensity;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={cn("relative inline-flex", className)}
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── Disclosure (Animated Accordion) ─────────────────────────────────────────
interface DisclosureProps {
  title: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function Disclosure({ title, children, className, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b border-white/10", className)}>
      <button
        className="flex w-full items-center justify-between py-4 text-left text-white"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="font-medium">{title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ↓
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-white/70">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
export function AnimatedCursor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pos, _setPos] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPointer, _setIsPointer] = useState(false);

  if (typeof window !== "undefined") {
    // Only active on client
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] h-4 w-4 rounded-full bg-white mix-blend-difference"
        animate={{ x: pos.x - 8, y: pos.y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ top: 0, left: 0 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] h-8 w-8 rounded-full border border-white/50 mix-blend-difference"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: isPointer ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
