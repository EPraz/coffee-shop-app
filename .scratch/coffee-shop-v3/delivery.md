# Bruma V3 delivery checkpoint

Implementation and functional review are complete. Tickets 01–07 are resolved.
Ticket 08 remains open for cloud publication and public verification.

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

## Remaining publication work

The public application remains V2 at
`https://coffee-shop-app-nine-lilac.vercel.app`. No V3 push, cloud resource,
database migration or API rewrite has been performed against production.

The configured stack is **Render Free API + Neon Free PostgreSQL + Vercel**.
`render.yaml` explicitly creates a free API only. The frontend rewrite is kept
unchanged until an actual ready API URL exists. No paid fallback is authorized.

Render/Neon CLI credentials are absent from standard configuration and the
repository has no configured secrets. Browser inventory reports that its access
host is unavailable; selecting the observed Chrome window twice expired waiting
for Computer Use app authorization. These were tool authorization timeouts,
not rejections by automatic shell approval review. Account access is the concrete
external dependency for the remaining work.

Next: establish user-provided account access, provision only free resources,
deploy migrations and initial data, verify API health, activate the real Vercel
rewrite, push/deploy, then test public routes, cookies, purchase, administration,
reset, video playback, downloads and byte ranges. Follow
[the deployment checklist](../../docs/v3-deployment.md).
