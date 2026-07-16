# Field Journey (project 10) — provenance & conventions audit

Scope prefix: `.fj` · slug `field-journey` · route `#/project/field-journey`
Dialect: **storybook** (warm paper zone) — deliberately NOT the ModuleFrame/file-cabinet lab dialect.

## Conventions carried forward (from strategy-platform/deepscout audits)

1. **injectStyles id rule.** `injectStyles(id, css)` is idempotent via `document.getElementById(id)`.
   A `<style>` id equal to a section id shadows the real element and silently breaks
   scroll-spy and every `scrollIntoView` jump. Every style id here carries the `-styles`
   suffix: `fj-shared-styles`, `fj-paper-styles`, `fj-layer-styles`, `fj-c01-styles` …
   `fj-c07-styles`, `fj-station-styles`. Section ids are `fj-c01` … `fj-c07` — the ONLY
   ids exposed to `projects.js` (`outcomeModules` / `evidenceSlots`).
2. **No `href="#id"` anchors.** The app is a hash router; in-page jumps use
   `document.getElementById(id)?.scrollIntoView(...)` on buttons. Cross-page links use
   full `#/project/<slug>` hrefs (C07 bridge chips).
3. **Assets via BASE_URL.** Photos load from `import.meta.env.BASE_URL + 'field-journey/<file>'`
   (vite base is `/guan-ting-portfolio/`), `loading="lazy" decoding="async"`, `.webp` preferred.
4. **Reduced motion, doubly enforced.** Every motion prop is gated by
   `useReducedMotion()` (motion/react), and `fj-shared-styles` ends with the
   `@media (prefers-reduced-motion: reduce)` kill-switch. The journey rail renders a
   static full line; drawn paths render pre-drawn.
5. **Lazy chunks.** All seven chapters load via `React.lazy` from
   `FieldJourneyEvidence.jsx`, same as the deepscout module map.

## What this dialect deliberately does NOT reuse

- No `ModuleFrame` dispatch header, no sticky act rail, no module index grid.
- `ChapterFrame` (fjKit) replaces it: eyebrow (`STATION 0X · org` / `Chapter NN`),
  display title, lead, `AuthStamp`, body, optional field-note strip.
- Fresh `.fj` token set (cream paper / warm ink), no `--ds/--los/...` tokens referenced.
- Animation runs on `motion/react` (already used by the homepage), not the CSS-class
  `Reveal` pattern of the dark layers.

## Source-of-truth table

| Item | Tier | Notes |
|---|---|---|
| Three institutions, sectors, org sizes, duty lists | REAL | From the user's own experience record (job-history summaries, 2026-07). Org sizes (1–30 / 30–100) come from the job listings. |
| Station ORDER (Mennonite → CFWA → MoHW) | **ASSUMED** | Journey order chosen for narrative; swap objects in `STATIONS` (fjContent.js) to fix — chapters, map, and rail follow automatically. Pending user confirmation. |
| Per-station dates | **PENDING** | Only the aggregate 2021–2023 (from homepage timeline ch1) is shown. No per-station dates rendered until confirmed. |
| English name "Mennonite Hospital · Liming Institution" | **PENDING** | Transliteration; confirm official English name. |
| AAC board (C03 interactive) | RECONSTRUCTED | Real project; card vocabulary and layout re-drawn from memory. Real boards were laminated cards on hook-and-loop strips. |
| Annual report chart (C04) | ILLUSTRATIVE curve / REAL pipeline | The curve is explicitly captioned as illustrative; the five-step pipeline (scales → cleaning → viz → read with psychologists → funding) is the real process. |
| Intake form before/after (C05) | RECONSTRUCTED | Real redesign work; specific field counts and groupings re-drawn from memory. Case-type set (兒少/成人/家庭/危機) is representative. |
| Journey map, threshold scene, landmark glyphs | ILLUSTRATIVE | Storytelling scenery. |
| Field photos (C06) | REAL | Three supplied photographs from the first two stations. Each opens in an accessible full-frame lightbox. |
| Podcast evidence (C04) | REAL | Supplied brand artwork and three published episode cases support the real production pipeline. |

## Photo ledger

| id | intended subject | file (public/field-journey/) | status |
|---|---|---|---|
| ph-01 | Liming Institution activity | 01-st1-liming-event.png | shown in field album |
| ph-02 | association work session | 02-st2-work-session.jpg | shown in field album |
| ph-03 | association event | 03-st2-association-event.jpg | shown in field album |
| podcast-brand | podcast brand artwork | st2-podcast-brand.png | shown at Station 2 |
| podcast-episode-ep73 | podcast episode case | st2-podcast-episode-ep73.png | shown at Station 2 |
| podcast-episode-ep67 | podcast episode case | st2-podcast-episode-ep67.png | shown at Station 2 |
| podcast-episode-ep68 | podcast episode case | st2-podcast-episode-ep68.png | shown at Station 2 |

Future evidence should be added to `PHOTOS` only after its public asset, bilingual title,
bilingual note, aspect ratio, and station mapping are available.

## [TODO: quantify] register (mirrors `todo` fields in fjContent.js — never rendered)

- st1/care — 每週服務個案數／服務時數
- st1/curriculum — 課程主題數／學員人數
- st1/aac — 輔具套數／使用院生人數
- st1/events — 場次／參與人數
- st2/casedata — 年度個案筆數
- st2/annual — 經費金額／計畫名稱
- st2/podcast — 集數／上架平台
- st2/lecture — 場次／參與人數
- st3/lecture — 場次／講者／參與人數
- projects.js entry `impact` — replace with a real number once any of the above lands
