# Bruma V2: elegir, preparar y volver a pedir

**Status:** ready-for-agent

## Problem Statement

El visitante puede comprar café de demostración, pero debe decidir por sí mismo
qué café encaja con sus gustos, no dispone de orientación para prepararlo y no
puede consultar y repetir sus compras anteriores desde un historial accesible.
El portafolio necesita mostrar esos recorridos completos en móvil y escritorio.

## Solution

Ampliar la web de Bruma con un recomendador breve y explicable, guías interactivas
V60 y prensa francesa, y un historial local de pedidos con revisión de recompra.
Mantener la experiencia editorial de la marca, los tres idiomas y las compras
simuladas. Presentar la V2 terminada con README y video corto actualizados.

## User Stories

1. Como visitante, quiero abrir Encuentra tu café desde inicio para descubrir la selección según mis gustos.
2. Como visitante, quiero acceder al recomendador desde el catálogo para recibir ayuda cuando estoy explorando.
3. Como visitante, quiero contestar una pregunta a la vez para completar el recorrido fácilmente en móvil.
4. Como visitante, quiero elegir entre notas de chocolate/frutos secos, afrutadas y florales para expresar mis gustos.
5. Como visitante, quiero elegir intensidad suave, equilibrada o intensa para orientar la recomendación.
6. Como visitante, quiero indicar si tomo el café solo o con leche para completar mis preferencias.
7. Como visitante, quiero revisar respuestas anteriores sin perder las demás para corregir mi elección.
8. Como visitante, quiero conocer el progreso y los pasos restantes para orientarme.
9. Como visitante, quiero recibir una recomendación principal y una alternativa para decidir entre opciones manejables.
10. Como visitante, quiero que ambas recomendaciones estén disponibles para poder comprarlas.
11. Como visitante, quiero entender los motivos de cada recomendación para decidir con confianza.
12. Como visitante, quiero que las mismas respuestas produzcan resultados consistentes en cualquier idioma.
13. Como visitante, quiero saber si un resultado es aproximado para comprender sus límites.
14. Como visitante, quiero ver una sola opción si solo una está disponible y una recuperación útil si no hay ninguna.
15. Como visitante, quiero abrir la ficha del café recomendado para elegir su variante y añadirla a mi bolsa.
16. Como visitante, quiero reiniciar el cuestionario para explorar otro perfil.
17. Como visitante, quiero abrir una guía desde una ficha de producto para preparar ese café.
18. Como cliente invitado, quiero abrir una guía tras confirmar una compra para continuar mi ritual.
19. Como visitante, quiero elegir V60 o prensa francesa para consultar el método que utilizo.
20. Como visitante, quiero elegir la cantidad de agua para adaptar la receta a mi preparación.
21. Como visitante, quiero ver los gramos de café calculados y redondeados para medirlos fácilmente.
22. Como visitante, quiero leer cantidades, molienda y pasos del método seleccionado para seguir una receta base.
23. Como visitante, quiero que los cálculos y los pasos cambien juntos para evitar instrucciones contradictorias.
24. Como visitante, quiero recibir validación si introduzco una cantidad no admitida para corregirla.
25. Como visitante, quiero conocer las fuentes y el carácter orientativo de las recetas para interpretar la guía.
26. Como visitante, quiero conservar mi selección de método y cantidad al cambiar de idioma.
27. Como visitante, quiero distinguir el método de elaboración de la variante en grano/molido para entender mi compra.
28. Como cliente invitado, quiero que cada compra aprobada aparezca una sola vez en mi historial.
29. Como cliente invitado, quiero que un pago rechazado no cree un pedido confirmado.
30. Como cliente invitado, quiero consultar los últimos veinte pedidos para encontrar mis compras recientes.
31. Como cliente invitado, quiero ver identificador, fecha, variantes, cantidades e importes de cada pedido.
32. Como cliente invitado, quiero abrir un recibo anterior desde una dirección de detalle.
33. Como cliente invitado, quiero conservar el historial al cerrar y reabrir el mismo navegador.
34. Como cliente invitado, quiero comprender que el historial pertenece a este navegador y no se sincroniza.
35. Como cliente invitado, quiero consultar importes y nombres históricos aunque cambie el catálogo actual.
36. Como cliente invitado, quiero que mis datos personales del formulario no formen parte del historial persistido.
37. Como cliente invitado, quiero borrar mi historial mediante una acción intencional y confirmada.
38. Como visitante sin pedidos, quiero una pantalla vacía con acceso al catálogo para empezar una compra.
39. Como visitante sin pedidos, quiero cargar dos pedidos de ejemplo para explorar la recompra y sus avisos.
40. Como visitante, quiero distinguir los pedidos de ejemplo de los creados por una compra demo.
41. Como visitante, quiero cargar ejemplos sin duplicarlos ni sobrescribir pedidos existentes.
42. Como cliente invitado, quiero recuperar una interfaz utilizable si los datos guardados están dañados.
43. Como cliente invitado, quiero saber si el navegador impide guardar el historial sin perder mi compra actual.
44. Como cliente invitado, quiero abrir Volver a pedir desde un pedido para revisar una nueva selección.
45. Como cliente invitado, quiero comparar precios anteriores y actuales antes de añadir la recompra.
46. Como cliente invitado, quiero ver qué variantes están agotadas o ya no existen para entender las exclusiones.
47. Como cliente invitado, quiero que la cantidad añadida respete las bolsas que ya tengo en el carrito.
48. Como cliente invitado, quiero ver que ocho bolsas existentes y tres solicitadas permiten añadir una, con máximo nueve.
49. Como cliente invitado, quiero revisar exactamente qué se añadirá antes de confirmarlo.
50. Como cliente invitado, quiero sumar la selección confirmada a mi carrito sin sustituir su contenido.
51. Como cliente invitado, quiero conservar el cupón actual del carrito al recomprar.
52. Como cliente invitado, quiero que el descuento antiguo no se reactive automáticamente en una nueva compra.
53. Como cliente invitado, quiero que la revisión explique cuando nada puede añadirse y evite una confirmación vacía.
54. Como cliente invitado, quiero cancelar la revisión y mantener intactos mi carrito y el pedido histórico.
55. Como cliente invitado, quiero una sola incorporación al confirmar para evitar duplicados por acciones repetidas.
56. Como cliente invitado, quiero ir a la bolsa tras confirmar la recompra para continuar comprando.
57. Como visitante, quiero encontrar Mis pedidos en la navegación de móvil y escritorio.
58. Como visitante, quiero usar las tres funciones en inglés, español y portugués sin claves de traducción visibles.
59. Como visitante, quiero precios en USD y fechas/cantidades legibles según el idioma.
60. Como visitante móvil, quiero usar las funciones desde 320 px sin desplazamiento horizontal.
61. Como visitante de escritorio, quiero una distribución cuidada y títulos funcionales compactos.
62. Como usuario de teclado, quiero controles semánticos, foco visible y orden de navegación coherente.
63. Como usuario de lector de pantalla, quiero nombres, estados, instrucciones y errores accesibles.
64. Como visitante, quiero continuar utilizando el catálogo, las variantes, el cupón y el checkout existentes.
65. Como visitante del portafolio, quiero un README que explique la V2 y enlace a la demo publicada.
66. Como visitante del portafolio, quiero un video de 60–75 segundos que muestre principalmente móvil y termine con escritorio.
67. Como visitante del video, quiero capítulos, textos ingleses, transcripción y descarga MP4 actualizados.
68. Como visitante, quiero que las direcciones nuevas abran directamente en producción.

