import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "./cart-context";
export function CartNavLink() {
  const { t } = useTranslation();
  const { lines } = useCart();
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  return (
    <Link to="/bag" className="icon-button cart-nav" aria-label={t("nav.cart")}>
      <ShoppingBag size={19} aria-hidden="true" />
      {count > 0 && (
        <span className="cart-count" aria-hidden="true">
          {count}
        </span>
      )}
    </Link>
  );
}
