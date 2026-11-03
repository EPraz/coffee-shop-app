# 03: Encontrar cafés con búsqueda, filtro y orden

**What to build:** Una persona puede acotar el catálogo por nombre u origen y nivel de tueste, ordenar sus resultados por precio comparable y recuperarse de una búsqueda sin coincidencias.

**Blocked by:** 01: Descubrir Bruma Café en tres idiomas.

**Status:** resolved

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 7, 8, 9, 10, 11.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [x] La búsqueda encuentra cafés por nombre u origen dentro del catálogo de cinco productos.
- [x] El filtro permite seleccionar niveles de tueste de forma comprensible y muestra únicamente los cafés correspondientes.
- [x] Búsqueda y filtro se pueden combinar sin que uno borre el otro; el orden se aplica al resultado combinado.
- [x] Se puede ordenar por precio ascendente y descendente usando siempre la bolsa de 250 g, independientemente de selecciones hechas en el detalle.
- [x] El estado sin resultados explica lo ocurrido y permite limpiar la búsqueda y el filtro para recuperar el catálogo.
- [x] El café agotado sigue siendo consultable y se distingue de un resultado inexistente; el filtro no modifica la disponibilidad de los productos.
- [x] Los controles, sus opciones y el estado vacío se presentan en los tres idiomas y se operan con teclado.
- [x] Las pruebas de navegador verifican búsqueda por nombre y origen, filtro por tueste, combinación, orden ascendente y descendente y recuperación del resultado vacío.
- [x] Las pruebas usan el catálogo y los precios controlados de demostración, sin afirmar el orden a partir del formato textual de una moneda.
- [x] El comportamiento se integra con la navegación del catálogo ya disponible; no depende de que el detalle o el carrito estén terminados.
- [x] La revisión visual cubre controles y resultados en los cuatro anchos acordados y textos largos; pasan tipos y compilación.

## Comments

Implementación completada y verificada. Los criterios se comprobaron con el comportamiento implementado, pruebas de navegador y revisión de código en los ejes Standards y Spec. La suite final tiene 32 pruebas aprobadas, incluidos tres casos de regresión surgidos de la revisión. La revisión final no deja hallazgos abiertos.
