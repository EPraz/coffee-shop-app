import { persistCart, restoreCart } from "./cart-storage";
import { useEffect, useState, type ReactNode } from "react";
import { findCoffee, variantStock, type Weight, type Preparation } from "../catalog/coffee";
import { CartContext } from "./cart-context";
import { lineKey, planCartAddition, type CartLine } from "./cart-model";
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => restoreCart().lines);
  const [couponApplied, setCouponApplied] = useState(
    () => restoreCart().couponApplied,
  );
  const applyCoupon = (code: string) => {
    if (code.trim().toUpperCase() !== "BRUMA15") return false;
    setCouponApplied(true);
    return true;
  };
  const clear = () => {
    setLines([]);
    setCouponApplied(false);
  };
  useEffect(() => persistCart(lines, couponApplied), [lines, couponApplied]);
  const add = (coffeeId: string, weight: Weight, preparation: Preparation) => {
    const stock = variantStock(findCoffee(coffeeId), weight, preparation);
    if (stock === 0) return "unavailable" as const;
    const variant = { coffeeId, weight, preparation };
    const existing = lines.find((line) => lineKey(line) === lineKey(variant));
    if (existing && existing.quantity >= 9) return "limit" as const;
    if (existing && existing.quantity >= stock) return "stock" as const;
    setLines((current) => {
      const match = current.find((line) => lineKey(line) === lineKey(variant));
      return match
        ? current.map((line) =>
            lineKey(line) === lineKey(variant)
              ? { ...line, quantity: Math.min(9, stock, line.quantity + 1) }
              : line,
          )
        : [...current, { ...variant, quantity: 1 }];
    });
    return "added" as const;
  };
  const changeQuantity = (key: string, delta: number) => {
    const current = lines.find((line) => lineKey(line) === key);
    if (
      !current ||
      current.quantity + delta < 1 ||
      (delta > 0 && current.quantity + delta > Math.min(9, variantStock(findCoffee(current.coffeeId), current.weight, current.preparation)))
    )
      return false;
    setLines((previous) =>
      previous.map((line) =>
        lineKey(line) === key
          ? {
              ...line,
              quantity: Math.max(1, Math.min(9, line.quantity + delta)),
            }
          : line,
      ),
    );
    return true;
  };
  const remove = (key: string) =>
    setLines((current) => current.filter((line) => lineKey(line) !== key));
  const addMany = (requested: CartLine[]) =>
    setLines((current) => planCartAddition(current, requested).lines);
  return (
    <CartContext.Provider
      value={{
        lines,
        couponApplied,
        applyCoupon,
        add,
        addMany,
        changeQuantity,
        remove,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
