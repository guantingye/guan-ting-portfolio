# CHANGE_IMPACT_MATRIX — Who breaks when you touch what

> Import edges verified by grep on 2026-07-20. "Blast radius" = pages a regression can appear on. Verification steps assume the screenshot workflow (Chrome remote-debugging driver, base path `/guan-ting-portfolio/`) plus `npm run build`.

## Tier 1 — site-wide blast radius

### `src/data/projects.js` (`PROJECTS`, `PROJECT_THEMES`)
- **Imported by [V]:** `app/App.jsx` (themes for ProgressBar), `pages/HomePage.jsx`, `pages/ProjectPage.jsx`, `components/home/SkillsSection.jsx`, `components/brain-and-learning/C09_Bridge.jsx`, `components/field-journey/C07_SkillsBridge.jsx`. Read indirectly by `StorytellingCaseStudy`/`ProjectCard` via props.
- **Pages affected:** home (work grid, skills layer links) + **all 11 project pages** (hero, overview, deck, outcomes, tech, prev/next order).
- **Risks:** reordering `PROJECTS` changes prev/next chains and card numbering; renaming a slug silently 404s (`ProjectExtraSection` and `PROJECT_THEMES` both key on the slug string — three places must stay in sync: `PROJECTS[].slug`, `PROJECT_THEMES`, `ProjectExtraSection`); missing `zh*` twin falls back to English mid-page; `outcomeModules[].id` must match a real DOM id inside the layer or the "→ see Module" button no-ops; the file top builds SVG data-URIs — a malformed template string breaks *module evaluation* and blanks the whole site.
- **Verify:** `npm run build`; open home + the touched project in **both** languages; click every outcome-module anchor; check prev/next at both ends of the list.

### `src/styles/index.css`
- **Consumed by [V]:** imported once in `main.jsx`; styles shell, home, `proj-*` frame, `story-case-*`, `emobot-case*`/atelier, `.fst-*` skills, `.reveal` system.
- **Pages affected:** everything except the interiors of scoped evidence layers.
- **Risks:** 7,079-line monolith — selector collisions and cascade-order surprises; `.reveal { opacity:0 }` means breaking `useReveal` or `.visible` leaves content invisible; media queries for the project frame affect all 11 project pages at once.
- **Verify:** home + one "plain" project (deeptech) + emobot (its case styles live here) at desktop/tablet/mobile; scroll fully to confirm reveals fire.

### `src/components/launch-os/shared/ModuleFrame.jsx` (`injectStyles`, `useViewport`, `usePrefersReducedMotion`, `.los` token sheet)
- **Imported by [V]:** all 9 kits (`labKit`, `dsKit`, `niKit`, `psyKit`, `vfKit`, `blKit`, `ispKit`, `fjKit`, `dtKit`) + all launch-os modules. This is the kernel.
- **Pages affected:** all 10 evidence-layer project pages (every project except emobot-plus).
- **Risks:** changing `injectStyles` semantics (id check, injection point) affects every layer's CSS at once; editing the `.los` token block changes launch-os *and* anything that borrowed `.los` variables; `useViewport` breakpoints (1200/768) drive layout switches in many modules.
- **Verify:** open at least launch-os (03), one lazy layer (05 or 09), and one motion layer (10/11); resize across both breakpoints; toggle OS reduced-motion.

### `src/app/providers/LanguageProvider.jsx` + `src/data/translations.js`
- **Imported by [V]:** `App.jsx`, both pages, `Nav`, `Footer` (via `useLang`), `launch-os/shared/useI18n.js` → **every evidence module**.
- **Risks:** a missing key returns the key string itself (`t = k => T[lang][k] ?? T.en[k] ?? k`) — typos ship as visible raw keys; `setLang` **overwrites** `document.getElementById('html-root').className` wholesale, so any other class ever added to `<html>` will be wiped; localStorage key `portfolio-lang` is the persistence contract.
- **Verify:** toggle EN↔ZH on home and on a project page mid-scroll; reload to confirm persistence; scan for raw camelCase keys in the UI.

### `src/hooks/useRoute.js` + `App.jsx` shell
- **Risks:** the entire site assumes hash routing — bare `assets/…` hrefs (Nav CV link, `HomeHero`, `awards.js` logos) resolve against the document URL and would break under path-based routing; `navigate` owns scroll-to-top behavior; `ProjectPage` is remounted via `key: slug` — removing the key would expose the early-return-before-hooks pattern in `ProjectPage.jsx:29` (see KNOWN_RISKS).
- **Verify:** home→project→prev/next→back-link→nav-brand round trip; browser back/forward; deep-load `…/#/project/psymatch` directly.

