# Revisión de Bruma Café

## Alcance

Comparación inicial: `git diff edc7dcda387ec836dc1980847eb18d0fc0a5a910...457ff60`.
Commit de implementación: `457ff60 feat(bruma): build the trilingual coffee shopping experience`.
La revisión requerida por code-review se realizó con dos revisores independientes en paralelo, contra el commit de planificación anterior a la implementación.

## Standards

Hallazgo P2: la gestión de foco dependía de la clave de navegación. Al modificar los parámetros de búsqueda, cada carácter desplazaba el foco al contenido principal, incumpliendo la operación por teclado.
No se encontraron otras infracciones documentadas ni hallazgos heurísticos accionables. Las excepciones de tamaño del CSS cohesivo están documentadas.
Resolución: las actualizaciones de consulta conservan foco y desplazamiento; los cambios de pantalla trasladan el foco al contenido principal. Se respeta la preferencia de movimiento reducido.
El revisor de Standards confirmó la corrección sin problemas nuevos.

## Spec

1. P2: la búsqueda perdía el foco tras cada carácter.
2. P2: las adiciones repetidas conservaban el mismo texto de estado y dejaban de anunciar un nuevo resultado accesible.
3. P2: las líneas del carrito omitían el precio unitario de la bolsa exigido por el ticket 04.

Resoluciones:

1. Se conserva el foco al cambiar parámetros y se prueba la escritura carácter por carácter.
2. Cada adición anuncia la cantidad de su variante, con plurales localizados. Cambiar de variante reinicia el mensaje anterior.
3. Se presenta el precio por bolsa de forma independiente del importe de la línea, en los tres idiomas.

El revisor de Spec confirmó que los tres hallazgos quedaron resueltos, sin nuevas observaciones ni ampliación de alcance.

## Verificación

- Las tres regresiones fallaban antes de corregir; cada corrección pasó su prueba específica.
- Suite completa final: **32 pruebas aprobadas**.
- Matriz: español, portugués e inglés a 320, 768, 1024 y 1440 píxeles, sin desbordamientos ni errores de aplicación.
- Axe: sin infracciones automáticas WCAG A/AA en portada, catálogo, producto, carrito, compra, validaciones, rechazo y confirmación.
- Navegación por teclado, capturas visuales y rechazo → reintento → confirmación revisados.
- Typecheck, lint, formato y compilación de producción aprobados.
- Auditoría npm: cero vulnerabilidades reportadas.
- Fotografías originales guardadas localmente y optimizadas en WebP; fuentes locales.

## Resultado

Standards: 1 hallazgo inicial, máximo P2, resuelto; 0 pendientes.
Spec: 3 hallazgos iniciales, máximo P2, resueltos; 0 pendientes.
Los ejes comparten el hallazgo de foco: hubo tres problemas distintos en total.
Correcciones verificadas en `3d76dac fix(shop): preserve typing focus and expose cart price feedback`.
