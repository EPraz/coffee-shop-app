import { createContext, useContext, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Check, CircleAlert, X } from "lucide-react";
import { ApiError, api } from "../../shared/api";

type Notice = { message: string; error?: boolean; expired?: boolean };
const ToastContext = createContext<(notice: Notice) => void>(() => {});
export function useToast() {
  return useContext(ToastContext);
}
export function actionError(error: unknown) {
  return error instanceof ApiError ? error.code : "connectionError";
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [notice, notify] = useState<Notice | null>(null);
  const [renewing, setRenewing] = useState(false);
  const renew = async () => {
    setRenewing(true);
    try {
      await api("/access/demo", { method: "POST", body: {} });
      notify({ message: t("admin.renewed") });
    } catch {
      notify({
        message: t("admin.connectionError"),
        error: true,
        expired: true,
      });
    } finally {
      setRenewing(false);
    }
  };
  return (
    <ToastContext.Provider value={notify}>
      {children}
      {notice && (
        <div
          className={`admin-toast${notice.error ? " toast-error" : ""}`}
          role={notice.error ? "alert" : "status"}
        >
          {notice.error ? <CircleAlert size={20} /> : <Check size={20} />}
          <div>
            <p>{notice.message}</p>
            {notice.expired && (
              <button
                className="text-link"
                disabled={renewing}
                onClick={() => void renew()}
              >
                {t("admin.enter")}
              </button>
            )}
          </div>
          <button aria-label={t("admin.dismiss")} onClick={() => notify(null)}>
            <X size={16} />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}
