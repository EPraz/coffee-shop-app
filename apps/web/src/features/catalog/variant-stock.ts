import type { Coffee, Weight, Preparation } from "@bruma/contracts/catalog";
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
