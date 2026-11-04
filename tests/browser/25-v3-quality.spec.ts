import { expect, test } from "../support/fixtures";
import AxeBuilder from "@axe-core/playwright";

test("an offline catalogue refresh keeps the checkout form mounted", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/checkout");
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page.route("**/api/catalog", (route) => route.abort("failed"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.getByRole("alert")).toContainText("reach the store");
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toHaveValue("Alex Rivera");
  await page.unroute("**/api/catalog");
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toHaveValue("Alex Rivera");
});

test("a conflicting catalogue editor keeps its draft while presenting the latest values", async ({
  page,
}) => {
  await page.goto("/admin/catalog");
  await page
    .getByRole("button", { name: "Enter demo account", exact: true })
    .click();
  const coffee = page.getByTestId("admin-coffee").filter({ hasText: "Sierra" });
  await coffee
    .getByRole("button", { name: "Edit Sierra", exact: true })
    .click();
  const price = coffee.getByRole("spinbutton", {
    name: "250 g price (USD)",
    exact: true,
  });
  await price.fill("21");
  const current = await (await page.request.get("/api/catalog")).json();
  const record = current.coffees.find(
    (item: { id: string }) => item.id === "sierra",
  );
  expect(
    (
      await page.request.patch("/api/admin/catalog/sierra", {
        data: {
          generation: current.generation,
          version: record.version,
          available: true,
          prices: { ...record.prices, "250": 2200 },
          variants: record.variants,
        },
      })
    ).status(),
  ).toBe(200);
  await coffee
    .getByRole("button", { name: "Save changes", exact: true })
    .click();
  await expect(
    coffee.getByText(
      "Review the current values below, then save your draft again.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(coffee.getByText(/Current: USD.*22.00/)).toBeVisible();
  await expect(price).toHaveValue("21");
  await coffee
    .getByRole("button", { name: "Save changes", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Changes saved.");
  await expect(coffee).toContainText("21.00");
});

test("a slower period response cannot replace the latest dashboard selection", async ({
  page,
}) => {
  await page.goto("/admin");
  await page
    .getByRole("button", { name: "Enter demo account", exact: true })
    .click();
  await expect(page.getByTestId("dashboard-orders")).toHaveText("24");
  let release = () => {};
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  let intercepted = () => {};
  const reached = new Promise<void>((resolve) => {
    intercepted = resolve;
  });
  await page.route("**/api/admin/dashboard?days=7", async (route) => {
    const response = await route.fetch();
    intercepted();
    await hold;
    await route.fulfill({ response });
  });
  await page.getByRole("button", { name: "Last 7 days", exact: true }).click();
  await reached;
  const latest = page.waitForResponse("**/api/admin/dashboard?days=30");
  await page.getByRole("button", { name: "Last 30 days", exact: true }).click();
  await latest;
  await expect(page.getByTestId("dashboard-orders")).toHaveText("24");
  const released = page.waitForResponse("**/api/admin/dashboard?days=7");
  release();
  await released;
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  await expect(
    page.getByRole("button", { name: "Last 30 days", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("dashboard-orders")).toHaveText("24");
});

test("failed edits keep their values and can renew an expired demo session", async ({
  page,
  context,
}) => {
  await page.goto("/admin/catalog");
  await page
    .getByRole("button", { name: "Enter demo account", exact: true })
    .click();
  const coffee = page.getByTestId("admin-coffee").filter({ hasText: "Sierra" });
  await coffee
    .getByRole("button", { name: "Edit Sierra", exact: true })
    .click();
  const price = coffee.getByRole("spinbutton", {
    name: "250 g price (USD)",
    exact: true,
  });
  await price.fill("21");
  await page.route("**/api/admin/catalog/sierra", (route) =>
    route.abort("failed"),
  );
  await coffee
    .getByRole("button", { name: "Save changes", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("reach the store");
  await expect(price).toHaveValue("21");
  await page.unroute("**/api/admin/catalog/sierra");
  await context.clearCookies();
  await coffee
    .getByRole("button", { name: "Save changes", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("expired");
  await expect(price).toHaveValue("21");
  await page
    .getByRole("button", { name: "Enter demo account", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("renewed");
  await coffee
    .getByRole("button", { name: "Save changes", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Changes saved.");
});

test("applying a changed price returns to review without placing an order", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/checkout");
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page.request.post("/api/access/demo", { data: {} });
  const catalog = await (await page.request.get("/api/catalog")).json();
  const coffee = catalog.coffees.find(
    (item: { id: string }) => item.id === "sierra",
  );
  expect(
    (
      await page.request.patch("/api/admin/catalog/sierra", {
        data: {
          generation: catalog.generation,
          version: coffee.version,
          available: true,
          prices: { ...coffee.prices, "250": 2100 },
          variants: coffee.variants,
        },
      })
    ).status(),
  ).toBe(200);
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("26.00");
  expect(
    (await (await page.request.get("/api/admin/orders")).json()).orders,
  ).toHaveLength(24);
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Apply changes", exact: true })
    .click();
  await expect(page).toHaveURL("/checkout");
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toHaveValue("Alex Rivera");
  expect(
    (await (await page.request.get("/api/admin/orders")).json()).orders,
  ).toHaveLength(24);
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByTestId("order-number")).toBeVisible();
  await expect(page.getByTestId("cart-total")).toContainText("26.00");
});

test("V2 receipts are not imported into the new browser history", async ({
  page,
}) => {
  await page.goto("/orders");
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(2);
  await page.evaluate(() => {
    const old = JSON.parse(localStorage.getItem("bruma.orders.v3")!);
    old.version = 1;
    localStorage.setItem("bruma.orders.v1", JSON.stringify(old));
    localStorage.removeItem("bruma.orders.v3");
  });
  await page.reload();
  await expect(page.getByTestId("history-order")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("bruma.orders.v1")!).orders.length,
    ),
  ).toBe(2);
});

for (const locale of [
  { id: "en", overview: "Store overview" },
  { id: "es", overview: "Resumen de la tienda" },
  { id: "pt", overview: "Visão geral da loja" },
]) {
  test(`the ${locale.id} dashboard is accessible and fits the supported widths`, async ({
    page,
  }) => {
    await page.goto("/admin");
    await page
      .getByRole("button", { name: "Enter demo account", exact: true })
      .click();
    await page.locator(".language-control select").selectOption(locale.id);
    await expect(
      page.getByRole("heading", { name: locale.overview, exact: true }),
    ).toBeVisible();
    await expect(page.getByTestId("dashboard-sales")).toBeVisible();
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (locale.id === "en" && (width === 320 || width === 1440))
        await page.screenshot({
          path: `.scratch/qa/v3-dashboard-${width}.png`,
          fullPage: true,
        });
    }
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}
