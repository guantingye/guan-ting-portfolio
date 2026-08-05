import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/ispKit.jsx';
import { MODULES, LIVE_URL } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M10');
const ASSET = name => `${import.meta.env.BASE_URL}strategy-platform/${name}.webp`;

const TABS = [
    { id: 'home', label: { en: 'Home', zh: '首頁' }, src: { en: ASSET('home-globe'), zh: ASSET('home-zh') },
        decision: { en: 'The globe hub first establishes a mental model for exploring across geographies. Without extra explanation, readers can understand that this is an entry point into global industry intelligence.', zh: '地球儀 Hub 先建立跨地理探索的產品心智模型。使用者不需閱讀額外說明，就能理解這是一個從全球產業資訊跳出的入口。' } },
    { id: 'insights', label: { en: 'Insights', zh: 'Insights' }, src: { en: ASSET('insights-brief'), zh: ASSET('insights-brief') },
        decision: { en: 'The chapter rail on the left lets readers locate themselves quickly across five briefs while preserving their reading position, without repeatedly leaving the main content pane.', zh: '左側章節軌讓讀者在五篇簡報之間快速定位，同時保留原有閱讀位置，不必反覆離開主要內容面板。' } },
    { id: 'startups', label: { en: 'Startups', zh: 'Startups' }, src: { en: ASSET('startups-table'), zh: ASSET('startups-table') },
        decision: { en: 'Search and industry filters act directly on the live records, making narrowing the scope the first step of browsing rather than an add-on bolted on after data accumulates.', zh: '搜尋與產業篩選直接作用於真實資料紀錄，讓縮小範圍成為瀏覽流程的第一步，而不是資料堆疊後才補上的附屬功能。' } },
    { id: 'detail', label: { en: 'Startups · expanded', zh: 'Startups · 展開' }, src: { en: ASSET('startups-detail'), zh: ASSET('startups-detail') },
        decision: { en: 'The six-part analysis expands in place within the table rather than opening in a modal, so readers can examine one company in depth while retaining its position and surrounding context in the full dataset.', zh: '六段分析在表格原位展開，而非另開彈窗，讓讀者深入閱讀單一公司時，仍能保留它在完整資料集中的位置與前後脈絡。' } },
];

const COPY = {
    en: {
        title: 'Live interface implementation',
        lead: 'Use the tabs to inspect Home, Insights, Startups, and the expanded-row state. Home also retains the Traditional Chinese / English toggle, so the wireframes, components, and information architecture shown earlier can be compared directly with the shipped product.',
        openLive: 'View the live site ↗',
        bilingual: 'EN / 中文',
        soWhat: 'This is not mockup work made to look real. Every earlier design decision can be checked, one by one, in the shipped product.',
    },
    zh: {
        title: '已上線介面實作',
        lead: '透過頁籤可檢視 Home、Insights、Startups 與資料列展開狀態；Home 亦保留繁中／英文切換，讓前面的線框、元件與資訊架構可以直接對照最終產品。',
        openLive: '檢視實際網站 ↗',
        bilingual: 'EN / 中文',
        soWhat: '這裡不是把 mockup 做得像真的，而是讓前面的每項設計判斷，都能在已上線產品中被逐一核對。',
    },
};

export default function M10_ShippedSurfaces() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState('home');
    const [imgLang, setImgLang] = useState('en');
    const tab = TABS.find(x => x.id === active);
    const decision = tab.decision[lang] ?? tab.decision.en;
    const src = active === 'home' ? tab.src[imgLang] : tab.src.en;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="isp-m10-tabbar">
                <div className="isp-m10-tabs" role="tablist">
                    {TABS.map(tb => (
                        <button key={tb.id} role="tab" aria-selected={active === tb.id}
                            className={`isp-btn isp-m10-tab${active === tb.id ? ' is-on' : ''}`}
                            onClick={() => setActive(tb.id)} onKeyDown={onActivate(() => setActive(tb.id))}>
                            {tb.label[lang] ?? tb.label.en}
                        </button>
                    ))}
                </div>
                <a className="isp-m10-live" href={LIVE_URL} target="_blank" rel="noopener noreferrer">{t.openLive}</a>
            </div>

            <div className="isp-m10-browser">
                <div className="isp-m10-chrome">
                    <span className="isp-m10-dot" /><span className="isp-m10-dot" /><span className="isp-m10-dot" />
                    <span className="isp-mono isp-m10-url">industry-strategy-platform.vercel.app{active === 'home' ? '' : `/${active === 'detail' ? 'startups' : active}`}</span>
                    {active === 'home' && (
                        <div className="isp-m10-langtoggle" role="group" aria-label={t.bilingual}>
                            <button className={imgLang === 'en' ? 'is-on' : ''} onClick={() => setImgLang('en')}>EN</button>
                            <button className={imgLang === 'zh' ? 'is-on' : ''} onClick={() => setImgLang('zh')}>中文</button>
                        </div>
                    )}
                </div>
                <img className="isp-m10-shot" src={src} alt={tab.label[lang] ?? tab.label.en} loading="lazy" />
            </div>
            <p className="isp-m10-decision">{decision}</p>
        </ModuleFrame>
    );
}

injectStyles('isp-m10-style', `
.isp-m10-tabbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.isp-m10-tabs { display: flex; flex-wrap: wrap; gap: 6px; }
.isp-m10-tab { font-size: 12px; padding: 7px 12px; }
.isp-m10-live { font-family: var(--isp-font-data); font-size: 11.5px; color: var(--isp-teal); white-space: nowrap; }
.isp-m10-live:hover { text-decoration: underline; }
.isp-m10-browser { border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); overflow: hidden; background: var(--isp-bg-0); }
.isp-m10-chrome { display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: var(--isp-bg-2); border-bottom: 1px solid var(--isp-line-1); }
.isp-m10-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--isp-line-2); }
.isp-m10-url { flex: 1; min-width: 0; font-size: 11px; color: var(--isp-text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.isp-m10-langtoggle { display: flex; gap: 2px; flex: 0 0 auto; }
.isp-m10-langtoggle button { font-family: var(--isp-font-data); font-size: 10px; padding: 3px 8px; border-radius: 4px; color: var(--isp-text-3); }
.isp-m10-langtoggle button.is-on { color: var(--isp-bg-0); background: var(--isp-teal); }
.isp-m10-shot { display: block; width: 100%; height: auto; }
.isp-m10-decision { margin: 12px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--isp-text-2); max-width: 640px; }
`);
