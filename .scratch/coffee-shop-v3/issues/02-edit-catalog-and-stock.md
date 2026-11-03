# 02: Editar precios y existencias y ver el resultado en la tienda

**What to build:** el administrador cambia precios, disponibilidad y existencias de los cafés actuales; el comprador ve la oferta vigente en catálogo, ficha, carrito, recomendador y revisión de recompra.

**Blocked by:** 01 — Explorar la tienda persistida y entrar al panel demo.

**Status:** resolved

- [ ] Editar precios por peso en USD conserva el mismo precio para en grano y molido; editar existencias distingue las cuatro variantes.
- [ ] Activar/desactivar un café modifica su disponibilidad comercial sin crear, archivar ni borrar productos.
- [ ] Validar precios, existencias e identificadores tanto en el formulario como en la API; rechazar campos no permitidos.
- [ ] Guardar muestra un toast con el resultado real; fallo conserva entradas; pendientes impiden envíos duplicados.
- [ ] Una edición administrativa desactualizada informa el conflicto en lugar de sobrescribir silenciosamente otro cambio.
- [ ] Catálogo, ficha, carrito, recomendador y recompra usan disponibilidad/precios persistidos; respetar existencias y máximo nueve bolsas por variante.
- [ ] No mostrar controles de creación de cafés ni carga de imágenes.
- [ ] Verificar guardado, error, conflicto y reflejo en la tienda mediante navegador y API, conservando comportamiento previo de cupones y recompra.

## Comments

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.


Validación: typecheck correcto; pruebas focalizadas HTTP con PostgreSQL real y recorrido Playwright del ticket correctos. Revisión global pendiente del ticket 07.
