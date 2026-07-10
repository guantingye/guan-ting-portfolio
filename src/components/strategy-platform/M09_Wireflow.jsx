import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M09');

// Hand-drawn low-fi SVG plates — no stock imagery, Neural Signal OS palette.
function PlateHome() {
    return (
        <svg viewBox="0 0 400 260" role="img" aria-label="Home wireframe">
            <rect width="400" height="260" fill="#0B0F19" />
            <rect x="16" y="16" width="150" height="14" rx="3" fill="#262D42" />
            <rect x="16" y="42" width="120" height="26" rx="3" fill="#333C57" />
            <rect x="16" y="80" width="180" height="30" rx="3" fill="#1B2136" />
            <rect x="16" y="118" width="100" height="16" rx="3" fill="#333C57" />
            <rect x="16" y="150" width="90" height="26" rx="4" stroke="#35C2B0" fill="none" strokeDasharray="3 2" />
            <rect x="114" y="150" width="90" height="26" rx="4" stroke="#333C57" fill="none" strokeDasharray="3 2" />
            <circle cx="290" cy="140" r="80" fill="none" stroke="#333C57" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="255" cy="105" r="4" fill="#35C2B0" />
            <rect x="230" y="180" width="150" height="60" rx="4" fill="#131829" stroke="#262D42" />
        </svg>
    );
}
function PlateInsights() {
    return (
        <svg viewBox="0 0 400 260" role="img" aria-label="Insights wireframe">
            <rect width="400" height="260" fill="#0B0F19" />
            <rect x="16" y="16" width="140" height="220" rx="4" fill="#131829" stroke="#262D42" />
            {[0, 1, 2, 3].map(i => <rect key={i} x="26" y={30 + i * 52} width="120" height="40" rx="3" fill={i === 0 ? '#1B2136' : 'none'} stroke={i === 0 ? '#35C2B0' : '#262D42'} />)}
            <rect x="172" y="16" width="212" height="80" rx="4" fill="#131829" />
            <rect x="184" y="30" width="150" height="10" fill="#333C57" />
            <rect x="184" y="46" width="180" height="8" fill="#262D42" />
            <rect x="184" y="60" width="120" height="8" fill="#262D42" />
            <rect x="172" y="106" width="100" height="16" rx="8" fill="#1B2136" stroke="#333C57" />
            <rect x="278" y="106" width="106" height="16" rx="8" fill="#1B2136" stroke="#333C57" />
            <rect x="172" y="134" width="212" height="8" fill="#262D42" />
            <rect x="172" y="148" width="200" height="8" fill="#262D42" />
            <rect x="172" y="162" width="212" height="8" fill="#262D42" />
        </svg>
    );
}
function PlateStartups() {
    return (
        <svg viewBox="0 0 400 260" role="img" aria-label="Startups wireframe">
            <rect width="400" height="260" fill="#0B0F19" />
            <rect x="16" y="16" width="220" height="16" rx="3" fill="#333C57" />
            <rect x="16" y="44" width="260" height="24" rx="4" stroke="#333C57" fill="none" strokeDasharray="3 2" />
            <rect x="288" y="44" width="96" height="24" rx="4" stroke="#333C57" fill="none" strokeDasharray="3 2" />
            <rect x="16" y="82" width="368" height="20" rx="2" fill="#1B2136" />
            {[0, 1, 2, 3, 4].map(i => (
                <g key={i}>
                    <rect x="16" y={110 + i * 26} width="368" height="22" rx="2" fill={i === 1 ? '#131829' : 'none'} stroke="#262D42" />
                    {i === 1 && <rect x="16" y={110 + i * 26} width="3" height="22" fill="#35C2B0" />}
                </g>
            ))}
        </svg>
    );
}

