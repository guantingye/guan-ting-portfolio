# RECON — UX/HMI Evidence Lab

Conventions found in repo (follow these):

1. **Routing**: hash SPA via `useRoute`; project pages resolve by `slug` in `ProjectPage.jsx`. Extra per-slug content mounts through `ProjectExtraSection.jsx` (rendered right after `StorytellingCaseStudy`, before Outcomes/Tech/Nav) — this is the insertion point.
2. **Language**: `useLang()` (LanguageProvider) exposes `{ lang, t, setLang }`. Modules use shared `useI18n(COPY)` (`launch-os/shared/useI18n.js`) reading `lang`. Every string lives in local `COPY = { en, zh }`.
3. **Styling**: no CSS Modules. Each module injects one `<style>` via `injectStyles(id, css)` (idempotent, from `launch-os/shared/ModuleFrame.jsx`). Styles scoped by a prefix class on the root. Launch-OS uses `.los`; this lab uses `.ghx`.
4. **Design tokens**: Neural Signal OS palette (bg `#060709`→`#1C2028`, teal `#35C2B0`, amber `#E8A33D`, red `#D96A5B`). Fonts already loaded globally: Fraunces (display), Inter (body), JetBrains Mono (data). Reuse via a `.ghx` token block.
5. **Reuse (DRY)**: import `injectStyles`, `usePrefersReducedMotion`, `useViewport` from `launch-os/shared/ModuleFrame.jsx`; `useI18n` from `launch-os/shared/useI18n.js`. Lab adds its own `ModuleFrame`/`SignalGlyph` in `evidence-lab/shared/labKit.jsx`.
6. **Reveal**: global `.reveal` observer runs at page mount (`useReveal`), so it will NOT catch lazily-mounted children. EvidenceLab runs its own IntersectionObserver for reveals + to gate the Pressure Console rAF loop.
7. **No new deps** (react, react-dom, react-icons only). Hand-rolled SVG + CSS transitions only.
8. **Cards to convert** (spec 2.2): `evidenceSlots` in `projects.js` (rendered by `StorytellingCaseStudy`) carry stock Unsplash URLs + "concept placeholder" copy → convert to anchor links into modules, drop stock imagery.
9. **Optimization**: `caseHeroImage` + `caseGallery` for ux-hmi are stock Unsplash → replaced with self-drawn SVG (matches launch-os, which already ships an SVG hero).
10. Lazy mount modules with `React.lazy` + `Suspense` skeletons.
