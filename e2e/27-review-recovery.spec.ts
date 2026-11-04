import { expect, test } from "../test-support/fixtures";

for (const screen of ["overview", "orders"]) {
  test(`expired ${screen} reads renew demo access without leaving the screen`, async ({
    page,
  }) => {
    await page.goto(screen === "overview" ? "/admin" : "/admin/orders");
    await page
      .getByRole("button", { name: "Enter demo account", exact: true })
      .click();
    const content =
      screen === "overview"
        ? page.getByTestId("dashboard-orders")
        : page.getByTestId("admin-order").first();
    await expect(content).toBeVisible();
    // Expire access at the public session boundary, retaining the mounted UI.
    await page.request.delete("/api/access/session");
    await page.evaluate(() => window.dispatchEvent(new Event("focus")));
    await expect(page.getByRole("alert")).toContainText("expired");
    await expect(content).toBeVisible();
    await page.route("**/api/access/demo", (route) => route.abort("failed"));
    await page
      .getByRole("button", { name: "Enter demo account", exact: true })
      .click();
    await expect(page.getByRole("alert")).toContainText("reach the store");
    await expect(content).toBeVisible();
    await page.unroute("**/api/access/demo");
    await page
      .getByRole("button", { name: "Enter demo account", exact: true })
      .click();
    await expect(page.getByRole("alert")).toHaveCount(0);
    await expect(
      page.getByRole("status").filter({ hasText: "renewed" }),
    ).toBeVisible();
    await expect(content).toBeVisible();
    await expect(page).toHaveURL(
      screen === "overview" ? "/admin" : "/admin/orders",
    );
  });
}

test("a disabled coffee differs from an exhausted variant and can be explored", async ({
  page,
}) => {
  await page.goto("/coffees");
  const volcan = page.getByTestId("coffee-card").filter({ hasText: "Volcán" });
  await expect(volcan).toContainText("Temporarily unavailable");
  await volcan.getByRole("link").click();
  await expect(
    page.getByText("This coffee is temporarily unavailable.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Temporarily unavailable", exact: true }),
  ).toBeDisabled();
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
          prices: coffee.prices,
          variants: coffee.variants.map(
            (variant: {
              weight: number;
              preparation: string;
              stock: number;
            }) => ({
              ...variant,
              stock:
                variant.weight === 250 && variant.preparation === "beans"
                  ? 0
                  : variant.stock,
            }),
          ),
        },
      })
    ).status(),
  ).toBe(200);
  await page.goto("/coffees/sierra");
  await expect(
    page.getByText("This variant is sold out.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sold out", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Ground", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Add to bag", exact: true }),
  ).toBeEnabled();
});
