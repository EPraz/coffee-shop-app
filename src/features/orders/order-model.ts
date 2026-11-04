import type { Coffee } from "../catalog/coffee";
import type { CoffeeSnapshot } from "../../../shared/orders";
export type { CoffeeSnapshot, OrderItem, Order } from "../../../shared/orders";

export function snapshotCoffee(coffee: Coffee): CoffeeSnapshot {
  const { id, name, country, region, roast, tone, edition } = coffee;
  return { id, name, country, region, roast, tone, edition };
}
