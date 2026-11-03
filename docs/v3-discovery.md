# Bruma V3 discovery

Status: discovery complete; consolidated scope confirmed by the owner on
2026-11-03.
The owner selected a portfolio store with a
free Render backend, React Router administration at `/admin` and a demo account.
The published application remains V2. V3 is defined, not yet implemented.
V3 starts with shared sample data; no V2 receipts or history will be migrated.

## Starting point

V2 is published and its six tickets are resolved. The application offers a
complete simulated purchase, explained coffee matching, measured V60/French
press guides, browser-local order history and reviewed reorder. The final V2
suite passes 66 browser tests.

Existing preferences carry forward: responsive web for the portfolio, public
visitor access, simulated payments, English/Spanish/Portuguese and USD. An App
Store release has not been requested.

History currently belongs to the browser and site origin. It stores product
snapshots and amounts without customer checkout details. There are no accounts
or remote database.

## Repository findings

- Order snapshots have no customer identity or fulfillment status. Remote
  continuity needs both durable storage and a rule for who owns each order;
  adding login alone would not provide that continuity.
- The catalogue contains five coffees in code, with whole-coffee availability.
  The nine-bag cart limit is not an inventory quantity. An operator/stock
  direction would introduce separate domain rules.
- Matching and brewing already have independent rules, so a deeper local
  preparation journey remains an alternative without remote infrastructure.

Read-only source review: order model/history storage, checkout controller,
catalogue, cart model, finder model and brewing model. No new tests were run
during this discovery.

## Decision frontier

- Q1, direction proposed by the owner: combine a backend with an administration
  panel, extending Bruma toward a full-stack portfolio store. This is a product
  direction proposal, not authorization to start implementation.
- Q2, approved: editable catalogue (products, prices and availability), stock
  per variant and order management with statuses. Purchases remain simulated.
  Q8 subsequently narrows catalogue scope: product creation is excluded to
  preserve the existing visual identity; Q10 resolves the permitted edits.
- Q3, approved: guest checkout only; no customer accounts in V3. The buyer's
  history stays tied to this browser, as resolved in Q5. Administration uses
  a separate demo account/session, as clarified in Q17.
- Repository and sibling-project fact-finding is complete.

Render hosting, demo-account access and shared demonstration data are decided.
The technical baseline and final delivery scope are confirmed.

## Approved operational boundaries

- Q4, refined by Q17 and Q18: administration is protected by a demo
  account/session. Visitors share the same demonstration store and its data.
  A personal owner login and separate stores per visitor are outside V3.
- Q5, approved: the buyer's history remains tied to this browser; orders persist
  in the database for store administration. No private recovery-link feature
  was selected.
- Q6, approved: confirmed → preparing → shipped → delivered, without reversing
  stages. The administrator may cancel before shipping (confirmed or preparing).
  Cancellation is a terminal state. Q7 resolves inventory effects.

## Inventory and demo decisions

- Q7, approved: decrement stock once for an approved confirmed purchase,
  restore it once for cancellation, and allow only one confirmation when two
  purchases compete for the last available unit. Rejected purchases do not
  consume stock.
- Q8, creation proposal declined: the owner prioritizes a visual dashboard and
  preserving the existing product photography/design. Do not introduce new
  coffee creation or arbitrary photo uploads. The owner suggested disabled
  buttons as a possibility; recommendation is to omit unavailable actions.
  Product archival is not approved by this answer.
- Q9, refined by Q18: connect the shared demo storefront and admin panel so a
  visitor can purchase, manage that order and inspect its updated status.
  Q20 confirms a reset action affecting the shared store for all visitors.

## Dashboard scope

- Q10, approved: keep the five coffee identities, editorial copy and images
  fixed. Allow editing prices, availability and stock, and managing orders.
  Omit unavailable create/upload actions rather than displaying disabled
  controls. Product creation, image uploads and archival are outside V3.
- Q11, approved: visual overview with demo sales, order count, average order
  value and low-stock indicators; sales trend, leading coffees and recent
  orders, calculated from the demonstration store's data.

## Dashboard data and purchase feedback

- Q12, approved: seed demonstration orders across the last 30 days and offer
  7/30-day filters. Reset returns the demo to its initial sample data; Q18 makes
  the store shared, so this action would affect all visitors.
- Q13, approved: demo sales use product amounts after discounts, excluding
  shipping and cancelled orders. Average uses the same non-cancelled set;
  order count includes cancelled orders. Stock alerts include variants with
  five or fewer bags; zero means sold out.
- Q14, approved with explicit UI instruction: recheck prices, availability and
  stock before confirmation. Use a simple modal to ask the buyer to review any
  changes while preserving the bag. Acceptance behavior is approved in Q15.
- Additional explicit instruction: administrative actions show a success/error
  toast reflecting the actual result. Failed edits retain entered values for
  correction/retry. This applies to the approved price, availability, stock,
  order-status, cancellation and demo-reset actions.

## Modal decision and infrastructure clarification

- Q15, approved: accepting the change modal applies the reviewed changes and
  returns to the final purchase review; the buyer confirms the order there.
- Q16, decided by the owner: zero budget; free services only. The backend will
  run on Render, following sibling portfolio projects. The existing React
  Router frontend will include `/admin`. This overrides the earlier hosting
  recommendation; no paid service or paid Render Blueprint is authorized.
- Q17, decided by the owner: use a demo account, as in KeelWatch and sibling
  portfolio projects. Do not introduce GitHub login or a personal administrator
  access flow. Guest purchases remain account-free. Demo session access must
  authorize only the permitted operations on the shared demonstration store.
- Sibling-project fact-finding is complete; established deployment and demo
  access patterns are recorded below.

## Sibling patterns and confirmed technical baseline

