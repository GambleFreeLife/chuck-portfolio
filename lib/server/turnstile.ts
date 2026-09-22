type Verification = { ok: true } | { ok: false; status: number; error: string };
type Siteverify = { success?: boolean; hostname?: string; action?: string };

export async function verifyTurnstile(token: unknown, action: string): Promise<Verification> {
  if (typeof token !== "string" || token.length < 1 || token.length > 2048) {
    return { ok: false, status: 400, error: "Complete the security check, then try again." };
  }
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret || (process.env.VERCEL_ENV === "production" && /^[123]x0000000000000000000000000000000/.test(secret))) {
    return { ok: false, status: 503, error: "The security check is unavailable. Please email chuck@chuckbaryames.com." };
  }
  const hosts = new Set(["chuckbaryames.com", "www.chuckbaryames.com", process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].filter(Boolean));
  if (process.env.NODE_ENV !== "production") { hosts.add("localhost"); hosts.add("127.0.0.1"); hosts.add("dummy-key-pass"); }
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }), signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Verification unavailable");
    const result = await response.json() as Siteverify;
    if (result.success !== true || !result.hostname || !hosts.has(result.hostname) || result.action !== action) {
      return { ok: false, status: 400, error: "The security check expired or was not accepted. Please try it again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, status: 503, error: "The security check could not connect. Please retry or email chuck@chuckbaryames.com." };
  }
}
