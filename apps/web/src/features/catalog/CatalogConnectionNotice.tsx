import "./catalog-connection.css";
import { useTranslation } from "react-i18next";
import { refreshCatalog } from "./catalog-store";

export function CatalogConnectionNotice() {
  const { t } = useTranslation();
  return (
    <aside className="catalog-connection-notice" role="alert">
      <p>
        <strong>{t("admin.connectionError")}</strong>{" "}
        {t("admin.connectionCopy")}
      </p>
      <button
        className="button button-secondary"
        onClick={() => void refreshCatalog()}
      >
        {t("admin.retry")}
      </button>
    </aside>
  );
}
