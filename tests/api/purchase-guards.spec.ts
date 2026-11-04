import { expect, test } from "../support/fixtures";

test("checkout rejects manipulated data and rejected payments without consuming stock", async ({
  request,
}) => {
  const catalog = await (await request.get("/api/catalog")).json();
  const selection = {
    generation: catalog.generation,
    couponApplied: true,
    lines: [
      { coffeeId: "niebla", weight: 250, preparation: "beans", quantity: 1 },
    ],
  };
  expect(
    (
      await request.post("/api/checkout/review", {
        data: { ...selection, lines: [{ ...selection.lines[0], quantity: 0 }] },
      })
    ).status(),
  ).toBe(400);
  const quote = await (
    await request.post("/api/checkout/review", { data: selection })
  ).json();
  const command = {
    requestKey: crypto.randomUUID(),
    quoteToken: quote.token,
    outcome: "approved",
  };
  expect(
    (
      await request.post("/api/checkout/confirm", {
        data: { ...command, total: 1 },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/checkout/confirm", {
        data: { ...command, quoteToken: quote.token + "x" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/checkout/confirm", {
        data: { ...command, outcome: "rejected" },
      })
    ).status(),
  ).toBe(402);
  const after = await (await request.get("/api/catalog")).json();
  expect(
    after.coffees
      .find((item: { id: string }) => item.id === "niebla")
      .variants.find(
        (item: { weight: number; preparation: string }) =>
          item.weight === 250 && item.preparation === "beans",
      ).stock,
  ).toBe(30);
  await request.post("/api/access/demo", { data: {} });
  expect(
    (await (await request.get("/api/admin/orders")).json()).orders,
  ).toHaveLength(24);
});

test("knowing an order number does not give another buyer access to its receipt", async ({
  request,
  playwright,
}) => {
  const catalog = await (await request.get("/api/catalog")).json();
  const quote = await (
    await request.post("/api/checkout/review", {
      data: {
        generation: catalog.generation,
        couponApplied: false,
        lines: [
          {
            coffeeId: "sierra",
            weight: 250,
            preparation: "beans",
            quantity: 1,
          },
        ],
      },
    })
  ).json();
  const order = await (
    await request.post("/api/checkout/confirm", {
      data: {
        requestKey: crypto.randomUUID(),
        quoteToken: quote.token,
        outcome: "approved",
      },
    })
  ).json();
  const stranger = await playwright.request.newContext({
    baseURL: "http://127.0.0.1:43176",
  });
  try {
    expect((await stranger.get(`/api/orders/${order.number}`)).status()).toBe(
      404,
    );
    expect((await request.get(`/api/orders/${order.number}`)).status()).toBe(
      200,
    );
    expect(order).not.toHaveProperty("buyerHash");
    expect(order).not.toHaveProperty("requestHash");
    expect(
      (await stranger.get(`/api/admin/orders/${order.number}`)).status(),
    ).toBe(401);
  } finally {
    await stranger.dispose();
  }
});
