import { useEffect, useSyncExternalStore } from "react";
import { api } from "../../shared/api";
import { replaceCatalog, type Coffee } from "./coffee";

export interface CatalogResponse {
  generation: string;
  coffees: Coffee[];
}
let state: {
  status: "loading" | "ready" | "error";
  data: CatalogResponse | null;
} = { status: "loading", data: null };
let pending: Promise<void> | null = null;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
const snapshot = () => state;
export function refreshCatalog(): Promise<void> {
  if (pending) return pending;
  pending = api<CatalogResponse>("/catalog")
    .then((data) => {
      replaceCatalog(data.coffees);
      state = { status: "ready", data };
    })
    .catch(() => {
      state = { ...state, status: "error" };
    })
    .finally(() => {
      pending = null;
      for (const listener of listeners) listener();
    });
  return pending;
}
export function currentGeneration() {
  return state.data?.generation ?? "";
}
export function useStoreCatalog() {
  const result = useSyncExternalStore(subscribe, snapshot);
  useEffect(() => {
    void refreshCatalog();
    const onFocus = () => {
      void refreshCatalog();
    };
    window.addEventListener("focus", onFocus);
    const interval = window.setInterval(onFocus, 30000);
    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, []);
  return result;
}
