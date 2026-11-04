import "./payment.css";
import { useTranslation } from "react-i18next";
export function PaymentDemoControls({
  outcome,
  onChange,
  pending,
}: {
  outcome: "approved" | "rejected";
  onChange: (value: "approved" | "rejected") => void;
  pending: boolean;
}) {
  const { t } = useTranslation();
  return (
    <fieldset className="payment-options" disabled={pending}>
      <legend>{t("checkout.outcome")}</legend>
      <div>
        {(["approved", "rejected"] as const).map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="payment-outcome"
              value={value}
              checked={outcome === value}
              onChange={() => onChange(value)}
            />
            <span>{t("checkout." + value)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
