import { test, expect } from "../test-support/fixtures";

test("visitor calculates method-specific doses and coherent steps from a coffee", async ({
  page,
}) => {
  await page.goto("/coffees/niebla");
  await page
    .getByRole("link", { name: "Brew this coffee", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Make a little time for coffee.",
  );
  await expect(page.getByTestId("coffee-dose")).toHaveText("30.0 g");
  await page
    .getByRole("spinbutton", { name: "Water quantity (ml)", exact: true })
    .fill("250");
  await expect(page.getByTestId("coffee-dose")).toHaveText("15.0 g");
  await expect(page.getByTestId("brew-steps")).toContainText("30 ml");
  await expect(page.getByTestId("brew-steps")).toContainText("250 ml");
  await page.getByRole("radio", { name: "French press", exact: true }).check();
  await page
    .getByRole("spinbutton", { name: "Water quantity (ml)", exact: true })
    .fill("500");
  await expect(page.getByTestId("coffee-dose")).toHaveText("33.3 g");
  await expect(page.getByTestId("brew-steps")).toContainText("4 minutes");
  await expect(
    page.getByRole("link", { name: "ESPRO brewing guide", exact: true }),
  ).toBeVisible();
});

test("invalid water quantities hide misleading doses and selections survive localization", async ({
  page,
}) => {
  await page.goto("/brew");
  const water = page.getByRole("spinbutton", {
    name: "Water quantity (ml)",
    exact: true,
  });
  await water.fill("275");
  await expect(water).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByTestId("coffee-dose")).toHaveText("— g");
  await expect(page.getByTestId("brew-steps")).toHaveCount(0);
  await water.fill("350");
  await page.getByRole("radio", { name: "French press", exact: true }).check();
  await expect(page.getByTestId("coffee-dose")).toHaveText("23.3 g");
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("pt");
  await expect(
    page.getByRole("radio", { name: "Prensa francesa", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("spinbutton", {
      name: "Quantidade de água (ml)",
      exact: true,
    }),
  ).toHaveValue("350");
  await expect(page.getByTestId("coffee-dose")).toHaveText("23,3 g");
});
