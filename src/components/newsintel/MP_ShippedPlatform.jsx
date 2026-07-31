import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES, ROUTES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'MP');

const COPY = {
    en: {
        title: 'Shipped product | Three core surfaces',
        lead: 'Information only becomes intelligence a team can use when it enters a product surface that is readable and searchable. I organized the pipeline output into a Strategy Intelligence Platform: a product home page, daily intelligence at /insights, and a deep-tech company directory at /startups. All three surfaces are rebuilt with real DOM and components, so they can be operated and inspected rather than viewed as static screenshots.',
        tabs: { home: 'Home', insights: 'Insights', startups: 'Startups' },
        open: 'Open interactive prototype',
        home: {
            brand: 'Strategy Intelligence Platform',
            tag: 'Turn global technology signals into intelligence for research and decision-making.',
            cards: [
                { k: 'Insights', d: 'A daily synthesis of global technology and industry signals, retaining categories, summaries, and source links.' },
                { k: 'Startups', d: 'A deep-tech company and startup directory, searchable by sector, region, and company criteria.' },
            ],
            stats: [['6', 'information sources'], ['5', 'industry domains'], ['daily', 'automatic refresh']],
        },
        insights: {
            label: 'Insights · weekly briefings',
            items: [
                { t: 'Global AI-chip market trends', date: '2025-01-15', tags: ['AI', 'Semiconductor', 'Market'] },
                { t: 'CoWoS packaging and the volume race', date: '2025-01-14', tags: ['Semiconductor', 'Foundry'] },
                { t: 'Export controls hit memory makers', date: '2025-01-13', tags: ['Policy', 'Memory'] },
            ],
        },
        startups: {
            label: 'Startups · directory',
            filters: ['All', 'Semiconductor', 'AI', 'Biotech', 'Cleantech'],
            note: 'Company names masked — records are internal to ITRI.',
            rows: [
                { sector: 'AI', stage: 'Series B', loc: 'Taipei' },
                { sector: 'Semiconductor', stage: 'Series A', loc: 'Hsinchu' },
                { sector: 'Biotech', stage: 'Seed', loc: 'Taipei' },
                { sector: 'Cleantech', stage: 'Series A', loc: 'Taichung' },
            ],
        },
        soWhat: 'Explore the home page, daily intelligence, and company directory',
    },
    zh: {
        title: '已上線產品｜三個核心介面',
        lead: '資料只有進入可閱讀、可搜尋的產品介面，才真正成為團隊可以使用的情報。我將資料管線的輸出整理成一套 Strategy Intelligence Platform，包含產品首頁、每日情報 /insights，以及深科技公司目錄 /startups。三個介面皆以實際 DOM 與元件重建，可直接操作與檢視，不是靜態截圖。',
        tabs: { home: 'Home', insights: 'Insights', startups: 'Startups' },
        open: '開啟互動原型',
        home: {
            brand: 'Strategy Intelligence Platform',
            tag: '把全球科技訊號，整理成能被研究與決策使用的情報。',
            cards: [
                { k: 'Insights', d: '每日整理全球科技與產業訊號，保留分類、摘要與來源連結。' },
                { k: 'Startups', d: '深科技企業與新創目錄，可依產業、地區與公司條件查找。' },
            ],
            stats: [['6 個', '資訊來源'], ['5 個', '產業領域'], ['每日', '自動更新']],
        },
        insights: {
            label: 'Insights · 每週簡報',
            items: [
                { t: '全球 AI 晶片市場趨勢', date: '2025-01-15', tags: ['AI', '半導體', '市場'] },
                { t: 'CoWoS 封裝與量產競賽', date: '2025-01-14', tags: ['半導體', '代工'] },
                { t: '出口管制衝擊記憶體廠', date: '2025-01-13', tags: ['政策', '記憶體'] },
            ],
        },
        startups: {
            label: 'Startups · 目錄',
            filters: ['全部', '半導體', 'AI', '生技', '潔淨科技'],
            note: '公司名稱遮罩——紀錄為工研院內部資料。',
            rows: [
                { sector: 'AI', stage: 'B 輪', loc: '台北' },
                { sector: '半導體', stage: 'A 輪', loc: '新竹' },
                { sector: '生技', stage: '種子', loc: '台北' },
                { sector: '潔淨科技', stage: 'A 輪', loc: '台中' },
            ],
        },
        soWhat: '查看首頁、每日情報與企業目錄',
    },
};

