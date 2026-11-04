import { test, expect } from "../support/fixtures";

test("reorder keeps the current coupon and cancelling does not change the bag", async ({
  page,
}) => {
  await page.goto("/orders");
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await page.goto("/coffees/cerrado");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/bag");
  await page
    .getByRole("textbox", { name: "Promo code", exact: true })
    .fill("BRUMA15");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(page.getByTestId("cart-total")).toContainText("20.30");
  await page.goto("/orders/BR-EXAMPLE-01/reorder");
  await expect(page.getByTestId("cart-total")).toContainText("82.77");
  await page
    .getByRole("link", { name: "Back to the receipt", exact: true })
    .click();
  await page.goto("/bag");
  await expect(page.getByTestId("cart-total")).toContainText("20.30");
  await page.goto("/orders/BR-EXAMPLE-01/reorder");
  await page
    .getByRole("button", { name: "Add to my bag", exact: true })
    .click();
  await expect(page.getByTestId("cart-total")).toContainText("82.77");
});

test("archived products are omitted while available variants use current prices", async ({
  page,
}) => {
  await page.goto("/orders");
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await page.goto("/orders/BR-EXAMPLE-02/reorder");
  await expect(
    page.getByTestId("reorder-line").filter({ hasText: "Sol de Ayer" }),
  ).toContainText("no longer in the collection");
  await page
    .getByRole("button", { name: "Add to my bag", exact: true })
    .click();
  await expect(page.getByTestId("cart-total")).toContainText("37.50");
  await expect(
    page.getByRole("link", { name: "Your bag", exact: true }),
  ).toContainText("1");
  await page.goto("/orders/BR-EXAMPLE-02");
  await expect(page.getByTestId("cart-total")).toContainText("55.00");
});

test("reorder cannot confirm when all requested variants are unavailable or at their limit", async ({
  page,
}) => {
  await page.goto("/orders");
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await page.goto("/coffees/niebla");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/bag");
  for (let n = 0; n < 8; n++)
    await page
      .getByRole("button", {
        name: "Increase quantity of Niebla Geisha, 250 g, Whole bean",
        exact: true,
      })
      .click();
  await page.goto("/orders/BR-EXAMPLE-01/reorder");
  await expect(
    page.getByRole("button", { name: "Add to my bag", exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Nothing can be added");
  await page.goto("/orders/not-a-real-order/reorder");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("not");
});

test("reorder excludes sold-out coffee, previews changed prices and caps a merged variant at nine", async ({
  page,
}) => {
  await page.goto("/orders");
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await page.goto("/coffees/niebla");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  for (let n = 0; n < 7; n++)
    await page
      .getByRole("button", {
        name: "Increase quantity of Niebla Geisha, 250 g, Whole bean",
        exact: true,
      })
      .click();
  await page.goto("/orders/BR-EXAMPLE-01");
  await page.getByRole("link", { name: "Order again", exact: true }).click();
  const niebla = page
    .getByTestId("reorder-line")
    .filter({ hasText: "Niebla Geisha" });
  await expect(niebla).toContainText("22.00");
  await expect(niebla).toContainText("24.50");
  await expect(niebla).toContainText("Adding: 1");
  await expect(
    page.getByTestId("reorder-line").filter({ hasText: "Volcán" }),
  ).toContainText("Sold out");
  await page
    .getByRole("button", { name: "Add to my bag", exact: true })
    .click();
  await expect(page).toHaveURL("/bag");
  await expect(page.getByTestId("cart-total")).toContainText("225.50");
  await expect(
    page.getByRole("link", { name: "Your bag", exact: true }),
  ).toContainText("9");
  await page.goto("/orders/BR-EXAMPLE-01");
  await expect(page.getByTestId("cart-total")).toContainText("79.80");
});
