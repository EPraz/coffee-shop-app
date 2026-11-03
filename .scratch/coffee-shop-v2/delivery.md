# Bruma V2 delivery

Status: code and local media validation complete; final public media verification pending.

## Scope

Six approved vertical tickets implement the deterministic coffee finder, V60/French press guides, browser-local order snapshots and examples, reviewed reorder, trilingual responsive/accessibility validation, and portfolio publication.

## Review

Baseline: `d0e2856d05b02f1f06650f88f5e772367681793d`.
See [independent Standards and Spec review](review.md). One Standards P3 and two Spec P2 findings were reproduced or checked, corrected, and rechecked. No remaining implementation findings.

## Production application

- Public demo: https://coffee-shop-app-nine-lilac.vercel.app.
- Reviewed application commit: `3b2767cd62823e56a7612178d36fc228dbb20c4e`.
- Automatic production deployment: `dpl_5vvCVebyRJxeemV9z4yhDGCsAPin`, Ready; source Git, production branch main.
- Direct entry to home, finder, guide, history, historical receipt, reorder and walkthrough returns HTTP 200.
- Public recipe outputs, two example orders and reviewed reorder at USD 78.50 verified without browser errors.

## Recording

The real production recording is 73 seconds: mobile 390×844 for 66 seconds, then desktop 1440×800 for 7 seconds. Nine scenes include a recommended Niebla Geisha, 500 g ground, BRUMA15 purchase at USD 42.40, measured French press guidance, browser-local receipt and reviewed reorder at USD 49.00. Rehearsal and final source recording both complete without browser errors.

Raw local take: `.scratch/walkthrough/take-1793742952700/` (ignored).

## Validation

The final complete browser suite passes all **66 tests** (3.0 minutes). Typecheck, lint, formatting and production build pass. Coverage includes both trilingual four-width matrices, Axe states, keyboard navigation, complete purchases, storage recovery, twenty-order retention, reviewed reorder and two-tab failure/deletion regressions. Rapid origin typing also passes three constrained-device repetitions. Both independent reviewers confirm no remaining findings.

## Reviewed export

- MP4: 5,923,263 bytes, 1920×1080, 25 fps, 73 seconds, no audio.
- Complete MP4 decode: passed.
- SHA-256: `7a28bdfbe73d23ca1597101f2c642bf2818e1699520b0db07b8d77f59f7e018e`.
- All four chronological contact sheets (sampled every two seconds) and the full-resolution poster were inspected. The poster uses the coffee recommendation at 14 seconds.
- Nine chapters, English WebVTT and transcript agree with the edit.

The localized player format shares chapter duration metadata. Local playback, seek to the desktop chapter at 66 seconds, transcript, actual MP4 download and HTTP 206 ranges pass at 390 px and 1440 px without browser errors.
