# HANDOFF — How a coding agent should work in this repo

> Companion docs: [PROJECT_MAP.md](PROJECT_MAP.md) (orientation), [ARCHITECTURE.md](ARCHITECTURE.md) (diagrams), [CHANGE_IMPACT_MATRIX.md](CHANGE_IMPACT_MATRIX.md) (blast radius), [KNOWN_RISKS.md](KNOWN_RISKS.md) (traps). In-repo authoring recipes: `SKILL.md` (add a project) and `EVIDENCE_LAYER_TEMPLATE.md` (build an evidence layer) — read them **before** creating anything new; they are the house style and are current, unlike `README_DEPLOY.md`/`DEPLOY_GUIDE_zh.md` which are stale.

## 1. Orient in 5 minutes

1. `src/main.jsx` → `src/app/App.jsx`: hash router (`#/`, `#/project/<slug>`), permanent shell (Nav/Footer/ProgressBar/NeuralCanvas/Cursor).
2. `src/data/projects.js`: the content backbone — 11 project objects + `PROJECT_THEMES`.
3. `src/pages/ProjectPage.jsx`: the fixed page template every project shares.
4. `src/components/case-studies/ProjectExtraSection.jsx`: slug → evidence-layer dispatch. Each layer is a folder under `src/components/` with `data/`, `shared/<x>Kit.jsx`, and `M0x_*/C0x_*` modules.
5. `src/components/launch-os/shared/ModuleFrame.jsx`: shared kernel (`injectStyles`, `useViewport`, reduced-motion) used by **every** layer despite living in the launch-os folder. Treat it as framework code.

Ignore as legacy: `src/main.optimized.jsx`, `_archive/`, committed `dist/`, root `deeptech-*.png`, `src/utils/pickLocalized.js`, `src/data/skills.js`.

## 2. Run & verify

```bash
npm install
npm run dev        # vite dev server; site at http://localhost:5173/guan-ting-portfolio/
npm run build      # required sanity check before finishing any task
npm run preview    # serves dist/ at the same base path
```

- **The base path matters**: every local URL is under `/guan-ting-portfolio/`. Deep-load project pages as `…/guan-ting-portfolio/#/project/<slug>`.
- There are **no tests and no linter** — verification is `npm run build` + visual inspection. A screenshot driver (`shot.mjs`, Chrome `--remote-debugging-pipe`) has been used in past sessions for this.
- When screenshotting: `.reveal` content is `opacity:0` until scrolled into view (`src/styles/index.css:281`). Scroll the page (or add `.visible` via script) before judging "missing" content.
- Always check **both languages** (nav toggle; persisted in `localStorage['portfolio-lang']`) — most regressions are single-language because copy is duplicated per field/COPY branch.

## 3. Safe-change playbook

### Editing one project's content
Edit its object in `src/data/projects.js` (keep `zh*` twins in sync) and/or its layer's `data/*Content.js`. Blast radius: that page only — unless you touch shared fields (`slug`, ordering) — see CHANGE_IMPACT_MATRIX.

### Editing one evidence layer
Stay inside `src/components/<layer>/`. Rules that prevent the recurring bugs:
- Every new CSS selector goes under the layer's namespace class (`.gx`, `.ds`, `.ni`, `.pm`, `.vf`, `.bl`, `.isp`, `.fj`, `.dt`, `.los`).
- `injectStyles('<id>', css)` ids must **never** equal any DOM/section id — the idempotence guard is `document.getElementById(id)` and a section with that id silently blocks injection (KNOWN_RISKS §5.1).
- Never put `reveal` in a `className` that React recomputes from state (KNOWN_RISKS §5.2).
- Keep sub-modules behind `React.lazy` like their siblings; the layer *entry* file is eagerly imported by `ProjectExtraSection`, so a broken entry breaks **all** project pages — load a second project page after editing an entry file.
- Images: put files in `public/<layer>/` and build URLs with `import.meta.env.BASE_URL`. Do not use bare `'assets/…'` strings in new code.

### Adding a new project
Follow `SKILL.md` exactly: (1) new object in `PROJECTS`, (2) theme in `PROJECT_THEMES`, (3) optional layer + one branch in `ProjectExtraSection.jsx`. All three key on the same slug string — grep the slug after wiring to confirm all three sites.

### Touching shared code (framework-level care required)
`ModuleFrame.jsx`, `useI18n.js`, `LanguageProvider.jsx`, `translations.js`, `useRoute.js`, `useReveal.js`, `index.css` project-frame/`story-case` sections, `ProjectPage.jsx`, `StorytellingCaseStudy.jsx`, `Icon.jsx`. For these: consult CHANGE_IMPACT_MATRIX first, then verify home + ≥3 project pages (launch-os, one lazy layer, one motion layer) at desktop and mobile widths, both languages.

### Styling gotchas summary
- Global vs scoped CSS split: shell/home/emobot in `index.css`; everything else kit-injected. Emobot is the exception — its styles are global and its images are bundled from repo-root `assets/`.
- `useI18n(COPY)` returns `{ lang, t }` where **`t` is the resolved copy object**, not a function; the shell's `t('key')` from `useLang()` **is** a function. Don't confuse the two contracts.
- zh typography: `ch`-based widths sized for Latin text need roughly doubling for Chinese.

## 4. Deployment

Push to `main` ⇒ `.github/workflows/deploy.yml` builds (Node 20, `npm ci`, `vite build`) and deploys `dist/` as a Pages artifact to `https://guantingye.github.io/guan-ting-portfolio/`. Consequences:
- **Every push to `main` is a production deploy.** Don't push half-finished work to `main`.
- Do **not** hand-edit or rely on the committed `dist/` — it is stale and unused by the pipeline (candidate for removal + `.gitignore`, but that's a user decision).
- If the site URL/repo name ever changes, update `vite.config.js` `base` **and** audit the bare `'assets/…'` references (Nav, HomeHero, awards.js).

## 5. Conventions to preserve

- App shell files use `React.createElement` (no JSX); evidence layers use JSX. Match the file you're editing.
- Bilingual discipline: every user-visible string needs an en + zh variant via the mechanism already used in that file (field twins / `t()` keys / `COPY` objects).
- Numbered module files (`M01_…`, `C01_…`) with one entry component per layer; content lives in `data/`, presentation in modules, dialect primitives in the kit.
- Commit messages in this repo have been `revise_MMDDHHMM`-style; deploy docs and plans live at repo root, per-layer provenance in `AUDIT.md`/`RECON.md` — add to those rather than inventing new doc locations.
- Data claims in evidence layers are curated/illustrative; per past audits, don't "fix" numbers without checking the layer's `AUDIT.md` provenance notes.

## 6. What NOT to do

- Don't refactor `launch-os/shared/*` "into a proper shared folder" as a drive-by — it's a 10-page blast radius; propose it as its own change.
- Don't edit `src/main.optimized.jsx`, `src/data/skills.js`, or `pickLocalized.js` expecting effects — they're dead (KNOWN_RISKS §1).
- Don't reorder `PROJECTS` casually — it changes card numbering and prev/next chains.
- Don't trust `README_DEPLOY.md`/`DEPLOY_GUIDE_zh.md` for deployment.
- Don't remove the `key: slug` on `ProjectPage` in `App.jsx:29` — it masks a hooks-order hazard (KNOWN_RISKS §5.3).
