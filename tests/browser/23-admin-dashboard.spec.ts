import { expect, test } from "../support/fixtures";

test("the visual dashboard filters real metrics and offers readable daily values", async ({
  page,
}) => {
  await page.goto("/admin");
  await page
    .getByRole("button", { name: "Enter demo account", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Store overview", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Last 7 days", exact: true }).click();
  await expect(page.getByTestId("dashboard-sales")).toContainText("335.27");
  await expect(page.getByTestId("dashboard-orders")).toHaveText("7");
  await expect(page.getByTestId("dashboard-average")).toContainText("55.88");
  await expect(page.getByTestId("stock-alert")).toHaveCount(5);
  await page.getByText("View daily sales", { exact: true }).click();
  await expect(
    page.getByRole("table", { name: "Daily product sales" }),
  ).toBeVisible();
  await expect(page.getByTestId("recent-order")).toHaveCount(5);
});
