import { test, expect } from "../test-support/fixtures";

test("guest validates fields, fills demo details and completes an order with a preserved receipt", async ({
  page,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page.getByRole("textbox", { name: "Promo code" }).fill("BRUMA15");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByText("This field is required.")).toHaveCount(6);
  await page
    .getByRole("button", { name: "Fill demo details", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Full name", exact: true }),
  ).toHaveValue("Alex Rivera");
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill("invalid-email");
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill("alex@example.com");
  await page
    .getByRole("button", { name: "Place demo order", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Preparing your moment…", exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A good moment, confirmed.",
  );
  await expect(page.getByTestId("order-number")).toContainText("BR-");
  await expect(page.getByTestId("cart-total")).toHaveText("USD 21.57");
  await expect(
    page.getByRole("paragraph").filter({ hasText: /^Sierra$/ }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your next ritual starts here." }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Your next ritual starts here." }),
  ).toBeVisible();
});

test("direct checkout and confirmation without an order offer useful recovery", async ({
  page,
}) => {
  await page.goto("/checkout");
  await expect(
    page.getByRole("heading", { name: "Your next ritual starts here." }),
  ).toBeVisible();
  await page.goto("/confirmation");
  await expect(
    page.getByRole("heading", { name: "No order just yet." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to the coffees", exact: true })
    .click();
  await expect(page).toHaveURL("/coffees");
});
