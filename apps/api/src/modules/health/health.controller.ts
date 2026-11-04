import { Controller, Get, Inject, Res } from "@nestjs/common";
import type { Response } from "express";
import { Database } from "../../infrastructure/database/database.service";
@Controller("health")
export class HealthController {
  constructor(@Inject(Database) private readonly db: Database) {}
  @Get() async read(@Res() response: Response) {
    try {
      await this.db.$queryRaw`SELECT 1`;
      response.json({ status: "ok" });
    } catch {
      response.status(503).json({ status: "unavailable" });
    }
  }
}
