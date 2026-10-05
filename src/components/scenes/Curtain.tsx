import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Grain, Particles } from "@/components/Atmosphere";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import { sfx } from "@/lib/sound";

import khuljaAudioSrc from "@/assets/khulja.mp4";

/** Walking forward → curtains part → the birthday room is revealed. */
export function Curtain({ onNext }: { onNext: () => void }) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<"walk" | "open" | "room">("walk");

  useEffect(() => {
    const audio = new Audio(khuljaAudioSrc);
    let stageTimer: NodeJS.Timeout;

    const initTimer = setTimeout(() => {
      // Synchronize curtain opening EXACTLY with the audio starting to play
      audio.onplay = () => {
        setStage("open");
        sfx.curtain();
        // Room appears exactly 2 seconds later (matching audio/animation duration)
        stageTimer = setTimeout(() => setStage("room"), 2000);
      };

      audio.play().catch(() => {
        // Fallback if browser blocks it for some reason
        setStage("open");
        sfx.curtain();
        stageTimer = setTimeout(() => setStage("room"), 2000);
      });
    }, reduced ? 600 : 2600);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(stageTimer);
      audio.pause();
    };
  }, [reduced]);

  return (
    <Scene dark className="bg-[#1b1010]">
      <Particles count={18} />
      <Grain />

      {/* the room behind the curtains */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ scale: 1.25, opacity: 0.25 }}
        animate={{ scale: stage === "walk" ? 1.25 : 1, opacity: stage === "walk" ? 0.3 : 1 }}
        transition={{ duration: 3.2, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,color-mix(in_oklab,var(--gold)_38%,transparent),transparent_60%)]" />
        <div aria-hidden className="absolute top-10 flex w-full justify-center gap-4 text-xl opacity-80">
          {Array.from({ length: 9 }, (_, i) => (
            <motion.span
              key={i}
              animate={reduced ? {} : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.22 }}
            >
              ✨
            </motion.span>
          ))}
        </div>
        <div
          className={`relative z-10 flex flex-col items-center transition-transform duration-700 ${
            stage === "room" ? "-translate-y-32 sm:-translate-y-36" : ""
          }`}
        >
          <span className="text-6xl sm:text-7xl">🎂</span>
          <div className="mt-4 flex gap-3 text-3xl">
            <span>🌸</span>
            <span>🖼️</span>
            <span>🕯️</span>
            <span>🌷</span>
          </div>
        </div>
      </motion.div>

      {/* curtains */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden
          className="absolute top-0 bottom-0 w-1/2 bg-[linear-gradient(90deg,#4a1220,#7a1f33,#4a1220)] shadow-[0_0_80px_rgba(0,0,0,0.6)]"
          style={side === "left" ? { left: 0 } : { right: 0 }}
          initial={{ x: 0 }}
          animate={{
            x: stage === "walk" ? 0 : side === "left" ? "-102%" : "102%",
          }}
          transition={{ duration: reduced ? 0.5 : 2.0, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}

      <div
        className={`relative z-20 flex flex-col items-center text-center ${
          stage === "room" ? "translate-y-20 sm:translate-y-24" : ""
        }`}
      >
        {stage === "walk" && (
          <Line delay={0.8} className="hand text-2xl text-ivory/90">
            come closer...
          </Line>
        )}
        {stage === "room" && (
          <>
            <Line as="h1" className="font-display text-4xl text-ivory sm:text-5xl">
              For {story.birthdayName} ❤️
            </Line>
            <Line delay={0.7} className="mt-3 text-ivory/70">
              I built you a little universe.
            </Line>
            <Line delay={1.3} className="mt-8">
              <StoryButton tone="gold" onClick={onNext}>
                Come in 🕯️
              </StoryButton>
            </Line>
          </>
        )}
      </div>
    </Scene>
  );
}
