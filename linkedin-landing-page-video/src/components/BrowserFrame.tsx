import type { PropsWithChildren } from "react";
import { COLORS } from "../constants";

type BrowserFrameProps = PropsWithChildren<{
  readonly title: string;
  readonly dimmed?: boolean;
}>;

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  title,
  dimmed = false,
  children,
}) => {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 30,
        background: COLORS.panel,
        border: `1px solid ${dimmed ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.18)"}`,
        boxShadow: dimmed
          ? "0 24px 70px rgba(0,0,0,0.42)"
          : "0 38px 100px rgba(0,0,0,0.58)",
      }}
    >
      <div
        style={{
          height: 58,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 22px",
          background: "rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            style={{
              width: 13,
              height: 13,
              borderRadius: 999,
              background:
                dot === 0
                  ? "#ff6b6b"
                  : dot === 1
                    ? "#ffcf66"
                    : COLORS.green,
              opacity: dimmed ? 0.42 : 0.88,
            }}
          />
        ))}
        <div
          style={{
            marginLeft: 14,
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.07)",
            color: dimmed ? COLORS.faint : COLORS.muted,
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          {title}
        </div>
      </div>
      {children}
    </div>
  );
};
