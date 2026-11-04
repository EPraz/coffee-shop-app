import { expect, test } from "../test-support/fixtures";

test("reset asks for shared confirmation and restores an edited price", async ({
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
    .getByRole("button", { name: "Save changes", exact: true })
    .click();
  await expect(coffee).toContainText("21.00");
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("everyone");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Cancel", exact: true })
    .click();
  await expect(coffee).toContainText("21.00");
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Restore sample data", exact: true })
    .click();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "The shared demo has been restored." }),
  ).toBeVisible();
  await expect(coffee).toContainText("19.50");
  await expect(
    page.getByRole("button", { name: "Reset demo", exact: true }),
  ).toBeFocused();
  await page.goto("/coffees/sierra");
  await expect(page.getByTestId("variant-price")).toContainText("19.50");
});
