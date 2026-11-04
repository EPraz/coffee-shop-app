import "./reset.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RotateCcw } from "lucide-react";
import { api } from "../../../shared/api/client";
import { Modal } from "../../../shared/ui/Modal";
import { currentGeneration, refreshCatalog } from "../../catalog/catalog-store";
import { actionError, useToast } from "../shared/Toast";

export function ResetDemo() {
  const { t } = useTranslation();
  const notify = useToast();
  const [generation, confirm] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const reset = async () => {
    if (pending || !generation) return;
    setPending(true);
    try {
      await api("/admin/reset", { method: "POST", body: { generation } });
      await refreshCatalog();
      window.dispatchEvent(new Event("bruma:store-reset"));
      setPending(false);
      confirm(null);
      notify({ message: t("admin.resetDone") });
    } catch (error) {
      setPending(false);
      confirm(null);
      const code = actionError(error);
      notify({
        message: t(`admin.errors.${code}`, {
          defaultValue: t("admin.connectionError"),
        }),
        error: true,
        expired: code === "session_expired",
      });
      if (code === "store_reset") {
        await refreshCatalog();
        window.dispatchEvent(new Event("bruma:store-reset"));
      }
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <button
        className="admin-reset"
        onClick={() => confirm(currentGeneration())}
        disabled={pending}
      >
        <RotateCcw size={14} />
        {t("admin.reset")}
      </button>
      {generation && (
        <Modal
          title={t("admin.resetTitle")}
          onClose={() => {
            if (!pending) confirm(null);
          }}
        >
          <p>{t("admin.resetCopy")}</p>
          <div className="modal-actions">
            <button
              className="button button-secondary"
              onClick={() => confirm(null)}
              disabled={pending}
            >
              {t("admin.cancel")}
            </button>
            <button
              className="button button-primary"
              onClick={() => void reset()}
              disabled={pending}
            >
              {t(pending ? "admin.resetting" : "admin.restoreSamples")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
