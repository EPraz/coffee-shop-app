import { Inject, Injectable } from "@nestjs/common";
import { z } from "zod";
import { Database } from "../../infrastructure/database/database.service";
import { orderDto } from "../orders/order-dto";
import type { Dashboard } from "@bruma/contracts/dashboard";
import type { Preparation, Weight } from "@bruma/contracts/catalog";

@Injectable()
export class DashboardService {
  constructor(@Inject(Database) private readonly db: Database) {}
  async read(query: unknown): Promise<Dashboard> {
    const { days: selection } = z
      .strictObject({ days: z.enum(["7", "30"]).default("30") })
      .parse(query);
    const days = Number(selection) as 7 | 30;
    const now = new Date();
    const from = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() - days + 1,
      ),
    );
    return this.db.$transaction(
      async (tx) => {
        const orders = await tx.order.findMany({
          where: { createdAt: { gte: from, lte: now } },
          include: { items: true },
          orderBy: { createdAt: "desc" },
        });
        const lowStock = await tx.variant.findMany({
          where: { stock: { lte: 5 } },
          orderBy: [{ stock: "asc" }, { id: "asc" }],
        });
        const eligible = orders.filter((order) => order.state !== "cancelled");
        const sales = eligible.reduce(
          (sum, order) => sum + order.subtotal - order.discount,
          0,
        );
        const totals = new Map<string, number>();
        const coffees = new Map<
          string,
          { coffeeId: string; sales: number; bags: number }
        >();
        for (const order of eligible) {
          const date = order.createdAt.toISOString().slice(0, 10);
          totals.set(
            date,
            (totals.get(date) ?? 0) + order.subtotal - order.discount,
          );
          for (const item of order.items) {
            const current = coffees.get(item.coffeeId) ?? {
              coffeeId: item.coffeeId,
              sales: 0,
              bags: 0,
            };
            current.sales += item.unitPrice * item.quantity - item.discount;
            current.bags += item.quantity;
            coffees.set(item.coffeeId, current);
          }
        }
        return {
          days,
          range: {
            from: from.toISOString(),
            to: now.toISOString(),
            timeZone: "UTC",
          },
          sales,
          orderCount: orders.length,
          average: eligible.length ? Math.round(sales / eligible.length) : 0,
          trend: Array.from({ length: days }, (_, index) => {
            const date = new Date(from.getTime() + index * 86400000)
              .toISOString()
              .slice(0, 10);
            return { date, sales: totals.get(date) ?? 0 };
          }),
          leading: [...coffees.values()].sort(
            (a, b) => b.sales - a.sales || a.coffeeId.localeCompare(b.coffeeId),
          ),
          recent: orders.slice(0, 5).map(orderDto),
          lowStock: lowStock.map((item) => ({
            coffeeId: item.coffeeId,
            weight: item.weight as Weight,
            preparation: item.preparation as Preparation,
            stock: item.stock,
          })),
        };
      },
      { isolationLevel: "RepeatableRead" },
    );
  }
}
