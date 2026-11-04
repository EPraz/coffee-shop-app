import type { NextFunction, Request, Response } from "express";

// A shared free-tier demo has a bounded process budget, not per-visitor stores.
export function demoTrafficBudget() {
  let minute = -1;
  let requests = 0;
  let resets = 0;
  const testing = process.env.NODE_ENV === "test";
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.path.startsWith("/api/")) {
      next();
      return;
    }
    const currentMinute = Math.floor(Date.now() / 60000);
    if (minute !== currentMinute) {
      minute = currentMinute;
      requests = 0;
      resets = 0;
    }
    requests++;
    if (request.method === "POST" && request.path === "/api/admin/reset")
      resets++;
    if (
      requests > (testing ? 10000 : 1000) ||
      resets > (testing ? 10000 : 10)
    ) {
      response.setHeader(
        "Retry-After",
        String(Math.max(1, Math.ceil((60000 - (Date.now() % 60000)) / 1000))),
      );
      response.status(429).json({ code: "rate_limited" });
      return;
    }
    next();
  };
}
