import { coffeeDefinitions } from "../catalog/catalog-data";
import { variantId } from "../catalog/variant-id";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { orderStates, type Quote } from "@bruma/contracts/orders";
import { orderLines } from "../checkout/purchase-rules";

export async function seedCatalog(tx: Prisma.TransactionClient) {
  for (const coffee of coffeeDefinitions) {
    await tx.coffee.upsert({
      where: { id: coffee.id },
      create: {
        id: coffee.id,
        available: coffee.available,
        price250: coffee.prices[250],
        price500: coffee.prices[500],
      },
      update: {
        available: coffee.available,
        price250: coffee.prices[250],
        price500: coffee.prices[500],
        version: { increment: 1 },
      },
    });
    for (const weight of [250, 500] as const)
      for (const preparation of ["beans", "ground"] as const) {
        const stock = !coffee.available
          ? 0
          : coffee.id === "yirgacheffe" &&
              weight === 500 &&
              preparation === "ground"
            ? 3
            : 30;
        const data = { coffeeId: coffee.id, weight, preparation, stock };
        await tx.variant.upsert({
          where: { id: variantId(coffee.id, weight, preparation) },
          create: { id: variantId(coffee.id, weight, preparation), ...data },
          update: { stock },
        });
      }
  }
}
export async function seedOrders(
  tx: Prisma.TransactionClient,
  generation: string,
) {
  const daysAgo = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 20, 21, 23, 25,
    27, 28, 29,
  ];
  const now = Date.now();
  for (const [index, days] of daysAgo.entries()) {
    const coffee = coffeeDefinitions[index % coffeeDefinitions.length];
    const weight = index % 2 ? 500 : 250;
    const quantity = 1 + (index % 3);
    const subtotal = coffee.prices[weight] * quantity;
    const couponApplied = index % 3 === 0;
    const discount = couponApplied ? Math.round((subtotal * 15) / 100) : 0;
    const quote: Omit<Quote, "token"> = {
      generation,
      expires: 0,
      couponApplied,
      lines: [
        {
          coffeeId: coffee.id,
          weight,
          preparation: index % 2 ? "ground" : "beans",
          quantity,
          unitPrice: coffee.prices[weight],
        },
      ],
      amounts: {
        subtotal,
        discount,
        shipping: 500,
        total: subtotal - discount + 500,
      },
    };
    await tx.order.create({
      data: {
        number: `BR-DEMO-${String(index + 1).padStart(3, "0")}`,
        createdAt: new Date(now - days * 86400000),
        example: true,
        state:
          orderStates[(index + Math.floor(index / 7)) % orderStates.length],
        buyerHash: "seeded-example",
        requestKey: randomUUID(),
        requestHash: "seeded-example",
        ...quote.amounts,
        items: { create: orderLines(quote) },
      },
    });
  }
}
