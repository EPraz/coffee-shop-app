import { test, expect } from "../test-support/fixtures";

test("same variant groups, different variants separate and the cart respects its quantity limit", async ({
  page,
}) => {
  await page.goto("/coffees/cerrado");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("button", { name: "500 g", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  const lines = page.getByTestId("cart-line");
  await expect(lines).toHaveCount(2);
  await expect(lines.first().getByTestId("line-quantity")).toHaveText("2");
  await expect(page.getByTestId("cart-subtotal")).toHaveText("USD 68.50");
  await expect(page.getByTestId("cart-total")).toHaveText("USD 73.50");
  for (let n = 0; n < 8; n++)
    await lines
      .first()
      .getByRole("button", { name: /Increase quantity/ })
      .click();
  await expect(lines.first().getByTestId("line-quantity")).toHaveText("9");
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "A maximum of 9 bags per variant." }),
  ).toBeVisible();
  await lines
    .first()
    .getByRole("button", { name: /Remove/ })
    .click();
  await lines
    .first()
    .getByRole("button", { name: /Remove/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Your next ritual starts here." }),
  ).toBeVisible();
});

test("changing language keeps the selected variants and quantities", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Ground", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page.getByRole("combobox", { name: "Language" }).selectOption("pt");
  await expect(page.getByTestId("cart-line")).toHaveCount(1);
  await expect(page.getByTestId("cart-line")).toContainText("Moído");
  await expect(page.getByTestId("line-quantity")).toHaveText("1");
});
