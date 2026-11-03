export type Weight = 250 | 500;
export type Preparation = "beans" | "ground";
export type Roast = "light" | "medium" | "dark";
export interface Coffee {
  id: string;
  name: string;
  country: "panama" | "brazil" | "colombia" | "ethiopia";
  region: string;
  roast: Roast;
  available: boolean;
  enabled?: boolean;
  prices: Record<Weight, number>;
  edition: string;
  tone: string;
  version?: number;
  variants?: { weight: Weight; preparation: Preparation; stock: number }[];
}

// Editorial identities stay fixed; only commercial data is editable.
export const coffeeDefinitions: Coffee[] = [
  {
    id: "niebla",
    name: "Niebla Geisha",
    country: "panama",
    region: "Boquete",
    roast: "light",
    available: true,
    prices: { 250: 2450, 500: 4400 },
    edition: "01",
    tone: "sage",
  },
  {
    id: "volcan",
    name: "Volcán",
    country: "panama",
    region: "Tierras Altas",
    roast: "medium",
    available: false,
    prices: { 250: 2200, 500: 4000 },
    edition: "02",
    tone: "clay",
  },
  {
    id: "cerrado",
    name: "Cerrado",
    country: "brazil",
    region: "Minas Gerais",
    roast: "dark",
    available: true,
    prices: { 250: 1800, 500: 3250 },
    edition: "03",
    tone: "ochre",
  },
  {
    id: "sierra",
    name: "Sierra",
    country: "colombia",
    region: "Tolima",
    roast: "medium",
    available: true,
    prices: { 250: 1950, 500: 3500 },
    edition: "04",
    tone: "rose",
  },
  {
    id: "yirgacheffe",
    name: "Yirgacheffe",
    country: "ethiopia",
    region: "Gedeo",
    roast: "light",
    available: true,
    prices: { 250: 2150, 500: 3900 },
    edition: "05",
    tone: "blue",
  },
];

export const variantId = (
  coffeeId: string,
  weight: number,
  preparation: string,
) => `${coffeeId}:${weight}:${preparation}`;

export function variantStock(
  coffee: Coffee | undefined,
  weight: Weight,
  preparation: Preparation,
) {
  if (!coffee?.available) return 0;
  return (
    coffee.variants?.find(
      (variant) =>
        variant.weight === weight && variant.preparation === preparation,
    )?.stock ?? 0
  );
}
