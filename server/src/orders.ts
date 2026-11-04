import { Inject, Injectable } from "@nestjs/common";
import { Database } from "./database";
import { DomainError } from "./errors";
import { orderDto } from "./order-dto";

@Injectable()
export class OrderService {
  constructor(@Inject(Database) private readonly db: Database) {}
  async receipt(number: string, buyer?: string | null) {
    if (!buyer) throw new DomainError("order_missing", 404);
    const order = await this.db.order.findFirst({
      where: { number, buyerHash: buyer },
      include: { items: true },
    });
    if (!order) throw new DomainError("order_missing", 404);
    return orderDto(order);
  }
  async list() {
    const orders = await this.db.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return { orders: orders.map(orderDto) };
  }
  async detail(number: string) {
    const order = await this.db.order.findUnique({
      where: { number },
      include: { items: true },
    });
    if (!order) throw new DomainError("order_missing", 404);
    return orderDto(order);
  }
}
