import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const languages = [
  {
    code: "en",
    locale: "en-US",
    add: "Add to bag",
    bag: "Your bag",
    checkout: "Continue to checkout",
    fill: "Fill demo details",
    place: "Place demo order",
    confirmed: "A good moment, confirmed.",
  },
  {
    code: "es",
    locale: "es-MX",
    add: "Añadir a la bolsa",
    bag: "Tu bolsa",
    checkout: "Continuar con la compra",
    fill: "Llenar demo",
    place: "Realizar pedido simulado",
    confirmed: "Un buen momento, confirmado.",
  },
  {
    code: "pt",
    locale: "pt-BR",
    add: "Adicionar à sacola",
    bag: "Sua sacola",
    checkout: "Continuar para a compra",
    fill: "Preencher demo",
    place: "Fazer pedido simulado",
    confirmed: "Um bom momento, confirmado.",
  },
];
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
}
for (const language of languages)
  for (const width of [320, 768, 1024, 1440]) {
    test(`${language.code} purchase works without overflow at ${width}px`, async ({
      browser,
    }, testInfo) => {
      const context = await browser.newContext({
        locale: language.locale,
        viewport: { width, height: 1000 },
      });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("http://127.0.0.1:43173/");
      await page.evaluate(() => document.fonts.ready);
      await noOverflow(page);
      if (language.code === "en" && (width === 1440 || width === 320))
        await page.screenshot({
          path: testInfo.outputPath("home.png"),
          fullPage: true,
        });
      await page.goto("http://127.0.0.1:43173/coffees");
      await expect(page.getByTestId("coffee-card")).toHaveCount(5);
      await noOverflow(page);
      await page
        .getByTestId("coffee-card")
        .filter({ hasText: "Niebla Geisha" })
        .getByRole("link")
        .click();
      await noOverflow(page);
      await page
        .getByRole("button", { name: language.add, exact: true })
        .click();
      await page.getByRole("link", { name: language.bag, exact: true }).click();
      await noOverflow(page);
      await page
        .getByRole("link", { name: language.checkout, exact: true })
        .click();
      await noOverflow(page);
      if (language.code === "pt" && width === 1440)
        await page.screenshot({
          path: testInfo.outputPath("checkout.png"),
          fullPage: true,
        });
      await page
        .getByRole("button", { name: language.fill, exact: true })
        .click();
      await page
        .getByRole("button", { name: language.place, exact: true })
        .click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        language.confirmed,
      );
      await noOverflow(page);
      expect(errors).toEqual([]);
      await context.close();
    });
  }

test("core shopping screens have no automated WCAG A or AA violations", async ({
  page,
}) => {
  const check = async () => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  };
  await page.goto("/");
  await check();
  await page.goto("/coffees");
  await check();
  await page.goto("/coffees/sierra");
  await check();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await check();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await check();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await check();
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page.getByRole("radio", { name: "Rejected", exact: true }).check();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByRole("alert")).toBeVisible();
  await check();
  await page.getByRole("radio", { name: "Approved", exact: true }).check();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByTestId("order-number")).toBeVisible();
  await check();
});

test("keyboard user can skip navigation and focus the catalogue search", async ({
  page,
}) => {
  await page.goto("/coffees");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Find your coffee", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("searchbox")).toBeFocused();
});
