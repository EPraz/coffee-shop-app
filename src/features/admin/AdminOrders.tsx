import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useAdminResource } from "./useAdminResource";
import { AdminResourceError } from "./AdminResourceError";
import { OrderDate } from "../orders/OrderDate";
import { Price } from "../../shared/Price";
import { CheckoutSelection } from "../checkout/CheckoutSelection";
import { OrderSummary } from "../cart/OrderSummary";
import type { Order } from "../../../shared/orders";
import { OrderActions } from "./OrderActions";

export function AdminOrders() {
  const { t } = useTranslation();
  const { data, error, loading, refresh } = useAdminResource<{
    orders: Order[];
  }>("/admin/orders");
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">{t("admin.sharedLabel")}</p>
          <h1>{t("admin.orders")}</h1>
          <p>{t("admin.ordersCopy")}</p>
        </div>
      </div>
      {error && <AdminResourceError code={error} onRetry={refresh} />}
      {loading && !data && <p role="status">{t("admin.loading")}</p>}
      {data && !data.orders.length && (
        <p className="admin-empty">{t("admin.noOrders")}</p>
      )}
      <div className="admin-order-list">
        {data?.orders.map((order) => (
          <Link
            className="admin-order-row"
            data-testid="admin-order"
            key={order.number}
            to={`/admin/orders/${order.number}`}
          >
            <div>
              <strong>{order.number}</strong>
              <span>
                <OrderDate date={order.createdAt} />
                {order.example ? ` · ${t("history.example")}` : ""}
              </span>
            </div>
            <p>{order.items.map((item) => item.coffee.name).join(" · ")}</p>
            <span className={`order-state state-${order.state}`}>
              {t("admin.states." + order.state)}
            </span>
            <Price cents={order.amounts.total} />
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>
    </>
  );
}

export function AdminOrderDetail() {
  const { number = "" } = useParams();
  const { t } = useTranslation();
  const {
    data: order,
    error,
    loading,
    refresh,
  } = useAdminResource<Order>("/admin/orders/" + number);
  return (
    <>
      <Link className="text-link admin-back" to="/admin/orders">
        <ArrowLeft size={16} />
        {t("admin.orders")}
      </Link>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">{t("admin.orderDetail")}</p>
          <h1>{number}</h1>
          {order && (
            <p>
              <OrderDate date={order.createdAt} />
            </p>
          )}
        </div>
      </div>
      {error && <AdminResourceError code={error} onRetry={refresh} />}
      {loading && !order && <p role="status">{t("admin.loading")}</p>}
      {order && (
        <>
          <span
            className={`order-state state-${order.state}`}
            data-testid="admin-order-state"
          >
            {t("admin.states." + order.state)}
          </span>
          <OrderActions order={order} onChanged={refresh} />
          <div className="confirmation-layout">
            <div>
              <h2 className="receipt-selection-title">
                {t("checkout.receipt")}
              </h2>
              <CheckoutSelection lines={order.items} />
            </div>
            <OrderSummary {...order.amounts} />
          </div>
        </>
      )}
    </>
  );
}
