import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { Response } from "express";
import { sign } from "../../infrastructure/security/token-signature";
import { cookieOptions } from "./cookies";
import { AdminGuard } from "./admin.guard";
@Controller("api/access")
export class AccessController {
  @Post("demo")
  enter(@Body() body: unknown, @Res({ passthrough: true }) response: Response) {
    z.strictObject({}).parse(body ?? {});
    const expires = Date.now() + 60 * 60 * 1000;
    const payload = Buffer.from(
      JSON.stringify({ role: "demo-admin", expires, nonce: randomUUID() }),
    ).toString("base64url");
    response.cookie("bruma_demo", payload + "." + sign(payload), {
      ...cookieOptions(),
      maxAge: 60 * 60 * 1000,
    });
    return { role: "demo-admin", expiresAt: new Date(expires).toISOString() };
  }
  @Get("session")
  @UseGuards(AdminGuard)
  session() {
    return { role: "demo-admin" };
  }
  @Delete("session")
  leave(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("bruma_demo", cookieOptions());
    return { ok: true };
  }
}
