CREATE TABLE "Order" (
  "number" TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "example" BOOLEAN NOT NULL DEFAULT false,
  "state" TEXT NOT NULL DEFAULT 'confirmed' CHECK ("state" IN ('confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')),
  "version" INTEGER NOT NULL DEFAULT 1,
  "buyerHash" TEXT NOT NULL,
  "requestKey" TEXT NOT NULL,
  "requestHash" TEXT NOT NULL,
  "subtotal" INTEGER NOT NULL CHECK ("subtotal" >= 0),
  "discount" INTEGER NOT NULL CHECK ("discount" BETWEEN 0 AND "subtotal"),
  "shipping" INTEGER NOT NULL CHECK ("shipping" >= 0),
  "total" INTEGER NOT NULL CHECK ("total" = "subtotal" - "discount" + "shipping"),
  UNIQUE ("buyerHash", "requestKey")
);
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
CREATE TABLE "OrderItem" (
  "id" TEXT PRIMARY KEY,
  "orderNumber" TEXT NOT NULL REFERENCES "Order"("number") ON DELETE CASCADE,
  "coffeeId" TEXT NOT NULL,
  "weight" INTEGER NOT NULL CHECK ("weight" IN (250, 500)),
  "preparation" TEXT NOT NULL CHECK ("preparation" IN ('beans', 'ground')),
  "quantity" INTEGER NOT NULL CHECK ("quantity" BETWEEN 1 AND 9),
  "unitPrice" INTEGER NOT NULL CHECK ("unitPrice" > 0),
  "discount" INTEGER NOT NULL CHECK ("discount" BETWEEN 0 AND "unitPrice" * "quantity"),
  "coffee" JSONB NOT NULL
);
