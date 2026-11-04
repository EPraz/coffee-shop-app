# Bruma V3: tienda compartida y administración de demostración

**Status:** claimed

Implementación y revisión funcional completas (tickets 01–07). Publicación y
verificación pública pendientes de acceso a Render/Neon en el ticket 08.
Estado y evidencia: [delivery.md](delivery.md).

## Problem Statement

El visitante puede explorar Bruma y completar una compra simulada, pero la
tienda no tiene existencias reales de demostración, pedidos compartidos ni un
panel para entender qué ocurre después de comprar. El portafolio necesita
mostrar un producto completo que conecte la experiencia editorial del comprador
con la operación de una tienda, manteniendo su diseño y una entrada sencilla.

La V2 publicada cubre elección, elaboración e historial local. V3 debe añadir
persistencia y administración sin introducir cuentas de cliente, pagos reales,
costes de infraestructura o trabajo de migración que no aporta a esta demo.

## Solution

Conectar la tienda con un backend y una base de datos. Añadir un panel visual
en `/admin`, accesible mediante una cuenta de demostración sin contraseña.
Todos los visitantes comparten precios, existencias y pedidos de ejemplo.
El administrador puede modificar precios, disponibilidad y existencias de los
cinco cafés actuales, y atender pedidos hasta su entrega o cancelación.

El comprador continúa como invitado. El servidor confirma precios y existencias
antes de guardar una compra y permite consultar su estado desde el mismo
navegador. El dashboard muestra métricas calculadas a partir de esos pedidos.
Una acción confirmada restablece los datos de ejemplo para todos. Se mantienen
los tres idiomas, USD, el diseño adaptable y el carácter simulado del producto.

## User Stories

