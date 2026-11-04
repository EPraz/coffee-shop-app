import { expect, test } from "../test-support/fixtures";

test("the administrator prepares and cancels a purchase and the buyer sees its state", async ({
  page,
}) => {
  await page.goto("/coffees/cerrado");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/checkout");
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  const number = await page.getByTestId("order-number").innerText();
  await page.goto("/admin");
  await page
    .getByRole("button", { name: "Enter demo account", exact: true })
    .click();
  await page.getByRole("link", { name: "Orders", exact: true }).click();
  await page.getByTestId("admin-order").filter({ hasText: number }).click();
  await page
    .getByRole("button", { name: "Mark as preparing", exact: true })
    .click();
  await expect(page.getByTestId("admin-order-state")).toHaveText("Preparing");
  await page.getByRole("button", { name: "Cancel order", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Confirm cancellation", exact: true })
    .click();
  await expect(page.getByTestId("admin-order-state")).toHaveText("Cancelled");
  await expect(
    page.getByRole("status").filter({ hasText: "Order updated." }),
  ).toBeVisible();
  await page.goto(`/orders/${number}`);
  await expect(page.getByTestId("order-state")).toHaveText("Cancelled");
});
