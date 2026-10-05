import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createMovieUpload } from "@/lib/movie.functions";

export const Route = createFileRoute("/movie-upload")({
  head: () => ({
    meta: [
      { title: "Private movie upload" },
      { name: "description", content: "Private page to set the movie for movie night." },
      { property: "og:title", content: "Private movie upload" },
      { property: "og:description", content: "Private page to set the movie for movie night." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MovieUpload,
});

function MovieUpload() {
  const ticketFn = useServerFn(createMovieUpload);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMsg("Pick a movie file first.");
    if (!file.type.startsWith("video/")) return setMsg("That isn't a video file. Try .mp4 or .webm.");
    setStatus("busy");
    setMsg("Uploading… keep this page open, big movies take a while.");
    try {
      const t = await ticketFn({ data: { password } });
      if (!t.ok) {
        setStatus("error");
        return setMsg("Wrong password.");
      }
      const { error } = await supabase.storage
        .from("movies")
        .uploadToSignedUrl(t.path, t.token, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      setStatus("done");
      setMsg("Done! The movie is ready for movie night 🍿❤️");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMsg("Upload failed. Check your connection and try again.");
    }
  };

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-background px-5">
      <form onSubmit={submit} className="paper w-full max-w-md space-y-4 rounded-3xl p-6">
        <h1 className="font-display text-3xl text-wine">Movie night upload 🎬</h1>
        <p className="text-sm text-muted-foreground">
          Only for you. The movie you upload here plays automatically on movie night.
        </p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-blush bg-ivory px-4 py-3"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm"
        />
        <button
          disabled={status === "busy"}
          className="min-h-12 w-full rounded-full bg-wine px-6 text-ivory disabled:opacity-60"
        >
          {status === "busy" ? "Uploading…" : "Upload movie"}
        </button>
        {msg && <p className="text-sm text-wine">{msg}</p>}
      </form>
    </main>
  );
}
