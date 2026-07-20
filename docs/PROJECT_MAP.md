# PROJECT_MAP — Repository Orientation

> Reconstructed from code evidence on 2026-07-20. Legend: **[V]** verified in source · **[I]** likely interpretation · **[?]** unresolved.

## What this is

**[V]** A single-page bilingual (en/zh) portfolio site — "Guan-Ting Ye · Neural Signal OS" — built with **React 18.3 + Vite 6**, no TypeScript, no router library, no CSS framework (`package.json`: deps are only `react`, `react-dom`, `react-icons`, `motion`). Deployed to GitHub Pages at base path `/guan-ting-portfolio/` (`vite.config.js:6`).

Two structural halves:

1. **App shell + page frame** — written in `React.createElement` style (no JSX) in `src/app/`, `src/pages/`, `src/components/layout|home|case-studies|ui/`, styled by one global stylesheet `src/styles/index.css` (7,079 lines).
2. **Eleven per-project "evidence layers"** — JSX module families under `src/components/<layer>/`, each self-contained: own `shared/*Kit.jsx`, own `data/*Content.js`, own CSS injected at import time and scoped under a namespace class (`.los`, `.gx`, `.ds`, `.ni`, `.pm`, `.vf`, `.bl`, `.isp`, `.fj`, `.dt`).

## Entry points

| File | Role |
|---|---|
| `index.html` | **[V]** Only HTML page. Static shell: `#neural-canvas`, `#cursor-dot`/`#cursor-ring`, `#root` with a "LOADING SIGNAL..." placeholder, Google Fonts `<link>`, then `<script type="module" src="/src/main.jsx">`. |
| `src/main.jsx` | **[V]** Real entry: imports `src/styles/index.css`, mounts `src/app/App.jsx` into `#root`. |
| `src/main.optimized.jsx` | **[V] dead** — 1,982-line legacy single-file build that imports React from `esm.sh` CDN. Referenced by nothing in `index.html` or `src/`; only mentioned by the (stale) `README_DEPLOY.md` / `DEPLOY_GUIDE_zh.md`. |
| `_archive/index-v6-single-file.html` | **[V] archived** legacy page, unreferenced. |

## Routing

**[V]** Custom hash router, `src/hooks/useRoute.js` (21 lines). No route table — two shapes only:

- `#/` → `HomePage`
- `#/project/<slug>` → `ProjectPage` (any other hash also falls through to home, since only `parts[0] === 'project'` produces a slug)

`navigate(hash)` sets `window.location.hash` and scrolls to top on the next frame. `src/app/App.jsx:28-30` swaps `ProjectPage` (keyed by slug) vs `HomePage`; the shell around them — `NeuralCanvas`, `Cursor`, `ProgressBar`, `Nav`, `Footer` — is always mounted (`App.jsx:16-31`).

Valid slugs are whatever exists in `PROJECTS` (`src/data/projects.js:405-1433`); an unknown slug renders the "coming soon" fallback in `ProjectPage.jsx:29-35`.

## Page modules

### HomePage (`src/pages/HomePage.jsx`)
Sections in order, each an id target for `Nav`: hero (`HomeHero`), `#story` timeline (data inlined in `HomePage.jsx:14-25` from translation keys), `#work` grid of `ProjectCard` over `PROJECTS`, `#skills` (`SkillsSection` — exploded-stack view, layer data hardcoded in the component, **not** from `src/data/skills.js`), `#awards` (`AwardsSection` ← `src/data/awards.js`), `#contact` (inlined in HomePage).

### ProjectPage (`src/pages/ProjectPage.jsx`)
**[V]** One fixed template driven entirely by the project object from `projects.js`:

```
back-link → hero (category/title/stack/meta) → 專案概述 overview
→ StorytellingCaseStudy (cinematic deck, from p.storyChapters/caseDeck/storyMoments)
→ ProjectExtraSection (per-slug interactive evidence layer)
→ KEY OUTCOMES (with optional p.outcomeModules anchor links "→ see Module NN")
→ TECHNICAL APPROACH grid → optional awards → optional CertificateWall → prev/next nav
```

`ProjectExtraSection.jsx` is the **single dispatch point** mapping slug → evidence layer (11 branches, `ProjectExtraSection.jsx:22-47`).

### Evidence layers (slug → components)

