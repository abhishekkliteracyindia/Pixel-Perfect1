import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { Grain } from "@/components/Atmosphere";
import { Her, Him } from "@/components/Characters";
import { Line, Scene, StoryButton } from "@/components/ui-kit";
import { story } from "@/config/story";
import { getMovie } from "@/lib/movie.functions";
import { resolveRoom, useWatchRoom } from "@/lib/use-watch-room";

const REACTIONS = ["❤️", "😂", "😭", "👀", "🥺", "🍿"];

export function Cinema({ onNext }: { onNext: () => void }) {
  const fetchMovie = useServerFn(getMovie);
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<{ id: string; guest: boolean } | null>(null);
  const [invite, setInvite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState("");
  const [floating, setFloating] = useState<{ id: number; e: string; x: number }[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const float = (e: string) => {
    const id = Date.now() + Math.random();
    setFloating((f) => [...f, { id, e, x: 10 + Math.random() * 80 }]);
    setTimeout(() => setFloating((f) => f.filter((r) => r.id !== id)), 2200);
  };

  const { messages, watching, sendCtl, sendChat, sendReaction, requestSync } = useWatchRoom(room?.id ?? null, videoRef, float);

  useEffect(() => {
    const r = resolveRoom();
    setRoom(r);
    if (!r.guest) setInvite(true);
    fetchMovie()
      .then((m) => setSrc(m.url ?? (story.movie.src || null)))
      .catch(() => setSrc(story.movie.src || null))
      .finally(() => setLoading(false));
  }, [fetchMovie]);

  const myName = room?.guest ? "Me ❤️" : story.birthdayName;
  const link = room && typeof window !== "undefined" ? `${window.location.origin}/?room=${room.id}` : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", link);
    }
  };

  const share = () => {
    const msg = `Wanna watch a movie with me? 🍿❤️ Join here: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const react = (e: string) => {
    float(e);
    sendReaction(e);
  };

  return (
    <Scene dark className="justify-start pt-10">
      <Grain />
      <div aria-hidden className="absolute inset-y-0 left-0 w-6 bg-[linear-gradient(90deg,#4a1220,#7a1f33)] sm:w-16" />
      <div aria-hidden className="absolute inset-y-0 right-0 w-6 bg-[linear-gradient(270deg,#4a1220,#7a1f33)] sm:w-16" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <Line as="h2" className="text-center font-display text-3xl text-gold">
          Welcome to our first movie night 🍿❤️
        </Line>
        <p className="mt-2 text-xs text-ivory/60">
          {watching > 1 ? "💞 You're both here" : "Waiting for your movie partner…"}
        </p>

        <div className="relative mt-5 w-full overflow-hidden rounded-2xl border-4 border-gold/40 bg-night shadow-[0_0_60px_-10px_var(--gold)]">
          {src ? (
            <video
              ref={videoRef}
              src={src}
              controls
              preload="metadata"
              playsInline
              poster={story.movie.poster}
              onLoadedMetadata={() => requestSync()}
              onPlay={() => sendCtl("play")}
              onPause={() => sendCtl("pause")}
              onSeeked={() => sendCtl("seek")}
              onError={() => setError("Oops... the movie didn't want to load 😭 Try refreshing.")}
              className="aspect-video w-full bg-night"
            />
          ) : (
            <div className="relative aspect-video w-full">
              <img src={story.movie.poster} alt="Movie poster" className="h-full w-full object-cover opacity-70" />
              <p className="absolute inset-x-0 bottom-4 text-center font-display text-xl text-ivory">
                {loading ? "Getting the movie ready… 🍿" : "The movie is almost here… 🎬"}
              </p>
            </div>
          )}

          <AnimatePresence>
            {floating.map((r) => (
              <motion.span
                key={r.id}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -120, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="pointer-events-none absolute bottom-16 text-3xl"
                style={{ left: `${r.x}%` }}
              >
                {r.e}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {error && <p className="mt-3 text-center text-sm text-blush">{error}</p>}

        <div className="mt-5 flex items-end justify-center gap-10">
          <div className="flex flex-col items-center">
            <Her size={56} mood="happy" />
            <span className="-mt-2 rounded-t-2xl bg-wine px-6 py-2 text-sm text-ivory">🎀 {story.birthdayName}</span>
          </div>
          <span className="mb-3 text-3xl">🍿🥤</span>
          <div className="flex flex-col items-center">
            <Him size={52} mood={watching > 1 ? "blush" : "happy"} />
            <span className="-mt-2 rounded-t-2xl bg-wine px-6 py-2 text-sm text-ivory">❤️ Me</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Reactions">
          {REACTIONS.map((e) => (
            <button
              key={e}
              onClick={() => react(e)}
              aria-label={`React ${e}`}
              className="h-12 w-12 rounded-full bg-ivory/10 text-2xl transition hover:bg-ivory/20"
            >
              {e}
            </button>
          ))}
        </div>

        {/* chat */}
        <div className="mt-5 w-full max-w-md rounded-2xl bg-ivory/5 p-3">
          <div className="max-h-40 space-y-1 overflow-y-auto text-sm">
            {messages.length === 0 && <p className="text-ivory/50">Say something cute 💬</p>}
            {messages.map((m) => (
              <p key={m.id}>
                <span className="font-medium text-gold">{m.name}:</span>{" "}
                <span className="text-ivory/90">{m.text}</span>
              </p>
            ))}
          </div>
          <form
            className="mt-2 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              sendChat(myName, text.trim());
              setText("");
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={300}
              placeholder="Type a message…"
              className="min-h-11 flex-1 rounded-full bg-ivory/10 px-4 text-ivory placeholder:text-ivory/40"
            />
            <button className="min-h-11 rounded-full bg-gold px-4 text-sm font-medium text-wine">Send</button>
          </form>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!room?.guest && (
            <StoryButton tone="quiet" onClick={() => setInvite(true)}>
              Invite someone 💞
            </StoryButton>
          )}
          {!room?.guest && (
            <StoryButton tone="gold" onClick={onNext}>
              After the movie... ✉️
            </StoryButton>
          )}
        </div>
      </div>

      <AnimatePresence>
        {invite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/70 px-5 backdrop-blur-sm"
            onClick={() => setInvite(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Invite someone"
              className="paper w-full max-w-sm rounded-3xl p-6 text-center text-foreground"
            >
              <div className="flex justify-center"><Him size={64} mood="blush" /></div>
              <p className="mt-2 font-display text-2xl text-wine">
                Don't you think you should ask someone to watch a movie with you? 🍿❤️
              </p>
              <p className="mt-3 break-all rounded-xl bg-blush/40 px-3 py-2 text-xs text-wine">{link}</p>
              <div className="mt-4 flex flex-col gap-2">
                <StoryButton tone="yes" onClick={share}>Share on WhatsApp 💬</StoryButton>
                <StoryButton tone="no" onClick={copy}>{copied ? "Copied! ✓" : "Copy link 🔗"}</StoryButton>
              </div>
              <button onClick={() => setInvite(false)} className="mt-3 text-xs text-muted-foreground underline">
                maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Scene>
  );
}
