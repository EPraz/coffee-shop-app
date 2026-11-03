# 05: Recorrer la V2 con calidad de entrega

**What to build:** Recorrer las nuevas funciones junto a la compra existente con idiomas, teclado, accesibilidad y tamaños de pantalla coherentes.

**Blocked by:** 01: Encontrar un café según preferencias; 02: Preparar café con una guía interactiva; 04: Revisar y confirmar una recompra.

**Status:** resolved

- [x] Inglés, español y portugués con USD y estados conservados donde corresponde.
- [x] 320, 768, 1024 y 1440 px sin desbordamientos; títulos funcionales compactos.
- [x] Navegación por teclado, focos y anuncios accesibles; Axe sin infracciones nuevas.
- [x] Catálogo, variantes, cupón, compra y video existentes siguen funcionando.
- [x] Typecheck, lint, formato, build y suite completa pasan.
- [x] Revisión independiente de estándares y especificación; hallazgos corregidos.

## Comments

All 66 browser tests pass, including both trilingual four-width matrices, native keyboard workflows, Axe checks and the new storage/search regressions. Typecheck, lint, formatting and build pass. Independent Standards and Spec rechecks report no remaining findings; see [review](../review.md) and [delivery](../delivery.md).
