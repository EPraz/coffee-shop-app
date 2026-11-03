import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const languages = [
  {
    code: "en",
    title: "Find your daily ritual.",
    flavour: "Chocolate & nuts",
    intensity: "Intense",
    serving: "With milk",
    next: "Continue",
    submit: "Find my coffee",
    match: "Your match",
    method: "French press",
    examples: "Load example orders",
    reorder: "Order again",
    confirm: "Add to my bag",
    nav: "My orders",
  },
  {
    code: "es",
    title: "Encuentra tu ritual diario.",
    flavour: "Chocolate y frutos secos",
    intensity: "Intenso",
    serving: "Con leche",
    next: "Continuar",
    submit: "Encontrar mi café",
    match: "Tu recomendación",
    method: "Prensa francesa",
    examples: "Cargar pedidos de ejemplo",
    reorder: "Volver a pedir",
    confirm: "Añadir a mi bolsa",
    nav: "Mis pedidos",
  },
  {
    code: "pt",
    title: "Encontre seu ritual diário.",
    flavour: "Chocolate e castanhas",
    intensity: "Intenso",
    serving: "Com leite",
    next: "Continuar",
    submit: "Encontrar meu café",
    match: "Sua recomendação",
    method: "Prensa francesa",
    examples: "Carregar pedidos de exemplo",
    reorder: "Pedir novamente",
    confirm: "Adicionar à minha sacola",
    nav: "Meus pedidos",
  },
];
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
for (const language of languages)
  for (const width of [320, 768, 1024, 1440]) {
    test(`${language.code} V2 flows remain usable at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/find-your-coffee");
      await page
        .locator(".language-control select")
        .selectOption(language.code);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        language.title,
      );
      await page.evaluate(() => document.fonts.ready);
      await noOverflow(page);
      await page
        .getByRole("radio", { name: language.flavour, exact: true })
        .check();
      await page
        .getByRole("button", { name: language.next, exact: true })
        .click();
      await page
        .getByRole("radio", { name: language.intensity, exact: true })
        .check();
      await page
        .getByRole("button", { name: language.next, exact: true })
        .click();
      await page
        .getByRole("radio", { name: language.serving, exact: true })
        .check();
      await page
        .getByRole("button", { name: language.submit, exact: true })
        .click();
      await expect(
        page.getByRole("region", { name: language.match, exact: true }),
      ).toContainText("Cerrado");
      await noOverflow(page);
      if (language.code === "en" && [320, 1440].includes(width))
        await page.screenshot({
          path: testInfo.outputPath("finder.png"),
          fullPage: true,
        });
      await page.goto("/brew?coffee=cerrado");
      await page
        .getByRole("radio", { name: language.method, exact: true })
        .check();
      await expect(page.getByTestId("coffee-dose")).toContainText(
        language.code === "pt" ? "33,3 g" : "33.3 g",
      );
      await noOverflow(page);
      if (language.code === "en" && [320, 1440].includes(width))
        await page.screenshot({
          path: testInfo.outputPath("brew.png"),
          fullPage: true,
        });
      await page.goto("/orders");
      if (width > 768)
        await expect(
          page
            .getByRole("navigation")
            .getByRole("link", { name: language.nav, exact: true }),
        ).toBeVisible();
      else {
        await page.locator(".mobile-menu-toggle").click();
        await expect(
          page
            .locator("#mobile-navigation")
            .getByRole("link", { name: language.nav, exact: true }),
        ).toBeVisible();
        await page.locator(".mobile-menu-toggle").click();
      }
      await noOverflow(page);
      await page
        .getByRole("button", { name: language.examples, exact: true })
        .click();
      await expect(page.getByTestId("history-order")).toHaveCount(2);
      await noOverflow(page);
      if (language.code === "en" && [320, 1440].includes(width))
        await page.screenshot({
          path: testInfo.outputPath("history.png"),
          fullPage: true,
        });
      await page.getByTestId("history-order").first().getByRole("link").click();
      await noOverflow(page);
      await page
        .getByRole("link", { name: language.reorder, exact: true })
        .click();
      await noOverflow(page);
      if (language.code === "en" && [320, 1440].includes(width))
        await page.screenshot({
          path: testInfo.outputPath("reorder.png"),
          fullPage: true,
        });
      await page
        .getByRole("button", { name: language.confirm, exact: true })
        .click();
      await expect(page).toHaveURL("/bag");
      await expect(page.getByTestId("cart-total")).toContainText(
        language.code === "pt" ? "78,50" : "78.50",
      );
      await noOverflow(page);
      expect(errors).toEqual([]);
    });
  }

test("V2 questions, results, recipes, history, deletion, receipt and reorder have no automated WCAG violations", async ({
  page,
}) => {
  test.setTimeout(90000);
  const check = async () => {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  };
  await page.goto("/find-your-coffee");
  await check();
  for (const choice of ["Chocolate & nuts", "Intense", "With milk"]) {
    await page.getByRole("radio", { name: choice, exact: true }).check();
    await page
      .getByRole("button", {
        name: choice === "With milk" ? "Find my coffee" : "Continue",
        exact: true,
      })
      .click();
  }
  await check();
  await page.goto("/brew");
  await check();
  await page.getByRole("spinbutton").fill("275");
  await check();
  await page.goto("/orders");
  await check();
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await check();
  await page
    .getByRole("button", { name: "Clear history", exact: true })
    .click();
  await check();
  await page.goto("/orders/BR-EXAMPLE-01");
  await check();
  await page.getByRole("link", { name: "Order again", exact: true }).click();
  await check();
});

test("keyboard users can answer all finder questions and return focus after cancelling deletion", async ({
  page,
}) => {
  await page.goto("/find-your-coffee");
  for (let step = 0; step < 3; step++) {
    if (step === 0) await page.locator("legend").focus();
    await expect(page.locator("legend")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("radio").first()).toBeFocused();
    await page.keyboard.press("Space");
    await page.keyboard.press("Tab");
    if (step > 0) await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", {
        name: step === 2 ? "Find my coffee" : "Continue",
        exact: true,
      }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
  }
  await expect(
    page.getByRole("heading", { name: "A good place to start.", exact: true }),
  ).toBeFocused();
  await page.goto("/orders");
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear history", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Cancel", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Clear history", exact: true }),
  ).toBeFocused();
});
