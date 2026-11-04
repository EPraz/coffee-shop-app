import { findCoffee } from "../catalog/coffee";
import { lineKey, type CartLine } from "./cart-model";
const storageKey = "bruma.cart.v1";
interface SavedCart {
  lines: CartLine[];
  couponApplied: boolean;
}
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
export function restoreCart(): SavedCart {
  const empty = { lines: [], couponApplied: false };
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(storageKey) ?? "null",
    );
    if (!isRecord(saved) || saved.version !== 1 || !Array.isArray(saved.lines))
      return empty;
    const lines: CartLine[] = [];
    for (const item of saved.lines) {
      if (
        !isRecord(item) ||
        typeof item.coffeeId !== "string" ||
        !findCoffee(item.coffeeId)
      )
        continue;
      if (item.weight !== 250 && item.weight !== 500) continue;
      if (item.preparation !== "beans" && item.preparation !== "ground")
        continue;
      if (
        typeof item.quantity !== "number" ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1
      )
        continue;
      const line: CartLine = {
        coffeeId: item.coffeeId,
        weight: item.weight,
        preparation: item.preparation,
        quantity: Math.min(9, item.quantity),
      };
      const existing = lines.find(
        (current) => lineKey(current) === lineKey(line),
      );
      if (existing)
        existing.quantity = Math.min(9, existing.quantity + line.quantity);
      else lines.push(line);
    }
    return { lines, couponApplied: saved.coupon === "BRUMA15" };
  } catch {
    return empty;
  }
}
export function persistCart(lines: CartLine[], couponApplied: boolean) {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        version: 1,
        lines,
        coupon: couponApplied ? "BRUMA15" : null,
      }),
    );
  } catch {
    /* The current purchase remains usable if storage is unavailable. */
  }
}
