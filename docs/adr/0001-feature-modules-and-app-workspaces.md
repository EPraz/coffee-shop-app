# Application workspaces and feature modules

## Status

Accepted by the owner, 2026-11-04.

## Context

V3 grew from a frontend-only prototype into a connected store. Its React features
were grouped, but NestJS used one flat directory and an inline application module.
Styles had inconsistent ownership and shared catalogue data mixed contracts with
server-owned sample/editorial definitions. Small files and functional tests did
not reveal these structural problems.

The owner approved reorganizing the existing application after its V3 publication.
The refactor preserves behavior, public routes, data, original visuals and hosting.

## Decision

- Use npm workspaces: `apps/web`, `apps/api` and `packages/contracts`.
- React's application composition lives in `app`; feature-owned screens, hooks,
  models and styles stay in their feature. Administration has dashboard, catalogue,
  order and demo surfaces, plus genuinely reused administrative helpers.
- Browser-wide primitives live under `shared/ui` and `shared/api`. Shared UI
  depends on neither store features nor the backend.
- NestJS uses access, catalogue, checkout, orders, dashboard, demo and health
  modules. Each module owns its controllers, validation and services, with explicit
  imports/exports. Database infrastructure has one provider owner. HTTP/security
  plumbing is separated from commercial workflows.
- `packages/contracts` owns wire types, state vocabulary and stable identity
  encoding. Fixed product definitions and samples are owned by API modules;
  browser stock-selection helpers are owned by the catalogue feature.
- Keep real browser and public HTTP tests under `tests/browser` and `tests/api`.
  Their isolated local database guard and public test seams remain unchanged.
- Record architecture checkpoints in agent instructions and run a deterministic
  import/module audit alongside typecheck, lint, build and regression suites.

## Consequences

Workspace build ordering and deployment paths become explicit. The contracts
package is built before either application. Vercel and Render retain their public
origins and database; only build/output paths change. No schema or data migration
is part of this refactor.

Modules use existing Prisma services and transactions. Introducing repository
wrappers, event buses, a new state library or additional deployable services would
add interfaces without a present need and is outside this decision.
