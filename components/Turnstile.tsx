"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export function Turnstile({ action, onToken, resetKey = 0 }: { action: string; onToken: (token: string) => void; resetKey?: number }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [compact, setCompact] = useState(false);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(entries => setCompact(entries[0].contentRect.width < 300));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ready || !sitekey || !container.current || !window.turnstile) return;
    onToken("");
    setError("");
    const api = window.turnstile;
    const id = api.render(container.current, {
      sitekey, action, theme: "light", size: compact ? "compact" : "flexible",
      callback: (token: string) => { onToken(token); setError(""); },
      "expired-callback": () => { onToken(""); setError("Your security check expired. Please verify again."); },
      "timeout-callback": () => { onToken(""); setError("The security check timed out. Please retry."); },
      "error-callback": () => { onToken(""); setError("The security check could not finish. Please retry or email me."); },
    });
    return () => { api.remove(id); };
  }, [ready, sitekey, action, onToken, resetKey, retry, compact]);

  if (!sitekey) return <p role="status" className="security-note">The form is temporarily unavailable. Please <a href="mailto:chuck@chuckbaryames.com">email me about your project</a>.</p>;
  return <div className="security-check">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setError("The security check could not load. Please allow Cloudflare in your browser or email me.")} />
    <div ref={container} />
    {!ready && !error && <p role="status" className="security-note">Loading security check…</p>}
    {error && <p role="alert" className="security-note">{error} {ready && <button type="button" onClick={() => setRetry(value => value + 1)}>Retry security check</button>}</p>}
  </div>;
}
