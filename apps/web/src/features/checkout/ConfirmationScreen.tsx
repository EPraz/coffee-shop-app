import "./payment.css";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Check, Leaf } from "lucide-react";
import type { Order } from "../orders/order-model";
import { HistoryStorageNotice } from "../orders/HistoryStorageNotice";
import { CheckoutSelection } from "./CheckoutSelection";
import { OrderSummary } from "../cart/OrderSummary";
export function ConfirmationScreen() {
  const { t } = useTranslation();
  const state = useLocation().state as { order?: Order } | null;
  const order = state?.order;
  if (!order)
    return (
      <div className="section-shell empty-state">
        <Leaf size={40} />
        <h1>{t("checkout.missing")}</h1>
        <p>{t("checkout.missingCopy")}</p>
        <Link className="button button-primary" to="/coffees">
          {t("common.back")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    );
  return (
    <section className="section-shell confirmation-screen">
      <header className="confirmation-heading">
        <span className="confirmation-check">
          <Check size={34} strokeWidth={1.25} />
        </span>
        <p className="eyebrow">{t("checkout.successLabel")}</p>
        <h1>{t("checkout.confirmed")}</h1>
        <p>{t("checkout.confirmedCopy")}</p>
        <div className="order-number">
          <span>{t("checkout.order")}</span>
          <strong data-testid="order-number">{order.number}</strong>
        </div>
      </header>
      <div className="confirmation-layout">
        <div>
          <h2>{t("checkout.receipt")}</h2>
          <CheckoutSelection lines={order.items} />
          <Link className="text-link" to="/coffees">
            {t("checkout.return")}
            <ArrowUpRight size={18} />
          </Link>
          <Link
            className="text-link brew-entry"
            to={`/brew?coffee=${order.items[0]?.coffeeId ?? ""}`}
          >
            {t("brew.entry")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <OrderSummary {...order.amounts} />
      </div>
      <HistoryStorageNotice />
      <Link to="/orders" className="text-link history-back">
        {t("history.nav")}
        <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
