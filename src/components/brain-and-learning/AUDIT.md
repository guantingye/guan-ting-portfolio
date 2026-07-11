# Brain, Mind & Learning (project 11) — provenance & conventions audit

Scope prefix: `.bl` · slug `brain-and-learning` · route `#/project/brain-and-learning`
Dialect: **journal-paper** (cold ivory paper, Figure/Plate numbering, hairline rules) —
deliberately NOT the warm-paper storybook dialect of field-journey, and NOT the
dark file-cabinet ModuleFrame dialect of the other console projects.

## Revision 2 (2026-07-11) — real images replace custom data visualization

Per user direction, this layer was rebuilt around three principles:

1. **No custom-built statistic visualizations.** The original C04 (a hand-built
   LIVE/STATIC toggle redrawing an invented connectivity number) and C05 (hand-built
   engagement bars + ROC curve) are gone. In their place: the **actual analysis
   figures** from the thesis, supplied by the user and stored in
   `public/brain-and-learning/`:
   - `functional-connectivity-procedure.png` — the real network-wise connectivity
     diagram (Frontoparietal / Salience / Default Mode triangle).
   - `lab-activation-maps.png` — real group-level activation maps (A/B/C = the
     three networks), axial/sagittal/coronal.
   - `ml-procedure.png` — the real classification pipeline + diagnostics (median
     split, RFE feature selection, leave-one-out CV, logistic regression, ROC,
     classification scatter).
   - `tscn-award-ceremony.png`, `ohbm-poster-session.png`, `ohbm-logo.png` — real
     conference photos/branding, now embedded inline in C06/C07 instead of sitting
     in a placeholder photo-ledger gallery.
2. **No experimental numbers disclosed.** Chapter copy (`FUNCTIONAL_CONNECTIVITY`,
   `ML_CLASSIFICATION` in `data/blContent.js`) describes direction and method only
   ("stronger connectivity," "separated groups better than chance") — no specific
   coefficients, accuracy, or p-values appear anywhere on the page. This replaces
   the old approach of showing illustrative-but-specific numbers.
3. **Narrative re-weighted**: "online learning / instructor presence" is now
   context, not the headline. The headline is the study's two methodological
   innovations — a **naturalistic experimental paradigm** (a real, continuous
   lecture instead of an artificial repeated-trial task) and **two novel analysis
   lenses** (network-wise functional connectivity; ML classification). See
   `PARADIGM_CONTRAST` in blContent.js (C03) for the explicit traditional-vs-this-study
   framing the user asked for.

The dark-head entrance (dark→paper transition) was also redesigned: the flat
near-black-to-white gradient became a deep-indigo "lab at night" ground with
soft FPN/SN-colored glows, a fading dot-grid texture, and a longer 4-stop
gradient — see `.bl-dark` in `BrainLearningEvidence.jsx`.

## Conventions carried forward (from field-journey / strategy-platform audits)

1. **injectStyles id rule.** `injectStyles(id, css)` is idempotent via
   `document.getElementById(id)`. A `<style>` id equal to a section id shadows the
   real element and silently breaks scroll-spy and every `scrollIntoView` jump.
   Every style id here carries the `-styles` suffix: `bl-shared-styles`,
   `bl-layer-styles`, `bl-c01-styles` … `bl-c09-styles`. Section ids are
   `bl-c01` … `bl-c09` — the ONLY ids exposed to `projects.js`
   (`outcomeModules` / `evidenceSlots`).
2. **No `href="#id"` anchors.** The app is a hash router; in-page jumps use
   `document.getElementById(id)?.scrollIntoView(...)` on buttons. Cross-page
   links use full `#/project/<slug>` hrefs (C09 bridge chips).
3. **Assets via BASE_URL.** All real images load from
   `import.meta.env.BASE_URL + 'brain-and-learning/<file>'` (vite base is
   `/guan-ting-portfolio/`), `loading="lazy" decoding="async"`.