## Implementation Decisions

- Conservar React, TypeScript, Vite, React Router, react-i18next y CSS semántico;
  extender módulos por función, sin servicios remotos ni nuevas bibliotecas.
- Separar reglas del recomendador, recetas, snapshots de pedidos, persistencia
  y planificación de recompra de los componentes que los presentan.
- Reutilizar el catálogo y añadir atributos estables de sabor y afinidad de
  consumo. Puntuar preferencias con reglas deterministas; resolver empates de
  forma estable. Explicar las coincidencias reales sin porcentajes ficticios.
- Recomendador de tres pasos con retroceso, selección persistente en memoria,
  resultados principal/alternativo disponibles, reinicio y recuperación vacía.
- Nuevas superficies de recomendación, guía, historial, recibo y revisión de
  recompra con enlaces desde las superficies acordadas.
- Guía base: 500 ml iniciales; 250–500 ml, incrementos de 50 ml; dosis a 0,1 g;
  V60 30 g/500 ml y prensa francesa 1:15. Validar cantidad finita, rango y paso.
  Cantidades y pasos se derivan de la misma receta. Tiempos orientativos y
  capacidad del equipo explicados. Fuentes primarias citadas en la guía.
- Extender el pedido confirmado con fecha y datos históricos del producto;
  preservar variantes, precios unitarios, importes y origen compra/ejemplo.
  La confirmación y el recibo histórico deben poder usar el snapshot.