1. Como visitante, quiero explorar la tienda sin iniciar sesión para probar el portafolio inmediatamente.
2. Como visitante, quiero conservar la identidad visual y las fotografías de Bruma para reconocer el mismo producto.
3. Como visitante, quiero consultar los cinco cafés actuales con precios y disponibilidad vigentes.
4. Como visitante, quiero elegir 250 g o 500 g y café en grano o molido para preparar mi compra.
5. Como visitante, quiero distinguir un café desactivado de una variante sin existencias para entender por qué no puedo comprarla.
6. Como visitante, quiero que el catálogo, las fichas y las recomendaciones reflejen la disponibilidad real de demostración.
7. Como visitante, quiero consultar la tienda en inglés, español o portugués conservando mi recorrido.
8. Como visitante, quiero ver todos los importes en USD con formato adecuado al idioma.
9. Como visitante, quiero continuar usando las guías V60 y prensa francesa de V2.
10. Como visitante, quiero conocer cuándo se están cargando los datos para entender una espera del backend.
11. Como visitante, quiero poder reintentar un fallo de conexión sin perder mi selección ni recibir una falsa confirmación.
12. Como visitante, quiero acceder al panel de administración desde una entrada reconocible para explorar la operación de la tienda.
13. Como visitante del panel, quiero entrar con una cuenta de demostración sin contraseña ni registro.
14. Como visitante del panel, quiero saber que los cambios son de demostración y compartidos por todos.
15. Como administrador de tienda, quiero conservar mi acceso al recargar la página mientras mi sesión siga vigente.
16. Como administrador de tienda, quiero cerrar la sesión de demostración para abandonar el panel.
17. Como administrador de tienda, quiero recuperar el acceso si caduca la sesión sin perder cambios aún no guardados innecesariamente.
18. Como visitante sin sesión administrativa, quiero una entrada clara a la demo al abrir una ruta protegida.
19. Como administrador de tienda, quiero ver los cinco cafés actuales con sus precios, disponibilidad y existencias.
20. Como administrador de tienda, quiero editar el precio de cada peso para cambiar la oferta sin modificar la fotografía o el nombre.
21. Como administrador de tienda, quiero que en grano y molido compartan el precio del mismo peso, como en la tienda actual.
22. Como administrador de tienda, quiero activar o desactivar la disponibilidad comercial de un café.
23. Como administrador de tienda, quiero editar existencias de cada combinación de peso y preparación.
24. Como administrador de tienda, quiero recibir validación al introducir precios o existencias inválidos.
25. Como administrador de tienda, quiero ver un toast de éxito solo cuando el servidor haya guardado mi cambio.
26. Como administrador de tienda, quiero ver un toast de error y conservar lo que escribí si falla el guardado.
27. Como administrador de tienda, quiero que los cambios guardados se reflejen en la tienda compartida.
28. Como administrador de tienda, quiero que una edición desactualizada me pida revisar el dato vigente para no sobrescribir el trabajo de otro visitante sin avisar.
29. Como cliente invitado, quiero conservar el contenido de mi carrito al revisar cambios de precio o existencias.
30. Como cliente invitado, quiero que la cantidad máxima considere tanto las nueve bolsas por variante como sus existencias disponibles.
31. Como cliente invitado, quiero aplicar BRUMA15 con las mismas reglas actuales.
32. Como cliente invitado, quiero validar los campos del formulario antes de enviar una compra.
33. Como cliente invitado, quiero usar Llenar demo para completar automáticamente datos ficticios.
34. Como cliente invitado, quiero probar una compra aprobada y una rechazada sin pagos reales.
35. Como cliente invitado, quiero que un rechazo conserve el carrito y no consuma existencias ni cree un pedido.
36. Como cliente invitado, quiero que el servidor compruebe precios, disponibilidad y existencias antes de confirmar.
37. Como cliente invitado, quiero ver un modal sencillo si cambió algo desde mi revisión.
38. Como cliente invitado, quiero que Aplicar cambios actualice la selección y me devuelva a la revisión final.
39. Como cliente invitado, quiero confirmar personalmente la compra tras aceptar cambios, sin que el modal compre por mí.
40. Como cliente invitado, quiero volver a la bolsa para corregir manualmente una selección afectada.
41. Como cliente invitado, quiero que dos compras simultáneas de la última bolsa no confirmen ambas.
42. Como cliente invitado, quiero que un doble clic o un reintento de la misma compra no duplique el pedido ni su descuento de existencias.
43. Como cliente invitado, quiero ver un recibo confirmado con número, fecha, variantes, cantidades e importes del momento de la compra.
44. Como cliente invitado, quiero que el carrito se vacíe únicamente después de una confirmación real del servidor.
45. Como cliente invitado, quiero consultar mis pedidos desde el mismo navegador sin crear una cuenta.
46. Como cliente invitado, quiero ver el estado actualizado de un pedido al volver a consultarlo.
47. Como cliente invitado, quiero conservar los importes históricos aunque cambien los precios de la tienda.
48. Como cliente invitado, quiero que mi historial no incluya compras realizadas por otros visitantes.
49. Como cliente invitado, quiero borrar mi historial local con confirmación sin borrar los pedidos administrativos.
50. Como cliente invitado, quiero recibir una explicación útil si un restablecimiento compartido eliminó un pedido que tenía guardado.
51. Como cliente invitado, quiero que mis datos del formulario no se guarden en la base de datos ni en el historial.
52. Como cliente invitado, quiero revisar una recompra con precios, disponibilidad y existencias actuales antes de añadirla a la bolsa.
53. Como cliente invitado, quiero mantener el cupón actual y los productos existentes al recomprar.
54. Como administrador de tienda, quiero consultar los pedidos de la tienda compartida con su estado, fecha e importe.
55. Como administrador de tienda, quiero abrir el detalle de un pedido y consultar sus líneas e importes históricos.
56. Como administrador de tienda, quiero avanzar de confirmado a en preparación, enviado y entregado.
57. Como administrador de tienda, quiero que el sistema impida saltos o retrocesos de estado no admitidos.
58. Como administrador de tienda, quiero cancelar pedidos confirmados o en preparación, antes del envío.
59. Como administrador de tienda, quiero que una cancelación reponga existencias exactamente una vez.
60. Como administrador de tienda, quiero que los pedidos enviados, entregados o cancelados no puedan cancelarse de nuevo.
61. Como administrador de tienda, quiero que las acciones de pedido muestren un toast con su resultado real.
62. Como administrador de tienda, quiero comprender un conflicto si otro visitante ya cambió el estado del pedido.
63. Como administrador de tienda, quiero ver ventas de demostración, cantidad de pedidos y promedio por pedido.
64. Como administrador de tienda, quiero alternar períodos de siete y treinta días.
65. Como administrador de tienda, quiero consultar una tendencia de ventas con valores y fechas legibles.
66. Como administrador de tienda, quiero conocer los cafés con mayores ventas para entender el comportamiento de la demo.
67. Como administrador de tienda, quiero consultar pedidos recientes y abrir su detalle desde el resumen.
68. Como administrador de tienda, quiero identificar variantes con cinco bolsas o menos y distinguir las agotadas.
69. Como administrador de tienda, quiero que las métricas respondan a las compras y cancelaciones reales de la demo.
70. Como administrador de tienda, quiero ver pedidos de ejemplo de los últimos treinta días al abrir por primera vez.
71. Como administrador de tienda, quiero una presentación útil cuando un período no contiene ventas ni pedidos.
72. Como administrador de tienda, quiero restablecer precios, disponibilidad, existencias y pedidos de ejemplo.
73. Como administrador de tienda, quiero confirmar el restablecimiento sabiendo que afecta a todos los visitantes.
74. Como administrador de tienda, quiero poder cancelar el modal sin modificar datos.
75. Como administrador de tienda, quiero recibir un toast real de éxito o error del restablecimiento.
76. Como visitante, quiero que la tienda y el panel vuelvan a cargar datos coherentes después de un restablecimiento.
77. Como visitante móvil, quiero recorrer la tienda y administrar la demo sin desbordamientos desde 320 px.
78. Como visitante de escritorio, quiero un dashboard visual cuidado y títulos funcionales compactos.
79. Como usuario de teclado, quiero navegar, editar y confirmar modales con foco visible y predecible.
80. Como usuario de lector de pantalla, quiero nombres, estados, errores, toasts y alternativas textuales para gráficos.
81. Como visitante, quiero abrir directamente las rutas de tienda, historial y administración en producción.
82. Como visitante del portafolio, quiero un README que explique V3 y cómo probar su cuenta de demostración.
83. Como visitante del portafolio, quiero un video corto principalmente móvil, con textos en inglés y una toma breve final de escritorio.
84. Como visitante del video, quiero capítulos, transcripción y descarga coherentes con la versión publicada.
85. Como propietario del portafolio, quiero alojar el frontend en Vercel y el backend en Render usando servicios gratuitos.
86. Como propietario del portafolio, quiero iniciar V3 con sus propios datos de ejemplo sin migrar recibos ni historial de V2.

