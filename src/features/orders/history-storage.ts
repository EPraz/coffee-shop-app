import { readOrder } from "./order-validation";
import type { Order } from "./order-model";

export type HistoryStatus = "ready" | "recovered" | "unavailable";
export interface HistoryState {
  orders: Order[];
  status: HistoryStatus;
}
const storageKey = "bruma.orders.v1";
export function recentOrders(orders: Order[]) {
  const seen = new Set<string>();
  return [...orders]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .filter((order) => {
      if (seen.has(order.number)) return false;
      seen.add(order.number);
      return true;
    })
    .slice(0, 20);
}
export function restoreHistory(): HistoryState {
  let raw: string | null;
  try {
    raw = localStorage.getItem(storageKey);
  } catch {
    return { orders: [], status: "unavailable" };
  }
  if (!raw) return { orders: [], status: "ready" };
  try {
    const saved: unknown = JSON.parse(raw);
    if (
      typeof saved !== "object" ||
      saved === null ||
      !("version" in saved) ||
      saved.version !== 1 ||
      !("orders" in saved) ||
      !Array.isArray(saved.orders)
    )
      return { orders: [], status: "recovered" };
    const parsed = saved.orders.map(readOrder);
    const orders = recentOrders(
      parsed.filter((order): order is Order => order !== null),
    );
    return {
      orders,
      status: parsed.some((order) => !order) ? "recovered" : "ready",
    };
  } catch {
    return { orders: [], status: "recovered" };
  }
}
export function persistHistory(orders: Order[]) {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ version: 1, orders }));
    return true;
  } catch {
    return false;
  }
}
