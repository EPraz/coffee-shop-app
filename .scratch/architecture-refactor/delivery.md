# Architecture delivery

Date: 2026-11-04.
Published V3 baseline: `d302e195a0b074a1946d655dcf395699d28d5378`.
Refactor implementation: `3a16ef7` and review correction `4d9956b`.

## Result

The repository now separates `apps/web`, `apps/api` and `packages/contracts`.
React features own their screens and styles; shared UI and transport depend on
neither application features nor backend internals. NestJS feature modules own
their controllers and providers with explicit imports and exports. Database and
HTTP infrastructure have clear owners. Public workflow tests live under `tests`.

The owner requested finishing V3 publication first. That publication was completed
and publicly verified before the architecture work started. This refactor changes
no product rules, public routes, schema, migrations, catalogue media or walkthrough.
Existing ignored environment files moved to `apps/api/` without content changes.

## Prevention

The earlier review relied on small files and working flows without separately
checking responsibility boundaries and application composition. The backend grew
without an explicit module decision, while shared data and styles accumulated
mixed ownership. Functional checks alone could not detect that structural drift.

`AGENTS.md` now requires the portable checkpoint in `docs/agents/architecture.md`
before adding application/backend/auth/admin/persistence responsibilities and
before closing implementation. ADR 0001 records this project's decision.
`npm run check:architecture` checks configured dependency direction, contracts,
cycles, explicit module imports and provider ownership. A forbidden-import probe
demonstrated that the gate rejects a real violation.

The checkpoint can be reused in other projects with their own ADR and audit
configuration. No user-wide instruction or sibling repository was modified.

## Validation

See [the independent reviews](review.md). Standards: one P2 startup finding fixed
and rechecked, zero outstanding. Spec: zero material findings.

- Lint, TypeScript, format, architecture audit and both production builds pass.
- Public HTTP regression: 11/11. Browser regression: 86/86.
- Fresh-output development smoke: `dev:web` and `dev` compile contracts, recover
  a forced initial catalogue failure and render a real product without JS errors.
- Dashboard screenshots at 320px and 1440px were visually inspected.
- Schema, original images and walkthrough contents match the V3 baseline.

## Publication

Both providers automatically deploy `main`. Vercel uses the root build and
`apps/web/dist`. Render retains service `srv-dbll07ei0phs73b1m85g`, Free plan,
Ohio region and the same Neon database. Its saved start command was changed to
the backwards-compatible named `@bruma/api` workspace before pushing.

## Public verification

Verified application revision: `4d9956bb9f9d463fcd538aab3dbb2ae517f02cd3`.

- Render deploy `dep-dblljqe7bikc7395dscg`: **live**, triggered by the new commit.
- Vercel deployment `coffee-shop-nf3i2mn8v-eprazs-projects.vercel.app`: **READY**.
  The canonical frontend serves the same `index-D3BbrcfZ.js` asset as the local
  production build. Both direct and same-origin health routes return HTTP 200.
- Three pre-existing cancelled synthetic purchases retain their exact number,
  state and version. Catalogue generation is unchanged across restart. This
  demonstrates data preservation rather than simply checking a seeded catalogue.
- Direct Render and Vercel-proxied HTTP checks pass: anonymous admin denial,
  guest ownership, server totals, idempotent confirmation, demo access, order
  progression, cancellation restoring stock, dashboard, secure cookie and logout.
- Public Chromium passes a 390px purchase of ground Niebla 500g with BRUMA15,
  USD 42.40 total, admin preparation, buyer receipt reload and cancellation.
- English, Spanish and Portuguese fit 320, 768, 1024 and 1440px without overflow.
  No browser page errors were recorded. Reset confirmation was cancelled; no
  public shared reset was executed.
- The 73-second walkthrough plays, seeks and downloads with byte-range support.
  Download SHA-256 remains
  `759dcf9b41babb10a0dc6c2975e0b7ca471620ae87248e02568727a51facf3ec`.

Verification created three new synthetic orders and cancelled each, restoring
its stock. The shared store, guest cookies, public origins and free plans remain
in place. Ignored runtime JSON reports and screenshots are under `.scratch/`.

Live app: https://coffee-shop-app-nine-lilac.vercel.app
Admin: https://coffee-shop-app-nine-lilac.vercel.app/admin
API: https://bruma-cafe-api.onrender.com
