# 07: Completar el recorrido conectado en idiomas y tamaños

**What to build:** el visitante compra, administra su pedido y vuelve a consultar el resultado en una V3 coherente, accesible y adaptable, incluso ante errores y cambios compartidos.

**Blocked by:** 02 — Editar precios y existencias; 04 — Atender y cancelar pedidos; 05 — Explorar métricas; 06 — Restablecer la demo compartida.

**Status:** resolved

- [x] Recorrer edición administrativa → compra/revisión → pedido → cambio de estado/cancelación → recibo y métricas actualizados.
- [x] Verificar que reset restaura también las pantallas ya visitadas y presenta recuperación útil para recibos eliminados.
- [x] Completar inglés/español/portugués y 320/768/1024/1440 px sin claves visibles ni desbordamientos.
- [x] Modales, edición, toasts, navegación y gráficos son utilizables con teclado, foco visible y alternativas accesibles.
- [x] Carga lenta, fallo de API, sesión caducada, conflictos y reintentos preservan datos y ofrecen recuperación sin éxito falso.
- [x] Mantener catálogo, recomendador, elaboración, cupones, ejemplos locales y recompra de V2 conforme al nuevo contrato persistido.
- [x] Ejecutar typecheck, lint, formato, build y suite completa de navegador/API con base de pruebas aislada.
- [x] Realizar revisión independiente de estándares y especificación, resolver hallazgos materiales y verificar las correcciones afectadas.

## Comments

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.

Validación integrada cerrada: suite completa 83/83 navegador y 11/11 API; regresiones de revisión y 16 recorridos afectados correctos tras la limpieza. Ambos revisores cerraron sus hallazgos. Véase ../review.md.
