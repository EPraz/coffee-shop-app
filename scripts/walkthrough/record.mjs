import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { controls, installAnnotations } from "./controls.mjs";

const rehearsal = process.argv.includes("--rehearsal");
const origin = process.env.BRUMA_DEMO_URL;
if (!origin)
  throw new Error("Set BRUMA_DEMO_URL to the intended Bruma origin.");
const output = path.resolve(
  ".scratch/walkthrough",
  `${rehearsal ? "rehearsal" : "take"}-${Date.now()}`,
);
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch();
const scenes = [],
  sources = {},
  errors = [];
const contexts = [];

async function capture(name, viewport) {
  const context = await browser.newContext({
    viewport,
    locale: "en-US",
    hasTouch: name === "mobile",
    isMobile: name === "mobile",
    deviceScaleFactor: 1,
    reducedMotion: rehearsal ? "reduce" : "no-preference",
    ...(!rehearsal
      ? { recordVideo: { dir: path.join(output, "raw"), size: viewport } }
      : {}),
  });
  contexts.push(context);
  await context.addInitScript(installAnnotations);
  const wallStart = performance.now();
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  const c = controls(page, rehearsal);
  await page.goto(origin);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good coffee.",
  );
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".hero-photo img").evaluate((image) => image.decode());
  const before = performance.now();
  await page.evaluate(() => window.syncRecording());
  sources[name] = {
    ...viewport,
    syncWallTime: ((before + performance.now()) / 2 - wallStart) / 1000,
  };
  await page.waitForTimeout(400);
  async function scene(id, title, seconds, caption, action) {
    console.log(`Scene: ${id}`);
    const start = (performance.now() - wallStart) / 1000;
    await action();
    const elapsed = (performance.now() - wallStart) / 1000 - start;
    if (!rehearsal && elapsed > seconds)
      throw new Error(
        `${id} exceeds its ${seconds}s budget: ${elapsed.toFixed(2)}s`,
      );
    if (!rehearsal)
      await page.waitForTimeout(Math.max(0, (seconds - elapsed) * 1000));
    scenes.push({ id, title, seconds, caption, start, source: name });
    await page.screenshot({ path: path.join(output, `${id}.png`) });
  }
  async function close() {
    const video = page.video();
    await context.close();
    if (video) {
      const file = path.join(output, "raw", `${name}.webm`);
      await video.saveAs(file);
      sources[name].file = path.relative(output, file);
    }
  }
  return { page, c, scene, close };
}