4. **Reduced motion, doubly enforced.** Every motion prop is gated by
   `useReducedMotion()` (motion/react), and `bl-shared-styles` ends with the
   `@media (prefers-reduced-motion: reduce)` kill-switch.
5. **Lazy chunks.** All nine chapters load via `React.lazy` from
   `BrainLearningEvidence.jsx`, same pattern as deepscout / field-journey.
6. **Shared CSS lives in the kit, not a sibling chapter.** Pipeline-pill styles
   (`.bl-pipe-row` etc., used by both C03 and C05) and the side-photo layout
   (`.bl-side-layout` / `.bl-side-photo` / `.bl-logo-banner`, used by C06 and C07)
   live in `shared/blKit.jsx`'s `bl-shared-styles` block — not duplicated per
   chapter, and not implicitly borrowed from another chapter's injected block.

## What this dialect deliberately does NOT reuse

- No torn-paper edge (field-journey's signature move) — `SectionRule` marks the
  seam with a plain double hairline + asterism over a smooth gradient background.
- No washi-tape rotation on cards/photos — every card, tag, and plate sits flat
  with a hairline border, no transform rotation.
- Fresh `.bl` token set (cold ivory paper / near-black ink / FPN indigo / SN
  coral / DMN amber for the hero only), no `--fj/--ds/--los/...` tokens referenced.
- Two-tier authenticity vocabulary (`real` / `illustrative`) instead of the
  three-tier `real/reconstructed/illustrative` used elsewhere — this project has
  no reconstructed physical artifacts, only published facts, real photos, and
  (in one hero-image case only) a decorative schematic.

## Source-of-truth table

| Item | Tier | Notes |
|---|---|---|
| RA responsibilities, tools (SPSS/R/Python/MATLAB), lab & center names | REAL | From the user's own job record (Taiwan Mind and Brain Imaging Center RA). |
| Thesis title, N=43 (34 female, mean age 23.19, SD 3.79), live-vs-static naturalistic manipulation, 8-stage pipeline | REAL | Published on the OHBM 2025 poster. |
| Functional-connectivity procedure figure, group activation maps, ML classification pipeline figure | **REAL** | Actual figures from the thesis, supplied directly by the user — not recreated or approximated. |
| Directional findings (stronger connectivity in the naturalistic condition; classifier separates groups better than chance) | REAL | Published on the OHBM 2025 poster (paraphrased, direction only — no coefficients/accuracy stated). |
| TSCN 2025 Excellent Award photo, OHBM 2025 Brisbane poster photo + logo | REAL | User-supplied photographs, now embedded inline in C06/C07. |
| Exact inferential statistics (t/p values, connectivity coefficients, classifier accuracy) | **NOT SHOWN** | Deliberately omitted per user direction — the real figures carry the evidence; the copy describes direction and method only. |
| Hero cover image (three-network connectogram) | ILLUSTRATIVE | Decorative SVG built for the project card/hero — schematic only, styled after the real triangle layout in `functional-connectivity-procedure.png` but not a reproduction of it. |
| Remaining Plates (C08 photos) | RESERVED | `src: null` at ship. Ledger below updates as scans land. |

## Photo ledger (update as scans land)

| id | intended subject | file (public/brain-and-learning/) | status |
|---|---|---|---|
| ph-01 | Scanner room / session setup | `01-scanner-room.webp` (or similar) | awaiting scan |
| ph-02 | Lab team | `02-lab-team.webp` (or similar) | awaiting scan |

Already fulfilled (no longer placeholders): TSCN award ceremony
(`tscn-award-ceremony.png`, embedded in C06), OHBM poster session
(`ohbm-poster-session.png`, embedded in C07), OHBM logo
(`ohbm-logo.png`, embedded in C07), functional-connectivity procedure and lab
activation maps (embedded in C04), ML procedure (embedded in C05).

To fill a remaining slot: drop the file in `public/brain-and-learning/`, set
`src: '<filename>'` on the matching entry in `PHOTOS` (blContent.js), update
this ledger. No component changes.
