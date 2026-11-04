import type { Coffee } from "@bruma/contracts/catalog";
export type {
  Coffee,
  Weight,
  Preparation,
  Roast,
} from "@bruma/contracts/catalog";
export { variantStock } from "./variant-stock";

// A live cache of the server catalogue. App subscribes to its public store.
export let coffees: Coffee[] = [];
export function replaceCatalog(next: Coffee[]) {
  coffees = next;
}
export function findCoffee(id: string) {
  return coffees.find((coffee) => coffee.id === id);
}
