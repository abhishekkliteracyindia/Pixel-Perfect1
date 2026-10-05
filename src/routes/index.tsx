import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { PlayfulAnimals } from "@/components/Animals";
import { Overlay } from "@/components/Overlay";
import { BirthdayMessage } from "@/components/scenes/BirthdayMessage";
import { Candles } from "@/components/scenes/Candles";
import { Curtain } from "@/components/scenes/Curtain";
import { Final } from "@/components/scenes/Final";
import { Opening } from "@/components/scenes/Opening";
import { Photos } from "@/components/scenes/Photos";
import { DateQuestion, ValentineQuestion } from "@/components/scenes/Questions";
import { Reveal } from "@/components/scenes/Reveal";
import { Shayari } from "@/components/scenes/Shayari";
import { Universe } from "@/components/scenes/Universe";
import { story } from "@/config/story";
import { useStoryProgress } from "@/lib/use-story-progress";

const TITLE = `A little universe for ${story.birthdayName} ❤️`;
const DESC = "A tiny cartoon birthday story, made by one person for one person.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { scene, hydrated, next, restart } = useStoryProgress();

  if (!hydrated) return <main className="min-h-[100svh] bg-background" />;

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden">
      <Overlay onRestart={restart} showRestart={scene !== "opening"} />
      <PlayfulAnimals scene={scene} />
      <AnimatePresence mode="wait">
        <div key={scene}>
          {scene === "opening" && <Opening onYes={next} />}
          {scene === "curtain" && <Curtain onNext={next} />}
          {scene === "cake" && <Candles onNext={next} />}
          {scene === "message" && <BirthdayMessage onNext={next} />}
          {scene === "photos" && <Photos onNext={next} />}
          {scene === "valentine" && <ValentineQuestion onNext={next} />}
          {scene === "date" && <DateQuestion onNext={next} />}
          {scene === "reveal" && <Reveal onNext={next} />}
          {scene === "shayari" && <Shayari onNext={next} />}
          {scene === "universe" && <Universe onNext={next} />}
          {scene === "final" && <Final onReplay={restart} />}
        </div>
      </AnimatePresence>
    </main>
  );
}
