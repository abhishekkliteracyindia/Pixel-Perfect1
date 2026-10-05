import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BUCKET = "movies";
const FILE = "current";

/** Returns a temporary link to the movie you uploaded, or null if none yet. */
export const getMovie = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: list } = await supabaseAdmin.storage.from(BUCKET).list("", { search: FILE });
  if (!list?.some((f) => f.name === FILE)) return { url: null as string | null };
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(FILE, 60 * 60 * 12);
  if (error) {
    console.error("movie signed url failed", error);
    return { url: null as string | null };
  }
  return { url: data.signedUrl as string | null };
});

/** Password-protected: gives the uploader a one-time upload ticket. */
export const createMovieUpload = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env["MOVIE_UPLOAD_PASSWORD"];
    if (!expected || data.password !== expected) return { ok: false as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: ticket, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUploadUrl(FILE, { upsert: true });
    if (error || !ticket) {
      console.error("upload ticket failed", error);
      return { ok: false as const };
    }
    return { ok: true as const, path: ticket.path, token: ticket.token };
  });
