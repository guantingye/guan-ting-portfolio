# AUDIT.md — DeepScout Evidence Layer ("Design Record" dialect)

Plan: `PLAN_deepscout.md` (repo root). Target page: `#/project/deepscout` (project 09).
This file records what is REAL vs RECONSTRUCTED so no badge lies.

## Repo facts
- Router: hash router (`useRoute`), project data in `src/data/projects.js`.
- Detail render: `src/pages/ProjectPage.jsx`; per-slug extras in
  `src/components/case-studies/ProjectExtraSection.jsx`.
- Established pattern reused: one self-contained component per module, each
  injecting a scoped stylesheet once (`injectStyles(id, css)`), tokens defined
  on a scope class (`.ds`). Shared hooks reused verbatim from
  `launch-os/shared/ModuleFrame.jsx`, `launch-os/shared/useI18n.js`, and
  `evidence-lab/shared/labKit.jsx` (`useInView`, `mulberry32`).
- Tokens (source of truth, copied verbatim from EVIDENCE_LAYER_TEMPLATE.md §4):
  bg-0 #060709 / bg-1 #0C0E12 / bg-2 #14171D / bg-3 #1C2028, line #262B35/#333A47,
  text #F2F0EB/#A8ADB8/#6B7280, teal #35C2B0, amber #E8A33D, red #E5675A,
  sky #57A6E8, iris #9B95E6. Fonts: Fraunces (display, per SKILL.md §3 — the
  DeepScout site itself uses Newsreader, but the portfolio's type system takes
  precedence), Inter (body), JetBrains Mono (data/labels).

## Differentiation — new scope `.ds`
Own dialect: "design record / filing cabinet." Mono file-tab dispatch line
(`ACT I / FRAME · DS-01 · M01`), authenticity stamp per module, skill chips
(passive labels, no filtering — unlike newsintel's fidelity filter or
verification's role filter). Navigation is a simple five-act sticky rail plus
a contact-sheet module index — no force graph, no oscilloscope signature, no
registered-report numbering. Signature interaction is M04 "Same Brief, Four
Passes" (the same company brief carried through four fidelity passes side by
side). Note: the working title during planning was "Fidelity Ladder," but
`src/components/evidence-lab/M04_FidelityLadder.jsx` (project 05, UX/HMI Lab)
already ships a module with that exact name and concept — caught during this
build, not during planning. Renamed to avoid both a literal title collision
and a false "no other layer has this" claim; the two modules now read as
clearly distinct (evidence-lab's is an interface-refinement progression,
this one is one company's brief redrawn at four fidelities).

## Source of truth for content
Everything is drawn from the DeepScout repository (github.com/guantingye/DeepScout,
cloned and read in full during planning) and from Playwright captures of the
live deployment at https://guantingye.github.io/DeepScout/ taken 2026-07-11
(after the site owner fixed a GH Pages routing bug — verified working before
capture; see PLAN_deepscout.md §1.7 for the before/after record).

Specific files read directly:
- `README.md`, `EXECUTION_PLAN_V1.md`, `EXECUTION_PLAN_V2.md` — product framing,
  build history, the V1→V2 quality push.
- `docs/data-sources.md`, `docs/copy-style-guide.md` — dataset provenance and
  the six-rule bilingual copy discipline.
- `src/pages/homeCopy.js`, `src/pages/chapters.js` — core-loop copy, persona
  pain/gain text, north-star and metric-tree copy, per-chapter lede/brief text.
- `src/data/companies.js` — the 14-company real dataset; a representative
  8-company subset (2 strong, 2 acquired, 2 conflicting, 2 strong-growth) was
  selected for M08 rather than reproducing all 14.
- `src/modules/DeepScoutCopilot.jsx` — the four designed-state copy strings
  (idle/low/none/error) quoted verbatim in M05.
- `src/styles/global.css` — the print-stylesheet fact used in M06.
- Live screenshots (Playwright, `public/deepscout/`) of: home, Copilot idle,
  Copilot with Corintis loaded, insufficient-signal state, feed-timeout state,
  risk register with guardrails off and on (scripted toggle click), roadmap,
  knowledge graph, component lab, analyst journey, personas, experiment design.
  A cropped detail shot of the Corintis snapshot card was captured separately
  for M04's rung 4 (`12-fidelity-hifi-corintis.png`).

## Module → data → badge map
| Mod | Data source | Badge |
|-----|-------------|-------|
| M01 Tension triangle | Personas pain/gain text real (homeCopy.js); the "conflict" framing between pairs is authored analysis, not an invented fact | REAL |
| M02 Signal → schema | Corintis's real shipped field data (companies.js), verified against the live Copilot screenshot | REAL |
| M03 Wireflow | Real layout decisions made during the build (confirmed by EXECUTION_PLAN_V1/V2.md and the `originals/` folder), but no wireframe file was preserved — plates are redrawn from memory | RECONSTRUCTED |
| M04 Fidelity ladder | Rungs 1–3 redrawn schematically, same reason as M03; rung 4 is a real screenshot of the shipped Copilot | RECONSTRUCTED (rungs 1–3) + REAL (rung 4, stated inline) |
| M05 Designing for doubt | All four state titles/bodies and both flag names quoted verbatim from `DeepScoutCopilot.jsx` COPY object; deep links verified live | REAL |
| M06 Component honesty | Token hex/ratio/grade values read directly off the live `/design-system` page via screenshot; print-stylesheet behavior confirmed in `global.css` | REAL |
| M07 Bilingual craft | Six rules and all three before/after examples quoted verbatim from `docs/copy-style-guide.md`; the 51-dash / ~400-string figures are stated in that file | REAL |
| M08 Freshness problem | 8-company subset with real names, stages, taglines, and status, drawn directly from `companies.js` | REAL |
| M09 Metric tree | North star, 4 input metrics, 3 guardrail metrics, and experiment-design description all quoted from `homeCopy.js` | REAL |
| M10 Risk → guardrail | All 6 register rows (category, risk name, severity transition, guardrail count) and the two live-computed stats read directly off the `/risks` page with guardrails toggled on (screenshot evidence); the worked HITL example (failure mode, 4 guardrails, residual, monitor) quoted verbatim from the same screenshot | REAL |
| M11 Engineering the case | Sealed-module principle, chapters.js single-source-of-truth, i18n architecture, ⌘K/deep-link mechanism, and the four verify.mjs checks all quoted from README.md; V1/V2 plan framing quoted from EXECUTION_PLAN_V2.md | REAL |
| MB Live bridge | 8 real chapter routes + real screenshots; 02/04 cross-links are this portfolio's own project data | REAL |

Rule applied: where a rung or plate cannot be traced to a preserved file, its
badge is RECONSTRUCTED and the module's own copy says so — no module claims a
fidelity artifact exists when only the decision it represents is real.

## Prerequisite check before this layer shipped
The live site initially had a broken GH Pages deploy (missing router
`basename`, no `404.html` SPA fallback) — every sub-route rendered the site's
own 404 page. The site owner fixed this before evidence capture; re-verified
via `curl` + Playwright render on 2026-07-11 (all 8 chapter routes and both
`?company=` / `?state=` deep-link formats load correctly). See
`PLAN_deepscout.md` §1.7 for the full before/after record.
