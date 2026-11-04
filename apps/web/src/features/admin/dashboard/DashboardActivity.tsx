import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { findCoffee } from "../../catalog/coffee";
import { CoffeeVisual } from "../../catalog/CoffeeVisual";
import { OrderDate } from "../../orders/OrderDate";
import { Price } from "../../../shared/ui/Price";
import type { Dashboard } from "@bruma/contracts/dashboard";

export function LeadingCoffees({ leading }: { leading: Dashboard["leading"] }) {
  const { t } = useTranslation();
  return (
    <section className="dashboard-panel leading-coffees">
      <header>
        <div>
          <p className="eyebrow">BRUMA / 05</p>
          <h2>{t("admin.leadingCoffees")}</h2>
        </div>
      </header>
      {!leading.length && <p className="admin-empty">{t("admin.noSales")}</p>}
      {leading.slice(0, 5).map((item, index) => {
        const coffee = findCoffee(item.coffeeId)!;
        return (
          <Link
            to="/admin/catalog"
            className="leading-coffee"
            key={item.coffeeId}
          >
            <span className="leading-rank">0{index + 1}</span>
            <CoffeeVisual coffee={coffee} small />
            <div>
              <h3>{coffee.name}</h3>
              <p>{t("admin.bagsSold", { count: item.bags })}</p>
            </div>
            <Price cents={item.sales} />
          </Link>
        );
      })}
    </section>
  );
}
export function DashboardActivity({ data }: { data: Dashboard }) {
  const { t } = useTranslation();
  return (
    <div className="dashboard-bottom">
      <section className="dashboard-panel recent-orders">
        <header>
          <h2>{t("admin.recentOrders")}</h2>
          <Link className="text-link" to="/admin/orders">
            {t("admin.viewAll")}
            <ArrowUpRight size={15} />
          </Link>
        </header>
        {!data.recent.length && (
          <p className="admin-empty">{t("admin.noOrders")}</p>
        )}
        {data.recent.map((order) => (
          <Link
            className="recent-order"
            data-testid="recent-order"
            key={order.number}
            to={`/admin/orders/${order.number}`}
          >
            <div>
              <strong>{order.number}</strong>
              <span>
                <OrderDate date={order.createdAt} />
              </span>
            </div>
            <span className={`order-state state-${order.state}`}>
              {t("admin.states." + order.state)}
            </span>
            <Price cents={order.amounts.total} />
          </Link>
        ))}
      </section>
      <section className="dashboard-panel stock-alerts">
        <header>
          <h2>{t("admin.stockAlerts")}</h2>
          <span className="stock-count">{data.lowStock.length}</span>
        </header>
        {!data.lowStock.length && (
          <p className="admin-empty">{t("admin.healthyStock")}</p>
        )}
        {data.lowStock.map((variant) => (
          <Link
            className="stock-alert"
            data-testid="stock-alert"
            to="/admin/catalog"
            key={variant.coffeeId + variant.weight + variant.preparation}
          >
            <div>
              <h3>{findCoffee(variant.coffeeId)?.name}</h3>
              <p>
                {variant.weight} g · {t("product." + variant.preparation)}
              </p>
            </div>
            <span className={variant.stock === 0 ? "stock-empty" : ""}>
              {variant.stock === 0
                ? t("common.soldOut")
                : t("admin.bagsLeft", { count: variant.stock })}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
