import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ShoppingBag, Coffee, Package } from "lucide-react";
import { useAdminResource } from "./useAdminResource";
import { AdminResourceError } from "./AdminResourceError";
import { SalesTrend } from "./SalesTrend";
import { DashboardActivity, LeadingCoffees } from "./DashboardActivity";
import { Price } from "../../shared/Price";
import type { Dashboard } from "../../../shared/dashboard";
import "./dashboard.css";

export function AdminDashboard() {
  const { t } = useTranslation();
  const [days, setDays] = useState<7 | 30>(30);
  const { data, error, loading, refresh } = useAdminResource<Dashboard>(
    `/admin/dashboard?days=${days}`,
  );
  return (
    <div aria-busy={loading}>
      <header className="admin-page-heading dashboard-heading">
        <div>
          <p className="eyebrow">{t("admin.overviewEyebrow")}</p>
          <h1>{t("admin.overview")}</h1>
          <p>{t("admin.overviewCopy")}</p>
        </div>
        <div
          className="dashboard-period"
          role="group"
          aria-label={t("admin.period")}
        >
          {([7, 30] as const).map((period) => (
            <button
              key={period}
              aria-pressed={days === period}
              onClick={() => setDays(period)}
            >
              {t("admin.lastDays", { count: period })}
            </button>
          ))}
        </div>
      </header>
      {error && <AdminResourceError code={error} onRetry={refresh} />}
      {loading && !data && <p role="status">{t("admin.loading")}</p>}
      {data && (
        <>
          <div className="dashboard-metrics">
            <article>
              <span>
                {t("admin.demoSales")}
                <ArrowUpRight size={16} />
              </span>
              <p className="metric-value" data-testid="dashboard-sales">
                <Price cents={data.sales} />
              </p>
              <small>{t("admin.salesNote")}</small>
            </article>
            <article>
              <span>
                {t("admin.orders")}
                <ShoppingBag size={16} />
              </span>
              <p className="metric-value" data-testid="dashboard-orders">
                {data.orderCount}
              </p>
              <small>{t("admin.ordersNote")}</small>
            </article>
            <article>
              <span>
                {t("admin.average")}
                <Coffee size={16} />
              </span>
              <p className="metric-value" data-testid="dashboard-average">
                <Price cents={data.average} />
              </p>
              <small>{t("admin.averageNote")}</small>
            </article>
            <article>
              <span>
                {t("admin.lowStock")}
                <Package size={16} />
              </span>
              <p className="metric-value">
                {data.lowStock.length}
                <em>{t("admin.variants")}</em>
              </p>
              <small>{t("admin.stockNote")}</small>
            </article>
          </div>
          <div className="dashboard-middle">
            <SalesTrend trend={data.trend} />
            <LeadingCoffees leading={data.leading} />
          </div>
          <DashboardActivity data={data} />
          <p className="dashboard-footnote">{t("admin.metricNote")}</p>
        </>
      )}
    </div>
  );
}
