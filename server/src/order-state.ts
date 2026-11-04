import { Inject, Injectable } from "@nestjs/common";
import { z } from "zod";
import { Database } from "./database";
import { DomainError } from "./errors";
import { lockStore } from "./store-lock";
import { orderDto } from "./order-dto";
import { variantId } from "../../shared/catalog";

const stateChange = z.strictObject({
  state: z.enum([
    "confirmed",
    "preparing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  version: z.int().positive(),
  generation: z.uuid(),
});
const nextState: Record<string, string | undefined> = {
  confirmed: "preparing",
  preparing: "shipped",
  shipped: "delivered",
};

@Injectable()
export class OrderStateService {
  constructor(@Inject(Database) private readonly db: Database) {}
  async change(number: string, input: unknown) {
    const command = stateChange.parse(input);
    return this.db.$transaction(async (tx) => {
      await lockStore(tx, command.generation);
      const order = await tx.order.findUnique({
        where: { number },
        include: { items: true },
      });
      if (!order) throw new DomainError("order_missing", 404);
      if (order.version !== command.version)
        throw new DomainError("order_conflict");
      const cancelling =
        command.state === "cancelled" &&
        ["confirmed", "preparing"].includes(order.state);
      if (!cancelling && nextState[order.state] !== command.state)
        throw new DomainError("order_conflict");
      if (cancelling) {
        for (const item of order.items)
          await tx.variant.update({
            where: {
              id: variantId(item.coffeeId, item.weight, item.preparation),
            },
            data: { stock: { increment: item.quantity } },
          });
        await tx.coffee.updateMany({
          where: {
            id: { in: [...new Set(order.items.map((item) => item.coffeeId))] },
          },
          data: { version: { increment: 1 } },
        });
      }
      return orderDto(
        await tx.order.update({
          where: { number },
          data: { state: command.state, version: { increment: 1 } },
          include: { items: true },
        }),
      );
    });
  }
}
