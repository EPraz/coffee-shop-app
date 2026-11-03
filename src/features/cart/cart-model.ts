import { findCoffee, type Weight, type Preparation } from "../catalog/coffee";
export interface CartLine {
  coffeeId: string;
  weight: Weight;
  preparation: Preparation;
  quantity: number;
}
export const lineKey = (
  line: Pick<CartLine, "coffeeId" | "weight" | "preparation">,
) => `${line.coffeeId}:${line.weight}:${line.preparation}`;
export function cartAmounts(lines: CartLine[], couponApplied = false) {
  const subtotal = lines.reduce(
    (sum, line) =>
      sum +
      (findCoffee(line.coffeeId)?.prices[line.weight] ?? 0) * line.quantity,
    0,
  );
  const shipping = lines.length ? 500 : 0;
  const discount = couponApplied ? Math.round((subtotal * 15) / 100) : 0;
  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
  };
}
