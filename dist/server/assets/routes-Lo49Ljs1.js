import { t as story } from "./story-D_W9cmZ4.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
//#region src/components/Animals.tsx
var CREW = [
	{
		emoji: "🐰",
		sign: "please 🥺"
	},
	{
		emoji: "🐶",
		sign: "say yes"
	},
	{
		emoji: "🐱",
		sign: "do it"
	},
	{
		emoji: "🐻",
		sign: "please please"
	},
	{
		emoji: "🐧",
		sign: "🥺"
	},
	{
		emoji: "🦆",
		sign: "pleeease"
	}
];
var PLAYFUL_CREW = [
	{
		emoji: "🐰",
		toy: "🥕",
		position: "left-[3%] top-[16%]"
	},
	{
		emoji: "🐶",
		toy: "🎾",
		position: "right-[3%] top-[23%]"
	},
	{
		emoji: "🐱",
		toy: "🧶",
		position: "left-[5%] bottom-[14%]"
	},
	{
		emoji: "🐻",
		toy: "🎈",
		position: "right-[5%] bottom-[12%]"
	},
	{
		emoji: "🐧",
		toy: "✨",
		position: "left-[23%] bottom-[3%]"
	},
	{
		emoji: "🦆",
		toy: "🌼",
		position: "right-[23%] top-[5%]"
	}
];
function PlayfulAnimals({ scene }) {
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-[6] overflow-hidden",
		children: PLAYFUL_CREW.map((animal, i) => /* @__PURE__ */ jsx(motion.div, {
			className: `absolute ${animal.position} ${i > 3 ? "hidden sm:block" : "block"}`,
			initial: reduced ? { opacity: .7 } : {
				opacity: 0,
				scale: .4,
				y: 20
			},
			animate: reduced ? { opacity: .7 } : {
				opacity: .9,
				scale: 1,
				y: 0
			},
			transition: {
				delay: .3 + i * .16,
				type: "spring",
				stiffness: 170,
				damping: 13
			},
			children: /* @__PURE__ */ jsxs(motion.div, {
				className: "relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20",
				animate: reduced ? {} : i % 3 === 0 ? {
					y: [
						0,
						-12,
						0
					],
					rotate: [
						0,
						-7,
						5,
						0
					]
				} : i % 3 === 1 ? {
					x: [
						0,
						13,
						-8,
						0
					],
					rotate: [
						0,
						8,
						-5,
						0
					]
				} : {
					scale: [
						1,
						1.1,
						1
					],
					rotate: [
						0,
						-8,
						8,
						0
					]
				},
				transition: {
					duration: 2.4 + i * .25,
					repeat: Infinity,
					ease: "easeInOut"
				},
				children: [/* @__PURE__ */ jsx("span", {
					className: "select-none text-4xl drop-shadow-sm sm:text-5xl",
					children: animal.emoji
				}), /* @__PURE__ */ jsx(motion.span, {
					className: "absolute right-0 top-0 select-none text-lg sm:text-2xl",
					animate: reduced ? {} : {
						y: [
							0,
							-9,
							0
						],
						rotate: [
							0,
							18,
							-10,
							0
						]
					},
					transition: {
						duration: 1.7 + i * .2,
						repeat: Infinity,
						ease: "easeInOut"
					},
					children: animal.toy
				})]
			})
		}, `${scene}-${animal.emoji}`))
	});
}
function Animals({ mood = "idle" }) {
	const reduced = useReducedMotion();
	const anim = (i) => {
		if (reduced) return {};
		switch (mood) {
			case "celebrate": return {
				y: [
					0,
					-18,
					0
				],
				rotate: [
					0,
					i % 2 ? 8 : -8,
					0
				]
			};
			case "hopeful": return {
				y: [
					0,
					-8,
					0
				],
				scale: [
					1,
					1.08,
					1
				]
			};
			case "nervous": return {
				x: [
					0,
					-3,
					3,
					0
				],
				rotate: [
					0,
					-4,
					4,
					0
				]
			};
			default: return { y: [
				0,
				-4,
				0
			] };
		}
	};
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "mt-8 flex w-full max-w-lg flex-wrap items-end justify-center gap-x-3 gap-y-4",
		children: CREW.map((a, i) => /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				y: 30
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				delay: .4 + i * .35,
				type: "spring",
				stiffness: 160,
				damping: 14
			},
			children: /* @__PURE__ */ jsxs(motion.div, {
				className: "flex flex-col items-center",
				animate: anim(i),
				transition: {
					duration: mood === "nervous" ? .6 : 1.8,
					repeat: Infinity,
					delay: i * .12,
					ease: "easeInOut"
				},
				children: [/* @__PURE__ */ jsx("span", {
					className: `rotate-[-3deg] rounded-md border-2 border-wine/70 bg-ivory px-2 py-0.5 hand text-sm text-wine shadow-sm transition-opacity duration-500 ${mood === "idle" ? "opacity-0" : "opacity-100"}`,
					children: mood === "celebrate" ? "yayyy" : mood === "nervous" ? "no?? 😭" : a.sign
				}), /* @__PURE__ */ jsx("span", {
					className: "mt-1 text-4xl sm:text-5xl",
					children: a.emoji
				})]
			})
		}, a.emoji))
	});
}
//#endregion
//#region src/lib/sound.ts
/** Tiny synthesised sound effects. No audio files, no autoplay, always optional. */
var ctx = null;
var muted = false;
var KEY$1 = "our-little-universe:muted";
function initSound() {
	if (typeof window === "undefined") return;
	try {
		muted = localStorage.getItem(KEY$1) === "1";
	} catch {}
}
function isMuted() {
	return muted;
}
function setMuted(value) {
	muted = value;
	try {
		localStorage.setItem(KEY$1, value ? "1" : "0");
	} catch {}
}
function audio() {
	if (typeof window === "undefined") return null;
	try {
		if (!ctx) {
			const Ctor = window.AudioContext || window.webkitAudioContext;
			if (!Ctor) return null;
			ctx = new Ctor();
		}
		if (ctx.state === "suspended") ctx.resume();
		return ctx;
	} catch {
		return null;
	}
}
function tone(freq, duration, type, gain, delay = 0) {
	const ac = audio();
	if (!ac || muted) return;
	const osc = ac.createOscillator();
	const vol = ac.createGain();
	const start = ac.currentTime + delay;
	osc.type = type;
	osc.frequency.setValueAtTime(freq, start);
	vol.gain.setValueAtTime(1e-4, start);
	vol.gain.exponentialRampToValueAtTime(gain, start + .02);
	vol.gain.exponentialRampToValueAtTime(1e-4, start + duration);
	osc.connect(vol).connect(ac.destination);
	osc.start(start);
	osc.stop(start + duration + .05);
}
function noise(duration, gain) {
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
var sfx = {
	click: () => tone(520, .09, "sine", .06),
	soft: () => tone(320, .14, "sine", .05),
	candle: () => noise(.32, .05),
	curtain: () => noise(1.1, .035),
	celebrate: () => {
		[
			523,
			659,
			784,
			1046
		].forEach((f, i) => tone(f, .28, "triangle", .05, i * .09));
	},
	firework: () => {
		tone(180, .2, "sine", .05);
		noise(.5, .04);
	},
	cinema: () => {
		tone(140, .7, "sine", .05);
		tone(210, .7, "sine", .03, .1);
	}
};
//#endregion
//#region src/components/Overlay.tsx
/** Sound toggle, restart, and small hidden surprises. */
function Overlay({ onRestart, showRestart }) {
	const [muted, setMute] = useState(false);
	const [toast, setToast] = useState(null);
	useEffect(() => {
		initSound();
		setMute(isMuted());
	}, []);
	useEffect(() => {
		if (!toast) return;
		const t = setTimeout(() => setToast(null), 3200);
		return () => clearTimeout(t);
	}, [toast]);
	const egg = (msg) => {
		sfx.soft();
		setToast(msg);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "fixed top-3 left-3 z-40 flex gap-2",
			children: [/* @__PURE__ */ jsx("button", {
				onClick: () => {
					setMuted(!muted);
					setMute(!muted);
				},
				"aria-label": muted ? "Turn sound on" : "Turn sound off",
				className: "h-11 w-11 rounded-full bg-ivory/80 text-lg shadow-md backdrop-blur",
				children: muted ? "🔇" : "🔊"
			}), showRestart && /* @__PURE__ */ jsx("button", {
				onClick: onRestart,
				className: "h-11 rounded-full bg-ivory/80 px-4 text-xs font-medium text-wine shadow-md backdrop-blur",
				children: "Restart Story"
			})]
		}),
		/* @__PURE__ */ jsx("button", {
			onClick: () => egg(story.easterEggs.heart),
			"aria-label": "A tiny heart",
			className: "fixed bottom-3 left-3 z-40 h-8 w-8 text-xs opacity-30 transition hover:opacity-90",
			children: "♡"
		}),
		/* @__PURE__ */ jsx("button", {
			onClick: () => egg(story.easterEggs.forbidden),
			className: "fixed right-3 bottom-3 z-40 rounded-full px-3 py-2 text-[11px] text-muted-foreground/70 underline decoration-dotted",
			children: "Don't click this."
		}),
		/* @__PURE__ */ jsx("button", {
			onClick: () => egg(story.easterEggs.star),
			"aria-label": "A small star",
			className: "fixed top-3 right-3 z-40 h-8 w-8 text-xs opacity-25 transition hover:opacity-90",
			children: "✦"
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: toast && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: 10
			},
			role: "status",
			className: "paper fixed bottom-16 left-1/2 z-50 max-w-[85vw] -translate-x-1/2 rounded-2xl px-5 py-3 text-center hand text-xl text-wine",
			children: toast
		}) })
	] });
}
//#endregion
//#region src/components/Atmosphere.tsx
/** Deterministic pseudo-random so server and client render the same particles. */
function rand(seed) {
	const x = Math.sin(seed * 9973.13) * 1e4;
	return x - Math.floor(x);
}
function Particles({ count = 22, tone = "warm" }) {
	const reduced = useReducedMotion();
	const items = Array.from({ length: count }, (_, i) => ({
		left: rand(i + 1) * 100,
		top: rand(i + 41) * 100,
		size: 2 + rand(i + 91) * 5,
		delay: rand(i + 131) * 8,
		duration: 9 + rand(i + 171) * 11
	}));
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: items.map((p, i) => /* @__PURE__ */ jsx(motion.span, {
			className: tone === "warm" ? "absolute rounded-full bg-gold/70 blur-[1px]" : "absolute rounded-full bg-ivory/50 blur-[1px]",
			style: {
				left: `${p.left}%`,
				top: `${p.top}%`,
				width: p.size,
				height: p.size
			},
			animate: reduced ? { opacity: .4 } : {
				y: [
					0,
					-28,
					0
				],
				opacity: [
					0,
					.85,
					0
				]
			},
			transition: {
				duration: p.duration,
				delay: p.delay,
				repeat: Infinity,
				ease: "easeInOut"
			}
		}, i))
	});
}
function Confetti({ pieces = 34 }) {
	if (useReducedMotion()) return null;
	const colors = [
		"bg-blush",
		"bg-rose",
		"bg-gold",
		"bg-peach",
		"bg-wine"
	];
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: Array.from({ length: pieces }, (_, i) => /* @__PURE__ */ jsx(motion.span, {
			className: `absolute h-2 w-1.5 rounded-[1px] ${colors[i % colors.length]}`,
			style: {
				left: `${rand(i + 7) * 100}%`,
				top: "-5%"
			},
			initial: {
				y: 0,
				rotate: 0,
				opacity: 1
			},
			animate: {
				y: "110vh",
				rotate: 540,
				opacity: [
					1,
					1,
					0
				]
			},
			transition: {
				duration: 3.4 + rand(i + 13) * 2.4,
				delay: rand(i + 29) * 1.4,
				ease: "easeIn"
			}
		}, i))
	});
}
var FIREWORK_COLORS = [
	"#FFD166",
	"#FF8FA3",
	"#F9F5EC",
	"#FFC4B8",
	"#E4B363",
	"#C9184A"
];
function Fireworks({ bursts = 5 }) {
	if (useReducedMotion()) return null;
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: Array.from({ length: bursts }, (_, b) => {
			const cx = 12 + rand(b + 3) * 76;
			const cy = 10 + rand(b + 17) * 48;
			const color = FIREWORK_COLORS[b % FIREWORK_COLORS.length];
			const color2 = FIREWORK_COLORS[(b + 2) % FIREWORK_COLORS.length];
			const delay = b * .7 + rand(b + 31) * .35;
			const sparkCount = 18;
			return /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(motion.span, {
					className: "absolute h-2.5 w-[2px] rounded-full",
					style: {
						left: `${cx}%`,
						top: `${cy}%`,
						background: `linear-gradient(180deg, ${color}, transparent)`
					},
					initial: {
						y: 340,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: [
							0,
							1,
							1,
							0
						]
					},
					transition: {
						duration: .55,
						delay,
						ease: "easeOut"
					}
				}),
				/* @__PURE__ */ jsx(motion.span, {
					className: "absolute rounded-full blur-md",
					style: {
						left: `${cx}%`,
						top: `${cy}%`,
						width: 90,
						height: 90,
						x: "-50%",
						y: "-50%",
						background: `radial-gradient(circle, ${color}bb, transparent 70%)`
					},
					initial: {
						scale: .2,
						opacity: 0
					},
					animate: {
						scale: [
							.2,
							1.15,
							.9
						],
						opacity: [
							0,
							.9,
							0
						]
					},
					transition: {
						duration: .9,
						delay: delay + .5,
						ease: "easeOut"
					}
				}),
				Array.from({ length: sparkCount }, (_, s) => {
					const angle = s / sparkCount * Math.PI * 2 + rand(b * 10 + s);
					const dist = 85 + rand(b * 7 + s) * 45;
					return /* @__PURE__ */ jsx(motion.span, {
						className: "absolute h-1.5 w-1.5 rounded-full",
						style: {
							left: `${cx}%`,
							top: `${cy}%`,
							background: s % 2 === 0 ? color : color2,
							boxShadow: `0 0 8px 2px ${color}66`
						},
						initial: {
							x: 0,
							y: 0,
							opacity: 0,
							scale: .4
						},
						animate: {
							x: Math.cos(angle) * dist,
							y: Math.sin(angle) * dist + 22,
							opacity: [
								0,
								1,
								1,
								0
							],
							scale: [
								.4,
								1.1,
								.9,
								.5
							]
						},
						transition: {
							duration: 1.7,
							delay: delay + .5,
							ease: "easeOut"
						}
					}, `o-${b}-${s}`);
				}),
				Array.from({ length: 10 }, (_, s) => {
					const angle = s / 10 * Math.PI * 2;
					return /* @__PURE__ */ jsx(motion.span, {
						className: "absolute h-1 w-1 rounded-full bg-[#F9F5EC]",
						style: {
							left: `${cx}%`,
							top: `${cy}%`
						},
						initial: {
							x: 0,
							y: 0,
							opacity: 0
						},
						animate: {
							x: Math.cos(angle) * 34,
							y: Math.sin(angle) * 34 + 12,
							opacity: [
								0,
								1,
								0
							]
						},
						transition: {
							duration: 1.3,
							delay: delay + .55,
							ease: "easeOut"
						}
					}, `i-${b}-${s}`);
				})
			] }, `burst-${b}`);
		})
	});
}
function FloatingHearts({ count = 10 }) {
	if (useReducedMotion()) return null;
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ jsx(motion.span, {
			className: "absolute text-lg",
			style: {
				left: `${rand(i + 5) * 92 + 3}%`,
				bottom: "-8%"
			},
			animate: {
				y: ["0vh", "-95vh"],
				opacity: [
					0,
					1,
					0
				],
				x: [
					0,
					rand(i) * 30 - 15,
					0
				]
			},
			transition: {
				duration: 7 + rand(i + 2) * 5,
				delay: rand(i + 9) * 4,
				repeat: Infinity
			},
			children: "❤️"
		}, i))
	});
}
function Grain() {
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": true,
		className: "grain pointer-events-none absolute inset-0"
	});
}
//#endregion
//#region src/components/ui-kit.tsx
var sceneVariants = {
	initial: {
		opacity: 0,
		scale: 1.03,
		filter: "blur(8px)"
	},
	animate: {
		opacity: 1,
		scale: 1,
		filter: "blur(0px)"
	},
	exit: {
		opacity: 0,
		scale: .985,
		filter: "blur(6px)"
	}
};
function Scene({ children, className = "", dark = false }) {
	return /* @__PURE__ */ jsx(motion.section, {
		variants: sceneVariants,
		initial: "initial",
		animate: "animate",
		exit: "exit",
		transition: {
			duration: .9,
			ease: [
				.22,
				.8,
				.2,
				1
			]
		},
		className: `relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-16 sm:px-8 ${dark ? "bg-night text-ivory" : "bg-background text-foreground"} ${className}`,
		children
	});
}
function Line({ children, delay = 0, className = "", as = "p" }) {
	const Tag = motion[as];
	return /* @__PURE__ */ jsx(Tag, {
		initial: {
			opacity: 0,
			y: 14
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .8,
			delay,
			ease: "easeOut"
		},
		className,
		children
	});
}
function StoryButton({ children, onClick, tone = "quiet", heartbeat = false, onMouseEnter, onMouseLeave, className = "", type = "button" }) {
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsx(motion.button, {
		type,
		onClick: () => {
			sfx.click();
			onClick?.();
		},
		onMouseEnter,
		onMouseLeave,
		onFocus: onMouseEnter,
		onBlur: onMouseLeave,
		whileTap: { scale: .96 },
		animate: heartbeat && !reduced ? { scale: [
			1,
			1.06,
			1
		] } : {},
		transition: heartbeat ? {
			duration: 1.6,
			repeat: Infinity,
			ease: "easeInOut"
		} : {},
		className: `min-h-12 min-w-32 rounded-full px-7 py-3 text-base font-medium tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none ${{
			yes: "bg-wine text-ivory shadow-[0_16px_40px_-18px_var(--wine)]",
			no: "bg-ivory text-wine border border-blush",
			quiet: "bg-blush/50 text-wine border border-rose/30",
			gold: "bg-gold text-wine shadow-[0_16px_40px_-20px_var(--gold)]"
		}[tone]} ${className}`,
		children
	});
}
//#endregion
//#region src/components/scenes/BirthdayMessage.tsx
function BirthdayMessage({ onNext }) {
	const t = story.birthdayMessage;
	const frames = story.photos.slice(0, 3);
	return /* @__PURE__ */ jsxs(Scene, {
		className: "bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--blush)_55%,transparent),transparent_70%)]",
		children: [
			/* @__PURE__ */ jsx(Particles, { count: 16 }),
			/* @__PURE__ */ jsx(FloatingHearts, { count: 6 }),
			/* @__PURE__ */ jsx(Grain, {}),
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 hidden lg:block",
				children: frames.map((p, i) => /* @__PURE__ */ jsx(motion.img, {
					src: p.src,
					alt: "",
					loading: "lazy",
					width: 816,
					height: 816,
					className: "absolute h-40 w-40 rounded-xl object-cover opacity-45 shadow-xl",
					style: {
						left: i === 1 ? "auto" : `${6 + i * 4}%`,
						right: i === 1 ? "7%" : "auto",
						top: `${18 + i * 26}%`,
						rotate: `${i % 2 ? 5 : -6}deg`
					},
					animate: { y: [
						0,
						-12,
						0
					] },
					transition: {
						duration: 9 + i,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}, p.src))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex w-full max-w-xl flex-col items-center text-center",
				children: [
					/* @__PURE__ */ jsx(Line, {
						as: "h1",
						className: "font-display text-4xl tracking-wide text-wine sm:text-6xl",
						children: t.heading
					}),
					t.lines.map((l, i) => /* @__PURE__ */ jsx(Line, {
						delay: .9 + i * .7,
						className: "mt-3 text-lg text-cocoa",
						children: l
					}, l)),
					/* @__PURE__ */ jsx(Line, {
						delay: 2.6,
						className: "mt-6 font-display text-3xl text-rose",
						children: t.love
					}),
					/* @__PURE__ */ jsx(Line, {
						delay: 3.4,
						className: "mt-6 hand text-2xl text-cocoa/80",
						children: t.handwritten
					}),
					/* @__PURE__ */ jsx(Line, {
						delay: 4.1,
						className: "mt-10",
						children: /* @__PURE__ */ jsx(StoryButton, {
							tone: "gold",
							onClick: onNext,
							children: "Show me more 🥺"
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/assets/happy.mp4
var happy_default = "/assets/happy-CxBEHj0z.mp4";
//#endregion
//#region src/components/scenes/Candles.tsx
function Candles({ onNext }) {
	const total = story.birthdayAge;
	const [out, setOut] = useState(() => Array(total).fill(false));
	const reduced = useReducedMotion();
	const blown = out.filter(Boolean).length;
	const done = blown === total;
	const audioRef = useRef(null);
	const [audioFinished, setAudioFinished] = useState(false);
	useEffect(() => {
		let isActive = true;
		if (done) {
			const audio = new Audio(happy_default);
			audioRef.current = audio;
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
	}, [done]);
	const blow = (i) => {
		if (out[i]) return;
		sfx.candle();
		setOut((prev) => {
			const next = [...prev];
			next[i] = true;
			if (next.every(Boolean)) setTimeout(() => sfx.celebrate(), 250);
			return next;
		});
	};
	const revealed = story.candles.secretWordsEnabled ? story.candles.secretWords.filter((_, i) => out[i]) : [];
	return /* @__PURE__ */ jsxs(Scene, {
		className: "bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--gold)_35%,transparent),transparent_60%)]",
		children: [
			/* @__PURE__ */ jsx(Particles, { count: 20 }),
			/* @__PURE__ */ jsx(Grain, {}),
			done && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Confetti, {}), /* @__PURE__ */ jsx(Fireworks, { bursts: 7 })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex w-full max-w-2xl flex-col items-center text-center",
				children: [
					/* @__PURE__ */ jsx(Line, {
						as: "h1",
						className: "font-display text-3xl text-wine sm:text-4xl",
						children: story.candles.intro
					}),
					story.candles.mission.map((l, i) => /* @__PURE__ */ jsx(Line, {
						delay: .6 + i * .4,
						className: "text-muted-foreground",
						children: l
					}, l)),
					/* @__PURE__ */ jsx(Line, {
						delay: 1.4,
						className: "mt-2 hand text-2xl text-rose",
						children: story.candles.instruction
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mt-12 w-full",
						children: [
							/* @__PURE__ */ jsx(motion.div, {
								"aria-hidden": true,
								animate: reduced ? {} : { opacity: done ? 0 : [
									.55,
									.8,
									.55
								] },
								transition: {
									duration: 2.4,
									repeat: Infinity
								},
								className: "pointer-events-none absolute -top-16 left-1/2 h-64 w-[26rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_55%,transparent),transparent_70%)] blur-2xl"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative mx-auto w-full max-w-md",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "relative z-20 mx-auto flex max-w-[19rem] flex-wrap items-end justify-center gap-x-2 gap-y-3 px-4",
										children: out.map((isOut, i) => /* @__PURE__ */ jsxs("button", {
											onClick: () => blow(i),
											"aria-label": `Candle ${i + 1}${isOut ? " (out)" : ""}`,
											"aria-pressed": isOut,
											className: "group flex h-16 w-5 flex-col items-center justify-end rounded-md focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "relative flex h-8 w-4 items-end justify-center",
													children: /* @__PURE__ */ jsx(AnimatePresence, {
														mode: "wait",
														children: !isOut ? /* @__PURE__ */ jsxs(motion.span, {
															className: "relative block",
															exit: {
																opacity: 0,
																scaleY: .2,
																y: -6
															},
															animate: reduced ? {} : {
																scaleY: [
																	1,
																	1.3,
																	.92,
																	1
																],
																scaleX: [
																	1,
																	.9,
																	1.05,
																	1
																],
																y: [
																	0,
																	-1,
																	0
																]
															},
															transition: {
																duration: 1.1,
																repeat: Infinity,
																delay: i * .09
															},
															style: { originY: 1 },
															children: [/* @__PURE__ */ jsx("span", { className: "block h-5 w-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(ellipse_at_50%_75%,color-mix(in_oklab,var(--gold)_92%,transparent),color-mix(in_oklab,var(--rose)_75%,transparent))] shadow-[0_0_18px_6px_color-mix(in_oklab,var(--gold)_55%,transparent)]" }), /* @__PURE__ */ jsx("span", { className: "absolute bottom-[3px] left-1/2 h-2 w-1.5 -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--ivory)_88%,var(--gold))] blur-[0.5px]" })]
														}, "flame") : /* @__PURE__ */ jsx(motion.span, {
															initial: {
																opacity: .7,
																y: 0,
																scale: .6
															},
															animate: {
																opacity: 0,
																y: -26,
																scale: 1.5,
																x: [
																	0,
																	3,
																	-2,
																	0
																]
															},
															transition: { duration: 1.6 },
															className: "block h-3 w-3 rounded-full bg-muted-foreground/40 blur-[3px]"
														}, "smoke")
													})
												}),
												/* @__PURE__ */ jsx("span", { className: "h-1.5 w-[2px] rounded-full bg-wine/70" }),
												/* @__PURE__ */ jsx("span", {
													className: `h-9 w-[9px] rounded-t-[3px] rounded-b-sm shadow-[inset_-2px_0_0_color-mix(in_oklab,var(--wine)_12%,transparent)] transition-opacity ${isOut ? "opacity-70" : "opacity-100"}`,
													style: { backgroundImage: i % 2 === 0 ? "repeating-linear-gradient(135deg,var(--ivory) 0 4px,var(--rose) 4px 8px)" : "repeating-linear-gradient(135deg,var(--ivory) 0 4px,var(--gold) 4px 8px)" }
												})
											]
										}, i))
									}),
									/* @__PURE__ */ jsx("div", {
										className: "relative z-10 -mt-1 mx-auto w-[78%]",
										children: /* @__PURE__ */ jsxs("div", {
											className: "relative h-24 rounded-t-[1.75rem] rounded-b-md bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ivory)_92%,var(--blush)),var(--blush))] shadow-[0_18px_30px_-22px_var(--wine),inset_0_-10px_18px_-14px_var(--wine)]",
											children: [/* @__PURE__ */ jsxs("div", {
												"aria-hidden": true,
												className: "absolute -top-1 left-0 right-0 h-8",
												children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-5 rounded-t-[1.75rem] bg-[color-mix(in_oklab,var(--ivory)_95%,var(--blush))]" }), /* @__PURE__ */ jsx("div", {
													className: "absolute inset-x-3 top-3 flex justify-between",
													children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ jsx("span", {
														className: "w-3 rounded-b-full bg-[color-mix(in_oklab,var(--ivory)_95%,var(--blush))]",
														style: { height: `${8 + i * 5 % 12}px` }
													}, i))
												})]
											}), /* @__PURE__ */ jsx("div", {
												"aria-hidden": true,
												className: "absolute inset-x-4 top-9 flex flex-wrap gap-2 opacity-80",
												children: Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx("span", {
													className: "h-[3px] w-2.5 rounded-full",
													style: {
														background: [
															"var(--rose)",
															"var(--gold)",
															"var(--wine)"
														][i % 3],
														transform: `rotate(${i * 47 % 180}deg)`
													}
												}, i))
											})]
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "relative mx-auto -mt-2 w-full",
										children: /* @__PURE__ */ jsxs("div", {
											className: "relative h-32 rounded-t-[2rem] rounded-b-[1.25rem] bg-[linear-gradient(180deg,var(--rose),var(--wine))] shadow-[0_30px_50px_-28px_var(--wine),inset_0_-14px_24px_-16px_color-mix(in_oklab,var(--wine)_75%,transparent)]",
											children: [
												/* @__PURE__ */ jsx("div", {
													"aria-hidden": true,
													className: "absolute -top-2 left-2 right-2 flex justify-between",
													children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx("span", { className: "h-5 w-5 rounded-full bg-[color-mix(in_oklab,var(--ivory)_92%,var(--blush))] shadow-[0_3px_6px_-3px_var(--wine)]" }, i))
												}),
												/* @__PURE__ */ jsx("p", {
													className: "pt-9 text-center font-display text-3xl text-ivory drop-shadow-[0_2px_6px_color-mix(in_oklab,var(--wine)_70%,transparent)]",
													children: story.birthdayName
												}),
												/* @__PURE__ */ jsx("div", {
													"aria-hidden": true,
													className: "absolute bottom-4 left-0 right-0 flex justify-center gap-4",
													children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--ivory)_60%,var(--rose)),var(--wine))]" }, i))
												})
											]
										})
									}),
									/* @__PURE__ */ jsxs("div", {
										"aria-hidden": true,
										className: "mx-auto -mt-1 w-[112%] max-w-none",
										children: [
											/* @__PURE__ */ jsx("div", { className: "mx-auto h-3 w-full rounded-full bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ivory)_90%,var(--blush)),color-mix(in_oklab,var(--blush)_80%,var(--wine)))] shadow-[0_10px_18px_-12px_var(--wine)]" }),
											/* @__PURE__ */ jsx("div", { className: "mx-auto h-8 w-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--blush)_70%,var(--wine)),var(--ivory),color-mix(in_oklab,var(--blush)_70%,var(--wine)))]" }),
											/* @__PURE__ */ jsx("div", { className: "mx-auto h-2.5 w-36 rounded-full bg-[linear-gradient(180deg,var(--ivory),color-mix(in_oklab,var(--blush)_75%,var(--wine)))] shadow-[0_18px_28px_-18px_var(--wine)]" })
										]
									})
								]
							}),
							!done && /* @__PURE__ */ jsx("div", {
								className: "mt-6 flex justify-center",
								children: /* @__PURE__ */ jsx("button", {
									onClick: () => out.forEach((o, i) => !o && setTimeout(() => blow(i), i * 90)),
									className: "rounded-full border border-rose/40 px-5 py-2 text-sm font-medium text-wine transition-colors hover:bg-rose/10 focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none",
									children: "Blow them all with one big breath 💨"
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("p", {
						"aria-live": "polite",
						className: "mt-6 text-lg font-medium text-wine",
						children: [
							blown,
							" / ",
							total
						]
					}),
					revealed.length > 0 && /* @__PURE__ */ jsx("p", {
						className: "mt-2 hand text-xl text-rose",
						children: revealed.join(" ")
					}),
					/* @__PURE__ */ jsx(AnimatePresence, { children: done && audioFinished && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "mt-8 flex flex-col items-center",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-display text-2xl text-wine",
							children: "Make a wish... 🌙"
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-5",
							children: /* @__PURE__ */ jsx(StoryButton, {
								tone: "yes",
								heartbeat: true,
								onClick: onNext,
								children: "I made one ❤️"
							})
						})]
					}) })
				]
			})
		]
	});
}
//#endregion
//#region src/assets/khulja.mp4
var khulja_default = "/assets/khulja-Diox9Xmu.mp4";
//#endregion
//#region src/components/scenes/Curtain.tsx
/** Walking forward → curtains part → the birthday room is revealed. */
function Curtain({ onNext }) {
	const reduced = useReducedMotion();
	const [stage, setStage] = useState("walk");
	useEffect(() => {
		const audio = new Audio(khulja_default);
		let stageTimer;
		const initTimer = setTimeout(() => {
			audio.onplay = () => {
				setStage("open");
				sfx.curtain();
				stageTimer = setTimeout(() => setStage("room"), 2e3);
			};
			audio.play().catch(() => {
				setStage("open");
				sfx.curtain();
				stageTimer = setTimeout(() => setStage("room"), 2e3);
			});
		}, reduced ? 600 : 2600);
		return () => {
			clearTimeout(initTimer);
			clearTimeout(stageTimer);
			audio.pause();
		};
	}, [reduced]);
	return /* @__PURE__ */ jsxs(Scene, {
		dark: true,
		className: "bg-[#1b1010]",
		children: [
			/* @__PURE__ */ jsx(Particles, { count: 18 }),
			/* @__PURE__ */ jsx(Grain, {}),
			/* @__PURE__ */ jsxs(motion.div, {
				className: "absolute inset-0 flex flex-col items-center justify-center",
				initial: {
					scale: 1.25,
					opacity: .25
				},
				animate: {
					scale: stage === "walk" ? 1.25 : 1,
					opacity: stage === "walk" ? .3 : 1
				},
				transition: {
					duration: 3.2,
					ease: "easeInOut"
				},
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,color-mix(in_oklab,var(--gold)_38%,transparent),transparent_60%)]" }),
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": true,
						className: "absolute top-10 flex w-full justify-center gap-4 text-xl opacity-80",
						children: Array.from({ length: 9 }, (_, i) => /* @__PURE__ */ jsx(motion.span, {
							animate: reduced ? {} : { opacity: [
								.35,
								1,
								.35
							] },
							transition: {
								duration: 2.4,
								repeat: Infinity,
								delay: i * .22
							},
							children: "✨"
						}, i))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: `relative z-10 flex flex-col items-center transition-transform duration-700 ${stage === "room" ? "-translate-y-32 sm:-translate-y-36" : ""}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-6xl sm:text-7xl",
							children: "🎂"
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex gap-3 text-3xl",
							children: [
								/* @__PURE__ */ jsx("span", { children: "🌸" }),
								/* @__PURE__ */ jsx("span", { children: "🖼️" }),
								/* @__PURE__ */ jsx("span", { children: "🕯️" }),
								/* @__PURE__ */ jsx("span", { children: "🌷" })
							]
						})]
					})
				]
			}),
			["left", "right"].map((side) => /* @__PURE__ */ jsx(motion.div, {
				"aria-hidden": true,
				className: "absolute top-0 bottom-0 w-1/2 bg-[linear-gradient(90deg,#4a1220,#7a1f33,#4a1220)] shadow-[0_0_80px_rgba(0,0,0,0.6)]",
				style: side === "left" ? { left: 0 } : { right: 0 },
				initial: { x: 0 },
				animate: { x: stage === "walk" ? 0 : side === "left" ? "-102%" : "102%" },
				transition: {
					duration: reduced ? .5 : 2,
					ease: [
						.4,
						0,
						.2,
						1
					]
				}
			}, side)),
			/* @__PURE__ */ jsxs("div", {
				className: `relative z-20 flex flex-col items-center text-center ${stage === "room" ? "translate-y-20 sm:translate-y-24" : ""}`,
				children: [stage === "walk" && /* @__PURE__ */ jsx(Line, {
					delay: .8,
					className: "hand text-2xl text-ivory/90",
					children: "come closer..."
				}), stage === "room" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsxs(Line, {
						as: "h1",
						className: "font-display text-4xl text-ivory sm:text-5xl",
						children: [
							"For ",
							story.birthdayName,
							" ❤️"
						]
					}),
					/* @__PURE__ */ jsx(Line, {
						delay: .7,
						className: "mt-3 text-ivory/70",
						children: "I built you a little universe."
					}),
					/* @__PURE__ */ jsx(Line, {
						delay: 1.3,
						className: "mt-8",
						children: /* @__PURE__ */ jsx(StoryButton, {
							tone: "gold",
							onClick: onNext,
							children: "Come in 🕯️"
						})
					})
				] })]
			})
		]
	});
}
//#endregion
//#region src/components/Characters.tsx
/**
* Original hand-drawn style cartoon characters.
* Change colours in CHARACTER_LOOK to customise their appearance.
*/
var CHARACTER_LOOK = {
	her: {
		hair: "#5a2e22",
		skin: "#f3c9a8",
		outfit: "#e58b8b",
		accent: "#f6d36b"
	},
	him: {
		hair: "#2e1f1a",
		skin: "#e7b690",
		outfit: "#7a2b3a",
		accent: "#f2e6d0"
	}
};
var STROKE = "#3a1f1a";
function Face({ mood, cx, cy }) {
	const reduced = useReducedMotion();
	const eyeY = cy - 2;
	const eye = (x) => mood === "shocked" ? /* @__PURE__ */ jsx("circle", {
		cx: x,
		cy: eyeY,
		r: 4.2,
		fill: "#fff",
		stroke: STROKE,
		strokeWidth: 2
	}) : mood === "excited" ? /* @__PURE__ */ jsx("path", {
		d: `M${x - 4} ${eyeY + 1} q4 -6 8 0`,
		stroke: STROKE,
		strokeWidth: 2.4,
		fill: "none",
		strokeLinecap: "round"
	}) : /* @__PURE__ */ jsx(motion.ellipse, {
		cx: x,
		cy: eyeY,
		rx: 2.6,
		ry: 3.4,
		fill: STROKE,
		animate: reduced ? {} : { ry: [
			3.4,
			3.4,
			.3,
			3.4
		] },
		transition: {
			duration: 4,
			repeat: Infinity,
			times: [
				0,
				.9,
				.95,
				1
			]
		}
	});
	const mouth = mood === "shocked" ? /* @__PURE__ */ jsx("ellipse", {
		cx,
		cy: cy + 10,
		rx: 3.5,
		ry: 4.5,
		fill: STROKE
	}) : mood === "nervous" ? /* @__PURE__ */ jsx("path", {
		d: `M${cx - 6} ${cy + 11} q3 -3 6 0 q3 3 6 0`,
		stroke: STROKE,
		strokeWidth: 2,
		fill: "none",
		strokeLinecap: "round"
	}) : /* @__PURE__ */ jsx("path", {
		d: `M${cx - 6} ${cy + 8} q6 7 12 0`,
		stroke: STROKE,
		strokeWidth: 2.2,
		fill: mood === "excited" ? "#b3444f" : "none",
		strokeLinecap: "round"
	});
	return /* @__PURE__ */ jsxs("g", { children: [
		eye(cx - 9),
		eye(cx + 9),
		(mood === "blush" || mood === "happy" || mood === "excited") && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("ellipse", {
			cx: cx - 15,
			cy: cy + 6,
			rx: 4.5,
			ry: 2.6,
			fill: "#f08f8f",
			opacity: .6
		}), /* @__PURE__ */ jsx("ellipse", {
			cx: cx + 15,
			cy: cy + 6,
			rx: 4.5,
			ry: 2.6,
			fill: "#f08f8f",
			opacity: .6
		})] }),
		mood === "nervous" && /* @__PURE__ */ jsx("path", {
			d: `M${cx + 20} ${cy - 16} q3 6 0 9 q-3 -3 0 -9`,
			fill: "#9fd3e8",
			stroke: STROKE,
			strokeWidth: 1
		}),
		mouth
	] });
}
function motionFor(mood, reduced) {
	if (reduced) return {};
	if (mood === "excited") return { y: [
		0,
		-16,
		0
	] };
	if (mood === "shocked") return { rotate: [
		0,
		-4,
		4,
		0
	] };
	if (mood === "nervous") return { x: [
		0,
		-2,
		2,
		0
	] };
	return { y: [
		0,
		-3,
		0
	] };
}
function Her({ mood = "happy", size = 120, className = "" }) {
	const reduced = useReducedMotion();
	const c = CHARACTER_LOOK.her;
	return /* @__PURE__ */ jsxs(motion.svg, {
		viewBox: "0 0 100 130",
		width: size,
		height: size * 1.3,
		className,
		animate: motionFor(mood, reduced),
		transition: {
			duration: mood === "excited" ? .6 : 2.4,
			repeat: Infinity,
			ease: "easeInOut"
		},
		"aria-label": "Her cartoon",
		role: "img",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M18 50 Q14 90 28 96 L72 96 Q86 90 82 50 Q78 14 50 14 Q22 14 18 50Z",
				fill: c.hair,
				stroke: STROKE,
				strokeWidth: 2.5
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M28 128 Q28 96 50 94 Q72 96 72 128Z",
				fill: c.outfit,
				stroke: STROKE,
				strokeWidth: 2.5
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: 50,
				cy: 52,
				r: 27,
				fill: c.skin,
				stroke: STROKE,
				strokeWidth: 2.5
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M24 46 Q34 24 52 26 Q70 24 77 46 Q62 36 50 40 Q36 36 24 46Z",
				fill: c.hair,
				stroke: STROKE,
				strokeWidth: 2
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M68 24 l10 -6 l-2 12z M68 24 l-8 -8 l-2 12z",
				fill: c.accent,
				stroke: STROKE,
				strokeWidth: 1.8
			}),
			/* @__PURE__ */ jsx(Face, {
				mood,
				cx: 50,
				cy: 54
			})
		]
	});
}
function Him({ mood = "happy", size = 110, className = "" }) {
	const reduced = useReducedMotion();
	const c = CHARACTER_LOOK.him;
	return /* @__PURE__ */ jsxs(motion.svg, {
		viewBox: "0 0 100 130",
		width: size,
		height: size * 1.3,
		className,
		animate: motionFor(mood, reduced),
		transition: {
			duration: mood === "excited" ? .55 : 2.6,
			repeat: Infinity,
			ease: "easeInOut"
		},
		"aria-label": "Me cartoon",
		role: "img",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M26 128 Q26 96 50 94 Q74 96 74 128Z",
				fill: c.outfit,
				stroke: STROKE,
				strokeWidth: 2.5
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M44 96 l6 8 l6 -8",
				fill: c.accent,
				stroke: STROKE,
				strokeWidth: 1.8
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: 50,
				cy: 54,
				r: 27,
				fill: c.skin,
				stroke: STROKE,
				strokeWidth: 2.5
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M22 50 Q20 24 48 22 Q80 20 78 48 Q70 34 56 36 Q58 30 50 30 Q44 38 22 50Z",
				fill: c.hair,
				stroke: STROKE,
				strokeWidth: 2.2
			}),
			/* @__PURE__ */ jsx(Face, {
				mood,
				cx: 50,
				cy: 56
			})
		]
	});
}
//#endregion
//#region src/assets/ending.mp4
var ending_default = "/assets/ending-BHs2_M8Z.mp4";
//#endregion
//#region src/components/scenes/Final.tsx
function Final({ onReplay }) {
	const [moon, setMoon] = useState(false);
	const [audioFinished, setAudioFinished] = useState(false);
	useRef(false);
	const audioRef = useRef(null);
	const lines = story.final;
	useEffect(() => {
		let isActive = true;
		let t;
		const audio = new Audio(ending_default);
		audioRef.current = audio;
		audio.onended = () => {
			if (isActive) setAudioFinished(true);
		};
		const delaySeconds = .5 + lines.length * 1.6;
		t = setTimeout(() => {
			if (!isActive) return;
			audio.play().catch(() => {
				if (isActive) setAudioFinished(true);
			});
		}, delaySeconds * 1e3);
		return () => {
			isActive = false;
			clearTimeout(t);
		};
	}, [lines.length]);
	return /* @__PURE__ */ jsxs(Scene, {
		dark: true,
		children: [
			/* @__PURE__ */ jsx(Particles, {
				count: 30,
				tone: "cool"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setMoon((m) => !m),
				"aria-label": "The moon",
				className: "absolute top-8 right-8 text-4xl opacity-80 transition hover:opacity-100",
				children: "🌙"
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: moon && /* @__PURE__ */ jsx(motion.p, {
				initial: {
					opacity: 0,
					y: -6
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: { opacity: 0 },
				className: "absolute top-20 right-6 max-w-56 rounded-xl bg-ivory/10 p-3 text-right hand text-lg text-ivory",
				children: story.easterEggs.moon
			}) }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex max-w-md flex-col items-center text-center",
				children: [
					lines.map((l, i) => /* @__PURE__ */ jsx(Line, {
						delay: .5 + i * 1.6,
						className: i === 2 || i === 4 ? "mt-5 font-display text-3xl text-gold" : "mt-4 text-lg text-ivory/85",
						children: l
					}, l)),
					/* @__PURE__ */ jsxs(Line, {
						delay: .5 + lines.length * 1.6,
						className: "mt-8 flex items-end",
						children: [/* @__PURE__ */ jsx(Him, {
							size: 60,
							mood: "blush"
						}), /* @__PURE__ */ jsx(Her, {
							size: 64,
							mood: "blush"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 min-h-[4rem]",
						children: /* @__PURE__ */ jsx(AnimatePresence, { children: audioFinished && /* @__PURE__ */ jsx(Line, {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx(StoryButton, {
								tone: "gold",
								onClick: onReplay,
								children: "Replay our story ↻"
							})
						}) })
					})
				]
			})
		]
	});
}
//#endregion
//#region src/assets/starting.mpeg
var starting_default = "/assets/starting-H1x3ITBl.mpeg";
//#endregion
//#region src/components/scenes/Opening.tsx
function Opening({ onYes }) {
	const [hasEntered, setHasEntered] = useState(false);
	const [refused, setRefused] = useState(false);
	const [canContinue, setCanContinue] = useState(false);
	const audioPlayed = useRef(false);
	const t = story.opening;
	useEffect(() => {
		if (!hasEntered) return;
		if (audioPlayed.current) return;
		audioPlayed.current = true;
		const audio = new Audio(starting_default);
		Promise.all([new Promise((resolve) => setTimeout(resolve, 5e3)), new Promise((resolve) => {
			audio.onended = resolve;
			audio.play().catch(() => {
				resolve(void 0);
			});
		})]).then(() => {
			setCanContinue(true);
		});
		return () => {};
	}, [hasEntered]);
	if (!hasEntered) return /* @__PURE__ */ jsxs(Scene, {
		className: "bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--peach)_45%,transparent),transparent_65%)]",
		children: [
			/* @__PURE__ */ jsx(Particles, { count: 26 }),
			/* @__PURE__ */ jsx(Grain, {}),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 flex w-full max-w-md flex-col items-center text-center",
				children: /* @__PURE__ */ jsx(StoryButton, {
					tone: "gold",
					heartbeat: true,
					onClick: () => setHasEntered(true),
					children: "Tap to enter ✨"
				})
			})
		]
	});
	return /* @__PURE__ */ jsxs(Scene, {
		className: "bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--peach)_45%,transparent),transparent_65%)]",
		children: [
			/* @__PURE__ */ jsx(Particles, { count: 26 }),
			/* @__PURE__ */ jsx(Grain, {}),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 flex w-full max-w-md flex-col items-center text-center",
				children: /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "wait",
					children: !refused ? /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center",
						children: [
							/* @__PURE__ */ jsx(Line, {
								as: "h1",
								className: "font-display text-4xl text-wine sm:text-5xl",
								children: t.question
							}),
							"subQuestion" in t && t.subQuestion && /* @__PURE__ */ jsx(Line, {
								delay: .8,
								className: "mt-3 text-lg text-cocoa",
								children: t.subQuestion
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-10 min-h-[4rem] w-full",
								children: canContinue && /* @__PURE__ */ jsxs(Line, {
									className: "flex flex-wrap justify-center gap-4",
									children: [/* @__PURE__ */ jsx(StoryButton, {
										tone: "yes",
										heartbeat: true,
										onClick: onYes,
										children: t.yes
									}), /* @__PURE__ */ jsx(StoryButton, {
										tone: "no",
										onClick: () => {
											sfx.soft();
											setRefused(true);
										},
										children: t.no
									})]
								})
							})
						]
					}, "ask") : /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center",
						children: [
							/* @__PURE__ */ jsx(Him, {
								size: 100,
								mood: "shocked"
							}),
							/* @__PURE__ */ jsx(Line, {
								className: "mt-2 font-display text-4xl text-wine",
								children: "EXCUSE ME??? 😭"
							}),
							t.noReply.slice(1).map((l, i) => /* @__PURE__ */ jsx(Line, {
								delay: .3 + i * .5,
								className: "mt-3 font-display text-3xl text-wine",
								children: l
							}, l)),
							t.noRetry.map((l, i) => /* @__PURE__ */ jsx(Line, {
								delay: 1.5 + i * .4,
								className: "mt-2 text-muted-foreground",
								children: l
							}, l)),
							/* @__PURE__ */ jsx(Line, {
								delay: 2.4,
								className: "mt-8",
								children: /* @__PURE__ */ jsx(StoryButton, {
									tone: "yes",
									heartbeat: true,
									onClick: () => setRefused(false),
									children: t.noButton
								})
							})
						]
					}, "refused")
				})
			})
		]
	});
}
//#endregion
//#region src/assets/peace.mp4
var peace_default = "/assets/peace-Ilevablj.mp4";
//#endregion
//#region src/components/scenes/Photos.tsx
function Photos({ onNext }) {
	const [open, setOpen] = useState(null);
	const [audioFinished, setAudioFinished] = useState(false);
	useRef(false);
	useEffect(() => {
		let isActive = true;
		const audio = new Audio(peace_default);
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
	}, []);
	return /* @__PURE__ */ jsxs(Scene, { children: [
		/* @__PURE__ */ jsx(Particles, { count: 14 }),
		/* @__PURE__ */ jsx(Grain, {}),
		/* @__PURE__ */ jsxs("div", {
			className: "relative z-10 flex w-full max-w-4xl flex-col items-center",
			children: [
				/* @__PURE__ */ jsx(Line, {
					as: "h2",
					className: "text-center font-display text-3xl text-wine sm:text-4xl",
					children: "Our little photo wall"
				}),
				/* @__PURE__ */ jsx(Line, {
					delay: .5,
					className: "mt-2 hand text-xl text-cocoa/80",
					children: "tap one 👀"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-10 flex w-full flex-wrap items-start justify-center gap-6",
					children: story.photos.map((p, i) => /* @__PURE__ */ jsxs(motion.button, {
						onClick: () => {
							sfx.soft();
							setOpen(p);
						},
						initial: {
							opacity: 0,
							y: 24,
							rotate: p.rotate
						},
						animate: {
							opacity: 1,
							y: [
								0,
								-6,
								0
							],
							rotate: p.rotate
						},
						transition: {
							opacity: {
								duration: .7,
								delay: i * .15
							},
							y: {
								duration: 7 + i,
								repeat: Infinity,
								ease: "easeInOut"
							}
						},
						whileHover: {
							scale: 1.04,
							rotate: 0
						},
						whileTap: { scale: .97 },
						className: `tape paper relative rounded-md p-3 pb-5 focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none ${p.large ? "w-[80%] max-w-sm sm:w-80" : "w-[46%] max-w-56 sm:w-56"}`,
						children: [
							/* @__PURE__ */ jsx("img", {
								src: p.src,
								alt: p.caption,
								loading: "lazy",
								width: 816,
								height: 816,
								className: "aspect-square w-full rounded-sm object-cover"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "hand mt-2 text-center text-lg text-cocoa",
								children: p.caption
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-center text-[11px] text-muted-foreground",
								children: p.date
							})
						]
					}, p.caption + i))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 min-h-[4rem]",
					children: /* @__PURE__ */ jsx(AnimatePresence, { children: audioFinished && /* @__PURE__ */ jsx(Line, {
						className: "flex justify-center",
						children: /* @__PURE__ */ jsx(StoryButton, {
							tone: "gold",
							onClick: onNext,
							children: "Okay, next ❤️"
						})
					}) })
				})
			]
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-50 flex items-center justify-center bg-night/70 p-5 backdrop-blur-sm",
			onClick: () => setOpen(null),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": open.caption,
			children: /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					scale: .92,
					y: 16
				},
				animate: {
					scale: 1,
					y: 0
				},
				exit: {
					scale: .95,
					opacity: 0
				},
				onClick: (e) => e.stopPropagation(),
				className: "paper w-full max-w-md rounded-2xl p-4",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: open.src,
						alt: open.caption,
						loading: "lazy",
						className: "max-h-[55svh] w-full rounded-lg object-cover"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "hand mt-3 text-2xl text-cocoa",
						children: open.caption
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: open.date
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-cocoa/80",
						children: open.note
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 text-right",
						children: /* @__PURE__ */ jsx(StoryButton, {
							tone: "quiet",
							onClick: () => setOpen(null),
							children: "Close"
						})
					})
				]
			})
		}) })
	] });
}
//#endregion
//#region src/assets/Playful School Portrait Duo.png
var Playful_School_Portrait_Duo_default = "/assets/Playful%20School%20Portrait%20Duo-BeVXkv2b.png";
//#endregion
//#region src/assets/yes.mp4
var yes_default = "/assets/yes-DY2__coR.mp4";
//#endregion
//#region src/assets/date.mp4
var date_default = "/assets/date-Ea5IBsnI.mp4";
//#endregion
//#region src/components/scenes/Questions.tsx
function Question({ lead, question, small, yesLines, onDone, doneLabel, noPopupPhoto, withPhotoMoment, yesAudioSrc, askAudioSrc }) {
	const [mood, setMood] = useState("hopeful");
	const [state, setState] = useState("ask");
	const [audioFinished, setAudioFinished] = useState(!yesAudioSrc);
	useRef(false);
	useRef(null);
	const [askAudioFinished, setAskAudioFinished] = useState(!askAudioSrc);
	useRef(false);
	useRef(null);
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
		if (withPhotoMoment) setState("photo-moment");
		else {
			setState("yes");
			setMood("celebrate");
		}
	};
	return /* @__PURE__ */ jsxs(Scene, {
		className: "bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--blush)_50%,transparent),transparent_70%)]",
		children: [
			/* @__PURE__ */ jsx(Particles, { count: 14 }),
			/* @__PURE__ */ jsx(Grain, {}),
			state === "yes" && /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx(Confetti, {}),
				/* @__PURE__ */ jsx(Fireworks, { bursts: 4 }),
				/* @__PURE__ */ jsx(FloatingHearts, { count: 8 })
			] }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: state === "no" && noPopupPhoto && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center bg-night/80 px-5 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						scale: .85,
						y: 20
					},
					animate: {
						scale: 1,
						y: 0
					},
					exit: {
						scale: .9,
						opacity: 0
					},
					className: "paper flex w-full max-w-md flex-col items-center rounded-3xl border-2 border-wine/20 p-6 text-center shadow-2xl",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: noPopupPhoto,
							alt: "Hawww",
							className: "h-64 w-64 rounded-2xl object-cover shadow-lg"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-5 font-display text-2xl leading-relaxed text-wine whitespace-pre-line",
							children: [
								"Hawww tum mujhe pyaar nhi kartiii 😭\n",
								"itne bure din agayeee kyaaaa\n",
								"bed se kud jaunga meinnn\n",
								"wapas se try maro 😭❤️"
							]
						}),
						/* @__PURE__ */ jsx(StoryButton, {
							tone: "yes",
							className: "mt-6 w-full",
							onClick: () => {
								setState("ask");
								setMood("hopeful");
							},
							children: "Okay okay 😭❤️"
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex w-full max-w-xl flex-col items-center text-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-end gap-2",
					children: [/* @__PURE__ */ jsx(Him, {
						size: 78,
						mood: state === "yes" || state === "photo-moment" ? "excited" : state === "no" ? "shocked" : mood === "nervous" ? "nervous" : "blush"
					}), /* @__PURE__ */ jsx(Her, {
						size: 84,
						mood: state === "yes" || state === "photo-moment" ? "excited" : "happy"
					})]
				}), /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "wait",
					children: state === "photo-moment" ? /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							scale: .8
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						className: "flex flex-col items-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mt-6 rounded-3xl border-4 border-wine/20 bg-ivory p-3 shadow-2xl rotate-2",
								children: /* @__PURE__ */ jsx("img", {
									src: Playful_School_Portrait_Duo_default,
									alt: "Us",
									className: "h-64 w-64 rounded-2xl object-cover"
								})
							}),
							/* @__PURE__ */ jsx(Line, {
								delay: .4,
								className: "mt-8 max-w-sm text-center font-display text-3xl text-wine sm:text-4xl",
								children: "Kya tagda pose maar rahi hooo my loveee 😭❤️📸"
							}),
							/* @__PURE__ */ jsx(Line, {
								delay: 1.2,
								className: "mt-8",
								children: /* @__PURE__ */ jsx(StoryButton, {
									tone: "gold",
									heartbeat: true,
									onClick: () => {
										setState("yes");
										setMood("celebrate");
									},
									children: "Okay okay youuu slayyy zindaaa gorlll dil hi faad diyaaa😭❤️"
								})
							})
						]
					}, "photo-moment") : state !== "yes" ? /* @__PURE__ */ jsxs(motion.div, {
						exit: { opacity: 0 },
						className: "flex flex-col items-center",
						children: [
							lead.map((l, i) => /* @__PURE__ */ jsx(Line, {
								delay: i * .9,
								className: "mt-4 hand text-2xl text-cocoa",
								children: l
							}, l)),
							/* @__PURE__ */ jsxs(motion.div, {
								initial: {
									opacity: 0,
									scale: .8,
									rotate: -4
								},
								animate: {
									opacity: 1,
									scale: 1,
									rotate: -1
								},
								transition: {
									delay: lead.length * .9 + .3,
									type: "spring",
									stiffness: 120
								},
								className: "paper mt-6 w-full rounded-2xl border-2 border-wine/30 px-5 py-6",
								children: [
									/* @__PURE__ */ jsx("h2", {
										className: "font-display text-3xl text-wine sm:text-4xl",
										children: question
									}),
									small && /* @__PURE__ */ jsx("p", {
										className: "mt-3 text-sm text-muted-foreground",
										children: small
									}),
									state === "no" && !noPopupPhoto && /* @__PURE__ */ jsx("p", {
										className: "mt-3 hand text-xl text-rose",
										children: "wrong button 😭 the animals are crying. try again?"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-6 min-h-[4rem]",
										children: /* @__PURE__ */ jsx(AnimatePresence, { children: askAudioFinished && /* @__PURE__ */ jsxs(motion.div, {
											initial: {
												opacity: 0,
												y: 10
											},
											animate: {
												opacity: 1,
												y: 0
											},
											className: "flex flex-wrap justify-center gap-4",
											children: [/* @__PURE__ */ jsx(StoryButton, {
												tone: "yes",
												heartbeat: true,
												onClick: sayYes,
												onMouseEnter: () => setMood("celebrate"),
												onMouseLeave: () => setMood("hopeful"),
												children: "YES ❤️"
											}), /* @__PURE__ */ jsx(StoryButton, {
												tone: "no",
												onClick: () => {
													setState("no");
													setMood("nervous");
												},
												onMouseEnter: () => setMood("nervous"),
												onMouseLeave: () => setMood("hopeful"),
												children: "NO 🥺"
											})]
										}) })
									})
								]
							}),
							/* @__PURE__ */ jsx(Animals, { mood })
						]
					}, "ask") : /* @__PURE__ */ jsxs(motion.div, {
						className: "flex flex-col items-center",
						children: [
							yesLines.map((l, i) => /* @__PURE__ */ jsx(Line, {
								delay: i * 1.4,
								className: i === 0 ? "mt-6 font-display text-4xl text-wine sm:text-5xl" : "mt-4 text-lg text-cocoa",
								children: l
							}, l)),
							/* @__PURE__ */ jsx(Animals, { mood: "celebrate" }),
							/* @__PURE__ */ jsx("div", {
								className: "mt-8 min-h-[4rem]",
								children: /* @__PURE__ */ jsx(AnimatePresence, { children: audioFinished && /* @__PURE__ */ jsx(Line, {
									className: "flex justify-center",
									children: /* @__PURE__ */ jsx(StoryButton, {
										tone: "gold",
										onClick: onDone,
										children: doneLabel
									})
								}) })
							})
						]
					}, "yes")
				})]
			})
		]
	});
}
function ValentineQuestion({ onNext }) {
	const v = story.valentine;
	return /* @__PURE__ */ jsx(Question, {
		lead: [v.lead],
		question: v.question,
		small: v.small,
		yesLines: v.yesLines,
		onDone: onNext,
		doneLabel: "Hehe, what next? 👀",
		noPopupPhoto: v.noPhoto,
		withPhotoMoment: true,
		yesAudioSrc: yes_default
	});
}
function DateQuestion({ onNext }) {
	const d = story.dateAsk;
	return /* @__PURE__ */ jsx(Question, {
		lead: ["Okay... one more thing.", d.lead],
		question: d.question,
		yesLines: d.yesLines,
		onDone: onNext,
		doneLabel: "So where are we going? 🥺",
		noPopupPhoto: d.noPhoto,
		askAudioSrc: date_default
	});
}
//#endregion
//#region src/components/scenes/Reveal.tsx
var STOPS = [
	"🌙 a quiet street...",
	"🎪 the cinema entrance",
	"🎟️ ticket booth",
	"🍿 popcorn stand",
	"🚪 theatre doors"
];
function Reveal({ onNext }) {
	const reduced = useReducedMotion();
	const [step, setStep] = useState(0);
	useEffect(() => {
		sfx.cinema();
		if (step >= STOPS.length) return;
		const t = setTimeout(() => setStep((s) => s + 1), reduced ? 500 : 1500);
		return () => clearTimeout(t);
	}, [step, reduced]);
	const arrived = step >= STOPS.length;
	return /* @__PURE__ */ jsxs(Scene, {
		dark: true,
		children: [
			/* @__PURE__ */ jsx(Particles, {
				count: 20,
				tone: "cool"
			}),
			/* @__PURE__ */ jsx(Grain, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex w-full max-w-xl flex-col items-center text-center",
				children: [
					/* @__PURE__ */ jsx(Line, {
						as: "h1",
						className: "font-display text-5xl text-gold sm:text-6xl",
						children: story.dateAsk.reveal
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 rounded-2xl border-4 border-gold/70 bg-wine px-6 py-3 shadow-[0_0_40px_-8px_var(--gold)]",
						children: /* @__PURE__ */ jsx("p", {
							className: "hand text-2xl text-ivory",
							children: "Cinema of Us ✨"
						})
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						className: "mt-8 flex items-end",
						animate: reduced ? {} : { x: arrived ? 0 : [
							-20,
							20,
							-20
						] },
						transition: {
							duration: 2,
							repeat: arrived ? 0 : Infinity
						},
						children: [/* @__PURE__ */ jsx(Him, {
							size: 70,
							mood: arrived ? "blush" : "happy"
						}), /* @__PURE__ */ jsx(Her, {
							size: 76,
							mood: arrived ? "excited" : "happy"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 h-8",
						children: !arrived && /* @__PURE__ */ jsx(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							className: "text-ivory/80",
							children: STOPS[step]
						}, step)
					}),
					arrived && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Line, {
						className: "font-display text-2xl text-ivory",
						children: story.dateAsk.welcome
					}), /* @__PURE__ */ jsx(Line, {
						delay: .6,
						className: "mt-8",
						children: /* @__PURE__ */ jsx(StoryButton, {
							tone: "gold",
							onClick: onNext,
							children: "Take our seats 🎟️"
						})
					})] })
				]
			})
		]
	});
}
//#endregion
//#region src/assets/tagdi.jpeg
var tagdi_default = "/assets/tagdi-ctBH0qko.jpeg";
//#endregion
//#region src/assets/shayari.mp4
var shayari_default = "/assets/shayari-sxKUo7LF.mp4";
//#endregion
//#region src/components/scenes/Shayari.tsx
/** Typewriter reveal, one line at a time. */
function useTypewriter(lines, speed = 45) {
	const reduced = useReducedMotion();
	const [line, setLine] = useState(0);
	const [chars, setChars] = useState(0);
	useEffect(() => {
		if (reduced) {
			setLine(lines.length);
			return;
		}
		if (line >= lines.length) return;
		if (chars < (lines[line] ?? "").length) {
			const t = setTimeout(() => setChars((c) => c + 1), speed);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => {
			setLine((l) => l + 1);
			setChars(0);
		}, 700);
		return () => clearTimeout(t);
	}, [
		line,
		chars,
		lines,
		speed,
		reduced
	]);
	return {
		line,
		chars,
		done: line >= lines.length
	};
}
function Shayari({ onNext }) {
	const s = story.shayari;
	const { line, chars, done } = useTypewriter(s.lines);
	const firstLineLength = s.lines[0]?.length || 0;
	const audioPlayed = useRef(false);
	const audioRef = useRef(null);
	useEffect(() => {
		if (audioPlayed.current) return;
		const triggerThreshold = Math.max(1, firstLineLength - 5);
		if (line === 0 && chars >= triggerThreshold || line > 0) {
			audioPlayed.current = true;
			const audio = new Audio(shayari_default);
			audioRef.current = audio;
			audio.play().catch(() => {});
		}
	}, [
		line,
		chars,
		firstLineLength
	]);
	return /* @__PURE__ */ jsxs(Scene, {
		className: "bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--gold)_40%,transparent),transparent_55%)]",
		children: [
			/* @__PURE__ */ jsx(Particles, { count: 10 }),
			/* @__PURE__ */ jsx(Grain, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex w-full max-w-lg flex-col items-center",
				children: [
					/* @__PURE__ */ jsxs(Line, {
						as: "div",
						delay: .2,
						className: "relative mb-8 mt-4 flex justify-center",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-[-10px] animate-pulse rounded-full bg-gold/70 blur-2xl" }),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 animate-pulse rounded-full bg-yellow-300 blur-3xl opacity-60" }),
							/* @__PURE__ */ jsx("img", {
								src: tagdi_default,
								alt: "My Love",
								className: "relative z-10 h-56 w-56 rounded-3xl border-4 border-gold/40 object-cover shadow-[0_0_60px_rgba(255,215,0,0.4)]"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-end gap-2",
						children: [/* @__PURE__ */ jsx(Him, {
							size: 64,
							mood: "blush"
						}), /* @__PURE__ */ jsx("span", {
							className: "mb-4 text-2xl",
							children: "🪔✍️"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "paper relative mt-4 w-full rotate-[-1deg] rounded-lg px-6 py-8 sm:px-10",
						children: [
							/* @__PURE__ */ jsx("span", {
								"aria-hidden": true,
								className: "absolute top-3 right-4 text-lg",
								children: "🌸"
							}),
							/* @__PURE__ */ jsx(Line, {
								as: "h2",
								className: "font-display text-2xl text-wine",
								children: s.title
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-5 min-h-40 space-y-2 hand text-2xl text-cocoa",
								"aria-live": "polite",
								children: s.lines.map((l, i) => i < line ? /* @__PURE__ */ jsx("p", { children: l }, i) : i === line ? /* @__PURE__ */ jsxs("p", { children: [l.slice(0, chars), /* @__PURE__ */ jsx("span", {
									className: "animate-pulse",
									children: "|"
								})] }, i) : null)
							}),
							done && /* @__PURE__ */ jsx("p", {
								className: "mt-6 text-right hand text-xl text-rose",
								children: s.signature
							})
						]
					}),
					done && /* @__PURE__ */ jsx(Line, {
						delay: .4,
						className: "mt-8",
						children: /* @__PURE__ */ jsx(StoryButton, {
							tone: "gold",
							onClick: onNext,
							children: "Continue ✨"
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/scenes/Universe.tsx
var TILTS = [
	-3,
	2,
	-1.5,
	3,
	-2,
	1
];
function Universe({ onNext }) {
	const [open, setOpen] = useState(null);
	return /* @__PURE__ */ jsxs(Scene, { children: [
		/* @__PURE__ */ jsx(Particles, { count: 12 }),
		/* @__PURE__ */ jsx(Grain, {}),
		/* @__PURE__ */ jsxs("div", {
			className: "relative z-10 flex w-full max-w-3xl flex-col items-center",
			children: [
				/* @__PURE__ */ jsx(Line, {
					as: "h2",
					className: "text-center font-display text-4xl text-wine",
					children: "Our Little Universe ❤️"
				}),
				/* @__PURE__ */ jsx(Line, {
					delay: .4,
					className: "mt-1 hand text-xl text-cocoa/80",
					children: "open the little cards"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 grid w-full grid-cols-2 gap-4 sm:gap-6",
					children: story.memories.map((m, i) => /* @__PURE__ */ jsxs(motion.button, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0,
							rotate: TILTS[i % TILTS.length] ?? 0
						},
						transition: { delay: i * .12 },
						whileHover: {
							rotate: 0,
							scale: 1.03
						},
						whileTap: { scale: .97 },
						onClick: () => setOpen(m),
						className: "tape paper relative rounded-xl p-5 text-left focus-visible:ring-2 focus-visible:ring-rose focus-visible:outline-none",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-3xl",
								children: m.emoji
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 font-display text-lg text-wine",
								children: m.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: m.date
							})
						]
					}, m.title + i))
				}),
				/* @__PURE__ */ jsx(Line, {
					delay: .8,
					className: "mt-10",
					children: /* @__PURE__ */ jsx(StoryButton, {
						tone: "gold",
						onClick: onNext,
						children: "One last thing... 🌙"
					})
				})
			]
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-50 flex items-center justify-center bg-night/70 p-5 backdrop-blur-sm",
			onClick: () => setOpen(null),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": open.title,
			children: /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					scale: .9,
					rotate: -3
				},
				animate: {
					scale: 1,
					rotate: -1
				},
				onClick: (e) => e.stopPropagation(),
				className: "paper w-full max-w-sm rounded-2xl p-6",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-4xl",
						children: open.emoji
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-2 text-2xl text-wine",
						children: open.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: open.date
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 hand text-xl text-cocoa",
						children: open.body
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 text-right",
						children: /* @__PURE__ */ jsx(StoryButton, {
							tone: "quiet",
							onClick: () => setOpen(null),
							children: "Close"
						})
					})
				]
			})
		}) })
	] });
}
//#endregion
//#region src/lib/use-story-progress.ts
var SCENES = [
	"opening",
	"curtain",
	"cake",
	"message",
	"photos",
	"valentine",
	"date",
	"reveal",
	"shayari",
	"final"
];
var KEY = "our-little-universe:scene";
function useStoryProgress() {
	const [scene, setScene] = useState("opening");
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		try {
			const saved = localStorage.getItem(KEY);
			if (saved === "cinema") setScene("shayari");
			else if (saved && SCENES.includes(saved)) setScene(saved);
		} catch {}
		setHydrated(true);
	}, []);
	const go = useCallback((next) => {
		setScene(next);
		try {
			localStorage.setItem(KEY, next);
		} catch {}
		if (typeof window !== "undefined") window.scrollTo({ top: 0 });
	}, []);
	return {
		scene,
		hydrated,
		go,
		next: useCallback(() => {
			setScene((current) => {
				const i = SCENES.indexOf(current);
				const value = SCENES[Math.min(i + 1, SCENES.length - 1)] ?? current;
				try {
					localStorage.setItem(KEY, value);
				} catch {}
				if (typeof window !== "undefined") window.scrollTo({ top: 0 });
				return value;
			});
		}, []),
		restart: useCallback(() => go("opening"), [go])
	};
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Index() {
	const { scene, hydrated, next, restart } = useStoryProgress();
	if (!hydrated) return /* @__PURE__ */ jsx("main", { className: "min-h-[100svh] bg-background" });
	return /* @__PURE__ */ jsxs("main", {
		className: "relative min-h-[100svh] overflow-x-hidden",
		children: [
			/* @__PURE__ */ jsx(Overlay, {
				onRestart: restart,
				showRestart: scene !== "opening"
			}),
			/* @__PURE__ */ jsx(PlayfulAnimals, { scene }),
			/* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				children: /* @__PURE__ */ jsxs("div", { children: [
					scene === "opening" && /* @__PURE__ */ jsx(Opening, { onYes: next }),
					scene === "curtain" && /* @__PURE__ */ jsx(Curtain, { onNext: next }),
					scene === "cake" && /* @__PURE__ */ jsx(Candles, { onNext: next }),
					scene === "message" && /* @__PURE__ */ jsx(BirthdayMessage, { onNext: next }),
					scene === "photos" && /* @__PURE__ */ jsx(Photos, { onNext: next }),
					scene === "valentine" && /* @__PURE__ */ jsx(ValentineQuestion, { onNext: next }),
					scene === "date" && /* @__PURE__ */ jsx(DateQuestion, { onNext: next }),
					scene === "reveal" && /* @__PURE__ */ jsx(Reveal, { onNext: next }),
					scene === "shayari" && /* @__PURE__ */ jsx(Shayari, { onNext: next }),
					scene === "universe" && /* @__PURE__ */ jsx(Universe, { onNext: next }),
					scene === "final" && /* @__PURE__ */ jsx(Final, { onReplay: restart })
				] }, scene)
			})
		]
	});
}
//#endregion
export { Index as component };
