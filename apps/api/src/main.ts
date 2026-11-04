import "reflect-metadata";
import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import type { Request, Response, NextFunction } from "express";
import { AppModule } from "./app.module";
import { demoTrafficBudget } from "./common/http/traffic-budget";
import { ApiErrors } from "./common/errors/api-errors.filter";
async function main() {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  app.use(helmet());
  app.use(demoTrafficBudget());
  const origins = new Set(
    (
      process.env.ALLOWED_ORIGINS ??
      "http://127.0.0.1:43173,http://127.0.0.1:43174"
    ).split(","),
  );
  app.use((request: Request, response: Response, next: NextFunction) => {
    if (request.headers.origin && !origins.has(request.headers.origin)) {
      response.status(403).json({ code: "origin_denied" });
      return;
    }
    response.setHeader("Cache-Control", "no-store");
    next();
  });
  app.useGlobalFilters(new ApiErrors());
  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT ?? 43175), "0.0.0.0");
}
void main().catch(() => {
  console.error("API startup failed; check environment and database");
  process.exitCode = 1;
});
