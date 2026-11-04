import { Prisma } from "@prisma/client";
import { Order, OrderItem, OrderState } from "../../shared/orders";

export type StoredOrder = Prisma.OrderGetPayload<{ include: { items: true } }>;
export function orderDto(order: StoredOrder): Order {
  return {
    number: order.number,
    createdAt: order.createdAt.toISOString(),
    example: order.example,
    state: order.state as OrderState,
    version: order.version,
    amounts: {
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      total: order.total,
    },
    items: order.items.map((item) => ({
      coffeeId: item.coffeeId,
      weight: item.weight as OrderItem["weight"],
      preparation: item.preparation as OrderItem["preparation"],
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      coffee: item.coffee as unknown as OrderItem["coffee"],
    })),
  };
}
