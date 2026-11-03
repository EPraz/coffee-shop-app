import { findCoffee, type Coffee } from "../catalog/coffee";
import { cartAmounts, type CartLine } from "../cart/cart-model";

export type CoffeeSnapshot = Pick<
  Coffee,
  "id" | "name" | "country" | "region" | "roast" | "tone" | "edition"
>;
export interface OrderItem extends CartLine {
  unitPrice: number;
  coffee: CoffeeSnapshot;
}
export interface Order {
  number: string;
  createdAt: string;
  example: boolean;
  items: OrderItem[];
  amounts: ReturnType<typeof cartAmounts>;
}
export function snapshotCoffee(coffee: Coffee): CoffeeSnapshot {
  const { id, name, country, region, roast, tone, edition } = coffee;
  return { id, name, country, region, roast, tone, edition };
}
export function createOrder(lines: CartLine[], couponApplied: boolean): Order {
  return {
    number: "BR-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
    example: false,
    items: lines.map((line) => {
      const coffee = findCoffee(line.coffeeId)!;
      return {
        ...line,
        unitPrice: coffee.prices[line.weight],
        coffee: snapshotCoffee(coffee),
      };
    }),
    amounts: cartAmounts(lines, couponApplied),
  };
}
