import { findCoffee } from "../catalog/coffee";
import { snapshotCoffee, type Order } from "./order-model";

export function exampleOrders(): Order[] {
  const niebla = snapshotCoffee(findCoffee("niebla")!);
  const volcan = snapshotCoffee(findCoffee("volcan")!);
  const cerrado = snapshotCoffee(findCoffee("cerrado")!);
  const archived = {
    ...niebla,
    id: "sol-de-ayer",
    name: "Sol de Ayer",
    edition: "00",
    tone: "ochre",
  };
  const ago = (days: number) =>
    new Date(Date.now() - days * 86_400_000).toISOString();
  return [
    {
      number: "BR-EXAMPLE-01",
      createdAt: ago(1),
      example: true,
      items: [
        {
          coffeeId: "niebla",
          coffee: niebla,
          weight: 250,
          preparation: "beans",
          quantity: 3,
          unitPrice: 2200,
        },
        {
          coffeeId: "volcan",
          coffee: volcan,
          weight: 250,
          preparation: "beans",
          quantity: 1,
          unitPrice: 2200,
        },
      ],
      amounts: { subtotal: 8800, discount: 1320, shipping: 500, total: 7980 },
    },
    {
      number: "BR-EXAMPLE-02",
      createdAt: ago(2),
      example: true,
      items: [
        {
          coffeeId: "sol-de-ayer",
          coffee: archived,
          weight: 250,
          preparation: "beans",
          quantity: 1,
          unitPrice: 1800,
        },
        {
          coffeeId: "cerrado",
          coffee: cerrado,
          weight: 500,
          preparation: "ground",
          quantity: 1,
          unitPrice: 3200,
        },
      ],
      amounts: { subtotal: 5000, discount: 0, shipping: 500, total: 5500 },
    },
  ];
}
