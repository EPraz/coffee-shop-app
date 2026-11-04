import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useOrderHistory } from "./history-context";
import { CheckoutSelection } from "../checkout/CheckoutSelection";
import { OrderSummary } from "../cart/OrderSummary";
import { HistoryStorageNotice } from "./HistoryStorageNotice";
import { OrderDate } from "./OrderDate";
import { OrderStatus } from "./OrderStatus";
import "./orders.css";

export function OrderReceiptScreen() {
  const { t } = useTranslation();
  const { orderNumber } = useParams();
  const order = useOrderHistory().orders.find(
    (item) => item.number === orderNumber,
  );
  return (
    <section className="section-shell history-screen">
      <header className="functional-heading">
        <p className="eyebrow">{t("history.receipt")}</p>
        <h1>{order?.number ?? t("history.missing")}</h1>
        {order ? (
          <p>
            <OrderDate date={order.createdAt} />
            {order.example && <> · {t("history.example")}</>}
          </p>
        ) : (
          <p>{t("history.missingCopy")}</p>
        )}
      </header>
      <HistoryStorageNotice />
      {order && <OrderStatus order={order} />}
      {order && (
        <div className="confirmation-layout">
          <div>
            <h2 className="receipt-selection-title">{t("checkout.receipt")}</h2>
            <CheckoutSelection lines={order.items} />
            <p className="brew-note">{t("history.snapshot")}</p>
            <Link
              className="text-link brew-entry"
              to={`/brew?coffee=${order.items[0]?.coffeeId ?? ""}`}
            >
              {t("brew.entry")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <OrderSummary {...order.amounts} />
        </div>
      )}
      {order && (
        <Link
          to={`/orders/${order.number}/reorder`}
          className="button button-primary history-back"
        >
          {t("reorder.entry")}
          <ArrowUpRight size={18} />
        </Link>
      )}
      <Link to="/orders" className="text-link history-back">
        <ArrowLeft size={16} />
        {t("history.back")}
      </Link>
    </section>
  );
}
