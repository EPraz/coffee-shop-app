import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { findCoffee } from "../catalog/coffee";
import { CoffeeVisual } from "../catalog/CoffeeVisual";
import { Price } from "../../shared/ui/Price";
import { lineKey, type CartLine } from "../cart/cart-model";
import type { CoffeeSnapshot } from "../orders/order-model";
export function CheckoutSelection({
  lines,
}: {
  lines: (CartLine & { unitPrice?: number; coffee?: CoffeeSnapshot })[];
}) {
  const { t } = useTranslation();
  return (
    <ul className="checkout-selection">
      {lines.map((line) => {
        const current = findCoffee(line.coffeeId);
        const coffee = line.coffee ?? current;
        return (
          <li key={lineKey(line)}>
            {coffee && (
              <Link
                className="selection-thumbnail"
                to={current ? "/coffees/" + coffee.id : "/coffees"}
                aria-label={t("common.discover") + ": " + coffee.name}
              >
                <CoffeeVisual coffee={coffee} small />
              </Link>
            )}
            <div>
              <p>{coffee?.name ?? t("history.unavailableCoffee")}</p>
              <span>
                {line.weight} g · {t("product." + line.preparation)} · ×
                {line.quantity}
              </span>
            </div>
            <Price
              cents={
                (line.unitPrice ?? current?.prices[line.weight] ?? 0) *
                line.quantity
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
