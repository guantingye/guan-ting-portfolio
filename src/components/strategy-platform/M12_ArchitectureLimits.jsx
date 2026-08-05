import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M12');

const STACK = [
    { label: 'Frontend', en: 'React, client-side routing, and a Traditional Chinese / English bilingual interface.', zh: 'React、client-side routing，以及繁中／英文雙語介面。' },
    { label: 'Data layer', en: '201 structured company records using a ten-field schema (Module 02).', zh: '201 筆結構化公司紀錄，採用十欄位 schema（Module 02）。' },
    { label: 'Writing method', en: 'Analyst-authored six-section research notes, dated for each curation batch (Module 03).', zh: '由分析師撰寫六段式研究註記，並依每次策展批次標記日期（Module 03）。' },
    { label: 'Deployment', en: 'Deployed on Vercel with static-first delivery.', zh: 'Vercel 部署，採 static-first delivery。' },
    { label: 'Sibling system', en: 'Project 04, “AI News Intelligence,” runs the daily strategic-briefing pipeline. The two share part of their output context but are not the same system; crawler and LLM pipeline details are documented in that case.', zh: 'Project 04「AI News Intelligence」負責每日策略簡報管線。兩者共享部分輸出脈絡，但並非同一套系統；爬蟲與 LLM 管線細節收錄於該案例。' },
    { label: 'AI layer', en: 'The agent skill system, editorial workflow, and grounded RAG (Modules 06–08) are designed but not yet connected to the live product.', zh: 'Agent skill system、editorial workflow 與 grounded RAG（Module 06–08）已完成設計，目前尚未接入線上產品。' },
];

const FLOW = ['Public sources', 'Analyst research', 'Six-section note', 'Curated row', 'Insights brief / Startup directory'];

const ROADMAP = {
    en: ['Wire the RAG design (M08) to a real vector index over the 201 rows', 'Ship the editorial-ops board (M07) as the actual curation tool, not a demo', 'Expand past 201 companies once the agent pipeline (M06) is load-bearing enough to trust'],
    zh: ['把 RAG 設計（M08）接上一個對 201 列的真實向量索引', '把文案管理看板（M07）做成真正的策展工具，而不只是示範', '一旦 agent pipeline（M06）足夠可信，再擴張超過 201 家公司'],
};

const COPY = {
    en: {
        title: 'System architecture & practical boundaries',
        lead: 'This section explains the technical structure behind the three shipped routes, how it relates to Project 04, “AI News Intelligence,” and which capabilities have been deployed versus which remain in the design stage.',
        stackTitle: 'Stack',
        flowTitle: 'Data flow',
        roadmapTitle: 'What I would build next',
    },
    zh: {
        title: '系統架構與實際邊界',
        lead: '這一節說明三條已上線路徑背後的技術結構、它與 Project 04「AI News Intelligence」的分工，以及哪些功能已經部署、哪些仍停留在設計階段。',
        stackTitle: '技術棧',
        flowTitle: '資料流',
        roadmapTitle: '接下來會做什麼',
    },
};

export default function M12_ArchitectureLimits() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead}>
            <span className="isp-caption isp-m12-title">{t.stackTitle}</span>
            <div className="isp-m12-stack">
                {STACK.map(s => (
                    <div className="isp-m12-stack-item" key={s.label}>
                        <span>{s.label}</span>
                        <p>{s[lang] ?? s.en}</p>
                    </div>
                ))}
            </div>

            <span className="isp-caption isp-m12-title isp-m12-title-2">{t.flowTitle}</span>
            <div className="isp-m12-flow">
                {FLOW.map((f, i) => (
                    <React.Fragment key={f}>
                        <span className="isp-m12-flow-node">{f}</span>
                        {i < FLOW.length - 1 && <span className="isp-m12-flow-arrow" aria-hidden="true">→</span>}
                    </React.Fragment>
                ))}
            </div>

            <div className="isp-m12-cols">
                <div>
                    <span className="isp-caption isp-m12-title isp-m12-title-2">{t.roadmapTitle}</span>
                    <ul className="isp-m12-list isp-m12-roadmap">
                        {(ROADMAP[lang] ?? ROADMAP.en).map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m12-style', `
.isp-m12-title { display: block; margin-bottom: 10px; }
.isp-m12-title-2 { margin-top: 22px; }
.isp-m12-stack { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.isp-m12-stack-item { padding: 10px 12px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-sm); }
.isp-m12-stack-item span { display: block; font-family: var(--isp-font-data); font-size: 10.5px; letter-spacing: 0.06em; color: var(--isp-teal); margin-bottom: 4px; }
.isp-m12-stack-item p { margin: 0; font-size: 12.5px; line-height: 1.55; color: var(--isp-text-2); }
@media (max-width: 720px) { .isp-m12-stack { grid-template-columns: 1fr; } }

.isp-m12-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.isp-m12-flow-node { font-family: var(--isp-font-data); font-size: 11.5px; padding: 7px 12px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-2); border-radius: 999px; color: var(--isp-text-1); }
.isp-m12-flow-arrow { color: var(--isp-line-2); }

.isp-m12-cols { display: grid; grid-template-columns: 1fr; }
.isp-m12-list { margin: 0; padding-left: 18px; display: grid; gap: 9px; }
.isp-m12-list li { font-size: 13px; line-height: 1.58; color: var(--isp-text-2); }
.isp-m12-roadmap li::marker { color: var(--isp-teal); }
`);
