# 08: Simular un rechazo y reintentar la compra

**What to build:** Una persona que evalúa el portafolio puede elegir un pago rechazado, comprobar que se conserva la compra, corregir o reutilizar sus datos y reintentar con resultado aprobado.

**Blocked by:** 07: Completar una compra de invitado y confirmar el pedido.

**Status:** ready-for-agent

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 50, 53, 54, 55.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [ ] Un control de demostración visible y claramente identificado permite elegir resultado aprobado o rechazado sin depender del azar ni de datos de tarjeta.
- [ ] El modo rechazado sigue validando carrito y formulario antes de procesar; comunica progreso y mantiene la prevención de envíos duplicados.
- [ ] Un rechazo muestra un mensaje traducido y accesible, sin crear un pedido confirmado ni navegar a una confirmación de éxito.
- [ ] El rechazo conserva exactamente las líneas, cantidades, cupón y campos introducidos o rellenados por «Llenar demo».
- [ ] Después del rechazo la persona puede editar sus datos y reintentar, o cambiar el resultado de demostración a aprobado.
- [ ] El reintento aprobado crea un único pedido con los importes actuales, vacía carrito y cupón y mantiene el resumen independiente en la confirmación.
- [ ] El control, los mensajes, la recuperación y la confirmación funcionan en los tres idiomas; cambiar de idioma no reinicia el carrito.
- [ ] Las pruebas de navegador reproducen rechazo → conservación de datos → reintento aprobado y verifican que no hay confirmación ni vaciado anticipados.
- [ ] Las pruebas cubren un rechazo con cupón aplicado y más de una variante, junto con intentos repetidos durante el procesamiento.
- [ ] El rechazo no incorpora cobros, backend ni un servicio externo de simulación: usa el comportamiento de demostración acordado.
- [ ] La revisión visual y por teclado cubre el control de simulación, mensaje de error y recuperación en los cuatro anchos; pasan tipos y compilación.