| # | Slug | Theme (`PROJECT_THEMES`) | Entry component | Dir | CSS scope / style-id | Modules | Loading |
|---|---|---|---|---|---|---|---|
| 01 | emobot-plus | emobot | `EmobotCaseStudy` (+`EmobotAtelier`) | `case-studies/` | **global** `.emobot-case`/atelier classes in `index.css` | — | eager |
| 02 | deeptech-database | data | `DataroomEvidence` | `dataroom/` | `.dt` / `dt-shared` | M01–M07 | `React.lazy` ×7 |
| 03 | ai-product-launch-os | ai | `LaunchOsEvidence` + `DesignSystemSpecimen` | `launch-os/` | `.los` / `los-shared-styles` | 6 named modules | **eager** |
| 04 | ai-news-intelligence | ai | `NewsIntelEvidence` | `newsintel/` | `.ni` / `ni-shared` | M01–M16 + MP | lazy ×17 |
| 05 | ux-hmi-interaction-lab | research | `EvidenceLab` | `evidence-lab/` | `.gx` / `gx-shared-styles` | M01–M09 | lazy ×9 |
| 06 | industry-strategy-platform | map | `StrategyPlatformEvidence` | `strategy-platform/` | `.isp` / `isp-shared` | M01–M12 | lazy ×12 |
| 07 | startup-intelligence-platform | platform | `ProductShowcase` + `VerificationLayer` | `product-showcase/`, `verification/` | `.vf` / `vf-shared` | 14 lettered modules | lazy ×14 |
| 08 | psymatch | research | `PsyMatchEvidence` | `psymatch/` | `.pm` / `pm-shared` | M01–M17 | lazy ×17 |
| 09 | deepscout | ai | `DeepScoutEvidence` | `deepscout/` | `.ds` / `ds-shared` | M01–M11 + MB | lazy ×12 |
| 10 | field-journey | field | `FieldJourneyEvidence` | `field-journey/` | `.fj` / `fj-shared-styles` | C01–C07 | lazy ×7 |
| 11 | brain-and-learning | mind | `BrainLearningEvidence` | `brain-and-learning/` | `.bl` / `bl-shared-styles` | C01–C09 | lazy ×9 |

**[V]** emobot-plus is the outlier: no `storyChapters` in its data (so `StorytellingCaseStudy` returns `null`, `StorytellingCaseStudy.jsx:8`), its styles live in the global stylesheet, and it bundles images via `new URL('../../../assets/…', import.meta.url)`.

## Shared components & hooks

| Symbol | File | Consumers |
|---|---|---|
| `injectStyles`, `useViewport`, `usePrefersReducedMotion` | `src/components/launch-os/shared/ModuleFrame.jsx` | **[V] all 9 evidence kits** re-export from here (`labKit`, `dsKit`, `niKit`, `psyKit`, `vfKit`, `blKit`, `ispKit`, `fjKit`, `dtKit`) — launch-os/shared is the de-facto framework layer |
| `useI18n(copy)` | `src/components/launch-os/shared/useI18n.js` | same 9 kits + launch-os modules; wraps `useLang()` |
| `useLang` / `LangProvider` | `src/app/providers/LanguageProvider.jsx` | app shell, pages, indirectly every evidence module via `useI18n` |
| `useReveal` | `src/hooks/useReveal.js` | `HomePage`, `ProjectPage` only — IntersectionObserver adds `.visible` to `.reveal` elements |
| `Icon` + `ICONS` | `src/components/ui/Icon.jsx`, `src/data/icons.js` | pages, case-studies, home components (react-icons/fi) |
| `scrollTo` | `src/utils/scrollTo.js` | `Nav`, `Footer`, `HomeHero` |
| `StorytellingCaseStudy`, `ProjectExtraSection` | `src/components/case-studies/` | `ProjectPage` only |
| `CertificateWall` | `src/components/cert-wall/CertificateWall.jsx` | `ProjectPage` (projects with `certWall`) |
| `MotionSection` | `src/components/home/MotionSection.jsx` | HomePage sections (motion/react in-view wrapper) **[I]** |

**[V] Dead utilities:** `src/utils/pickLocalized.js` (exports `loc`, zero importers) and `src/data/skills.js` (zero importers — `SkillsSection` hardcodes its `LAYERS` data).

## Data / content sources

