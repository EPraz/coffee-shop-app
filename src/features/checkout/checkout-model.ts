export const checkoutFields = [
  "name",
  "email",
  "address",
  "city",
  "postal",
  "country",
] as const;
export type CheckoutField = (typeof checkoutFields)[number];
export type FormValues = Record<CheckoutField, string>;
export type FormErrors = Partial<
  Record<CheckoutField, "required" | "invalidEmail">
>;
export const emptyValues: FormValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  postal: "",
  country: "",
};
export function validateField(
  field: CheckoutField,
  value: string,
): "required" | "invalidEmail" | undefined {
  if (!value.trim()) return "required";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
    return "invalidEmail";
}
