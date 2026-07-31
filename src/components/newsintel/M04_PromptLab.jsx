import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M04');

// Prompt lineage. Each version carries a unified diff vs the previous version
// and an eval scorecard graded on a 50-article golden set (human, by GT).
const VERSIONS = [
    {
        id: 'v1', tag: 'Baseline',
        failure: { en: 'Naive prompt. Merged multi-company stories and drifted off Traditional Chinese.', zh: '最陽春的提示。會把多公司故事合併，繁中也會走鐘。' },
        diff: [
            { t: 'ctx', s: 'You are a tech-news analyst.' },
            { t: 'ctx', s: 'Summarise the article below in Traditional Chinese.' },
            { t: 'ctx', s: 'Keep it short.' },
        ],
        evals: { acc: 71, halluc: 6, tokens: 240, cost: 0.9 },
    },
    {
        id: 'v2', tag: 'Single-entity Focus',
        failure: { en: 'v1 blended two funding rounds into one item — added a one-story-one-entity rule.', zh: 'v1 把兩輪募資混成一則——加入「一則一主體」規則。' },
        diff: [
            { t: 'ctx', s: 'You are a tech-news analyst.' },
            { t: 'del', s: 'Summarise the article below in Traditional Chinese.' },
            { t: 'add', s: 'Summarise ONE primary company/entity per item.' },
            { t: 'add', s: 'If the article covers several, split into separate items.' },
            { t: 'ctx', s: 'Keep it short.' },
        ],
        evals: { acc: 79, halluc: 5, tokens: 265, cost: 1.0 },
    },
    {
        id: 'v3', tag: 'Bilingual Structured Output',
        failure: { en: 'Free-text output was unparseable downstream — forced structured, bilingual JSON.', zh: '自由文字下游難解析——改為結構化、雙語 JSON。' },
        diff: [
            { t: 'ctx', s: 'Summarise ONE primary company/entity per item.' },
            { t: 'add', s: 'Return JSON: {title_en, title_zh, summary_en, summary_zh}.' },
            { t: 'add', s: 'zh must be natural Traditional Chinese, not machine-literal.' },
            { t: 'del', s: 'Keep it short.' },
            { t: 'add', s: 'summary ≤ 60 words each language.' },
        ],
        evals: { acc: 84, halluc: 4, tokens: 310, cost: 1.2 },
    },
    {
        id: 'v4', tag: 'Source-grounded Facts',
        failure: { en: 'Model invented a funding amount. Numbers must be verbatim, with a null fallback.', zh: '模型自己編了募資金額。數字必須逐字引用，並設 null 退路。' },
        diff: [
            { t: 'ctx', s: 'Return JSON: {title_en, title_zh, summary_en, summary_zh}.' },
            { t: 'add', s: 'Quote any figure (money, %, dates) VERBATIM from source text.' },
            { t: 'add', s: 'If a figure is not in the source, output null — never estimate.' },
            { t: 'add', s: 'Add "source_span" for every quoted number.' },
        ],
        evals: { acc: 88, halluc: 1, tokens: 340, cost: 1.3 },
    },
    {
        id: 'v5', tag: 'Taxonomy & Confidence Routing',
        failure: { en: 'Tags were free-form. Constrained to the taxonomy and added a confidence flag.', zh: '標籤原本自由發揮。改為受分類法約束，並加入信心旗標。' },
        diff: [
            { t: 'ctx', s: 'Quote any figure VERBATIM; null if absent.' },
            { t: 'add', s: 'Classify into the provided taxonomy enum ONLY.' },
            { t: 'add', s: 'Return primary + optional secondary tag with a tie-break rule.' },
            { t: 'add', s: 'Emit confidence ∈ {high, low}; low routes to manual review.' },
        ],
        evals: { acc: 92, halluc: 1, tokens: 360, cost: 1.4 },
    },
];

