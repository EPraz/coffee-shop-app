import { expect, test } from "../test-support/fixtures";

test("the shared store exposes five persisted coffees and twenty variants", async ({
  request,
}) => {
  const response = await request.get("/api/catalog");
  expect(response.status()).toBe(200);
  const catalog = await response.json();
  expect(catalog.coffees).toHaveLength(5);
  const niebla = catalog.coffees.find(
    (coffee: { id: string }) => coffee.id === "niebla",
  );
  expect(niebla.prices).toEqual({ "250": 2450, "500": 4400 });
  expect(niebla.variants).toHaveLength(4);
  expect(niebla.variants[0].stock).toBeGreaterThan(9);
  expect(catalog.generation).toEqual(expect.any(String));
});

test("demo access is server-validated and cannot accept client-supplied roles", async ({
  request,
}) => {
  expect((await request.get("/api/admin/catalog")).status()).toBe(401);
  expect(
    (
      await request.post("/api/access/demo", { data: { role: "owner" } })
    ).status(),
  ).toBe(400);
  expect((await request.post("/api/access/demo", { data: {} })).status()).toBe(
    201,
  );
  expect((await request.get("/api/access/session")).status()).toBe(200);
  expect((await request.get("/api/admin/catalog")).status()).toBe(200);
  expect((await request.delete("/api/access/session")).status()).toBe(200);
  expect((await request.get("/api/admin/catalog")).status()).toBe(401);
});
