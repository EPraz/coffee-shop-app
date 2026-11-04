import type { Coffee } from "../catalog/coffee";
import type { CoffeeSnapshot } from "@bruma/contracts/orders";
export type { CoffeeSnapshot, OrderItem, Order } from "@bruma/contracts/orders";

export function snapshotCoffee(coffee: Coffee): CoffeeSnapshot {
  const { id, name, country, region, roast, tone, edition } = coffee;
  return { id, name, country, region, roast, tone, edition };
}
