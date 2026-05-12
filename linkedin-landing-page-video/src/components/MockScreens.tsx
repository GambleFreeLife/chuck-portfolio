import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { clampProgress, rise } from "../lib/animation";

export const WeakTemplateMock: React.FC = () => {
  return (
    <div
      style={{
        height: 690,
        padding: 42,
        background: "#f0f2f4",
        color: "#7d8792",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 72,
        }}
      >
        <div
          style={{
            width: 180,
            height: 24,
            borderRadius: 999,
            background: "#cbd2da",
          }}
        />
        <div style={{ display: "flex", gap: 18 }}>
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              style={{
                width: 74,
                height: 14,
                borderRadius: 999,
                background: "#d6dce2",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ width: 560 }}>
        <div
          style={{
            fontSize: 54,
            lineHeight: 1,
            fontWeight: 760,
            letterSpacing: 0,
            color: "#8994a0",
            marginBottom: 24,
          }}
        >
          Helping professionals grow online
        </div>
        <div
          style={{
            fontSize: 24,
            lineHeight: 1.35,
            color: "#a8b1ba",
            marginBottom: 34,
            maxWidth: 520,
          }}
        >
          We provide modern strategy and support for people who want better
          results from their business.
        </div>
        <div
          style={{
            display: "inline-flex",
            padding: "16px 34px",
            borderRadius: 999,
            background: "#dbe1e7",
            color: "#9aa4ad",
            fontSize: 21,
            fontWeight: 760,
          }}
        >
          Learn more
        </div>
      </div>
      <div
        style={{
          marginTop: 70,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 18,
        }}
      >
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            style={{
              height: 90,
              borderRadius: 20,
              background: "#e4e8ed",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const PolishedLandingPageMock: React.FC = () => {
  const frame = useCurrentFrame();
  const headline = clampProgress(frame, 8, 26);
  const subcopy = clampProgress(frame, 30, 24);
  const button = clampProgress(frame, 54, 22);
  const proof = clampProgress(frame, 82, 26);
  const wipe = clampProgress(frame, 0, 40);
  const shine = interpolate(frame, [0, 240], [-220, 680], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        minHeight: 720,
        padding: "46px 52px 58px",
        background:
          "linear-gradient(135deg, #07121a 0%, #0b1d2a 48%, #041018 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: shine,
          width: 160,
          transform: "skewX(-16deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 62,
          }}
        >
          <div
            style={{
              color: COLORS.text,
              fontSize: 23,
              fontWeight: 850,
              letterSpacing: 0,
            }}
          >
            Clarity Call Studio
          </div>
          <div
            style={{
              color: COLORS.accent,
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Book a call
          </div>
        </div>
        <div
          style={{
            maxWidth: 690,
            opacity: headline,
            transform: `translateY(${rise(headline)}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              color: COLORS.accent,
              border: `1px solid rgba(21,184,255,0.42)`,
              background: "rgba(21,184,255,0.12)",
              borderRadius: 999,
              padding: "10px 16px",
              fontSize: 18,
              fontWeight: 850,
              marginBottom: 24,
            }}
          >
            For coaches and consultants
          </div>
          <div
            style={{
              color: COLORS.text,
              fontSize: 68,
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: 0,
            }}
          >
            Turn site visits into booked calls.
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            maxWidth: 610,
            color: COLORS.muted,
            fontSize: 27,
            lineHeight: 1.32,
            opacity: subcopy,
            transform: `translateY(${rise(subcopy, 20)}px)`,
          }}
        >
          A focused landing page that explains the offer, answers the objection,
          and moves the right prospect forward.
        </div>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: button,
            transform: `translateY(${rise(button, 16)}px)`,
          }}
        >
          <div
            style={{
              padding: "18px 30px",
              borderRadius: 999,
              color: COLORS.bg,
              background: COLORS.accent,
              fontSize: 23,
              fontWeight: 900,
              boxShadow: "0 16px 42px rgba(21,184,255,0.34)",
            }}
          >
            Book a strategy call
          </div>
          <div
            style={{
              color: COLORS.muted,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Takes two minutes
          </div>
        </div>
        <div
          style={{
            marginTop: 52,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            opacity: proof,
            transform: `translateY(${rise(proof, 18)}px)`,
          }}
        >
          <ProofCard label="Recent build" value="Preview in 48 hours" />
          <ProofCard label="Start today" value="$50 down" />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: `${interpolate(wipe, [0, 1], [100, 0])}%`,
          background: "#f0f2f4",
        }}
      />
    </div>
  );
};

const ProofCard: React.FC<{
  readonly label: string;
  readonly value: string;
}> = ({ label, value }) => {
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 24,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.13)",
      }}
    >
      <div
        style={{
          color: COLORS.accent,
          fontSize: 16,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: COLORS.text,
          fontSize: 25,
          lineHeight: 1.1,
          fontWeight: 850,
          letterSpacing: 0,
        }}
      >
        {value}
      </div>
    </div>
  );
};
