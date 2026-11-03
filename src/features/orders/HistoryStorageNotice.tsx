import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";
import { useOrderHistory } from "./history-context";

export function HistoryStorageNotice() {
  const { t } = useTranslation();
  const { status } = useOrderHistory();
  return status === "ready" ? null : (
    <p className="history-notice" role="status">
      <Info size={18} aria-hidden="true" />
      {t(`history.${status}`)}
    </p>
  );
}
