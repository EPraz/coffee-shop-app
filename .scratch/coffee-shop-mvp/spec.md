# Bruma Café — especificación del MVP

Status: ready-for-agent

Alcance de producto y estrategia de pruebas aprobados expresamente por el usuario.

## Problem Statement

Una persona que explora un portafolio necesita poder evaluar una experiencia de comercio electrónico de principio a fin, desde descubrir los productos hasta completar una compra de demostración, en móvil y escritorio y en un idioma que comprenda. Una colección de pantallas estáticas no permite evaluar variantes, cálculos, validaciones, persistencia ni recuperación ante un rechazo.

El proyecto debe demostrar una interfaz cuidada para vender bolsas de café, con identidad propia, un catálogo manejable y comportamiento consistente, sin depender de un negocio, inventario, cobros o envíos reales.

## Solution

Construir Bruma Café como una web adaptable, con prioridad móvil, inspirada en la referencia visual aportada: fondos oscuros, acentos verde suave, fotografías protagonistas y tipografía grande. La composición de escritorio se adaptará al espacio disponible y conservará la identidad de marca.

El recorrido completo será inicio → catálogo → detalle del café → carrito → finalizar compra → confirmación. El catálogo tendrá cinco cafés: dos de Panamá, uno de Brasil, uno de Colombia y uno de Etiopía. Cuatro estarán disponibles y uno agotado. Cada café ofrecerá bolsas de 250 g y 500 g, en grano o molido.

La compra será como cliente invitado y estará identificada como demostración. Permitirá rellenar datos ficticios automáticamente, validar el formulario y probar resultados de pago aprobado y rechazado. Habrá traducciones completas en portugués de Brasil, español latinoamericano e inglés estadounidense, conservando USD en todos los idiomas.

## User Stories

