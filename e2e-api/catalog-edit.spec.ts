import { expect, test } from "../test-support/fixtures";

test("editing a coffee changes the public offer and rejects stale or invalid writes", async ({
  request,
}) => {
  const initial = await (await request.get("/api/catalog")).json();
  const coffee = initial.coffees.find(
    (item: { id: string }) => item.id === "sierra",
  );
  const edit = {
    generation: initial.generation,
    version: coffee.version,
    available: true,
    prices: { "250": 2100, "500": 3600 },
    variants: coffee.variants.map(
      (variant: { weight: number; preparation: string; stock: number }) => ({
        ...variant,
        stock:
          variant.weight === 250 && variant.preparation === "beans"
            ? 2
            : variant.stock,
      }),
    ),
  };
  expect(
    (await request.patch("/api/admin/catalog/sierra", { data: edit })).status(),
  ).toBe(401);
  await request.post("/api/access/demo", { data: {} });
  expect(
    (await request.patch("/api/admin/catalog/sierra", { data: edit })).status(),
  ).toBe(200);
  const updated = await (await request.get("/api/catalog")).json();
  const sierra = updated.coffees.find(
    (item: { id: string }) => item.id === "sierra",
  );
  expect(sierra.prices["250"]).toBe(2100);
  expect(
    sierra.variants.find(
      (item: { weight: number; preparation: string }) =>
        item.weight === 250 && item.preparation === "beans",
    ).stock,
  ).toBe(2);
  expect(
    (await request.patch("/api/admin/catalog/sierra", { data: edit })).status(),
  ).toBe(409);
  expect(
    (
      await request.patch("/api/admin/catalog/sierra", {
        data: { ...edit, version: sierra.version, name: "Replacement" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.patch("/api/admin/catalog/sierra", {
        data: {
          ...edit,
          version: sierra.version,
          prices: { "250": -100, "500": 3600 },
        },
      })
    ).status(),
  ).toBe(400);
  const restore = {
    ...edit,
    version: sierra.version,
    prices: coffee.prices,
    variants: coffee.variants,
  };
  expect(
    (
      await request.patch("/api/admin/catalog/sierra", { data: restore })
    ).status(),
  ).toBe(200);
});
