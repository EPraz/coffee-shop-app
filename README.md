# Bruma Café

A complete, responsive coffee-store portfolio built with React and TypeScript. Find a coffee for your taste, prepare it with a measured guide, and revisit your demo orders. Five coffees, four origins and three languages.

[Explore the live demo](https://coffee-shop-app-nine-lilac.vercel.app) · [Watch the 73-second walkthrough](https://coffee-shop-app-nine-lilac.vercel.app/walkthrough) · [Download MP4](https://coffee-shop-app-nine-lilac.vercel.app/walkthrough/bruma-walkthrough.mp4)

[![Bruma V2: coffee matching, purchase, brewing and reorder on mobile](public/walkthrough/poster.jpg)](https://coffee-shop-app-nine-lilac.vercel.app/walkthrough)

The silent, 1080p walkthrough follows coffee matching, a complete purchase, brewing guidance and reorder on a real mobile viewport, then ends with a brief desktop view. The player includes chapters, English captions and a transcript. [Recording and verification notes](docs/walkthrough.md).

## Run locally

Requires Node.js 24.13 or newer.

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:43174**.

## Verify

```sh
npx playwright install chromium
npm run typecheck
npm run lint
npm run format:check
npm run build
npm test
```

Browser tests start an isolated server on port 43173. They cover public user journeys, monetary calculations, persistence, all three languages, four viewport widths, keyboard navigation, and automated accessibility checks.

## Explore the demo

- English, Latin American Spanish and Brazilian Portuguese; USD in every language.
- Two coffees from Panama, one from Brazil, one from Colombia and one from Ethiopia.
- Choose 250 g or 500 g, whole bean or ground. Volcán is intentionally sold out.
- Search by coffee or origin, filter by roast, and compare 250 g prices.
- Group identical variants in the bag, edit quantities (maximum nine) and return later in the same browser.
- Apply **BRUMA15** for 15% off products. Demo shipping is USD 5.
- Use **Fill demo details / Llenar demo / Preencher demo** at checkout.
- Select **Rejected** to test recovery, then **Approved** to complete the demo order.
- Answer three questions in **Find your coffee** for an available recommendation and an alternative, with clear matching reasons.
- Open **Brew this coffee** from a product or confirmation. Choose V60 or French press and 250–500 ml of water for measured doses and steps, with reference sources.
- Open **My orders** for the last twenty demo receipts. With empty history, load two clearly marked examples to explore historical prices and unavailable products.
- Use **Order again** to review current prices and addable quantities before merging into your bag. Its current coupon is preserved; old discounts are not restored.

This is a fictional portfolio brand. No payments, card collection, actual orders or deliveries are involved. Checkout details are not sent to a service.

Order history is saved only in this browser and can be cleared with confirmation. It contains product snapshots and amounts, without customer names, email or addresses. There are no accounts, remote database or cross-device synchronization. If browser storage fails, the interface reports that changes last only for the current visit.

## Structure and project records

Feature-owned screens, UI and workflow hooks live together. Domain calculations and browser persistence stay outside presentation components. Route composition stays in the application shell.

- [Approved V2 specification](.scratch/coffee-shop-v2/spec.md)
- [V2 implementation tickets](.scratch/coffee-shop-v2/issues/)
- [Original MVP specification](.scratch/coffee-shop-mvp/spec.md)
- [Domain glossary](GLOSSARY.md)
- [Architecture and verification notes](docs/implementation.md)
- [Original image assets and prompts](docs/assets.md)

For a production preview, run `npm run build` and `npm run preview`. A hosting service must route application URLs to the entry document for client-side navigation.

## Deployment

The demo is hosted on Vercel. `vercel.json` configures the Vite build and direct-entry routing. To publish manually from a linked checkout:

```sh
npx vercel --prod
```

The Vercel GitHub integration is connected to `EPraz/coffee-shop-app`. Pushes to `main` automatically deploy to production. [Publication record](docs/publication-and-walkthrough.md).
