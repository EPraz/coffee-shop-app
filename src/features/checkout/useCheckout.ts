import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../cart/cart-context";
import {
  checkoutFields,
  emptyValues,
  validateField,
  createOrder,
  type FormValues,
  type FormErrors,
  type CheckoutField,
} from "./checkout-model";
export function useCheckout() {
  const cart = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, setPending] = useState(false);
  const [outcome, setOutcome] = useState<"approved" | "rejected">("approved");
  const [paymentError, setPaymentError] = useState(false);
  const chooseOutcome = (value: "approved" | "rejected") => {
    setOutcome(value);
    setPaymentError(false);
  };
  const locked = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const change = (field: CheckoutField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({
      ...current,
      [field]: current[field] ? validateField(field, value) : undefined,
    }));
  };
  const fillDemo = () => {
    setValues({
      name: "Alex Rivera",
      email: "alex@example.com",
      address: "123 Coffee Lane",
      city: "Portland",
      postal: "97205",
      country: t("checkout.demoCountry"),
    });
    setErrors({});
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (locked.current || !cart.lines.length) return;
    const nextErrors: FormErrors = {};
    for (const field of checkoutFields) {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    const firstInvalid = checkoutFields.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById("checkout-" + firstInvalid)?.focus();
      return;
    }
    locked.current = true;
    setPending(true);
    setPaymentError(false);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!mounted.current) return;
    if (outcome === "rejected") {
      setPending(false);
      setPaymentError(true);
      locked.current = false;
      return;
    }
    const order = createOrder(cart.lines, cart.couponApplied);
    cart.clear();
    navigate("/confirmation", { state: { order } });
  };
  return {
    values,
    errors,
    pending,
    change,
    fillDemo,
    submit,
    outcome,
    chooseOutcome,
    paymentError,
  };
}
export type CheckoutController = ReturnType<typeof useCheckout>;
