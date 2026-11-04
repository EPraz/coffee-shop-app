# V3 deployment

The approved stack is Vercel for React, Render Free for NestJS and Neon Free
PostgreSQL. No paid resource is required. V3 starts with its own sample data;
there is no V2 receipt or browser-history migration.

## Deployment order

1. Create a Neon project on the Free plan, preferably near the Render region.
   Keep its connection string outside Git. Use SSL and a small connection pool
   (for example, `connection_limit=5`) for this portfolio service.
2. Create the Render service from the repository's `render.yaml`. It explicitly
   selects `plan: free`; do not accept a paid database or service substitution.
   Supply the Neon URL as `DATABASE_URL`. Render generates `SESSION_SECRET`.
3. Check `ALLOWED_ORIGINS` includes the exact public frontend origin. Add a
   separate preview origin explicitly when needed; do not enable every origin.
4. Render builds the API, deploys migrations and seeds only an empty store.
   Restarting or redeploying must preserve existing orders and stock. The
   confirmed Reset demo action is the intentional way to restore samples.
5. Verify the actual Render URL and `/health`. Only then add an `/api/:path*`
   Vercel rewrite to that service, before the frontend SPA fallback. Do not
   publish a guessed API URL or switch the live frontend before the API is ready.
6. Publish the frontend through the existing GitHub–Vercel integration and
   verify public direct routes, demo access, purchase, order state, dashboard,
   cancellation and shared reset using synthetic data.
7. Verify README links, the refreshed walkthrough, byte-range playback and MP4
   download. Record the deployment identifiers and commit in the delivery log.

## Access and data

- The public storefront needs no account. The demo account is entered through
  `/admin` and is authorized by the backend for one hour.
- Cookies are HttpOnly and Secure in production. The frontend calls the API
  through its own origin; secrets never enter the React bundle.
- Buyer receipt access is tied to an opaque cookie in that browser. Form name,
  email and address are not sent to the API or stored in the database.
- Five coffees and their photos/editorial identity stay fixed. The shared demo
  permits only the commercial edits and order actions approved in the spec.
- Reset affects all visitors and removes their demo purchases from the backend.
  Their browser receipts show that the corresponding shared order is no longer
  present. Demo sessions continue to work.
- A bounded process budget returns `429` with `Retry-After` when the shared demo
  is busy. Database transactions remain the authority for purchases and stock.

## Free service behavior

Render Free can sleep after inactivity, and Neon Free has usage/storage limits
and can scale down while idle. The interface explains waiting and offers retry;
it never substitutes a successful local order for a failed backend call.
See [Render Free](https://render.com/docs/free),
[Render Blueprint reference](https://render.com/docs/blueprint-spec) and
[Neon plans](https://neon.com/pricing).

Render's Free PostgreSQL service is not used for the durable database. The
checked-in Blueprint creates only the API; PostgreSQL stays on Neon Free.

## Published V3

- Frontend: https://coffee-shop-app-nine-lilac.vercel.app
- API: https://bruma-cafe-api.onrender.com
- API health: https://bruma-cafe-api.onrender.com/health
- Same-origin health: https://coffee-shop-app-nine-lilac.vercel.app/api/health
- Render service: `srv-dbll07ei0phs73b1m85g`, explicitly Free, Ohio.
- Vercel project: `prj_JnB0HSipURlXElc2tWItYb9zgCqZ`.

The user created Neon Free and supplied its connection through an ignored local
file. SSL connectivity, three migrations and the initial seed succeeded. Ohio
matches the database region. No V2 data was imported. The release branch enabled
the first API build while production remained on V2; both providers now follow
`main` with automatic deployments.

The existing Render CLI session used by sibling projects was discovered and
successfully reused. A new API key was unnecessary. For future deployments,
check installed provider clients and their standard authenticated sessions before
asking the user to create credentials. See [the delivery record](../.scratch/coffee-shop-v3/delivery.md)
for public HTTP/browser checks and actual deployment revisions.

## Workspace deployment paths

The architecture refactor keeps the existing Render service, Vercel project,
Neon database and public origins. Both providers build from the repository root.
Render uses `npm ci --include=dev && npm run api:build`; the root script compiles
contracts before the API. Its saved start command is
`npm run db:migrate && npm run db:seed && npm start --workspace @bruma/api`.
The named workspace works with both the original and reorganized layouts, so
the service command was updated before publishing the refactor.

Vercel uses `npm run build` and the checked-in `vercel.json` output directory
`apps/web/dist`. API rewrites and SPA routes are unchanged. The ignored local
deployment connection file now lives at `apps/api/.env.deploy`; it is never
included in a commit or frontend build. There are no new migrations or resets.
