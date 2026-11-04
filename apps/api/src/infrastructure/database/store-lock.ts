import { Prisma } from "@prisma/client";
import { DomainError } from "../../common/errors/domain-error";

// Mutations share this short database lock so reset and stock changes serialize.
export async function lockStore(
  tx: Prisma.TransactionClient,
  expectedGeneration?: string,
) {
  const stores = await tx.$queryRaw<
    { generation: string }[]
  >`SELECT "generation" FROM "Store" WHERE "id" = 'bruma' FOR UPDATE`;
  const generation = stores[0]?.generation;
  if (!generation) throw new DomainError("store_unavailable", 503);
  if (expectedGeneration && generation !== expectedGeneration)
    throw new DomainError("store_reset");
  return generation;
}
