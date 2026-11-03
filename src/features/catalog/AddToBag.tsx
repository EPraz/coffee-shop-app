import { lineKey } from "../cart/cart-model";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "../cart/cart-context";
import type { Coffee, Weight, Preparation } from "./coffee";
export function AddToBag({
  coffee,
  weight,
  preparation,
}: {
  coffee: Coffee;
  weight: Weight;
  preparation: Preparation;
}) {
  const { t } = useTranslation();
  const { add, lines } = useCart();
  const quantity =
    lines.find(
      (line) =>
        lineKey(line) === lineKey({ coffeeId: coffee.id, weight, preparation }),
    )?.quantity ?? 0;
  const [message, setMessage] = useState("");
  return (
    <div className="add-to-bag">
      <button
        type="button"
        className="button button-primary button-full"
        onClick={() => setMessage(add(coffee.id, weight, preparation))}
      >
        {t("cart.add")}
        {message === "added" ? <Check size={18} /> : <Plus size={18} />}
      </button>
      <p className="inline-message" role="status">
        {message ? t(message === "stock" ? "admin.stockLimit" : "cart." + message) : ""}
        {message === "added"
          ? " " + t("cart.count", { count: quantity }) + "."
          : ""}
      </p>
    </div>
  );
}