The owner explicitly identified KeelWatch and the sibling portfolio projects as
the desired precedent. Local source review confirms:

- KeelWatch uses React Router with protected application routes and buttons
  that issue a server-validated demo account session without passwords. It has
  no personal GitHub login requirement. The current README describes Vercel,
  a Render API and Neon Free PostgreSQL; its paid `render.yaml` is historical
  and is explicitly not the current free setup.
- projectManagement provides the directly reusable free deployment shape:
  Vercel React frontend, Render Free NestJS backend, Prisma and Neon PostgreSQL,
  with `/api` proxying before the frontend SPA fallback.
- Both siblings use shared synthetic demo data. Q18 explicitly selects that
  same shared-store behavior for Bruma, replacing earlier isolation proposals.

Confirmed baseline: preserve the existing React Router frontend and add `/admin`
with a familiar Enter demo account flow; use NestJS/Prisma and Neon PostgreSQL
behind a Render Free API. This follows sibling patterns while keeping Bruma's
own order rules, fixed catalogue and permitted demo operations. Service setup and
implementation have not started during this discovery.

Sources inspected locally: KeelWatch README, demo-session service, protected
routes and public-demo-access decision; projectManagement deployment docs,
Render Free configuration, API proxy and demo-auth controller. No credentials
were read and no resources were created.

## Shared data and version boundary

- Q18, decided by the owner: one shared demonstration store. Prices, stock and
  administrative orders are shared across visitors. Separate visitor stores
  and their proposed 24-hour expiry are withdrawn.
- Q19, decided by the owner: no migration from V2. The published V2 has no
  meaningful usage to preserve. V3 starts with its own sample data; V2 browser
  receipts are not imported into the database, history or dashboard metrics.
- Version clarification: V2 remains published while this document defines V3.
  No V3 implementation or infrastructure provisioning has started.
- Q20, approved: Restablecer demo restores the initial sample prices, stock and
  orders for all visitors. Require a confirmation modal and show a success/error
  toast reflecting the actual result.

## Confirmed consolidated scope

- Portfolio-only V3: responsive storefront, guest simulated checkout, three
  languages and USD; preserve the five coffees and their visual identity.
- A visual `/admin` dashboard, accessed through a password-free demo account
  with server-validated permissions; one shared synthetic demonstration store.
- Edit prices, availability and variant stock; manage order progression and
  cancellation, with inventory consistency and purchase revalidation.
- Dashboard metrics, sales trend, leading coffees, recent orders and stock
  alerts from database orders; 7/30-day filters and seeded sample orders.
- Confirm shared reset before restoring sample prices, stock and orders;
  report administrative success/failure through toasts.
- No V2 migration, customer accounts, new coffees or image uploads.
- Confirmed implementation baseline: existing React frontend on Vercel,
  NestJS/Prisma API on Render Free and PostgreSQL on Neon Free.
- Confirmed delivery: verify connected purchase/administration flows and backend
  rules, update README and refresh the short walkthrough with explanatory text,
  primarily mobile with a brief desktop view, following prior preferences.

Product decisions Q1–Q20 are resolved. The owner confirmed this consolidated
scope and the technical/delivery baseline on 2026-11-03. Discovery is complete;
specification, tickets and implementation are subsequent workflow steps.

## Backend/deployment findings (2026-11-03)

Read-only research against current primary documentation found two viable
directions. No service was provisioned and no credentials were inspected.

- Existing Vite/React Router can stay on Vercel with a TypeScript API and managed
  PostgreSQL. Vercel supports Node/TypeScript functions without Next.js; database
  hosting comes from a separate provider. Neon is a candidate. This minimizes
  new hosting surfaces and supports one browser origin.
  [Vercel Node runtime](https://vercel.com/docs/functions/runtimes/node-js),
  [Postgres on Vercel](https://vercel.com/docs/postgres),
  [Neon serverless driver](https://neon.com/docs/serverless/serverless-driver).
- A separate NestJS service offers conventional controllers, guards, validation
  and independent deployment, adding another running service. Vercel also
  supports NestJS as a single Function; framework and hosting are separate
  choices. [Nest deployment](https://docs.nestjs.com/deployment),
  [NestJS on Vercel](https://vercel.com/docs/frameworks/backend/nestjs).
- Runtime limits, database quotas and idle behavior matter for a public demo.
  Vercel Hobby is intended for personal noncommercial projects. Neon Free has
  usage/storage limits and scales to zero. Render Free services sleep when idle;
  its Free PostgreSQL expires after 30 days, so it is not the recommended durable
  database for this portfolio. Render backend and zero budget are now fixed;
  Neon Free is the confirmed durable database, consistent with sibling projects.
  [Vercel Hobby](https://vercel.com/docs/plans/hobby),
  [function limits](https://vercel.com/docs/functions/limitations),
  [Neon pricing](https://neon.com/pricing),
  [Render Free](https://render.com/docs/free).
- Either approach needs server-authorized demo sessions and store-scoped
  access. Stock confirmation/cancellation require database transactions and
  idempotency; process memory cannot be the authority. Current SPA rewrites must
  preserve API routing. [Vercel rewrites](https://vercel.com/docs/routing/rewrites),
  [PostgreSQL locking](https://www.postgresql.org/docs/current/explicit-locking.html).

## Resolved domain language

Catalogue and stock are recorded in the root glossary. Stock is the number of
sellable bags for a variant; it is distinct from the existing nine-bag cart
limit. Administrator, order state and demo store are also recorded. Inventory
effects, the connected demo flow, dashboard/editing scope and metric definitions
are approved, including modal acceptance. Render, zero budget, React Router
`/admin`, demo-account access, shared data and no V2 migration are decided.
Shared reset and the consolidated technical/delivery scope are approved.
