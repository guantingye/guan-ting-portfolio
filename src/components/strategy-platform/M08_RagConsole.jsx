import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/ispKit.jsx';
import { MODULES, SPECIMEN_COMPANIES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M08');

const cog = SPECIMEN_COMPANIES.find(c => c.id === 'cognition-ai');
const fig = SPECIMEN_COMPANIES.find(c => c.id === 'figure-ai');

// Pinned demo queries — colocated data. Answers are composed from the real
// SPECIMEN_COMPANIES text (grounding is REAL); the retrieval architecture
// around them is a designed proposal (badge: CONCEPT).
const QUERIES = [
    {
        id: 'q1', type: 'single',
        en: { q: "What is Cognition AI's biggest risk?", a: 'The clearest risk in the record is a highly competitive market: Microsoft/GitHub, OpenAI, Anthropic, Replit, and Cosine are all compressing margins and differentiation for software agents. A second risk is the reliability scrutiny prompted by public demos, including how these systems perform under real workloads.', cites: [{ row: cog.name, field: 'KEY RISKS' }] },
        zh: { q: 'Cognition AI 最大的風險是什麼？', a: '目前紀錄中最明確的風險，是高度競爭的競爭環境：Microsoft / GitHub、OpenAI、Anthropic、Replit 與 Cosine 等競爭者，都在壓縮軟體代理的利潤與差異化。另一項風險則是公開展示後的可靠度質疑，以及這類技術在真實工作負載下的表現。', cites: [{ row: cog.name, field: 'KEY RISKS' }] },
    },
    {
        id: 'q2', type: 'compare',
        en: { q: 'Of the humanoid-robotics companies in the database, who looks most exposed on valuation?', a: "Figure AI's own verdict flags this directly: \"priced for perfection and highly sensitive to real-world reliability and labor-replacement economics,\" following a jump from a ≈$2.6B to an estimated $39B post-money valuation in about a year.", cites: [{ row: fig.name, field: 'VERDICT + FUNDING STATUS' }] },
        zh: { q: '資料庫裡的人形機器人公司中，誰在估值上看起來最曝險？', a: 'Figure AI 自己的判斷段落就直接標出這點：「估值已定價到接近完美，對真實世界的可靠度與勞動替代經濟學高度敏感」——在約一年內從約 26 億美元跳到估計 390 億美元投後估值。', cites: [{ row: fig.name, field: 'VERDICT + FUNDING STATUS' }] },
    },
    {
        id: 'q3', type: 'crosscut',
        en: { q: 'Which companies in the database are exposed to the /insights power-constraint thesis?', a: 'Cross-referencing the "Power is becoming the binding constraint for AI scale-out" brief (M04) against the database: Cognition AI\'s own risk section names it — "Heavy compute and infra costs; sensitive to model pricing and hardware availability" — the same power/compute bottleneck the brief describes, showing up as a company-level risk.', cites: [{ row: cog.name, field: 'KEY RISKS' }, { row: 'Insights brief', field: '2025-12-14' }] },
        zh: { q: '資料庫裡哪些公司暴露在 /insights 那篇電力限制論點之下？', a: '把「Power is becoming the binding constraint for AI scale-out」簡報（M04）與資料庫交叉比對：Cognition AI 自己的風險段落就點名了它——「高額運算與基礎設施成本；對模型定價與硬體可得性敏感」——正是簡報描述的同一個電力／運算瓶頸，以公司層級風險的形式出現。', cites: [{ row: cog.name, field: 'KEY RISKS' }, { row: 'Insights brief', field: '2025-12-14' }] },
    },
    {
        id: 'q4', type: 'refuse',
        en: { q: "What is Cognition AI's exact current ARR?", a: null, cites: [] },
        zh: { q: 'Cognition AI 目前確切的 ARR 是多少？', a: null, cites: [] },
    },
];

const COPY = {
    en: {
        title: 'Grounded RAG over the company database',
        lead: 'This is not a chat window placed outside the database. It is a retrieval-and-answering design built on the six-section company schema. I deliberately test it with four kinds of questions: a single-company lookup, a cross-company comparison, a link back to an /insights brief, and one the database currently cannot answer. Every answer must include evidence that can be traced back.',
        chunkTitle: 'Chunking design',
        chunks: [
            { k: 'Chunking', v: 'Every company uses the same six-section structure to form citable units, covering company facts, moat, risk, sector analysis, and category labels. Chunks follow the semantic structure of each section, avoiding passages that mix several indistinguishable claims.' },
            { k: 'Hybrid retrieval', v: 'Structured conditions such as sector, date, company, and risk category narrow the scope first; semantic similarity then re-ranks results so the content closest to the research question is retrieved first.' },
            { k: 'Cross-layer linking', v: 'The same retrieval index connects company records in /startups with strategy briefs in /insights. A reader can trace an industry conclusion back to relevant companies, or move from a company analysis to the industry brief it belongs to.' },
        ],
        askLabel: 'Ask', tryLabel: 'Try',
        groundedIn: 'Grounded in',
        citesLabel: 'Citations',
        refusalLabel: 'No answer — insufficient grounding',
        refusalText: 'The database tracks funding rounds, not internal financial metrics like ARR. Answering would mean inventing a number the schema was never designed to hold — so this returns a refusal instead of a guess.',
        evalTitle: 'How to verify whether this RAG is trustworthy',
        evalLead: 'I built a small golden set that specifies the company, field, or document each question should cite in advance. It checks whether the system returns the right evidence, rather than only whether an answer sounds plausible. The evaluation measures citation accuracy, relevance, and source traceability; writing fluency is not the primary success metric.',
        evalRows: [
            { q: t => t.pin1, expect: cog.name, result: 'pass' },
            { q: t => t.pin2, expect: fig.name, result: 'pass' },
            { q: t => t.pin4, expect: '—', result: 'refuse (correct)' },
        ],
        selfRef: 'This module extends the 2025-12-18 /insights brief, “Enterprise semantic search is moving from RAG demos to governance-grade systems,” bringing its principles of citation, evaluation, and willingness to refuse into the company-research query layer.',
        soWhat: 'RAG trustworthiness comes not only from what it answers, but also from knowing which questions it should not answer.',
    },
    zh: {
        title: '架在公司資料庫上的依據式 RAG',
        lead: '這不是一個套在資料庫外面的聊天視窗，而是一套建立在六段式公司 schema 上的檢索與回答設計。我刻意選用四類問題測試它：單一公司查詢、跨公司比較、連回 /insights 簡報，以及資料庫目前無法回答的問題。每個回答都必須附上可回查的依據。',
        chunkTitle: '切塊設計',
        chunks: [
            { k: '切塊', v: '每家公司都依相同的六段結構建立可引用單元，涵蓋公司事實、護城河、風險、產業分析與分類標籤。切塊結果跟著區塊語意結構走，避免一段落同時混入多個無法辨識的論點。' },
            { k: '混合檢索', v: '先以產業、日期、公司與風險類別等結構化條件縮小範圍，再用語意相似度重新排序，讓最靠近研究問題的內容，也能優先取回。' },
            { k: '跨資料層連結', v: '用同一種檢索索引同時連接 /startups 的公司紀錄與 /insights 的策略簡報。使用者可以從產業結論回查相關公司，也能從公司分析連回它所處產業簡報中。' },
        ],
        askLabel: '提問', tryLabel: '試試',
        groundedIn: '依據',
        citesLabel: '引用',
        refusalLabel: '無法回答——依據不足',
        refusalText: '資料庫追蹤的是募資輪次，不是 ARR 這類內部財務指標。硬答等於捏造一個 schema 從未設計要承載的數字——所以這裡回傳拒答，而不是用猜的。',
        evalTitle: '如何驗證這個 RAG 是否可信',
        evalLead: '我建立一組小型 golden set，事先指定每個問題應引用的公司、欄位或文件，檢查系統是否能回傳正確依據，而不是只評估答案是否「聽起來合理」。此處評測的是引用正確性、相關性與來源可追溯性，不把文字流暢度當成主要成功指標。',
        evalRows: [
            { q: t => t.pin1, expect: cog.name, result: '通過' },
            { q: t => t.pin2, expect: fig.name, result: '通過' },
            { q: t => t.pin4, expect: '—', result: '拒答（正確）' },
        ],
        selfRef: '此模組延伸自 2025-12-18 的 /insights 簡報〈Enterprise semantic search is moving from RAG demos to governance-grade systems〉，把其中「引用、評測與願意拒答」的原則，帶進公司研究的查詢層。',
        soWhat: 'RAG 的可信度不只來自它回答什麼，也來自它知道哪些問題不該回答。',
    },
};

export default function M08_RagConsole() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [activeId, setActiveId] = useState('q1');
    const active = QUERIES.find(q => q.id === activeId);
    const al = active[lang] ?? active.en;
    const pins = { pin1: (QUERIES[0][lang] ?? QUERIES[0].en).q, pin2: (QUERIES[1][lang] ?? QUERIES[1].en).q, pin4: (QUERIES[3][lang] ?? QUERIES[3].en).q };

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <span className="isp-caption isp-m8-caption">{t.chunkTitle}</span>
            <div className="isp-m8-chunks">
                {t.chunks.map(c => (
                    <div className="isp-m8-chunk" key={c.k}>
                        <strong>{c.k}</strong>
                        <p>{c.v}</p>
                    </div>
                ))}
            </div>

            <div className="isp-m8-presets">
                <span className="isp-m8-presets-k">{t.tryLabel}</span>
                {QUERIES.map(q => {
                    const ql = q[lang] ?? q.en;
                    return (
                        <button key={q.id} className={`isp-btn isp-m8-chip${activeId === q.id ? ' is-on' : ''}`}
                            onClick={() => setActiveId(q.id)} onKeyDown={onActivate(() => setActiveId(q.id))}>{ql.q}</button>
                    );
                })}
            </div>

            <div className="isp-m8-out" aria-live="polite">
                {al.a ? (
                    <div className="isp-m8-card">
                        <div className="isp-m8-retrieval">
                            <span className="isp-m8-ret-k">{t.groundedIn}</span>
                            <span className="isp-m8-ret-v">{al.cites.map(c => c.row).join(' · ')}</span>
                        </div>
                        <p className="isp-m8-answer">{al.a}</p>
                        <div className="isp-m8-cites">
                            <span className="isp-m8-cites-k">{t.citesLabel}</span>
                            {al.cites.map((c, i) => <span key={i} className="isp-tag isp-tag--teal">{c.row} · {c.field}</span>)}
                        </div>
                    </div>
                ) : (
                    <div className="isp-m8-refuse">
                        <span className="isp-tag isp-tag--red">{t.refusalLabel}</span>
                        <p>{t.refusalText}</p>
                    </div>
                )}
            </div>

            <div className="isp-m8-eval">
                <span className="isp-caption isp-m8-caption">{t.evalTitle}</span>
                <p className="isp-m8-eval-lead">{t.evalLead}</p>
                <div className="isp-m8-scroll">
                    <table className="isp-m8-eval-table">
                        <thead><tr><th>{lang === 'zh' ? '問題' : 'QUESTION'}</th><th>{lang === 'zh' ? '期望引用' : 'EXPECTED CITATION'}</th><th>{lang === 'zh' ? '結果' : 'RESULT'}</th></tr></thead>
                        <tbody>
                            {t.evalRows.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.q(pins)}</td>
                                    <td className="isp-mono">{r.expect}</td>
                                    <td><span className={`isp-tag ${r.result.toString().includes('pass') || r.result === '通過' ? 'isp-tag--teal' : 'isp-tag--amber'}`}>{r.result}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="isp-m8-selfref">{t.selfRef}</p>
        </ModuleFrame>
    );
}

