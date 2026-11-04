# 01: Explorar la tienda persistida y entrar al panel demo

**What to build:** el visitante consulta los cinco cafés con sus precios, disponibilidad y existencias persistidos, entra a `/admin` con la cuenta demo y ve la misma selección en una primera superficie administrativa funcional.

**Blocked by:** None (can start immediately).

**Status:** resolved

- [x] La API NestJS con Prisma/PostgreSQL sirve el catálogo fijo de cinco cafés, dos precios por café y cuatro variantes por café; los datos sobreviven al reinicio.
- [x] La tienda utiliza la fuente persistida sin cambiar nombres, fotografías, textos editoriales ni estilos de marca.
- [x] Disponibilidad vendible considera habilitación del café y existencias; las guías de elaboración siguen utilizables.
- [x] Entrar como demo emite una sesión validada por el servidor y abre un panel de catálogo reconocible; recarga, salida y sesión caducada tienen recuperación útil.
- [x] La API rechaza accesos administrativos sin sesión aunque se eluda el guardado de rutas del frontend.
- [x] No se ofrecen registro, propietario privado, roles adicionales ni un espacio diferente por visitante.
- [x] Carga, fallo del servicio y reintento son visibles sin sustituir el backend por éxitos locales.
- [x] Frontend y API arrancan en desarrollo y pruebas con configuración explícita; las pruebas usan una base separada de producción.
- [x] Probar comportamiento de catálogo y acceso en las fronteras aprobadas de navegador y API, incluidos idioma y teclado del acceso demo.

## Comments

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.


Validación: typecheck correcto; pruebas focalizadas HTTP con PostgreSQL real y recorrido Playwright del ticket correctos. Revisión global pendiente del ticket 07.

Validación integrada cerrada: suite completa 83/83 navegador y 11/11 API; regresiones de revisión y 16 recorridos afectados correctos tras la limpieza. Ambos revisores cerraron sus hallazgos. Véase ../review.md.
