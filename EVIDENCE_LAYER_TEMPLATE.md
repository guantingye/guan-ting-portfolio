# Evidence-Layer Template — a reusable playbook for portfolio case studies

This portfolio ships several "evidence layers": dense, interactive case-study
sections that live under a project's standard header. They all share one
architecture and one design system, but each wears a different **dialect** so no
two can be mistaken for each other. This file is the recipe for spinning up a
new one fast, without cloning bugs or breaking the family resemblance.

Reference implementations, newest-first:
`src/components/psymatch/` (registered-report dialect),
`src/components/newsintel/` (wire-service dialect),
`src/components/verification/` (verification-layer dialect),
`src/components/launch-os/` (cockpit dialect).

---

## 1. The mental model

A project detail page is composed top-to-bottom by
[`src/pages/ProjectPage.jsx`](src/pages/ProjectPage.jsx):

```
hero (from projects.js) → overview → StorytellingCaseStudy (cinematic header)
  → ProjectExtraSection → outcomes → tech grid → [YOUR EVIDENCE LAYER] → nav
```

The evidence layer is a single self-mounted component keyed off the slug. It is
**self-contained**: it injects its own CSS, reads the shared language context,
and lazy-loads its modules. You never touch global CSS.

Two tiers of copy:
- **Standard header** (rich but templated) — lives as data in `projects.js`
  (`caseDeck`, `storyMoments`, `storyChapters`, `pullQuote`, `caseHeroImage`).
  Present these and `StorytellingCaseStudy` renders the cinematic case study.
- **Evidence layer** (bespoke) — your new component tree.

---

## 2. Files you create (one folder per project)

```
src/components/<name>/
  <Name>Evidence.jsx        ← layer shell: hero + sticky nav + grouped modules
  shared/<x>Kit.jsx         ← scoped tokens + ModuleFrame + badges + primitives
  data/<x>Content.js        ← sections, module registry, shell copy, references
  M01_*.jsx … Mnn_*.jsx     ← one self-contained component per module
  AUDIT.md                  ← provenance map: every badge justified
```

`<x>` is a **2-letter scope prefix** unique to the project (`ni`, `vf`, `gx`,
`pm`, …). It namespaces every CSS class (`.pm-module`) and every `injectStyles`
id (`'pm-shared'`). Picking a fresh prefix is what keeps the pages isolated.

---

## 3. Reuse, don't fork (the shared core)

These already exist — import them, never reimplement:

```js
import { injectStyles, usePrefersReducedMotion, useViewport }
  from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';   // → { lang, t }
import { useInView, mulberry32 } from '../../evidence-lab/shared/labKit.jsx';
```

- `injectStyles(id, css)` — idempotent `<style>` injection. Guarded by
  `typeof document === 'undefined'`, so it is SSR/headless-safe. Call it once at
  module scope per file.
- `useI18n(copy?)` — reads the page-level language context. Pass a
  `{ en, zh }` object to get the active branch as `t`, or read `lang` and select
  yourself.
- `usePrefersReducedMotion()` / `useViewport()` — media-query hooks.
- `useInView(opts)` → `[ref, inView]` — IntersectionObserver reveal. Returns
  `true` immediately when IO is unavailable (headless-safe).
- `mulberry32(seed)` — deterministic RNG for reproducible "random" visuals.

---

## 4. Design system (Neural Signal OS — shared tokens)

Every kit defines the **same** palette under its own prefix. Copy these values
verbatim; do not invent new hexes.

```
--x-bg-0 #060709   --x-bg-1 #0C0E12   --x-bg-2 #14171D   --x-bg-3 #1C2028
--x-line-1 #262B35 --x-line-2 #333A47
--x-text-1 #F2F0EB --x-text-2 #A8ADB8 --x-text-3 #6B7280
--x-teal #35C2B0   --x-amber #E8A33D  --x-red #E5675A
--x-sky  #57A6E8   --x-iris  #9B95E6
--x-font-display 'Newsreader','Noto Serif TC',serif      (editorial voice)
--x-font-body    'Inter','Noto Sans TC',sans-serif        (UI / body)
--x-font-data    'JetBrains Mono',monospace               (labels, data, code)
--x-r-sm 5px --x-r-md 9px --x-r-lg 14px
--x-ease cubic-bezier(0.22,1,0.36,1)
```