const COPY = {
    en: {
        title: 'Prompt versioning & evaluation lab',
        lead: 'I split the summarization and classification prompt into five comparable versions. Each change addresses a failure case observed in the prior version, then is re-evaluated against the same fixed set of 50 test articles to confirm it improves output quality, not just how complete the wording looks. The evaluation also tracks classification accuracy, unsupported factual errors, output length, and inference cost—so prompts can be versioned, tested, and traced like product components.',
        versionRail: 'Prompt versions',
        diffLabel: 'Prompt rule changes',
        failLabel: 'What motivated this version',
        evalLabel: 'Eval scorecard',
        metrics: [
            { k: 'acc', label: 'Classification accuracy', unit: '%', good: 'up' },
            { k: 'halluc', label: 'Hallucinated facts / 50 articles', unit: '', good: 'down' },
            { k: 'tokens', label: 'Avg output tokens', unit: '', good: 'flat' },
            { k: 'cost', label: 'Cost / 1,000 articles', unit: ' USD', good: 'flat' },
        ],
        methodToggle: 'Eval method',
        method: 'Golden set: 50 hand-picked articles (mixed EN/zh, single- and multi-entity). I graded each output against a rubric: correct entity split, faithful figures, valid taxonomy tag, natural zh-TW. Human-graded by me — small and self-scored, so I read the trend, not the decimal.',
        soWhat: 'I treat prompts as versioned, testable product components — not one-off instructions.',
    },
    zh: {
        title: '提示版本與評測實驗室',
        lead: '我將摘要與分類提示拆成五個可比較的版本。每次改動都針對前一版實際出現的失敗案例，並使用同一組 50 篇固定測試資料重新評估，確認改動改善的是輸出品質，而不只是文字看起來更完整。評測同時觀察分類正確性、無來源事實錯誤、輸出長度與推論成本，讓提示詞能像產品元件一樣被版本控制、測試與回溯。',
        versionRail: '提示版本',
        diffLabel: '提示規則差異',
        failLabel: '這一版由什麼驅動',
        evalLabel: '評測計分卡',
        metrics: [
            { k: 'acc', label: '分類準確率', unit: '%', good: 'up' },
            { k: 'halluc', label: '幻覺事實 / 50 篇', unit: '', good: 'down' },
            { k: 'tokens', label: '平均輸出 token', unit: '', good: 'flat' },
            { k: 'cost', label: '每 1,000 篇成本', unit: ' USD', good: 'flat' },
        ],
        methodToggle: '評測方法',
        method: 'Golden set：50 篇手選文章（中英混、單一與多主體）。我依評分準則逐項打分：主體切分正確、數字忠實、分類標籤合法、繁中自然。由我人工評分——樣本小且自評，所以我看趨勢，不看小數點。',
        soWhat: '我把提示詞視為有版本、可測試的產品元件，而不是一次性的指令。',
    },
};

