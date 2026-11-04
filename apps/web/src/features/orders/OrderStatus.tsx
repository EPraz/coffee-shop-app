import "./order-status.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiError, api } from "../../shared/api/client";
import type { Order } from "./order-model";

export function OrderStatus({ order }: { order: Order }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(order.example ? "example" : "loading");
  const [attempt, retry] = useState(0);
  useEffect(() => {
    if (order.example) return;
    let active = true;
    const refresh = () => {
      void api<Order>(`/orders/${order.number}`)
        .then((result) => {
          if (active) setStatus(result.state ?? "confirmed");
        })
        .catch((error) => {
          if (active)
            setStatus(
              error instanceof ApiError && error.status === 404
                ? "missing"
                : "error",
            );
        });
    };
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("bruma:store-reset", refresh);
    return () => {
      active = false;
      window.removeEventListener("focus", refresh);
      window.removeEventListener("bruma:store-reset", refresh);
    };
  }, [order.number, order.example, attempt]);
  return (
    <div className="order-live-status">
      <span className={`order-state state-${status}`} data-testid="order-state">
        {t(`admin.states.${status}`)}
      </span>
      {status === "error" && (
        <button className="text-link" onClick={() => retry(attempt + 1)}>
          {t("admin.retry")}
        </button>
      )}
    </div>
  );
}
