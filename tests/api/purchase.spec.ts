import { expect, test } from "../support/fixtures";

test("a guest confirms a server-priced order once and can retrieve its receipt", async ({
  request,
}) => {
  const catalog = await (await request.get("/api/catalog")).json();
  const reviewResponse = await request.post("/api/checkout/review", {
    data: {
      generation: catalog.generation,
      couponApplied: true,
      lines: [
        { coffeeId: "niebla", weight: 250, preparation: "beans", quantity: 1 },
        { coffeeId: "sierra", weight: 250, preparation: "beans", quantity: 1 },
      ],
    },
  });
  expect(reviewResponse.status()).toBe(201);
  const quote = await reviewResponse.json();
  expect(quote.amounts).toEqual({
    subtotal: 4400,
    discount: 660,
    shipping: 500,
    total: 4240,
  });
  const purchase = {
    requestKey: crypto.randomUUID(),
    quoteToken: quote.token,
    outcome: "approved",
  };
  const response = await request.post("/api/checkout/confirm", {
    data: purchase,
  });
  expect(response.status()).toBe(201);
  const order = await response.json();
  expect(order.state).toBe("confirmed");
  expect(order.amounts.total).toBe(4240);
  const repeat = await request.post("/api/checkout/confirm", {
    data: purchase,
  });
  expect((await repeat.json()).number).toBe(order.number);
  expect((await request.get(`/api/orders/${order.number}`)).status()).toBe(200);
  const after = await (await request.get("/api/catalog")).json();
  expect(
    after.coffees
      .find((item: { id: string }) => item.id === "niebla")
      .variants.find(
        (item: { weight: number; preparation: string }) =>
          item.weight === 250 && item.preparation === "beans",
      ).stock,
  ).toBe(29);
  await request.post("/api/access/demo", { data: {} });
  const adminOrders = await (await request.get("/api/admin/orders")).json();
  expect(
    adminOrders.orders.some(
      (item: { number: string }) => item.number === order.number,
    ),
  ).toBe(true);
});

test("only one buyer gets the last unit and an older stock editor cannot overwrite the sale", async ({
  request,
  playwright,
}) => {
  await request.post("/api/access/demo", { data: {} });
  const catalog = await (await request.get("/api/catalog")).json();
  const coffee = catalog.coffees.find(
    (item: { id: string }) => item.id === "sierra",
  );
  await request.patch("/api/admin/catalog/sierra", {
    data: {
      generation: catalog.generation,
      version: coffee.version,
      available: true,
      prices: coffee.prices,
      variants: coffee.variants.map(
        (variant: { weight: number; preparation: string; stock: number }) => ({
          ...variant,
          stock:
            variant.weight === 250 && variant.preparation === "beans"
              ? 1
              : variant.stock,
        }),
      ),
    },
  });
  const latest = await (await request.get("/api/catalog")).json();
  const beforeSale = latest.coffees.find(
    (item: { id: string }) => item.id === "sierra",
  );
  const other = await playwright.request.newContext({
    baseURL: "http://127.0.0.1:43176",
  });
  try {
    const selection = {
      generation: latest.generation,
      couponApplied: false,
      lines: [
        { coffeeId: "sierra", weight: 250, preparation: "beans", quantity: 1 },
      ],
    };
    const first = await (
      await request.post("/api/checkout/review", { data: selection })
    ).json();
    const second = await (
      await other.post("/api/checkout/review", { data: selection })
    ).json();
    const results = await Promise.all([
      request.post("/api/checkout/confirm", {
        data: {
          requestKey: crypto.randomUUID(),
          quoteToken: first.token,
          outcome: "approved",
        },
      }),
      other.post("/api/checkout/confirm", {
        data: {
          requestKey: crypto.randomUUID(),
          quoteToken: second.token,
          outcome: "approved",
        },
      }),
    ]);
    expect(results.map((response) => response.status()).sort()).toEqual([
      201, 409,
    ]);
    const staleWrite = await request.patch("/api/admin/catalog/sierra", {
      data: {
        generation: latest.generation,
        version: beforeSale.version,
        available: true,
        prices: beforeSale.prices,
        variants: beforeSale.variants,
      },
    });
    expect(staleWrite.status()).toBe(409);
    const after = await (await request.get("/api/catalog")).json();
    const current = after.coffees.find(
      (item: { id: string }) => item.id === "sierra",
    );
    expect(
      current.variants.find(
        (item: { weight: number; preparation: string }) =>
          item.weight === 250 && item.preparation === "beans",
      ).stock,
    ).toBe(0);
    await request.patch("/api/admin/catalog/sierra", {
      data: {
        generation: after.generation,
        version: current.version,
        available: true,
        prices: current.prices,
        variants: current.variants.map((variant: { stock: number }) => ({
          ...variant,
          stock: 30,
        })),
      },
    });
  } finally {
    await other.dispose();
  }
});
