import { test, expect } from "@playwright/test";

test("rapid origin typing preserves every character and URL on a constrained device", async ({
  page,
}) => {
  test.setTimeout(60000);
  const device = await page.context().newCDPSession(page);
  await device.send("Emulation.setCPUThrottlingRate", { rate: 6 });
  await page.goto("/coffees");
  const search = page.getByRole("searchbox", {
    name: "Search by name or origin",
    exact: true,
  });
  for (const [term, count] of [
    ["Panama", 2],
    ["Colombia", 1],
    ["Brazil", 1],
  ] as const) {
    await search.fill("");
    await search.pressSequentially(term, { delay: 5 });
    await expect(search).toHaveValue(term);
    await expect(search).toBeFocused();
    await expect(page.getByTestId("coffee-card")).toHaveCount(count);
    await expect(page).toHaveURL(new RegExp(`q=${term}`));
  }
  await page.reload();
  await expect(search).toHaveValue("Brazil");
  await expect(page.getByTestId("coffee-card")).toHaveCount(1);
  await device.detach();
});

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
