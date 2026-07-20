# KNOWN_RISKS — Dead code, duplication, fragility

> Legend: **[V]** verified in source · **[I]** likely interpretation · **[?]** unresolved. File:line references are to the current `main` (97f1914).

## 1. Dead / duplicated code

| Item | Evidence | Risk |
|---|---|---|
| **[V]** `src/main.optimized.jsx` (1,982 lines) | imports React from `esm.sh` CDN; referenced by nothing in `index.html` or `src/` | Contains a **full duplicate** of translations/data from an older era. Anyone grepping for copy strings will hit it and may edit the dead copy. Biggest single source of drift. |
| **[V]** `src/utils/pickLocalized.js` | exports `loc`; zero importers (grep) | Dead. The live equivalent is the inline `L()` helper in `ProjectPage.jsx:38` and per-file `PA ?` ternaries — the localization pattern was reimplemented at least 3 ways. |
| **[V]** `src/data/skills.js` | zero importers; `SkillsSection.jsx` hardcodes its own `LAYERS` | Dead data file that looks authoritative. Editing it does nothing. |
| **[V]** committed `dist/` | tracked in git (`git ls-files dist`), but `.github/workflows/deploy.yml` rebuilds from source and deploys the artifact | Stale build masquerading as the deployed site; bloats the repo; no `.gitignore` exists at all. |
| **[V]** `_archive/index-v6-single-file.html` | unreferenced | Harmless but greppable. |
| **[V]** root-level screenshots `deeptech-*.png` (9 files) | tracked at repo root; artifacts of the screenshot-verify workflow | Repo noise; not referenced by code. |
| **[V]** unused chapter-deck branch in `StorytellingCaseStudy.jsx:70-91` | `storyLayout` is set by **no** project in `projects.js` (grep: 0 hits), so `compact` is always true | Live-but-unreachable UI. Also contradicts older docs/notes that described compact as the opt-in — the default has since flipped (comment at line 19). |
| **[V]** `comingSoon` guard in `ProjectPage.jsx:29` | no project sets `comingSoon` (grep: 0 hits) | Latent path, only reachable via a bad slug — fine, but untested. |
| **[V]** stale deploy docs `README_DEPLOY.md`, `DEPLOY_GUIDE_zh.md` | describe "upload index.html + assets, deploy from branch", mention a static `#root` fallback and ESM-CDN React that no longer exist in `index.html` | Actively misleading for a new maintainer; the real flow is the Actions workflow. |

## 2. Circular / unclear dependencies

- **[V] The kernel lives inside a project folder.** All 9 evidence kits import `launch-os/shared/ModuleFrame.jsx` + `useI18n.js`. `launch-os` is simultaneously project 03's implementation *and* the shared framework for projects 02–11. Nothing is circular, but the ownership is misleading: deleting or refactoring "the launch-os project" would take down 10 pages. Any change there must be treated as framework work (see CHANGE_IMPACT_MATRIX Tier 1).
- **[V] Evidence layers reach back into global data.** `brain-and-learning/C09_Bridge.jsx` and `field-journey/C07_SkillsBridge.jsx` import `src/data/projects.js` — the only upward imports from layer → global data. Not circular (projects.js imports nothing from layers), but it breaks the "layers are self-contained" rule and is easy to miss when editing `PROJECTS`.
- **[V] Slug triple-keying.** A project's identity is spread across `PROJECTS[].slug`, `PROJECT_THEMES` (`projects.js:1435`), and the if-chain in `ProjectExtraSection.jsx` — no single source of truth; a mismatch fails silently (theme falls back to `'data'`, extra section renders nothing).

## 3. Inconsistent project-page structures

| Axis | Majority pattern | Outliers **[V]** |
|---|---|---|
| Styling | kit-injected, namespace-scoped CSS | **emobot-plus**: ~1,000 lines of `emobot-case*`/atelier CSS in global `index.css` |
| Module loading | `React.lazy` per module | **launch-os**: all 6 modules eager (`LaunchOsEvidence.jsx:2-6`); emobot eager |
| Story deck | `storyChapters` + compact deck | **emobot-plus** has no `storyChapters` → deck absent |
| Assets | `public/` + `BASE_URL` | **emobot**: bundled `new URL('../../../assets/…')`; **Nav/HomeHero/awards.js**: bare relative `'assets/…'` strings |
| Extra section shape | single entry component | **03** (Evidence + Specimen) and **07** (ProductShowcase + VerificationLayer) mount two |
| Authoring style | shell in `React.createElement`, layers in JSX | mixed styles inside `case-studies/` |

These are tolerable individually; collectively they mean "fix it in one place" rarely holds. `EVIDENCE_LAYER_TEMPLATE.md` and `SKILL.md` document the majority pattern — emobot predates it.