export default function M04_PromptLab() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [idx, setIdx] = useState(4);
    const [method, setMethod] = useState(false);
    const refs = useRef([]);
    const v = VERSIONS[idx];

    const onKey = e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const n = Math.min(idx + 1, VERSIONS.length - 1); setIdx(n); refs.current[n]?.focus(); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); const n = Math.max(idx - 1, 0); setIdx(n); refs.current[n]?.focus(); }
    };

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m4-grid">
                <div className="ni-m4-rail" role="listbox" aria-label={t.versionRail} aria-activedescendant={`ni-m4-${v.id}`} tabIndex={0} onKeyDown={onKey}>
                    {VERSIONS.map((ver, i) => (
                        <div key={ver.id} id={`ni-m4-${ver.id}`} role="option" aria-selected={i === idx}
                            ref={el => (refs.current[i] = el)} tabIndex={-1}
                            className={`ni-m4-ver${i === idx ? ' is-on' : ''}`}
                            onClick={() => setIdx(i)}>
                            <span className="ni-m4-ver-id">{ver.id}</span>
                            <span className="ni-m4-ver-tag">{ver.tag}</span>
                            <span className="ni-m4-ver-acc">{ver.evals.acc}%</span>
                        </div>
                    ))}
                </div>

                <div className="ni-m4-main">
                    <span className="ni-caption">{idx > 0 ? `${VERSIONS[idx - 1].id} → ${v.id}｜${t.diffLabel}` : t.diffLabel}</span>
                    <pre className="ni-m4-diff" aria-label={`${t.diffLabel} ${v.id}`}>
                        {v.diff.map((d, i) => (
                            <div key={i} className={`ni-m4-line ni-m4-line--${d.t}`}>
                                <span className="ni-m4-gutter" aria-hidden="true">{d.t === 'add' ? '+' : d.t === 'del' ? '−' : ' '}</span>
                                <span className="ni-m4-code">{d.s}</span>
                            </div>
                        ))}
                    </pre>
                    <div className="ni-m4-fail">
                        <span className="ni-m4-fail-label">{t.failLabel}</span>
                        <p>{v.failure[lang] ?? v.failure.en}</p>
                    </div>
                </div>

                <div className="ni-m4-evals">
                    <span className="ni-caption">{t.evalLabel} · {v.id}</span>
                    <div className="ni-m4-scorecard">
                        {t.metrics.map(m => {
                            const val = v.evals[m.k];
                            const prev = idx > 0 ? VERSIONS[idx - 1].evals[m.k] : null;
                            const delta = prev != null ? val - prev : 0;
                            const improved = m.good === 'up' ? delta > 0 : m.good === 'down' ? delta < 0 : null;
                            return (
                                <div key={m.k} className="ni-m4-metric">
                                    <span className="ni-m4-metric-label">{m.label}</span>
                                    <span className="ni-m4-metric-val">
                                        {val}{m.unit}
                                        {prev != null && delta !== 0 && (
                                            <span className={`ni-m4-delta ${improved ? 'is-good' : improved === false ? 'is-bad' : ''}`}>
                                                {delta > 0 ? '▲' : '▼'}{Math.abs(delta % 1 === 0 ? delta : delta.toFixed(1))}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <button className="ni-m4-method-toggle" aria-expanded={method} onClick={() => setMethod(m => !m)}>
                <span className="ni-m4-chevron" data-open={method} aria-hidden="true">▸</span>{t.methodToggle}
            </button>
            {method && <p className="ni-m4-method">{t.method}</p>}
        </ModuleFrame>
    );
}

injectStyles('ni-m4', `
.ni-m4-grid { display: grid; grid-template-columns: 168px 1fr 220px; gap: 14px; }
.ni-m4-rail { display: flex; flex-direction: column; gap: 6px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); padding: 8px; background: var(--ni-bg-2); }
.ni-m4-ver { display: grid; grid-template-columns: auto 1fr auto; gap: 8px; align-items: baseline; padding: 8px 10px; border-radius: var(--ni-r-sm); cursor: pointer; transition: background 150ms var(--ni-ease); }
.ni-m4-ver:hover { background: var(--ni-bg-3); }
.ni-m4-ver.is-on { background: var(--ni-teal-dim); }
.ni-m4-ver-id { font-family: var(--ni-font-data); font-size: 13px; color: var(--ni-teal); }
.ni-m4-ver-tag { font-size: 11.5px; color: var(--ni-text-2); }
.ni-m4-ver.is-on .ni-m4-ver-tag { color: var(--ni-text-1); }
.ni-m4-ver-acc { font-family: var(--ni-font-data); font-size: 11px; color: var(--ni-text-3); }
.ni-m4-main { min-width: 0; }
.ni-m4-diff { margin: 8px 0 0; padding: 12px; background: var(--ni-bg-0); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); overflow-x: auto; font-family: var(--ni-font-data); font-size: 12px; line-height: 1.7; white-space: pre; }
.ni-m4-line { display: flex; gap: 8px; }
.ni-m4-gutter { flex: 0 0 auto; width: 10px; text-align: center; color: var(--ni-text-3); }
.ni-m4-code { white-space: pre-wrap; word-break: break-word; }
.ni-m4-line--ctx .ni-m4-code { color: var(--ni-text-3); }
.ni-m4-line--add { background: rgba(53,194,176,0.09); }
.ni-m4-line--add .ni-m4-gutter, .ni-m4-line--add .ni-m4-code { color: var(--ni-teal); }
.ni-m4-line--del { background: rgba(229,103,90,0.07); }
.ni-m4-line--del .ni-m4-gutter, .ni-m4-line--del .ni-m4-code { color: var(--ni-text-3); text-decoration: line-through; }
.ni-m4-fail { margin-top: 12px; padding: 12px 14px; border-left: 2px solid var(--ni-amber); background: var(--ni-bg-2); border-radius: 0 var(--ni-r-sm) var(--ni-r-sm) 0; }
.ni-m4-fail-label { display: block; font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ni-amber); margin-bottom: 6px; }
.ni-m4-fail p { margin: 0; font-size: 13px; line-height: 1.55; color: var(--ni-text-1); }
.ni-m4-evals { min-width: 0; }
.ni-m4-scorecard { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.ni-m4-metric { padding: 10px 12px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-sm); background: var(--ni-bg-2); }
.ni-m4-metric-label { display: block; font-size: 11px; color: var(--ni-text-3); line-height: 1.4; margin-bottom: 5px; }
.ni-m4-metric-val { font-family: var(--ni-font-data); font-size: 20px; color: var(--ni-text-1); display: flex; align-items: baseline; gap: 8px; }
.ni-m4-delta { font-size: 11px; }
.ni-m4-delta.is-good { color: var(--ni-teal); }
.ni-m4-delta.is-bad { color: var(--ni-red); }
.ni-m4-method-toggle { display: inline-flex; align-items: center; gap: 8px; margin-top: 18px; font-family: var(--ni-font-data); font-size: 12px; letter-spacing: 0.06em; color: var(--ni-teal); }
.ni-m4-chevron { transition: transform 160ms var(--ni-ease); }
.ni-m4-chevron[data-open="true"] { transform: rotate(90deg); }
.ni-m4-method { margin: 12px 0 0; padding: 14px 16px; font-size: 13px; line-height: 1.6; color: var(--ni-text-2); background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
@media (max-width: 1023px) { .ni-m4-grid { grid-template-columns: 1fr 1fr; } .ni-m4-rail { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap; } .ni-m4-ver { flex: 1 1 130px; } }
@media (max-width: 640px) { .ni-m4-grid { grid-template-columns: 1fr; } }
`);
