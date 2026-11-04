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
