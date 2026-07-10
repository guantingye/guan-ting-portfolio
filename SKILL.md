# Add-a-Project Skill — the systematic recipe for a new portfolio case study

This skill defines how to add a new project to this portfolio so it reads like the
existing eight — same rhythm, same typography, same bilingual discipline, same
"Neural Signal OS" visual language. Follow it and a new case study will drop in
without looking bolted on.

Its sibling doc, **`EVIDENCE_LAYER_TEMPLATE.md`**, covers the *optional* deep
interactive evidence layer (the `M0x` modules). This doc is the level above it:
the whole-project entry and the page structure every project shares.

---

## 0. Mental model

**One project = one object in `src/data/projects.js`.** The page shell
(`src/pages/ProjectPage.jsx`) renders a *fixed* structure from that object's
fields — you almost never touch the shell. To add a project you:

1. add one entry to the `PROJECTS` array,
2. give it a theme in `PROJECT_THEMES`,
3. (optional) build an interactive evidence module and dispatch it from
   `src/components/case-studies/ProjectExtraSection.jsx`.

The richness of a project is decided by **which optional fields you fill in**, not
by editing the page. Fill the storytelling block and it appears; omit it and that
project quietly skips it. The goal is that every project fills the same core set,
so they read as one system.

---

## 1. The canonical page structure (do not reorder)

Every project page renders in exactly this order. This is the spine the whole
portfolio is tuned to; keep new projects on it.

```
┌ HERO ─────────────── category · title · hook · stack tags · meta (role/timeline/status/impact)
│ OVERVIEW ─────────── 2–4 paragraphs (the "opening")
│ STORYTELLING CASE ── the "middle": case hero image, live deck, story moments,
│                       chapter tabs, pull quote        ← StorytellingCaseStudy
│ EVIDENCE MODULE ───── the big interactive module for this project (middle)
│                                                       ← ProjectExtraSection
│ KEY OUTCOMES ──────── numbered outcome list
│ TECHNICAL APPROACH ── 6-cell tech grid
│ AWARDS ────────────── only if awards[] is non-empty
└ PREV / NEXT NAV
```

**The load-bearing rule:** the big interactive module **always sits in the middle**
(via `ProjectExtraSection`), *before* KEY OUTCOMES / TECHNICAL APPROACH — so the
page always **closes on TECHNICAL APPROACH**, never on a giant module bolted on
after it. Do not add per-slug mounts after the tech grid in `ProjectPage.jsx`;
route everything through `ProjectExtraSection`.

---

## 2. The data schema (a `PROJECTS[]` entry)

Bilingual rule: **every reader-facing string has an English field and a `zh…`
twin** (`title`/`zhTitle`, `body`/`zhBody`, …). The renderer picks by language and
falls back to English if a `zh…` is missing — but aim for full parity.

### 2.1 Required on every project

| Field | Notes |
|---|---|
| `slug` | kebab-case, unique; used in the URL and every dispatch `switch` |
| `num` | two-digit order string, e.g. `'09'` |
| `category` / `zhCategory` | small eyebrow above the title |
| `title` / `zhTitle`, `subtitle` / `zhSubtitle` | |
| `hook` / `zhHook` | one-sentence italic promise under the title |
| `stack` | array of short tech tags (hero chips) |
| `role` / `zhRole`, `timeline`, `status` / `zhStatus`, `impact` / `zhImpact` | the four hero meta cells |
| `overview` / `zhOverview` | paragraphs joined by `\n\n` (split on render) |
| `outcomes` / `zhOutcomes` | array of outcome sentences (KEY OUTCOMES) |
| `tech` | array of `{ label, val }` — aim for **exactly 6** (2×3 grid) |
| `awards` | `[]` if none, else `[{ iconKey, title, desc }]` |

### 2.2 The storytelling "middle" block (fill this — it's what makes a project feel complete)

