# 03: Consultar pedidos guardados y ejemplos

**What to build:** Guardar compras aprobadas en el historial local y consultar recibos inmutables, con dos ejemplos precargables y borrado intencional.

**Blocked by:** None (can start immediately).

**Status:** resolved

- [x] Compra aprobada guardada una vez con fecha, snapshot de productos e importes.
- [x] Pago rechazado no crea un pedido; checkout conserva su funcionamiento.
- [x] Últimos veinte pedidos, sin datos personales, persistentes en el mismo navegador.
- [x] Navegación al historial y detalle; importes/nombres históricos independientes del catálogo.
- [x] Vacío con catálogo y dos ejemplos identificados que no sobrescriben pedidos.
- [x] Borrar requiere confirmación; datos corruptos o almacenamiento bloqueado tienen recuperación honesta.
- [x] Recorridos de compra, recarga/reapertura, ejemplos, borrado y fallos en Playwright.

## Comments

Public browser tests 14, 15 and 18 pass, including twenty-one purchases, persistence failures, intentional deletion and two-tab recovery. See the [independent review](../review.md); no remaining implementation findings.
