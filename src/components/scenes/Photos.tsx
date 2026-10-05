import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Grain, Particles } from "@/components/Atmosphere";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story, type Photo } from "@/config/story";
import { sfx } from "@/lib/sound";
import peaceAudioSrc from "@/assets/peace.mp4";

export function Photos({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState<Photo | null>(null);
  const [audioFinished, setAudioFinished] = useState(false);
  const audioPlayed = useRef(false);

  useEffect(() => {
    if (audioPlayed.current) return;
    audioPlayed.current = true;

    const audio = new Audio(peaceAudioSrc);
    audio.onended = () => setAudioFinished(true);
    audio.play().catch(() => setAudioFinished(true));
  }, []);

  return (
    <Scene>
      <Particles count={14} />
      <Grain />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <Line as="h2" className="text-center font-display text-3xl text-wine sm:text-4xl">
          Our little photo wall
        </Line>
        <Line delay={0.5} className="mt-2 hand text-xl text-cocoa/80">
          tap one 👀
        </Line>

        <div className="mt-10 flex w-full flex-wrap items-start justify-center gap-6">
          {story.photos.map((p, i) => (
            <motion.button
              key={p.caption + i}
              onClick={() => {
                sfx.soft();
                setOpen(p);
              }}
              initial={{ opacity: 0, y: 24, rotate: p.rotate }}
              animate={{ opacity: 1, y: [0, -6, 0], rotate: p.rotate }}
              transition={{
                opacity: { duration: 0.7, delay: i * 0.15 },
                y: { duration: 7 + i, repeat: Infinity, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              className={`tape paper relative rounded-md p-3 pb-5 focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none ${
                p.large ? "w-[80%] max-w-sm sm:w-80" : "w-[46%] max-w-56 sm:w-56"
              }`}
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                width={816}
                height={816}
                className="aspect-square w-full rounded-sm object-cover"
              />
              <p className="hand mt-2 text-center text-lg text-cocoa">{p.caption}</p>
              <p className="text-center text-[11px] text-muted-foreground">{p.date}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 min-h-[4rem]">
          <AnimatePresence>
            {audioFinished && (
              <Line className="flex justify-center">
                <StoryButton tone="gold" onClick={onNext}>
                  Okay, next ❤️
                </StoryButton>
              </Line>
            )}
          </AnimatePresence>
        </div>
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
            aria-label={open.caption}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="paper w-full max-w-md rounded-2xl p-4"
            >
              <img
                src={open.src}
                alt={open.caption}
                loading="lazy"
                className="max-h-[55svh] w-full rounded-lg object-cover"
              />
              <p className="hand mt-3 text-2xl text-cocoa">{open.caption}</p>
              <p className="text-xs text-muted-foreground">{open.date}</p>
              <p className="mt-2 text-sm text-cocoa/80">{open.note}</p>
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
