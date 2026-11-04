import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export function HistoryClearConfirmation({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { t } = useTranslation();
  const cancel = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    cancel.current?.focus();
  }, []);
  return (
    <section
      className="history-clear-confirmation"
      aria-labelledby="history-clear-title"
    >
      <h2 id="history-clear-title">{t("history.clearTitle")}</h2>
      <p>{t("history.clearCopy")}</p>
      <div>
        <button
          ref={cancel}
          className="button button-secondary"
          onClick={onCancel}
        >
          {t("history.cancel")}
        </button>
        <button className="button button-primary" onClick={onConfirm}>
          {t("history.delete")}
        </button>
      </div>
    </section>
  );
}
