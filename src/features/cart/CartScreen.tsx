import { CouponForm } from "./CouponForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-context";
import { cartAmounts, lineKey } from "./cart-model";
import { findCoffee } from "../catalog/coffee";
import { CartLineItem } from "./CartLineItem";
import { OrderSummary } from "./OrderSummary";
export function CartScreen() {
  const { t } = useTranslation();
  const cart = useCart();
  const [limit, setLimit] = useState(false);
  if (!cart.lines.length)
    return (
      <div className="section-shell cart-screen empty-state">
        <ShoppingBag size={40} />
        <h1>{t("cart.empty")}</h1>
        <p>{t("cart.emptyCopy")}</p>
        <Link to="/coffees" className="button button-primary">
          {t("home.cta")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    );
  return (
    <section className="section-shell cart-screen">
      <header className="page-heading">
        <p className="eyebrow">{t("cart.eyebrow")}</p>
        <h1>{t("cart.title")}</h1>
      </header>
      <div className="cart-layout">
        <div>
          <ul className="cart-lines">
            {cart.lines.map((line) => {
              const coffee = findCoffee(line.coffeeId)!;
              return (
                <CartLineItem
                  key={lineKey(line)}
                  line={line}
                  coffee={coffee}
                  onChange={(delta) =>
                    setLimit(!cart.changeQuantity(lineKey(line), delta))
                  }
                  onRemove={() => {
                    cart.remove(lineKey(line));
                    setLimit(false);
                  }}
                />
              );
            })}
          </ul>
          <p role="status" className="inline-message">
            {limit ? t("cart.limit") : ""}
          </p>
          <Link to="/coffees" className="text-link">
            {t("cart.continue")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <OrderSummary
          {...cartAmounts(cart.lines, cart.couponApplied)}
          couponContent={
            <CouponForm
              applied={cart.couponApplied}
              onApply={cart.applyCoupon}
            />
          }
        >
          <Link to="/checkout" className="button button-primary button-full">
            {t("cart.checkout")}
            <ArrowUpRight size={18} />
          </Link>
        </OrderSummary>
      </div>
    </section>
  );
}
