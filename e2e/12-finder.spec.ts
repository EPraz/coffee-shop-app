import { test, expect } from "../test-support/fixtures";

test("visitor finds an explained available coffee and buys its selected variant", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Find your coffee", exact: true })
    .first()
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Find your daily ritual.",
  );
  await page
    .getByRole("radio", { name: "Chocolate & nuts", exact: true })
    .check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "Intense", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "With milk", exact: true }).check();
  await page
    .getByRole("button", { name: "Find my coffee", exact: true })
    .click();
  const first = page.getByRole("region", { name: "Your match", exact: true });
  await expect(
    first.getByRole("heading", { name: "Cerrado", exact: true }),
  ).toBeVisible();
  await expect(first).toContainText("Chocolate & nuts");
  await expect(first).toContainText("Intense");
  await expect(
    page.getByRole("region", { name: "Another good choice", exact: true }),
  ).toBeVisible();
  await first
    .getByRole("link", { name: "Discover this coffee: Cerrado", exact: true })
    .click();
  await page.getByRole("button", { name: "500 g", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Cerrado", exact: true }),
  ).toBeVisible();
  await expect(page.getByTestId("cart-total")).toContainText("37.50");
});

test("preferences survive going back and changing language, and can be restarted", async ({
  page,
}) => {
  await page.goto("/find-your-coffee");
  await expect(
    page.getByRole("button", { name: "Continue", exact: true }),
  ).toBeDisabled();
  await page.getByRole("radio", { name: "Fruity", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "Balanced", exact: true }).check();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Fruity", exact: true }),
  ).toBeChecked();
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("es");
  await expect(
    page.getByRole("radio", { name: "Afrutado", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Equilibrado", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("radio", { name: "Con leche", exact: true }).check();
  await page
    .getByRole("button", { name: "Encontrar mi café", exact: true })
    .click();
  await expect(
    page
      .getByRole("region", { name: "Tu recomendación", exact: true })
      .getByRole("heading", { name: "Sierra", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Empezar de nuevo", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Continuar", exact: true }),
  ).toBeDisabled();
});

test("a nearest match is explained honestly and sold-out coffee is excluded", async ({
  page,
}) => {
  await page.goto("/find-your-coffee");
  await page.getByRole("radio", { name: "Floral", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "Intense", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "With milk", exact: true }).check();
  await page
    .getByRole("button", { name: "Find my coffee", exact: true })
    .click();
  await expect(
    page.getByRole("region", { name: "Your match", exact: true }),
  ).toContainText("A close match");
  await expect(
    page.getByRole("link", {
      name: "Discover this coffee: Volcán",
      exact: true,
    }),
  ).toHaveCount(0);
});
