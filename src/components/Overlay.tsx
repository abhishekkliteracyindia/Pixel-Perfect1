import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { story } from "@/config/story";
import { initSound, isMuted, setMuted, sfx } from "@/lib/sound";

/** Sound toggle, restart, and small hidden surprises. */
export function Overlay({ onRestart, showRestart }: { onRestart: () => void; showRestart: boolean }) {
  const [muted, setMute] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    initSound();
    setMute(isMuted());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const egg = (msg: string) => {
    sfx.soft();
    setToast(msg);
  };

  return (
    <>
      <div className="fixed top-3 left-3 z-40 flex gap-2">
        <button
          onClick={() => {
            setMuted(!muted);
            setMute(!muted);
          }}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="h-11 w-11 rounded-full bg-ivory/80 text-lg shadow-md backdrop-blur"
        >
          {muted ? "🔇" : "🔊"}
        </button>
        {showRestart && (
          <button
            onClick={onRestart}
            className="h-11 rounded-full bg-ivory/80 px-4 text-xs font-medium text-wine shadow-md backdrop-blur"
          >
            Restart Story
          </button>
        )}
      </div>

      {/* hidden: tiny heart bottom-left */}
      <button
        onClick={() => egg(story.easterEggs.heart)}
        aria-label="A tiny heart"
        className="fixed bottom-3 left-3 z-40 h-8 w-8 text-xs opacity-30 transition hover:opacity-90"
      >
        ♡
      </button>
      {/* hidden: don't click this */}
      <button
        onClick={() => egg(story.easterEggs.forbidden)}
        className="fixed right-3 bottom-3 z-40 rounded-full px-3 py-2 text-[11px] text-muted-foreground/70 underline decoration-dotted"
      >
        Don't click this.
      </button>
      {/* hidden: top right corner star */}
      <button
        onClick={() => egg(story.easterEggs.star)}
        aria-label="A small star"
        className="fixed top-3 right-3 z-40 h-8 w-8 text-xs opacity-25 transition hover:opacity-90"
      >
        ✦
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            role="status"
            className="paper fixed bottom-16 left-1/2 z-50 max-w-[85vw] -translate-x-1/2 rounded-2xl px-5 py-3 text-center hand text-xl text-wine"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
