import type { CSSProperties, ReactNode } from "react";
import { COLORS } from "../constants";
import {
  clampProgress,
  fadeInOut,
  rise,
  springOpacity,
  springRise,
} from "../lib/animation";

type MotionTextProps = {
  readonly frame: number;
  readonly start: number;
  readonly end: number;
  readonly children: ReactNode;
  readonly size?: number;
  readonly maxWidth?: number;
  readonly color?: string;
  readonly style?: CSSProperties;
  readonly useSpringEntrance?: boolean;
};

export const MotionText: React.FC<MotionTextProps> = ({
  frame,
  start,
  end,
  children,
  size = 68,
  maxWidth = 760,
  color = COLORS.text,
  style,
  useSpringEntrance = false,
}) => {
  const enter = clampProgress(frame, start, 18);
  const opacity = useSpringEntrance
    ? Math.min(springOpacity(frame, start), fadeInOut(frame, start, end, 15))
    : fadeInOut(frame, start, end, 10);
  const y = useSpringEntrance ? springRise(frame, start, 24) : rise(enter, 22);

  return (
    <div
      style={{
        color,
        fontSize: size,
        lineHeight: 1.02,
        fontWeight: 900,
        letterSpacing: 0,
        maxWidth,
        opacity,
        transform: `translateY(${y}px)`,
        textShadow: "0 16px 48px rgba(0,0,0,0.52)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
