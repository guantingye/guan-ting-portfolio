# AUDIT.md — Strategy Intelligence Platform Evidence Layer (`.isp`)

Target page: `#/project/industry-strategy-platform` (project 06, previously
"Taiwan Startup Ecosystem Atlas" / slug `semiconductor-map`). This is a full
rewrite, not an edit — old copy, hero SVG, and the `ecosystem/` module set are
retired (see below), replaced with an evidence layer for the live product at
https://industry-strategy-platform.vercel.app/.

## Repo facts
- Router: hash router (`useRoute`), project data in `src/data/projects.js`.
- Detail render: `src/pages/ProjectPage.jsx`; per-slug extras via
  `src/components/case-studies/ProjectExtraSection.jsx`.
- Shared core reused, not reforked: `injectStyles`, `usePrefersReducedMotion`,
  `useViewport` (launch-os `shared/ModuleFrame.jsx`), `useI18n` (launch-os
  `shared/useI18n.js`), `useInView`, `mulberry32` (evidence-lab `shared/labKit.jsx`).
- Tokens (Neural Signal OS palette, `.isp`-scoped — see gotcha below): bg-0
  #060911 / bg-1 #0B0F19 / bg-2 #131829 / bg-3 #1B2136, line #262D42/#333C57,
  text #F1F2F6/#A9AFC2/#6C7690, teal #35C2B0, amber #E8A33D, red #E5675A,
  sky #57A6E8, iris #9B95E6. Fonts: Fraunces (display), Inter (body),
  JetBrains Mono (data/stamps). Background/line/text values are a distinct
  (bluer) shade from the `.ni`/`.dt`/`.gx` scopes on purpose, so this project's
  screenshots and the reused webp captures of the (navy-toned) live product
  sit together without a visible seam.

## Differentiation — new scope `.isp`
Dialect: **five-act evidence ledger closely modeled on News Intelligence
(`.ni`)** — same shell shape (hero + wire ticker + sticky ledger + contact-sheet
navigator + act-grouped lazy modules + Live Demo Bridge) — because this project
and project 04 are explicitly framed as siblings (plan v2 §2.3: 04 is the AI
*pipeline*, 06 is the *product* built on top of related but distinct data).
New elements not present in `.ni`:
- A fifth authenticity tier, **CONCEPT** (`isp-stamp--concept`, iris), for the
  three AI modules (M06–M08) — a designed proposal grounded in the real schema,
  explicitly not claimed as live.
- **Lens** filter (`data` / `writing` / `ai` / `design` / `build`) replaces
  News Intelligence's fidelity filter — tuned to the brief's three pillars
  (database, writing, AI) rather than research/lo-fi/hi-fi/code/metrics.

## Source material — what is REAL vs CONCEPT
All REAL/RECONSTRUCTED claims below were verified 2026-07-10 by rendering the
live site with Playwright (headless shell) and reading the resulting DOM —
not from memory or the product's marketing copy.
- **REAL**: home hero copy and globe interaction (`/`); the five /insights
  briefs (titles, dates, and the full anatomy of "Power is becoming the
  binding constraint for AI scale-out" used in M04); the /startups database
  shape (Results: 201, Search + sector filter, DATE/COMPANY/SECTOR/SNAPSHOT
  columns, six-section expanded row); the three full six-section analyst
  notes used across M02/M05/M06/M08 (Cognition AI, Figure AI, CRISPR
  Therapeutics — each scraped from its own expanded row); the sector-cluster
  counts in M02 (Haptics 10, Organ-on-Chip 7, Drone Pollination 7, AgTech
  Robotics 7, etc., counted from all 201 rows); the five screenshots in
  `public/strategy-platform/*.webp` (captured 2026-07-10, downscaled to
  webp q82, no stock imagery).
- **RECONSTRUCTED**: the curation loop (M03) and the architecture/stack
  narrative (M12) — real practices, described from reasoning about how a
  database like this would need to be built, not observed directly.
- **CONCEPT**: M06 (AI strategist skill system), M07 (editorial ops board),
  M08 (grounded RAG layer) — designed by me for this case, grounded in the
  real schema and real company text, explicitly labelled as not wired to the
  live product. M06's "assembled draft" replays each specimen company's real
  published text, section by section, against the skill that would have
  written it — the target text is REAL, the pipeline that would produce it
  at scale is CONCEPT.

## Retired in this rewrite
- `src/components/case-studies/DeeptechDatabaseCaseStudy.jsx`'s sibling slot
  for `semiconductor-map` in `ProjectExtraSection.jsx` (the old `chain-flow`
  6-sector list) is replaced by `<StrategyPlatformEvidence/>`.
- `src/components/ecosystem/**` (`EcosystemAtlas.jsx`, E01–E10, `ecoKit.jsx`,
  `ecoContent.js`) was dead code — built but never imported anywhere in the
  app — and is deleted rather than reused. Its E09 RAG-console *interaction
  shape* (preset questions → grounded card → citations) informed M08's
  layout, but every line of copy and data in M08 is new and real-grounded.

## Known conventions carried forward (do not violate)
- **`injectStyles` id must not equal the module's section id.** Section ids
  (from the module registry) are zero-padded: `isp-m01`…`isp-m12`. A first
  pass wired each module's `injectStyles` call to the un-padded form
  (`isp-m1`…`isp-m12`) — which is safe for M01–M09 (`isp-m1` ≠ `isp-m01`) but
  collides exactly at M10/M11/M12, where `isp-m10` (style) === `isp-m10`
  (section id). A `<style id="isp-m10">` in `<head>` shadows `<section
  id="isp-m10">` for `getElementById`, silently breaking the ledger's
  scroll-spy and the M10/M11/M12 anchor jumps. Caught before ship; every
  module's `injectStyles` id now carries an explicit `-style` suffix
  (`isp-m1-style` … `isp-m12-style`) so it can never collide with a zero-padded
  section id, matching the fix already applied once in the Verification layer.
- Anchor jumps use `scrollIntoView`, never `href="#id"` (hash router).
- Screenshots referenced via `import.meta.env.BASE_URL + 'strategy-platform/...'`.
- Company subjects named in CONCEPT modules (M06/M07/M08) are real, public
  companies already present in the live database — the workflow states drawn
  around them (kanban column, agent run id, "34 days stale") are illustrative
  process data, not claims about the live platform's internal operations.
