# Walkthrough refresh

Date: 2026-11-04.
Requested after publication and architecture refactoring of V3.

## Current export

- 81 seconds, 1920 × 1080, 25 fps, H.264 MP4, no audio.
- First 74 seconds: real 390 × 844 touch-enabled mobile viewport.
- Last seven seconds: actual studio at 1440 × 800.
- English explanatory text, updated poster, WebVTT captions, eleven chapters
  and the matching player transcript.
- New stock scene: open The collection, edit Niebla's 250 g whole-bean stock
  to 12, save and see Changes saved. The rest of the connected purchase and
  order-preparation journey remains in the recording.

The README and recording guide now describe this export. The reproducible
recording script includes the stock scene and returns to the receipt through
the actual mobile menu, avoiding the white flash caused by full navigation.

## Capture provenance

Application commit: `0b08171357ee795d4bc14c2b2af8fce74bb0671d`.
Origin: `http://127.0.0.1:43174`, local NestJS and PostgreSQL.
Final take: `.scratch/walkthrough/take-1793809727556/`.
The manifest, raw recordings, render report and review sheets remain ignored.

Both rehearsal and final take assert the USD 42.40 purchase, demo account,
seven-day order count, stock-save feedback and Preparing order status without
browser errors. Recording resets only the local development store; the guard
rejects non-local origins. No public demo reset or mutation is needed to publish
or verify this media update.

## Integrity and local checks

- Bytes: `6153774`.
- SHA-256: `bb065797c643e2bcd38147714df12ba3237fef41c4d2cad2a3cba9284752580b`.
- Full FFmpeg decode passes.
- Four chronological contact sheets, sampled every two seconds, inspected.
- Full-resolution stock, receipt and desktop frames inspected.
- 740 mobile frames checked at 0.1-second intervals: no blank white screens.
- Lint, TypeScript, architecture audit, format and frontend production build pass.
- Both updated player tests pass (2/2). They cover 81-second duration, the stock chapter and transcript,
  playback, seeking, MP4 download, HTTP 206 byte ranges, three languages, four
  widths, keyboard focus and automated accessibility.

## Publication

Publish through the existing automatic GitHub–Vercel integration on `main`.
Final public playback and hash verification are pending deployment.

Player: https://coffee-shop-app-nine-lilac.vercel.app/walkthrough