1. Como visitante, quiero reconocer Bruma Café y su propuesta visual desde el inicio, para entender qué vende la tienda.
2. Como visitante, quiero ver claramente que se trata de una demostración de portafolio, para comprender que no se procesarán compras ni envíos reales.
3. Como visitante, quiero pasar de la portada al catálogo mediante una acción visible, para comenzar a explorar los cafés.
4. Como visitante, quiero recorrer la tienda en móvil y escritorio, para comprar desde distintos tamaños de pantalla.
5. Como visitante, quiero encontrar cinco cafés: dos de Panamá, uno de Brasil, uno de Colombia y uno de Etiopía, para explorar una selección pequeña y variada.
6. Como visitante, quiero consultar foto, nombre, origen, notas de sabor, nivel de tueste y precio base de cada café, para comparar sus características.
7. Como visitante, quiero buscar cafés por nombre u origen, para encontrar los que me interesan.
8. Como visitante, quiero filtrar el catálogo por nivel de tueste, para acotar la selección según mis preferencias.
9. Como visitante, quiero combinar búsqueda y filtro, para refinar los resultados sin perder mi consulta.
10. Como visitante, quiero ordenar por precio ascendente o descendente usando la bolsa de 250 g como referencia, para comparar precios equivalentes.
11. Como visitante, quiero entender cuándo no hay resultados y poder limpiar la búsqueda y los filtros, para continuar explorando.
12. Como visitante, quiero abrir el detalle de cualquier café, incluido el agotado, para conocer su información completa.
13. Como visitante, quiero seleccionar una bolsa de 250 g o 500 g, para elegir la cantidad de café que necesito.
14. Como visitante, quiero elegir café en grano o molido, para adaptar mi compra a mi preparación habitual.
15. Como visitante, quiero ver el precio correspondiente al peso seleccionado, sin recargo por elegir grano o molido, para conocer el importe de mi variante antes de añadirla.
16. Como visitante, quiero identificar el café agotado mediante texto y controles deshabilitados, para comprender su disponibilidad sin depender solo del color.
17. Como visitante, quiero añadir al carrito la variante seleccionada de un café disponible, para preparar mi compra.
18. Como visitante, quiero recibir una confirmación accesible al añadir una bolsa, para saber que la acción se completó.
19. Como cliente invitado, quiero ver en cada línea del carrito el café, peso, preparación, cantidad e importes, para revisar exactamente qué estoy comprando.
20. Como cliente invitado, quiero que añadir de nuevo la misma combinación aumente su cantidad en una sola línea, para evitar líneas duplicadas.
21. Como cliente invitado, quiero que distintas combinaciones del mismo café permanezcan en líneas separadas, para gestionar cada variante de forma independiente.
22. Como cliente invitado, quiero aumentar y reducir la cantidad de una línea, para ajustar mi compra.
23. Como cliente invitado, quiero recibir un aviso al intentar superar nueve bolsas de una variante, para entender el límite antes de seguir.
24. Como cliente invitado, quiero eliminar una línea del carrito, para retirar una variante que ya no quiero.
25. Como cliente invitado, quiero ver un estado de carrito vacío con acceso al catálogo, para saber cómo continuar.
26. Como cliente invitado, quiero ver un subtotal que incluya el precio y la cantidad de todas las líneas, para comprobar el coste de los productos.
27. Como cliente invitado, quiero ver todos los precios e importes en USD, para compararlos con una moneda consistente.
28. Como cliente invitado, quiero introducir el cupón BRUMA15, para obtener el descuento de demostración.
29. Como cliente invitado, quiero ver un descuento del 15 % aplicado únicamente al subtotal de productos, para entender el beneficio del cupón.
30. Como cliente invitado, quiero que aplicar repetidamente el cupón no acumule descuentos, para mantener un cálculo coherente.
31. Como cliente invitado, quiero recibir un mensaje comprensible si el cupón no es válido, para corregirlo sin perder el carrito.
32. Como cliente invitado, quiero que el descuento y los totales se recalculen al cambiar cantidades o eliminar líneas, para ver siempre el importe actual.
33. Como cliente invitado, quiero ver por separado subtotal, descuento, envío de USD 5 y total, para entender cómo se calcula la compra.
34. Como cliente invitado, quiero conservar carrito y cupón al recargar o volver a abrir la tienda en el mismo navegador, para retomar mi compra.
35. Como cliente invitado, quiero mantener las variantes y sus cantidades al cambiar de idioma, para explorar la tienda en otro idioma sin empezar de nuevo.
36. Como visitante, quiero usar la tienda en portugués de Brasil, español latinoamericano o inglés estadounidense, para entender su contenido.
37. Como visitante, quiero que la primera visita utilice un idioma compatible con mi navegador y use inglés si no hay coincidencia, para recibir una experiencia inicial comprensible.
38. Como visitante, quiero encontrar un selector de idioma visible, para cambiarlo cuando lo necesite.
39. Como visitante, quiero que mi elección explícita de idioma se recuerde y tenga prioridad en visitas posteriores, para mantener mi preferencia.
40. Como visitante, quiero ver traducidos navegación, productos, formularios, errores, estados vacíos y controles de demostración, para completar todo el recorrido en el idioma elegido.
41. Como visitante, quiero ver los importes con formato apropiado al idioma conservando USD y su valor, para interpretar los precios sin conversiones inesperadas.
42. Como cliente invitado, quiero finalizar la compra sin crear una cuenta, para probar el recorrido de compra sin registro.
43. Como cliente invitado, quiero introducir nombre, correo, dirección, ciudad, código postal y país, para completar los datos de la compra de demostración.
44. Como cliente invitado, quiero recibir validaciones de campos obligatorios y formato de correo, para corregir los datos antes de enviar el formulario.
45. Como cliente invitado, quiero ver los errores junto a sus campos y corregirlos sin perder lo escrito, para resolver el problema con claridad.
46. Como cliente invitado, quiero pulsar «Llenar demo» y completar automáticamente los campos con datos ficticios, para probar la compra rápidamente.
47. Como cliente invitado, quiero editar los datos introducidos por «Llenar demo», para probar las validaciones y distintos valores.
48. Como cliente invitado, quiero revisar en la compra el mismo contenido e importes que en el carrito, para confirmar que se mantiene mi selección.
49. Como cliente invitado, quiero que una compra con carrito vacío o formulario inválido no pueda aprobarse, para evitar confirmaciones incoherentes.
50. Como visitante de portafolio, quiero elegir explícitamente un resultado de pago aprobado o rechazado, para probar ambos estados de forma reproducible.
51. Como cliente invitado, quiero completar un pago identificado como simulado sin introducir tarjeta, para recorrer la demostración sin realizar un cobro.
52. Como cliente invitado, quiero ver el estado de procesamiento y evitar envíos duplicados mientras está en curso, para comprender que la acción está en progreso.
53. Como cliente invitado, quiero recibir un error de pago rechazado sin que se cree una confirmación, para entender el resultado de la simulación.
54. Como cliente invitado, quiero conservar carrito, cupón y formulario tras el rechazo, para reintentar sin repetir el trabajo.
55. Como cliente invitado, quiero cambiar el resultado simulado y reintentar después de un rechazo, para comprobar la recuperación del flujo.
56. Como cliente invitado, quiero ver una confirmación con número de pedido, variantes, cantidades e importes tras la aprobación, para revisar el resultado de la compra.
57. Como cliente invitado, quiero que la aprobación vacíe el carrito y el cupón, para distinguir una compra completada de otra pendiente.
58. Como cliente invitado, quiero que la confirmación mantenga el resumen del pedido aunque el carrito ya esté vacío, para seguir consultando lo que acabo de comprar.
59. Como cliente invitado, quiero volver al catálogo desde la confirmación, para seguir explorando la tienda.
60. Como visitante, quiero navegar por las pantallas y volver atrás con los controles habituales del navegador, para orientarme durante el recorrido.
61. Como visitante que usa teclado, quiero operar navegación, selector de idioma, filtros, variantes, carrito y formulario, para completar el mismo recorrido sin ratón.
62. Como visitante que usa tecnologías de asistencia, quiero encontrar encabezados, nombres de controles, errores y mensajes de estado comprensibles, para entender y operar la tienda.
63. Como visitante, quiero leer los textos y reconocer los controles con contraste suficiente y foco visible, para usar la interfaz con claridad.
64. Como visitante, quiero consultar la tienda desde pantallas estrechas sin desbordamientos ni controles inaccesibles, para completar la compra desde el móvil.
65. Como visitante, quiero recibir una salida útil ante un enlace de producto inexistente o una confirmación sin pedido disponible, para continuar navegando en lugar de encontrar una pantalla vacía.
66. Como visitante, quiero ver imágenes y contenido con una presentación coherente y estados de carga o fallo comprensibles cuando correspondan, para mantener la orientación mientras se presentan los recursos.