const PLATES = [
    { id: 'home', Comp: PlateHome,
        en: { name: 'Home — globe hub switcher', why: 'A globe, not a hero image, because the product is about breadth across geographies first — clicking a marker is the very first interaction, before any text is read.' },
        zh: { name: '首頁 — 地球儀 hub 切換器', why: '用地球儀而不是主視覺圖，因為這個產品首先關於跨地理的廣度——點一個 marker 是使用者的第一個互動，早於任何文字被讀到。' } },
    { id: 'insights', Comp: PlateInsights,
        en: { name: 'Insights — chapter list + reader pane', why: 'A two-pane, book-like layout instead of a card grid, because a strategic brief is meant to be read start to finish, not skimmed like a news feed.' },
        zh: { name: 'Insights — 章節清單 + 閱讀面板', why: '用書籍式雙欄，而不是卡片網格，因為策略簡報本來就該從頭讀到尾，而不是像新聞動態一樣被略讀。' } },
    { id: 'startups', Comp: PlateStartups,
        en: { name: 'Startups — expandable table', why: 'A dense table, not cards, because the job is fast scanning across 201 rows first, and only expanding the one row worth six paragraphs.' },
        zh: { name: 'Startups — 可展開表格', why: '用密集表格，而不是卡片，因為工作是先快速掃過 201 列，只展開真正值得讀六段文字的那一列。' } },
];

const IA_TREE = {
    en: ['/ (home) — globe, hub brief, two entry CTAs', '/insights — chapter list → single brief reader', '/startups — search + sector filter → expandable analyst row'],
    zh: ['/（首頁）— 地球儀、hub brief、兩個入口 CTA', '/insights — 章節清單 → 單篇簡報閱讀器', '/startups — 搜尋 + 產業篩選 → 可展開分析師列'],
};

const COPY = {
    en: {
        title: 'Wireflow: three low-fidelity plates',
        lead: 'The three shipped surfaces, redrawn at wireframe fidelity, with the layout decision stated next to each one — not just what the screen shows, but why that shape and not a more conventional one.',
        iaTitle: 'Information architecture',
        soWhat: 'Three screens, three different reading modes — a globe for exploration, a book for a brief, a table for a scan. The layout is the argument for how each surface should be used.',
    },
    zh: {
        title: '線框：三張低保真圖版',
        lead: '三個已上線介面，重繪成線框保真度，並在每一張旁邊寫明版面決策——不只是螢幕顯示什麼，而是為什麼是這個形狀、而不是更常規的做法。',
        iaTitle: '資訊架構',
        soWhat: '三個螢幕，三種不同的閱讀模式——地球儀給探索、書籍給簡報、表格給掃描。版面本身就是「這個介面該怎麼被使用」的論證。',
    },
};

export default function M09_Wireflow() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState('home');
    const plate = PLATES.find(p => p.id === active);
    const pl = plate[lang] ?? plate.en;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="isp-m9-tabs" role="tablist">
                {PLATES.map(p => (
                    <button key={p.id} role="tab" aria-selected={active === p.id}
                        className={`isp-btn isp-m9-tab${active === p.id ? ' is-on' : ''}`}
                        onClick={() => setActive(p.id)} onKeyDown={onActivate(() => setActive(p.id))}>
                        {(p[lang] ?? p.en).name}
                    </button>
                ))}
            </div>
            <div className="isp-m9-plate">
                <plate.Comp />
            </div>
            <p className="isp-m9-why">{pl.why}</p>

            <span className="isp-caption isp-m9-ia-title">{t.iaTitle}</span>
            <ul className="isp-m9-ia">
                {(IA_TREE[lang] ?? IA_TREE.en).map((line, i) => <li key={i} className="isp-mono">{line}</li>)}
            </ul>
        </ModuleFrame>
    );
}

injectStyles('isp-m9-style', `
.isp-m9-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.isp-m9-tab { font-size: 12px; padding: 7px 12px; }
.isp-m9-plate { border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); overflow: hidden; background: var(--isp-bg-0); }
.isp-m9-plate svg { display: block; width: 100%; height: auto; }
.isp-m9-why { margin: 12px 0 20px; font-size: 13.5px; line-height: 1.6; color: var(--isp-text-2); max-width: 640px; }
.isp-m9-ia-title { display: block; margin-bottom: 8px; }
.isp-m9-ia { margin: 0; padding: 0; list-style: none; display: grid; gap: 5px; }
.isp-m9-ia li { font-size: 12px; color: var(--isp-text-2); }
`);
