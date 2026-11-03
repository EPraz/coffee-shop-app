import { useRef, useState, type ReactNode } from "react";
import { HistoryContext } from "./history-context";
import {
  persistHistory,
  recentOrders,
  restoreHistory,
  type HistoryState,
} from "./history-storage";
import type { Order } from "./order-model";
import { exampleOrders } from "./example-orders";

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(restoreHistory);
  const latest = useRef<HistoryState>(state);
  const update = (orders: Order[]) => {
    const next: HistoryState = {
      orders,
      status: persistHistory(orders) ? "ready" : "unavailable",
    };
    latest.current = next;
    setState(next);
  };
  const record = (order: Order) => {
    if (latest.current.orders.some((saved) => saved.number === order.number))
      return;
    update(recentOrders([order, ...latest.current.orders]));
  };
  const loadExamples = () => {
    if (!latest.current.orders.length) update(exampleOrders());
  };
  const clear = () => update([]);
  return (
    <HistoryContext.Provider value={{ ...state, record, loadExamples, clear }}>
      {children}
    </HistoryContext.Provider>
  );
}
