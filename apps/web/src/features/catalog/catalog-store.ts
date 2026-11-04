import { useEffect, useSyncExternalStore } from "react";
import { api } from "../../shared/api/client";
import { replaceCatalog, type Coffee } from "./coffee";

export interface CatalogResponse {
  generation: string;
  coffees: Coffee[];
}
let state: {
  status: "loading" | "ready" | "error";
  data: CatalogResponse | null;
} = { status: "loading", data: null };
let pending: Promise<boolean> | null = null;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
const snapshot = () => state;
export function refreshCatalog(): Promise<boolean> {
  if (pending) return pending;
  pending = api<CatalogResponse>("/catalog")
    .then((data) => {
      replaceCatalog(data.coffees);
      state = { status: "ready", data };
      return true;
    })
    .catch(() => {
      state = { ...state, status: "error" };
      return false;
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
