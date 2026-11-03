# 04: Preparar el carrito con variantes y cantidades

**What to build:** Una persona puede añadir la variante elegida desde el detalle, revisar el carrito, editar cantidades o eliminar líneas y entender el subtotal y el envío antes de continuar.

**Blocked by:** 02: Consultar un café y elegir su variante.

**Status:** resolved

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 35.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [x] Desde el detalle de un café disponible se añade la combinación de café, peso y preparación seleccionada y se comunica el resultado mediante un mensaje accesible.
- [x] Añadir la misma combinación aumenta su cantidad en una sola línea; elegir otra combinación crea otra línea, incluso si corresponde al mismo café.
- [x] Cada línea identifica café, peso, preparación, cantidad, precio e importe. Las imágenes y etiquetas corresponden al producto seleccionado.
- [x] Se pueden aumentar y reducir cantidades entre una y nueve bolsas por variante, y eliminar una línea mediante una acción explícita.
- [x] El límite de nueve también se aplica al añadir repetidamente desde el detalle. Un intento de superarlo no altera las cantidades válidas y ofrece información comprensible.
- [x] El café agotado no puede añadirse por ninguno de los controles disponibles.
- [x] El subtotal suma los precios por sus cantidades; se muestra el envío fijo de USD 5 y el total de la compra con productos, usando cálculos exactos en centavos.
- [x] Un carrito vacío muestra una invitación a volver al catálogo, no presenta envío como cantidad pagadera y no permite iniciar una compra.
- [x] Cambiar el idioma conserva las líneas y cantidades; los nombres y formatos se actualizan sin duplicar las variantes ni convertir USD.
- [x] Las acciones y mensajes del carrito están completos en los tres idiomas y se pueden operar con teclado.
- [x] Las pruebas de navegador recorren detalle → añadir → carrito; verifican agrupación, separación de variantes, precios por peso, cantidad, límite desde ambos puntos de entrada, eliminación y estado vacío.
- [x] La persistencia del carrito entre visitas y el cupón se incorporan en sus tickets específicos; esta entrega no los exige por adelantado.
- [x] La revisión visual cubre carrito con varias líneas y estado vacío en los cuatro anchos; pasan tipos y compilación.

## Comments

Implementación completada y verificada. Los criterios se comprobaron con el comportamiento implementado, pruebas de navegador y revisión de código en los ejes Standards y Spec. La suite final tiene 32 pruebas aprobadas, incluidos tres casos de regresión surgidos de la revisión. La revisión final no deja hallazgos abiertos.
