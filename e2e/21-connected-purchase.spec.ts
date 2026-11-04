import { expect, test } from "../test-support/fixtures";

test("the guest checkout creates a retrievable backend order without personal data", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/checkout");
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByTestId("order-number")).toContainText("BR-");
  const number = (await page.getByTestId("order-number").innerText()).match(
    /BR-[A-Z0-9-]+/,
  )![0];
  const receipt = await page.request.get(`/api/orders/${number}`);
  expect(receipt.status()).toBe(200);
  const body = await receipt.json();
  expect(body.state).toBe("confirmed");
  expect(JSON.stringify(body)).not.toContain("alex@example.com");
  expect(JSON.stringify(body)).not.toContain("123 Coffee Lane");
  await page.goto(`/orders/${number}`);
  await expect(page.getByTestId("order-state")).toHaveText("Confirmed");
});
