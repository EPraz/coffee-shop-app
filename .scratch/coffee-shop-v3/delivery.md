# Bruma V3 delivery checkpoint

Implementation and functional review are complete. Tickets 01–07 are resolved.
Ticket 08 is resolved after cloud publication and public verification.

## Implemented

- NestJS API, Prisma migrations and real PostgreSQL catalogue, variants, orders,
  dashboard aggregates and shared reset.
- Guest-only simulated checkout, signed quotes, transactional stock reservation,
  buyer-scoped receipt access and idempotent confirmation. No customer form PII
  is sent to the API. V2 receipts are not migrated.
- Shared password-free demo access at `/admin`; commercial editing of five fixed
  coffees, order progression/cancellation, 7/30-day metrics and reset confirmation.
- EN/ES/PT, USD, responsive layouts, keyboard/modal focus, actual result toasts,
  failed-draft preservation, conflicts, offline recovery and session renewal.

## Verification

- Complete suite before review corrections: **83/83 browser**, **11/11 public
  HTTP API**, using real isolated local PostgreSQL.
- New review regressions: three failures reproduced first, then all three passed.
- Follow-up: 14 affected browser tests passed; after contract/editor cleanup,
  **11/11 API** and **16/16 affected browser tests** passed again.
- Typecheck (frontend/backend), lint, format and production frontend build passed.
- Two independent reviewers closed all Standards and Spec findings. Details:
  [review.md](review.md). No TS/TSX source exceeds 200 lines.
- Restarted the development API and verified through public HTTP that its 25
  orders and the new purchase's Preparing state survived. Keyboard-only demo
  entry was verified in Chromium.
- No sibling PostgreSQL service/database was changed. Development/test use a
  separate local cluster on port 55437 with distinct databases. Secrets and the
  cluster remain ignored by Git. Dependency audit was clean after the scoped
  Prisma CLI dependency override.

## Walkthrough

Real connected local capture at `http://127.0.0.1:43174`, implementation commit
`e2291ec0b3f89fc4d6af2fa427855e513896670b`.

- 73 seconds, 1920 × 1080, 25 fps, H.264, no audio.
- 66 seconds mobile, 390 × 844 with touch; 7 seconds desktop, 1440 × 800.
- Actual USD 42.40 purchase, shared dashboard, order marked Preparing and buyer
  receipt showing the same live state. No browser errors during capture.
- English explanatory text, captions, transcript, chapters and poster refreshed.
- Complete export decoded successfully. Chronological sheets at two-second
  intervals were inspected; no blank or broken scenes were found.
- Export size: 4,917,238 bytes.
- SHA-256: `759dcf9b41babb10a0dc6c2975e0b7ca471620ae87248e02568727a51facf3ec`.
- Raw evidence remains ignored under
  `.scratch/walkthrough/take-1793754310461/` (manifest, render report, screenshots,
  video sources and review sheets).
- Updated player: **2/2 browser tests passed**, covering native playback, chapter
  seeking and focus, transcript, actual MP4 download, byte-range responses,
  EN/ES/PT navigation, supported widths and automated WCAG checks. Typecheck,
  lint, format and production build passed again with the final media.

## Published V3 — 2026-11-04

- Frontend: https://coffee-shop-app-nine-lilac.vercel.app
- API: https://bruma-cafe-api.onrender.com
- Render Free service: `srv-dbll07ei0phs73b1m85g`, Ohio, auto-deploy from main.
- Initial live API deploy: `dep-dbll07ui0phs73b1m9n0` at `a34dbc1`.
- Vercel production: `coffee-shop-1c2i1as89-eprazs-projects.vercel.app`, READY,
  GitHub main revision `a415a312f1e9a639ed8f4194775936f154ef87de`.
- Frontend source and media were deployed automatically by GitHub integration.
- Existing authenticated Render CLI session was successfully reused. No new API
  key was needed. No paid resource or unrelated service was changed.
- Neon was initially empty: all three migrations and the guarded sample seed
  succeeded. Existing V2 receipts were not imported.

Public HTTP checks passed both directly and through the Vercel proxy: anonymous
admin denial, buyer-owned receipts, server-priced/idempotent purchase, order
progression, cancellation restoring stock, dashboard, secure HttpOnly/Lax cookies
and logout. Three synthetic QA orders were cancelled; no global reset was run.

Actual Chromium production checks passed: 390px purchase with BRUMA15 for USD
42.40, admin progression to Preparing, buyer receipt reload, cancellation,
reset-modal cancellation, EN/ES/PT at 320/768/1024/1440 without overflow, and no
browser exceptions. Mobile/desktop screenshots were visually inspected.

Public video: 73 seconds, real playback, chapter seek, transcript, actual MP4
download and byte-range requests passed. The downloaded SHA-256 exactly matches
the reviewed local export. Evidence remains in ignored
`.scratch/runtime/cloud-api-{direct,proxy}.json`, `cloud-browser.json` and
`.scratch/qa/v3-public-admin-*.png`.

The captured footage remains honestly identified as a local connected recording.
The publication verification was performed against the actual public V3.
Free-service idle recovery was not separately timed; existing loading/retry UX
and the documented free-tier limits remain applicable.
