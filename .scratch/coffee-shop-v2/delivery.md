# Bruma V2 delivery

Status: complete. All six approved tickets are resolved.

## Delivered scope

- Three-step coffee finder with deterministic available matches, alternatives and honest explanations.
- V60 and French press guides with validated water quantities, coherent doses/steps and primary references.
- Browser-local history of the latest twenty demo orders, independent product/price snapshots, two marked examples and confirmed deletion. Customer checkout details are excluded.
- Reviewed reorder with historical/current prices, unavailable-product notices, merged quantity limits and preservation of the current cart coupon.
- English, Latin American Spanish and Brazilian Portuguese, responsive layouts and compact functional titles.
- Updated README and a 73-second production walkthrough, primarily mobile with a brief desktop ending.

## Validation and review

The final complete Chromium browser suite passes **66/66 tests** (3.0 minutes). Typecheck, lint, formatting and production build pass. Both purchase and V2 workflow matrices cover three languages at 320, 768, 1024 and 1440 pixels. Axe checks, keyboard navigation, storage recovery, retention after twenty-one purchases, two-tab failed-write/deletion recovery and rapid typing on a constrained device pass. Rapid origin typing also passes three separate repetitions.

The [independent Standards and Spec review](review.md) reports no remaining findings after corrections and rechecks. Baseline: `d0e2856d05b02f1f06650f88f5e772367681793d`.

## Publication

- [Live demo](https://coffee-shop-app-nine-lilac.vercel.app).
- [Public repository and README](https://github.com/EPraz/coffee-shop-app).
- Application recording commit: `3b2767cd62823e56a7612178d36fc228dbb20c4e`, automatic deployment `dpl_5vvCVebyRJxeemV9z4yhDGCsAPin`.
- Published application/media release: `dcc196de0ea5ff3f884500429471a221f00468b0`, automatic deployment `dpl_4atwCPfrcT5aW9WP9X6cmv6kNu5Q`, Ready and aliased to the public domain.
- Direct entry to home, finder, guide, history, receipt, reorder and walkthrough returns HTTP 200.
- Public recipe outputs, two example orders and reviewed reorder at USD 78.50 pass without browser errors.
- The public GitHub README and poster return HTTP 200; the poster's bytes match the reviewed local image.
- Commits use the agreed type, scope and concrete-result convention; existing history is preserved. Pushes from main continue deploying automatically.

## Recording and reviewed export

The real production recording lasts **73 seconds**: 66 seconds at mobile 390×844, followed by seven seconds at desktop 1440×800. Its nine scenes show Niebla Geisha recommended by preferences, 500 g ground, BRUMA15 purchase at USD 42.40, measured brewing guidance, a stored receipt and reviewed reorder at USD 49.00. Rehearsal and final recording complete without browser errors.

- H.264 MP4: 1920×1080, 25 fps, no audio, fast-start enabled.
- Size: **5,923,263 bytes**.
- SHA-256: `7a28bdfbe73d23ca1597101f2c642bf2818e1699520b0db07b8d77f59f7e018e`.
- Complete exported video decode: passed.
- All four chronological review sheets (sampled every two seconds) and the full-resolution poster were visually inspected. The poster uses the recommendation at 14 seconds.
- Nine chapters, English WebVTT, embedded explanatory text and transcript agree. Localized player duration uses shared metadata.
- Public native playback, chapter seeking to 66 seconds, transcript and actual MP4 download pass at 390 px and 1440 px without browser errors.
- HTTP 206 byte ranges pass. The public MP4's full size and SHA-256 match the reviewed export.

The raw local take and render report are under `.scratch/walkthrough/take-1793742952700/` (ignored). Reproduction commands and the current sequence are in [walkthrough notes](../../docs/walkthrough.md).

## Deliberate limits

This remains a portfolio web demo. No accounts, remote database or real payments were added. History belongs to this browser/origin; genuinely unsaved receipts last only for the current visit if storage fails, and the interface explains that limit. It is not cross-device order synchronization.
