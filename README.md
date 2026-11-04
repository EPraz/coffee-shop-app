# Bruma Café

A responsive coffee-store portfolio built with React, TypeScript, NestJS and PostgreSQL. Discover five coffees, make a simulated purchase, then follow the same order through a shared store dashboard. English, Spanish and Portuguese; USD throughout.

V3 is published on Vercel, with a NestJS API on Render Free and PostgreSQL on Neon Free. [Deployment details](docs/v3-deployment.md).

[Explore the live demo](https://coffee-shop-app-nine-lilac.vercel.app) · [Watch the walkthrough](https://coffee-shop-app-nine-lilac.vercel.app/walkthrough)

[![Bruma: a mobile coffee store and connected studio](public/walkthrough/poster.jpg)](https://coffee-shop-app-nine-lilac.vercel.app/walkthrough)

The refreshed V3 walkthrough is a silent, 73-second, 1080p recording of the connected local application: a mobile purchase, the shared dashboard, order preparation and the buyer’s updated receipt, followed by seven seconds of desktop. The player provides English captions, chapters, a transcript and an MP4 download. [Recording and verification notes](docs/walkthrough.md).

## Explore V3

- Two coffees from Panama, one from Brazil, one from Colombia and one from Ethiopia. Choose 250 g or 500 g, whole bean or ground.
- Search by origin, filter by roast, or answer three questions in **Find your coffee** for explained recommendations.
- Apply **BRUMA15** for 15% off coffee. Simulated shipping is USD 5. Checkout offers **Fill demo details** and approved/rejected outcomes.
- The API calculates prices, confirms the order and reserves stock in one transaction. A changed offer returns to review before purchase; retrying an uncertain request cannot create a duplicate order.
- **My orders** keeps the last twenty receipts in the current browser. Receipts show the current backend status. **Order again** reviews current prices and stock before adding items.
- **Brew this coffee** offers measured V60 and French press recipes.
- Open **The studio** in the footer, or `/admin`, and choose **Enter demo account**. No password is needed.
- Explore real demo sales, average order value, trends, leading coffees, recent orders and low-stock alerts over seven or thirty days.
- Edit prices, availability and variant stock for the five fixed coffees. Advance orders from confirmed to preparing, shipped and delivered; cancellation is available before shipping and restores stock once.
- **Reset demo** asks for confirmation and restores the shared sample catalogue, stock and orders for everyone. Restarting the service preserves existing data.

This fictional portfolio store does not process payments or arrange deliveries. The demo account and all commercial data are shared. Checkout names, email addresses and delivery fields stay in the form and are never sent to the API or stored in the database. Guest receipt access is tied to an opaque browser cookie; there are no customer accounts or cross-device recovery. Clearing browser history does not delete the store’s orders. V2 receipts are not imported into V3.

## Run locally

Requires Node.js 24.13 or newer and PostgreSQL. Create separate development and test databases, then copy the examples into ignored files and supply their connection strings and distinct random session secrets of at least 32 characters:

```sh
npm ci
cp server/.env.example server/.env
cp server/.env.test.example server/.env.test
npm run api:build
npm run db:migrate
npm run db:seed
npm run dev
```

Open **http://127.0.0.1:43174**. The development runner starts both Vite and the API on port 43175. The sample URLs use a local PostgreSQL instance on port 55437; adjust them to your installation. Seeding initializes only an empty store.

## Verify

```sh
npx playwright install chromium
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:api
npm test
```

Tests exercise browser journeys and the public HTTP API against real, isolated PostgreSQL. The test runner refuses database URLs outside localhost or whose database name does not end in `_test`, then resets that test database. Run suites sequentially: they share the test API on port 43176. Browser tests use port 43173 and cover three languages, four widths, keyboard use, accessibility, failures, conflicts and connected order recovery.

## Architecture and project records

`src/features` owns storefront and studio workflows. `server` contains the NestJS API, Prisma schema and migrations. `shared` defines catalogue, order and dashboard contracts. PostgreSQL transactions serialize stock, purchase, cancellation and reset operations; signed HttpOnly cookies authorize demo administration and guest receipt access. The frontend calls `/api` on its own origin.

- [Approved V3 specification](.scratch/coffee-shop-v3/spec.md) and [delivery tickets](.scratch/coffee-shop-v3/issues/)
- [V3 deployment](docs/v3-deployment.md)
- [Walkthrough production notes](docs/walkthrough.md)
- [Domain glossary](GLOSSARY.md)
- [V2 specification](.scratch/coffee-shop-v2/spec.md) and [original MVP](.scratch/coffee-shop-mvp/spec.md)
- [Original image assets and prompts](docs/assets.md)

The hosting stack is Vercel for the frontend, Render Free for the API and Neon Free for PostgreSQL. `render.yaml` explicitly selects a free API service. Both Vercel and Render follow `main`; the frontend proxies `/api` to `https://bruma-cafe-api.onrender.com`. No secrets belong in Git or the React bundle.