- Historial versionado y validado, de hasta veinte pedidos, ordenado por fecha
  descendente, restringido a este navegador/origen. No guardar nombres,
  direcciones ni correos del cliente. Recuperar datos corruptos sin bloquear.
- Guardar solo compras aprobadas y evitar duplicados por identificador.
  Avisar si la persistencia falla; mantener la sesión utilizable en memoria.
- Ejemplos accesibles solo desde historial vacío, con dos snapshots claramente
  identificados; incluir precio antiguo y producto agotado para demostrar avisos.
- Revisar recompra con catálogo y carrito actuales: cantidades solicitadas,
  cantidades realmente añadibles, motivos de exclusión y comparación de precios.
  Fusionar identidades de variante y respetar nueve bolsas combinadas por variante.
- Confirmar mediante una acción del carrito que aplique el plan actual una sola
  vez; preservar el cupón actual; no modificar el pedido histórico. Cancelar no
  modifica datos. Desactivar confirmación si no hay cantidades positivas.
- Mantener el diseño editorial existente y títulos funcionales compactos.
- Renovar grabación real, portada, capítulos, WebVTT y documentación, conservando
  el formato silencioso de 1080p, textos ingleses y final breve en escritorio.
- Publicar mediante la integración GitHub–Vercel ya configurada y comprobar la
  versión pública, rutas directas, reproducción, descarga e integridad del MP4.

## Testing Decisions

- Se mantiene la frontera ya acordada y aprobada: comportamiento público en el
  navegador. Captura navegación, estado visible, persistencia, cálculos observables,
  traducciones, diseño adaptable y accesibilidad; no prueba funciones privadas.
- Usar Playwright y Axe existentes, con valores esperados independientes: 500 ml
  V60 = 30,0 g, 250 ml = 15,0 g; prensa francesa 500 ml = 33,3 g; ocho más tres
  solicitadas permite añadir una. No recomputar expectativas con el algoritmo.
- TDD por recorrido vertical: una prueba fallida, implementación mínima y
  comprobación; ampliar casos de forma incremental.
- Probar preferencias y explicación, edición/reinicio, recetas y validación,
  compras aprobadas/rechazadas, historial tras recarga/reapertura, ejemplos,
  borrado intencional, corrupción/fallo de almacenamiento, revisión de recompra,
  límites, cupones y conservación del recibo histórico.
- Mantener la matriz de tres idiomas y 320/768/1024/1440 px, teclado, controles
  semánticos y comprobaciones WCAG automatizadas. Los fallbacks de catálogo
  completo vacío o con una sola opción se revisan como defensas de datos;
  no introducir controles de producción únicamente para probarlos.
- Usar como precedentes los recorridos existentes de compra, almacenamiento,
  regresiones de foco, localización y reproducción del walkthrough.
- Typecheck y archivos de prueba focalizados regularmente; suite completa una
  vez al finalizar el código, antes de grabación/publicación. Revisar después
  cualquier corrección material que surja de la revisión independiente.

## Out of Scope

App Store, app nativa, backend, base de datos remota, cuentas, sincronización
entre dispositivos, pagos reales, administración, inteligencia artificial remota,
temporizador de elaboración, cambios en las variantes comerciales y nuevas
funciones ajenas a los tres recorridos acordados.

## Further Notes

Decisiones de producto confirmadas en la entrevista Q1–Q14. La petición actual
autoriza encadenar especificación, tickets e implementación. La frontera de
pruebas conserva la ya aprobada; no se añade una frontera de pruebas de módulos.
El punto de comparación para la revisión es el commit de producción anterior
a esta V2. Las recetas parten de Hario USA y ESPRO, documentadas en el registro
de descubrimiento. No hace falta un ADR para estas decisiones reversibles.
