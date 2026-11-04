# V3 independent review

Baseline: `87c386239871d655f3909b1d8a23be9f914b3b2e` (published V2).
Reviewed head: `7a6d968`.
The review used the complete committed V3 diff and the approved specification.
The two reviewers worked independently and did not change code or data.

## Standards

Two findings; most consequential: expired read-session recovery (P2).

1. P2: `useAdminResource` discards API error codes. Dashboard/order reads show a
   network retry after session expiry without an accessible renewal action.
2. P3, judgement call: the server duplicates the shared next-order-state map.
   Use the shared transition vocabulary while retaining server validation.

No hard breach of the repository's documented conventions was reported.

## Specification

Two findings; most consequential: expired read-session recovery (P2).

1. P2: expired administrative reads need renewal with loaded data retained.
   Mutation renewal alone does not satisfy recovery for dashboard/order browsing.
2. P2: story 5 distinguishes a disabled coffee from an exhausted variant. The
   API exposes `enabled`, but catalogue/product copy currently conflates them.

No unrequested behavior was identified. Publication, documentation and video
remain ticket 08 work and are not counted as these functional findings.

## Verification and resolution

- Before corrections: typecheck, lint, format and diff checks passed; all 11
  public HTTP tests and all 83 browser tests passed against isolated PostgreSQL.
- Browser regressions in `e2e/27-review-recovery.spec.ts` exercise the reported
  recovery and availability gaps at the approved public boundaries.
- All three regressions first failed with the reported behavior, then passed.
- Follow-up: 14 affected browser tests passed, including both protected read
  renewals, renewal failure/retry, availability distinction and the three-language
  dashboard accessibility matrix.
- After editor/contract cleanup: typecheck, lint, format and production frontend
  build passed; all 11 API tests passed again, followed by 16 affected browser
  tests covering catalogue edits, state changes, history, conflicts and recovery.
- Both original reviewers independently re-read the corrections and closed all
  findings. Neither reported a material regression. No source TS/TSX file in
  `src`, `server/src` or `shared` exceeds 200 lines after the editor extraction.

Open release work: ticket 08 cloud access, deployment and public verification.
