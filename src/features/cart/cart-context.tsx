import { createContext, useContext } from "react";
import type { CartLine } from "./cart-model";
import type { Weight, Preparation } from "../catalog/coffee";
export interface CartValue {
  lines: CartLine[];
  couponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  addMany: (requested: CartLine[]) => void;
  add: (
    coffeeId: string,
    weight: Weight,
    preparation: Preparation,
  ) => "added" | "limit" | "unavailable";
  changeQuantity: (key: string, delta: number) => boolean;
  remove: (key: string) => void;
  clear: () => void;
}
export const CartContext = createContext<CartValue | null>(null);
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("CartProvider is required");
  return cart;
}
