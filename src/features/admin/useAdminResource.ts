import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../shared/api";

export function useAdminResource<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const latestRequest = useRef({ version: 0 });
  const refresh = useCallback(async () => {
    const request = ++latestRequest.current.version;
    setLoading(true);
    setError(false);
    try {
      const result = await api<T>(path);
      if (request === latestRequest.current.version) setData(result);
    } catch {
      if (request === latestRequest.current.version) setError(true);
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
