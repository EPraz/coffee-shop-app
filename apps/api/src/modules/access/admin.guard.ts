import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { DomainError } from "../../common/errors/domain-error";
import { verifySignature } from "../../infrastructure/security/token-signature";
import { cookieValue } from "./cookies";
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
