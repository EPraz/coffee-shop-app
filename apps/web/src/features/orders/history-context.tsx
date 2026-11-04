import { createContext, useContext } from "react";
import type { Order } from "./order-model";
import type { HistoryState } from "./history-storage";

export interface HistoryValue extends HistoryState {
  record: (order: Order) => void;
  loadExamples: () => void;
  clear: () => void;
}
export const HistoryContext = createContext<HistoryValue | null>(null);
export function useOrderHistory() {
  const history = useContext(HistoryContext);
  if (!history) throw new Error("OrderHistoryProvider is required");
  return history;
}
