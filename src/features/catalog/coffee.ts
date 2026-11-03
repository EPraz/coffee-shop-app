import type { Coffee } from "../../../shared/catalog";
export type {
  Coffee,
  Weight,
  Preparation,
  Roast,
} from "../../../shared/catalog";
export { variantStock } from "../../../shared/catalog";

// A live cache of the server catalogue. App subscribes to its public store.
export let coffees: Coffee[] = [];
export function replaceCatalog(next: Coffee[]) {
  coffees = next;
}
export function findCoffee(id: string) {
  return coffees.find((coffee) => coffee.id === id);
}
