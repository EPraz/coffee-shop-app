import { expect, test } from "../support/fixtures";

test("seven-day metrics use discounted product sales and exclude cancelled orders", async ({
  request,
}) => {
  expect((await request.get("/api/admin/dashboard?days=7")).status()).toBe(401);
  await request.post("/api/access/demo", { data: {} });
  const response = await request.get("/api/admin/dashboard?days=7");
  expect(response.status()).toBe(200);
  const dashboard = await response.json();
  expect(dashboard.orderCount).toBe(7);
  expect(dashboard.sales).toBe(33527);
  expect(dashboard.average).toBe(5588);
  expect(dashboard.lowStock).toHaveLength(5);
  expect(dashboard.trend.map((day: { sales: number }) => day.sales)).toEqual([
    1870, 13200, 0, 2975, 5400, 8000, 2082,
  ]);
  expect(dashboard.leading[0]).toMatchObject({
    coffeeId: "niebla",
    sales: 15282,
  });
  expect(dashboard.range.timeZone).toBe("UTC");
  expect((await request.get("/api/admin/dashboard?days=365")).status()).toBe(
    400,
  );
});
