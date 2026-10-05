/**
 * ============================================================
 *  EVERYTHING YOU CAN CHANGE LIVES IN THIS ONE FILE.
 *  Change the text, names, photos, memories and the movie here.
 * ============================================================
 */

import memory1 from "@/assets/WhatsApp Image 2026-10-04 at 9.58.41 AM.jpeg";
import memory2 from "@/assets/WhatsApp Image 2026-10-04 at 9.59.02 AM.jpeg";
import memory3 from "@/assets/WhatsApp Image 2026-10-04 at 10.01.30 AM.jpeg";
import peaceImage from "@/assets/peace.png";
import moviePoster from "@/assets/movie-poster.jpg";
import crying from "@/assets/crying.png";

export type Photo = {
  src: string;
  caption: string;
  date: string;
  note: string;
  rotate: number;
};

export type Memory = {
  title: string;
  emoji: string;
  date: string;
  body: string;
};

export const story = {
  // ---------- WHO ----------
  birthdayName: "Nuha",
  nickname: "juicy mommy",
  birthdayAge: 19,

  // ---------- OPENING ----------
  opening: {
    question: "Are you ready for it chamak challo???",
    subQuestion: "(wanna be my chamak challo oho ohooo ohooooo)",
    yes: "YES ❤️",
    no: "NO 🥺",
    noReply: ["Excuse me??? 😭", "Mera nazuk dil hai fatak se try maro wapas"],
    noRetry: ["Okayyyyyyyy my loveeeeeeee", "Areyyyy haa kar do naaa 🥺"],
    noButton: "Fine ❤️",
  },

  // ---------- CANDLES ----------
  candles: {
    intro: "19 already?? but mein 100 saal ka hoon ❤️",
    mission: ["Okay birthday girl...", "first mission."],
    instruction: "Put out all 19 candles 🕯️",
    // Set to true to reveal one secret word per candle blown out.
    secretWordsEnabled: false,
    secretWords: [
      "you",
      "are",
      "the",
      "best",
      "thing",
      "that",
      "ever",
      "happened",
      "to",
      "me",
      "and",
      "i",
      "am",
      "never",
      "letting",
      "you",
      "go",
      "happy",
      "birthday nuha",
    ],
  },

  // ---------- BIRTHDAY MESSAGE ----------
  birthdayMessage: {
    heading: "HAPPY BIRTHDAY ❤️",
    lines: [
      "Happy birthday to the best nigga in the multiverse,",
      "the cutest, the baddest, the sweetest human alive.",
    ],
    love: "I love you, meri jaan. ❤️",
    handwritten: "Aaaahhhhhhh mein apse obssess hai senoritaaa",
  },

  // ---------- PHOTOS (swap these for your real ones) ----------
  photos: [
    {
      src: memory1,
      caption: "HOTTIEEE.....",
      date: "",
      note: "[OUR MEMORY]",
      rotate: -4,
    },
    {
      src: peaceImage,
      caption: "PEACE ✌️",
      date: "",
      note: "[OUR MEMORY]",
      rotate: 0,
      large: true,
    },
    {
      src: memory2,
      caption: "DIVAAA...",
      date: "",
      note: "[OUR MEMORY]",
      rotate: 3,
    },
    {
      src: memory3,
      caption: "BLEHHH",
      date: "",
      note: "[OUR MEMORY]",
      rotate: -2,
    },
  ] as Photo[],

  // ---------- VALENTINE ----------
  valentine: {
    lead: "I've been waiting for this moment...heheheheheheheheh.....",
    question: "Will you be my Valentine? ❤️",
    small:
      "(Mera birthday chodo paaji, tumhare birthday pe puchna tha... ab lag raha hai ekdum dashing)",
    yesLines: [
      "YESSSSSSS 😭❤️",
      "LIKE I HAVE ACHIEVED SOMETHINGGG.",
      "Toh iska matlabbb... mein samjhu hehehehhhe... DONE HAI YANI KI? 👀❤️",
      "Wese woh toh done hi haiii bus milo kabhi humeee choti bachiii..... ",
    ],
    noPhoto: crying,
  },

  // ---------- DATE ----------
  dateAsk: {
    lead: "So... now that you've decided to be my Valentine...(wese koi option bhi nhi tha thikkkk haiiiiii",
    question: "Now now nowwww.......If you don't mind... I would like to take you on a date. 🥺❤️",
    yesLines: [
      "YESSSSSSSSS 😭❤️",
      "Wese mein iss point ko bachake rakh raha tha...",
      "...taki humari first date aisi ho. ❤️",
    ],
    reveal: "Movie Night 🎬🍿",
    welcome: "Welcome to our first movie night. 🍿❤️",
    noPhoto: crying,
  },

  // ---------- MOVIE ----------
  movie: {
    title: "[MOVIE TITLE]",
    duration: "[RUNTIME]",
    poster: moviePoster,
    /** Paste a video link here, or leave empty and pick a file on the night. */
    src: "",
  },

  // ---------- SHAYARI ----------
  shayari: {
    title: "A little something I wrote",
    lines: [
      "Teri aankhon mein kho jaana acha lagta hai,",
      "Tere saath har pagalpan karna acha lagta hai.",
      "Duniya chahe tujhe jo bhi naam de,",
      "Mujhe toh bas “meri jaan” kehna acha lagta hai. ❤️🥹",
    ],
    signature: "— yours, always",
  },

  // ---------- OUR LITTLE UNIVERSE ----------
  memories: [
    {
      title: "[OUR MEMORY]",
      emoji: "✨",
      date: "[DATE]",
      body: "[Write the story of this memory here.]",
    },
    {
      title: "[INSIDE JOKE]",
      emoji: "😂",
      date: "[DATE]",
      body: "[The one that still makes us laugh.]",
    },
    {
      title: "[OUR DATE]",
      emoji: "🌙",
      date: "[DATE]",
      body: "[What we did, and how it felt.]",
    },
    {
      title: "[A MESSAGE YOU SENT]",
      emoji: "💌",
      date: "[DATE]",
      body: "[Paste the screenshot text here.]",
    },
  ] as Memory[],

  // ---------- FINAL ----------
  final: [
    "Before you go...",
    "Thank you for being you.",
    "Happy 19th birthday, meri jaan. ❤️",
    "I hope this little universe I made for you made your day a little more special.",
    "I love you.",
    "How was the movieee my loveeeeeee merko samajh hi nhi aaya konsi rakhu 🍿❤️",
  ],

  // ---------- EASTER EGGS ----------
  easterEggs: {
    heart: "Found me. 👀",
    forbidden: "You were literally told not to 😭",
    moon: "PS... I love you more than I know how to explain.",
    star: "Wish already used. It was you.",
    corner: "You really look everywhere, don't you? 🥺",
  },
};

export type Story = typeof story;
