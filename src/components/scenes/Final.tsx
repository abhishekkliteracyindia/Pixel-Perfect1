import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Particles } from "@/components/Atmosphere";
import { Her, Him } from "@/components/Characters";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import endingAudioSrc from "@/assets/ending.mp4";

export function Final({ onReplay }: { onReplay: () => void }) {
  const [moon, setMoon] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);
  const audioPlayed = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lines = story.final;

  useEffect(() => {
    let isActive = true;
    let t: NodeJS.Timeout;

    const audio = new Audio(endingAudioSrc);
    audioRef.current = audio;

    audio.onended = () => {
      if (isActive) setAudioFinished(true);
    };

    const delaySeconds = 0.5 + lines.length * 1.6;

    // We do NOT use the volume=0 trick here because the user gesture might expire
    // during the delay. Instead we rely on the gesture from the previous slide's "Next" button.
    t = setTimeout(() => {
      if (!isActive) return;
      audio.play().catch(() => {
        // If it still blocks, just show the button
        if (isActive) setAudioFinished(true);
      });
    }, delaySeconds * 1000);

    return () => {
      isActive = false;
      clearTimeout(t);
      // intentionally not pausing the audio so strict mode double-mounts don't kill it
    };
  }, [lines.length]);
  return (
    <Scene dark>
      <Particles count={30} tone="cool" />
      <button
        onClick={() => setMoon((m) => !m)}
        aria-label="The moon"
        className="absolute top-8 right-8 text-4xl opacity-80 transition hover:opacity-100"
      >
        🌙
      </button>
      <AnimatePresence>
        {moon && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-20 right-6 max-w-56 rounded-xl bg-ivory/10 p-3 text-right hand text-lg text-ivory"
          >
            {story.easterEggs.moon}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        {lines.map((l, i) => (
          <Line
            key={l}
            delay={0.5 + i * 1.6}
            className={
              i === 2 || i === 4
                ? "mt-5 font-display text-3xl text-gold"
                : "mt-4 text-lg text-ivory/85"
            }
          >
            {l}
          </Line>
        ))}
        <Line delay={0.5 + lines.length * 1.6} className="mt-8 flex items-end">
          <Him size={60} mood="blush" />
          <Her size={64} mood="blush" />
        </Line>
        <div className="mt-8 min-h-[4rem]">
          <AnimatePresence>
            {audioFinished && (
              <Line className="flex justify-center">
                <StoryButton tone="gold" onClick={onReplay}>
                  Replay our story ↻
                </StoryButton>
              </Line>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Scene>
  );
}
