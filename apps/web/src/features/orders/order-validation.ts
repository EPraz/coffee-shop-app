import type { Coffee } from "../catalog/coffee";
import { lineKey } from "../cart/cart-model";
import type { CoffeeSnapshot, Order, OrderItem } from "./order-model";
import { orderStates, type OrderState } from "@bruma/contracts/orders";

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
const text = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0 && value.length <= 120;
const money = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isSafeInteger(value) &&
  value >= 0 &&
  value <= 1_000_000_000;
function readCoffee(value: unknown): CoffeeSnapshot | null {
  if (
    !record(value) ||
    !text(value.id) ||
    !text(value.name) ||
    !text(value.region) ||
    !text(value.edition)
  )
    return null;
  if (
    !["panama", "brazil", "colombia", "ethiopia"].includes(
      String(value.country),
    ) ||
    !["light", "medium", "dark"].includes(String(value.roast)) ||
    !["sage", "clay", "ochre", "rose", "blue"].includes(String(value.tone))
  )
    return null;
  return {
    id: value.id,
    name: value.name,
    region: value.region,
    edition: value.edition,
    country: value.country as Coffee["country"],
    roast: value.roast as Coffee["roast"],
    tone: value.tone as string,
  };
}
function readItem(value: unknown): OrderItem | null {
  if (!record(value) || !text(value.coffeeId) || !money(value.unitPrice))
    return null;
  if (
    (value.weight !== 250 && value.weight !== 500) ||
    (value.preparation !== "beans" && value.preparation !== "ground")
  )
    return null;
  if (
    typeof value.quantity !== "number" ||
    !Number.isSafeInteger(value.quantity) ||
    value.quantity < 1 ||
    value.quantity > 9
  )
    return null;
  const coffee = readCoffee(value.coffee);
  if (!coffee || coffee.id !== value.coffeeId) return null;
  return {
    coffeeId: value.coffeeId,
    weight: value.weight,
    preparation: value.preparation,
    quantity: value.quantity,
    unitPrice: value.unitPrice,
    coffee,
  };
}
export function readOrder(value: unknown): Order | null {
  if (
    !record(value) ||
    !text(value.number) ||
    !/^BR-[A-Z0-9-]{1,50}$/.test(value.number) ||
    !text(value.createdAt) ||
    !Number.isFinite(Date.parse(value.createdAt)) ||
    typeof value.example !== "boolean" ||
    !Array.isArray(value.items) ||
    !value.items.length ||
    value.items.length > 40 ||
    !record(value.amounts)
  )
    return null;
  const items = value.items.map(readItem);
  if (items.some((item) => !item)) return null;
  const validItems = items as OrderItem[];
  if (new Set(validItems.map(lineKey)).size !== validItems.length) return null;
  const { subtotal, discount, shipping, total } = value.amounts;
  if (
    !money(subtotal) ||
    !money(discount) ||
    !money(shipping) ||
    !money(total) ||
    discount > subtotal ||
    subtotal !==
      validItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      ) ||
    total !== subtotal - discount + shipping
  )
    return null;
  return {
    number: value.number,
    createdAt: value.createdAt,
    example: value.example,
    items: validItems,
    amounts: { subtotal, discount, shipping, total },
    state: orderStates.includes(value.state as OrderState)
      ? (value.state as OrderState)
      : undefined,
    version: typeof value.version === "number" ? value.version : undefined,
  };
}
