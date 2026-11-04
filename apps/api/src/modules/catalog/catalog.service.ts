import { Inject, Injectable } from "@nestjs/common";
import { Database } from "../../infrastructure/database/database.service";
import type { Coffee, Preparation, Weight } from "@bruma/contracts/catalog";
import { coffeeDefinitions } from "./catalog-data";
@Injectable()
export class CatalogService {
  constructor(@Inject(Database) private readonly db: Database) {}
  async read() {
    return this.db.$transaction(
      async (tx) => {
        const store = await tx.store.findUniqueOrThrow({
          where: { id: "bruma" },
        });
        const records = await tx.coffee.findMany({
          include: { variants: { orderBy: { id: "asc" } } },
        });
        const coffees: Coffee[] = coffeeDefinitions.map((definition) => {
          const record = records.find((item) => item.id === definition.id)!;
          return {
            ...definition,
            enabled: record.available,
            available:
              record.available &&
              record.variants.some((variant) => variant.stock > 0),
            prices: { 250: record.price250, 500: record.price500 },
            version: record.version,
            variants: record.variants.map((variant) => ({
              weight: variant.weight as Weight,
              preparation: variant.preparation as Preparation,
              stock: variant.stock,
            })),
          };
        });
        return { generation: store.generation, coffees };
      },
      { isolationLevel: "RepeatableRead" },
    );
  }
}
