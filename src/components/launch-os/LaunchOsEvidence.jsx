import React from 'react';
import LaunchDecisionCockpit from './LaunchDecisionCockpit.jsx';
import MetricTreeExplorer from './MetricTreeExplorer.jsx';
import UXResearchEvidenceHub from './UXResearchEvidenceHub.jsx';
import PRDLiteDocument from './PRDLiteDocument.jsx';
import AIRiskRegister from './AIRiskRegister.jsx';
import { injectStyles, usePrefersReducedMotion } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

const COPY = {
    en: {
        title: 'Interactive Prototypes & Implementation Evidence',
        intro: 'To keep the case from stopping at strategy narrative, I split the key pre-launch work for an AI product into six operable modules. From launch decisions, metric decomposition, research evidence, and product specifications to AI risk governance and design systems, each module maps to a reviewable product output and shows how strategy progressively takes shape in documents, interfaces, and decision flows.',
        badge: 'INTERACTIVE — CLICK TO EXPLORE',
    },
    zh: {
        title: '互動原型與實作證據',
        intro: '為了讓案例不只停留在策略敘述，我將 AI 產品上市前的關鍵工作拆成六個可操作模組。從上市決策、指標拆解、研究證據與產品規格，到 AI 風險治理與設計系統，每個模組都對應一項可以檢視的產品產出，呈現策略如何逐步落到文件、介面與決策流程。',
        badge: 'INTERACTIVE — CLICK TO EXPLORE',
    },
};

// Page order per spec 5.3: Cockpit → Metric Tree → Research Hub → PRD →
// Risk Register → Specimen (the specimen mounts after Technical Approach).
const MODULES = [
    { id: 'los-module-cockpit', num: '01', thumb: 'cockpit', title: { en: 'Launch Decision Cockpit', zh: '上市決策儀表板' }, desc: { en: 'Bring market signals, opportunity assessments, and launch gates together so the team can compare product directions and determine which assumptions merit continued validation and investment.', zh: '整合市場訊號、機會評估與上市門檻，協助團隊比較不同產品方向，判斷哪些假設值得繼續驗證與投入。' } },
    { id: 'los-module-metric-tree', num: '02', thumb: 'tree', title: { en: 'Metric Tree Explorer', zh: '指標樹瀏覽器' }, desc: { en: 'Break down from the north-star metric to driver and guardrail metrics, showing how product value is measured while keeping the team from pursuing a single growth number.', zh: '從北極星指標向下拆解至驅動指標與防護指標，說明產品價值如何被衡量，也避免團隊只追求單一成長數字。' } },
    { id: 'los-module-research', num: '03', thumb: 'research', title: { en: 'UX Research Evidence Hub', zh: '研究證據庫' }, desc: { en: 'Connect interview quotes, research insights, product assumptions, and decision outcomes while retaining the source, applicable context, and downstream impact of every judgment.', zh: '將訪談引述、研究洞察、產品假設與決策結果串接起來，保留每項判斷的來源、適用情境與後續影響。' } },
    { id: 'los-module-prd', num: '04', thumb: 'prd', title: { en: 'Lightweight Product Specification (PRD-lite Document)', zh: '輕量產品規格（PRD-lite 文件）' }, desc: { en: 'Use a lightweight specification to organize product goals, use cases, feature scope, design trade-offs, and version boundaries, keeping the team aligned without adding excessive documentation overhead.', zh: '以輕量規格文件整理產品目標、使用情境、功能範圍、設計取捨與版本邊界，讓團隊在不增加過多文件負擔的情況下維持共識。' } },
    { id: 'los-module-risk', num: '05', thumb: 'risk', title: { en: 'AI Risk Register & Model Card', zh: 'AI 風險登錄與 Model Card' }, desc: { en: 'Record model capability boundaries, possible failure scenarios, risk levels, mitigations, and conditions for human intervention so AI behavior and release accountability can be inspected and discussed.', zh: '記錄模型能力邊界、可能失敗的情境、風險等級、緩解措施與人工介入條件，讓 AI 行為與上線責任可以被檢查和討論。' } },
    { id: 'los-module-specimen', num: '06', thumb: 'specimen', title: { en: 'Design System & Frontend Specifications', zh: '設計系統與前端規格' }, desc: { en: 'Organize core design tokens, component states, interaction rules, accessibility considerations, and frontend implementation notes to verify that product strategy can become a consistent, maintainable interface.', zh: '整理核心設計變數、元件狀態、互動規則、無障礙考量與前端實作備註，驗證產品策略能否落成一致且可維護的操作介面。' } },
];

