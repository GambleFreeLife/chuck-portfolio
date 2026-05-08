import assert from "node:assert/strict";
import { describe, it } from "node:test";
import nextConfig from "../next.config.ts";

describe("Next.js security config", () => {
  it("removes the framework powered-by header", () => {
    assert.equal(nextConfig.poweredByHeader, false);
  });

  it("sets baseline browser security headers on every route", async () => {
    const headerRoutes = await nextConfig.headers?.();
    const allRouteHeaders = headerRoutes?.find((route) => route.source === "/:path*")?.headers ?? [];
    const headerMap = new Map(allRouteHeaders.map((header) => [header.key, header.value]));

    assert.equal(headerMap.get("X-Content-Type-Options"), "nosniff");
    assert.equal(headerMap.get("X-Frame-Options"), "DENY");
    assert.equal(headerMap.get("Referrer-Policy"), "strict-origin-when-cross-origin");
    assert.match(headerMap.get("Content-Security-Policy") ?? "", /frame-ancestors 'none'/);
    assert.match(headerMap.get("Permissions-Policy") ?? "", /camera=\(\)/);
  });
});
