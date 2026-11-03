CREATE TABLE "Store" ("id" TEXT PRIMARY KEY, "generation" TEXT NOT NULL);
CREATE TABLE "Coffee" (
  "id" TEXT PRIMARY KEY,
  "available" BOOLEAN NOT NULL,
  "price250" INTEGER NOT NULL CHECK ("price250" BETWEEN 1 AND 100000),
  "price500" INTEGER NOT NULL CHECK ("price500" BETWEEN 1 AND 100000),
  "version" INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE "Variant" (
  "id" TEXT PRIMARY KEY,
  "coffeeId" TEXT NOT NULL REFERENCES "Coffee"("id"),
  "weight" INTEGER NOT NULL CHECK ("weight" IN (250, 500)),
  "preparation" TEXT NOT NULL CHECK ("preparation" IN ('beans', 'ground')),
  "stock" INTEGER NOT NULL CHECK ("stock" BETWEEN 0 AND 9999),
  UNIQUE ("coffeeId", "weight", "preparation")
);
