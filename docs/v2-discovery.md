# Bruma V2 discovery

Status: interview complete. The owner confirmed Q1–Q14, including feature rules
and delivery. This is the agreed discovery record, not an implementation spec;
no V2 implementation has started.

## Confirmed direction

The owner chose to keep Bruma as a portfolio project. An App Store release and
an independent native mobile product are outside the current V2 scope.
The owner approved a frontend-only responsive web experience, with simulated
guest checkout, no accounts or backend, and order history stored in the browser.
All three proposed features are included: coffee matching, an interactive
brewing guide and demo order history with reorder.

## Starting point

Bruma already has a complete simulated guest purchase, five coffees, three
languages, persistent cart and coupon, responsive layouts, browser tests, public
deployment and a short product walkthrough.

- `src/features/catalog/coffee.ts` describes origin, roast, availability and
  variant prices. Tasting copy is translated text rather than structured
  matching data.
- `src/features/catalog/useCatalog.ts` supports name/origin search, roast
  filtering and price ordering. It does not guide a visitor through preferences.
- `src/features/checkout/checkout-model.ts` captures an independent order
  snapshot. Confirmation uses navigation state, with no order-history feature.
  A fresh direct visit without that state has no receipt to display; a browser
  reload may retain the history state.

## Approved feature set

Prioritize a connected journey: choose a coffee, prepare it and return for it.

1. **Find your coffee:** a short preference flow that recommends an available
   coffee and explains its match. Start with explicit rules and structured
   product attributes so results are consistent across languages.
2. **Interactive brewing guide:** choose V60 or French press and a water
   quantity, then see suggested coffee grams and preparation steps. Reference
   recipes have been researched against primary sources below.
3. **Demo order history and reorder:** revisit completed demo purchases and
   prepare a new cart from a previous selection. Historical amounts and current
   prices/availability need separate treatment. Retain the last 20 completed
   orders and provide a clear-history action. Customer form details remain
   temporary. Reorder opens a review before merging the confirmed selection
   into the existing bag at current prices.

These are product recommendations, not evidence of measured conversion gains.
The approved scope consists of these three cohesive improvements, preserving
the three interface languages and the mobile-first presentation.

Reference for the preparation direction:
[Onyx Coffee Lab brew guides](https://onyxcoffeelab.com/pages/brew-guides), which
provide method-specific coffee/water amounts and preparation steps.

## Brewing references

Primary-source research found these reference recipes:

- [Hario USA: Ultimate V60 Technique](https://www.hario-usa.com/blogs/recipes-and-more-from-friends/james-hoffmann-uitimate-v60-technique):
  30 g coffee / 500 ml water; bloom with twice the coffee weight, then staged
  pouring. The reference brew targets about 3:30 total.
- [ESPRO French Press Brewing Guide](https://espro.com/blogs/brew-guide/french-press):
  a 1:15 coffee/water reference for medium roast, coarse grind, four minutes
  steeping and a slow press. The source also provides roast-dependent ratios.

Source timings are indicative when scaling the reference volume; they are not
a guarantee for every amount or device capacity. Reversible engineering defaults
to formalize in the spec: 500 ml initially, 250–500 ml in 50 ml increments,
coffee doses rounded to 0.1 g, V60 based on 30 g / 500 ml, and a French press base
ratio of 1:15. Explain that these are starting recipes and the selected amount
must fit the brewer.

## Resolved decisions

- Q1 resolved: portfolio project; no App Store release for now.
- Q2 resolved: frontend-only demo with browser persistence, guest checkout and
  simulated purchases.
- Q3 resolved: include coffee matching, brewing guide and demo history/reorder.
- Q4 resolved: three questions (preferred flavours, intensity, black/with milk),
  one main recommendation and one alternative, both available and explained.
- Q5 resolved: V60 and French press; choose water quantity, calculate coffee
  grams and show preparation steps.
- Q6 resolved: last 20 completed orders with date, products, variants and amounts;
  clear-history action; customer form details stay temporary.
- Q7 resolved: preview current prices and unavailable items before confirming
  the selection to merge into the existing bag.
- Q8 resolved: finder from home/catalogue, guides from product/confirmation and
  order history in navigation.
- Q9 resolved: each browser has its own history. Navigation entry points do not
  introduce accounts or login. No remote database or synchronization is needed.
- Q10 resolved: exclude unavailable variants and cap the combined quantity at
  nine per variant, with exact additions visible before confirmation. Eight in
  the bag plus three requested means adding one. If nothing can be added, the
  review explains why and cannot confirm an empty addition.
- Q11 resolved: keep the current bag's coupon, without restoring an old order's
  discount. Reorder amounts use current prices and current coupon conditions.
- Q12 resolved: show the nearest available matches with an honest explanation
  if there is no exact match; show one result if only one is available. A fully
  unavailable catalogue needs a useful empty state.
- Q13 resolved: offer two clearly identified example orders when history is
  empty, demonstrating reorder review and its notices.
- Q14 resolved: update README, re-record the walkthrough at about 60–75 seconds
  and publish V2 on Vercel.

The decision frontier is empty. The owner's final “yes to all” confirms the last
five rules. The next workflow step is to formalize this record into a V2 spec
before implementation.

## Persistence boundary

The proposed order history belongs to the same browser profile and site origin.
It can survive closing and reopening the browser but is not synchronized to
another device/browser. Clearing site data removes the local history. The owner
explicitly confirmed this boundary for the simulated frontend portfolio.

Technical reference: [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Implementation constraints to carry into the spec

Cart lines merge by coffee, weight and preparation, with a maximum of nine bags
per variant. Cart prices come from the current catalogue. Approved checkout
clears the cart and coupon; rejected checkout creates no completed order.

Order snapshots currently have no date or product-name snapshot. Customer form
details remain in component memory. History will need its own durable product
information because current receipt rendering relies on catalogue lookups.

Historical receipts preserve the recorded product information and amounts;
reordering creates a current-price cart selection without modifying that receipt.
The two example orders are explicitly examples, not newly completed purchases.

Preserve English, Spanish and Portuguese, USD pricing, the existing catalogue,
guest checkout and responsive layout. Extend browser verification across the new
flows and keep the existing purchase and accessibility checks passing. The V2
headings should follow the compact functional hierarchy established for the bag.

Storage errors and invalid saved data need graceful recovery. If history cannot
be persisted, the active demo purchase remains usable and persistence feedback
must accurately describe what was retained.

No architecture decision record is warranted yet. The glossary now includes the
approved concepts of a coffee recommendation and order history.
