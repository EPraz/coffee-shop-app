export interface CheckoutIntent {
  selection: string;
  requestKey: string;
  quoteToken: string;
  outcome: "approved" | "rejected";
}
const key = "bruma.checkout-intent.v3";
let memory: CheckoutIntent | null = null;
export function savedIntent(selection: string) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) ?? "null");
    if (
      saved &&
      typeof saved.requestKey === "string" &&
      typeof saved.quoteToken === "string" &&
      ["approved", "rejected"].includes(saved.outcome) &&
      saved.selection === selection
    )
      return saved as CheckoutIntent;
  } catch {
    /* Keep retry protection in memory if browser storage is blocked. */
  }
  return memory?.selection === selection ? memory : null;
}
export function rememberIntent(intent: CheckoutIntent | null) {
  memory = intent;
  try {
    if (intent) sessionStorage.setItem(key, JSON.stringify(intent));
    else sessionStorage.removeItem(key);
  } catch {
    /* Memory remains available. */
  }
}
