import { motion } from "motion/react";
import { FloatingHearts, Grain, Particles } from "@/components/Atmosphere";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";

export function BirthdayMessage({ onNext }: { onNext: () => void }) {
  const t = story.birthdayMessage;
  const frames = story.photos.slice(0, 3);

  return (
    <Scene className="bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--blush)_55%,transparent),transparent_70%)]">
      <Particles count={16} />
      <FloatingHearts count={6} />
      <Grain />

      {/* soft photo frames pushed to the edges so they never cover the words */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {frames.map((p, i) => (
          <motion.img
            key={p.src}
            src={p.src}
            alt=""
            loading="lazy"
            width={816}
            height={816}
            className="absolute h-40 w-40 rounded-xl object-cover opacity-45 shadow-xl"
            style={{
              left: i === 1 ? "auto" : `${6 + i * 4}%`,
              right: i === 1 ? "7%" : "auto",
              top: `${18 + i * 26}%`,
              rotate: `${i % 2 ? 5 : -6}deg`,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <Line as="h1" className="font-display text-4xl tracking-wide text-wine sm:text-6xl">
          {t.heading}
        </Line>
        {t.lines.map((l, i) => (
          <Line key={l} delay={0.9 + i * 0.7} className="mt-3 text-lg text-cocoa">
            {l}
          </Line>
        ))}
        <Line delay={2.6} className="mt-6 font-display text-3xl text-rose">
          {t.love}
        </Line>
        <Line delay={3.4} className="mt-6 hand text-2xl text-cocoa/80">
          {t.handwritten}
        </Line>
        <Line delay={4.1} className="mt-10">
          <StoryButton tone="gold" onClick={onNext}>
            Show me more 🥺
          </StoryButton>
        </Line>
      </div>
    </Scene>
  );
}
