import { useEffect, useRef, useState, type ReactNode } from "react";
import { HistoryContext } from "./history-context";
import {
  persistHistory,
  recentOrders,
  restoreHistory,
  historyStorageKey,
  type HistoryState,
} from "./history-storage";
import type { Order } from "./order-model";
import { exampleOrders } from "./example-orders";

function reconcileHistory(
  current: HistoryState,
  unsaved: Order[],
): HistoryState {
  const saved = restoreHistory();
  if (saved.status === "unavailable")
    return { ...current, status: "unavailable" };
  return {
    orders: recentOrders([...saved.orders, ...unsaved]),
    status: unsaved.length ? "unavailable" : saved.status,
  };
}

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(restoreHistory);
  const latest = useRef<HistoryState>(state);
  const unsaved = useRef<Order[]>([]);
  useEffect(() => {
    const refresh = (event: StorageEvent) => {
      if (event.key !== historyStorageKey && event.key !== null) return;
      const next = reconcileHistory(latest.current, unsaved.current);
      latest.current = next;
      setState(next);
    };
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);
  const update = (orders: Order[], added: Order[] = []) => {
    const persisted = persistHistory(orders);
    const included = new Set(orders.map((order) => order.number));
    unsaved.current = persisted
      ? []
      : recentOrders([...unsaved.current, ...added]).filter((order) =>
          included.has(order.number),
        );
    const next: HistoryState = {
      orders,
      status: persisted ? "ready" : "unavailable",
    };
    latest.current = next;
    setState(next);
  };
  const record = (order: Order) => {
    const current = reconcileHistory(latest.current, unsaved.current);
    if (current.orders.some((saved) => saved.number === order.number)) return;
    update(recentOrders([order, ...current.orders]), [order]);
  };
  const loadExamples = () => {
    const current = reconcileHistory(latest.current, unsaved.current);
    if (!current.orders.length) {
      const examples = exampleOrders();
      update(examples, examples);
    } else {
      latest.current = current;
      setState(current);
    }
  };
  const clear = () => update([]);
  return (
    <HistoryContext.Provider value={{ ...state, record, loadExamples, clear }}>
      {children}
    </HistoryContext.Provider>
  );
}
