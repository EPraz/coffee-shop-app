import { test, expect } from "../support/fixtures";

test("cart and coupon survive reload and reopening in the same browser", async ({
  page,
  context,
}) => {
  await page.goto("/coffees/sierra");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "Your bag", exact: true }).click();
  await page.getByRole("textbox", { name: "Promo code" }).fill("BRUMA15");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await page.reload();
  await expect(page.getByTestId("cart-line")).toHaveCount(1);
  await expect(page.getByTestId("cart-total")).toHaveText("USD 21.57");
  const reopened = await context.newPage();
  await reopened.goto("/bag");
  await expect(reopened.getByTestId("cart-line")).toHaveCount(1);
  await expect(reopened.getByTestId("cart-total")).toHaveText("USD 21.57");
  await reopened.getByRole("combobox", { name: "Language" }).selectOption("pt");
  await reopened.reload();
  await expect(reopened.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(reopened.getByTestId("line-quantity")).toHaveText("1");
  await reopened.getByRole("button", { name: /Remover/ }).click();
  await reopened.reload();
  await expect(
    reopened.getByRole("heading", { name: "Seu próximo ritual começa aqui." }),
  ).toBeVisible();
});

test("unreadable saved cart does not block browsing", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("bruma.cart.v1", "{broken"),
  );
  await page.goto("/bag");
  await expect(
    page.getByRole("heading", { name: "Your next ritual starts here." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore the coffees", exact: true })
    .click();
  await expect(page.getByTestId("coffee-card")).toHaveCount(5);
});
