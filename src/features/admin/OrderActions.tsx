import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import {
  nextOrderState,
  type Order,
  type OrderState,
} from "../../../shared/orders";
import { api } from "../../shared/api";
import { Modal } from "../../shared/Modal";
import { currentGeneration, refreshCatalog } from "../catalog/catalog-store";
import { actionError, useToast } from "./Toast";

export function OrderActions({
  order,
  onChanged,
}: {
  order: Order;
  onChanged: () => Promise<void>;
}) {
  const { t } = useTranslation();
  const notify = useToast();
  const [pending, setPending] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const next = order.state && nextOrderState[order.state];
  const change = async (state: OrderState) => {
    if (pending) return;
    setPending(true);
    try {
      await api(`/admin/orders/${order.number}/state`, {
        method: "PATCH",
        body: {
          state,
          version: order.version,
          generation: currentGeneration(),
        },
      });
      await onChanged();
      await refreshCatalog();
      setPending(false);
      setCancelling(false);
      notify({ message: t("admin.orderUpdated") });
    } catch (error) {
      setPending(false);
      setCancelling(false);
      const code = actionError(error);
      notify({
        message: t(`admin.errors.${code}`, {
          defaultValue: t("admin.connectionError"),
        }),
        error: true,
        expired: code === "session_expired",
      });
      if (code === "order_conflict" || code === "store_reset")
        await onChanged();
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <div className="admin-order-actions">
        {next && (
          <button
            className="button button-primary"
            disabled={pending}
            onClick={() => void change(next)}
          >
            {t("admin.advance." + next)}
            <ArrowUpRight size={16} />
          </button>
        )}
        {["confirmed", "preparing"].includes(order.state ?? "") && (
          <button
            className="button button-secondary"
            disabled={pending}
            onClick={() => setCancelling(true)}
          >
            {t("admin.cancelOrder")}
          </button>
        )}
      </div>
      {cancelling && (
        <Modal
          title={t("admin.cancelTitle")}
          onClose={() => {
            if (!pending) setCancelling(false);
          }}
        >
          <p>{t("admin.cancelCopy")}</p>
          <div className="modal-actions">
            <button
              className="button button-secondary"
              disabled={pending}
              onClick={() => setCancelling(false)}
            >
              {t("admin.keepOrder")}
            </button>
            <button
              className="button button-primary"
              disabled={pending}
              onClick={() => void change("cancelled")}
            >
              {t("admin.confirmCancellation")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
