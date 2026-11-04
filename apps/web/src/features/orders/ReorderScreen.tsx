import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useOrderHistory } from "./history-context";
import { useCart } from "../cart/cart-context";
import { cartAmounts, planCartAddition } from "../cart/cart-model";
import { OrderSummary } from "../cart/OrderSummary";
import { OrderReceiptScreen } from "./OrderReceiptScreen";
import { ReorderLine } from "./ReorderLine";
import "./orders.css";
import "./reorder.css";

export function ReorderScreen() {
  const { t } = useTranslation();
  const { orderNumber } = useParams();
  const order = useOrderHistory().orders.find(
    (item) => item.number === orderNumber,
  );
  const cart = useCart();
  const navigate = useNavigate();
  const locked = useRef(false);
  const [adding, setAdding] = useState(false);
  if (!order) return <OrderReceiptScreen />;
  const plan = planCartAddition(cart.lines, order.items);
  const confirm = () => {
    if (locked.current || !plan.added) return;
    locked.current = true;
    setAdding(true);
    cart.addMany(order.items);
    navigate("/bag");
  };
  return (
    <section className="section-shell history-screen">
      <header className="functional-heading">
        <p className="eyebrow">
          {t("reorder.eyebrow", { number: order.number })}
        </p>
        <h1>{t("reorder.title")}</h1>
        <p>{t("reorder.intro")}</p>
      </header>
      <div className="reorder-layout">
        <div>
          <ul className="reorder-lines">
            {order.items.map((item, index) => (
              <ReorderLine
                key={`${item.coffeeId}:${item.weight}:${item.preparation}`}
                item={item}
                addition={plan.additions[index]}
              />
            ))}
          </ul>
          <Link
            className="text-link history-back"
            to={`/orders/${order.number}`}
          >
            <ArrowLeft size={16} />
            {t("reorder.cancel")}
          </Link>
        </div>
        <OrderSummary {...cartAmounts(plan.lines, cart.couponApplied)}>
          <p className="reorder-summary-copy">{t("reorder.summaryCopy")}</p>
          <p className="reorder-coupon-note">
            {t(
              cart.couponApplied ? "reorder.couponKept" : "reorder.couponNone",
            )}
          </p>
          {!plan.added && (
            <p className="reorder-empty" role="status">
              {t("reorder.empty")}
            </p>
          )}
          <button
            className="button button-primary button-full"
            disabled={!plan.added || adding}
            onClick={confirm}
          >
            {t("reorder.confirm")}
            <ArrowUpRight size={18} />
          </button>
        </OrderSummary>
      </div>
    </section>
  );
}
