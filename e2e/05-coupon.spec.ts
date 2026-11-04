import { test, expect } from "../test-support/fixtures";

test("BRUMA15 rounds once, excludes shipping and never stacks", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page.getByRole("textbox", { name: "Promo code" }).fill("BRUMA15");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(page.getByTestId("cart-discount")).toContainText("2.93");
  await expect(page.getByTestId("cart-total")).toHaveText("USD 21.57");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(page.getByTestId("cart-total")).toHaveText("USD 21.57");
  await page.getByRole("textbox", { name: "Promo code" }).fill("INVALID");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(
    page.getByText("That code isn't valid. Try BRUMA15."),
  ).toBeVisible();
  await expect(page.getByTestId("cart-total")).toHaveText("USD 21.57");
  await page.getByRole("button", { name: /Increase quantity/ }).click();
  await expect(page.getByTestId("cart-subtotal")).toHaveText("USD 39.00");
  await expect(page.getByTestId("cart-total")).toHaveText("USD 38.15");
});
