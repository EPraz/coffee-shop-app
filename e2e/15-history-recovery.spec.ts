import { test, expect } from "../test-support/fixtures";

test("damaged saved history recovers without blocking the example journey", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("bruma.orders.v3", "{damaged"),
  );
  await page.goto("/orders");
  await expect(page.getByRole("status")).toContainText(
    "Some saved history could not be read",
  );
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(2);
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("blocked storage keeps checkout usable and reports session-only history", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
  });
  await page.goto("/coffees/cerrado");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByTestId("order-number")).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "History changes are kept only for this visit",
  );
  await page
    .getByRole("link", { name: "My orders", exact: true })
    .first()
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(1);
  await page.reload();
  await expect(page.getByTestId("history-order")).toHaveCount(0);
});

test("a rejected payment does not enter the order history", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page.getByRole("radio", { name: "Rejected", exact: true }).check();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page
    .getByRole("link", { name: "My orders", exact: true })
    .first()
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(0);
});

test("only the twenty most recent completed purchases remain", async ({
  page,
}) => {
  test.setTimeout(120_000);
  let first = "",
    last = "";
  for (let index = 0; index < 21; index++) {
    await page.goto("/coffees/cerrado");
    await page.getByRole("button", { name: "Add to bag", exact: true }).click();
    await expect(
      page.getByRole("link", { name: "Your bag", exact: true }),
    ).toContainText("1");
    await page.goto("/checkout");
    await page
      .getByRole("button", { name: "Fill demo details", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Place demo order", exact: true })
      .click();
    last = await page.getByTestId("order-number").innerText();
    if (index === 0) first = last;
  }
  await page.goto("/orders");
  await expect(page.getByTestId("history-order")).toHaveCount(20);
  await expect(page.getByTestId("history-order").first()).toContainText(last);
  await expect(page.getByText(first, { exact: true })).toHaveCount(0);
  await page.reload();
  await expect(page.getByTestId("history-order")).toHaveCount(20);
});
