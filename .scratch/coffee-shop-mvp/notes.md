# Definición del MVP

## Decisiones confirmadas

- Oferta: venta de bolsas de café.
- Propósito: proyecto de portafolio.
- Alcance técnico: frontend primero, con datos de demostración y compra simulada; backend fuera de esta primera versión.
- Catálogo: cinco cafés con foto, origen, notas de sabor y nivel de tueste; cada café ofrece bolsas de 250 g y 500 g, en grano o molido.
- Orígenes: dos cafés de Panamá, uno de Brasil y uno de Colombia, indicados por el usuario; el agente elige Etiopía como quinto origen dentro del margen delegado. Se opta por cinco cafés en esta primera versión.
- Exploración: búsqueda por nombre u origen, filtro por nivel de tueste y orden por precio base de la bolsa de 250 g.
- Disponibilidad de demostración: cuatro cafés disponibles y uno agotado, ajustando el total al catálogo de cinco. El agotado se puede consultar pero no añadir.
- Carrito: una línea por combinación de café, peso y preparación. Repetir la misma combinación aumenta su cantidad; variantes diferentes se mantienen separadas.
- Cantidad máxima: nueve bolsas por variante.
- Persistencia: recordar carrito, cupón aplicado e idioma en el mismo navegador al recargar o volver a abrir. Cambiar de idioma conserva productos y cantidades.
- Idiomas: portugués de Brasil, español latinoamericano e inglés estadounidense; internacionalización desde el inicio.
- Idioma inicial: usar el idioma del navegador si está soportado; inglés como alternativa. Selector visible que recuerda la elección.
- Moneda: USD en todos los idiomas.
- Precios ficticios por café y peso; grano y molido cuestan lo mismo.
- Envío de demostración: tarifa fija de USD 5; sin integrar transportistas ni calcular impuestos reales. Identificar los pedidos e importes como simulados.
- Cupón BRUMA15: 15 % de descuento sobre el subtotal de productos; no afecta al envío y se aplica una sola vez.
- Marca: Bruma Café.
- Plataforma: web adaptable a móvil y escritorio, priorizando móvil.
- Recorrido: inicio → catálogo → detalle del café → carrito → finalizar compra → confirmación.
- Compra como invitado: sin cuenta; formulario con nombre, correo, dirección, ciudad, código postal y país.
- Formulario: validaciones de campos obligatorios y formato de correo, mensajes en el idioma seleccionado y botón «Llenar demo» que completa automáticamente los campos con datos ficticios.
- Pago simulado, identificado como demostración, con control para elegir resultado aprobado o rechazado, sin introducir tarjeta.
- Pago aprobado: mostrar confirmación con número de pedido y resumen de compra, y vaciar carrito y cupón. El resumen de confirmación se conserva aunque el carrito quede vacío.
- Pago rechazado: conservar carrito, cupón y formulario para permitir reintentar.
- Herramientas: React, TypeScript y Vite; React Router para navegación; react-i18next para internacionalización.
- Contenido: desarrollar nombres, precios ficticios, textos en los tres idiomas, identidad tipográfica y selección coherente de imágenes para Bruma Café, respetando los orígenes elegidos.
- Referencia visual: imagen aportada por el usuario, con fondo oscuro, verde suave, fotografías protagonistas y tipografía grande; identidad propia.

## Referencia visual

- Imagen original conservada en `.scratch/coffee-shop-mvp/reference.png`.

## Estado de la entrevista

- MVP aprobado explícitamente por el usuario, incluyendo el catálogo de cinco cafés y cuatro disponibles para comprar.
- Entrevista cerrada: alcance compartido confirmado.
- No se ha iniciado la implementación de la aplicación.

## Especificación

- Alcance de producto y estrategia de pruebas confirmados expresamente por el usuario.
- Especificación final publicada en `.scratch/coffee-shop-mvp/spec.md` con `Status: ready-for-agent`.
- El borrador anterior se conserva como antecedente; la fuente vigente es la especificación final.
- El desglose solicitado con `to-tickets` fue aprobado y los ocho tickets quedaron publicados.

## Tickets

- Desglose de ocho tickets aprobado expresamente por el usuario: granularidad y dependencias aceptadas.
- Publicados ocho archivos individuales en `.scratch/coffee-shop-mvp/issues/`, numerados del 01 al 08 y con `Status: ready-for-agent`.
- Las 66 historias de usuario tienen cobertura en 97 criterios de aceptación del desglose.
- Dependencias verificadas: grafo sin ciclos y numeración con bloqueadores primero.
- Frontera inicial: ticket 01. Tras el ticket 01 pueden avanzar 02 y 03; tras el ticket 05, 06 y 07.
- Los borradores se conservan como antecedentes; las fuentes vigentes son los tickets publicados en `issues/`.
- No se ha iniciado la implementación de la aplicación.
