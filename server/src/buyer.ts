import { createHash, randomUUID } from "node:crypto";
import { Request, Response } from "express";
import { cookieValue, sign, verifySignature } from "./access";

export function buyerHash(request: Request, response?: Response) {
  const cookie = cookieValue(request, "bruma_buyer");
  let [id, signature] = cookie?.split(".") ?? [];
  if (!id || !signature || !verifySignature("buyer:" + id, signature)) {
    if (!response) return null;
    id = randomUUID();
    signature = sign("buyer:" + id);
    response.cookie("bruma_buyer", id + "." + signature, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api",
      maxAge: 30 * 86400000,
    });
  }
  return createHash("sha256").update(id).digest("hex");
}