- `src/data/projects.js` (1,447 lines) — **the** content backbone: `PROJECTS` (11 objects: copy in en + `zh*` twins, `storyChapters`, `caseDeck`, `storyMoments`, `outcomes`, `tech`, `awards`, `certWall`, `outcomeModules`, plus self-drawn SVG hero covers as `data:image/svg+xml` URIs built at module top) and `PROJECT_THEMES` (slug → theme token, `projects.js:1435`).
- `src/data/translations.js` — shell/home UI strings (`TRANSLATIONS.en/zh`), consumed only by `LanguageProvider`.
- `src/data/awards.js` — `AWARDS_DATA` for `AwardsSection` (text via translation keys, logos via `assets/awards/*` public paths).
- Per-layer content files: `dataroom/data/dtContent.js`, `deepscout/data/dsContent.js`, `newsintel/data/newsIntelContent.js`, `psymatch/data/psyContent.js` (+ `algorithmData.js`, `matchEngine.js`), `strategy-platform/data/strategyPlatformContent.js`, `field-journey/data/fjContent.js`, `brain-and-learning/data/blContent.js`, `verification/data/verificationContent.js`, `product-showcase/productContent.js`.
- In-repo process docs: `SKILL.md` (add-a-project recipe), `EVIDENCE_LAYER_TEMPLATE.md` (evidence-layer recipe), `PLAN_*.md`, per-layer `AUDIT.md`/`RECON.md`.

### Asset conventions — three coexisting mechanisms **[V]**

1. **Bundled**: `new URL('../../../assets/…', import.meta.url)` — repo-root `assets/` files hashed into `dist/assets/` (only `EmobotCaseStudy.jsx`, `EmobotAtelier.jsx`).
2. **Public + BASE_URL**: `import.meta.env.BASE_URL + 'deepscout/…'` etc. — files under `public/{assets,product,deepscout,field-journey,brain-and-learning,strategy-platform}/` copied verbatim to `dist/`.
3. **Bare relative strings**: `'assets/cv_visual.webp'` (`HomeHero.jsx:285`), `'assets/Ye_Guan%20Ting,%20CV.pdf'` (`Nav.jsx:43,60`), `assets/awards/*` (`awards.js`) — resolve against the page URL; work only because hash routing keeps the document URL at `/guan-ting-portfolio/`, and hit `public/assets/*`.

Repo-root `assets/` and `public/assets/` **overlap** (both contain the CV PDF, `cv_visual.webp`, `demo_v1.mp4`, …) — see KNOWN_RISKS.

## Animation & styling systems

- **Global CSS**: `src/styles/index.css` — design tokens, shell, nav, home sections, project-page frame (`proj-*`), story deck (`story-case-*`), emobot case (`emobot-case*`, atelier), skills exploded stack (`.fst-*`), `.reveal` (starts `opacity:0; blur(8px)` until `.visible`, `index.css:281-296`).
- **Scoped injected CSS**: each evidence layer injects its stylesheet once via `injectStyles(id, css)` (`ModuleFrame.jsx:7-14` — idempotent **by DOM id**; note the id collides with any element carrying the same id, see KNOWN_RISKS).
- **Scroll reveal**: `useReveal` (IO, threshold 0.08) for shell/pages; evidence layers have their own kit-level `Reveal`/`useInView` helpers **[V for labKit/dsKit exports]**.
- **motion/react** (`motion` package): `ProgressBar` (spring scroll progress), `MotionSection`, `HomeHero`, and the two "warm" layers `field-journey` and `brain-and-learning` (grep-verified import list).
- **Canvas**: `NeuralCanvas` draws into the static `#neural-canvas` element from `index.html`.
- **Theming**: `ProgressBar` and `ProjectPage` root carry `data-theme` from `PROJECT_THEMES`; zh mode toggles a `lang-zh` class on `<html id="html-root">` (`LanguageProvider.jsx:16-21`), which font-swaps via CSS **[I]**.

## Build & deployment

**[V]**
- Scripts: `npm run dev` / `npm run build` / `npm run preview` (plain Vite).
- `vite.config.js`: `base: '/guan-ting-portfolio/'`, output `dist/`.
- **Actual deploy path**: `.github/workflows/deploy.yml` — on push to `main`: checkout → Node 20 → `npm ci` → `npm run build` → `upload-pages-artifact` (`path: dist`) → `deploy-pages`. GitHub Pages serves the **workflow artifact**, not a branch.
- The committed `dist/` directory in git is therefore **not** what gets served; it is a stale build snapshot (no `.gitignore` exists in the repo).
- `README_DEPLOY.md` / `DEPLOY_GUIDE_zh.md` describe the **old** single-file deploy ("upload index.html + assets/, deploy from branch") and no longer match reality.