// Hand-drawn layout sketches — deliberately wireframe-like, never screenshots.
const THUMBS = {
    cockpit: (
        <>
            <rect x="6" y="8" width="28" height="56" rx="3" />
            <rect x="40" y="8" width="44" height="56" rx="3" />
            <rect x="90" y="8" width="26" height="56" rx="3" />
            <line x1="44" y1="20" x2="80" y2="20" className="t" />
            <line x1="44" y1="32" x2="74" y2="32" className="t" />
            <line x1="44" y1="44" x2="78" y2="44" />
            <line x1="10" y1="18" x2="30" y2="18" />
            <line x1="10" y1="30" x2="30" y2="30" />
            <circle cx="95" cy="18" r="2" className="t" />
            <circle cx="95" cy="30" r="2" className="t" />
            <circle cx="95" cy="42" r="2" />
        </>
    ),
    tree: (
        <>
            <circle cx="14" cy="36" r="5" className="t" />
            <circle cx="58" cy="14" r="3.5" />
            <circle cx="58" cy="36" r="3.5" />
            <circle cx="58" cy="58" r="3.5" />
            <circle cx="102" cy="8" r="2.5" />
            <circle cx="102" cy="20" r="2.5" />
            <circle cx="102" cy="32" r="2.5" className="t" />
            <circle cx="102" cy="42" r="2.5" />
            <circle cx="102" cy="54" r="2.5" />
            <circle cx="102" cy="64" r="2.5" />
            <path d="M19 36 C38 36 38 14 54 14 M19 36 L54 36 M19 36 C38 36 38 58 54 58" fill="none" />
            <path d="M62 14 C80 14 80 8 99 8 M62 14 C80 14 80 20 99 20 M62 36 C80 36 80 32 99 32" fill="none" className="t" />
            <path d="M62 36 C80 36 80 42 99 42 M62 58 C80 58 80 54 99 54 M62 58 C80 58 80 64 99 64" fill="none" />
        </>
    ),
    research: (
        <>
            {[0, 1, 2, 3].map(col =>
                [0, 1, 2].map(row => (
                    <rect
                        key={`${col}-${row}`}
                        x={8 + col * 28} y={10 + row * 19}
                        width="22" height="13" rx="2"
                        className={col === 1 && row === 1 ? 't' : undefined}
                    />
                )))}
        </>
    ),
    prd: (
        <>
            <rect x="8" y="8" width="22" height="56" rx="3" />
            <line x1="12" y1="16" x2="26" y2="16" className="t" />
            <line x1="12" y1="24" x2="26" y2="24" />
            <line x1="12" y1="32" x2="26" y2="32" />
            {[18, 26, 34, 42, 50, 58].map(y => <line key={y} x1="38" y1={y} x2={y % 3 ? 110 : 96} y2={y} />)}
            <rect x="38" y="8" width="72" height="4" rx="2" className="t" />
        </>
    ),
    risk: (
        <>
            {[0, 1, 2, 3, 4].map(col =>
                [0, 1, 2, 3, 4].map(row => (
                    <rect key={`${col}-${row}`} x={22 + col * 15} y={5 + row * 13} width="13" height="11" rx="2" />
                )))}
            <circle cx="73.5" cy="10.5" r="3" className="t" />
            <circle cx="58.5" cy="23.5" r="3" className="t" />
            <circle cx="43.5" cy="36.5" r="3" className="t" />
        </>
    ),
    specimen: (
        <>
            {[0, 1, 2, 3, 4].map(i => (
                <rect key={i} x={8 + i * 18} y="10" width="14" height="12" rx="3" className={i === 3 ? 't' : undefined} />
            ))}
            <line x1="8" y1="36" x2="80" y2="36" strokeWidth="4" />
            <line x1="8" y1="48" x2="64" y2="48" strokeWidth="2.5" />
            <line x1="8" y1="58" x2="96" y2="58" />
        </>
    ),
};

