export type BrewMethod = "v60" | "press";
export const brewMethods: BrewMethod[] = ["v60", "press"];
export const brewSources = {
  v60: "https://www.hario-usa.com/blogs/recipes-and-more-from-friends/james-hoffmann-uitimate-v60-technique",
  press: "https://espro.com/blogs/brew-guide/french-press",
};
export function brewRecipe(method: BrewMethod, amount: string) {
  const water = Number(amount);
  if (
    !amount.trim() ||
    !Number.isInteger(water) ||
    water < 250 ||
    water > 500 ||
    water % 50 !== 0
  )
    return null;
  const coffee =
    Math.round((method === "v60" ? water * 0.06 : water / 15) * 10) / 10;
  return {
    coffee,
    water,
    bloom: Math.round(coffee * 2),
    firstPour: Math.round(water * 0.6),
  };
}
