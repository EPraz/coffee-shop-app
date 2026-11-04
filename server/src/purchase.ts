import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { Database } from "./database";
import { DomainError } from "./errors";
import { lockStore } from "./store-lock";
import {
  reviewSchema,
  confirmSchema,
  decodeQuote,
  priceSelection,
  orderLines,
  requestHash,
} from "./purchase-rules";
import { orderDto } from "./order-dto";
import { variantId } from "../../shared/catalog";

@Injectable()
export class PurchaseService {
  constructor(@Inject(Database) private readonly db: Database) {}
  async review(input: unknown) {
    const selection = reviewSchema.parse(input);
    return this.db.$transaction(async (tx) => {
      const generation = await lockStore(tx);
      return priceSelection(tx, selection, generation);
    });
  }
  async confirm(input: unknown, buyer: string) {
    const command = confirmSchema.parse(input);
    const quote = decodeQuote(command.quoteToken);
    const hash = requestHash(command.quoteToken);
    return this.db.$transaction(
      async (tx) => {
        await lockStore(tx, quote.generation);
        const existing = await tx.order.findUnique({
          where: {
            buyerHash_requestKey: {
              buyerHash: buyer,
              requestKey: command.requestKey,
            },
          },
          include: { items: true },
        });
        if (existing) {
          if (existing.requestHash !== hash || command.outcome !== "approved")
            throw new DomainError("request_conflict");
          return orderDto(existing);
        }
        if (command.outcome === "rejected")
          throw new DomainError("payment_rejected", 402);
        if (quote.expires <= Date.now() || quote.lines.length === 0)
          throw new DomainError("review_required");
        const current = await priceSelection(
          tx,
          reviewSchema.parse({
            lines: quote.lines.map(
              ({ coffeeId, weight, preparation, quantity }) => ({
                coffeeId,
                weight,
                preparation,
                quantity,
              }),
            ),
            couponApplied: quote.couponApplied,
            generation: quote.generation,
          }),
          quote.generation,
        );
        if (
          JSON.stringify(current.lines) !== JSON.stringify(quote.lines) ||
          current.amounts.total !== quote.amounts.total
        )
          throw new DomainError("review_required");
        for (const line of quote.lines) {
          await tx.variant.update({
            where: {
              id: variantId(line.coffeeId, line.weight, line.preparation),
            },
            data: { stock: { decrement: line.quantity } },
          });
        }
        await tx.coffee.updateMany({
          where: {
            id: { in: [...new Set(quote.lines.map((line) => line.coffeeId))] },
          },
          data: { version: { increment: 1 } },
        });
        const order = await tx.order.create({
          data: {
            number:
              "BR-" +
              randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase(),
            buyerHash: buyer,
            requestKey: command.requestKey,
            requestHash: hash,
            ...quote.amounts,
            items: { create: orderLines(quote) },
          },
          include: { items: true },
        });
        return orderDto(order);
      },
      { timeout: 10000 },
    );
  }
}
