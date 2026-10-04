"use client";
import { useEffect, useState } from "react";
import { analyticsAllowed, analyticsPreferenceKey } from "@/lib/analytics";

export function AnalyticsPreference() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => { setEnabled(analyticsAllowed()); }, []);
  function toggle() {
    const next = !enabled;
    try {
      localStorage.setItem(analyticsPreferenceKey, next ? "on" : "off");
      if (!next) {
        for (const cookie of document.cookie.split(";")) {
          const name = cookie.split("=")[0].trim();
          if (!/^_ga(?:_|$)/.test(name)) continue;
          for (const domain of ["", window.location.hostname, ".chuckbaryames.com"]) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""}`;
        }
      }
      setEnabled(analyticsAllowed());
      window.dispatchEvent(new Event("portfolio-analytics-preference"));
    } catch { setEnabled(false); }
  }
  return <div><p>Optional analytics: {enabled === null ? "checking your browser preference" : enabled ? "enabled" : "disabled"}.</p><button type="button" onClick={toggle} disabled={enabled === null}>{enabled ? "Turn analytics off" : "Allow analytics"}</button><p>Global Privacy Control and Do Not Track override this choice. Your request form works with analytics turned off.</p></div>;
}
