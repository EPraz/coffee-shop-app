import { test, expect, type Page } from "../test-support/fixtures";

test("recovering a failed write does not restore durable receipts deleted from another tab", async ({
  page,
}) => {
  await purchase(page, "sierra");
  const second = await page.context().newPage();
  await second.goto("/orders");
  await expect(second.getByTestId("history-order")).toHaveCount(1);
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (
        key === "bruma.orders.v3" &&
        sessionStorage.getItem("allowHistoryWrites") !== "yes"
      )
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      return original.call(this, key, value);
    };
  });
  await purchase(page, "cerrado");
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "Browser storage is unavailable" }),
  ).toBeVisible();
  await second
    .getByRole("button", { name: "Clear history", exact: true })
    .click();
  await second
    .getByRole("button", { name: "Delete saved orders", exact: true })
    .click();
  await page
    .getByRole("link", { name: "My orders", exact: true })
    .last()
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(1);
  await expect(page.getByTestId("history-order")).toContainText("Cerrado");
  await page.evaluate(() =>
    sessionStorage.setItem("allowHistoryWrites", "yes"),
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "The coffees", exact: true })
    .click();
  await page
    .getByRole("link", {
      name: "Discover this coffee: Niebla Geisha",
      exact: true,
    })
    .click();
  await completePurchase(page);
  await page
    .getByRole("link", { name: "My orders", exact: true })
    .last()
    .click();
  await expect(page.getByTestId("history-order")).toHaveCount(2);
  await expect(
    page.getByTestId("history-order").filter({ hasText: "Sierra" }),
  ).toHaveCount(0);
  await expect(second.getByTestId("history-order")).toHaveCount(2);
  await second.reload();
  await expect(
    second.getByTestId("history-order").filter({ hasText: "Sierra" }),
  ).toHaveCount(0);
  await second.close();
});

async function purchase(page: Page, coffee: string) {
  await page.goto(`/coffees/${coffee}`);
  await completePurchase(page);
}

async function completePurchase(page: Page) {
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
}

test("two open tabs preserve purchases, protect examples and reflect confirmed deletion", async ({
  page,
}) => {
  await page.goto("/orders");
  await expect(
    page.getByRole("button", { name: "Load example orders", exact: true }),
  ).toBeVisible();
  const second = await page.context().newPage();
  await purchase(second, "sierra");
  await expect(page.getByTestId("history-order")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Load example orders", exact: true }),
  ).toHaveCount(0);
  await second.goto("/orders");
  await purchase(page, "cerrado");
  await expect(second.getByTestId("history-order")).toHaveCount(2);
  await second.reload();
  await expect(second.getByTestId("history-order")).toHaveCount(2);
  await second
    .getByRole("button", { name: "Clear history", exact: true })
    .click();
  await second
    .getByRole("button", { name: "Delete saved orders", exact: true })
    .click();
  await page.goto("/orders");
  await expect(page.getByTestId("history-order")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Load example orders", exact: true })
    .click();
  await expect(second.getByTestId("history-order")).toHaveCount(2);
  await expect(second.getByTestId("history-order").first()).toContainText(
    "Example order",
  );
  await second.close();
});
