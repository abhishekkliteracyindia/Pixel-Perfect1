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
      const saved = localStorage.getItem(KEY) as SceneId | null;
      
      // If they were stuck on cinema, jump them to shayari
      if (saved === ("cinema" as any)) {
        setScene("shayari");
      } else if (saved && SCENES.includes(saved)) {
        setScene(saved);
      }
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