## Tier 2 — multi-page blast radius

### `src/components/case-studies/ProjectExtraSection.jsx`
- **Imported by:** `ProjectPage` only, but it eagerly imports **all 11 layer entry components** — any syntax/import error in any layer entry file breaks *every* project page (entries are eager; only their sub-modules are lazy).
- **Verify:** after touching any layer entry, load a *different* project page too.

### `src/components/case-studies/StorytellingCaseStudy.jsx`
- **Pages affected:** the 10 projects with `storyChapters` (emobot-plus renders null).
- **Risks:** the compact/full switch (`storyLayout !== 'full'`, line 20) — **no project currently sets `storyLayout`**, so the full chapter-deck branch (lines 70-91) is live code with zero coverage; regressions there won't be seen until someone opts a project into `'full'`.
- **Verify:** one compact project per theme; if editing the full branch, temporarily set `storyLayout: 'full'` on a project to view it.

### `src/components/launch-os/shared/useI18n.js`
- Same consumer set as ModuleFrame. Contract: `useI18n(COPY)` returns `{lang, t: COPY[lang] ?? COPY.en}` — note `t` here is an **object**, not a function. Changing that shape breaks ~120 module files.

### `src/components/ui/Icon.jsx` + `src/data/icons.js`
- **Imported by [V]:** `ProjectPage`, `StorytellingCaseStudy`, `EmobotCaseStudy`, `EmobotAtelier`, home components. Unknown `name` silently falls back to `FiAward` — renaming a key degrades silently.
- **Verify:** visual scan of project hero/back-link, outcomes, story moments, emobot sections.

### `src/hooks/useReveal.js`
- **Imported by:** `HomePage`, `ProjectPage`. Dep arrays `[lang]` / `[slug, lang]` re-run observation after language/route changes.
- **Risks:** anything with `.reveal` that never gets `.visible` stays invisible (opacity 0). Known trap: putting `.reveal` on an element whose `className` React later rewrites from state wipes `.visible`.
- **Verify:** full-page scroll on home + one project after any change touching reveal classes or re-render timing.

## Tier 3 — single-page blast radius

### Any evidence layer (`src/components/<layer>/`)
- **Pages affected:** exactly one project page — *if* you only touch modules, kit, and content file inside that folder. The kit's injected CSS is scoped by the namespace class (`.gx`, `.ds`, …); keep every new selector under it.
- **Cross-layer leaks to watch:** `brain-and-learning/C09_Bridge.jsx` and `field-journey/C07_SkillsBridge.jsx` import `data/projects.js`; module DOM ids must be unique **site-wide enough** for `outcomeModules` anchors and the injectStyles id-space (style ids share the document id namespace with section ids — a duplicate id can silently skip style injection).
- **Verify:** the layer's own page in both languages + one other project page (to catch entry-file breakage via `ProjectExtraSection`).

### `src/data/awards.js` → `AwardsSection` → home `#awards` only. Logo paths live in `public/assets/awards/`; text comes from translation keys in `translations.js` — both files must move together.

### `src/components/home/*` → home page only (but `SkillsSection` hardcodes the layer/skill data — `src/data/skills.js` is dead; edit the component, not the data file).

### Emobot family (`EmobotCaseStudy`, `EmobotAtelier`)
- Page 01 only, **but**: styles live in global `index.css` (`.emobot-case*`, atelier classes) and images are bundled from repo-root `assets/` — renaming/moving those files breaks the build (`new URL` resolution), unlike public-dir layers where a bad path just 404s.

## Data/content sources

| Source | Consumers | Break mode | Check |
|---|---|---|---|
| `vite.config.js` `base` | every runtime URL (`BASE_URL` users) + `dist/index.html` asset links + bare `assets/…` strings | site-wide 404s if changed without updating Pages repo name | `npm run build && npm run preview`, click through |
| `public/` subfolders | deepscout, product-showcase, strategy-platform, field-journey, brain-and-learning, awards, Nav CV link | broken images/links (silent, runtime-only — no build error) | visual pass of the owning page |
| repo-root `assets/` | emobot bundled imports; **duplicated** files also in `public/assets` | build failure on rename (bundled); confusion which copy is live | build + emobot page |
| per-layer `data/*Content.js` | own layer only | single page | that page, both languages |
| Google Fonts / jsdelivr / simpleicons CDNs (`index.html`, `SkillsSection.jsx:6-7`) | typography site-wide; skills icons | degraded rendering offline / blocked regions | load with network throttling or CDN blocked |
