# Publication and product walkthrough

Status: demo, video, player and README published and verified. The Vercel GitHub
integration is connected, with `main` as the production branch.

## Confirmed decisions

- Create the public GitHub repository `EPraz/coffee-shop-app` and connect it to
  Vercel for automatic deployments from `main`.
- Publish the portfolio demo without a login requirement, using Vercel's domain
  initially and retaining simulated checkout.
- Show the home page, catalogue, variant selection, bag, `BRUMA15`, demo form
  filling and order confirmation, plus mobile use and language switching.
- Keep the walkthrough substantially shorter than three minutes, with a real
  mobile shot and explanatory text.
- Target 60–75 seconds at 1080p, with English annotations and no voice or music.
- Record the purchasing journey in a real mobile viewport. End with a brief
  desktop shot; desktop is not the main recording format.
- Show only the approved purchase, leaving error demonstrations out of this edit.
- Put the live demo link and a clickable video poster near the start of the
  README. Link the poster to `/walkthrough`, with native playback, chapters,
  transcript and MP4 download.

## Short edit

Target: 60–75 seconds, mobile first with a short desktop ending.

- 0–8 s: home page and coffee catalogue.
- 8–22 s: coffee detail, variant selection and adding to the bag.
- 22–35 s: bag and `BRUMA15` discount.
- 35–53 s: demo details and simulated order confirmation.
- 53–62 s: language switching on mobile.
- 62–70 s: brief desktop ending.

## Reference projects

- `dashboard/docs/walkthrough.md`: real product interactions, silent 1080p video,
  English annotations, a poster, chapters, captions and a transcript.
- `projectManagement/docs/walkthrough.md`: the same presentation pattern,
  including a real mobile viewport and a dedicated `/walkthrough` page.
- `ER-LandigPage/scripts/walkthrough/`: reproducible Playwright recording and
  Python rendering scripts; an existing local FFmpeg binary is available.

The current application has simulated checkout, three interface languages and
USD prices. Its README already explains that no real payments or deliveries occur.

No new domain terms or architecture decisions have been established by this
publication discussion so far.

## Publication state

- Public repository: https://github.com/EPraz/coffee-shop-app.
- Public production demo: https://coffee-shop-app-nine-lilac.vercel.app.
- The initial CLI production deployment completed successfully. The production
  domain responds without authentication.
- The final application deployment is ready at the same production domain:
  `dpl_A162R2AXJwWhTGQVZUfxWtSHbp6A`, application commit `edbdca9`.
- Public playback, chapter seeking, transcript and actual MP4 download pass at
  390 px and 1440 px. HTTP 206 ranges pass and the downloaded video's SHA-256
  matches the reviewed local export. The README poster loads from public GitHub.
- After the owner authorized the Vercel GitHub integration, Git linking
  succeeded. The project API confirms `EPraz/coffee-shop-app` and the production
  branch `main`. The documentation update is published through Git to verify
  the automatic production deployment.

Deployment references: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
and [Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github).
