import { test, expect } from "../test-support/fixtures";

test("visitor discovers the five coffees from the home page", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good coffee.",
  );
  await page
    .getByRole("link", { name: "Explore the coffees", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Coffee with a story.",
  );
  await expect(page.getByTestId("coffee-card")).toHaveCount(5);
  await expect(
    page.getByTestId("coffee-card").filter({ hasText: "Panama" }),
  ).toHaveCount(2);
  await expect(
    page.getByTestId("coffee-card").filter({ hasText: "Brazil" }),
  ).toHaveCount(1);
  await expect(
    page.getByTestId("coffee-card").filter({ hasText: "Colombia" }),
  ).toHaveCount(1);
  await expect(
    page.getByTestId("coffee-card").filter({ hasText: "Ethiopia" }),
  ).toHaveCount(1);
});

test("explicit language survives reload and can be switched across all three languages", async ({
  page,
}) => {
  await page.goto("/coffees");
  await page.getByRole("combobox", { name: "Language" }).selectOption("es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cafés con historia.",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "es-419");
  await page.getByRole("combobox", { name: "Idioma" }).selectOption("pt");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cafés com história.",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await page.getByRole("combobox", { name: "Idioma" }).selectOption("en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Coffee with a story.",
  );
});

test("unsupported browser language falls back to English", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "ja-JP" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:43173/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good coffee.",
  );
  await context.close();
});
