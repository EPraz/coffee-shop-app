import { useState, type FormEvent } from "react";
import { Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
export function CouponForm({
  applied,
  onApply,
}: {
  applied: boolean;
  onApply: (code: string) => boolean;
}) {
  const { t } = useTranslation();
  const [code, setCode] = useState(applied ? "BRUMA15" : "");
  const [invalid, setInvalid] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setInvalid(!onApply(code));
  };
  return (
    <form className="coupon-form" onSubmit={submit}>
      <label htmlFor="promo-code">
        <Tag size={15} aria-hidden="true" />
        {t("cart.coupon")}
      </label>
      <div className="coupon-input-row">
        <input
          id="promo-code"
          aria-label={t("cart.promo")}
          value={code}
          placeholder="BRUMA15"
          onChange={(event) => {
            setCode(event.target.value);
            setInvalid(false);
          }}
          autoComplete="off"
          maxLength={40}
        />
        <button type="submit">{t("cart.apply")}</button>
      </div>
      <p className={invalid ? "error-message" : "coupon-success"} role="status">
        {invalid
          ? t("cart.invalidCoupon")
          : applied
            ? t("cart.couponApplied")
            : ""}
      </p>
    </form>
  );
}
