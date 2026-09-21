const attempts = new Map<string, { count: number; resetAt: number }>();
// Per-instance protection only. Turnstile is mandatory across all instances.
// Add a platform firewall limit for shared serverless rate limiting.
export function rateLimited(ip: string, now = Date.now()) {
  for (const [key, entry] of attempts) if (entry.resetAt <= now) attempts.delete(key);
  const current = attempts.get(ip);
  if (current) return ++current.count > 5;
  if (attempts.size >= 5000) return true;
  attempts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
  return false;
}
export async function verifyHuman(token: string, hostname: string, secret: string): Promise<boolean> {
  if (!token || token.length > 2048 || !secret) return false;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }), signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return false;
  const result: unknown = await response.json();
  if (!result || typeof result !== "object") return false;
  const check = result as Record<string, unknown>;
  return check.success === true && check.hostname === hostname && check.action === "project_inquiry";
}
export async function readLimitedJson(request: Request, limit = 12000): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > limit) throw new Error("large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new Error("large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
