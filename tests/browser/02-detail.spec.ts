import { test, expect } from "../support/fixtures";

test("visitor selects weight and preparation without a grinding surcharge", async ({
  page,
}) => {
  await page.goto("/coffees");
  await page
    .getByTestId("coffee-card")
    .filter({ hasText: "Niebla Geisha" })
    .getByRole("link")
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Niebla Geisha",
  );
  await expect(page.getByTestId("variant-price")).toHaveText("USD 24.50");
  await page.getByRole("button", { name: "500 g", exact: true }).click();
  await expect(page.getByTestId("variant-price")).toHaveText("USD 44.00");
  await page.getByRole("button", { name: "Ground", exact: true }).click();
  await expect(page.getByTestId("variant-price")).toHaveText("USD 44.00");
});

test("sold-out detail and unknown product remain navigable", async ({
  page,
}) => {
  await page.goto("/coffees/volcan");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Volcán");
  await expect(
    page.getByText("This coffee is temporarily unavailable."),
  ).toBeVisible();
  await page.goto("/coffees/not-a-coffee");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A little off the trail.",
  );
  await page
    .getByRole("link", { name: "Back to the coffees", exact: true })
    .click();
  await expect(page).toHaveURL("/coffees");
});
