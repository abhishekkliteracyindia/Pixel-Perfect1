import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Grain, Particles } from "@/components/Atmosphere";
import { Him } from "@/components/Characters";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import tagdiImage from "@/assets/tagdi.jpeg";
import shayariAudioSrc from "@/assets/shayari.mp4";

/** Typewriter reveal, one line at a time. */
function useTypewriter(lines: string[], speed = 45) {
  const reduced = useReducedMotion();
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduced) {
      setLine(lines.length);
      return;
    }
    if (line >= lines.length) return;
    if (chars < (lines[line] ?? "").length) {
      const t = setTimeout(() => setChars((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, 700);
    return () => clearTimeout(t);
  }, [line, chars, lines, speed, reduced]);

  return { line, chars, done: line >= lines.length };
}

export function Shayari({ onNext }: { onNext: () => void }) {
  const s = story.shayari;
  const { line, chars, done } = useTypewriter(s.lines);
  const firstLineLength = s.lines[0]?.length || 0;

  const audioPlayed = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioPlayed.current) return;

    // Trigger audio ~5 characters before the first line finishes typing
    const triggerThreshold = Math.max(1, firstLineLength - 5);
    const isAboutToFinish = line === 0 && chars >= triggerThreshold;
    const skippedTyping = line > 0; // Fallback for reduced motion

    if (isAboutToFinish || skippedTyping) {
      audioPlayed.current = true;
      const audio = new Audio(shayariAudioSrc);
      audioRef.current = audio;
      audio.play().catch(() => {});
    }
  }, [line, chars, firstLineLength]);

  return (
    <Scene className="bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--gold)_40%,transparent),transparent_55%)]">
      <Particles count={10} />
      <Grain />
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
        {/* Glowing Image */}
        <Line as="div" delay={0.2} className="relative mb-8 mt-4 flex justify-center">
          <div className="absolute inset-[-10px] animate-pulse rounded-full bg-gold/70 blur-2xl" />
          <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-300 blur-3xl opacity-60" />
          <img
            src={tagdiImage}
            alt="My Love"
            className="relative z-10 h-56 w-56 rounded-3xl border-4 border-gold/40 object-cover shadow-[0_0_60px_rgba(255,215,0,0.4)]"
          />
        </Line>

        <div className="flex items-end gap-2">
          <Him size={64} mood="blush" />
          <span className="mb-4 text-2xl">🪔✍️</span>
        </div>
        <div className="paper relative mt-4 w-full rotate-[-1deg] rounded-lg px-6 py-8 sm:px-10">
          <span aria-hidden className="absolute top-3 right-4 text-lg">🌸</span>
          <Line as="h2" className="font-display text-2xl text-wine">
            {s.title}
          </Line>
          <div className="mt-5 min-h-40 space-y-2 hand text-2xl text-cocoa" aria-live="polite">
            {s.lines.map((l, i) =>
              i < line ? (
                <p key={i}>{l}</p>
              ) : i === line ? (
                <p key={i}>
                  {l.slice(0, chars)}
                  <span className="animate-pulse">|</span>
                </p>
              ) : null,
            )}
          </div>
          {done && <p className="mt-6 text-right hand text-xl text-rose">{s.signature}</p>}
        </div>
        {done && (
          <Line delay={0.4} className="mt-8">
            <StoryButton tone="gold" onClick={onNext}>
              Continue ✨
            </StoryButton>
          </Line>
        )}
      </div>
    </Scene>
  );
}
