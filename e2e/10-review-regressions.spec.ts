import { test, expect } from "@playwright/test";

test("typing an origin character by character keeps keyboard focus", async ({
  page,
}) => {
  await page.goto("/coffees");
  const search = page.getByRole("searchbox", {
    name: "Search by name or origin",
  });
  await search.click();
  await search.pressSequentially("Panama", { delay: 50 });
  await expect(search).toHaveValue("Panama");
  await expect(search).toBeFocused();
  await expect(page.getByTestId("coffee-card")).toHaveCount(2);
});

test("each repeated addition changes the accessible success announcement", async ({
  page,
}) => {
  await page.goto("/coffees/cerrado");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  const firstAnnouncement = await page.getByRole("status").textContent();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await expect(page.getByRole("status")).not.toHaveText(
    firstAnnouncement ?? "",
  );
  await expect(page.getByRole("status")).toContainText("2 bags");
});

test("each cart line shows its unit price independently of its amount", async ({
  page,
}) => {
  await page.goto("/coffees/cerrado");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await expect(page.getByTestId("cart-unit-price")).toHaveText("USD 18.00");
  await expect(page.getByTestId("cart-line")).toContainText("USD 36.00");
});
