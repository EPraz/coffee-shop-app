# Domain docs

## Layout

This repo uses a single-context layout:

- `GLOSSARY.md` at the repo root for domain terms.
- `docs/adr/` for architecture decision records.

## Before exploring

Read the root glossary and ADRs relevant to the area being explored.

If these files are absent, proceed silently. The `/domain-modeling`
skill creates them when terms or decisions are resolved.

## Use the glossary's vocabulary

Use defined terms when naming domain concepts in issues, proposals,
hypotheses, tests, and code.

When a needed concept is missing, check whether an existing term fits.
Record genuine vocabulary gaps for `/domain-modeling`.

## Flag ADR conflicts

Explicitly identify any proposal that contradicts an existing ADR,
cite the ADR, and explain why the decision should be reconsidered.
