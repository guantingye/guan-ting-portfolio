# Portfolio Copy Architecture

Use this map to locate reader-facing copy in the portfolio without assuming one global translation file.

## Source priority

1. `src/data/translations.js`
   - Shared shell and homepage labels.
   - Pair the same key under `TRANSLATIONS.en` and `TRANSLATIONS.zh`.

2. `src/data/projects.js`
   - Project metadata, overview, outcomes, storytelling blocks, and project-specific evidence links.
   - Common pairs use an English base field and a `zh`-prefixed field: `title` / `zhTitle`, `body` / `zhBody`, `outcomes` / `zhOutcomes`.
   - Nested arrays must remain aligned by item and order.

3. Feature component copy
   - Many evidence modules define local `COPY`, `CONTENT`, `SHELL`, or similarly named constants inside `src/components/**`.
   - Common shapes are `COPY.en` / `COPY.zh`, `{ en, zh }`, or values selected by `lang`.
   - Some feature-level content lives in `src/components/*/data/*.js`.

4. Reader-facing JSX literals
   - A few strings may be embedded directly in JSX or selected with `lang === 'zh'`.
   - Preserve the component's current localization convention unless the requested change requires a missing pair to be added.

## Localization runtime

- `src/app/providers/LanguageProvider.jsx` owns the top-level language state.
- `src/utils/pickLocalized.js` resolves English base fields and `zhX` counterparts.
- Feature modules may use local hooks such as `src/components/launch-os/shared/useI18n.js`.

Inspect the actual render path before choosing a source. A matching string is evidence, not proof, when it appears more than once.

## Search sequence

Run narrow searches from the project root:

```bash
rg -n -F '完整的舊中文片段' src
rg -n -F 'distinctive substring' src/data src/components src/pages
rg -n 'zh[A-Z]|COPY|TRANSLATIONS|lang ===' src/data src/components src/pages
```

Use fixed-string search for screenshot text whenever possible. Search nearby headings or the English counterpart if OCR spacing or punctuation differs.

## Pairing checks

- Shared dictionary: identical key exists in both `en` and `zh` branches.
- Prefixed object: requested English field and `zhField` are both updated.
- Local dictionary: corresponding paths inside `COPY.en` and `COPY.zh` still match structurally.
- Localized object: both `en` and `zh` members remain present.
- Arrays: item counts and semantic order remain identical unless the annotation explicitly inserts or removes an item in both languages.
- Interpolated copy: tokens, placeholders, and values remain intact in both languages.

## Validation baseline

Review only relevant diffs first, then run:

```bash
git diff -- <changed-files>
npm run build
```

If visual preview tools are available, inspect the affected route with both language modes. Source review plus a successful build is not equivalent to visual verification.
