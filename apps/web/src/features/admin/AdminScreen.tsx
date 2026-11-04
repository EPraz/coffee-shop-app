import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Leaf, LogOut } from "lucide-react";
import { NavLink, Routes, Route } from "react-router-dom";
import { api } from "../../shared/api/client";
import { AdminCatalog } from "./catalog/AdminCatalog";
import { AdminDashboard } from "./dashboard/AdminDashboard";
import { ResetDemo } from "./demo/ResetDemo";
import { AdminOrders, AdminOrderDetail } from "./orders/AdminOrders";
import { ToastProvider } from "./shared/Toast";
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
        <div className="admin-tools">
          <nav className="admin-tabs" aria-label={t("admin.studio")}>
            <NavLink to="/admin" end>
              {t("admin.overview")}
            </NavLink>
            <NavLink to="/admin/catalog">{t("admin.collection")}</NavLink>
            <NavLink to="/admin/orders">{t("admin.orders")}</NavLink>
          </nav>
          <ResetDemo />
        </div>
        <p className="admin-shared-note">
          <Leaf size={15} />
          {t("admin.shared")}
        </p>
        {error && <p role="alert">{t("admin.connectionError")}</p>}
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="catalog" element={<AdminCatalog />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:number" element={<AdminOrderDetail />} />
        </Routes>
      </section>
    </ToastProvider>
  );
}
