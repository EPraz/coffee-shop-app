import { variantId } from "./variant-id";
import { Inject, Injectable } from "@nestjs/common";
import { z } from "zod";
import { Database } from "../../infrastructure/database/database.service";
import { DomainError } from "../../common/errors/domain-error";
import { lockStore } from "../../infrastructure/database/store-lock";

const variant = z.strictObject({
  weight: z.union([z.literal(250), z.literal(500)]),
  preparation: z.enum(["beans", "ground"]),
  stock: z.int().min(0).max(9999),
});
const editSchema = z.strictObject({
  generation: z.uuid(),
  version: z.int().positive(),
  available: z.boolean(),
  prices: z.strictObject({
    "250": z.int().min(1).max(100000),
    "500": z.int().min(1).max(100000),
  }),
  variants: z
    .array(variant)
    .length(4)
    .refine(
      (items) =>
        new Set(items.map((item) => `${item.weight}:${item.preparation}`))
          .size === 4,
    ),
});

@Injectable()
export class CatalogEditor {
  constructor(@Inject(Database) private readonly db: Database) {}
  async update(id: string, input: unknown) {
    const edit = editSchema.parse(input);
    await this.db.$transaction(async (tx) => {
      await lockStore(tx, edit.generation);
      const coffee = await tx.coffee.findUnique({ where: { id } });
      if (!coffee) throw new DomainError("coffee_missing", 404);
      if (coffee.version !== edit.version)
        throw new DomainError("edit_conflict");
      await tx.coffee.update({
        where: { id },
        data: {
          available: edit.available,
          price250: edit.prices[250],
          price500: edit.prices[500],
          version: { increment: 1 },
        },
      });
      for (const item of edit.variants)
        await tx.variant.update({
          where: { id: variantId(id, item.weight, item.preparation) },
          data: { stock: item.stock },
        });
    });
    return { ok: true };
  }
}
