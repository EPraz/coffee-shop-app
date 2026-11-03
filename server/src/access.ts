import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import {
  Body,
  CanActivate,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Injectable,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { z } from "zod";
import { Request, Response } from "express";
import { DomainError } from "./errors";

function signingSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32)
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  return secret;
}
export function sign(value: string) {
  return createHmac("sha256", signingSecret())
    .update(value)
    .digest("base64url");
}
export function verifySignature(value: string, signature: string) {
  const expected = Buffer.from(sign(value));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export function cookieValue(request: Request, name: string) {
  return request.headers.cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(name + "="))
    ?.slice(name.length + 1);
}
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api",
});

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const token = cookieValue(
      context.switchToHttp().getRequest<Request>(),
      "bruma_demo",
    );
    const [payload, signature] = token?.split(".") ?? [];
    if (!payload || !signature || !verifySignature(payload, signature))
      throw new DomainError("session_expired", 401);
    try {
      const session = JSON.parse(Buffer.from(payload, "base64url").toString());
      if (session.role !== "demo-admin" || session.expires <= Date.now())
        throw new Error();
    } catch {
      throw new DomainError("session_expired", 401);
    }
    return true;
  }
}

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