## Implementation Decisions

### Alcance y plataforma

- Aplicación de frontend con React, TypeScript y Vite; React Router para navegación y react-i18next para internacionalización.
- Datos de catálogo y comportamiento de pago de demostración controlados en el cliente. Esta versión no requiere contratos de API, migraciones ni base de datos.
- El recorrido incluye seis vistas: inicio, catálogo, detalle de café, carrito, compra y confirmación.
- El vocabulario de producto seguirá el glosario: bolsa de café, variante, línea del carrito, subtotal, cupón, cliente invitado y pedido.
- Las decisiones siguientes concretan el comportamiento necesario para implementar el alcance aprobado; no convierten la demo en una tienda operativa.

### Organización de responsabilidades

- Presentación y navegación: estructura común, identidad de Bruma Café y composición adaptable.
- Catálogo: información editorial, búsqueda, filtro por tueste, orden por precio, disponibilidad y selección de variantes.
- Carrito e importes: identidad de líneas, cantidades, cupón, cálculo del subtotal, descuento, envío y total.
- Compra de demostración: datos del cliente invitado, validación, autocompletado, resultado simulado y confirmación.
- Internacionalización: traducciones, selección y recuerdo de idioma, y presentación de importes.
- Persistencia del navegador: restauración de carrito, cupón y preferencia de idioma.
- Estas responsabilidades pueden organizarse en módulos internos sin que sus interfaces se conviertan en nuevos puntos públicos de prueba.

