import { expect, test } from "../test-support/fixtures";

test("an administrator saves a price and stock and the buyer sees the change", async ({
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
  await coffee
    .getByRole("spinbutton", { name: "250 g price (USD)", exact: true })
    .fill("21");
  await coffee
    .getByRole("spinbutton", { name: "250 g · Whole bean stock", exact: true })
    .fill("2");
  await coffee
    .getByRole("button", { name: "Save changes", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Changes saved." }),
  ).toBeVisible();
  await page.goto("/coffees/sierra");
  await expect(page.getByTestId("variant-price")).toContainText("21.00");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("available stock");
  await page.goto("/bag");
  await expect(page.getByTestId("cart-total")).toContainText("47.00");
});
