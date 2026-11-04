# 05: Explorar métricas y actividad de la tienda compartida

**What to build:** el administrador abre un dashboard visual con ventas, cantidad de pedidos, promedio, tendencia, cafés destacados, actividad reciente y alertas de existencias, todo calculado desde pedidos persistidos.

**Blocked by:** 03 — Comprar como invitado y consultar el pedido persistido.

**Status:** resolved

- [ ] Sembrar ejemplos sintéticos de los últimos treinta días con cafés y estados variados, sin datos personales y sin reseed destructivo al arrancar.
- [ ] Alternar siete/treinta días con criterios temporales consistentes y visibles.
- [ ] Ventas excluyen envío y cancelados; promedio usa pedidos no cancelados; cantidad incluye cancelados; casos vacíos presentan cero y recuperación útil.
- [ ] Mostrar tendencia por día, cafés destacados según ventas descontadas y enlaces a pedidos recientes.
- [ ] Alertar variantes con cinco bolsas o menos y distinguir cero como agotado.
- [ ] Cálculos provienen del servidor y del mismo conjunto de pedidos, no de valores decorativos.
- [ ] Presentar gráficos accesibles con valores/texto alternativo, diseño Bruma y títulos compactos en móvil y escritorio.
- [ ] Probar métricas contra importes y períodos conocidos, incluyendo pedidos cancelados, y recorrer filtros/enlaces por navegador.

## Comments

No depende de 04: los ejemplos y contratos de pedidos de 03 permiten probar estados cancelados sin esperar los controles de atención. La actualización tras una cancelación desde el panel se verifica en el recorrido integrado.

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.


Validación: pruebas focalizadas de API con PostgreSQL y recorrido Playwright del ticket correctos; typecheck de frontend y backend correcto. Revisión integrada pendiente en 07.
