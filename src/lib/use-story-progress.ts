import { useCallback, useEffect, useState } from "react";

export const SCENES = [
  "opening",
  "curtain",
  "cake",
  "message",
  "photos",
  "valentine",
  "date",
  "reveal",
  "cinema",
  "shayari",
  "final",
] as const;

export type SceneId = (typeof SCENES)[number];

const KEY = "our-little-universe:scene";

export function useStoryProgress() {
  const [scene, setScene] = useState<SceneId>("opening");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      // Opening an invite link (?room=) jumps straight into the movie room.
      if (new URLSearchParams(window.location.search).get("room")) {
        setScene("cinema");
        setHydrated(true);
        return;
      }
      const saved = localStorage.getItem(KEY) as SceneId | null;
      if (saved && SCENES.includes(saved)) setScene(saved);
    } catch {
      /* storage unavailable — start from the beginning */
    }
    setHydrated(true);
  }, []);

  const go = useCallback((next: SceneId) => {
    setScene(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, []);

  const next = useCallback(() => {
    setScene((current) => {
      const i = SCENES.indexOf(current);
      const value: SceneId = SCENES[Math.min(i + 1, SCENES.length - 1)] ?? current;
      try {
        localStorage.setItem(KEY, value);
      } catch {
        /* ignore */
      }
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
      return value;
    });
  }, []);

  const restart = useCallback(() => go("opening"), [go]);

  return { scene, hydrated, go, next, restart };
}
