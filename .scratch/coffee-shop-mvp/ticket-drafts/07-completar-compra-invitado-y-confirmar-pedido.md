# 07: Completar una compra de invitado y confirmar el pedido

**What to build:** Una persona puede pasar del carrito a una compra como invitado, completar o autocompletar un formulario validado y recibir una confirmación de pago simulado aprobado con un resumen que permanece después de vaciar el carrito.

**Blocked by:** 05: Aplicar BRUMA15 y revisar el total.

**Estado:** borrador pendiente de aprobación del desglose.

**Especificación:** Bruma Café — especificación del MVP, publicada y aprobada.

**Historias de usuario cubiertas:** 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 56, 57, 58, 59, 65.

## Contexto y condiciones de esta entrega

- El alcance es una web de portafolio de Bruma Café: React, TypeScript y Vite, navegación con React Router, traducciones con react-i18next y datos y pagos de demostración en el cliente. No se añaden backend, cuentas ni servicios reales.
- Cada interfaz incorporada por este ticket debe estar completa en portugués de Brasil, español latinoamericano e inglés estadounidense; todos los importes conservan USD. El idioma recordado tiene prioridad sobre el navegador, con inglés como alternativa inicial si no hay coincidencia.
- La dirección visual es oscura, con verde suave, fotografía protagonista e identidad propia. El diseño, la operación por teclado y los mensajes accesibles forman parte de esta entrega.
- Se prueba el comportamiento observable desde la aplicación completa en el navegador, con casos independientes y reproducibles. Se comprueban tipos y compilación y se revisan visualmente los cambios a 320, 768, 1024 y 1440 píxeles.
- La especificación aprobada «Bruma Café — especificación del MVP» y el glosario del repositorio son las fuentes del alcance y de los términos. Este ticket es una parte del recorrido; no exige implementar por adelantado funcionalidades asignadas a tickets posteriores.

## Acceptance criteria

- [ ] La compra como invitado muestra los productos, variantes, cantidades, subtotal, cupón si existe, envío y total coherentes con el carrito.
- [ ] El formulario solicita nombre, correo, dirección, ciudad, código postal y país; valida campos obligatorios y formato del correo sin afirmar verificar direcciones reales.
- [ ] Los errores aparecen asociados a sus campos, se comunican de forma accesible y permiten corregir valores sin perder los demás datos.
- [ ] El botón «Llenar demo», traducido según el idioma activo, completa los campos con datos ficticios válidos; los valores se pueden editar y siguen sujetos a las mismas validaciones.
- [ ] Un carrito vacío o un formulario inválido impiden crear un pedido aprobado. El acceso con carrito vacío ofrece una salida al catálogo.
- [ ] La acción de compra se identifica como pago simulado y no solicita tarjeta ni llama a una pasarela de cobro.
- [ ] El resultado aprobado se puede completar de forma reproducible; el procesamiento informa del progreso y evita envíos duplicados.
- [ ] La aprobación crea una sola confirmación con número de pedido y resumen de variantes, cantidades e importes.
- [ ] Antes de vaciar carrito y cupón se conserva el resumen del pedido; la pantalla de confirmación no lo recalcula a partir del carrito vacío.
- [ ] Tras la aprobación, el carrito y el cupón quedan vacíos en el estado de la aplicación. Si la persistencia del ticket 06 ya está incorporada, los cambios siguen la misma vía de actualización y no reaparecen al recargar.
- [ ] La confirmación permite volver al catálogo. Un acceso sin pedido disponible presenta una salida útil, sin inventar un pedido.
- [ ] Formulario, validaciones, autocompletado, procesamiento y confirmación están completos en los tres idiomas y son operables con teclado.
- [ ] Las pruebas de navegador cubren errores de campos, correo inválido, autocompletado editable, intento con carrito vacío, pago aprobado y prevención de duplicados.
- [ ] Una prueba completa desde el carrito aplica BRUMA15, compra como invitado y comprueba que el número y los importes de confirmación se mantienen visibles después de vaciar carrito y cupón.
- [ ] El rechazo y su selector de resultado se incorporan en el ticket 08 sobre este flujo de aprobación ya verificable.
- [ ] La revisión visual incluye formulario, errores, procesamiento y confirmación en los cuatro anchos; pasan tipos y compilación.
