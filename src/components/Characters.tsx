import { motion, useReducedMotion } from "motion/react";

/**
 * Original hand-drawn style cartoon characters.
 * Change colours in CHARACTER_LOOK to customise their appearance.
 */
export const CHARACTER_LOOK = {
  her: { hair: "#5a2e22", skin: "#f3c9a8", outfit: "#e58b8b", accent: "#f6d36b" },
  him: { hair: "#2e1f1a", skin: "#e7b690", outfit: "#7a2b3a", accent: "#f2e6d0" },
};

export type Mood = "happy" | "shocked" | "nervous" | "blush" | "excited";

const STROKE = "#3a1f1a";

function Face({ mood, cx, cy }: { mood: Mood; cx: number; cy: number }) {
  const reduced = useReducedMotion();
  const eyeY = cy - 2;
  const eye = (x: number) =>
    mood === "shocked" ? (
      <circle cx={x} cy={eyeY} r={4.2} fill="#fff" stroke={STROKE} strokeWidth={2} />
    ) : mood === "excited" ? (
      <path d={`M${x - 4} ${eyeY + 1} q4 -6 8 0`} stroke={STROKE} strokeWidth={2.4} fill="none" strokeLinecap="round" />
    ) : (
      <motion.ellipse
        cx={x}
        cy={eyeY}
        rx={2.6}
        ry={3.4}
        fill={STROKE}
        animate={reduced ? {} : { ry: [3.4, 3.4, 0.3, 3.4] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
      />
    );
  const mouth =
    mood === "shocked" ? (
      <ellipse cx={cx} cy={cy + 10} rx={3.5} ry={4.5} fill={STROKE} />
    ) : mood === "nervous" ? (
      <path d={`M${cx - 6} ${cy + 11} q3 -3 6 0 q3 3 6 0`} stroke={STROKE} strokeWidth={2} fill="none" strokeLinecap="round" />
    ) : (
      <path d={`M${cx - 6} ${cy + 8} q6 7 12 0`} stroke={STROKE} strokeWidth={2.2} fill={mood === "excited" ? "#b3444f" : "none"} strokeLinecap="round" />
    );
  return (
    <g>
      {eye(cx - 9)}
      {eye(cx + 9)}
      {(mood === "blush" || mood === "happy" || mood === "excited") && (
        <>
          <ellipse cx={cx - 15} cy={cy + 6} rx={4.5} ry={2.6} fill="#f08f8f" opacity={0.6} />
          <ellipse cx={cx + 15} cy={cy + 6} rx={4.5} ry={2.6} fill="#f08f8f" opacity={0.6} />
        </>
      )}
      {mood === "nervous" && <path d={`M${cx + 20} ${cy - 16} q3 6 0 9 q-3 -3 0 -9`} fill="#9fd3e8" stroke={STROKE} strokeWidth={1} />}
      {mouth}
    </g>
  );
}

function motionFor(mood: Mood, reduced: boolean | null) {
  if (reduced) return {};
  if (mood === "excited") return { y: [0, -16, 0] };
  if (mood === "shocked") return { rotate: [0, -4, 4, 0] };
  if (mood === "nervous") return { x: [0, -2, 2, 0] };
  return { y: [0, -3, 0] };
}

export function Her({ mood = "happy", size = 120, className = "" }: { mood?: Mood; size?: number; className?: string }) {
  const reduced = useReducedMotion();
  const c = CHARACTER_LOOK.her;
  return (
    <motion.svg
      viewBox="0 0 100 130"
      width={size}
      height={size * 1.3}
      className={className}
      animate={motionFor(mood, reduced)}
      transition={{ duration: mood === "excited" ? 0.6 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Her cartoon"
      role="img"
    >
      {/* hair back */}
      <path d="M18 50 Q14 90 28 96 L72 96 Q86 90 82 50 Q78 14 50 14 Q22 14 18 50Z" fill={c.hair} stroke={STROKE} strokeWidth={2.5} />
      {/* body */}
      <path d="M28 128 Q28 96 50 94 Q72 96 72 128Z" fill={c.outfit} stroke={STROKE} strokeWidth={2.5} />
      {/* head */}
      <circle cx={50} cy={52} r={27} fill={c.skin} stroke={STROKE} strokeWidth={2.5} />
      {/* bangs */}
      <path d="M24 46 Q34 24 52 26 Q70 24 77 46 Q62 36 50 40 Q36 36 24 46Z" fill={c.hair} stroke={STROKE} strokeWidth={2} />
      {/* bow */}
      <path d="M68 24 l10 -6 l-2 12z M68 24 l-8 -8 l-2 12z" fill={c.accent} stroke={STROKE} strokeWidth={1.8} />
      <Face mood={mood} cx={50} cy={54} />
    </motion.svg>
  );
}

export function Him({ mood = "happy", size = 110, className = "" }: { mood?: Mood; size?: number; className?: string }) {
  const reduced = useReducedMotion();
  const c = CHARACTER_LOOK.him;
  return (
    <motion.svg
      viewBox="0 0 100 130"
      width={size}
      height={size * 1.3}
      className={className}
      animate={motionFor(mood, reduced)}
      transition={{ duration: mood === "excited" ? 0.55 : 2.6, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Me cartoon"
      role="img"
    >
      <path d="M26 128 Q26 96 50 94 Q74 96 74 128Z" fill={c.outfit} stroke={STROKE} strokeWidth={2.5} />
      <path d="M44 96 l6 8 l6 -8" fill={c.accent} stroke={STROKE} strokeWidth={1.8} />
      <circle cx={50} cy={54} r={27} fill={c.skin} stroke={STROKE} strokeWidth={2.5} />
      <path d="M22 50 Q20 24 48 22 Q80 20 78 48 Q70 34 56 36 Q58 30 50 30 Q44 38 22 50Z" fill={c.hair} stroke={STROKE} strokeWidth={2.2} />
      <Face mood={mood} cx={50} cy={56} />
    </motion.svg>
  );
}
