import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, History } from "lucide-react";
import { useOrderHistory } from "./history-context";
import { HistoryStorageNotice } from "./HistoryStorageNotice";
import { OrderDate } from "./OrderDate";
import { OrderStatus } from "./OrderStatus";
import { Price } from "../../shared/Price";
import { HistoryClearConfirmation } from "./HistoryClearConfirmation";
import "./orders.css";

export function HistoryScreen() {
  const { t } = useTranslation();
  const history = useOrderHistory();
  const [confirming, setConfirming] = useState(false);
  const clearButton = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  return (
    <section className="section-shell history-screen">
      <header className="functional-heading">
        <p className="eyebrow">{t("history.eyebrow")}</p>
        <h1 ref={heading} tabIndex={-1}>
          {t("history.title")}
        </h1>
        <p>{t("history.intro")}</p>
      </header>
      <HistoryStorageNotice />
      {history.orders.length > 0 && (
        <div className="history-toolbar">
          <p>{t("history.orderCount", { count: history.orders.length })}</p>
          <button
            ref={clearButton}
            className="text-link"
            onClick={() => setConfirming(true)}
          >
            {t("history.clear")}
          </button>
        </div>
      )}
      {confirming && (
        <HistoryClearConfirmation
          onCancel={() => {
            setConfirming(false);
            clearButton.current?.focus();
          }}
          onConfirm={() => {
            history.clear();
            setConfirming(false);
            requestAnimationFrame(() => heading.current?.focus());
          }}
        />
      )}
      {history.orders.length ? (
        <div className="history-list">
          {history.orders.map((order) => (
            <article
              key={order.number}
              data-testid="history-order"
              className="history-order"
            >
              <div className="history-order-meta">
                <span className="eyebrow">{order.number}</span>
                <OrderDate date={order.createdAt} />
                {order.example && (
                  <span className="example-tag">{t("history.example")}</span>
                )}
              </div>
              <div className="history-order-products">
                <OrderStatus order={order} />
                <h2>
                  {order.items.map((item) => item.coffee.name).join(" · ")}
                </h2>
                <p>
                  {t("history.bags", {
                    count: order.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    ),
                  })}
                </p>
              </div>
              <Price
                cents={order.amounts.total}
                className="history-order-total"
              />
              <Link
                className="text-link"
                to={`/orders/${order.number}`}
                aria-label={t("history.view", { number: order.number })}
              >
                {t("history.receipt")}
                <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="history-empty">
          <History size={34} strokeWidth={1} aria-hidden="true" />
          <h2>{t("history.empty")}</h2>
          <p>{t("history.emptyCopy")}</p>
          <Link className="button button-primary" to="/coffees">
            {t("home.cta")}
            <ArrowUpRight size={18} />
          </Link>
          <button
            className="button button-secondary history-examples"
            onClick={history.loadExamples}
          >
            {t("history.loadExamples")}
          </button>
        </div>
      )}
      <p className="history-local-note">{t("history.local")}</p>
    </section>
  );
}
