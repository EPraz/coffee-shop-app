import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { Database } from "../../infrastructure/database/database.service";
import { lockStore } from "../../infrastructure/database/store-lock";
import { seedCatalog, seedOrders } from "./demo-data";

@Injectable()
export class ResetService {
  constructor(@Inject(Database) private readonly db: Database) {}
  async reset(input: unknown) {
    const { generation } = z
      .strictObject({ generation: z.uuid() })
      .parse(input);
    return this.db.$transaction(
      async (tx) => {
        await lockStore(tx, generation);
        const next = randomUUID();
        await tx.order.deleteMany();
        await seedCatalog(tx);
        await seedOrders(tx, next);
        await tx.store.update({
          where: { id: "bruma" },
          data: { generation: next },
        });
        return { ok: true, generation: next };
      },
      { timeout: 60000 },
    );
  }
}