### Catálogo e identidad

- Cinco cafés en total, con la distribución de orígenes aprobada. La elección de Etiopía y del total de cinco queda incluida en la aprobación final del MVP.
- Cada café tendrá una identidad estable, nombre, fotografía, origen, notas de sabor, nivel de tueste y precios ficticios por peso.
- Cada café ofrecerá cuatro variantes: combinación de dos pesos y dos preparaciones. La preparación no modifica el precio.
- Un café completo figurará como agotado en todas sus variantes. Se podrá consultar su detalle, pero no añadirlo al carrito.
- El catálogo permitirá búsqueda por nombre u origen, filtro por nivel de tueste y orden ascendente o descendente por el precio de 250 g. El orden no variará según la variante elegida en un detalle.
- Búsqueda, filtro y orden se podrán combinar. Un resultado vacío ofrecerá una acción para recuperar el catálogo.
- Los nombres, textos en los tres idiomas, precios ficticios, identidad tipográfica y selección de imágenes se desarrollarán respetando la distribución de orígenes y la referencia visual aprobadas.

### Carrito y cálculos

- La identidad de una línea se determina por café, peso y preparación; nunca por su nombre traducido.
- Añadir una variante ya presente aumenta su cantidad. Añadir otra combinación crea otra línea.
- Cada línea tendrá entre una y nueve bolsas. El límite también se aplicará al añadir repetidamente desde el detalle. Eliminar una línea será una acción disponible y explícita.
- El subtotal es la suma de los precios de las variantes multiplicados por sus cantidades.
- El único cupón de esta versión es BRUMA15. Su descuento es el 15 % del subtotal de productos y se aplica una sola vez; no se acumula al volver a introducirlo.
- Un cupón inválido mostrará un mensaje y no alterará los importes. Modificar el carrito recalculará subtotal, descuento y total.
- El envío de una compra con productos cuesta USD 5. El carrito vacío no puede convertirse en un pedido ni mostrar un importe de envío como cantidad pagadera.
- El total será subtotal menos descuento más envío. Esta demostración no calcula impuestos reales ni se conecta con transportistas.
- Los cálculos utilizarán cantidades monetarias exactas en centavos. El descuento se redondeará una sola vez al centavo más cercano sobre el subtotal; después se calculará el total. El formato visual no intervendrá en las operaciones.
- La información almacenada para restaurar el carrito identificará productos y variantes, no sus textos traducidos. Los precios y la disponibilidad procederán del catálogo vigente de demostración.
- La persistencia recordará carrito, cupón e idioma en el mismo navegador; cambiar de idioma conservará la compra. Una entrada de almacenamiento ilegible no debe bloquear la aplicación.

### Idiomas

- Los idiomas serán portugués de Brasil, español latinoamericano e inglés estadounidense.
- Una elección explícita y recordada tendrá prioridad. En la primera visita se buscará un idioma soportado entre las preferencias del navegador; se usará inglés si no existe coincidencia.
- Habrá un selector visible y operable con teclado. La preferencia se conservará al recargar y volver a abrir la web.
- Se traducirán navegación, contenido de producto, variantes, formulario, validaciones, estados vacíos, agotado, cupón, pago, confirmación y controles de demostración.
- Los importes se formatearán para el idioma activo indicando la moneda USD; cambiar de idioma no convierte la moneda ni modifica el valor del precio.
- Las identidades de cafés, variantes y pedidos serán independientes del idioma. Los cambios de idioma actualizarán el contenido presentado sin reiniciar el carrito.

