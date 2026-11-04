# Architecture refactor

Status: resolved
Baseline: `d302e19` (V3 published and publicly verified).

Owner-approved order: finish V3 publication, then reorganize the architecture.
V3 publication is complete. This refactor preserves the complete existing product.

- [x] Separate npm application workspaces and shared contracts; update build,
      development, test, media and deployment paths together.
- [x] Give NestJS features explicit modules/controllers/services, database
      infrastructure and stable validation ownership; preserve transactions.
- [x] Group admin surfaces, shared UI/API and feature-owned styles in React.
- [x] Add an architectural checkpoint to agent instructions and an executable
      audit for imports, cycles, feature modules and duplicate provider ownership.
- [x] Run static checks, production builds, isolated API/browser suites, independent
      Standards/Spec reviews, then publish and re-check the real demo.

Acceptance: no product, URL, database schema, persisted data, media content or
commercial-rule changes. Existing production demo remains available during work.
The final tree follows ADR 0001 and the audit rejects structural violations.

Completed: see [delivery and public verification](delivery.md) and the separate
[Standards/Spec reviews](review.md).
