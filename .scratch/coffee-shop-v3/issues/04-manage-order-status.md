# 04: Atender y cancelar pedidos con existencias coherentes

**What to build:** el administrador consulta el detalle de un pedido, avanza su atención o lo cancela antes del envío; el comprador consulta el estado actualizado desde su recibo.

**Blocked by:** 03 — Comprar como invitado y consultar el pedido persistido.

**Status:** resolved

- [ ] Mostrar lista y detalle de pedidos con fecha, número, líneas, importes históricos y estado, sin datos personales del formulario.
- [ ] Permitir únicamente confirmado → en preparación → enviado → entregado; impedir saltos y retrocesos.
- [ ] Permitir cancelación solo en confirmado o en preparación; no cancelar enviados, entregados o cancelados.
- [ ] Cancelación y reposición son atómicas; acciones repetidas o simultáneas no reponen más de una vez.
- [ ] Toasts reflejan el resultado real y los conflictos de estado muestran el dato vigente.
- [ ] El recibo del comprador obtiene el estado actualizado al consultar de nuevo, sin modificar importes históricos.
- [ ] Probar permisos, progresión, conflictos, cancelación repetida/concurrente y recuperación ante fallo mediante las fronteras aprobadas.

## Comments

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.


Validación: pruebas focalizadas de API con PostgreSQL y recorrido Playwright del ticket correctos; typecheck de frontend y backend correcto. Revisión integrada pendiente en 07.
