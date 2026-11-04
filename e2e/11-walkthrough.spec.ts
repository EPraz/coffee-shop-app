import { test, expect } from "../test-support/fixtures";
import AxeBuilder from "@axe-core/playwright";

test("walkthrough plays, seeks by chapter and provides a transcript and byte ranges", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/walkthrough");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A coffee ritual, in motion.",
  );
  const video = page.locator("video");
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.readyState),
    )
    .toBeGreaterThan(0);
  expect(
    await video.evaluate((element: HTMLVideoElement) => element.duration),
  ).toBeCloseTo(73, 0);
  await expect(page.getByText(/^1:13 · 1080p ·/)).toBeVisible();
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.2);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  await page
    .getByRole("button", { name: "0:34 One step closer to your ritual." })
    .click();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo(34, 0);
  await expect(video).toBeFocused();
  await page.getByText("Read the English transcript", { exact: true }).click();
  await expect(page.locator(".walkthrough-transcript")).toContainText(
    "No real payment or delivery.",
  );
  const response = await page.request.get(
    "/walkthrough/bruma-walkthrough.mp4",
    { headers: { Range: "bytes=0-1023" } },
  );
  expect(response.status()).toBe(206);
  expect(response.headers()["content-type"]).toContain("video/mp4");
  expect((await response.body()).length).toBe(1024);
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test("walkthrough stays readable at supported widths and localizes navigation", async ({
  page,
}) => {
  await page.goto("/walkthrough");
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Un ritual de café, en movimiento.",
  );
  await expect(page.getByRole("link", { name: "Descargar MP4" })).toBeVisible();
  await expect(page.getByText(/^1:13 · 1080p ·/)).toBeVisible();
  await page
    .getByRole("combobox", { name: "Idioma", exact: true })
    .selectOption("pt");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Um ritual de café, em movimento.",
  );
  await expect(page.getByText(/^1:13 · 1080p ·/)).toBeVisible();
  await page.getByRole("link", { name: "Explorar a demo" }).click();
  await expect(page).toHaveURL("/");
});
