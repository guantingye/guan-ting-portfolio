import React from 'react';
import SectionModule, { useI18n, injectStyles } from './shared/ecoKit.jsx';
import { MODULES } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E08');

const COPY = {
    en: {
        title: 'B2B intelligence surfaces',
        lead: 'Who reads this, the decision they owe, and the surface that reaches them.',
        soWhat: 'Intelligence only matters when it reaches a specific decision.',
        consumersLabel: 'Consumers & the decision they owe',
        consumers: [
            { who: 'Policy analyst (ITRI/ISTI)', dec: 'Where should the next programme put money?' },
            { who: 'VC / CVC associate', dec: 'Which sub-sector is under-served but investable?' },
            { who: 'Corporate strategy', dec: 'Who could we partner with or acquire?' },
            { who: 'Accelerator lead', dec: 'What cohort gap should the next batch fill?' },
        ],
        surfacesLabel: 'Delivery surfaces',
        surfaces: [
            { s: 'Brief card', d: 'A one-screen sector read, export-ready for a slide.' },
            { s: 'Query API', d: 'Filtered, tagged records for a partner’s own dashboard.' },
            { s: 'Atlas dashboard', d: 'The live map and flows of Sheet B–C.' },
            { s: 'RAG console', d: 'Ask a question in plain language — Sheet D.2.' },
        ],
    },
    zh: {
        title: 'B2B 商情交付面',
        lead: '誰在讀、他們該做的決策，以及觸及他們的介面。',
        soWhat: '商情只有觸及一個具體決策時才有意義。',
        consumersLabel: '使用者與其該做的決策',
        consumers: [
            { who: '政策分析師（工研院）', dec: '下一個計畫的資源該投向哪裡？' },
            { who: '創投 / 企業創投', dec: '哪個次領域供給不足卻可投資？' },
            { who: '企業策略', dec: '我們可以與誰合作或併購？' },
            { who: '加速器負責人', dec: '下一梯次該補上哪個 cohort 缺口？' },
        ],
        surfacesLabel: '交付介面',
        surfaces: [
            { s: '商情卡', d: '一個畫面的產業判讀，可直接放進投影片。' },
            { s: '查詢 API', d: '過濾、標籤化的紀錄，供夥伴的自有儀表板。' },
            { s: '地圖儀表板', d: 'Sheet B–C 的即時地圖與流向。' },
            { s: 'RAG 查詢台', d: '用白話提問——Sheet D.2。' },
        ],
    },
};

export default function E08_B2BSurfaces() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="eco-b2b">
                <div>
                    <span className="eco-b2b-k">{c.consumersLabel}</span>
                    <ul className="eco-b2b-list">
                        {c.consumers.map(x => (
                            <li key={x.who}><strong>{x.who}</strong><span>{x.dec}</span></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <span className="eco-b2b-k">{c.surfacesLabel}</span>
                    <ul className="eco-b2b-surfaces">
                        {c.surfaces.map(x => (
                            <li key={x.s}><strong>{x.s}</strong><span>{x.d}</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionModule>
    );
}

injectStyles('eco-e8', `
.eco-b2b { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.eco-b2b-k { display: block; font-family: var(--eco-font-data); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--eco-text-3); margin-bottom: 10px; }
.eco-b2b-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.eco-b2b-list li { padding: 12px 14px; border: 1px solid var(--eco-line-1); border-left: 2px solid var(--eco-ink); border-radius: 0 var(--eco-r-sm) var(--eco-r-sm) 0; background: var(--eco-bg-2); }
.eco-b2b-list strong { display: block; color: var(--eco-text-1); font-size: 13.5px; }
.eco-b2b-list span { font-size: 12.5px; color: var(--eco-text-3); font-style: italic; }
.eco-b2b-surfaces { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.eco-b2b-surfaces li { padding: 12px 14px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-sm); background: var(--eco-bg-2); }
.eco-b2b-surfaces strong { display: block; color: var(--eco-teal); font-size: 13.5px; font-family: var(--eco-font-data); }
.eco-b2b-surfaces span { font-size: 12.5px; color: var(--eco-text-2); }
@media (max-width: 720px) { .eco-b2b { grid-template-columns: 1fr; } }
`);
