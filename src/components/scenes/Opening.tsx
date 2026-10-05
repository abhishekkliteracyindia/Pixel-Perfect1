import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { Grain, Particles } from "@/components/Atmosphere";
import { Him } from "@/components/Characters";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import { sfx } from "@/lib/sound";
import startingAudioSrc from "@/assets/starting.mpeg";

export function Opening({ onYes }: { onYes: () => void }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [refused, setRefused] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const audioPlayed = useRef(false);
  const t = story.opening;

  useEffect(() => {
    if (!hasEntered) return;
    if (audioPlayed.current) return;
    audioPlayed.current = true;

    const audio = new Audio(startingAudioSrc);

    Promise.all([
      new Promise((resolve) => setTimeout(resolve, 5000)),
      new Promise((resolve) => {
        audio.onended = resolve;
        audio.play().catch(() => {
          // If browser blocks autoplay, treat audio as finished so it relies only on the 5s timer
          resolve(undefined);
        });
      }),
    ]).then(() => {
      setCanContinue(true);
    });

    return () => {
      // Intentionally not pausing audio here so strict mode double-mounts don't kill it.
    };
  }, [hasEntered]);

  if (!hasEntered) {
    return (
      <Scene className="bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--peach)_45%,transparent),transparent_65%)]">
        <Particles count={26} />
        <Grain />
        <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
          <StoryButton tone="gold" heartbeat onClick={() => setHasEntered(true)}>
            Tap to enter ✨
          </StoryButton>
        </div>
      </Scene>
    );
  }

  return (
    <Scene className="bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--peach)_45%,transparent),transparent_65%)]">
      <Particles count={26} />
      <Grain />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {!refused ? (
            <div key="ask" className="flex flex-col items-center">
              <Line as="h1" className="font-display text-4xl text-wine sm:text-5xl">
                {t.question}
              </Line>
              {"subQuestion" in t && t.subQuestion && (
                <Line delay={0.8} className="mt-3 text-lg text-cocoa">
                  {t.subQuestion}
                </Line>
              )}
              <div className="mt-10 min-h-[4rem] w-full">
                {canContinue && (
                  <Line className="flex flex-wrap justify-center gap-4">
                    <StoryButton tone="yes" heartbeat onClick={onYes}>
                      {t.yes}
                    </StoryButton>
                    <StoryButton
                      tone="no"
                      onClick={() => {
                        sfx.soft();
                        setRefused(true);
                      }}
                    >
                      {t.no}
                    </StoryButton>
                  </Line>
                )}
              </div>
            </div>
          ) : (
            <div key="refused" className="flex flex-col items-center">
              <Him size={100} mood="shocked" />
              <Line className="mt-2 font-display text-4xl text-wine">EXCUSE ME??? 😭</Line>
              {t.noReply.slice(1).map((l, i) => (
                <Line key={l} delay={0.3 + i * 0.5} className="mt-3 font-display text-3xl text-wine">
                  {l}
                </Line>
              ))}
              {t.noRetry.map((l, i) => (
                <Line key={l} delay={1.5 + i * 0.4} className="mt-2 text-muted-foreground">
                  {l}
                </Line>
              ))}
              <Line delay={2.4} className="mt-8">
                <StoryButton tone="yes" heartbeat onClick={() => setRefused(false)}>
                  {t.noButton}
                </StoryButton>
              </Line>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
