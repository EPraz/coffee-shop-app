import "./store-loading.css";
import { useTranslation } from "react-i18next";
import { Brand } from "./Brand";
export function StoreLoading({
  error,
  onRetry,
}: {
  error: boolean;
  onRetry?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <main className="section-shell store-loading" aria-busy={!error}>
      <Brand />
      <p className="eyebrow">BRUMA CAFÉ</p>
      <h1>{t(error ? "admin.connectionError" : "admin.loading")}</h1>
      <p role={error ? "alert" : "status"}>
        {t(error ? "admin.connectionCopy" : "admin.loadingCopy")}
      </p>
      {error && (
        <button className="button button-primary" onClick={onRetry}>
          {t("admin.retry")}
        </button>
      )}
    </main>
  );
}
