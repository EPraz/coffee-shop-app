import { expect } from "@playwright/test";

export async function mobileStory({ page, c, scene }) {
  let number;
  await scene(
    "discover",
    "Good coffee.\nA sense of place.",
    5,
    "Meet Bruma: five coffees, four origins, and a store connected from bag to studio.",
    async () => {
      await c.pause(700);
      await c.click(
        page.getByRole("link", { name: "Explore the coffees", exact: true }),
      );
    },
  );
  await scene(
    "variant",
    "Your coffee.\nYour way.",
    8,
    "Choose Niebla Geisha from Panama, then 500 g and ground coffee.",
    async () => {
      await c.click(
        page.getByRole("link", {
          name: "Discover this coffee: Niebla Geisha",
          exact: true,
        }),
      );
      await c.click(page.getByRole("button", { name: "500 g", exact: true }));
      await c.click(page.getByRole("button", { name: "Ground", exact: true }));
      await expect(page.getByTestId("variant-price")).toContainText("44.00");
      await c.click(
        page.getByRole("button", { name: "Add to bag", exact: true }),
      );
    },
  );
  await scene(
    "bag",
    "A little\nsomething extra.",
    7,
    "Apply BRUMA15: USD 44.00 in coffee, 15% off, USD 5 shipping. Total: USD 42.40.",
    async () => {
      await c.scroll(0);
      await c.click(page.getByRole("link", { name: "Your bag", exact: true }));
      const input = page.getByRole("textbox", {
        name: "Promo code",
        exact: true,
      });
      await c.reveal(input);
      await input.fill("BRUMA15");
      await c.click(page.getByRole("button", { name: "Apply", exact: true }));
      await c.reveal(page.getByTestId("cart-total"));
      await expect(page.getByTestId("cart-total")).toContainText("42.40");
    },
  );
  await scene(
    "checkout",
    "One step closer\nto your ritual.",
    8,
    "Fill fictional details and confirm a server-priced demo order. No real payment or delivery.",
    async () => {
      await c.click(
        page.getByRole("link", { name: "Continue to checkout", exact: true }),
      );
      await c.click(
        page.getByRole("button", { name: "Fill demo details", exact: true }),
      );
      await expect(
        page.getByRole("textbox", { name: "Full name", exact: true }),
      ).toHaveValue("Alex Rivera");
      await c.reveal(page.getByRole("textbox", { name: "City", exact: true }));
      await c.click(
        page.getByRole("button", { name: "Place demo order", exact: true }),
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "A good moment, confirmed.",
      );
    },
  );
  await scene(
    "receipt",
    "A good moment,\nconfirmed.",
    5,
    "The order and its stock changes are saved together in PostgreSQL. Customer details stay out of the API.",
    async () => {
      number = await page.getByTestId("order-number").innerText();
      await c.click(page.getByRole("link", { name: "My orders", exact: true }));
      await c.click(page.getByTestId("history-order").getByRole("link"));
      await expect(page.getByTestId("order-state")).toHaveText("Confirmed");
      await c.reveal(page.getByTestId("order-state"));
    },
  );
  await scene(
    "admin-entry",
    "Behind\nthe brew.",
    8,
    "Enter the shared demo account. Explore the same store every visitor sees, without a password.",
    async () => {
      await c.scroll(await page.evaluate(() => document.body.scrollHeight));
      await c.click(
        page.getByRole("link", { name: "The studio", exact: true }),
      );
      await c.pause(900);
      await c.click(
        page.getByRole("button", { name: "Enter demo account", exact: true }),
      );
      await expect(
        page.getByRole("heading", { name: "Store overview", exact: true }),
      ).toBeVisible();
    },
  );
  await scene(
    "dashboard",
    "A little\nperspective.",
    10,
    "Real demo sales, order totals and average value. Filter seven or thirty days, then explore the trend.",
    async () => {
      await c.click(
        page.getByRole("button", { name: "Last 7 days", exact: true }),
      );
      await c.reveal(page.getByTestId("dashboard-sales"));
      await expect(page.getByTestId("dashboard-orders")).toHaveText("8");
      await c.pause(900);
      await c.reveal(
        page.getByRole("heading", { name: "Sales over time", exact: true }),
      );
      await c.pause(1800);
      await c.scroll(0);
    },
  );
  await scene(
    "manage-order",
    "Every order,\ncared for.",
    10,
    "Open the new purchase, mark it as preparing, and see confirmation from the connected store.",
    async () => {
      await c.click(page.getByRole("link", { name: "Orders", exact: true }));
      await c.click(
        page.getByTestId("admin-order").filter({ hasText: number }),
      );
      await c.click(
        page.getByRole("button", { name: "Mark as preparing", exact: true }),
      );
      await expect(page.getByTestId("admin-order-state")).toHaveText(
        "Preparing",
      );
      await expect(
        page.getByRole("status").filter({ hasText: "Order updated." }),
      ).toBeVisible();
      await c.pause(1300);
    },
  );
  await scene(
    "verify-buyer",
    "One store.\nA connected journey.",
    5,
    "Return to the buyer’s saved receipt: its live status now reads Preparing. Available in English, Spanish and Portuguese.",
    async () => {
      await page.goto(`/orders/${number}`);
      await expect(page.getByTestId("order-state")).toHaveText("Preparing");
      await c.reveal(page.getByTestId("order-state"));
      await c.pause(1200);
    },
  );
}

export async function desktopStory({ page, c, scene }) {
  await scene(
    "desktop",
    "Good coffee. Thoughtfully managed.",
    7,
    "The same connected studio on desktop. A shared portfolio demo, with simulated purchases.",
    async () => {
      await expect(
        page.getByRole("heading", { name: "Store overview", exact: true }),
      ).toBeVisible();
      await c.pause(1500);
      await c.scroll(430);
      await c.pause(1500);
      await c.scroll(0);
    },
  );
}
