import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { type Coffee } from "../catalog/coffee";
import { CoffeeVisual } from "../catalog/CoffeeVisual";
import { Price } from "../../shared/ui/Price";
import type { CartLine } from "./cart-model";
interface Props {
  line: CartLine;
  coffee: Coffee;
  onChange: (delta: number) => void;
  onRemove: () => void;
}
export function CartLineItem({ line, coffee, onChange, onRemove }: Props) {
  const { t } = useTranslation();
  const name = `${coffee.name}, ${line.weight} g, ${t("product." + line.preparation)}`;
  return (
    <li className="cart-line" data-testid="cart-line">
      <Link
        className="cart-thumbnail"
        to={`/coffees/${coffee.id}`}
        aria-label={t("common.discover") + ": " + coffee.name}
      >
        <CoffeeVisual coffee={coffee} small />
      </Link>
      <div className="cart-line-info">
        <Link to={`/coffees/${coffee.id}`} className="cart-line-name">
          {coffee.name}
        </Link>
        <p>
          {t("country." + coffee.country)} · {line.weight} g ·{" "}
          {t("product." + line.preparation)}
        </p>
        <p className="cart-unit-price">
          <span data-testid="cart-unit-price">
            <Price cents={coffee.prices[line.weight]} />
          </span>{" "}
          {t("cart.perBag")}
        </p>
        <div className="quantity-control">
          <button
            type="button"
            aria-label={t("cart.decrease", { name })}
            disabled={line.quantity === 1}
            onClick={() => onChange(-1)}
          >
            <Minus size={13} />
          </button>
          <span data-testid="line-quantity" aria-label={t("cart.quantity")}>
            {line.quantity}
          </span>
          <button
            type="button"
            aria-label={t("cart.increase", { name })}
            onClick={() => onChange(1)}
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
      <div className="cart-line-end">
        <button
          className="remove-line"
          type="button"
          aria-label={t("cart.remove", { name })}
          onClick={onRemove}
        >
          <X size={16} />
        </button>
        <Price cents={coffee.prices[line.weight] * line.quantity} />
      </div>
    </li>
  );
}
