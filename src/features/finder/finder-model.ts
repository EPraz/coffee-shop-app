import { coffees, type Coffee, type Roast } from "../catalog/coffee";

export type Flavour = "chocolate" | "fruit" | "floral";
export type Intensity = "gentle" | "balanced" | "intense";
export type Serving = "black" | "milk";
export interface Preferences {
  flavour: Flavour;
  intensity: Intensity;
  serving: Serving;
}
export type PreferenceKey = keyof Preferences;
export const preferenceSteps: PreferenceKey[] = [
  "flavour",
  "intensity",
  "serving",
];
export const preferenceOptions = {
  flavour: ["chocolate", "fruit", "floral"],
  intensity: ["gentle", "balanced", "intense"],
  serving: ["black", "milk"],
} as const;
const roastIntensity: Record<Roast, Intensity> = {
  light: "gentle",
  medium: "balanced",
  dark: "intense",
};
const profiles: Record<string, { flavours: Flavour[]; milk: boolean }> = {
  niebla: { flavours: ["floral", "fruit"], milk: false },
  volcan: { flavours: ["chocolate", "fruit"], milk: true },
  cerrado: { flavours: ["chocolate"], milk: true },
  sierra: { flavours: ["fruit", "chocolate"], milk: true },
  yirgacheffe: { flavours: ["floral", "fruit"], milk: false },
};
export interface CoffeeMatch {
  coffee: Coffee;
  reasons: PreferenceKey[];
  exact: boolean;
}
export function findMatches(preferences: Preferences): CoffeeMatch[] {
  return coffees
    .filter((coffee) => coffee.available)
    .map((coffee) => {
      const profile = profiles[coffee.id];
      const reasons: PreferenceKey[] = [];
      if (profile?.flavours.includes(preferences.flavour))
        reasons.push("flavour");
      if (roastIntensity[coffee.roast] === preferences.intensity)
        reasons.push("intensity");
      if (preferences.serving === "black" || profile?.milk)
        reasons.push("serving");
      const score = reasons.reduce(
        (sum, reason) => sum + (reason === "flavour" ? 3 : 1),
        0,
      );
      return { coffee, reasons, exact: reasons.length === 3, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score || a.coffee.edition.localeCompare(b.coffee.edition),
    )
    .slice(0, 2);
}
