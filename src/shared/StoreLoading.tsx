import { useTranslation } from "react-i18next";
import { Brand } from "./Brand";
import { refreshCatalog } from "../features/catalog/catalog-store";
export function StoreLoading({ error }: { error: boolean }) {
  const { t } = useTranslation();
  return (
    <main className="section-shell store-loading" aria-busy={!error}>
      <Brand />
      <p className="eyebrow">BRUMA CAFÉ</p>
      <h1>{t(error ? "admin.connectionError" : "admin.loading")}</h1>
      <p role={error ? "alert" : "status"}>
        {t(error ? "admin.connectionCopy" : "admin.loadingCopy")}
      </p>
      <button
        className="button button-primary"
        onClick={() => void refreshCatalog()}
      >
        {t("admin.retry")}
      </button>
    </main>
  );
}
