# 02: Consultar un café y elegir su variante

**What to build:** Una persona puede abrir el detalle de cualquier café, leer su información y seleccionar peso y preparación viendo el precio correspondiente. También puede consultar el café agotado y recuperarse de un enlace de producto inválido.

**Blocked by:** 01: Descubrir Bruma Café en tres idiomas.

**Estado:** borrador pendiente de aprobación del desglose.

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 12, 13, 14, 15, 16, 65.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [ ] Cada café del catálogo abre su detalle mediante navegación real. El historial del navegador permite regresar al catálogo.
- [ ] El detalle muestra fotografía, nombre, origen, notas de sabor, nivel de tueste y disponibilidad, con los textos completos en los tres idiomas.
- [ ] Se puede seleccionar 250 g o 500 g y elegir grano o molido; las cuatro combinaciones se representan de forma inequívoca.
- [ ] El precio visible se actualiza según el peso elegido y no cambia al alternar entre grano y molido. Siempre se conserva USD.
- [ ] Las variantes se identifican con los datos estables de café, peso y preparación establecidos en el catálogo, no con sus etiquetas traducidas.
- [ ] El café agotado conserva su detalle consultable y comunica indisponibilidad mediante texto. No existe una acción utilizable que lo añada al carrito.
- [ ] Un enlace de producto inexistente muestra una salida útil hacia el catálogo, sin bloquear la aplicación ni presentar una pantalla vacía.
- [ ] La selección y la navegación se pueden operar con teclado; disponibilidad, precio y controles tienen nombres y estados comprensibles.
- [ ] Las pruebas de navegador verifican acceso desde el catálogo, cambios de peso y preparación, precios, agotado y enlace inválido.
- [ ] La revisión visual incluye imágenes, textos largos y controles de variante en los cuatro anchos acordados; pasan tipos y compilación.
- [ ] La incorporación del carrito se reserva al ticket 04; esta entrega no deja acciones de compra aparentemente funcionales que no hagan nada.
