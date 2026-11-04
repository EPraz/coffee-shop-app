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

## Current publication checkpoint

The published application remains V2 until the V3 API and database are ready.
No V3 changes have been pushed or deployed at this checkpoint. No Render/Neon
credentials are present in the process environment or repository secrets.
The browser access host was unavailable, and the native Chrome tool request
expired waiting for app authorization. Complete account access before creating
cloud resources or activating the API rewrite; no paid fallback is authorized.
