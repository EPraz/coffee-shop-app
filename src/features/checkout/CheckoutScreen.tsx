import { PaymentDemoControls } from "./PaymentDemoControls";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowUpRight, LoaderCircle, Sparkles } from "lucide-react";
import { useCart } from "../cart/cart-context";
import { cartAmounts } from "../cart/cart-model";
import { CartScreen } from "../cart/CartScreen";
import { OrderSummary } from "../cart/OrderSummary";
import { useCheckout } from "./useCheckout";
import { CheckoutFields } from "./CheckoutFields";
import { CheckoutSelection } from "./CheckoutSelection";
import { CheckoutChanges } from "./CheckoutChanges";
export function CheckoutScreen() {
  const { t } = useTranslation();
  const cart = useCart();
  const form = useCheckout();
  if (!cart.lines.length) return <CartScreen />;
  return (
    <section className="section-shell checkout-screen">
      <Link to="/bag" className="back-link">
        <ArrowLeft size={16} />
        {t("checkout.back")}
      </Link>
      <header className="page-heading">
        <p className="eyebrow">{t("checkout.eyebrow")}</p>
        <h1>{t("checkout.title")}</h1>
      </header>
      <div className="checkout-layout">
        <div>
          <div className="checkout-section-title">
            <div>
              <h2>{t("checkout.details")}</h2>
              <p>{t("checkout.intro")}</p>
            </div>
            <button
              className="fill-demo"
              type="button"
              onClick={form.fillDemo}
              disabled={form.pending}
            >
              <Sparkles size={15} />
              {t("checkout.fill")}
            </button>
          </div>
          <form
            id="checkout-form"
            noValidate
            aria-busy={form.pending}
            onSubmit={form.submit}
          >
            <CheckoutFields form={form} />
            <div className="demo-panel">
              <p className="eyebrow">{t("checkout.demoLabel")}</p>
              <p>{t("checkout.demoCopy")}</p>
              <PaymentDemoControls
                outcome={form.outcome}
                onChange={form.chooseOutcome}
                pending={form.pending}
              />
            </div>
          </form>
          <div className="checkout-selected">
            <h2>{t("checkout.yourSelection")}</h2>
            <CheckoutSelection lines={cart.lines} />
          </div>
        </div>
        <OrderSummary {...cartAmounts(cart.lines, cart.couponApplied)}>
          {(form.paymentError || form.purchaseError) && (
            <p className="payment-error" role="alert">
              {form.purchaseError === "payment_rejected"
                ? t("checkout.retryMessage")
                : t(`admin.errors.${form.purchaseError}`, {
                    defaultValue: t("admin.connectionCopy"),
                  })}
            </p>
          )}
          <button
            form="checkout-form"
            type="submit"
            className="button button-primary button-full"
            disabled={form.pending}
          >
            {t(form.pending ? "checkout.pending" : "checkout.place")}
            {form.pending ? (
              <LoaderCircle className="spin" size={18} />
            ) : (
              <ArrowUpRight size={18} />
            )}
          </button>
        </OrderSummary>
      </div>
      {form.review && (
        <CheckoutChanges
          quote={form.review}
          onApply={form.applyReview}
          onClose={form.closeReview}
        />
      )}
    </section>
  );
}