| Field | Shape | Purpose |
|---|---|---|
| `caseHeroImage` | data-URI SVG string | self-drawn cover (see §4) |
| `caseDeck` | `{ eyebrow, title, body, kpis:[{label,value}], signals:[…] }` (+ `zh…`) | the "live cockpit" panel + 3 KPIs + signal cloud |
| `storyMoments` | `[{ iconKey, title, body }]` ×3 (+ `zh…`) | three framing cards beside the deck |
| `storyChapters` | `[{ iconKey, label, title, body, artifact }]` ×5 (+ `zh…`) | the tabbed chapter narrative — the heart of the middle |
| `pullQuote` / `zhPullQuote` | string | one memorable line |

### 2.3 Optional deep-link extras

| Field | Shape | Purpose |
|---|---|---|
| `outcomeModules` | `[{ num, id }]` aligned to `outcomes` | adds "→ see Module NN" links that scroll to a module DOM id |
| `evidenceSlots` | `[{ iconKey, title, desc, anchor, anchorNum }]` (+ `zh…`) | "Working Evidence" cards that jump into modules |
| `credentials` | `[{ iconKey, name, issuer, relevance }]` | "Credential Evidence" cards |

Only add `outcomeModules` / `evidenceSlots` **anchors that really exist** as DOM
ids in that project's evidence layer — a dead scroll target is worse than none.

### 2.4 Copy-paste skeleton

```js
{
    slug: 'my-project', num: '09',
    category: 'AI Product · Domain', zhCategory: 'AI 產品 · 領域',
    title: 'My Project', subtitle: 'One-line positioning',
    zhTitle: 'My Project', zhSubtitle: '一句話定位',
    hook: 'A single promise sentence.', zhHook: '一句承諾。',
    stack: ['React', 'FastAPI', 'SQL'],
    role: 'Founder / Designer', zhRole: '創辦人 / 設計',
    timeline: '2025 – 2026', status: 'Live MVP', zhStatus: '上線 MVP',
    impact: 'Headline metric', zhImpact: '關鍵指標',
    overview: "Para 1.\n\nPara 2.\n\nPara 3.",
    zhOverview: "第一段。\n\n第二段。\n\n第三段。",
    outcomes: ['Outcome one.', 'Outcome two.'],
    zhOutcomes: ['成果一。', '成果二。'],
    tech: [{ label: 'Frontend', val: '…' }, /* …aim for 6… */],
    caseHeroImage: MY_HERO_IMAGE, // a `const` defined above PROJECTS (see §4)
    caseDeck: {
        eyebrow: 'Cockpit', zhEyebrow: '駕駛艙',
        title: '…', zhTitle: '…', body: '…', zhBody: '…',
        kpis: [{ label: 'A', value: '6', zhLabel: 'A' } /* ×3 */],
        signals: ['One', 'Two'], zhSignals: ['一', '二'],
    },
    storyMoments: [ /* ×3 { iconKey, title, zhTitle, body, zhBody } */ ],
    storyChapters: [ /* ×5 { iconKey, label, zhLabel, title, zhTitle, body, zhBody, artifact, zhArtifact } */ ],
    pullQuote: '…', zhPullQuote: '…',
    awards: [],
},
```

---

## 3. Typography (unified — do not introduce new fonts)

The whole portfolio now uses **one display serif**. Titles are the thing that must
stay consistent across projects.

| Token | Font | Used for |
|---|---|---|
| `--font-serif` | **Fraunces** | all display / titles — hero title, `.story-case-title`, section headings |
| `--font-sans` | **Plus Jakarta Sans** | body / meta values |
| `--font-mono` | **JetBrains Mono** | eyebrows, labels, KEY OUTCOMES / TECHNICAL APPROACH kickers, data |
| CJK | **Noto Serif TC / Noto Sans TC** | auto per-glyph fallback in `zh` mode |

Inside a deep evidence module, display type is `Fraunces` and dense body is
`Inter` (a deliberate "embedded product UI" tier) — but **headings are Fraunces
everywhere**. Rules:

- **Never** add a new display font (no Newsreader / Syne / Instrument Serif /
  Space Grotesk). Fraunces is the single title face. If you need a weight, load it
  in `index.html` (Fraunces is loaded at 300/400/500/700).
