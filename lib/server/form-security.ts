export class FormRequestError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}

export function getSameOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin || request.headers.get("sec-fetch-site") === "cross-site") return null;
  try {
    const incoming = new URL(origin), target = new URL(request.url);
    // Next may use its internal hostname in request.url. Browsers bind Host to
    // the actual target; do not use client-supplied forwarded-host headers.
    const host = request.headers.get("host") || target.host;
    if (!/^https?:$/.test(incoming.protocol) || incoming.origin !== origin || incoming.protocol !== target.protocol || incoming.host !== host) return null;
    return origin;
  } catch { return null; }
}

// Bound the actual stream; Content-Length alone can be missing or misleading.
export async function readFormPayload(request: Request): Promise<Record<string, unknown>> {
  if (!getSameOrigin(request)) {
    throw new FormRequestError(403, "Request origin is not allowed.");
  }
  const type = request.headers.get("content-type")?.split(";")[0].trim();
  if (type !== "application/json" && type !== "application/x-www-form-urlencoded") {
    throw new FormRequestError(415, "Submit the form from this website.");
  }
  const limit = 16_000;
  if (Number(request.headers.get("content-length")) > limit) throw new FormRequestError(413, "Your message is too long.");
  const reader = request.body?.getReader();
  if (!reader) throw new FormRequestError(400, "Submit the form again.");
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > limit) { await reader.cancel(); throw new FormRequestError(413, "Your message is too long."); }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } finally { reader.releaseLock(); }
  let data: unknown;
  try { data = type === "application/json" ? JSON.parse(text) : Object.fromEntries(new URLSearchParams(text)); }
  catch { throw new FormRequestError(400, "Submit the form again."); }
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new FormRequestError(400, "Submit the form again.");
  return data as Record<string, unknown>;
}

const attempts = new Map<string, { count: number; until: number }>();
export function isFormRateLimited(request: Request): boolean {
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${new URL(request.url).pathname}:${ip}`;
  const current = attempts.get(key);
  if (!current) {
    if (attempts.size >= 5000) return true;
    attempts.set(key, { count: 1, until: now + 600_000 });
    return false;
  }
  return ++current.count > 6;
}