## Implementation Decisions

- Mantener React, TypeScript, Vite, React Router, i18next y el sistema visual
  actual. Incorporar una zona administrativa adaptable con carga separada del
  recorrido de tienda cuando corresponda. No rediseñar la marca ni las imágenes.
- Añadir NestJS y Prisma con PostgreSQL. Render Free aloja la API, Neon Free
  la base de datos y Vercel el frontend. Encauzar las solicitudes de API antes
  de la recuperación de rutas del frontend para mantener un mismo origen web.
- Separar los límites de catálogo, compras/pedidos, acceso demo y administración;
  centralizar reglas comerciales en el servidor y mantener controladores finos.
  Compartir contratos de transporte explícitos sin importar detalles de Prisma
  en la interfaz. Validar entradas y devolver errores estructurados traducibles.
- Una sola tienda de demostración compartida. No hay espacios por visitante,
  propietario privado, registro, recuperación de contraseña ni roles adicionales.
- La entrada demo emite una sesión temporal validada por el servidor. Proteger
  todos los recursos administrativos en la API, no solo con rutas de React.
  Usar cookies seguras según entorno, protección de solicitudes entre orígenes,
  caducidad, salida y recuperación accesible. No colocar secretos en el bundle.
- El acceso invitado al recibo se liga a un identificador opaco del navegador;
  conocer un número de pedido no concede acceso al historial de otro comprador.
  No constituye una cuenta ni permite recuperación entre dispositivos. La
  administración autenticada sí consulta todos los pedidos de la demo compartida.
- Persistir cinco identidades de café, disponibilidad, dos precios por peso,
  cuatro variantes por café y existencias por variante. Nombres, países, notas,
  textos editoriales e imágenes permanecen fijos. Los dos tipos de preparación
  de un peso comparten su precio. No ofrecer creación, carga o borrado de cafés.
- Importes en centavos enteros de USD; precios positivos y existencias enteras
  no negativas, con límites validados. Rechazar identificadores, pesos,
  preparaciones, cantidades o campos de edición no admitidos.
- Calcular disponibilidad vendible a partir de la habilitación del café y las
  existencias de su variante. Adaptar catálogo, ficha, carrito, recomendador y
  recompra a esa fuente común. No confundir existencias con el límite de nueve.
- Evitar sobrescrituras silenciosas entre administradores mediante una versión
  de edición: un conflicto devuelve el estado vigente y conserva lo escrito
  para revisión. No es necesario introducir colaboración en tiempo real.
- Revisar un carrito contra datos vigentes antes de confirmar. Una variación
  de precio, disponibilidad o cantidad requiere el modal acordado. Aplicar
  cambios devuelve al resumen final; no crea un pedido. Volver a la bolsa
  conserva la selección para corrección. No permitir confirmar una compra vacía.
- La revisión y la confirmación intercambian una referencia verificable a lo
  aceptado. El servidor vuelve a comprobar las condiciones dentro de la compra;
  una revisión anterior no reserva stock ni autoriza precios manipulados.
