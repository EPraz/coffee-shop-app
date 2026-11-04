import { expect, test } from "../test-support/fixtures";

test("order progression and cancellation preserve stock exactly once", async ({
  request,
}) => {
  const catalog = await (await request.get("/api/catalog")).json();
  const quote = await (
    await request.post("/api/checkout/review", {
      data: {
        generation: catalog.generation,
        couponApplied: false,
        lines: [
          {
            coffeeId: "cerrado",
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
  const path = `/api/admin/orders/${order.number}/state`;
  expect(
    (
      await request.patch(path, {
        data: {
          state: "preparing",
          version: 1,
          generation: catalog.generation,
        },
      })
    ).status(),
  ).toBe(401);
  await request.post("/api/access/demo", { data: {} });
  expect(
    (
      await request.patch(path, {
        data: { state: "shipped", version: 1, generation: catalog.generation },
      })
    ).status(),
  ).toBe(409);
  const preparing = await request.patch(path, {
    data: { state: "preparing", version: 1, generation: catalog.generation },
  });
  expect(preparing.status()).toBe(200);
  expect((await preparing.json()).state).toBe("preparing");
  expect(
    (
      await request.patch(path, {
        data: {
          state: "confirmed",
          version: 2,
          generation: catalog.generation,
        },
      })
    ).status(),
  ).toBe(409);
  const cancels = await Promise.all(
    [1, 2].map(() =>
      request.patch(path, {
        data: {
          state: "cancelled",
          version: 2,
          generation: catalog.generation,
        },
      }),
    ),
  );
  expect(cancels.map((response) => response.status()).sort()).toEqual([
    200, 409,
  ]);
  expect(
    (await (await request.get(`/api/orders/${order.number}`)).json()).state,
  ).toBe("cancelled");
  const after = await (await request.get("/api/catalog")).json();
  expect(
    after.coffees
      .find((item: { id: string }) => item.id === "cerrado")
      .variants.find(
        (item: { weight: number; preparation: string }) =>
          item.weight === 250 && item.preparation === "beans",
      ).stock,
  ).toBe(30);
});
