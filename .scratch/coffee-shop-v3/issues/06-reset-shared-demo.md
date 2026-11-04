# 06: Restablecer la demo compartida con confirmación

**What to build:** el administrador confirma un restablecimiento global y todos los visitantes vuelven a consultar precios, disponibilidad, existencias y pedidos de ejemplo coherentes.

**Blocked by:** 03 — Comprar como invitado y consultar el pedido persistido.

**Status:** resolved

- [x] Restablecer demo informa que afecta a todos y abre un modal; cancelar no modifica datos.
- [x] La API exige sesión administrativa y restaura precios, disponibilidad, existencias y pedidos como una operación coherente.
- [x] Reutilizar la definición de datos iniciales sin borrar datos automáticamente al reiniciar el backend.
- [x] Toast de éxito/error refleja el resultado real; fallo no deja una restauración parcial ni un éxito falso.
- [x] Compras o ediciones revisadas antes del reset no se aplican silenciosamente sobre la nueva generación de la tienda.
- [x] Refrescar los datos afectados; mantener las sesiones utilizables y explicar recibos que ya no existen.
- [x] Probar confirmación/cancelación, permisos, coherencia y una revisión de compra desactualizada mediante navegador y API.

## Comments

Depende del modelo persistido de catálogo y pedidos, no del diseño de métricas ni de los controles de atención. El comportamiento con todas las pantallas se verifica al integrar.

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.


Validación: pruebas focalizadas de API con PostgreSQL y recorrido Playwright del ticket correctos; typecheck de frontend y backend correcto. Revisión integrada pendiente en 07.

Validación integrada cerrada: suite completa 83/83 navegador y 11/11 API; regresiones de revisión y 16 recorridos afectados correctos tras la limpieza. Ambos revisores cerraron sus hallazgos. Véase ../review.md.
