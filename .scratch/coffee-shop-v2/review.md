# V2 delivery review

Baseline: `d0e2856d05b02f1f06650f88f5e772367681793d` (previous production).
Initial review: `git diff d0e2856d05b02f1f06650f88f5e772367681793d...7983dfb`.
Two independent agents reviewed Standards and Spec in parallel, then rechecked
the corrections without modifying files or sharing the browser-test server.

## Standards

- **P3, resolved:** the V2 matrix used CSS selectors for language and mobile
  menus, bypassing the documented named-accessible-control test boundary.
  Replaced them with named combobox, navigation and localized menu buttons.
  The reviewer confirms the correction and reports no additional actionable
  violations or baseline smells.

## Spec

- **P2, resolved:** stale tabs could overwrite stored purchases when adding
  another order or loading examples. Reproduced through two public browser
  tabs. Reconcile persisted history before mutations and refresh other tabs
  using native storage events.
- **P2, resolved:** the first correction merged every in-memory receipt after
  a failed write, resurrecting previously saved receipts deliberately deleted
  in another tab. Reproduced with a browser storage failure. Track genuinely
  unsaved receipts separately, retain them during the visit, and honor
  authoritative deletion of stored receipts. The recovery regression uses
  same-document navigation, respecting session-only persistence limits.
  Both public two-tab regressions pass; the reviewer confirms no remaining
  implementation findings.
- **P3, resolved:** localized player format copy still displayed the V1
  duration. It now interpolates the shared chapter duration in all three
  languages; visible format labels are checked in the player regressions.

Totals: Standards 1 finding (worst P3), Spec 3 findings (worst P2); all resolved.
The final production video, media verification and ticket closure are tracked
separately in the delivery record.

## Final regression review

The full suite exposed intermittent search character loss under load. A constrained-device browser case reproduced it reliably (Panama became a). The installed router deferred URL-driven controlled input updates in a transition. The application now opts out of router transitions, preserving one URL source of truth. The constrained-device case passes three repetitions; both independent reviewers confirm no remaining findings in this correction or the final media metadata.
