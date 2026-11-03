# 01: Encontrar un café según preferencias

**What to build:** Cuestionario de tres pasos con recomendaciones disponibles y explicadas, accesible desde inicio y catálogo, en los tres idiomas.

**Blocked by:** None (can start immediately).

**Status:** resolved

- [x] Sabores, intensidad y consumo solo/con leche con progreso, retroceso y reinicio.
- [x] Principal y alternativa disponibles, motivos reales y coincidencia aproximada honesta.
- [x] Reglas estables independientes de las traducciones y fallbacks de disponibilidad.
- [x] Las recomendaciones enlazan con la compra de una variante.
- [x] Entrada desde inicio y catálogo; diseño móvil, teclado y traducciones.
- [x] Recorrido Playwright rojo → verde con datos y expectativas independientes.

## Comments

Public browser tests 12 and the trilingual/four-width V2 matrix pass. Independent matching and availability defenses reviewed. See the [independent review](../review.md); no remaining implementation findings.