Fonts are already loaded in [`index.html`](index.html). The **dialect** comes
from which accent leads, the module framing, the section-break motif, and the
one signature interaction — *not* from new colors.

Boilerplate every kit's root rule needs (focus rings, sr-only, button reset):

```css
.x *, .x *::before, .x *::after { box-sizing: border-box; }
:where(.x button){ font:inherit;color:inherit;background:none;border:none;padding:0;text-align:inherit;cursor:pointer; }
.x :is(button,a,input,select,[tabindex="0"],[role="slider"]):focus-visible{ outline:2px solid var(--x-teal);outline-offset:2px;border-radius:3px; }
.x-sr-only{ position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0; }
@media (prefers-reduced-motion: reduce){ .x *,.x *::before,.x *::after{ animation:none!important;transition-duration:120ms!important;transition-property:opacity,background-color,border-color,color!important; } }
```

---

## 5. Portfolio-wide content standards (allowed everywhere)

- **Authenticity badges** on every module: `REAL / RECONSTRUCTED / SIMULATED /
  ILLUSTRATIVE`, each with a distinct glyph (survives grayscale) and a
  provenance tooltip. Never stamp `REAL` on data you cannot cite. Record every
  decision in `AUDIT.md`.
- **Passive role chips** in the module header: 1–3 mono labels
  (`AIPD / UXR / PD / FE / TPM`), tooltip only, no interactivity.
- **"So what" strip** ends every module: mono `READ →` + one sentence naming
  the capability the artifact proves.
- **Bilingual** EN + 繁中 via `useI18n`. Author EN first. Mono stamps/captions
  stay English in both languages; everything else translates.
- **References** block for any cited literature — real, verifiable anchors only.
  A fabricated citation is disqualifying.
- **Banned words** — sweep before shipping. EN: seamless, cutting-edge,
  revolutionize, delve, leverage(v), robust, empower, game-changing, unlock,
  elevate, holistic, synergy, world-class, best-in-class, state-of-the-art,
  transformative, "innovative solution", passionate, utilize, streamline,
  supercharge, next-generation, powerful, effortlessly, "journey"/"landscape"
  as filler. 繁中: 賦能、顛覆、極致、無縫、革命性、當責、一站式解決方案、完美、
  卓越、領先業界、深耕、助力、賦予、全方位、不二之選、絕佳、最強、震撼、爆款、
  天花板. Add domain-specific bans per page (e.g. clinical claims).

---

## 6. Differentiation — the reserved-pattern rule (critical)

Each page owns a signature vocabulary. **Do not reuse another page's.**

| Page | Reserved (do not copy) |
|---|---|
| Launch OS | RICE tables, risk matrix, experiment designer, force-directed knowledge graph, design-system specimen lab, chat sims, cockpit |
| Verification | phase rail DISCOVER→REFLECT, Role Filter UI, Confidence Topography |
| News Intelligence | wire-feed ticker, FIDELITY filter chips, prompt-diff viewer, pipeline signal-trace animation, before/after drag comparator, component state strips |
| PsyMatch | registered-report apparatus, Fig./Table + footnotes, slider→radar algorithm playground |

**Allowed anywhere** (structure, not signature): the layer shell, sticky
section nav *as pure navigation* (no filtering), badges, role chips, so-what
strips, reveal-on-scroll, bilingual, a11y patterns.

When you start a new page, first pick its **one dialect** and **one signature
interaction**, then check the table above to be sure both are free.

---

## 7. The layer shell (skeleton)

```jsx
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { injectStyles, useI18n, useInView } from './shared/xKit.jsx';
import { SECTIONS, MODULES, SHELL } from './data/xContent.js';

const COMPONENTS = { M01: lazy(() => import('./M01_Foo.jsx')), /* … */ };

export default function XEvidence() {
  const { lang } = useI18n();
  const t = SHELL[lang] ?? SHELL.en;
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {                      // scroll-spy → highlight current section
    const nodes = SECTIONS.map(s => document.getElementById(`x-sec-${s.id}`)).filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(es => {
      const vis = es.filter(e => e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id.replace('x-sec-', ''));
    }, { rootMargin: '-14% 0px -74% 0px' });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  });

  const grouped = SECTIONS.map(s => ({ section: s, modules: MODULES.filter(m => m.section === s.id) }));
  return (
    <section className="x x-layer proj-section" aria-label={t.eyebrow}>
      <header className="x-hero reveal">{/* eyebrow, title, lead, meta */}</header>
      <nav className="x-nav" /* sticky; pure navigation, aria-current={active} */ />
      {grouped.map(({ section, modules }) => (
        <div key={section.id} id={`x-sec-${section.id}`} className="x-secgroup">
          {/* section divider */}
          {modules.map(m => (
            <Suspense key={m.id} fallback={<Skeleton/>}>{React.createElement(COMPONENTS[m.key])}</Suspense>
          ))}
        </div>
      ))}
    </section>
  );
}
```

