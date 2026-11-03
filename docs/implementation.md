# Bruma Café implementation

## Architecture

The agreed stack is React, TypeScript, Vite, React Router and react-i18next. Styling uses semantic CSS custom properties and styles owned by each screen or feature. Typography is locally hosted DM Sans and Cormorant Garamond.

The catalogue is a small, controlled demonstration dataset. A variant is identified by coffee, weight and preparation, independently of translated labels. Money stays in integer cents; the discount is rounded once on the subtotal before adding shipping.

Router state updates stay synchronous (`useTransitions={false}`) because the catalogue's controlled search reads URL state. Deferring those updates can overwrite recently typed characters while rendering is busy. The browser regression types three origin names rapidly with sixfold CPU throttling and verifies input, focus, results, URL and reload. This follows the [React controlled-input guidance](https://react.dev/reference/react/useTransition#updating-an-input-in-a-transition-doesnt-work) and the router's [documented transition opt-out](https://reactrouter.com/explanation/react-transitions).

Cart state belongs to a dedicated provider. Its browser adapter stores only versioned product identities, weights, preparation, quantities and the coupon; it validates restored content against available catalogue data. Language preferences have a separate brand-scoped key. Checkout field values remain in memory and are not part of cart persistence.

The checkout hook owns validation, pending state, duplicate-submit prevention and the controlled payment result. Approval captures an independent order snapshot before clearing the cart and coupon. Rejection preserves form and purchase data. The confirmation receives the completed order through navigation state; V2 also saves its receipt in browser-local history.

V2 keeps three distinct sets of rules outside presentation: deterministic preference matching, measured brewing recipes, and a cart-addition plan for reorders. The finder ranks only available coffees, explains actual matching preferences and labels approximate results. Recipes derive both dose and step quantities from validated water input, with primary reference links in the interface.

The history provider stores at most twenty validated receipts under `bruma.orders.v1`. Product names, variants, unit prices and amounts are independent snapshots; customer checkout fields are excluded. Unreadable records are discarded with feedback, and failed writes preserve the current visit in memory with an explicit persistence notice. Examples are clearly marked and available only when history is empty. Deletion requires confirmation. Before mutations the provider rereads persisted history; native storage events refresh other open tabs, protecting saved purchases from stale examples or later purchases in another tab.

Reorder review compares historical and current unit prices, shows requested and addable quantities, and excludes missing or sold-out coffees. Confirmation merges into the current bag with a combined limit of nine per variant, preserving its current coupon. Historical discounts are never restored and original receipts remain unchanged. Cancellation performs no mutation.

## Test boundary

The user approved testing the application through the browser. Tests interact with named, accessible controls and assert user-visible results, rather than internal functions or store implementation. Cases are independent; a single boundary does not imply one oversized test.

The responsive matrix covers 320, 768, 1024 and 1440 pixels in English, Spanish and Portuguese. Accessibility checks cover discovery, catalogue, product, bag, checkout validation, rejection and confirmation, complemented by keyboard navigation and visual inspection.

## Reviewed size exceptions

No TypeScript or TSX source file exceeds 200 lines at the implementation checkpoint. Some CSS files exceed that heuristic: each is scoped to one owning surface, and includes the responsive rules for that surface. Keeping those rules together is intentional. Locale dictionaries are cohesive translation resources.

## Dependencies

The development dependency tree uses a minimatch override at 11.0.1 or newer to address the advisory reported by npm. Lint, typechecking, build and browser behavior are verified with the resulting lockfile. The full npm audit was clean after the override. The [upstream advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) identifies 11.0.1 as the patched release.

## V1 delivery record

The eight approved vertical slices are implemented and resolved, with all 97 acceptance criteria marked. The final browser suite passed all 32 tests, including 12 complete purchase scenarios across three languages and four widths. Typechecking, lint, formatting, production build and the full dependency audit passed.

The independent Standards and Spec reviews identified three distinct P2 issues: search focus on query updates, repeated live announcements, and missing per-bag cart prices. Each was reproduced in a failing browser regression, corrected and re-checked by the reviewers. No actionable findings remain. See the delivery review in the project records.

## V2 verification

The approved [V2 specification](../.scratch/coffee-shop-v2/spec.md) and six [tickets](../.scratch/coffee-shop-v2/issues/) extend the same public browser test boundary. New coverage includes preference editing and language changes, approximate recommendations, measured recipes and validation, durable receipts without customer details, examples and deletion, corrupted/unavailable storage, retention after twenty-one purchases, and reorder pricing, limits, cancellation and coupon behavior.

The new workflow matrix covers all three languages at 320, 768, 1024 and 1440 pixels. Automated WCAG checks cover questions, results, valid/invalid recipes, empty/populated history, deletion confirmation, receipts and reorder review. Keyboard checks exercise radio progression, result focus and safe focus restoration on cancellation. Compact shared functional headings belong to the base stylesheet. No TypeScript or TSX source exceeds 200 lines.
