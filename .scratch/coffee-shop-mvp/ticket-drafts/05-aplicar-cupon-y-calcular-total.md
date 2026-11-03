# 05: Aplicar BRUMA15 y revisar el total

**What to build:** Una persona puede aplicar el cupón de demostración, comprender su descuento y ver totales consistentes al modificar el carrito.

**Blocked by:** 04: Preparar el carrito con variantes y cantidades.

**Estado:** borrador pendiente de aprobación del desglose.

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 28, 29, 30, 31, 32, 33.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [ ] El carrito permite introducir BRUMA15 y muestra que el cupón válido ha quedado aplicado.
- [ ] El descuento es el 15 % del subtotal de productos, redondeado una sola vez al centavo más cercano; no descuenta el envío.
- [ ] Se presentan por separado subtotal, descuento, envío de USD 5 y total; el total es subtotal menos descuento más envío.
- [ ] Aplicar repetidamente el mismo cupón no acumula descuentos ni crea importes negativos.
- [ ] Un cupón inválido muestra un mensaje comprensible, conserva las líneas y no modifica los importes ni elimina un descuento válido ya aplicado.
- [ ] Aumentar, reducir o eliminar líneas recalcula el descuento y el total sobre el subtotal actual, sin alterar las cantidades seleccionadas.
- [ ] El carrito vacío conserva un estado coherente y no permite pagar ni tratar el envío como importe pagadero.
- [ ] Los cálculos usan centavos y datos de las variantes; el formato localizado no se convierte en una fuente de valores numéricos.
- [ ] El cupón, sus estados y el desglose se entienden en los tres idiomas; cambiar de idioma conserva descuento y valores en USD.
- [ ] Las pruebas de navegador verifican cupón válido, inválido, reaplicación, recálculo tras edición del carrito, redondeo y exclusión del envío del descuento.
- [ ] Las pruebas comprueban resultados visibles con precios controlados y cubren un caso que requiera redondeo al centavo.
- [ ] La revisión visual y por teclado cubre entrada del cupón, mensajes y resumen en los cuatro anchos; pasan tipos y compilación.