function HomeSurface({ s }) {
    return (
        <div className="ni-sp-home">
            <div className="ni-sp-hero">
                <span className="ni-sp-hero-brand">{s.brand}</span>
                <span className="ni-sp-hero-tag">{s.tag}</span>
            </div>
            <div className="ni-sp-cards">
                {s.cards.map(c => (
                    <div key={c.k} className="ni-sp-card">
                        <span className="ni-sp-card-k">{c.k}</span>
                        <span className="ni-sp-card-d">{c.d}</span>
                    </div>
                ))}
            </div>
            <div className="ni-sp-stats">
                {s.stats.map(([v, l]) => (
                    <div key={l} className="ni-sp-stat"><strong>{v}</strong><span>{l}</span></div>
                ))}
            </div>
        </div>
    );
}

function InsightsSurface({ s }) {
    return (
        <div className="ni-sp-insights">
            <span className="ni-sp-surfacelabel">{s.label}</span>
            <div className="ni-sp-feed">
                {s.items.map((it, i) => (
                    <div key={i} className="ni-sp-report">
                        <span className="ni-sp-report-t">{it.t}</span>
                        <div className="ni-sp-report-meta">
                            <span className="ni-sp-report-date">{it.date}</span>
                            <span className="ni-sp-report-tags">{it.tags.map(tg => <span key={tg}>{tg}</span>)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StartupsSurface({ s }) {
    const [active, setActive] = useState(0);
    return (
        <div className="ni-sp-startups">
            <span className="ni-sp-surfacelabel">{s.label}</span>
            <div className="ni-sp-filters" role="group" aria-label="Sector filter">
                {s.filters.map((f, i) => (
                    <button key={f} className={`ni-sp-filter${i === active ? ' is-on' : ''}`} aria-pressed={i === active} onClick={() => setActive(i)}>{f}</button>
                ))}
            </div>
            <div className="ni-sp-rows">
                {s.rows.map((r, i) => (
                    <div key={i} className="ni-sp-row">
                        <span className="ni-sp-row-name" aria-label="masked name">▪▪▪▪▪▪▪▪</span>
                        <span className="ni-sp-row-sector">{r.sector}</span>
                        <span className="ni-sp-row-stage">{r.stage}</span>
                        <span className="ni-sp-row-loc">{r.loc}</span>
                    </div>
                ))}
            </div>
            <span className="ni-sp-masknote">{s.note}</span>
        </div>
    );
}

const SURFACES = { home: HomeSurface, insights: InsightsSurface, startups: StartupsSurface };
const ORDER = ['home', 'insights', 'startups'];

export default function MP_ShippedPlatform() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [route, setRoute] = useState('home');
    const refs = useRef({});
    const Surface = SURFACES[route];

    const move = dir => {
        const i = (ORDER.indexOf(route) + dir + ORDER.length) % ORDER.length;
        setRoute(ORDER[i]); refs.current[ORDER[i]]?.focus();
    };

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-sp">
                <div className="ni-sp-frame">
                    <div className="ni-sp-chrome">
                        <span className="ni-sp-traffic" aria-hidden="true"><i /><i /><i /></span>
                        <div className="ni-sp-tabs" role="tablist" aria-label="Platform routes">
                            {ORDER.map(r => (
                                <button key={r} role="tab" aria-selected={route === r} tabIndex={route === r ? 0 : -1}
                                    ref={el => (refs.current[r] = el)}
                                    className={`ni-sp-tab${route === r ? ' is-on' : ''}`}
                                    onClick={() => setRoute(r)}
                                    onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
                                    /{r === 'home' ? '' : r}
                                </button>
                            ))}
                        </div>
                        <a className="ni-sp-open" href={ROUTES[route]} target="_blank" rel="noopener noreferrer">{t.open} ↗</a>
                    </div>
                    <div className="ni-sp-viewport" role="tabpanel">
                        <Surface s={t[route]} />
                    </div>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-mp', `
.ni-sp { --sp-bg: #0b0d20; --sp-panel: #15173100; --sp-panel2: #171a37; --sp-line: #2a2f52; --sp-t1: #e9eaf7; --sp-t2: #a2a6c4; --sp-t3: #6b6f93; --sp-violet: #8b7ff5; --sp-blue: #5b8def; }
.ni-sp-frame { border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-md); overflow: hidden; background: var(--sp-bg); }
.ni-sp-chrome { display: flex; align-items: center; gap: 12px; padding: 9px 12px; background: #0e1026; border-bottom: 1px solid var(--sp-line); }
.ni-sp-traffic { display: inline-flex; gap: 5px; flex: 0 0 auto; }
.ni-sp-traffic i { width: 9px; height: 9px; border-radius: 50%; background: #2a2f52; }
.ni-sp-tabs { display: flex; gap: 4px; flex: 1; }
.ni-sp-tab { font-family: var(--ni-font-data); font-size: 11.5px; color: var(--sp-t2); padding: 5px 12px; border-radius: 6px; border: 1px solid transparent; transition: color 160ms, background 160ms, border-color 160ms; }
.ni-sp-tab:hover { color: var(--sp-t1); }
.ni-sp-tab.is-on { color: #fff; background: rgba(139,127,245,0.16); border-color: var(--sp-violet); }
.ni-sp-open { font-family: var(--ni-font-data); font-size: 11px; color: var(--sp-blue); text-decoration: none; flex: 0 0 auto; }
.ni-sp-open:hover { text-decoration: underline; }
.ni-sp-viewport { padding: 26px 22px; min-height: 280px; background: radial-gradient(120% 90% at 15% 0%, rgba(91,141,239,0.12), transparent 55%), radial-gradient(90% 80% at 90% 20%, rgba(139,127,245,0.14), transparent 60%), var(--sp-bg); }

/* home */
.ni-sp-hero { text-align: center; padding: 12px 0 26px; }
.ni-sp-hero-brand { display: block; font-family: var(--ni-font-display); font-size: clamp(22px, 3vw, 30px); color: var(--sp-t1); letter-spacing: -0.01em; }
.ni-sp-hero-tag { display: block; margin-top: 8px; font-size: 13px; color: var(--sp-t2); }
.ni-sp-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ni-sp-card { padding: 16px; border: 1px solid var(--sp-line); border-radius: 12px; background: linear-gradient(180deg, rgba(139,127,245,0.08), transparent), var(--sp-panel2); }
.ni-sp-card-k { display: block; font-size: 15px; font-weight: 700; color: var(--sp-t1); margin-bottom: 6px; }
.ni-sp-card-d { display: block; font-size: 12.5px; line-height: 1.55; color: var(--sp-t2); }
.ni-sp-stats { display: flex; gap: 10px; justify-content: center; margin-top: 18px; }
.ni-sp-stat { text-align: center; padding: 10px 18px; border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-panel2); }
.ni-sp-stat strong { display: block; font-family: var(--ni-font-data); font-size: 18px; color: var(--sp-violet); }
.ni-sp-stat span { font-size: 10.5px; color: var(--sp-t3); }

/* insights */
.ni-sp-surfacelabel { display: block; font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sp-blue); margin-bottom: 14px; }
.ni-sp-feed { display: flex; flex-direction: column; gap: 10px; }
.ni-sp-report { padding: 14px 16px; border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-panel2); }
.ni-sp-report-t { display: block; font-size: 14px; font-weight: 600; color: var(--sp-t1); margin-bottom: 8px; }
.ni-sp-report-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.ni-sp-report-date { font-family: var(--ni-font-data); font-size: 11px; color: var(--sp-t3); }
.ni-sp-report-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.ni-sp-report-tags span { font-size: 10.5px; color: var(--sp-t2); background: rgba(91,141,239,0.14); border-radius: 4px; padding: 2px 8px; }

/* startups */
.ni-sp-filters { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.ni-sp-filter { font-size: 11.5px; color: var(--sp-t2); padding: 4px 12px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-panel2); transition: color 160ms, border-color 160ms, background 160ms; }
.ni-sp-filter:hover { border-color: var(--sp-violet); }
.ni-sp-filter.is-on { color: #fff; background: rgba(139,127,245,0.18); border-color: var(--sp-violet); }
.ni-sp-rows { display: flex; flex-direction: column; gap: 6px; }
.ni-sp-row { display: grid; grid-template-columns: 1.4fr 1fr 0.9fr 0.9fr; gap: 12px; align-items: center; padding: 10px 14px; border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-panel2); font-size: 12px; }
.ni-sp-row-name { font-family: var(--ni-font-data); letter-spacing: 0.12em; color: var(--sp-t3); }
.ni-sp-row-sector { color: var(--sp-violet); }
.ni-sp-row-stage, .ni-sp-row-loc { color: var(--sp-t2); font-family: var(--ni-font-data); font-size: 11px; }
.ni-sp-masknote { display: block; margin-top: 12px; font-family: var(--ni-font-data); font-size: 11px; color: var(--sp-t3); }

@media (max-width: 767px) {
  .ni-sp-cards { grid-template-columns: 1fr; }
  .ni-sp-row { grid-template-columns: 1fr 1fr; gap: 6px 10px; }
  .ni-sp-open { display: none; }
}
`);
