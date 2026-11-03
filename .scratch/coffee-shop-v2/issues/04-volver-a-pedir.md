# 04: Revisar y confirmar una recompra

**What to build:** Desde un pedido, revisar cantidades y condiciones actuales antes de sumar una selección al carrito existente.

**Blocked by:** 03: Consultar pedidos guardados y ejemplos.

**Status:** resolved

- [x] Vista previa con precio histórico/actual, cantidades añadibles y avisos de agotados o desaparecidos.
- [x] Ocho existentes y tres solicitadas permite añadir una; máximo combinado nueve por variante.
- [x] Confirmar añade una vez y conserva el contenido y cupón actuales del carrito.
- [x] Cupón histórico no se restaura y recibo anterior no se modifica.
- [x] Cancelar no cambia el carrito; nada añadible impide confirmar y explica la causa.
- [x] Pruebas mediante los ejemplos y compras reales de demostración en la interfaz.

## Comments

All four public reorder cases and the V2 matrix pass; historical/current prices, merged limits, exclusions, cancellation and coupons verified. See the [independent review](../review.md); no remaining implementation findings.
