import { useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../shared/api";
import { useToast } from "./Toast";

export function AdminResourceError({
  code,
  onRetry,
}: {
  code: string;
  onRetry: () => Promise<void>;
}) {
  const { t } = useTranslation();
  const notify = useToast();
  const [pending, setPending] = useState(false);
  const [renewalFailed, setRenewalFailed] = useState(false);
  const expired = code === "session_expired";
  const recover = async () => {
    setPending(true);
    try {
      if (expired) {
        await api("/access/demo", { method: "POST", body: {} });
        notify({ message: t("admin.renewed") });
      }
      await onRetry();
    } catch {
      setRenewalFailed(true);
    } finally {
      setPending(false);
    }
  };
  return (
    <p role="alert">
      {renewalFailed
        ? t("admin.connectionError")
        : t(`admin.errors.${code}`, {
            defaultValue: t("admin.connectionError"),
          })}{" "}
      <button
        className="text-link"
        disabled={pending}
        onClick={() => void recover()}
      >
        {t(expired ? "admin.enter" : "admin.retry")}
      </button>
    </p>
  );
}
