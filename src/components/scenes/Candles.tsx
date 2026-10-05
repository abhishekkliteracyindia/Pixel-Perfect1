import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Confetti, Fireworks, Grain, Particles } from "@/components/Atmosphere";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import { sfx } from "@/lib/sound";

import happyAudioSrc from "@/assets/happy.mp4";

export function Candles({ onNext }: { onNext: () => void }) {
  const total = story.birthdayAge;
  const [out, setOut] = useState<boolean[]>(() => Array(total).fill(false));
  const reduced = useReducedMotion();
  const blown = out.filter(Boolean).length;
  const done = blown === total;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioFinished, setAudioFinished] = useState(false);

  useEffect(() => {
    let isActive = true;
    if (done) {
      const audio = new Audio(happyAudioSrc);
      audioRef.current = audio;

      audio.onended = () => {
        if (isActive) setAudioFinished(true);
      };
      audio.play().catch(() => {
        if (isActive) setAudioFinished(true);
      });

      return () => {
        isActive = false;
        audio.pause();
      };
    }
  }, [done]);

  const blow = (i: number) => {
    if (out[i]) return;
    sfx.candle();
    setOut((prev) => {
      const next = [...prev];
      next[i] = true;
      if (next.every(Boolean)) setTimeout(() => sfx.celebrate(), 250);
      return next;
    });
  };

  const revealed = story.candles.secretWordsEnabled
    ? story.candles.secretWords.filter((_, i) => out[i])
    : [];

  return (
    <Scene className="bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--gold)_35%,transparent),transparent_60%)]">
      <Particles count={20} />
      <Grain />
      {done && (
        <>
          <Confetti />
          <Fireworks bursts={7} />
        </>
      )}

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <Line as="h1" className="font-display text-3xl text-wine sm:text-4xl">
          {story.candles.intro}
        </Line>
        {story.candles.mission.map((l, i) => (
          <Line key={l} delay={0.6 + i * 0.4} className="text-muted-foreground">
            {l}
          </Line>
        ))}
        <Line delay={1.4} className="mt-2 hand text-2xl text-rose">
          {story.candles.instruction}
        </Line>

        {/* cake */}
        <div className="relative mt-12 w-full">
          {/* warm glow from the flames */}
          <motion.div
            aria-hidden
            animate={reduced ? {} : { opacity: done ? 0 : [0.55, 0.8, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="pointer-events-none absolute -top-16 left-1/2 h-64 w-[26rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_55%,transparent),transparent_70%)] blur-2xl"
          />

          <div className="relative mx-auto w-full max-w-md">
            {/* candles */}
            <div className="relative z-20 mx-auto flex max-w-[19rem] flex-wrap items-end justify-center gap-x-2 gap-y-3 px-4">
              {out.map((isOut, i) => (
                <button
                  key={i}
                  onClick={() => blow(i)}
                  aria-label={`Candle ${i + 1}${isOut ? " (out)" : ""}`}
                  aria-pressed={isOut}
                  className="group flex h-16 w-5 flex-col items-center justify-end rounded-md focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none"
                >
                  <span className="relative flex h-8 w-4 items-end justify-center">
                    <AnimatePresence mode="wait">
                      {!isOut ? (
                        <motion.span
                          key="flame"
                          className="relative block"
                          exit={{ opacity: 0, scaleY: 0.2, y: -6 }}
                          animate={
                            reduced
                              ? {}
                              : { scaleY: [1, 1.3, 0.92, 1], scaleX: [1, 0.9, 1.05, 1], y: [0, -1, 0] }
                          }
                          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.09 }}
                          style={{ originY: 1 }}
                        >
                          {/* outer flame */}
                          <span className="block h-5 w-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(ellipse_at_50%_75%,color-mix(in_oklab,var(--gold)_92%,transparent),color-mix(in_oklab,var(--rose)_75%,transparent))] shadow-[0_0_18px_6px_color-mix(in_oklab,var(--gold)_55%,transparent)]" />
                          {/* inner core */}
                          <span className="absolute bottom-[3px] left-1/2 h-2 w-1.5 -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--ivory)_88%,var(--gold))] blur-[0.5px]" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="smoke"
                          initial={{ opacity: 0.7, y: 0, scale: 0.6 }}
                          animate={{ opacity: 0, y: -26, scale: 1.5, x: [0, 3, -2, 0] }}
                          transition={{ duration: 1.6 }}
                          className="block h-3 w-3 rounded-full bg-muted-foreground/40 blur-[3px]"
                        />
                      )}
                    </AnimatePresence>
                  </span>
                  {/* wick */}
                  <span className="h-1.5 w-[2px] rounded-full bg-wine/70" />
                  {/* striped candle body */}
                  <span
                    className={`h-9 w-[9px] rounded-t-[3px] rounded-b-sm shadow-[inset_-2px_0_0_color-mix(in_oklab,var(--wine)_12%,transparent)] transition-opacity ${
                      isOut ? "opacity-70" : "opacity-100"
                    }`}
                    style={{
                      backgroundImage:
                        i % 2 === 0
                          ? "repeating-linear-gradient(135deg,var(--ivory) 0 4px,var(--rose) 4px 8px)"
                          : "repeating-linear-gradient(135deg,var(--ivory) 0 4px,var(--gold) 4px 8px)",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* top tier */}
            <div className="relative z-10 -mt-1 mx-auto w-[78%]">
              <div className="relative h-24 rounded-t-[1.75rem] rounded-b-md bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ivory)_92%,var(--blush)),var(--blush))] shadow-[0_18px_30px_-22px_var(--wine),inset_0_-10px_18px_-14px_var(--wine)]">
                {/* drip icing */}
                <div aria-hidden className="absolute -top-1 left-0 right-0 h-8">
                  <div className="absolute inset-x-0 top-0 h-5 rounded-t-[1.75rem] bg-[color-mix(in_oklab,var(--ivory)_95%,var(--blush))]" />
                  <div className="absolute inset-x-3 top-3 flex justify-between">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-3 rounded-b-full bg-[color-mix(in_oklab,var(--ivory)_95%,var(--blush))]"
                        style={{ height: `${8 + ((i * 5) % 12)}px` }}
                      />
                    ))}
                  </div>
                </div>

                {/* sprinkles */}
                <div aria-hidden className="absolute inset-x-4 top-9 flex flex-wrap gap-2 opacity-80">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-[3px] w-2.5 rounded-full"
                      style={{
                        background: ["var(--rose)", "var(--gold)", "var(--wine)"][i % 3],
                        transform: `rotate(${(i * 47) % 180}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* bottom tier */}
            <div className="relative mx-auto -mt-2 w-full">
              <div className="relative h-32 rounded-t-[2rem] rounded-b-[1.25rem] bg-[linear-gradient(180deg,var(--rose),var(--wine))] shadow-[0_30px_50px_-28px_var(--wine),inset_0_-14px_24px_-16px_color-mix(in_oklab,var(--wine)_75%,transparent)]">
                {/* icing collar */}
                <div
                  aria-hidden
                  className="absolute -top-2 left-2 right-2 flex justify-between"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-5 w-5 rounded-full bg-[color-mix(in_oklab,var(--ivory)_92%,var(--blush))] shadow-[0_3px_6px_-3px_var(--wine)]"
                    />
                  ))}
                </div>
                <p className="pt-9 text-center font-display text-3xl text-ivory drop-shadow-[0_2px_6px_color-mix(in_oklab,var(--wine)_70%,transparent)]">
                  {story.birthdayName}
                </p>
                {/* berries */}
                <div aria-hidden className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-3 w-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--ivory)_60%,var(--rose)),var(--wine))]"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* cake stand */}
            <div aria-hidden className="mx-auto -mt-1 w-[112%] max-w-none">
              <div className="mx-auto h-3 w-full rounded-full bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ivory)_90%,var(--blush)),color-mix(in_oklab,var(--blush)_80%,var(--wine)))] shadow-[0_10px_18px_-12px_var(--wine)]" />
              <div className="mx-auto h-8 w-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--blush)_70%,var(--wine)),var(--ivory),color-mix(in_oklab,var(--blush)_70%,var(--wine)))]" />
              <div className="mx-auto h-2.5 w-36 rounded-full bg-[linear-gradient(180deg,var(--ivory),color-mix(in_oklab,var(--blush)_75%,var(--wine)))] shadow-[0_18px_28px_-18px_var(--wine)]" />
            </div>
          </div>

          {!done && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => out.forEach((o, i) => !o && setTimeout(() => blow(i), i * 90))}
                className="rounded-full border border-rose/40 px-5 py-2 text-sm font-medium text-wine transition-colors hover:bg-rose/10 focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none"
              >
                Blow them all with one big breath 💨
              </button>
            </div>
          )}
        </div>


        <p aria-live="polite" className="mt-6 text-lg font-medium text-wine">
          {blown} / {total}
        </p>

        {revealed.length > 0 && (
          <p className="mt-2 hand text-xl text-rose">{revealed.join(" ")}</p>
        )}

        <AnimatePresence>
          {done && audioFinished && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col items-center"
            >
              <p className="font-display text-2xl text-wine">Make a wish... 🌙</p>
              <div className="mt-5">
                <StoryButton tone="yes" heartbeat onClick={onNext}>
                  I made one ❤️
                </StoryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
