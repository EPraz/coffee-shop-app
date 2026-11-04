import { useTranslation } from "react-i18next";
import { checkoutFields } from "./checkout-model";
import type { CheckoutController } from "./useCheckout";
const autocomplete = {
  name: "name",
  email: "email",
  address: "street-address",
  city: "address-level2",
  postal: "postal-code",
  country: "country-name",
};
export function CheckoutFields({ form }: { form: CheckoutController }) {
  const { t } = useTranslation();
  return (
    <fieldset className="checkout-fields" disabled={form.pending}>
      <legend className="sr-only">{t("checkout.details")}</legend>
      {checkoutFields.map((field) => (
        <div
          key={field}
          className={
            field === "address" ? "form-field field-wide" : "form-field"
          }
        >
          <label htmlFor={"checkout-" + field}>{t("checkout." + field)}</label>
          <input
            id={"checkout-" + field}
            name={field}
            type={field === "email" ? "email" : "text"}
            autoComplete={autocomplete[field]}
            value={form.values[field]}
            onChange={(event) => form.change(field, event.target.value)}
            aria-required="true"
            aria-invalid={!!form.errors[field]}
            aria-describedby={form.errors[field] ? "error-" + field : undefined}
            maxLength={
              field === "email" ? 254 : field === "address" ? 200 : 100
            }
          />
          {form.errors[field] && (
            <p id={"error-" + field} className="error-message">
              {t("checkout." + form.errors[field])}
            </p>
          )}
        </div>
      ))}
    </fieldset>
  );
}
