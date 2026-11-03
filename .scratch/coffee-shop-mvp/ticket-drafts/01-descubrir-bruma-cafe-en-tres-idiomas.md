# 01: Descubrir Bruma Café en tres idiomas

**What to build:** Una persona puede abrir una portada propia de Bruma Café, pasar a un catálogo real de cinco cafés y recorrer ambas pantallas en los tres idiomas desde móvil o escritorio. Esta primera entrega deja una aplicación ejecutable y verificable, no solo configuración.

**Blocked by:** None (can start immediately).

**Estado:** borrador pendiente de aprobación del desglose.

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 1, 2, 3, 4, 5, 6, 27, 36, 37, 38, 39, 40, 41, 60, 61, 62, 63, 64, 66.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [ ] La aplicación puede arrancarse y compilarse con la base aprobada; hay navegación real entre inicio y catálogo, incluido volver atrás desde el navegador.
- [ ] La portada presenta Bruma Café, su propuesta y una acción visible hacia el catálogo, con composición móvil y de escritorio siguiendo la referencia visual.
- [ ] El catálogo contiene exactamente cinco cafés: dos de Panamá, uno de Brasil, uno de Colombia y uno de Etiopía; cada uno tiene identidad estable, nombre, imagen, origen, notas de sabor, tueste y precio ficticio de 250 g en USD.
- [ ] Se definen precios ficticios por peso para 250 g y 500 g, junto con la preparación en grano o molido sin recargo. La identidad de los cafés y variantes es independiente de los textos traducidos.
- [ ] Cuatro cafés figuran como disponibles y uno como agotado mediante texto. La selección de imágenes es coherente y tiene alternativas comprensibles cuando un recurso no esté disponible.
- [ ] El selector visible permite recorrer portada y catálogo en portugués de Brasil, español latinoamericano e inglés estadounidense, sin claves de traducción expuestas.
- [ ] En una primera visita se usa el idioma compatible del navegador o inglés como alternativa. La elección explícita se recuerda al recargar o volver a abrir y prevalece sobre el idioma del navegador.
- [ ] Los precios cambian de formato con el idioma sin cambiar su valor ni la moneda USD. La condición de demostración se comunica con claridad.
- [ ] Las dos pantallas funcionan con teclado, foco visible, controles con nombre accesible, jerarquía de encabezados y contraste suficiente.
- [ ] Hay pruebas de navegador que recorren inicio y catálogo, verifican cantidad y orígenes de los cafés y comprueban selección, alternativa y persistencia del idioma.
- [ ] La revisión visual cubre ambos tamaños de composición y los cuatro anchos acordados, incluyendo textos de los tres idiomas; tipos y compilación pasan.
