import { findCoffee } from "../catalog/coffee";
import { cartAmounts, type CartLine } from "../cart/cart-model";
export const checkoutFields = [
  "name",
  "email",
  "address",
  "city",
  "postal",
  "country",
] as const;
export type CheckoutField = (typeof checkoutFields)[number];
export type FormValues = Record<CheckoutField, string>;
export type FormErrors = Partial<
  Record<CheckoutField, "required" | "invalidEmail">
>;
export const emptyValues: FormValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  postal: "",
  country: "",
};
export function validateField(
  field: CheckoutField,
  value: string,
): "required" | "invalidEmail" | undefined {
  if (!value.trim()) return "required";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
    return "invalidEmail";
}
export interface Order {
  number: string;
  items: (CartLine & { unitPrice: number })[];
  amounts: ReturnType<typeof cartAmounts>;
}
export function createOrder(lines: CartLine[], couponApplied: boolean): Order {
  return {
    number: "BR-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
    items: lines.map((line) => ({
      ...line,
      unitPrice: findCoffee(line.coffeeId)!.prices[line.weight],
    })),
    amounts: cartAmounts(lines, couponApplied),
  };
}