- Reach for tokens (`var(--font-serif)`), not hard-coded family names.
- A per-project accent (e.g. Emobot's light theme) may retint, but must inherit
  Fraunces for display via the shared token — do not fork the type system.

---

## 4. The self-drawn SVG cover convention (no stock photos)

Every `caseHeroImage` is a **hand-authored SVG** encoded as a data URI, defined as
a `const` above the `PROJECTS` array (see `DEEPTECH_HERO_IMAGE`, `ISP_HERO_IMAGE`,
`NEWS_HERO_IMAGE`, `STARTUP_HERO_IMAGE` for worked examples). It's a schematic
wireframe of the system — sources → core → outputs — in the palette below. No
photography, no clip-art.

**Neural Signal OS palette** (full token list in `EVIDENCE_LAYER_TEMPLATE.md` §4):

| Role | Hex |
|---|---|
| background | `#0C0E12` / `#14171D` |
| panel / surface | `#14171D` / `#1C2028` |
| border | `#262B35` / `#333A47` |
| bar / muted fill | `#2A303C` |
| **teal (primary)** | `#35C2B0` |
| **amber (accent / the "one exception")** | `#E8A33D` |
| muted text | `#6B7280` |

Convention: most nodes teal, exactly one amber node marks the interesting
exception; mono `<text>` labels for captions.

---

## 5. Content standards (the voice)

- **Show judgment, not just features.** Outcomes and chapters describe decisions,
  tradeoffs, and what changed — not a feature list.
- **Only verified numbers.** Every KPI/metric must be real and defensible; do not
  invent figures. If a thing is a concept, label it a concept (see the Strategy
  Platform's honestly-labelled AI layer).
- **Cross-link the portfolio.** Where projects genuinely relate, reference each
  other by number (e.g. "the same delivery surface project 06 is built around").
- **Bilingual parity.** Fill every `zh…` twin; keep numbers identical across
  languages.

---

## 6. The optional interactive evidence layer

If the project deserves a deep interactive layer (a live console, module gallery,
etc.), build it per **`EVIDENCE_LAYER_TEMPLATE.md`** and remember:

- Scope all CSS to a short project token prefix (`.dt`, `.gx`, `.ni`, `.pm`,
  `.vf`, `.isp`, …) via a `shared/xxKit.jsx` so styles never leak.
- Lazy-load modules (`lazy(() => import('./M0x_…jsx'))`) — the site is one bundle.
- Reuse the shared kit's tokens; do **not** redeclare `--xx-font-display`
  as anything but Fraunces.
- Mount it **only** through `ProjectExtraSection` (the middle slot).

A project without a deep layer is still complete — it just renders the
storytelling middle and skips the module. `ProjectExtraSection` returns `null` for
unknown slugs, which is fine.

---

## 7. Wiring checklist (files you touch)

1. **`src/data/projects.js`** — add the `PROJECTS` entry (+ its `*_HERO_IMAGE`
   const above the array). Increment `num`.
2. **`src/data/projects.js` → `PROJECT_THEMES`** — map `slug` → a theme key
   (`emobot`/`data`/`ai`/`research`/`map`/`platform`). The theme sets
   `--proj-accent` and per-theme title tweaks.
3. **`src/components/case-studies/ProjectExtraSection.jsx`** — add an
   `if (slug === 'my-project') return React.createElement(MyEvidence, null);`
   line *only if* the project has an interactive module.
4. **`src/data/translations.js`** — only if you introduced new UI strings (the
   shell labels like KEY OUTCOMES are already translated).

The home grid, routing, prev/next nav, progress bar, and section labels all pick
the new project up automatically from `PROJECTS`.

---

## 8. Ship checklist

- [ ] All required fields present; every `zh…` twin filled.
- [ ] `tech` has ~6 cells; `caseDeck.kpis` and `storyMoments` have 3;
      `storyChapters` has 5.
- [ ] `caseHeroImage` is a self-drawn SVG in the palette (no stock imagery).
- [ ] No new display font introduced; titles resolve to Fraunces.
- [ ] Big module (if any) dispatched via `ProjectExtraSection`; **nothing** mounted
      after TECHNICAL APPROACH in `ProjectPage.jsx`.
- [ ] `outcomeModules` / `evidenceSlots` anchors point at real DOM ids.
- [ ] `npm run build` is clean.
- [ ] Eyeball both languages and the mobile width; the page reads
      opening → middle → KEY OUTCOMES → TECHNICAL APPROACH.
