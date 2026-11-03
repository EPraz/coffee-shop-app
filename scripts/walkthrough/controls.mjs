import { expect } from "@playwright/test";

export function installAnnotations() {
  addEventListener("DOMContentLoaded", () => {
    const dot = document.createElement("div");
    Object.assign(dot.style, {
      position: "fixed",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: "2px solid #d0ddb0",
      background: "#d0ddb033",
      opacity: "0",
      pointerEvents: "none",
      zIndex: "2147483647",
      transform: "translate(-50%,-50%)",
    });
    document.body.append(dot);
    addEventListener(
      "pointerdown",
      (event) => {
        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;
        dot.animate(
          [
            { opacity: 0.9, scale: 0.6 },
            { opacity: 0, scale: 1.5 },
          ],
          450,
        );
      },
      true,
    );
    window.syncRecording = () => {
      const marker = document.createElement("div");
      Object.assign(marker.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "8px",
        height: "8px",
        background: "#0000ff",
        zIndex: "2147483647",
      });
      document.body.append(marker);
      setTimeout(() => marker.remove(), 240);
    };
  });
}

export function controls(page, rehearsal) {
  const pause = (ms) => page.waitForTimeout(rehearsal ? Math.min(ms, 60) : ms);
  const reveal = async (locator) => {
    await expect(locator).toBeVisible();
    await locator.evaluate(
      (element, instant) =>
        element.scrollIntoView({
          block: "center",
          behavior: instant ? "instant" : "smooth",
        }),
      rehearsal,
    );
    await pause(650);
  };
  const click = async (locator) => {
    await reveal(locator);
    const box = await locator.boundingBox();
    if (page.viewportSize().width < 500) {
      await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await locator.click();
    }
    await pause(350);
  };
  const scroll = async (y) => {
    await page.evaluate(
      ({ y, instant }) =>
        window.scrollTo({ top: y, behavior: instant ? "instant" : "smooth" }),
      { y, instant: rehearsal },
    );
    await pause(850);
  };
  return { pause, reveal, click, scroll };
}
