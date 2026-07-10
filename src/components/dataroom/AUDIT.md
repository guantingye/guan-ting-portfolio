# AUDIT.md — Research Database Console Evidence Layer (`.dt`)

Target page: `#/project/deeptech-database` (project 02, Global DeepTech Database).
Replaces the earlier `src/components/case-studies/deeptech/` case study, rebuilt
to match the `EVIDENCE_LAYER_TEMPLATE.md` architecture used by Launch OS (`.los`)
and the UX/HMI Interaction Design Lab (`.gx`).

## Repo facts
- Router: hash router (`useRoute`), project data in `src/data/projects.js`.
- Detail render: `src/pages/ProjectPage.jsx`; per-slug extras via
  `src/components/case-studies/ProjectExtraSection.jsx`.
- Shared core reused, not reforked: `injectStyles`, `usePrefersReducedMotion`,
  `useViewport` (launch-os `shared/ModuleFrame.jsx`), `useI18n` (launch-os
  `shared/useI18n.js`), `useInView`, `mulberry32` (evidence-lab `shared/labKit.jsx`).
- Tokens (reused verbatim, Neural Signal OS palette): bg-0 #060709 / bg-1 #0C0E12 /
  bg-2 #14171D / bg-3 #1C2028, line #262B35/#333A47, text #F2F0EB/#A8ADB8/#6B7280,
  teal #35C2B0, amber #E8A33D, red #E5675A, sky #57A6E8, iris #9B95E6.
  Fonts: Fraunces (display), Inter (body), JetBrains Mono (data/stamps).

## Differentiation (template §6) — new scope `.dt`
Dialect: **research database console** — mono ledger/table forms, a console-rule
divider motif (`.dt-rule`), a bracketed "audit cell" provenance badge (not a wire
stamp). Signature interaction: **Module 03, the Entity Resolution Workbench**
(confidence-threshold slider + accept/hold review queue over alias clusters).

NOT reused (reserved elsewhere): RICE tables / risk matrix / force-directed graph /
design-system specimen / cockpit (Launch OS); phase rail / role filter / confidence
topography (Verification); wire-feed ticker / FIDELITY filter / prompt-diff /
animated pipeline signal-trace / drag comparator (News Intelligence); registered-report
apparatus / slider→radar (PsyMatch). Module 02 (Pipeline Run Console) is therefore a
**discrete step-through** console — clickable stage nodes and an inspector panel — with
no flowing/animated trace line. Module 06 (Provenance Ledger) is a **static table**,
zero animation, to stay clear of News Intelligence's signal-trace.

## Source material
All copy is migrated and rewritten from the retired
`src/components/case-studies/deeptech/deepTechContent.js` (portfolio-safe
reconstruction of ITRI/ISTI research-assistant work: 230+ tracked companies,
Python/Pandas/Playwright/SQL pipeline). No confidential company-level records are
exposed anywhere in this layer; the TSMC alias cluster in Module 03 reflects the
real workflow logic on public information, and is explicitly labeled as a sample.

## Module → data → badge map
| Mod | Data source | Badge |
|-----|-------------|-------|
| M01 Source Signal Intake | Source list (MOPS/104/TSIA/SEMI/ASIP/etc.) and access methods are project-real; the registry UI and per-source facets are a reconstruction | RECONSTRUCTED |
| M02 Pipeline Run Console | 8-stage architecture is project-real; step-through run state and row-count deltas are `mulberry32`-seeded simulated values | RECONSTRUCTED |
| M03 Entity Resolution Workbench | TSMC alias cluster mirrors the real workflow logic on public info; Northline/Sable/Vantage clusters are illustrative samples built to demonstrate threshold behavior, not real company records | RECONSTRUCTED |
| M04 Schema Explorer | Table/field names match the project's actual schema design; the explorer UI is a reconstruction | RECONSTRUCTED |
| M05 Quality Gate Board | Gate definitions (coverage, traceability, identity, freshness, conflict, output readiness) are project-real design decisions; pass/review/blocked outcomes are deterministic simulated runs | SIMULATED |
| M06 Provenance Ledger | Table relationships are project-real; individual ledger rows (row ids, timestamps, values) are simulated sample lineage, not exported records | SIMULATED |
| M07 Decision Surfaces Gallery | Artifact list (index/map/dashboard/brief/package) is project-real; card previews are self-drawn DOM/SVG reconstructions, not screenshots | RECONSTRUCTED |

Rule applied: nothing is stamped REAL unless it is independently citable. Every
row count, confidence score, and timestamp in M02/M03/M05/M06 is simulated and
disclosed as such via the module's provenance badge and tooltip note.
