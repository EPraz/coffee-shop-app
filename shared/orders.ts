import type { Coffee, Preparation, Weight } from "./catalog";

export type OrderState =
  "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled";
export const nextOrderState: Partial<Record<OrderState, OrderState>> = {
  confirmed: "preparing",
  preparing: "shipped",
  shipped: "delivered",
};
export const orderStates: OrderState[] = [
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
];
export interface PurchaseLine {
  coffeeId: string;
  weight: Weight;
  preparation: Preparation;
  quantity: number;
}
export interface Amounts {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}
export type CoffeeSnapshot = Pick<
  Coffee,
  "id" | "name" | "country" | "region" | "roast" | "tone" | "edition"
>;
export interface OrderItem extends PurchaseLine {
  unitPrice: number;
  coffee: CoffeeSnapshot;
}
export interface Order {
  number: string;
  createdAt: string;
  example: boolean;
  items: OrderItem[];
  amounts: Amounts;
  state?: OrderState;
  version?: number;
}
export interface Quote {
  generation: string;
  lines: (PurchaseLine & { unitPrice: number })[];
  couponApplied: boolean;
  amounts: Amounts;
  expires: number;
  token: string;
}
