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

export interface CartAddition {
  quantity: number;
  currentPrice?: number;
  reason: "missing" | "unavailable" | "limit" | null;
}
export function planCartAddition(current: CartLine[], requested: CartLine[]) {
  const lines = current.map((line) => ({ ...line }));
  const additions: CartAddition[] = requested.map((item) => {
    const coffee = findCoffee(item.coffeeId);
    const existing = lines.find((line) => lineKey(line) === lineKey(item));
    const quantity = coffee?.available
      ? Math.min(item.quantity, Math.max(0, 9 - (existing?.quantity ?? 0)))
      : 0;
    const reason = !coffee
      ? "missing"
      : !coffee.available
        ? "unavailable"
        : quantity < item.quantity
          ? "limit"
          : null;
    if (quantity > 0) {
      if (existing) existing.quantity += quantity;
      else
        lines.push({
          coffeeId: item.coffeeId,
          weight: item.weight,
          preparation: item.preparation,
          quantity,
        });
    }
    return {
      quantity,
      reason,
      currentPrice: coffee?.prices[item.weight],
    };
  });
  return {
    lines,
    additions,
    added: additions.reduce((sum, item) => sum + item.quantity, 0),
  };
}
