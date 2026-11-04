# Bruma V3 product walkthrough

Format: **73 seconds**, 1920 × 1080, 25 fps, H.264 MP4, no audio, with embedded English explanations. The first 66 seconds use a real 390 × 844 mobile viewport with touch interactions. The final seven seconds show the studio at 1440 × 800.

The V3 recording uses the connected local application, a real NestJS API and local PostgreSQL. Its origin and application commit are recorded in the capture manifest. The same application and media are now published on Vercel, with Render Free and Neon Free. The footage was captured locally; public playback and the connected purchase/admin workflow were verified separately.

[MP4](../apps/web/public/walkthrough/bruma-walkthrough.mp4) · [English captions](../apps/web/public/walkthrough/bruma-walkthrough.vtt) · [Publication checklist](v3-deployment.md)

## Sequence

| Time | View    | Story                                                                                  |
| ---- | ------- | -------------------------------------------------------------------------------------- |
| 0:00 | Mobile  | Discover Bruma and open the collection.                                                |
| 0:05 | Mobile  | Choose Niebla Geisha, 500 g, ground; add it to the bag.                                |
| 0:13 | Mobile  | Apply BRUMA15: USD 44.00 subtotal, USD 6.60 discount, USD 5 shipping, USD 42.40 total. |
| 0:20 | Mobile  | Fill fictional demo details and confirm a server-priced simulated purchase.            |
| 0:28 | Mobile  | Open the saved receipt and its live Confirmed status.                                  |
| 0:33 | Mobile  | Enter the shared demo account through The studio.                                      |
| 0:41 | Mobile  | Filter the connected dashboard to seven days and explore sales and trend.              |
| 0:51 | Mobile  | Open the new order, mark it Preparing and see the success notification.                |
| 1:01 | Mobile  | Return to the buyer’s receipt and verify its live Preparing state.                     |
| 1:06 | Desktop | Brief closing view of the same connected studio.                                       |

The buyer uses fictional Alex Rivera form details. Those fields are never sent to the API. Only the simulated purchase, commercial amounts, product snapshots and opaque buyer identifier are persisted. The local development store is explicitly reset through its public demo API before each take; recording refuses non-local origins to avoid silently resetting the public store.

## Reproduce

Start the local API, PostgreSQL and frontend as described in the [README](../README.md). Install Playwright Chromium. Python, Pillow and imageio-ffmpeg are rendering tools, not application runtime dependencies.

```powershell
python -m pip install --target .scratch/walkthrough/tools pillow imageio-ffmpeg
$env:BRUMA_DEMO_URL = 'http://127.0.0.1:43174'
$env:BRUMA_WALKTHROUGH_TOOLS = '.scratch/walkthrough/tools'
npm run walkthrough:rehearse
npm run walkthrough:record
npm run walkthrough:render
```

The recorder asserts the actual order total, dashboard count and order state. The renderer reads `.scratch/walkthrough/latest.json`, aligns footage with a pre-roll marker, cuts ten scenes, exports fast-start MP4, poster and WebVTT, and updates the player’s chapter data. It decodes the complete export and creates chronological review sheets sampled every two seconds. On Windows it uses Segoe UI; set `BRUMA_VIDEO_FONT` to a local TTF on other platforms.

Raw takes, temporary rendering tools, screenshots and contact sheets remain ignored by Git. Keep the capture manifest and render report locally, inspect the chronological sheets and full-resolution frames, and record the export hash in the delivery log. Verify player controls, chapter seeking, transcript, download and byte-range responses after changing media, then repeat the public playback checks after deployment.

The player loads only metadata initially and never autoplays. The storefront does not request the video. The same-origin application route `/walkthrough` and media paths under `/walkthrough/` must both remain accessible after publication.

## Verification checkpoint

The 73-second export decoded completely and its chronological review sheets were
inspected. Both player browser tests passed, including playback, seeking,
transcript, MP4 download, byte ranges, localization, widths and accessibility.
The export hash and remaining public checks are recorded in the
[V3 delivery log](../.scratch/coffee-shop-v3/delivery.md).
