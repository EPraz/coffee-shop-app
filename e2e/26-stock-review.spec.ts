import { expect, test, type Page } from "../test-support/fixtures";

async function changeStock(
  page: Page,
  id: string,
  available: boolean,
  stock?: number,
) {
  await page.request.post("/api/access/demo", { data: {} });
  const catalog = await (await page.request.get("/api/catalog")).json();
  const coffee = catalog.coffees.find((item: { id: string }) => item.id === id);
  expect(
    (
      await page.request.patch(`/api/admin/catalog/${id}`, {
        data: {
          generation: catalog.generation,
          version: coffee.version,
          available,
          prices: coffee.prices,
          variants: coffee.variants.map(
            (variant: {
              weight: number;
              preparation: string;
              stock: number;
            }) => ({
              ...variant,
              stock:
                stock !== undefined &&
                variant.weight === 250 &&
                variant.preparation === "beans"
                  ? stock
                  : variant.stock,
            }),
          ),
        },
      })
    ).status(),
  ).toBe(200);
}

test("cart and reorder explain a stock cap below nine bags", async ({
  page,
}) => {
  await page.goto("/orders");
  await changeStock(page, "niebla", true, 2);
  await page.reload();
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await page.goto("/orders/BR-EXAMPLE-01/reorder");
  const niebla = page
    .getByTestId("reorder-line")
    .filter({ hasText: "Niebla Geisha" });
  await expect(niebla).toContainText("Adding: 2");
  await expect(niebla).toContainText("Only the available bags can be added");
  await page
    .getByRole("button", { name: "Add to my bag", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Increase quantity of Niebla Geisha, 250 g, Whole bean",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "available stock" }),
  ).toBeVisible();
  await expect(page.getByTestId("line-quantity")).toHaveText("2");
});

test("a saved selection is kept when a coffee becomes unavailable", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await changeStock(page, "sierra", false);
  await page.goto("/bag");
  await expect(page.getByTestId("cart-line")).toHaveCount(1);
  await page.reload();
  await expect(page.getByTestId("cart-line")).toHaveCount(1);
  await page
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("no longer available");
});
