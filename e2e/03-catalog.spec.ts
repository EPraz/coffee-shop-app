import { test, expect } from "@playwright/test";

test("visitor combines origin search and roast filter, then recovers from no results", async ({
  page,
}) => {
  await page.goto("/coffees");
  await page
    .getByRole("searchbox", { name: "Search by name or origin" })
    .fill("Panama");
  await expect(page.getByTestId("coffee-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Light", exact: true }).click();
  await expect(page.getByTestId("coffee-card")).toHaveCount(1);
  await expect(page.getByTestId("coffee-card")).toContainText("Niebla Geisha");
  await page.getByRole("searchbox").fill("no-such-origin");
  await expect(
    page.getByRole("heading", { name: "No coffee found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByTestId("coffee-card")).toHaveCount(5);
});

test("price ordering compares all coffees at 250 g", async ({ page }) => {
  await page.goto("/coffees");
  await page
    .getByRole("combobox", { name: "Sort by price" })
    .selectOption("low");
  await expect(page.getByTestId("coffee-card").first()).toContainText(
    "Cerrado",
  );
  await expect(page.getByTestId("coffee-card").last()).toContainText(
    "Niebla Geisha",
  );
  await page
    .getByRole("combobox", { name: "Sort by price" })
    .selectOption("high");
  await expect(page.getByTestId("coffee-card").first()).toContainText(
    "Niebla Geisha",
  );
});
