import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../shared/api";
import { actionError } from "./Toast";

export function useAdminResource<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const latestRequest = useRef({ version: 0 });
  const refresh = useCallback(async () => {
    const request = ++latestRequest.current.version;
    setLoading(true);
    setError(null);
    try {
      const result = await api<T>(path);
      if (request === latestRequest.current.version) setData(result);
    } catch (failure) {
      if (request === latestRequest.current.version)
        setError(actionError(failure));
    } finally {
      if (request === latestRequest.current.version) setLoading(false);
    }
  }, [path]);
  useEffect(() => {
    const requests = latestRequest.current;
    void refresh();
    const onFocus = () => {
      void refresh();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("bruma:store-reset", onFocus);
    return () => {
      requests.version++;
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("bruma:store-reset", onFocus);
    };
  }, [refresh]);
  return { data, error, loading, refresh };
}
