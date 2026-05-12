export type ScriptLine = {
  readonly start: number;
  readonly end: number;
  readonly text: string;
};

export const SCRIPT_LINES: readonly ScriptLine[] = [
  {
    start: 0,
    end: 2.5,
    text: "Your site gets clicks. But no calls.",
  },
  {
    start: 2.5,
    end: 5,
    text: "That usually feels like a traffic problem.",
  },
  {
    start: 5,
    end: 7.5,
    text: "Most of the time, it is clarity.",
  },
  {
    start: 7.5,
    end: 10,
    text: "The headline is vague.",
  },
  {
    start: 10,
    end: 12.5,
    text: "The button is easy to ignore.",
  },
  {
    start: 12.5,
    end: 15,
    text: "The proof shows up too late.",
  },
  {
    start: 15,
    end: 18,
    text: "I rebuild the first screen around one decision.",
  },
  {
    start: 18,
    end: 21,
    text: "What do they get, and why now?",
  },
  {
    start: 21,
    end: 24,
    text: "$50 down starts the build.",
  },
  {
    start: 24,
    end: 27,
    text: "You get a finished page in 48 hours.",
  },
  {
    start: 27,
    end: 30,
    text: "See examples at chuck-portfolio.vercel.app.",
  },
] as const;
