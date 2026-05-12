import { Easing, interpolate, spring } from "remotion";
import { FPS } from "../constants";

export const crispEase = Easing.bezier(0.16, 1, 0.3, 1);
export const softEase = Easing.bezier(0.45, 0, 0.55, 1);

export const toFrame = (seconds: number, fps: number) => {
  return Math.round(seconds * fps);
};

export const clampProgress = (
  frame: number,
  start: number,
  duration: number,
  easing = crispEase,
) => {
  return interpolate(frame, [start, start + duration], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const fadeInOut = (
  frame: number,
  start: number,
  end: number,
  edge = 10,
) => {
  const fadeIn = interpolate(frame, [start, start + edge], [0, 1], {
    easing: crispEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - edge, end], [1, 0], {
    easing: softEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return Math.min(fadeIn, fadeOut);
};

export const rise = (progress: number, amount = 28) => {
  return interpolate(progress, [0, 1], [amount, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const springConfig = {
  damping: 200,
  mass: 0.5,
  stiffness: 100,
} as const;

export const springProgress = (
  frame: number,
  start: number,
  durationInFrames: number,
) => {
  return spring({
    frame: frame - start,
    fps: FPS,
    config: springConfig,
    durationInFrames,
    durationRestThreshold: 0.001,
  });
};

export const springOpacity = (frame: number, start: number) => {
  return interpolate(springProgress(frame, start, 12), [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const springRise = (frame: number, start: number, amount = 24) => {
  return interpolate(springProgress(frame, start, 18), [0, 1], [amount, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const sceneCrossfade = (
  frame: number,
  start: number,
  end: number,
  edge = 15,
) => {
  const fadeIn = interpolate(frame, [start, start + edge], [0, 1], {
    easing: crispEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - edge, end], [1, 0], {
    easing: softEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return Math.min(fadeIn, fadeOut);
};

export const drawProgress = (
  frame: number,
  start: number,
  durationInFrames: number,
) => {
  return interpolate(springProgress(frame, start, durationInFrames), [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
