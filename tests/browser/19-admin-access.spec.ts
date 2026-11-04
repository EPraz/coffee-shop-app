import { expect, test } from "../support/fixtures";

test("a visitor enters the shared demo panel and retains access on reload", async ({
  page,
}) => {
  await page.goto("/admin/catalog");
  await expect(
    page.getByRole("heading", { name: "Behind the brew." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Enter demo account", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "The collection", exact: true }),
  ).toBeVisible();
  await expect(page.getByTestId("admin-coffee")).toHaveCount(5);
  await page.reload();
  await expect(page.getByTestId("admin-coffee")).toHaveCount(5);
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Enter demo account", exact: true }),
  ).toBeVisible();
});
