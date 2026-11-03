import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { coffeeDefinitions, variantId } from "../../shared/catalog";

async function seed() {
  const db = new PrismaClient();
  try {
    await db.$transaction(async (tx) => {
      const existing = await tx.store.findUnique({ where: { id: "bruma" } });
      if (existing) {
        console.log("Store already seeded; existing data preserved.");
        return;
      }
      await tx.store.create({
        data: { id: "bruma", generation: randomUUID() },
      });
      for (const coffee of coffeeDefinitions) {
        await tx.coffee.create({
          data: {
            id: coffee.id,
            available: coffee.available,
            price250: coffee.prices[250],
            price500: coffee.prices[500],
          },
        });
        for (const weight of [250, 500] as const)
          for (const preparation of ["beans", "ground"] as const) {
            await tx.variant.create({
              data: {
                id: variantId(coffee.id, weight, preparation),
                coffeeId: coffee.id,
                weight,
                preparation,
                stock: !coffee.available
                  ? 0
                  : coffee.id === "yirgacheffe" &&
                      weight === 500 &&
                      preparation === "ground"
                    ? 3
                    : 30,
              },
            });
          }
      }
    });
  } finally {
    await db.$disconnect();
  }
}
void seed().catch(() => {
  console.error("Database seed failed");
  process.exitCode = 1;
});
