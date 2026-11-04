export const variantId = (
  coffeeId: string,
  weight: number,
  preparation: string,
) => `${coffeeId}:${weight}:${preparation}`;
