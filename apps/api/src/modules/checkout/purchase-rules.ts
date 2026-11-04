import { coffeeDefinitions } from "../catalog/catalog-data";
import { variantId } from "../catalog/variant-id";
import { createHash } from "node:crypto";
import { z } from "zod";
import { Prisma } from "@prisma/client";

import { OrderItem, Quote } from "@bruma/contracts/orders";
import { DomainError } from "../../common/errors/domain-error";
import {
  sign,
  verifySignature,
} from "../../infrastructure/security/token-signature";

export const lineSchema = z.strictObject({
  coffeeId: z.enum(["niebla", "volcan", "cerrado", "sierra", "yirgacheffe"]),
  weight: z.union([z.literal(250), z.literal(500)]),
  preparation: z.enum(["beans", "ground"]),
  quantity: z.int().min(1).max(9),
});
export const reviewSchema = z.strictObject({
  generation: z.uuid(),
  couponApplied: z.boolean(),
  lines: z
    .array(lineSchema)
    .min(1)
    .max(20)
    .refine(
      (lines) =>
        new Set(
          lines.map((line) =>
            variantId(line.coffeeId, line.weight, line.preparation),
          ),
        ).size === lines.length,
    ),
});
export const confirmSchema = z.strictObject({
  requestKey: z.uuid(),
  quoteToken: z.string().min(20).max(25000),
  outcome: z.enum(["approved", "rejected"]),
});

export function encodeQuote(quote: Omit<Quote, "token">): Quote {
  const payload = Buffer.from(JSON.stringify(quote)).toString("base64url");
  return { ...quote, token: payload + "." + sign("quote:" + payload) };
}
export function decodeQuote(token: string): Omit<Quote, "token"> {
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !verifySignature("quote:" + payload, signature))
    throw new DomainError("invalid_quote", 400);
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    throw new DomainError("invalid_quote", 400);
  }
}
export const requestHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export async function priceSelection(
  tx: Prisma.TransactionClient,
  input: z.infer<typeof reviewSchema>,
  generation: string,
): Promise<Quote> {
  const records = await tx.coffee.findMany({ include: { variants: true } });
  const lines: Quote["lines"] = [];
  for (const line of input.lines) {
    const coffee = records.find((item) => item.id === line.coffeeId)!;
    const variant = coffee.variants.find(
      (item) =>
        item.id === variantId(line.coffeeId, line.weight, line.preparation),
    )!;
    const quantity = coffee.available
      ? Math.min(line.quantity, variant.stock)
      : 0;
    if (quantity > 0)
      lines.push({
        ...line,
        quantity,
        unitPrice: line.weight === 250 ? coffee.price250 : coffee.price500,
      });
  }
  const subtotal = lines.reduce(
    (sum, line) => sum + line.quantity * line.unitPrice,
    0,
  );
  const discount = input.couponApplied ? Math.round((subtotal * 15) / 100) : 0;
  const shipping = lines.length ? 500 : 0;
  return encodeQuote({
    generation,
    lines,
    couponApplied: input.couponApplied,
    amounts: {
      subtotal,
      discount,
      shipping,
      total: subtotal - discount + shipping,
    },
    expires: Date.now() + 5 * 60 * 1000,
  });
}
export function orderLines(quote: Omit<Quote, "token">) {
  let allocated = 0;
  let subtotalSoFar = 0;
  return quote.lines.map((line) => {
    const definition = coffeeDefinitions.find(
      (coffee) => coffee.id === line.coffeeId,
    )!;
    const { id, name, country, region, roast, tone, edition } = definition;
    const coffee: OrderItem["coffee"] = {
      id,
      name,
      country,
      region,
      roast,
      tone,
      edition,
    };
    subtotalSoFar += line.unitPrice * line.quantity;
    const cumulativeDiscount = Math.round(
      (quote.amounts.discount * subtotalSoFar) / quote.amounts.subtotal,
    );
    const discount = cumulativeDiscount - allocated;
    allocated = cumulativeDiscount;
    return { ...line, discount, coffee };
  });
}