## 4. Duplicated styles & content

- **[V]** `main.optimized.jsx` duplicates the entire translations table and project copy (see §1).
- **[V]** Root `assets/` vs `public/assets/` overlap: `Ye_Guan Ting, CV.pdf`, `cv_visual.webp`, `demo_v1.mp4`, `emobot-live-home.webp` exist in both; root also holds originals (HEIC, PNG masters, 中文-named award scans) that are bundled-or-unused. Which copy is served differs by reference style — a future "optimize this image" edit can easily hit the wrong copy.
- **[V]** Design tokens are re-declared per kit: each kit injects its own `--bg/--line/--text/accent` variable block scoped to its namespace class (intentional "dialect" system per `EVIDENCE_LAYER_TEMPLATE.md`), while `index.css` holds a parallel global token set. Cross-layer visual drift is by design but token *names* overlap, so copy-pasting rules between scopes can silently pick up the wrong values. **[I]**
- **[V]** Module title/id space: module DOM ids and `injectStyles` ids share one document namespace (see §5); a past collision (duplicate M04 title between layers) is documented in `deepscout/AUDIT.md`. **[I]** based on audit note.

## 5. Fragile mechanisms (routing, assets, animation, responsive)

1. **[V] `injectStyles` id vs DOM id.** `ModuleFrame.jsx:8`: `if (document.getElementById(id)) return;` — the guard checks the **whole document**, so if any *section element* uses the same id as a stylesheet id, the stylesheet is silently never injected (recurring bug noted in `deepscout/AUDIT.md` and project memory). Rule: style ids must never equal section/module DOM ids.
2. **[V] `.reveal` starts invisible.** `index.css:281` sets `opacity:0; blur(8px)`; only `useReveal`'s IntersectionObserver adds `.visible`. Two failure modes: (a) content below the fold in screenshots/tests looks "missing" until scrolled; (b) if React re-renders an element whose `className` comes from state and includes `reveal`, the observer-added `visible` class is wiped → permanently invisible content. Never put `.reveal` on a state-driven `className`.
3. **[V] Hooks-order hazard in `ProjectPage.jsx`.** Early `return` at line 29 (unknown/comingSoon slug) sits **between** hook calls — `useReveal`/`useEffect` (lines 23-26) run, but the `useEffect` at line 76 doesn't. Safe today only because `App.jsx:29` remounts via `key: slug`, so a given mount never switches branches. Removing that key, or making a project's validity change at runtime, produces the classic "Rendered fewer hooks than expected" crash.
4. **[V] Bare relative asset URLs.** `'assets/Ye_Guan%20Ting,%20CV.pdf'` (`Nav.jsx:43`), `'assets/cv_visual.webp'` (`HomeHero.jsx:285`), `assets/awards/*` (`awards.js`) resolve against the document URL. They work **only because** hash routing keeps the URL at `/guan-ting-portfolio/`. Any move to path routing, or serving from a different base, breaks them while `BASE_URL`-built paths survive.
5. **[V] `LanguageProvider` clobbers `<html>` classes.** `LanguageProvider.jsx:16`: `document.getElementById('html-root').className = l === 'zh' ? 'lang-zh' : ''` — assignment, not classList toggle. Any other class placed on `<html>` (theme flags, feature flags) will be erased on language change.
6. **[V] External CDNs at runtime.** Google Fonts (`index.html`), devicon via jsdelivr + simpleicons (`SkillsSection.jsx:6-7`). Offline/blocked-CDN environments lose typography and skills icons; also a personal-site privacy consideration.
7. **[V] Eager entry imports.** `ProjectExtraSection.jsx` statically imports all 11 layer entries — a syntax error in any single entry file (not its lazy sub-modules) breaks **every** project page, not just its own.
8. **[V] Monolith pressure points.** `index.css` (7,079 lines, no build-time scoping), `projects.js` (1,447 lines incl. hand-built SVG-in-JS data-URIs — a malformed template string throws at module scope and blanks the site), `EmobotCaseStudy.jsx` (1,323 lines).
9. **[I] Responsive duality.** Shell responds via `index.css` media queries; evidence modules respond via the `useViewport` JS hook (1200/768 breakpoints in `ModuleFrame.jsx:16-17`). The two systems can disagree at boundary widths (CSS `min-width: 768px` vs JS matchMedia race on resize) — no observed bug, but test both mechanisms when changing breakpoints.
10. **[?] GitHub Pages source setting.** If the repo's Pages setting were ever flipped back to "deploy from branch", the stale committed `dist/` and root `index.html` (which references `/src/main.jsx`) would produce a broken or outdated site. Cannot be verified from within the repo.