- BRUMA15 descuenta el 15 % del subtotal, redondeado una vez al centavo. El envío
  demo sigue siendo USD 5,00. Calcular importes en el servidor sin aceptar del
  cliente descuentos, precios unitarios o totales como autoridad.
- Persistir el pedido confirmado y sus líneas históricas junto con el descuento
  de existencias en una transacción. Si dos compradores compiten por la última
  unidad, solo uno obtiene un pedido. No permitir existencias negativas.
- La misma solicitud de compra reintentada produce el mismo pedido, sin un
  segundo descuento de stock. Asociar la identidad de reintento con el contenido
  y el comprador; rechazar su reutilización para una compra diferente.
- Mantener los modos de pago demo aprobado/rechazado, sin proveedor de pagos.
  Un rechazo no crea pedido confirmado ni consume existencias. Nombre, correo
  y dirección solo sirven al formulario de demostración y no se envían para
  persistencia ni aparecen en registros de aplicación o panel.
- El pedido conserva número, fecha, líneas, nombres/precios históricos,
  descuento, envío, total, marca de ejemplo y estado. Los pedidos de compra
  comienzan confirmados; avanzar solo confirmado → en preparación → enviado →
  entregado. Cancelar solo confirmado o en preparación; cancelado es terminal.
- Cancelación y reposición se confirman atómicamente y una sola vez. Una acción
  repetida o un conflicto de estado no vuelve a reponer ni genera un éxito falso.
- Mis pedidos conserva referencias/snapshots de los veinte pedidos recientes
  de este navegador y consulta sus estados vigentes. Borrar historial olvida
  referencias locales sin borrar registros administrativos. Aislar la nueva
  persistencia local de V2: no leer, importar ni convertir sus recibos.
- Conservar la experiencia de ejemplos de historial y recompra de V2 como
  ejemplos locales claramente identificados; no convertirlos por cargar la
  pantalla en nuevos pedidos ni ventas del backend. Los ejemplos administrativos
  se crean mediante la carga inicial y el restablecimiento de la demo.
- Si un pedido dejó de existir por el restablecimiento compartido, explicar
  esa situación y ofrecer continuar a la tienda. Evitar mostrar su antiguo
  estado como si acabara de verificarse. Un fallo de almacenamiento o red debe
  permitir recuperar el recorrido sin una nueva compra accidental.
- Métricas con períodos móviles de siete/treinta días y límites temporales
  explícitos comunes en UTC. Ventas: productos después del descuento, sin envío
  ni cancelados. Promedio: esas ventas divididas entre pedidos no cancelados;
  cero si no hay ninguno. Cantidad de pedidos: todos, incluidos cancelados.
- La tendencia agrega esas ventas por día; los cafés destacados utilizan sus
  ventas de producto descontadas de forma consistente. Identificar criterios
  y períodos en la interfaz, sin métricas decorativas desconectadas de pedidos.
  Mostrar variantes con existencias de cero a cinco en las alertas.
- Sembrar pedidos sintéticos distribuidos en los últimos treinta días, con
  variedad de cafés, estados y días vacíos, sin datos personales. La carga
  inicial y el restablecimiento comparten una definición de datos de ejemplo.
- Restablecer demo exige sesión administrativa y confirmación explícita de su
  efecto global. Restaurar precios, disponibilidad, stock y pedidos de ejemplo
  como una operación coherente. Evitar estados intermedios y compras/ediciones
  basadas en una generación anterior. Mantener las sesiones utilizables y
  recargar los datos afectados; no exigir una cuenta nueva a cada visitante.
- Todas las mutaciones administrativas muestran toast de éxito o error real.
  Conservar ediciones fallidas y evitar acciones duplicadas mientras están
  pendientes. Incorporar carga, vacío, reintento, conflicto y sesión caducada;
  no mostrar éxito antes de recibir confirmación del backend.
- Diseñar una experiencia útil cuando el servicio gratuito despierta tras
  inactividad. No usar disponibilidad infinita, éxitos locales o pedidos
  ficticios como sustitutos silenciosos ante un fallo de API.
- Aplicar validación y límites razonables de solicitudes al backend público,
  sin añadir una consola de usuarios, CAPTCHA o controles comerciales ajenos
  al alcance. Migraciones y datos de ejemplo se ejecutan de forma explícita
  y segura; reiniciar el proceso no debe borrar compras.
- Verificar configuración por entorno, salud del servicio, rutas directas,
  sesión y conexión a base de datos antes de publicar. Solo recursos gratuitos;
  no copiar configuraciones históricas pagadas de los proyectos hermanos.
