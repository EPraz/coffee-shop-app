import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Leaf, LogOut, Package } from "lucide-react";
import { api } from "../../shared/api";
import { coffees } from "../catalog/coffee";
import { CoffeeEditor } from "./CoffeeEditor";
import { ToastProvider } from "./Toast";
import "./admin.css";

export default function AdminScreen() {
  const { t } = useTranslation();
  const [session, setSession] = useState<"loading" | "guest" | "admin">(
    "loading",
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    void api("/access/session")
      .then(() => setSession("admin"))
      .catch(() => setSession("guest"));
  }, []);
  const enter = async () => {
    setPending(true);
    setError(false);
    try {
      await api("/access/demo", { method: "POST", body: {} });
      setSession("admin");
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };
  const leave = async () => {
    setPending(true);
    setError(false);
    try {
      await api("/access/session", { method: "DELETE" });
      setSession("guest");
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };
  if (session === "loading")
    return (
      <div className="section-shell admin-entry" role="status">
        {t("admin.loading")}
      </div>
    );
  if (session === "guest")
    return (
      <section className="section-shell admin-entry">
        <div className="admin-entry-copy">
          <p className="eyebrow">BRUMA / {t("admin.studio")}</p>
          <h1>{t("admin.welcome")}</h1>
          <p>{t("admin.welcomeCopy")}</p>
          <button
            className="button button-primary"
            onClick={() => void enter()}
            disabled={pending}
          >
            {t(pending ? "admin.loading" : "admin.enter")}
            <ArrowUpRight size={18} />
          </button>
          <p className="admin-shared-note">
            <Leaf size={16} />
            {t("admin.shared")}
          </p>
          {error && <p role="alert">{t("admin.connectionError")}</p>}
        </div>
        <div className="admin-entry-art">
          <img src="/images/roasting-hero.webp" alt="" />
          <span>{t("admin.entryCaption")}</span>
        </div>
      </section>
    );
  return (
    <ToastProvider>
      <section className="section-shell admin-workspace">
        <header className="admin-topline">
          <p className="eyebrow">BRUMA / {t("admin.studio")}</p>
          <button
            className="text-link"
            onClick={() => void leave()}
            disabled={pending}
          >
            <LogOut size={16} />
            {t("admin.signOut")}
          </button>
        </header>
        <div className="admin-page-heading">
          <div>
            <p className="eyebrow">{t("admin.sharedLabel")}</p>
            <h1>{t("admin.collection")}</h1>
            <p>{t("admin.collectionCopy")}</p>
          </div>
          <Package size={36} strokeWidth={1} />
        </div>
        <p className="admin-shared-note">
          <Leaf size={15} />
          {t("admin.shared")}
        </p>
        {error && <p role="alert">{t("admin.connectionError")}</p>}
        <div className="admin-collection">
          {coffees.map((coffee) => (
            <CoffeeEditor key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>
    </ToastProvider>
  );
}
