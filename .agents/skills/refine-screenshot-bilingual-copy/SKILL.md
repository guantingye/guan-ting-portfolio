---
name: refine-screenshot-bilingual-copy
description: Rewrite and improve bilingual portfolio copy in UI regions identified by screenshots when the user marks a block to revise but does not supply final replacement wording. Use for screenshot-scoped narrative editing, Traditional Chinese copy polishing, removing AI-sounding or translated phrasing, strengthening evidence-led case-study storytelling, and synchronizing an existing English pair in this portfolio. Also use for text-only follow-up refinements to a screenshot-scoped rewrite. Do not use when the user provides exact replacement copy—use apply-annotated-bilingual-copy instead—or for visual redesign, image editing, layout-only work, or whole-page rewrites not placed in scope.
---

# Refine Screenshot Bilingual Copy

Act as the portfolio's senior narrative editor. Treat screenshots as scope markers, the rendered page as context, and the repository as the source of truth. Rewrite the selected Chinese copy directly in source, then revise its existing English pair to preserve the same facts, emphasis, and hierarchy.

## Required context

Before the first repository search in every task, read completely:

1. the project-root `SKILL.md`;
2. the project-root `Clean_code.md`;
3. [narrative-editing-standards.md](references/narrative-editing-standards.md);
4. [portfolio-copy-architecture.md](../apply-annotated-bilingual-copy/references/portfolio-copy-architecture.md).

If a required project file is absent, state that briefly and continue with the available repository conventions. Do not substitute assumptions for missing project facts.

## Workflow

### 1. Define the screenshot scope

- Inspect every supplied screenshot before editing.
- Distinguish existing UI copy from arrows, boxes, highlights, strikeouts, comments, and cursor marks.
- Treat a crop, highlight, or marked region as the edit boundary unless the user explicitly requests the whole page.
- Record the target route, section, component, visible strings, and requested operation.
- Read adjacent sections for narrative context, but do not rewrite them unless they are included in scope.
- If the screenshot contains final replacement wording, preserve it verbatim and use the narrower `apply-annotated-bilingual-copy` workflow.
- Ask one concise question only when the intended block cannot be mapped safely after inspecting the repository.

### 2. Trace the rendered source

- Search exact visible Chinese text first with `rg`; then use distinctive substrings, headings, route slugs, English counterparts, or adjacent labels.
- Confirm the route and render path before editing. A text match alone is not proof.
- Identify the owning copy object or data record and every in-scope consumer.
- Check whether the source is shared with another route. Keep changes local unless the screenshot clearly targets shared copy.
- Edit source copy, never generated output, `dist`, screenshots, or duplicated rendered markup.

### 3. Establish the fact boundary

- Read the complete target page and the relevant data/component files before drafting.
- Inventory the claims already supported by the page: people, roles, dates, metrics, research methods, product state, authorship, evidence tier, and limitations.
- Preserve the distinction between individual and team work, prototype and production, simulation and observed data, correlation and causation.
- Do not introduce a new fact merely to make the story stronger.
- When a factual ambiguity cannot be resolved, retain the safest original meaning and report the ambiguity in the handoff.

### 4. Diagnose the block's narrative job

- Classify each selected block as project positioning, problem context, usage scenario, research method, research insight, product strategy, design decision, technical architecture, validation evidence, shipped output, or reflection/limitation.
- Identify what the block needs to communicate and which one to three links in `Context → Problem → Decision → Action → Evidence → Outcome → Limitation` matter most.
- Remove repetition, translation artifacts, generic AI phrasing, vague claims, and headings that merely restate the body.
- Preserve strong existing copy. Rewrite only as much as needed to make the block clear, specific, and credible.

### 5. Rewrite Chinese first

- Write natural, professional Taiwanese Traditional Chinese.
- Use clear subjects, active voice, concrete verbs, and one main idea per sentence.
- Make the relationship among problem, judgment, action, evidence, and limitation explicit without forcing every block into one template.
- Match the local component's length and information density. Do not solve overflow by changing layout.
- Keep project names, terms, labels, metrics, units, and punctuation consistent with the rest of the page.
- Follow the detailed standards and role-specific judgment in [narrative-editing-standards.md](references/narrative-editing-standards.md).

### 6. Revise the English pair

- Update the corresponding English only when an English version already exists.
- Translate the revised meaning, not the Chinese word order.
- Match the local English voice and UI length while preserving the same facts, evidence strength, uncertainty, ordering, and number of items.
- Keep proper nouns, metrics, dates, product states, safety boundaries, and limitations identical across languages.
- Preserve the existing localization shape: paired fields, parallel objects, or aligned arrays.

### 7. Make narrow source edits

- Preserve keys, props, interpolation tokens, array order, data schema, component structure, route behavior, styles, animation, and interactions.
- Do not introduce helpers, abstractions, files, or a new localization system for copy-only work.
- Update repeated title or module metadata only when it is the same visible concept on the targeted page.
- Do not opportunistically rewrite nearby copy or unrelated user changes in a dirty worktree.

### 8. Verify in context

- Review the focused diff and map every changed string back to a selected screenshot block.
- Read the revised Chinese and English in full page context.
- Search the intended scope for stale versions of the replaced copy.
- Confirm bilingual parity for facts, claims, item counts, terminology, and semantic order.
- Run only existing project validation commands such as lint, typecheck, tests, or build; do not create new scripts.
- When preview tools are available, inspect both languages at desktop and mobile widths.
- Report copy-induced overflow or imbalance separately. Do not silently redesign the component.
- Never claim visual verification when only source and build checks were performed.

## Handoff

Return only:

```markdown
## 修改完成
- 修改的檔案：...
- 主要文案調整方向：...
- 未修改的事實疑點：無／...
- lint / typecheck / build：...
```

Keep the handoff concise. Do not provide a tutorial, alternate drafts, or unrelated audit findings unless the user explicitly requests them.

## Invocation examples

- `Use $refine-screenshot-bilingual-copy to rewrite the highlighted blocks in this screenshot and sync the existing English copy.`
- `用 $refine-screenshot-bilingual-copy 優化截圖圈出的作品集文案，我不會提供改寫稿。`
- `Use $refine-screenshot-bilingual-copy on this project overview screenshot; keep every factual claim and edit only the selected cards.`
