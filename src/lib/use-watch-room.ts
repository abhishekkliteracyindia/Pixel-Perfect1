import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type ChatMsg = { id: string; name: string; text: string };
type Ctl = { type: "play" | "pause" | "seek"; t: number };

const ROOM_KEY = "our-little-universe:room";

/** Room id comes from the invite link (?room=) or is created once and remembered. */
export function resolveRoom(): { id: string; guest: boolean } {
  const fromUrl = new URLSearchParams(window.location.search).get("room");
  if (fromUrl && /^[a-z0-9]{6,32}$/i.test(fromUrl)) return { id: fromUrl, guest: true };
  let id = localStorage.getItem(ROOM_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
    localStorage.setItem(ROOM_KEY, id);
  }
  return { id, guest: false };
}

export function useWatchRoom(
  roomId: string | null,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onReaction: (e: string) => void,
) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const suppress = useRef(false);
  const suppressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remoteSeeking = useRef(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [watching, setWatching] = useState(1);
  const reactRef = useRef(onReaction);
  reactRef.current = onReaction;

  const applyRemote = useCallback(
    async (c: Ctl | { type: "state"; t: number; paused: boolean }) => {
      const v = videoRef.current;
      if (!v) return;
      suppress.current = true;
      if (Math.abs(v.currentTime - c.t) > 0.6) {
        remoteSeeking.current = true;
        v.currentTime = c.t;
      }
      try {
        if (c.type === "play" || (c.type === "state" && !c.paused)) await v.play();
        if (c.type === "pause" || (c.type === "state" && c.paused)) v.pause();
      } catch {
        /* autoplay blocked — they can press play */
      }
      if (suppressTimeout.current) clearTimeout(suppressTimeout.current);
      suppressTimeout.current = setTimeout(() => {
        suppress.current = false;
        suppressTimeout.current = null;
      }, 400);
    },
    [videoRef],
  );

  useEffect(() => {
    if (!roomId) return;
    const me = Math.random().toString(36).slice(2);
    const ch = supabase.channel(`movie-room-${roomId}`, {
      config: { broadcast: { self: false }, presence: { key: me } },
    });
    ch.on("broadcast", { event: "ctl" }, ({ payload }) => applyRemote(payload as Ctl))
      .on("broadcast", { event: "state" }, ({ payload }) => applyRemote(payload))
      .on("broadcast", { event: "hello" }, () => {
        const v = videoRef.current;
        if (v) ch.send({ type: "broadcast", event: "state", payload: { type: "state", t: v.currentTime, paused: v.paused } });
      })
      .on("broadcast", { event: "chat" }, ({ payload }) =>
        setMessages((m) => [...m.slice(-49), payload as ChatMsg]),
      )
      .on("broadcast", { event: "react" }, ({ payload }) => reactRef.current((payload as { e: string }).e))
      .on("presence", { event: "sync" }, () => setWatching(Math.max(1, Object.keys(ch.presenceState()).length)))
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await ch.track({ at: Date.now() });
        }
      });
    channelRef.current = ch;
    return () => {
      channelRef.current = null;
      supabase.removeChannel(ch);
    };
  }, [roomId, applyRemote, videoRef]);

  const requestSync = useCallback(() => {
    channelRef.current?.send({ type: "broadcast", event: "hello", payload: {} });
  }, []);

  const sendCtl = useCallback((type: Ctl["type"]) => {
    const v = videoRef.current;
    if (!v) return;
    
    if (type === "seek" && remoteSeeking.current) {
      remoteSeeking.current = false;
      return;
    }

    if (suppress.current) return;
    channelRef.current?.send({ type: "broadcast", event: "ctl", payload: { type, t: v.currentTime } });
  }, [videoRef]);

  const sendChat = useCallback((name: string, text: string) => {
    const msg: ChatMsg = { id: `${Date.now()}-${Math.random()}`, name, text: text.slice(0, 300) };
    setMessages((m) => [...m.slice(-49), msg]);
    channelRef.current?.send({ type: "broadcast", event: "chat", payload: msg });
  }, []);

  const sendReaction = useCallback((e: string) => {
    channelRef.current?.send({ type: "broadcast", event: "react", payload: { e } });
  }, []);

  return { messages, watching, sendCtl, sendChat, sendReaction, requestSync };
}
