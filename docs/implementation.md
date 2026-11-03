# Bruma Café implementation

## Architecture

The agreed stack is React, TypeScript, Vite, React Router and react-i18next. Styling uses semantic CSS custom properties and styles owned by each screen or feature. Typography is locally hosted DM Sans and Cormorant Garamond.

The catalogue is a small, controlled demonstration dataset. A variant is identified by coffee, weight and preparation, independently of translated labels. Money stays in integer cents; the discount is rounded once on the subtotal before adding shipping.

Cart state belongs to a dedicated provider. Its browser adapter stores only versioned product identities, weights, preparation, quantities and the coupon; it validates restored content against available catalogue data. Language preferences have a separate brand-scoped key. Checkout field values remain in memory and are not part of cart persistence.

The checkout hook owns validation, pending state, duplicate-submit prevention and the controlled payment result. Approval captures an independent order summary before clearing the cart and coupon. Rejection preserves form and purchase data. The confirmation receives the completed order through navigation state, without creating an order-history feature.

## Test boundary

The user approved testing the application through the browser. Tests interact with named, accessible controls and assert user-visible results, rather than internal functions or store implementation. Cases are independent; a single boundary does not imply one oversized test.

The responsive matrix covers 320, 768, 1024 and 1440 pixels in English, Spanish and Portuguese. Accessibility checks cover discovery, catalogue, product, bag, checkout validation, rejection and confirmation, complemented by keyboard navigation and visual inspection.

## Reviewed size exceptions

No TypeScript or TSX source file exceeds 200 lines at the implementation checkpoint. Some CSS files exceed that heuristic: each is scoped to one owning surface, and includes the responsive rules for that surface. Keeping those rules together is intentional. Locale dictionaries are cohesive translation resources.

## Dependencies

The development dependency tree uses a minimatch override at 11.0.1 or newer to address the advisory reported by npm. Lint, typechecking, build and browser behavior are verified with the resulting lockfile. The full npm audit was clean after the override. The [upstream advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) identifies 11.0.1 as the patched release.

## Delivery record

The eight approved vertical slices are implemented and resolved, with all 97 acceptance criteria marked. The final browser suite passed all 32 tests, including 12 complete purchase scenarios across three languages and four widths. Typechecking, lint, formatting, production build and the full dependency audit passed.

The independent Standards and Spec reviews identified three distinct P2 issues: search focus on query updates, repeated live announcements, and missing per-bag cart prices. Each was reproduced in a failing browser regression, corrected and re-checked by the reviewers. No actionable findings remain. See the delivery review in the project records.
