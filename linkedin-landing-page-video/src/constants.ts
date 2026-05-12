export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1350;
export const DURATION_SECONDS = 30;
export const TOTAL_FRAMES = FPS * DURATION_SECONDS;
export const SHOWCASE_DURATION_SECONDS = 20;
export const SHOWCASE_TOTAL_FRAMES = FPS * SHOWCASE_DURATION_SECONDS;

export const PHASES = {
  hook: {
    start: 0,
    end: 2.5,
  },
  tension: {
    start: 2.5,
    end: 15,
  },
  twist: {
    start: 15,
    end: 24,
  },
  cta: {
    start: 24,
    end: 30,
  },
} as const;

export const COLORS = {
  bg: "#05070d",
  panel: "#0a1018",
  panelSoft: "#101925",
  text: "#f7fbff",
  muted: "#a5b4c5",
  faint: "#506173",
  accent: "#15b8ff",
  accentDeep: "#0576a8",
  green: "#2ee59d",
  warning: "#ffcf66",
  bad: "#8793a3",
  white: "#ffffff",
} as const;

export const SHOWCASE_COLORS = {
  backgroundWarm: "#FAFAF7",
  backgroundWarmTint: "#FFF5F2",
  backgroundDark: "#0A0A0A",
  inkOnLight: "#0A0A0A",
  inkOnDark: "#FAFAF7",
  accentCoral: "#FF4D2E",
  accentEmerald: "#1F7A5C",
  accentAmber: "#C9A961",
  mutedOnLight: "#6B6B6B",
  mutedOnDark: "#8B8B8B",
  hairlineOnLight: "#E5E5E0",
  hairlineOnDark: "#2A2A2A",
} as const;
