import { expect, test } from "../test-support/fixtures";

test("a small discounted basket allocates cents without exceeding a line value", async ({
  request,
}) => {
  await request.post("/api/access/demo", { data: {} });
  const catalog = await (await request.get("/api/catalog")).json();
  const baseline = await (
    await request.get("/api/admin/dashboard?days=30")
  ).json();
  for (const coffee of catalog.coffees) {
    expect(
      (
        await request.patch(`/api/admin/catalog/${coffee.id}`, {
          data: {
            generation: catalog.generation,
            version: coffee.version,
            available: true,
            prices: { "250": 1, "500": 1 },
            variants: coffee.variants.map(
              (variant: { weight: number; preparation: string }) => ({
                ...variant,
                stock: 30,
              }),
            ),
          },
        })
      ).status(),
    ).toBe(200);
  }
  const lines = catalog.coffees.flatMap(
    (coffee: {
      id: string;
      variants: { weight: number; preparation: string }[];
    }) =>
      coffee.variants.map((variant) => ({
        coffeeId: coffee.id,
        weight: variant.weight,
        preparation: variant.preparation,
        quantity: 1,
      })),
  );
  const quote = await (
    await request.post("/api/checkout/review", {
      data: { generation: catalog.generation, couponApplied: true, lines },
    })
  ).json();
  expect(quote.amounts).toEqual({
    subtotal: 20,
    discount: 3,
    shipping: 500,
    total: 517,
  });
  const result = await request.post("/api/checkout/confirm", {
    data: {
      requestKey: crypto.randomUUID(),
      quoteToken: quote.token,
      outcome: "approved",
    },
  });
  expect(result.status()).toBe(201);
  expect((await result.json()).amounts.total).toBe(517);
  const after = await (
    await request.get("/api/admin/dashboard?days=30")
  ).json();
  expect(after.sales - baseline.sales).toBe(17);
});
