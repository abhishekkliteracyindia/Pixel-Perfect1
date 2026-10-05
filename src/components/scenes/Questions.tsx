import { useState, useEffect, useRef } from "react";
import playfulPortrait from "@/assets/Playful School Portrait Duo.png";
import yesAudioSrc from "@/assets/yes.mp4";
import dateAudioSrc from "@/assets/date.mp4";
import { AnimatePresence, motion } from "motion/react";
import { Animals, type AnimalMood } from "@/components/Animals";
import { Confetti, Fireworks, FloatingHearts, Grain, Particles } from "@/components/Atmosphere";
import { Her, Him } from "@/components/Characters";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import { sfx } from "@/lib/sound";

type Props = {
  lead: string[];
  question: string;
  small?: string;
  yesLines: string[];
  onDone: () => void;
  doneLabel: string;
  noPopupPhoto?: string;
  withPhotoMoment?: boolean;
  yesAudioSrc?: string;
  askAudioSrc?: string;
};

function Question({ lead, question, small, yesLines, onDone, doneLabel, noPopupPhoto, withPhotoMoment, yesAudioSrc, askAudioSrc }: Props) {
  const [mood, setMood] = useState<AnimalMood>("hopeful");
  const [state, setState] = useState<"ask" | "no" | "yes" | "photo-moment">("ask");

  const [audioFinished, setAudioFinished] = useState(!yesAudioSrc);
  const audioPlayed = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [askAudioFinished, setAskAudioFinished] = useState(!askAudioSrc);
  const askAudioPlayed = useRef(false);
  const askAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isActive = true;
    if (state === "yes" && yesAudioSrc) {
      const audio = new Audio(yesAudioSrc);
      
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
  }, [state, yesAudioSrc]);

  useEffect(() => {
    let isActive = true;
    if (state === "ask" && askAudioSrc) {
      const audio = new Audio(askAudioSrc);
      
      audio.onended = () => {
        if (isActive) setAskAudioFinished(true);
      };
      audio.play().catch(() => {
        if (isActive) setAskAudioFinished(true);
      });

      return () => {
        isActive = false;
        audio.pause();
      };
    }
  }, [state, askAudioSrc]);

  const sayYes = () => {
    sfx.celebrate();
    setTimeout(() => sfx.firework(), 600);
    if (withPhotoMoment) {
      setState("photo-moment");
    } else {
      setState("yes");
      setMood("celebrate");
    }
  };

  return (
    <Scene className="bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--blush)_50%,transparent),transparent_70%)]">
      <Particles count={14} />
      <Grain />
      {state === "yes" && (
        <>
          <Confetti />
          <Fireworks bursts={4} />
          <FloatingHearts count={8} />
        </>
      )}

      <AnimatePresence>
        {state === "no" && noPopupPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 px-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="paper flex w-full max-w-md flex-col items-center rounded-3xl border-2 border-wine/20 p-6 text-center shadow-2xl"
            >
              <img
                src={noPopupPhoto}
                alt="Hawww"
                className="h-64 w-64 rounded-2xl object-cover shadow-lg"
              />
              <p className="mt-5 font-display text-2xl leading-relaxed text-wine whitespace-pre-line">
                {"Hawww tum mujhe pyaar nhi kartiii 😭\n"}
                {"itne bure din agayeee kyaaaa\n"}
                {"bed se kud jaunga meinnn\n"}
                {"wapas se try maro 😭❤️"}
              </p>
              <StoryButton
                tone="yes"
                className="mt-6 w-full"
                onClick={() => {
                  setState("ask");
                  setMood("hopeful");
                }}
              >
                Okay okay 😭❤️
              </StoryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <div className="flex items-end gap-2">
          <Him
            size={78}
            mood={state === "yes" || state === "photo-moment" ? "excited" : state === "no" ? "shocked" : mood === "nervous" ? "nervous" : "blush"}
          />
          <Her size={84} mood={state === "yes" || state === "photo-moment" ? "excited" : "happy"} />
        </div>

        <AnimatePresence mode="wait">
          {state === "photo-moment" ? (
            <motion.div key="photo-moment" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
              <div className="mt-6 rounded-3xl border-4 border-wine/20 bg-ivory p-3 shadow-2xl rotate-2">
                 <img src={playfulPortrait} alt="Us" className="h-64 w-64 rounded-2xl object-cover" />
              </div>
              <Line delay={0.4} className="mt-8 max-w-sm text-center font-display text-3xl text-wine sm:text-4xl">
                Kya tagda pose maar rahi hooo my loveee 😭❤️📸
              </Line>
              <Line delay={1.2} className="mt-8">
                <StoryButton tone="gold" heartbeat onClick={() => {
                  setState("yes");
                  setMood("celebrate");
                }}>
                  Okay okay youuu slayyy zindaaa gorlll dil hi faad diyaaa😭❤️
                </StoryButton>
              </Line>
            </motion.div>
          ) : state !== "yes" ? (
            <motion.div key="ask" exit={{ opacity: 0 }} className="flex flex-col items-center">
              {lead.map((l, i) => (
                <Line key={l} delay={i * 0.9} className="mt-4 hand text-2xl text-cocoa">
                  {l}
                </Line>
              ))}
              {/* envelope card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -1 }}
                transition={{ delay: lead.length * 0.9 + 0.3, type: "spring", stiffness: 120 }}
                className="paper mt-6 w-full rounded-2xl border-2 border-wine/30 px-5 py-6"
              >
                <h2 className="font-display text-3xl text-wine sm:text-4xl">{question}</h2>
                {small && <p className="mt-3 text-sm text-muted-foreground">{small}</p>}
                {state === "no" && !noPopupPhoto && (
                  <p className="mt-3 hand text-xl text-rose">
                    wrong button 😭 the animals are crying. try again?
                  </p>
                )}
                <div className="mt-6 min-h-[4rem]">
                  <AnimatePresence>
                    {askAudioFinished && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap justify-center gap-4"
                      >
                        <StoryButton
                          tone="yes"
                          heartbeat
                          onClick={sayYes}
                          onMouseEnter={() => setMood("celebrate")}
                          onMouseLeave={() => setMood("hopeful")}
                        >
                          YES ❤️
                        </StoryButton>
                        <StoryButton
                          tone="no"
                          onClick={() => {
                            setState("no");
                            setMood("nervous");
                          }}
                          onMouseEnter={() => setMood("nervous")}
                          onMouseLeave={() => setMood("hopeful")}
                        >
                          NO 🥺
                        </StoryButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              <Animals mood={mood} />
            </motion.div>
          ) : (
            <motion.div key="yes" className="flex flex-col items-center">
              {yesLines.map((l, i) => (
                <Line
                  key={l}
                  delay={i * 1.4}
                  className={
                    i === 0
                      ? "mt-6 font-display text-4xl text-wine sm:text-5xl"
                      : "mt-4 text-lg text-cocoa"
                  }
                >
                  {l}
                </Line>
              ))}
              <Animals mood="celebrate" />
              <div className="mt-8 min-h-[4rem]">
                <AnimatePresence>
                  {audioFinished && (
                    <Line className="flex justify-center">
                      <StoryButton tone="gold" onClick={onDone}>
                        {doneLabel}
                      </StoryButton>
                    </Line>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}

export function ValentineQuestion({ onNext }: { onNext: () => void }) {
  const v = story.valentine;
  return (
    <Question
      lead={[v.lead]}
      question={v.question}
      small={v.small}
      yesLines={v.yesLines}
      onDone={onNext}
      doneLabel="Hehe, what next? 👀"
      noPopupPhoto={v.noPhoto}
      withPhotoMoment={true}
      yesAudioSrc={yesAudioSrc}
    />
  );
}

export function DateQuestion({ onNext }: { onNext: () => void }) {
  const d = story.dateAsk;
  return (
    <Question
      lead={["Okay... one more thing.", d.lead]}
      question={d.question}
      yesLines={d.yesLines}
      onDone={onNext}
      doneLabel="So where are we going? 🥺"
      noPopupPhoto={d.noPhoto}
      askAudioSrc={dateAudioSrc}
    />
  );
}
