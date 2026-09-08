type EventData = { location?: string; offer?: string; method?: string };
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }
export function trackEvent(name: string, data: EventData = {}) {
  if (typeof window === "undefined") return;
  // Never send names, email addresses, website fields, or free-text answers.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...data });
  window.gtag?.("event", name, data);
}
