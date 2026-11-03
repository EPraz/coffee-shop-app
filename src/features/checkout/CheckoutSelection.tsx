import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { findCoffee } from "../catalog/coffee";
import { CoffeeVisual } from "../catalog/CoffeeVisual";
import { Price } from "../../shared/Price";
import { lineKey, type CartLine } from "../cart/cart-model";
export function CheckoutSelection({
  lines,
}: {
  lines: (CartLine & { unitPrice?: number })[];
}) {
  const { t } = useTranslation();
  return (
    <ul className="checkout-selection">
      {lines.map((line) => {
        const coffee = findCoffee(line.coffeeId)!;
        return (
          <li key={lineKey(line)}>
            <Link
              className="selection-thumbnail"
              to={"/coffees/" + coffee.id}
              aria-label={t("common.discover") + ": " + coffee.name}
            >
              <CoffeeVisual coffee={coffee} small />
            </Link>
            <div>
              <p>{coffee.name}</p>
              <span>
                {line.weight} g · {t("product." + line.preparation)} · ×
                {line.quantity}
              </span>
            </div>
            <Price
              cents={
                (line.unitPrice ?? coffee.prices[line.weight]) * line.quantity
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
