import "./checkout-changes.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal } from "../../shared/ui/Modal";
import { Price } from "../../shared/ui/Price";
import type { Quote } from "@bruma/contracts/orders";
import { findCoffee } from "../catalog/coffee";

export function CheckoutChanges({
  quote,
  onApply,
  onClose,
}: {
  quote: Quote;
  onApply: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Modal title={t("admin.reviewTitle")} onClose={onClose}>
      <p>{t("admin.reviewCopy")}</p>
      <ul className="checkout-change-lines">
        {quote.lines.map((line) => (
          <li key={line.coffeeId + line.weight + line.preparation}>
            <span>
              {findCoffee(line.coffeeId)?.name} · {line.weight} g ·{" "}
              {t("product." + line.preparation)} ×{line.quantity}
            </span>
            <Price cents={line.unitPrice * line.quantity} />
          </li>
        ))}
      </ul>
      {!quote.lines.length && <p>{t("admin.emptyReview")}</p>}
      <p className="checkout-change-total">
        {t("cart.total")} <Price cents={quote.amounts.total} />
      </p>
      <div className="modal-actions">
        <Link className="button button-secondary" to="/bag">
          {t("checkout.back")}
        </Link>
        <button className="button button-primary" onClick={onApply}>
          {t("admin.applyChanges")}
        </button>
      </div>
    </Modal>
  );
}
