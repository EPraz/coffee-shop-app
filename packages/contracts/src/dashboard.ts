import type { Preparation, Weight } from "./catalog";
import type { Order } from "./orders";
export interface Dashboard {
  days: 7 | 30;
  range: { from: string; to: string; timeZone: "UTC" };
  sales: number;
  orderCount: number;
  average: number;
  trend: { date: string; sales: number }[];
  leading: { coffeeId: string; sales: number; bags: number }[];
  recent: Order[];
  lowStock: {
    coffeeId: string;
    weight: Weight;
    preparation: Preparation;
    stock: number;
  }[];
}
