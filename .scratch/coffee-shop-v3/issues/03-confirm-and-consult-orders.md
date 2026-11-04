# 03: Comprar como invitado y consultar el pedido persistido

**What to build:** el visitante revisa su compra con precios y stock vigentes, confirma un pedido una sola vez y puede volver a su recibo desde este navegador; el pedido también aparece en la lista administrativa.

**Blocked by:** 01 — Explorar la tienda persistida y entrar al panel demo.

**Status:** resolved

- [ ] Conservar validación del formulario, Llenar demo y modos aprobado/rechazado; no persistir ni registrar datos personales del formulario.
- [ ] La API calcula precios, BRUMA15 y envío; no acepta importes del cliente como autoridad.
- [ ] Un cambio entre revisión y confirmación abre el modal sencillo; Aplicar cambios actualiza y devuelve a revisión sin comprar; Volver a la bolsa preserva la selección.
- [ ] Confirmar pedido y descontar existencias es atómico; una carrera por la última unidad produce un solo pedido confirmado.
- [ ] Doble clic y reintento de la misma solicitud devuelven el mismo pedido sin descontar dos veces; reutilización incompatible se rechaza.
- [ ] Rechazo, falta de stock o fallo no vacían el carrito ni crean una falsa confirmación.
- [ ] Recibo y lista administrativa muestran líneas e importes históricos y estado inicial confirmado.
- [ ] Mis pedidos conserva hasta veinte referencias/snapshots de este navegador, permite consultar estado vigente y no enumera compras ajenas por conocer su número.
- [ ] Borrar historial local no borra pedidos administrativos; conservar ejemplos locales claramente marcados y la recompra revisada.
- [ ] Usar una nueva persistencia de historial sin leer ni migrar recibos de V2; errores de almacenamiento tienen recuperación útil.
- [ ] Verificar importes conocidos, compra aprobada/rechazada, aislamiento del historial, reintento y última unidad concurrente mediante navegador/API.

## Comments

Puede empezar tras 01 sin esperar 02: utiliza el contrato de catálogo y existencias de 01. La demostración de precios editados desde el panel se verifica al integrar ambos recorridos.

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.


Validación: pruebas focalizadas de API con PostgreSQL y recorrido Playwright del ticket correctos; typecheck de frontend y backend correcto. Revisión integrada pendiente en 07.
