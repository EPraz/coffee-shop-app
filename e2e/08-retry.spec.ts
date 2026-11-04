import { test, expect } from "../test-support/fixtures";

test("rejected payment preserves the form and variants before an approved retry", async ({
  page,
}) => {
  await page.goto("/coffees/cerrado");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("button", { name: "500 g", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page.getByRole("textbox", { name: "Promo code" }).fill("BRUMA15");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page.getByRole("radio", { name: "Rejected", exact: true }).check();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText(
    "Your bag and details are safe.",
  );
  await expect(page).toHaveURL("/checkout");
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toHaveValue("Alex Rivera");
  await expect(page.getByTestId("cart-total")).toHaveText("USD 47.92");
  await page.getByRole("radio", { name: "Approved", exact: true }).check();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A good moment, confirmed.",
  );
  await expect(page.getByTestId("cart-total")).toHaveText("USD 47.92");
  await expect(page.getByTestId("order-number")).toHaveCount(1);
});
