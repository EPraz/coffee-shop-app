import { createHmac, timingSafeEqual } from "node:crypto";
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
