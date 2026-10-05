import { motion, useReducedMotion } from "motion/react";

/** Deterministic pseudo-random so server and client render the same particles. */
function rand(seed: number) {
  const x = Math.sin(seed * 9973.13) * 10000;
  return x - Math.floor(x);
}

export function Particles({ count = 22, tone = "warm" }: { count?: number; tone?: "warm" | "cool" }) {
  const reduced = useReducedMotion();
  const items = Array.from({ length: count }, (_, i) => ({
    left: rand(i + 1) * 100,
    top: rand(i + 41) * 100,
    size: 2 + rand(i + 91) * 5,
    delay: rand(i + 131) * 8,
    duration: 9 + rand(i + 171) * 11,
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <motion.span
          key={i}
          className={
            tone === "warm"
              ? "absolute rounded-full bg-gold/70 blur-[1px]"
              : "absolute rounded-full bg-ivory/50 blur-[1px]"
          }
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={reduced ? { opacity: 0.4 } : { y: [0, -28, 0], opacity: [0, 0.85, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Confetti({ pieces = 34 }: { pieces?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  const colors = ["bg-blush", "bg-rose", "bg-gold", "bg-peach", "bg-wine"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: pieces }, (_, i) => (
        <motion.span
          key={i}
          className={`absolute h-2 w-1.5 rounded-[1px] ${colors[i % colors.length]}`}
          style={{ left: `${rand(i + 7) * 100}%`, top: "-5%" }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: 540, opacity: [1, 1, 0] }}
          transition={{ duration: 3.4 + rand(i + 13) * 2.4, delay: rand(i + 29) * 1.4, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

const FIREWORK_COLORS = ["#FFD166", "#FF8FA3", "#F9F5EC", "#FFC4B8", "#E4B363", "#C9184A"];

export function Fireworks({ bursts = 5 }: { bursts?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: bursts }, (_, b) => {
        const cx = 12 + rand(b + 3) * 76;
        const cy = 10 + rand(b + 17) * 48;
        const color = FIREWORK_COLORS[b % FIREWORK_COLORS.length];
        const color2 = FIREWORK_COLORS[(b + 2) % FIREWORK_COLORS.length];
        const delay = b * 0.7 + rand(b + 31) * 0.35;
        const sparkCount = 18;
        return (
          <div key={`burst-${b}`}>
            {/* rocket rising to the burst point */}
            <motion.span
              className="absolute h-2.5 w-[2px] rounded-full"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                background: `linear-gradient(180deg, ${color}, transparent)`,
              }}
              initial={{ y: 340, opacity: 0 }}
              animate={{ y: 0, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.55, delay, ease: "easeOut" }}
            />
            {/* flash at the burst center */}
            <motion.span
              className="absolute rounded-full blur-md"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                width: 90,
                height: 90,
                x: "-50%",
                y: "-50%",
                background: `radial-gradient(circle, ${color}bb, transparent 70%)`,
              }}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1.15, 0.9], opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.9, delay: delay + 0.5, ease: "easeOut" }}
            />
            {/* outer ring of sparks */}
            {Array.from({ length: sparkCount }, (_, s) => {
              const angle = (s / sparkCount) * Math.PI * 2 + rand(b * 10 + s);
              const dist = 85 + rand(b * 7 + s) * 45;
              return (
                <motion.span
                  key={`o-${b}-${s}`}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{
                    left: `${cx}%`,
                    top: `${cy}%`,
                    background: s % 2 === 0 ? color : color2,
                    boxShadow: `0 0 8px 2px ${color}66`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist + 22,
                    opacity: [0, 1, 1, 0],
                    scale: [0.4, 1.1, 0.9, 0.5],
                  }}
                  transition={{ duration: 1.7, delay: delay + 0.5, ease: "easeOut" }}
                />
              );
            })}
            {/* inner ivory ring for depth */}
            {Array.from({ length: 10 }, (_, s) => {
              const angle = (s / 10) * Math.PI * 2;
              return (
                <motion.span
                  key={`i-${b}-${s}`}
                  className="absolute h-1 w-1 rounded-full bg-[#F9F5EC]"
                  style={{ left: `${cx}%`, top: `${cy}%` }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: Math.cos(angle) * 34, y: Math.sin(angle) * 34 + 12, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.3, delay: delay + 0.55, ease: "easeOut" }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function FloatingHearts({ count = 10 }: { count?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="absolute text-lg"
          style={{ left: `${rand(i + 5) * 92 + 3}%`, bottom: "-8%" }}
          animate={{ y: ["0vh", "-95vh"], opacity: [0, 1, 0], x: [0, rand(i) * 30 - 15, 0] }}
          transition={{ duration: 7 + rand(i + 2) * 5, delay: rand(i + 9) * 4, repeat: Infinity }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}

export function Grain() {
  return <div aria-hidden className="grain pointer-events-none absolute inset-0" />;
}