- Actualizar documentación y recorrido audiovisual de 60–75 segundos, silencioso
  a 1080p, principalmente móvil, textos ingleses y toma breve final de escritorio.
  Mostrar una compra conectada, un cambio administrativo y el resultado visible.
  Actualizar portada, capítulos y transcripción según la grabación final.

## Testing Decisions

- Fronteras aprobadas por el usuario: conservar la frontera del navegador público
  y añadir la frontera HTTP pública de la API con PostgreSQL de pruebas real.
  Ambas fronteras fueron confirmadas por el usuario el 2026-11-03.
- Navegador con Playwright/Axe existentes: comprueba lo visible, navegación,
  revisión de cambios, compra y estado, acceso admin, ediciones, toasts,
  restablecimiento, idioma, adaptación y accesibilidad. No alcanza por sí solo
  todas las carreras de stock ni demuestra que la API impide eludir permisos.
- API HTTP con el cliente de pruebas de Playwright y base de datos aislada:
  comprueba permisos, validación, importes, conflictos, reintentos, concurrencia,
  transiciones, reposición, métricas y reset mediante solicitudes/respuestas
  públicas. No comprueba por sí sola foco, diseño ni la interacción del usuario.
- No probar métodos privados, hooks o repositorios de forma aislada, ni usar
  lecturas directas de tablas como aserciones. Preparar fixtures mediante carga
  de prueba controlada; verificar el resultado a través de la API y la interfaz.
  Nunca ejecutar pruebas destructivas contra la demo pública o su base de datos.
- TDD incremental en cada ticket: una prueba que falla, implementación mínima,
  comprobación y siguiente caso. No escribir todas las pruebas por adelantado.
- Reutilizar recorridos existentes de checkout, rechazo/reintento, carrito,
  cupones, historial, recompra, idiomas, teclado y walkthrough. Adaptar los
  preparativos a la API sin convertir reglas comerciales en mocks.
- Valores esperados independientes: subtotal USD 44,00 con BRUMA15 produce
  descuento USD 6,60, ventas USD 37,40 y total con envío USD 42,40. Una compra de
  una última unidad deja cero; otra compra concurrente no confirma. Cancelarla
  devuelve una unidad; repetir la cancelación no devuelve una segunda.
- Verificar solicitudes sin sesión, sesión caducada y campos manipulados;
  precios alterados entre revisión y confirmación; compra duplicada; compras
  simultáneas; cancelación concurrente; reset frente a revisión desactualizada;
  pérdida de conexión sin pérdida de valores ni éxito falso.
- Probar métricas con pedidos conocidos, cancelados y límites de período; no
  derivar expectativas con el mismo algoritmo que calcula el dashboard.
- Serializar pruebas que mutan la única tienda compartida de pruebas y restaurar
  sus fixtures de forma determinista. Confirmar persistencia tras recarga y
  reinicio del proceso sin sembrar ni restablecer automáticamente en cada arranque.
- Matriz de inglés/español/portugués y 320/768/1024/1440 px; foco visible, modales
  con entrada/salida de foco, teclado, anuncios y gráficos con alternativa textual.
- Typecheck regularmente y pruebas focalizadas durante cada ticket. Suite completa
  al terminar el código. Revisión independiente de estándares y especificación;
  corregir hallazgos materiales y repetir comprobaciones afectadas. Verificar
  build y publicación antes de la grabación definitiva y cierre de entrega.

## Out of Scope

Migración de recibos o historial de V2; espacios separados por visitante; App
Store o aplicaciones nativas; cuentas de cliente; acceso personal de propietario;
GitHub/OAuth; pagos reales; envíos o correos reales; persistencia de información
personal del checkout; creación, eliminación o archivado de cafés; carga de fotos;
cambios editoriales de productos; roles adicionales; gestión de usuarios;
sincronización de historial entre dispositivos; devoluciones después del envío;
infraestructura pagada; colaboración en tiempo real; rediseño de marca.

## Further Notes

El usuario confirmó Q1–Q20 y el resumen completo de V3 el 2026-11-03. V2 permanece
publicada hasta la entrega de V3. La petición actual encadena especificación,
tickets e implementación. El usuario confirmó la propuesta de
fronteras de pruebas y los ocho tickets con sus dependencias antes de escribir
pruebas y comenzar a resolver el desglose.

La especificación usa el glosario de la tienda y el descubrimiento aprobado.
Los precedentes de acceso demo y despliegue gratuito se revisaron en KeelWatch
y projectManagement; se reutiliza el patrón sin copiar permisos, datos ni reglas
de otros productos. No existe un ADR previo que contradiga este alcance.
