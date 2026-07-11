import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/dsKit.jsx';
import { MODULES } from './data/dsContent.js';

const MOD = MODULES.find(m => m.key === 'M08');

// Real subset of the 14-company shipped dataset — frozen 2026-07-10, sourced
// per-field in the live product. Selected to show the spread: strong signal,
// two mid-production acquisitions, two genuinely conflicting narratives.
const COMPANIES = [
    { name: 'Frore Systems', stage: { en: 'Series D', zh: 'D 輪' }, status: 'strong', tag: { en: 'Fan-free solid-state cooling for AI servers', zh: '無風扇固態散熱，用於 AI 伺服器' } },
    { name: 'Corintis', stage: { en: 'Series A', zh: 'A 輪' }, status: 'strong', tag: { en: 'Microfluidic cold plates etched into the die', zh: '刻入晶片封裝的微流體冷板' } },
    { name: 'Ayar Labs', stage: { en: 'Series D · unicorn', zh: 'D 輪 · 獨角獸' }, status: 'strong', tag: { en: 'Optical I/O chiplets backed by AMD, Intel, NVIDIA — same round', zh: '光學 I/O 小晶片，AMD／Intel／NVIDIA 同輪出資' } },
    { name: 'Proxima Fusion', stage: { en: 'Series B', zh: 'B 輪' }, status: 'strong', tag: { en: 'Stellarator fusion, signed plant-construction agreement', zh: '仿星器核融合，已簽建廠協議' } },
    { name: 'JetCool Technologies', stage: { en: 'Acquired · Nov 2024', zh: '已收購 · 2024-11' }, status: 'acquired', tag: { en: 'MIT-born liquid cooling — bought by Flex, ~$53M', zh: '源自 MIT 的液冷技術——被 Flex 以約 5300 萬美元收購' } },
    { name: 'Celestial AI', stage: { en: 'Acquired · Feb 2026', zh: '已收購 · 2026-02' }, status: 'acquired', tag: { en: 'Photonic Fabric for AI memory — bought by Marvell, ~$3.25B', zh: 'AI 記憶體用的光子互連技術——被 Marvell 以約 32.5 億美元收購' } },
    { name: 'Prophesee', stage: { en: 'Judicial recovery → operating', zh: '司法重整 → 持續營運' }, status: 'conflicting', tag: { en: 'Event-based vision — filed for insolvency 2024, kept shipping', zh: '事件式視覺技術——2024 年聲請破產重整，仍持續出貨' } },
    { name: 'BrainChip', stage: { en: 'Public · ASX: BRN', zh: '已上市 · ASX: BRN' }, status: 'conflicting', tag: { en: 'Neuromorphic pioneer — revenue up 374% YoY, still tiny in absolute terms', zh: '神經形態運算先驅——營收年增 374%，絕對金額仍小' } },
];

const STATUS_META = {
    strong: { tone: 'teal', label: { en: 'STRONG SIGNAL', zh: '強訊號' } },
    acquired: { tone: 'sky', label: { en: 'ACQUIRED MID-PRODUCTION', zh: '製作期間被收購' } },
    conflicting: { tone: 'amber', label: { en: 'CONFLICTING SIGNAL', zh: '訊號衝突' } },
};

const COPY = {
    en: {
        title: 'The freshness problem',
        lead: 'V1 used fictional companies. V2 replaced all 14 with real, publicly-documented deep-tech startups — because the real world already contains the edge cases a scouting product needs to demonstrate honestly.',
        retrieved: 'Frozen 2026-07-10 · every field carries a source link and this date',
        soWhat: 'Two companies changed status while this case study was being built. That\'s not an inconvenience — it\'s the strongest possible proof that a retrieval-date stamp is not decoration.',
    },
    zh: {
        title: '真資料的代價',
        lead: 'V1 用的是虛構公司。V2 把全部 14 家換成真實、公開可查的深科技新創——因為真實世界本來就已經包含一個偵搜產品需要誠實展示的邊界案例。',
        retrieved: '資料凍結於 2026-07-10 · 每個欄位都附來源連結與這個日期',
        soWhat: '這份案例製作期間，有兩家公司改變了現況。這不是麻煩，而是「時效戳不是裝飾」最強的證明。',
    },
};

export default function M08_FreshnessProblem() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [filter, setFilter] = useState(null);
    const shown = filter ? COMPANIES.filter(c => c.status === filter) : COMPANIES;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ds-m08-filters">
                <button className={`ds-m08-filter${!filter ? ' is-on' : ''}`} onClick={() => setFilter(null)}>{lang === 'zh' ? '全部 14' : 'All 14'}</button>
                {Object.entries(STATUS_META).map(([k, m]) => (
                    <button key={k} className={`ds-m08-filter${filter === k ? ' is-on' : ''}`} onClick={() => setFilter(filter === k ? null : k)}>{m.label[lang] ?? m.label.en}</button>
                ))}
            </div>
            <div className="ds-m08-grid">
                {shown.map(c => {
                    const meta = STATUS_META[c.status];
                    return (
                        <div key={c.name} className={`ds-m08-card ds-m08-card--${meta.tone}`}>
                            <div className="ds-m08-card-head">
                                <h5>{c.name}</h5>
                                <span className="ds-tag" style={{ color: `var(--ds-${meta.tone})`, borderColor: `var(--ds-${meta.tone})` }}>{meta.label[lang] ?? meta.label.en}</span>
                            </div>
                            <span className="ds-data-sm" style={{ color: 'var(--ds-text-3)' }}>{c.stage[lang] ?? c.stage.en}</span>
                            <p>{c.tag[lang] ?? c.tag.en}</p>
                        </div>
                    );
                })}
            </div>
            <p className="ds-caption ds-m08-note">{t.retrieved}</p>
        </ModuleFrame>
    );
}

injectStyles('ds-m08-style', `
.ds-m08-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.ds-m08-filter { font-family: var(--ds-font-data); font-size: 11.5px; letter-spacing: 0.05em; padding: 6px 12px; border: 1px solid var(--ds-line-1); border-radius: 999px; color: var(--ds-text-3); background: var(--ds-bg-2); }
.ds-m08-filter:hover { border-color: var(--ds-line-2); color: var(--ds-text-2); }
.ds-m08-filter.is-on { border-color: var(--ds-teal); color: var(--ds-teal); background: var(--ds-teal-dim); }
.ds-m08-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.ds-m08-card { padding: 14px 16px; border-radius: var(--ds-r-md); background: var(--ds-bg-2); border: 1px solid var(--ds-line-1); border-left: 3px solid var(--ds-line-2); }
.ds-m08-card--teal { border-left-color: var(--ds-teal); }
.ds-m08-card--sky { border-left-color: var(--ds-sky); }
.ds-m08-card--amber { border-left-color: var(--ds-amber); }
.ds-m08-card-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 4px; }
.ds-m08-card-head h5 { margin: 0; font-family: var(--ds-font-display); font-size: 16px; color: var(--ds-text-1); }
.ds-m08-card p { margin: 8px 0 0; font-size: 13px; line-height: 1.55; color: var(--ds-text-2); }
.ds-m08-note { margin-top: 16px; }
@media (max-width: 700px) { .ds-m08-grid { grid-template-columns: 1fr; } }
`);
