# 08: Publicar V3 y presentar el recorrido en el portafolio

**What to build:** el visitante abre la V3 publicada, prueba la demo conectada y encuentra un README y un video corto que muestran la compra y la administración reales de demostración.

**Blocked by:** 07 — Completar el recorrido conectado en idiomas y tamaños.

**Status:** resolved

- [x] Publicar frontend en Vercel, API NestJS en Render Free y PostgreSQL en Neon Free usando configuración gratuita y sin secretos versionados.
- [x] Ejecutar migraciones y carga inicial explícitas; reinicio de servicio no destruye pedidos y disponibilidad lenta de servicios gratuitos tiene respuesta comprensible.
- [x] Verificar salud, proxy de API, cookies de sesión y rutas directas de tienda, historial y administración desde la URL pública.
- [x] README explica V3, acceso demo, datos compartidos/reset, compras simuladas, arquitectura y ejecución local.
- [x] Grabar 60–75 segundos reales, silenciosos a 1080p, principalmente móvil, con textos ingleses y final breve de escritorio; mostrar compra conectada y administración.
- [x] Actualizar video, portada, capítulos, transcripción y descarga; comprobar reproducción y enlaces publicados.
- [x] Registrar validación y entrega, cerrar tickets resueltos y crear commits en la rama actual siguiendo la skill commit-messages sin reescribir historial.

## Comments

Desglose y fronteras de pruebas aprobados por el usuario el 2026-11-03.

Trabajo local completado: README, configuración gratuita de Render, guía de
publicación y video conectado de 73 segundos con portada/capítulos/subtítulos.
Exportación decodificada e inspeccionada. Los tickets 01–07 están resueltos y
ambas revisiones independientes cerraron sus hallazgos. Véase ../delivery.md.

Pendiente externo: acceso a Render/Neon. El host del navegador no está disponible
y las solicitudes de acceso a Chrome caducaron esperando autorización. No se ha
hecho push ni activado V3; la demo pública sigue en V2. No crear recursos de pago.

2026-11-04: publicación completada usando la sesión existente de la CLI de Render, sin API key nueva. Render Free y Vercel siguen main. HTTP público, compra/admin/recibo por navegador, idiomas/tamaños y video publicado correctos. Véase ../delivery.md.
