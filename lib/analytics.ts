type EventData = { location?: string; offer?: string; method?: string; label?: string; tier?: string; video?: string; project?: string };
const events = new Set(["generate_lead", "cta_click", "select_tier", "email_click", "video_play", "case_study_click"]);
export const analyticsPreferenceKey = "portfolio-analytics-v1";
// Google treats even debug_mode:false as debug traffic. Omit it on production.
export function analyticsEnvironment(hostname: string) {
  return ["chuckbaryames.com", "www.chuckbaryames.com"].includes(hostname) ? {} : { debug_mode: true };
}
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; portfolioAnalyticsAllowed?: boolean } }
export function analyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const privacyNavigator = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (privacyNavigator.globalPrivacyControl || navigator.doNotTrack === "1") return false;
  try { return localStorage.getItem(analyticsPreferenceKey) !== "off"; } catch { return false; }
}
export function trackEvent(name: string, data: EventData = {}) {
  if (typeof window === "undefined" || !events.has(name) || !window.portfolioAnalyticsAllowed) return;
  // Explicit static UI fields only, never form data or raw URLs.
  const safe: Record<string, string> = {};
  for (const key of ["location", "offer", "method", "label", "tier", "video", "project"] as const) {
    const value = data[key];
    if (value && /^[a-z0-9 _+.-]{1,80}$/i.test(value)) safe[key] = value;
  }
  window.gtag?.("event", name, safe);
}