### Formulario y simulación de compra

- La compra como cliente invitado solicitará nombre, correo, dirección, ciudad, código postal y país.
- El formulario validará los campos obligatorios y el formato del correo, con mensajes localizados asociados a los campos correspondientes. La validación de demostración no promete verificar direcciones reales.
- El botón «Llenar demo», traducido según el idioma activo, completará automáticamente los campos con datos ficticios. Los campos seguirán siendo editables y sujetos a las mismas validaciones.
- Los datos del formulario no forman parte del compromiso de persistencia entre visitas; sí se conservarán durante el rechazo y el reintento del mismo recorrido.
- El cliente verá un resumen de variantes, cantidades e importes consistente con el carrito.
- Un control de demostración permitirá elegir de forma reproducible aprobación o rechazo. No se solicitará tarjeta ni se realizará un cobro.
- Solo podrá iniciarse una compra con carrito no vacío y formulario válido. Mientras se procesa se comunicará el estado y se evitarán envíos duplicados.
- En un rechazo no se creará un pedido confirmado ni se vaciará el carrito: se conservarán las líneas, el cupón y los datos del formulario para reintentar.
- En una aprobación se creará un pedido de demostración con número y resumen independiente del carrito. Se mostrarán sus variantes, cantidades e importes.
- Solo después de preservar ese resumen se vaciarán carrito y cupón. La confirmación no recalculará el pedido a partir del carrito ya vacío.
- La confirmación permitirá volver al catálogo. Un acceso sin pedido disponible tendrá una salida útil, sin inventar una compra.
- El resumen de confirmación pertenece al resultado de la compra actual. Un historial de pedidos o su conservación entre visitas quedan fuera del alcance aprobado.

### Calidad visual, navegación y accesibilidad

- Composición móvil y de escritorio coherentes con la referencia, con identidad propia de Bruma Café.
- Navegación real entre vistas, enlaces de producto y estados de recuperación para rutas sin contenido válido.
- Diseño adaptable verificado a 320, 768, 1024 y 1440 píxeles, sin desbordamientos que impidan utilizar la interfaz.
- Controles semánticos con etiquetas, navegación por teclado, foco visible, jerarquía de encabezados, mensajes de error y anuncios de estado comprensibles.
- Contraste suficiente y disponibilidad, validación y resultado de pago comunicados mediante texto además de color.
- Estados de carrito vacío, catálogo sin coincidencias, producto agotado, formulario inválido, pago en progreso, rechazo y confirmación.
- Para las imágenes o recursos que carguen de forma asíncrona se contemplará una presentación estable y una alternativa comprensible ante un fallo.

## Testing Decisions

### Estrategia confirmada

El punto de entrada funcional acordado es uno: la aplicación completa en un navegador, operada como lo haría una persona. Las pruebas atravesarán la presentación, navegación, estado, cálculos y persistencia por su comportamiento observable.

Un único punto de entrada no significa una sola prueba larga. Se dividirán los escenarios en casos independientes y reproducibles, manteniendo la misma frontera pública. Los módulos internos podrán evolucionar sin obligar a reescribir las pruebas por cambios de estructura.

No hay código de aplicación, infraestructura de pruebas ni ejemplos previos que reutilizar en este repositorio. Esta implementación establecerá el primer patrón. La herramienta concreta del navegador podrá elegirse al preparar la implementación; el contrato de prueba es el recorrido observable.

### Qué hace que una prueba sea buena

- Reproduce una acción o situación real y verifica el resultado visible: contenido, controles, navegación, mensajes e importes.
- Interactúa mediante controles con nombre accesible y evita depender de clases de estilo, estructura interna, estado de componentes o llamadas a funciones privadas.
- Usa datos y resultados de pago de demostración reproducibles. Aísla las preferencias y el almacenamiento del navegador entre casos para evitar dependencias entre pruebas.
- Distingue un defecto real de una modificación del diseño: una prueba funcional no fija píxeles ni la composición exacta del DOM.
- Prueba las reglas y los límites que podrían producir una compra incorrecta; no crea pruebas que repitan la implementación.
- Comprueba restauración y persistencia mediante recargas y nuevas aperturas reales del navegador.

