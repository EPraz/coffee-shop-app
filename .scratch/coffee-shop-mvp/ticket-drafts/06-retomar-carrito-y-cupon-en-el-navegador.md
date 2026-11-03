# 06: Retomar el carrito y el cupón al volver

**What to build:** Una persona puede recargar o volver a abrir la tienda en el mismo navegador y retomar las variantes, cantidades, cupón e idioma que había elegido.

**Blocked by:** 05: Aplicar BRUMA15 y revisar el total.

**Estado:** borrador pendiente de aprobación del desglose.

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 34, 35.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [ ] Recargar conserva las líneas del carrito, sus variantes y sus cantidades, y restaura el cupón válido aplicado.
- [ ] Volver a abrir la aplicación en el mismo navegador con el almacenamiento conservado restaura la compra y el idioma elegido.
- [ ] Una elección de idioma recordada sigue teniendo prioridad sobre el idioma del navegador; se conserva el comportamiento inicial y la alternativa inglesa del ticket 01.
- [ ] Restaurar y después cambiar de idioma no duplica productos, no modifica cantidades y no cambia el valor de los importes en USD.
- [ ] Tras restaurar, los precios, la disponibilidad y los cálculos se obtienen del catálogo vigente y las reglas de la aplicación; los textos traducidos no se usan como identificadores.
- [ ] Una compra restaurada no permite añadir o conservar un producto desconocido, agotado ni una cantidad fuera del intervalo válido como contenido pagadero.
- [ ] Una entrada ilegible de almacenamiento no bloquea la aplicación y permite continuar con una compra válida o un carrito vacío recuperable.
- [ ] Editar o eliminar líneas y volver a recargar refleja los cambios; vaciar el carrito no hace reaparecer productos antiguos en la siguiente apertura.
- [ ] El formulario del cliente y un historial de pedidos no se añaden a la persistencia entre visitas.
- [ ] Las pruebas usan recargas y reaperturas reales del navegador para comprobar restauración, edición, cambio de idioma y eliminación.
- [ ] Los casos de recuperación usan un entorno de navegador aislado; las aserciones se hacen sobre lo que la persona ve y puede comprar.
- [ ] La revisión de la experiencia restaurada cubre los cuatro anchos y los tres idiomas; pasan tipos y compilación.
