import { chromium, expect, request } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { controls, installAnnotations } from "./controls.mjs";
import { mobileStory, desktopStory } from "./scenes-v3.mjs";

const rehearsal = process.argv.includes("--rehearsal");
const origin = process.env.BRUMA_DEMO_URL;
if (!origin)
  throw new Error("Set BRUMA_DEMO_URL to the intended Bruma origin.");
// Recording is intentionally local until the V3 API has been published.
if (!["localhost", "127.0.0.1"].includes(new URL(origin).hostname))
  throw new Error("V3 recording currently requires a local connected store.");
const output = path.resolve(
  ".scratch/walkthrough",
  `${rehearsal ? "rehearsal" : "take"}-${Date.now()}`,
);
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch();
const scenes = [],
  sources = {},
  errors = [],
  contexts = [];

async function prepareStore() {
  const client = await request.newContext({ baseURL: origin });
  try {
    const response = await client.get("/api/catalog");
    expect(response.ok()).toBeTruthy();
    const catalog = await response.json();
    expect(
      (await client.post("/api/access/demo", { data: {} })).ok(),
    ).toBeTruthy();
    expect(
      (
        await client.post("/api/admin/reset", {
          data: { generation: catalog.generation },
        })
      ).ok(),
    ).toBeTruthy();
  } finally {
    await client.dispose();
  }
}

async function capture(name, viewport) {
  const context = await browser.newContext({
    baseURL: origin,
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
  await page.goto(name === "mobile" ? "/" : "/admin");
  if (name === "desktop") {
    await page
      .getByRole("button", { name: "Enter demo account", exact: true })
      .click();
    await expect(page.getByTestId("dashboard-sales")).toBeVisible();
  } else {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Good coffee.",
    );
    await page.locator(".hero-photo img").evaluate((image) => image.decode());
  }
  await page.evaluate(() => document.fonts.ready);
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
  await prepareStore();
  const mobile = await capture("mobile", { width: 390, height: 844 });
  await mobileStory(mobile);
  await mobile.close();
  const desktop = await capture("desktop", { width: 1440, height: 800 });
  await desktopStory(desktop);
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
      connectedOrderState: "preparing",
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