Wrap the shell class with `proj-section` so it inherits the page's vertical
rhythm.

## 8. A module (skeleton)

```jsx
import React from 'react';
import SectionModule, { useI18n, injectStyles } from './shared/xKit.jsx';
import { MODULES } from './data/xContent.js';
const MOD = MODULES.find(m => m.key === 'M01');
const COPY = { en: { title:'…', lead:'…', soWhat:'…' }, zh: { /* … */ } };

export default function M01_Foo() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat}>
      {/* bespoke body — SVG/DOM only, no stock images */}
    </SectionModule>
  );
}
injectStyles('x-m1', `/* module-scoped css */`);
```

`SectionModule` (in the kit) renders: eyebrow (`§/section · MODULE Mn`) + rule +
numbered title + lead + role chips + your children + the so-what strip. Copy it
from `psyKit.jsx` and re-skin the header to your dialect.

---

## 9. Data module (skeleton)

```js
export const SECTIONS = [ { id:'s1', tag:'§1', name:'…', full:{en:'…',zh:'…'} }, … ];
export const MODULES  = [ { id:'x-m1', key:'M01', num:'M1', no:'1.1', section:'s1',
                            badge:'real', roles:['UXR','FE'] }, … ];
export const SHELL = { en:{ eyebrow, title, lead, meta:[…], navLabel, … }, zh:{ … } };
export const REFERENCES = [ { n:1, cite:{en,zh}, href? }, … ];   // real only
```

---

## 10. Wiring into the site (3 edits)

1. **`src/data/projects.js`** — replace/enrich the project object. For a rich
   header add `caseHeroImage` (self-drawn SVG), `caseDeck`, `storyMoments`,
   `storyChapters`, `pullQuote`. Add the slug to `PROJECT_THEMES`.
2. **`src/pages/ProjectPage.jsx`** — import the layer and mount by slug:
   ```jsx
   slug === '<your-slug>' && React.createElement(XEvidence, null),
   ```
3. **`ProjectExtraSection.jsx`** — only if you need slug-specific content
   *above* the outcomes; otherwise leave it returning `null`.

---

## 11. Accessibility & performance checklist

- Interactive controls are real elements (`<input type="range">`, `<button>`,
  `<select>`) with labels and value text; announce async results via a debounced
  `aria-live="polite"` region.
- Any chart is `role="img"` + a text alternative that lists the values; color is
  never the only channel — pair it with a shape, label, or legend.
- Dialogs are focus-trapped, Esc-closable, and restore focus on close.
- Honor `prefers-reduced-motion` globally (final state, no looping animation).
  Provide a non-motion way to reach every state (presets, not just drags).
- Lazy-mount modules; reserve min-heights to avoid layout shift; keep contrast
  ≥ 4.5:1 (muted mono is the usual failure — check it).

---

## 12. Ship checklist

```
[ ] Fresh 2-letter scope prefix; no class/injectStyles-id collision with siblings
[ ] One dialect + one signature interaction, both free per §6 table
[ ] Every module: badge (true provenance), role chips, so-what strip
[ ] Bilingual complete; mono stamps stay English
[ ] References real; every footnote resolves
[ ] Banned-word grep (EN + 繁中 + domain) returns zero hits
[ ] Renders at 360 / 768 / 1280; keyboard-only walkthrough completes
[ ] prefers-reduced-motion: no animation; all states still reachable
[ ] AUDIT.md written; projects.js + ProjectPage wired; theme added
[ ] npm run build passes; headless render shows 0 console errors
```

---

*One instinct to carry across every page: show the real thing, label what is
reconstructed, and let the visitor operate it. The dialect is the costume; the
honesty is the product.*