### Responsabilidades cubiertas a través del navegador

1. Catálogo y detalle: cinco cafés, orígenes acordados, búsqueda por nombre u origen, filtro, combinación de controles, orden por 250 g, resultado vacío y consulta del agotado.
2. Variantes y carrito: cuatro combinaciones por café, precio por peso, preparación sin recargo, misma variante agrupada, variantes distintas separadas, incremento, reducción, eliminación y límite de nueve.
3. Importes y cupón: subtotal por cantidades, 15 % solo sobre productos, redondeo en centavos, envío de USD 5, cupón inválido, reaplicación sin acumulación y recálculo tras editar el carrito.
4. Persistencia e idiomas: restauración del carrito y cupón, preferencia explícita, idioma inicial compatible, alternativa inglesa y cambio entre los tres idiomas sin alterar productos, cantidades ni valores en USD.
5. Compra: campos obligatorios, correo inválido, errores corregibles, «Llenar demo», edición de sus valores y prevención de compra con carrito vacío o formulario inválido.
6. Simulación: procesamiento sin duplicados, rechazo que conserva compra y formulario, reintento aprobado y confirmación con número y resumen independiente del carrito vaciado.
7. Navegación y recuperación: volver al catálogo, historial del navegador y accesos sin un producto o pedido válido.
8. Accesibilidad observable: operación por teclado, nombres de controles, foco y comunicación de errores y estados.

### Verificación complementaria

- Revisar visualmente el recorrido a 320, 768, 1024 y 1440 píxeles, incluyendo textos largos en los tres idiomas.
- Revisar contraste, imágenes, espaciado, tipografía, estados de foco y orden de lectura. La referencia es una dirección visual, no una captura para comparar píxel a píxel.
- Comprobar semántica, anuncios de estado y lectura de errores con herramientas de accesibilidad y una comprobación manual del recorrido.
- Ejecutar comprobación de tipos y compilación de producción como verificaciones del proyecto. Estas no añaden otra interfaz de pruebas de producto.
- No se han implementado ni ejecutado estas pruebas: esta sección establece la estrategia aprobada para la futura implementación.

## Out of Scope

- Aplicaciones nativas de Android e iOS.
- Backend, base de datos, contratos de API y sincronización de compras entre dispositivos.
- Registro, inicio de sesión, cuentas e historial de pedidos.
- Panel de administración y edición de catálogo por comerciantes.
- Cobros, datos de tarjeta o integración con una pasarela de pagos, incluso en modo de pruebas.
- Envíos reales, transportistas, seguimiento, cálculo fiscal real y conversión de divisas.
- Inventario operativo, reservas, descuento de existencias y gestión de agotados desde un servidor.
- Más de cinco cafés en esta primera versión.
- Suscripciones, reseñas de clientes, favoritos, fidelización y promociones adicionales.
- Persistencia del formulario o historial de confirmaciones entre visitas.
- Publicación en un servicio de alojamiento dentro de esta tarea de especificación.

## Further Notes

- El alcance de producto fue aprobado expresamente por el usuario después de la entrevista. El total de cinco cafés sustituye a la propuesta inicial de seis.
- La referencia visual original está conservada junto con las notas de la entrevista. El glosario del repositorio es la fuente de vocabulario de dominio.
- Los nombres comerciales de los cafés, precios ficticios, textos e imágenes concretos se desarrollarán durante la implementación dentro del margen delegado.
- El proyecto se gestiona con un tracker local de Markdown. Esta especificación está publicada con Status: ready-for-agent.
- El usuario confirmó las pruebas desde la aplicación completa en el navegador, complementadas con revisión visual y de accesibilidad. Esta especificación no inicia la implementación.
