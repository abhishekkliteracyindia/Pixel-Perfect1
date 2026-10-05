/** Tiny synthesised sound effects. No audio files, no autoplay, always optional. */

let ctx: AudioContext | null = null;
let muted = false;

const KEY = "our-little-universe:muted";

export function initSound() {
  if (typeof window === "undefined") return;
  try {
    muted = localStorage.getItem(KEY) === "1";
  } catch {
    /* ignore */
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, duration: number, type: OscillatorType, gain: number, delay = 0) {
  const ac = audio();
  if (!ac || muted) return;
  const osc = ac.createOscillator();
  const vol = ac.createGain();
  const start = ac.currentTime + delay;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  vol.gain.setValueAtTime(0.0001, start);
  vol.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  vol.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(vol).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function noise(duration: number, gain: number) {
  const ac = audio();
  if (!ac || muted) return;
  const frames = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  const src = ac.createBufferSource();
  const vol = ac.createGain();
  vol.gain.value = gain;
  src.buffer = buffer;
  src.connect(vol).connect(ac.destination);
  src.start();
}

export const sfx = {
  click: () => tone(520, 0.09, "sine", 0.06),
  soft: () => tone(320, 0.14, "sine", 0.05),
  candle: () => noise(0.32, 0.05),
  curtain: () => noise(1.1, 0.035),
  celebrate: () => {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.28, "triangle", 0.05, i * 0.09));
  },
  firework: () => {
    tone(180, 0.2, "sine", 0.05);
    noise(0.5, 0.04);
  },
  cinema: () => {
    tone(140, 0.7, "sine", 0.05);
    tone(210, 0.7, "sine", 0.03, 0.1);
  },
};
