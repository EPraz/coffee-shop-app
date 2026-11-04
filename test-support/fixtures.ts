import { test as base, expect } from "@playwright/test";
export { expect };
export type { Page } from "@playwright/test";

// Each test gets the same shared store baseline through its public demo API.
// request is an isolated API context, so this does not sign the browser in.
export const test = base.extend<{ demoBaseline: void }>({
  demoBaseline: [
    async ({ request }, use) => {
      const catalog = await (await request.get("/api/catalog")).json();
      expect(
        (await request.post("/api/access/demo", { data: {} })).status(),
      ).toBe(201);
      expect(
        (
          await request.post("/api/admin/reset", {
            data: { generation: catalog.generation },
          })
        ).status(),
      ).toBe(201);
      expect((await request.delete("/api/access/session")).status()).toBe(200);
      await use();
    },
    { auto: true },
  ],
});
