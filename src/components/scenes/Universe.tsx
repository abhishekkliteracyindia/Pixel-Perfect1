import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Grain, Particles } from "@/components/Atmosphere";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story, type Memory } from "@/config/story";

const TILTS = [-3, 2, -1.5, 3, -2, 1];

export function Universe({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState<Memory | null>(null);
  return (
    <Scene>
      <Particles count={12} />
      <Grain />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <Line as="h2" className="text-center font-display text-4xl text-wine">
          Our Little Universe ❤️
        </Line>
        <Line delay={0.4} className="mt-1 hand text-xl text-cocoa/80">
          open the little cards
        </Line>
        <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:gap-6">
          {story.memories.map((m, i) => (
            <motion.button
              key={m.title + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length] ?? 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(m)}
              className="tape paper relative rounded-xl p-5 text-left focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none"
            >
              <span className="text-3xl">{m.emoji}</span>
              <p className="mt-2 font-display text-lg text-wine">{m.title}</p>
              <p className="text-xs text-muted-foreground">{m.date}</p>
            </motion.button>
          ))}
        </div>
        <Line delay={0.8} className="mt-10">
          <StoryButton tone="gold" onClick={onNext}>
            One last thing... 🌙
          </StoryButton>
        </Line>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/70 p-5 backdrop-blur-sm"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              initial={{ scale: 0.9, rotate: -3 }}
              animate={{ scale: 1, rotate: -1 }}
              onClick={(e) => e.stopPropagation()}
              className="paper w-full max-w-sm rounded-2xl p-6"
            >
              <span className="text-4xl">{open.emoji}</span>
              <h3 className="mt-2 text-2xl text-wine">{open.title}</h3>
              <p className="text-xs text-muted-foreground">{open.date}</p>
              <p className="mt-3 hand text-xl text-cocoa">{open.body}</p>
              <div className="mt-4 text-right">
                <StoryButton tone="quiet" onClick={() => setOpen(null)}>
                  Close
                </StoryButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Scene>
  );
}
