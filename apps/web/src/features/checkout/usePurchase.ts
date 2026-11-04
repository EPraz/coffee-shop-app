import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, api } from "../../shared/api/client";
import { findCoffee } from "../catalog/coffee";
import { currentGeneration, refreshCatalog } from "../catalog/catalog-store";
import { useCart } from "../cart/cart-context";
import { useOrderHistory } from "../orders/history-context";
import type { Order, Quote } from "@bruma/contracts/orders";
import { rememberIntent, savedIntent } from "./checkout-intent";

export function usePurchase() {
  const cart = useCart();
  const history = useOrderHistory();
  const navigate = useNavigate();
  const initial = useRef({
    generation: currentGeneration(),
    couponApplied: cart.couponApplied,
    lines: cart.lines.map((line) => ({
      ...line,
      unitPrice: findCoffee(line.coffeeId)!.prices[line.weight],
    })),
  });
  const [review, setReview] = useState<Quote | null>(null);
  const [error, setError] = useState("");
  const selection = JSON.stringify({
    lines: cart.lines,
    couponApplied: cart.couponApplied,
  });
  const getReview = () =>
    api<Quote>("/checkout/review", {
      method: "POST",
      body: {
        generation: initial.current.generation,
        lines: cart.lines,
        couponApplied: cart.couponApplied,
      },
    });
  const purchase = async (
    outcome: "approved" | "rejected",
    isMounted: () => boolean,
  ) => {
    setError("");
    try {
      let intent = savedIntent(selection);
      if (!intent) {
        const quote = await getReview();
        const expected = initial.current;
        if (
          expected.generation !== quote.generation ||
          expected.couponApplied !== quote.couponApplied ||
          JSON.stringify(expected.lines) !== JSON.stringify(quote.lines)
        ) {
          setReview(quote);
          return;
        }
        intent = {
          selection,
          requestKey: crypto.randomUUID(),
          quoteToken: quote.token,
          outcome,
        };
        rememberIntent(intent);
      }
      const { requestKey, quoteToken, outcome: selectedOutcome } = intent;
      const order = await api<Order>("/checkout/confirm", {
        method: "POST",
        body: { requestKey, quoteToken, outcome: selectedOutcome },
      });
      if (!isMounted()) return;
      history.record(order);
      cart.clear();
      rememberIntent(null);
      navigate("/confirmation", { state: { order } });
      void refreshCatalog();
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === "review_required" || error.code === "store_reset") {
          rememberIntent(null);
          try {
            setReview(await getReview());
          } catch {
            setError("connectionError");
          }
          return;
        }
        if (error.code === "payment_rejected" || error.code === "validation")
          rememberIntent(null);
        setError(error.code);
      } else setError("connectionError");
    }
  };
  const applyReview = () => {
    if (!review) return;
    cart.replace(
      review.lines.map(({ coffeeId, weight, preparation, quantity }) => ({
        coffeeId,
        weight,
        preparation,
        quantity,
      })),
    );
    initial.current = {
      generation: review.generation,
      lines: review.lines,
      couponApplied: review.couponApplied,
    };
    rememberIntent(null);
    setReview(null);
    void refreshCatalog();
  };
  return {
    purchase,
    review,
    applyReview,
    closeReview: () => setReview(null),
    purchaseError: error,
  };
}
