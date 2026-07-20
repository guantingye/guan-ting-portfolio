---
name: apply-annotated-bilingual-copy
description: Apply Chinese frontend copy changes marked in annotated screenshots, locate the corresponding source text in this portfolio, and update the paired English translation with the same meaning. Use when the user uploads one or more UI screenshots containing 修改 notes, arrows, boxes, strikeouts, or replacement text and asks to revise website wording, synchronize Traditional Chinese and English copy, remove or insert labeled content, or verify bilingual content parity. Also use for text-only follow-up corrections to a previously annotated copy task. Do not use for visual redesigns, image editing, or layout-only requests.
---

# Apply Annotated Bilingual Copy

Turn annotated Chinese UI screenshots into narrow, verified bilingual source edits. Treat the screenshot as the change brief and the repository as the source of truth.

## Workflow

### 1. Read the annotation as a change request

- Inspect every supplied image before editing.
- Separate the existing UI text from the user's annotation. Treat labels such as `修改`, arrows, boxes, strikeouts, and handwritten replacement text as instructions rather than page content.
- Record each requested operation as replace, insert, delete, or clarify.
- Preserve exact facts, names, numbers, dates, punctuation intent, and requested line structure.
- If a character is uncertain, compare it with the existing source and surrounding UI. Ask one concise question only when the uncertainty would materially change the result and cannot be resolved from the repository.
- When several screenshots describe the same block, combine them into one change set and let the most specific or latest annotation win.

### 2. Map the screenshot to rendered source

Read [references/portfolio-copy-architecture.md](references/portfolio-copy-architecture.md) before the first repository search in each task.

- Identify the route, section, component, and nearby stable text from visual landmarks.
- Search exact old Chinese text first with `rg`; if that fails, search a distinctive substring, English counterpart, heading, route slug, or adjacent label.
- Trace the render path before editing. Confirm the matched source actually feeds the screenshot's page.
- Edit the owning data or copy object, not generated output, screenshots, build artifacts, or duplicated rendered markup.
- If the same phrase occurs in several locations, use route and component context to choose the intended occurrence. Never run a blind repository-wide replacement.

### 3. Build the bilingual pair

- Apply the user's supplied Chinese wording faithfully in Traditional Chinese.
- Write the paired English as natural product/portfolio copy with the same claim, tone, specificity, and information hierarchy. Translate meaning rather than word order.
- Keep proper nouns, metrics, dates, product names, and evidence strength aligned across languages. Do not strengthen claims or invent facts during translation.
- Match the local English voice and UI length when multiple translations are valid.
- Preserve data shape, array order, keys, interpolation tokens, newlines, and intentional markup.
- Update only the pair associated with the requested text. Do not opportunistically rewrite nearby copy.

Use the repository's existing pairing convention:

- `TRANSLATIONS.en.key` with `TRANSLATIONS.zh.key`
- English base fields such as `title` with prefixed fields such as `zhTitle`
- `COPY.en` with `COPY.zh`
- localized objects such as `{ en: '...', zh: '...' }`
- parallel localized arrays, preserving semantic index alignment

When a visible string has no translation pair, follow the nearest component's established localization pattern rather than introducing a new system.

### 4. Keep the change content-only

- Do not modify typography, color, spacing, breakpoints, component structure, or assets unless the annotation explicitly requests a non-copy change.
- Do not edit the uploaded annotation image.
- Do not change unrelated user work in a dirty worktree.
- If new copy exposes a pre-existing overflow issue, report it separately; do not silently redesign the layout.

### 5. Verify before handing off

- Review the diff and confirm every requested annotation maps to one source change.
- Read both language versions in context, not only as isolated strings.
- Check that Chinese and English retain the same facts, count of list items, and semantic ordering.
- Search for the old target phrase in the intended scope to catch stale duplicates while allowing deliberate reuse elsewhere.
- Run the repository's relevant validation, normally `npm run build` for this portfolio.
- If a preview or browser inspection is available, check the affected route in both languages and at the viewport represented by the screenshot.
- Never claim visual verification if only source and build checks were performed.

## Handoff format

Lead with completion, then report:

- the affected page or section;
- the applied Chinese wording and corresponding English wording;
- the source file or files changed;
- build and visual verification status;
- any annotation that remained ambiguous or any copy-induced layout risk.

Keep the handoff concise. Do not include unrelated audit findings.

## Invocation examples

- `Use $apply-annotated-bilingual-copy on the attached marked screenshot and update both languages.`
- `用 $apply-annotated-bilingual-copy 套用圖片裡的「修改」文字，中英文都同步。`
- `Use $apply-annotated-bilingual-copy to revise only the highlighted project overview copy; keep the layout unchanged.`
