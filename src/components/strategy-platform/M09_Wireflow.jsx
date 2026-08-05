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
        en: { name: 'Home — globe hub switcher', why: 'The home page uses an interactive global-information hub rather than a conventional media-style hero. Its job is to establish a product mental model of observing across markets and industries, then lead readers to strategy briefs or the company database. What readers see is not a single static image, but three information states that can be switched and re-arranged.' },
        zh: { name: '首頁 — 地球儀 hub 切換器', why: '首頁使用可互動的全球資訊 Hub，而不是傳統的媒體型主視覺。它的任務是先建立「跨市場、跨產業觀察」的產品心智模型，再把讀者帶向策略簡報或公司資料庫。使用者看到的不是單一張圖片，而是三個能切換且重新編排的資訊狀態。' } },
    { id: 'insights', Comp: PlateInsights,
        en: { name: 'Insights — chapter list + reader pane', why: 'A book-like two-column layout, rather than a card grid, preserves a strategic brief’s argument from beginning to end. It is meant to be read in full, not skimmed like a feed.' },
        zh: { name: 'Insights — 章節清單 + 閱讀面板', why: '採用書籍式雙欄，而非卡片網格，讓策略簡報維持由前至後的論證脈絡；它需要被完整閱讀，而不是像動態消息一樣被快速略過。' } },
    { id: 'startups', Comp: PlateStartups,
        en: { name: 'Startups — expandable table', why: 'A dense table, rather than a card list, lets users scan all 201 records quickly, then expand only the companies whose six-part analyses warrant a closer read.' },
        zh: { name: 'Startups — 可展開表格', why: '採用高密度表格，而非卡片列表，讓使用者先快速掃描 201 筆紀錄，再只展開真正值得深入閱讀六段分析的公司。' } },
];

const IA_TREE = {
    en: [
        '/ Home — establishes product positioning and provides the two primary reading paths: /insights and /startups.',
        '/insights — Strategy briefs use a book-like two-column view that leads into a single-brief reading panel, suited to continuous reading and topic tracking.',
        '/startups — The company database offers industry filtering first, then expands company analyses, supporting horizontal comparison without frequent page changes.',
    ],
    zh: [
        '/ 首頁——建立產品定位，提供 /insights 與 /startups 兩條主要閱讀路徑。',
        '/insights 策略簡報——以書籍式雙欄呈現，再進入單篇閱讀面板，適合連續閱讀與主題追蹤。',
        '/startups 公司資料庫——先提供產業篩選，再展開公司分析，支援橫向比較而不必頻繁切頁。',
    ],
};

const COPY = {
    en: {
        title: 'Wireflow: three low-fidelity plates',
        lead: 'Three shipped surfaces, redrawn as low-fidelity wireframes, retain their original information hierarchy, entry points, and layout trade-offs. These wireframes do not reproduce the final visual design; they show that the home, strategy brief, and company directory serve three different reading tasks, each shaped around its own reading behavior.',
        iaTitle: 'Information architecture',
        soWhat: 'Three screens, three different reading modes — a globe for exploration, a book for a brief, a table for a scan. The layout itself demonstrates how each surface is meant to be used.',
    },
    zh: {
        title: '線框：三張低保真圖版',
        lead: '將三個已上線介面重新拆回低保真線框，保留它們最初的資訊層級、操作入口與版面取捨。這些線框圖不是為了重現最終視覺，而是說明首頁、策略簡報與公司目錄面對的是三種不同的閱讀任務，分別對應不同的閱讀習慣。',
        iaTitle: '資訊架構',
        soWhat: '三個螢幕，三種不同的閱讀模式——地球儀給探索、書籍給簡報、表格給掃描。版面本身就是「這個介面該怎麼被使用」的證明。',
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
