import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { seedCatalog, seedOrders } from "../src/modules/demo/demo-data";

async function seed() {
  const db = new PrismaClient();
  try {
    await db.$transaction(
      async (tx) => {
        if (await tx.store.findUnique({ where: { id: "bruma" } })) {
          console.log("Store already seeded; existing data preserved.");
          return;
        }
        const generation = randomUUID();
        await tx.store.create({ data: { id: "bruma", generation } });
        await seedCatalog(tx);
        await seedOrders(tx, generation);
      },
      { timeout: 60000 },
    );
  } finally {
    await db.$disconnect();
  }
}
void seed().catch(() => {
  console.error("Database seed failed");
  process.exitCode = 1;
});
