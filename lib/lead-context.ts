export type LeadContext = { source: string; medium: string; campaign: string; offer: string };
const clean = (value: unknown) => typeof value === "string" && /^[a-z0-9_-]{1,80}$/i.test(value) ? value : "";
export function normalizeLeadContext(value: unknown): LeadContext {
  const data = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const allowedOffers = ["quick-win", "page-refresh", "homepage-redesign", "website-redesign"];
  return { source: clean(data.source), medium: clean(data.medium), campaign: clean(data.campaign), offer: typeof data.offer === "string" && allowedOffers.includes(data.offer) ? data.offer : "" };
}
export function getLeadContext(): LeadContext {
  if (typeof window === "undefined") return normalizeLeadContext(null);
  const query = new URLSearchParams(window.location.search);
  let saved: LeadContext = normalizeLeadContext(null);
  try { saved = normalizeLeadContext(JSON.parse(sessionStorage.getItem("portfolio-source-v1") || "null")); } catch { /* Forms still work when storage is blocked. */ }
  const current = normalizeLeadContext({ source: query.get("utm_source"), medium: query.get("utm_medium"), campaign: query.get("utm_campaign"), offer: query.get("offer") });
  const context = { ...((current.source || current.medium || current.campaign) ? current : saved), offer: current.offer || saved.offer };
  try { sessionStorage.setItem("portfolio-source-v1", JSON.stringify(context)); } catch { /* Source labels are optional. */ }
  return context;
}