try {
  const mobile = await capture("mobile", { width: 390, height: 844 });
  const { page, c, scene } = mobile;
  await scene(
    "discover",
    "Good coffee.\nA sense of place.",
    5,
    "Meet Bruma: an origin-led coffee store, made for your everyday ritual.",
    async () => {
      await c.pause(500);
      await c.click(
        page.getByRole("link", { name: "Explore the coffees", exact: true }),
      );
      await c.click(
        page.getByRole("link", { name: "Find your coffee", exact: true }),
      );
    },
  );
  await scene(
    "finder",
    "A coffee that\nfeels like you.",
    13,
    "Three preferences, two available coffees, and clear reasons for each match.",
    async () => {
      for (const choice of ["Floral", "Gentle", "Black"]) {
        await c.click(page.getByRole("radio", { name: choice, exact: true }));
        await c.click(
          page.getByRole("button", {
            name: choice === "Black" ? "Find my coffee" : "Continue",
            exact: true,
          }),
        );
      }
      const match = page.getByRole("region", {
        name: "Your match",
        exact: true,
      });
      await expect(match).toContainText("Niebla Geisha");
      await c.reveal(match.getByRole("link"));
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
      await c.click(
        page.getByRole("button", { name: "Add to bag", exact: true }),
      );
      await expect(page.getByTestId("variant-price")).toContainText("44.00");
      await c.scroll(0);
    },
  );
  await scene(
    "bag",
    "A little\nsomething extra.",
    8,
    "Review your bag and apply BRUMA15 for 15% off the coffee subtotal.",
    async () => {
      await c.click(page.getByRole("link", { name: "Your bag", exact: true }));
      await expect(
        page.getByRole("heading", { name: "Your bag.", exact: true }),
      ).toBeVisible();
      const input = page.getByRole("textbox", {
        name: "Promo code",
        exact: true,
      });
      await c.reveal(input);
      await input.pressSequentially("BRUMA15", { delay: rehearsal ? 0 : 70 });
      await c.click(page.getByRole("button", { name: "Apply", exact: true }));
      await expect(
        page.getByText("BRUMA15 applied. A little thank-you."),
      ).toBeVisible();
      await c.reveal(page.getByTestId("cart-total"));
      await expect(page.getByTestId("cart-total")).toContainText("42.40");
    },
  );
  await scene(
    "checkout",
    "One step closer\nto your ritual.",
    9,
    "Fill fictional details and confirm a demo order. No real payment or delivery.",
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
    "brew",
    "Make the\nritual yours.",
    8,
    "V60 or French press: adjust the water and get a measured, step-by-step recipe.",
    async () => {
      await expect(page.getByTestId("order-number")).toContainText("BR-");
      await c.click(
        page.getByRole("link", { name: "Brew this coffee", exact: true }),
      );
      await expect(page.getByTestId("coffee-dose")).toContainText("30.0 g");
      await c.click(
        page.getByRole("radio", { name: "French press", exact: true }),
      );
      await c.reveal(page.getByRole("spinbutton"));
      await page.getByRole("spinbutton").fill("250");
      await expect(page.getByTestId("coffee-dose")).toContainText("16.7 g");
      await c.reveal(page.getByTestId("brew-steps"));
    },
  );
  await scene(
    "history",
    "Remember it.\nEnjoy it again.",
    10,
    "Open your browser-local receipt, review current prices, then confirm a reorder.",
    async () => {
      await c.scroll(0);
      await c.click(page.locator(".mobile-menu-toggle"));
      await c.click(
        page
          .locator("#mobile-navigation")
          .getByRole("link", { name: "My orders", exact: true }),
      );
      await expect(page.getByTestId("history-order")).toHaveCount(1);
      await c.click(page.getByTestId("history-order").getByRole("link"));
      await c.click(
        page.getByRole("link", { name: "Order again", exact: true }),
      );
      await expect(page.getByTestId("reorder-line")).toContainText("Adding: 1");
      await c.reveal(page.getByTestId("reorder-line"));
      await c.pause(600);
      await c.click(
        page.getByRole("button", { name: "Add to my bag", exact: true }),
      );
      await expect(page.getByTestId("cart-total")).toContainText("49.00");
    },
  );
  await scene(
    "languages",
    "Three languages.\nOne experience.",
    5,
    "English, Spanish and Portuguese, with prices in USD throughout.",
    async () => {
      await c.scroll(0);
      await c.click(
        page.getByRole("link", { name: "Bruma Café", exact: true }).first(),
      );
      await page.locator(".language-control select").selectOption("es");
      await c.pause(500);
      await page.locator(".language-control select").selectOption("pt");
      await c.pause(500);
      await page.locator(".language-control select").selectOption("en");
    },
  );
  await mobile.close();
  const desktop = await capture("desktop", { width: 1440, height: 800 });
  await desktop.scene(
    "desktop",
    "Made slowly. Enjoyed fully.",
    7,
    "The same considered experience on desktop. Explore the live demo.",
    async () => {
      await desktop.c.pause(1800);
      await desktop.c.scroll(230);
      await desktop.c.pause(1000);
      await desktop.c.scroll(0);
    },
  );
  await desktop.close();
  expect(errors).toEqual([]);
  const manifest = {
    origin,
    rehearsal,
    applicationCommit: execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim(),
    sources,
    scenes,
    checks: {
      browserErrors: errors,
      mobile: "390 × 844; real touch-enabled viewport",
      totalCents: 4240,
      approved: true,
    },
  };
  await fs.writeFile(
    path.join(output, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  await fs.writeFile(
    ".scratch/walkthrough/latest.json",
    JSON.stringify({ output }),
  );
  console.log(
    JSON.stringify({
      output,
      seconds: scenes.reduce((sum, s) => sum + s.seconds, 0),
      checks: manifest.checks,
    }),
  );
} finally {
  for (const context of contexts) await context.close().catch(() => {});
  await browser.close();
}
