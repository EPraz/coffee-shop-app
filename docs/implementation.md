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

The development dependency tree uses a minimatch override at 11.0.1 or newer to address the advisory reported by npm. Lint, typechecking, build and browser behavior are verified with the resulting lockfile. The full npm audit was clean after the override.

## Delivery record

The eight approved vertical slices are implemented. Final verification and the two-axis code review are recorded at completion below.
