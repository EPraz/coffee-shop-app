import { useTranslation } from "react-i18next";
import { languageLocales } from "../../../i18n/i18n";
import { Price } from "../../../shared/ui/Price";
import type { Dashboard } from "@bruma/contracts/dashboard";

export function SalesTrend({ trend }: { trend: Dashboard["trend"] }) {
  const { t, i18n } = useTranslation();
  const maximum = Math.max(1, ...trend.map((day) => day.sales));
  const points = trend
    .map(
      (day, index) =>
        `${(index * 600) / Math.max(1, trend.length - 1)},${160 - (day.sales / maximum) * 145}`,
    )
    .join(" ");
  const date = (value: string) =>
    new Intl.DateTimeFormat(languageLocales[i18n.language], {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(value + "T12:00:00Z"));
  return (
    <section className="dashboard-panel sales-trend">
      <header>
        <div>
          <p className="eyebrow">USD / UTC</p>
          <h2>{t("admin.salesTrend")}</h2>
        </div>
        <span className="chart-key">
          <i />
          {t("admin.productSales")}
        </span>
      </header>
      <svg
        viewBox="0 0 600 180"
        role="img"
        aria-label={t("admin.trendAlt")}
        preserveAspectRatio="none"
      >
        <line x1="0" x2="600" y1="15" y2="15" className="chart-gridline" />
        <line x1="0" x2="600" y1="88" y2="88" className="chart-gridline" />
        <line x1="0" x2="600" y1="160" y2="160" className="chart-gridline" />
        <polygon points={`0,180 ${points} 600,180`} className="chart-area" />
        <polyline points={points} className="chart-line" />
      </svg>
      <div className="chart-dates">
        <span>{date(trend[0].date)}</span>
        <span>{date(trend[trend.length - 1].date)}</span>
      </div>
      <details className="daily-sales">
        <summary>{t("admin.viewDaily")}</summary>
        <table aria-label={t("admin.dailySales")}>
          <thead>
            <tr>
              <th scope="col">{t("admin.date")}</th>
              <th scope="col">{t("admin.sales")}</th>
            </tr>
          </thead>
          <tbody>
            {trend.map((day) => (
              <tr key={day.date}>
                <th scope="row">{date(day.date)}</th>
                <td>
                  <Price cents={day.sales} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  );
}
