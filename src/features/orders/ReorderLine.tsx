import { useTranslation } from "react-i18next";
import { CoffeeVisual } from "../catalog/CoffeeVisual";
import { Price } from "../../shared/Price";
import type { CartAddition } from "../cart/cart-model";
import type { OrderItem } from "./order-model";

export function ReorderLine({
  item,
  addition,
}: {
  item: OrderItem;
  addition: CartAddition;
}) {
  const { t } = useTranslation();
  const changed =
    addition.currentPrice !== undefined &&
    addition.currentPrice !== item.unitPrice;
  return (
    <li className="reorder-line" data-testid="reorder-line">
      <div className="reorder-thumbnail">
        <CoffeeVisual coffee={item.coffee} small />
      </div>
      <div className="reorder-line-body">
        <h2>{item.coffee.name}</h2>
        <p>
          {item.weight} g · {t(`product.${item.preparation}`)}
        </p>
        <dl className="reorder-prices">
          <div>
            <dt>{t("reorder.previous")}</dt>
            <dd>
              <Price cents={item.unitPrice} />
            </dd>
          </div>
          <div>
            <dt>{t("reorder.current")}</dt>
            <dd>
              {addition.currentPrice === undefined ? (
                "—"
              ) : (
                <Price cents={addition.currentPrice} />
              )}
            </dd>
          </div>
        </dl>
        <p className="reorder-quantities">
          {t("reorder.requested", { count: item.quantity })} ·{" "}
          <strong>{t("reorder.adding", { count: addition.quantity })}</strong>
        </p>
        {changed && (
          <p className="reorder-notice">{t("reorder.priceChanged")}</p>
        )}
        {addition.reason && (
          <p className="reorder-notice">
            {t(
              addition.reason === "stock"
                ? "admin.reorderStockLimit"
                : `reorder.reason.${addition.reason}`,
            )}
          </p>
        )}
      </div>
    </li>
  );
}
