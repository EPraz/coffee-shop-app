import "reflect-metadata";
import "dotenv/config";
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { Request, Response, NextFunction } from "express";
import { Database } from "./database";
import { AccessController, AdminGuard } from "./access";
import { CatalogController, CatalogService } from "./catalog";
import { CatalogEditor } from "./catalog-edit";
import { ApiErrors } from "./errors";

@Module({
  controllers: [AccessController, CatalogController],
  providers: [Database, CatalogService, CatalogEditor, AdminGuard],
})
class AppModule {}

async function main() {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  app.use(helmet());
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
  const database = app.get(Database);
  app
    .getHttpAdapter()
    .get("/health", async (_request: Request, response: Response) => {
      try {
        await database.$queryRaw`SELECT 1`;
        response.json({ status: "ok" });
      } catch {
        response.status(503).json({ status: "unavailable" });
      }
    });
  await app.listen(Number(process.env.PORT ?? 43175), "0.0.0.0");
}
void main().catch(() => {
  console.error("API startup failed; check environment and database");
  process.exitCode = 1;
});
