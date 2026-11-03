# Issue tracker: Local Markdown

Issues and specs live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Spec: `.scratch/<feature-slug>/spec.md`.
- Implementation tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`,
  one file per ticket, numbered from `01`.
- Record triage state in a `Status:` line near the top of each ticket.
  Use the strings in `triage-labels.md`.
- Append comments and conversation history under `## Comments`.

## Publish to the issue tracker

Create the spec or individual ticket at its corresponding path above,
creating directories as needed.

## Fetch a relevant ticket

Read the referenced file. Resolve ticket numbers within the feature's
`issues/` directory.

## Wayfinding operations

For `/wayfinder`, use these conventions:

- Map: `.scratch/<effort>/map.md`, containing Notes,
  Decisions-so-far, and Fog.
- Child tickets: `.scratch/<effort>/issues/NN-<slug>.md`,
  numbered from `01`, with the question in the body.
- Record a `Type:` of `research`, `prototype`, `grilling`, or `task`.
- Wayfinding lifecycle uses `Status: open`, `claimed`, or `resolved`.
- Record dependencies as `Blocked by: NN, NN`. A ticket is unblocked
  when every listed dependency is resolved.
- Frontier: choose the lowest-numbered open, unblocked, unclaimed ticket.
- Claim: save `Status: claimed` before starting work.
- Resolve: append the answer under `## Answer`, set `Status: resolved`,
  and append a summary and ticket link to the map's Decisions-so-far.