function ModuleNav({ t, lang, reducedMotion }) {
    const goTo = id =>
        document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    return (
        <div className="los-nav-grid">
            {MODULES.map(mod => (
                <button className="los los-nav-card" key={mod.id} onClick={() => goTo(mod.id)}>
                    <span className="los-nav-thumb" aria-hidden="true">
                        <svg viewBox="0 0 122 72" stroke="var(--line-2)" fill="none" strokeWidth="1.4" strokeLinecap="round">
                            {THUMBS[mod.thumb]}
                        </svg>
                        <span className="los-nav-badge">{t.badge}</span>
                    </span>
                    <span className="los-nav-meta">
                        <span className="los-nav-num">{mod.num}</span>
                        <span className="los-nav-title">{mod.title[lang]}</span>
                        <span className="los-nav-desc">{mod.desc[lang]}</span>
                    </span>
                </button>
            ))}
        </div>
    );
}

export default function LaunchOsEvidence() {
    const { lang, t } = useI18n(COPY);
    const reducedMotion = usePrefersReducedMotion();
    return (
        <div className="proj-section">
            <div className="proj-section-title reveal">{t.title}</div>
            <p className="proj-body-text reveal" style={{ marginBottom: 24 }}>{t.intro}</p>
            <div className="reveal"><ModuleNav t={t} lang={lang} reducedMotion={reducedMotion} /></div>
            <div className="reveal"><LaunchDecisionCockpit /></div>
            <div className="reveal"><MetricTreeExplorer /></div>
            <div className="reveal"><UXResearchEvidenceHub /></div>
            <div className="reveal"><PRDLiteDocument /></div>
            <div className="reveal"><AIRiskRegister /></div>
        </div>
    );
}

injectStyles('los-nav-styles', `
.los-nav-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
  margin-bottom: 48px;
}
.los-nav-card {
  display: block; width: 100%; text-align: left;
  background: var(--bg-1); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  padding: 0; overflow: hidden;
  transition: border-color 200ms var(--ease), transform 200ms var(--ease);
}
.los-nav-card:hover { border-color: var(--teal); transform: translateY(-2px); }
.los-nav-thumb {
  position: relative; display: block;
  background: var(--bg-2); border-bottom: 1px solid var(--line-1);
  padding: 14px 18px 10px;
}
.los-nav-thumb svg { width: 100%; height: auto; display: block; }
.los-nav-thumb svg .t { stroke: var(--teal); }
.los-nav-thumb svg rect.t, .los-nav-thumb svg circle.t { fill: var(--teal-dim); }
.los-nav-badge {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-data); font-size: 10px; letter-spacing: 0.14em;
  color: var(--teal); background: rgba(6,7,9,0.82);
  opacity: 0; transition: opacity 200ms var(--ease);
}
.los-nav-card:hover .los-nav-badge, .los-nav-card:focus-visible .los-nav-badge { opacity: 1; }
.los-nav-meta { display: block; padding: 12px 14px; }
.los-nav-num { font-family: var(--font-data); font-size: 11px; color: var(--teal); margin-right: 8px; }
.los-nav-title { font-size: 14px; font-weight: 600; color: var(--text-1); }
.los-nav-desc { display: block; font-size: 12px; color: var(--text-3); margin-top: 4px; line-height: 1.5; }
@media (max-width: 1023px) { .los-nav-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) { .los-nav-grid { grid-template-columns: 1fr; } }
`);
