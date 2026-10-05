import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";
import { sfx } from "@/lib/sound";

export const sceneVariants: Variants = {
  initial: { opacity: 0, scale: 1.03, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.985, filter: "blur(6px)" },
};

export function Scene({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <motion.section
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
      className={`relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-16 sm:px-8 ${
        dark ? "bg-night text-ivory" : "bg-background text-foreground"
      } ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function Line({
  children,
  delay = 0,
  className = "",
  as = "p",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "p" | "h1" | "h2" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Tag>
  );
}

type ButtonTone = "yes" | "no" | "quiet" | "gold";

export function StoryButton({
  children,
  onClick,
  tone = "quiet",
  heartbeat = false,
  onMouseEnter,
  onMouseLeave,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: ButtonTone;
  heartbeat?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const reduced = useReducedMotion();
  const tones: Record<ButtonTone, string> = {
    yes: "bg-wine text-ivory shadow-[0_16px_40px_-18px_var(--wine)]",
    no: "bg-ivory text-wine border border-blush",
    quiet: "bg-blush/50 text-wine border border-rose/30",
    gold: "bg-gold text-wine shadow-[0_16px_40px_-20px_var(--gold)]",
  };
  return (
    <motion.button
      type={type}
      onClick={() => {
        sfx.click();
        onClick?.();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      whileTap={{ scale: 0.96 }}
      animate={heartbeat && !reduced ? { scale: [1, 1.06, 1] } : {}}
      transition={heartbeat ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : {}}
      className={`min-h-12 min-w-32 rounded-full px-7 py-3 text-base font-medium tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none ${tones[tone]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-6 max-w-md text-center text-sm text-muted-foreground">{children}</p>;
}
