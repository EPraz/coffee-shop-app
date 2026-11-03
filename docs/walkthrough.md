# Bruma product walkthrough

Scope: **72 seconds**, 1920 × 1080, 25 fps, H.264 MP4, no audio, with embedded
English explanatory text. The first 65 seconds show a real 390 × 844 mobile
viewport with touch interactions. The last seven seconds show desktop at
1440 × 800. The original source footage is a recording of the public application,
not an animated mockup.

[Live demo](https://coffee-shop-app-nine-lilac.vercel.app) ·
[Watch](https://coffee-shop-app-nine-lilac.vercel.app/walkthrough) ·
[MP4](../public/walkthrough/bruma-walkthrough.mp4) ·
[English captions](../public/walkthrough/bruma-walkthrough.vtt)

## Sequence

| Time | View    | Story                                                                                  |
| ---- | ------- | -------------------------------------------------------------------------------------- |
| 0:00 | Mobile  | Discover Bruma and its origin-led coffee collection.                                   |
| 0:07 | Mobile  | Browse five coffees from four origins.                                                 |
| 0:14 | Mobile  | Choose Niebla Geisha, 500 g, ground; add it to the bag.                                |
| 0:28 | Mobile  | Apply BRUMA15: USD 44.00 subtotal, USD 6.60 discount, USD 5 shipping, USD 42.40 total. |
| 0:40 | Mobile  | Fill fictional demo details and submit the approved simulated purchase.                |
| 0:52 | Mobile  | View order confirmation and receipt.                                                   |
| 0:58 | Mobile  | Switch among English, Spanish and Portuguese.                                          |
| 1:05 | Desktop | Brief closing view of the responsive desktop experience.                               |

The source session uses the application's fictional Alex Rivera demo details.
Checkout remains local and simulated. Error demonstrations are outside this
short edit, as agreed with the owner.

## Reproduce

Requires the application's Node dependencies and Playwright Chromium. Python,
Pillow and imageio-ffmpeg are rendering tools, not runtime dependencies. Commands
below use PowerShell; raw recordings and temporary tools stay ignored by Git.

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

The renderer reads `.scratch/walkthrough/latest.json`. It aligns source footage
using a marker in the pre-roll, cuts eight scenes, exports fast-start MP4,
poster and WebVTT, updates the player's chapter data, decodes the complete video
and creates chronological review sheets sampled every two seconds. On Windows it
uses Segoe UI; set `BRUMA_VIDEO_FONT` to a local TTF path on other platforms.

Keep the raw take and render report locally for review. Review the chronological
sheets and full-resolution frames after every re-recording. Run the playback
tests and verify public playback and byte-range responses after deployment.

## Publication

- Repository: [EPraz/coffee-shop-app](https://github.com/EPraz/coffee-shop-app).
- Hosting: Vercel project `coffee-shop-app` in `eprazs-projects`.
- Public routes must serve the application's entry document for direct entry.
- The player loads video metadata initially; the storefront does not request
  the video. The video is never autoplayed.
- Automatic Git deployments still need the Vercel GitHub integration enabled
  for this repository. Until then, production releases use the authenticated CLI.

## Verification

- All 34 browser tests pass, including the complete trilingual purchase matrix
  and the two new player tests. Typecheck, lint, formatting and production build
  pass.
- Local playback and seeking, actual MP4 download, transcript, 390 px and
  1440 px player layouts, and HTTP 206 byte ranges pass. Responsive tests cover
  320, 768, 1024 and 1440 px. Automated WCAG checks report no violations.
- Chronological review sheets cover the complete video at two-second intervals;
  desktop and mobile player captures and the final poster were visually checked.
- The complete exported MP4 decodes successfully. It contains no audio track.
  File size: 4,966,384 bytes. SHA-256:
  `a779528a0e69c537c1e05fe7fd7671a15b090ed07cedb2f66d7fdfe90be3fdc8`.
- Source recording: public production build from application commit
  `ed386b24e3e2fecf51ed96dbf0e0f433c227f06d`. The recorded session has no browser
  errors and verifies the USD 42.40 order total.
