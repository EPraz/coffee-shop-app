import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Package } from "lucide-react";
import { Price } from "../../shared/Price";
interface Props {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  children?: ReactNode;
  couponContent?: ReactNode;
}
export function OrderSummary({
  subtotal,
  discount,
  shipping,
  total,
  children,
  couponContent,
}: Props) {
  const { t } = useTranslation();
  return (
    <aside className="order-summary">
      <p className="eyebrow">BRUMA CAFÉ</p>
      <h2>{t("cart.summary")}</h2>
      {couponContent}
      <dl className="price-breakdown">
        <div>
          <dt>{t("cart.subtotal")}</dt>
          <dd data-testid="cart-subtotal">
            <Price cents={subtotal} />
          </dd>
        </div>
        {discount > 0 && (
          <div className="discount-row">
            <dt>{t("cart.discount")} · BRUMA15</dt>
            <dd data-testid="cart-discount">
              −<Price cents={discount} />
            </dd>
          </div>
        )}
        <div>
          <dt>{t("cart.shipping")}</dt>
          <dd>
            <Price cents={shipping} />
          </dd>
        </div>
        <div className="summary-total">
          <dt>{t("cart.total")}</dt>
          <dd data-testid="cart-total">
            <Price cents={total} />
          </dd>
        </div>
      </dl>
      {children}
      <p className="summary-note">
        <Package size={14} aria-hidden="true" />
        {t("cart.shippingNote")}
      </p>
    </aside>
  );
}
