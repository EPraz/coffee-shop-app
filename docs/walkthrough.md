# Bruma V2 product walkthrough

Scope: **73 seconds**, 1920 × 1080, 25 fps, H.264 MP4, no audio, with embedded English explanatory text. The first 66 seconds show a real 390 × 844 mobile viewport with touch interactions. The last seven seconds show desktop at 1440 × 800. The source footage records the public application, including a real simulated purchase and stored receipt.

[Live demo](https://coffee-shop-app-nine-lilac.vercel.app) · [Watch](https://coffee-shop-app-nine-lilac.vercel.app/walkthrough) · [MP4](../public/walkthrough/bruma-walkthrough.mp4) · [English captions](../public/walkthrough/bruma-walkthrough.vtt)

## Sequence

| Time | View | Story |
| --- | --- | --- |
| 0:00 | Mobile | Discover Bruma, open the collection and its coffee finder. |
| 0:05 | Mobile | Choose floral, gentle and black; see Niebla Geisha and matching reasons. |
| 0:18 | Mobile | Choose Niebla Geisha, 500 g, ground; add it to the bag. |
| 0:26 | Mobile | Apply BRUMA15: USD 44.00 subtotal, USD 6.60 discount, USD 5 shipping, USD 42.40 total. |
| 0:34 | Mobile | Fill fictional demo details and confirm the simulated purchase. |
| 0:43 | Mobile | Open the guide; switch V60 to French press and adjust water to 250 ml, giving 16.7 g. |
| 0:51 | Mobile | Open browser-local history and the receipt; review and confirm a reorder at USD 49.00 without restoring the old discount. |
| 1:01 | Mobile | Switch among English, Spanish and Portuguese. |
| 1:06 | Desktop | Brief closing view of the responsive desktop experience. |

The session uses the fictional Alex Rivera demo details. Checkout remains local and simulated. The history contains product snapshots and amounts, without customer details. Error demonstrations are outside this short edit.

## Reproduce

Requires the application's Node dependencies and Playwright Chromium. Python, Pillow and imageio-ffmpeg are rendering tools, not runtime dependencies. Commands below use PowerShell; raw recordings and temporary tools stay ignored by Git.

```powershell
npm ci
npx playwright install chromium
python -m pip install --target .scratch/walkthrough/tools pillow imageio-ffmpeg
$env:BRUMA_DEMO_URL = 'https://coffee-shop-app-nine-lilac.vercel.app'
$env:BRUMA_WALKTHROUGH_TOOLS = '.scratch/walkthrough/tools'
npm run walkthrough:rehearse
npm run walkthrough:record
npm run walkthrough:render
```

The renderer reads `.scratch/walkthrough/latest.json`. It aligns source footage using a pre-roll marker, cuts nine scenes, exports fast-start MP4, poster and WebVTT, updates the player's chapter data, decodes the complete video and creates chronological review sheets sampled every two seconds. On Windows it uses Segoe UI; set `BRUMA_VIDEO_FONT` to a local TTF path on other platforms.

Keep the raw take and render report locally for review. Inspect chronological sheets and full-resolution frames after recording. Verify native playback, chapter seeking, transcript, actual MP4 download and byte-range responses after deployment.

## Publication

- Repository: [EPraz/coffee-shop-app](https://github.com/EPraz/coffee-shop-app).
- Hosting: Vercel project `coffee-shop-app` in `eprazs-projects`.
- Direct-entry routes serve the application document.
- The player loads metadata initially and never autoplays. The storefront does not request the video.
- The GitHub integration deploys `main` automatically. The authenticated CLI remains available for manual releases.

## Verification

The final media export, full suite and production playback results are recorded in [the V2 delivery record](../.scratch/coffee-shop-v2/delivery.md).
