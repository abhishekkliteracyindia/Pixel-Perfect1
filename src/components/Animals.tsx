import { motion, useReducedMotion } from "motion/react";

export type AnimalMood = "idle" | "hopeful" | "nervous" | "celebrate";

const CREW = [
  { emoji: "🐰", sign: "please 🥺" },
  { emoji: "🐶", sign: "say yes" },
  { emoji: "🐱", sign: "do it" },
  { emoji: "🐻", sign: "please please" },
  { emoji: "🐧", sign: "🥺" },
  { emoji: "🦆", sign: "pleeease" },
];

const PLAYFUL_CREW = [
  { emoji: "🐰", toy: "🥕", position: "left-[3%] top-[16%]" },
  { emoji: "🐶", toy: "🎾", position: "right-[3%] top-[23%]" },
  { emoji: "🐱", toy: "🧶", position: "left-[5%] bottom-[14%]" },
  { emoji: "🐻", toy: "🎈", position: "right-[5%] bottom-[12%]" },
  { emoji: "🐧", toy: "✨", position: "left-[23%] bottom-[3%]" },
  { emoji: "🦆", toy: "🌼", position: "right-[23%] top-[5%]" },
];

export function PlayfulAnimals({ scene }: { scene: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[6] overflow-hidden">
      {PLAYFUL_CREW.map((animal, i) => (
        <motion.div
          key={`${scene}-${animal.emoji}`}
          className={`absolute ${animal.position} ${i > 3 ? "hidden sm:block" : "block"}`}
          initial={reduced ? { opacity: 0.7 } : { opacity: 0, scale: 0.4, y: 20 }}
          animate={reduced ? { opacity: 0.7 } : { opacity: 0.9, scale: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.16, type: "spring", stiffness: 170, damping: 13 }}
        >
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20"
            animate={
              reduced
                ? {}
                : i % 3 === 0
                  ? { y: [0, -12, 0], rotate: [0, -7, 5, 0] }
                  : i % 3 === 1
                    ? { x: [0, 13, -8, 0], rotate: [0, 8, -5, 0] }
                    : { scale: [1, 1.1, 1], rotate: [0, -8, 8, 0] }
            }
            transition={{ duration: 2.4 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="select-none text-4xl drop-shadow-sm sm:text-5xl">{animal.emoji}</span>
            <motion.span
              className="absolute right-0 top-0 select-none text-lg sm:text-2xl"
              animate={reduced ? {} : { y: [0, -9, 0], rotate: [0, 18, -10, 0] }}
              transition={{ duration: 1.7 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {animal.toy}
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export function Animals({ mood = "idle" }: { mood?: AnimalMood }) {
  const reduced = useReducedMotion();

  const anim = (i: number) => {
    if (reduced) return {};
    switch (mood) {
      case "celebrate":
        return { y: [0, -18, 0], rotate: [0, i % 2 ? 8 : -8, 0] };
      case "hopeful":
        return { y: [0, -8, 0], scale: [1, 1.08, 1] };
      case "nervous":
        return { x: [0, -3, 3, 0], rotate: [0, -4, 4, 0] };
      default:
        return { y: [0, -4, 0] };
    }
  };

  return (
    <div
      aria-hidden
      className="mt-8 flex w-full max-w-lg flex-wrap items-end justify-center gap-x-3 gap-y-4"
    >
      {CREW.map((a, i) => (
        <motion.div
          key={a.emoji}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.35, type: "spring", stiffness: 160, damping: 14 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={anim(i)}
            transition={{
              duration: mood === "nervous" ? 0.6 : 1.8,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          >
            <span
              className={`rotate-[-3deg] rounded-md border-2 border-wine/70 bg-ivory px-2 py-0.5 hand text-sm text-wine shadow-sm transition-opacity duration-500 ${
                mood === "idle" ? "opacity-0" : "opacity-100"
              }`}
            >
              {mood === "celebrate" ? "yayyy" : mood === "nervous" ? "no?? 😭" : a.sign}
            </span>
            <span className="mt-1 text-4xl sm:text-5xl">{a.emoji}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
