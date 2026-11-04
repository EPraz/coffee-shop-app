import { expect, test } from "../support/fixtures";

test("a confirmed shared reset restores samples and invalidates older purchase reviews", async ({
  request,
}) => {
  const catalog = await (await request.get("/api/catalog")).json();
  expect(
    (
      await request.post("/api/admin/reset", {
        data: { generation: catalog.generation },
      })
    ).status(),
  ).toBe(401);
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
  await request.post("/api/access/demo", { data: {} });
  const reset = await request.post("/api/admin/reset", {
    data: { generation: catalog.generation },
  });
  expect(reset.status()).toBe(201);
  const after = await (await request.get("/api/catalog")).json();
  expect(after.generation).not.toBe(catalog.generation);
  expect(
    after.coffees.find((item: { id: string }) => item.id === "sierra").prices[
      "250"
    ],
  ).toBe(1950);
  expect(
    after.coffees
      .find((item: { id: string }) => item.id === "sierra")
      .variants.find(
        (item: { weight: number; preparation: string }) =>
          item.weight === 250 && item.preparation === "beans",
      ).stock,
  ).toBe(30);
  expect((await request.get(`/api/orders/${order.number}`)).status()).toBe(404);
  expect(
    (
      await request.post("/api/checkout/confirm", {
        data: {
          requestKey: crypto.randomUUID(),
          quoteToken: quote.token,
          outcome: "approved",
        },
      })
    ).status(),
  ).toBe(409);
  expect((await request.get("/api/access/session")).status()).toBe(200);
  expect(
    (await (await request.get("/api/admin/orders")).json()).orders,
  ).toHaveLength(24);
});
