import { test, expect } from "../support/fixtures";

test("an approved purchase becomes a durable receipt without customer details", async ({
  page,
  context,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Promo code", exact: true })
    .fill("BRUMA15");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  const number = await page.getByTestId("order-number").innerText();
  await page
    .getByRole("link", { name: "My orders", exact: true })
    .first()
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(1);
  await expect(page.getByTestId("history-order")).toContainText(number);
  await expect(page.getByTestId("history-order")).toContainText("21.57");
  await page.reload();
  await page
    .getByRole("link", { name: `View order ${number}`, exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(number);
  await expect(page.getByTestId("cart-total")).toContainText("21.57");
  await expect(page.getByText("Alex Rivera", { exact: true })).toHaveCount(0);
  const another = await context.newPage();
  await another.goto("/orders");
  await expect(another.getByTestId("history-order")).toHaveCount(1);
});

test("example receipts preserve historical products and clearing requires confirmation", async ({
  page,
}) => {
  await page.goto("/orders");
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Load example orders", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("link", { name: "View order BR-EXAMPLE-02", exact: true })
    .click();
  await expect(
    page.getByRole("paragraph").filter({ hasText: /^Sol de Ayer$/ }),
  ).toBeVisible();
  await expect(page.getByTestId("cart-total")).toContainText("55.00");
  await page.reload();
  await expect(page.getByTestId("cart-total")).toContainText("55.00");
  await page
    .getByRole("link", { name: "Back to my orders", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear history", exact: true })
    .click();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(page.getByTestId("history-order")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Clear history", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Delete saved orders", exact: true })
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Load example orders", exact: true }),
  ).toBeVisible();
});