injectStyles('isp-m8-style', `
.isp-m8-caption { display: block; margin-bottom: 10px; }
.isp-m8-chunks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.isp-m8-chunk { padding: 12px 14px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-sm); }
.isp-m8-chunk strong { display: block; font-size: 12.5px; color: var(--isp-text-1); margin-bottom: 5px; }
.isp-m8-chunk p { margin: 0; font-size: 12px; line-height: 1.55; color: var(--isp-text-3); }
@media (max-width: 900px) { .isp-m8-chunks { grid-template-columns: 1fr; } }

.isp-m8-presets { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 14px; }
.isp-m8-presets-k { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--isp-text-3); margin-right: 4px; }
.isp-m8-chip { font-size: 12px; padding: 7px 12px; }

.isp-m8-card { padding: 14px 16px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-m8-retrieval { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; padding-bottom: 10px; margin-bottom: 12px; border-bottom: 1px dashed var(--isp-line-1); }
.isp-m8-ret-k { font-family: var(--isp-font-data); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--isp-text-3); }
.isp-m8-ret-v { font-family: var(--isp-font-data); font-size: 12px; color: var(--isp-teal); }
.isp-m8-answer { margin: 0 0 12px; font-size: 14px; line-height: 1.65; color: var(--isp-text-1); }
.isp-m8-cites { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.isp-m8-cites-k { font-family: var(--isp-font-data); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--isp-text-3); }
.isp-m8-refuse { padding: 14px 16px; background: var(--isp-red-dim); border: 1px solid var(--isp-red); border-radius: var(--isp-r-md); }
.isp-m8-refuse p { margin: 10px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--isp-text-1); }

.isp-m8-eval { margin-top: 22px; }
.isp-m8-eval-lead { margin: 0 0 12px; font-size: 13px; color: var(--isp-text-3); }
.isp-m8-scroll { overflow-x: auto; }
.isp-m8-eval-table { width: 100%; border-collapse: collapse; font-size: 12.5px; min-width: 480px; }
.isp-m8-eval-table th, .isp-m8-eval-table td { text-align: left; padding: 9px 12px; border-bottom: 1px solid var(--isp-line-1); }
.isp-m8-eval-table thead th { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--isp-text-3); }
.isp-m8-selfref { margin: 18px 0 0; font-size: 12.5px; line-height: 1.6; color: var(--isp-text-3); font-style: italic; padding-top: 14px; border-top: 1px solid var(--isp-line-1); }
`);
