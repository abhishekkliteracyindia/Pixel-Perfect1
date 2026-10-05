import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Grain, Particles } from "@/components/Atmosphere";
import { Her, Him } from "@/components/Characters";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import { sfx } from "@/lib/sound";

const STOPS = ["🌙 a quiet street...", "🎪 the cinema entrance", "🎟️ ticket booth", "🍿 popcorn stand", "🚪 theatre doors"];

export function Reveal({ onNext }: { onNext: () => void }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    sfx.cinema();
    if (step >= STOPS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), reduced ? 500 : 1500);
    return () => clearTimeout(t);
  }, [step, reduced]);

  const arrived = step >= STOPS.length;

  return (
    <Scene dark>
      <Particles count={20} tone="cool" />
      <Grain />
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <Line as="h1" className="font-display text-5xl text-gold sm:text-6xl">
          {story.dateAsk.reveal}
        </Line>

        {/* marquee sign */}
        <div className="mt-8 rounded-2xl border-4 border-gold/70 bg-wine px-6 py-3 shadow-[0_0_40px_-8px_var(--gold)]">
          <p className="hand text-2xl text-ivory">Cinema of Us ✨</p>
        </div>

        {/* walking couple */}
        <motion.div
          className="mt-8 flex items-end"
          animate={reduced ? {} : { x: arrived ? 0 : [-20, 20, -20] }}
          transition={{ duration: 2, repeat: arrived ? 0 : Infinity }}
        >
          <Him size={70} mood={arrived ? "blush" : "happy"} />
          <Her size={76} mood={arrived ? "excited" : "happy"} />
        </motion.div>

        <div className="mt-6 h-8">
          {!arrived && (
            <motion.p key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ivory/80">
              {STOPS[step]}
            </motion.p>
          )}
        </div>

        {arrived && (
          <>
            <Line className="font-display text-2xl text-ivory">{story.dateAsk.welcome}</Line>
            <Line delay={0.6} className="mt-8">
              <StoryButton tone="gold" onClick={onNext}>
                Take our seats 🎟️
              </StoryButton>
            </Line>
          </>
        )}
      </div>
    </Scene>
  );
}
