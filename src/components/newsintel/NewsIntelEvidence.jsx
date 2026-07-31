import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import {
    injectStyles, useI18n, usePrefersReducedMotion, useInView, Reveal, ActDivider, WireTicker, NiProvider,
} from './shared/niKit.jsx';
import {
    ACTS, FIDELITIES, FIDELITY_COUNTS, MODULES, SHELL, LIVE_URL, ROUTES,
} from './data/newsIntelContent.js';

const COMPONENTS = {
    M01: lazy(() => import('./M01_AnalystMorning.jsx')),
    M02: lazy(() => import('./M02_SourceSelection.jsx')),
    M03: lazy(() => import('./M03_JobStories.jsx')),
    M04: lazy(() => import('./M04_PromptLab.jsx')),
    M05: lazy(() => import('./M05_ModelDecision.jsx')),
    M06: lazy(() => import('./M06_Taxonomy.jsx')),
    M07: lazy(() => import('./M07_PipelineAnatomy.jsx')),
    MP: lazy(() => import('./MP_ShippedPlatform.jsx')),
    M08: lazy(() => import('./M08_IAEvolution.jsx')),
    M09: lazy(() => import('./M09_Wireframes.jsx')),
    M10: lazy(() => import('./M10_HiFiComparator.jsx')),
    M11: lazy(() => import('./M11_ComponentInventory.jsx')),
    M12: lazy(() => import('./M12_ArchitectureLedger.jsx')),
    M13: lazy(() => import('./M13_ReliabilityOps.jsx')),
    M14: lazy(() => import('./M14_ImpactMetrics.jsx')),
    M15: lazy(() => import('./M15_UsabilityFindings.jsx')),
    M16: lazy(() => import('./M16_Roadmap.jsx')),
};

const TICKER = {
    en: [
        { time: '06:12', text: 'CRAWL — 6 sources polled, 214 raw items fetched' },
        { time: '06:14', text: 'DEDUPE — 61 near-duplicates collapsed by title hash' },
        { time: '06:17', text: 'CLASSIFY — bilingual taxonomy tags applied' },
        { time: '06:19', text: 'SUMMARISE — Gemini pass, numbers quoted verbatim' },
        { time: '06:21', text: 'PUBLISH — briefing pushed to the platform /insights feed' },
    ],
    zh: [
        { time: '06:12', text: 'CRAWL — 輪詢 6 個來源，抓取 214 筆原始項目' },
        { time: '06:14', text: 'DEDUPE — 依標題雜湊摺疊 61 筆近似重複' },
        { time: '06:17', text: 'CLASSIFY — 套用雙語分類標籤' },
        { time: '06:19', text: 'SUMMARISE — Gemini 摘要，數字逐字引用' },
        { time: '06:21', text: 'PUBLISH — 簡報推送至平台 /insights 動態' },
    ],
};

const DEMO = {
    en: [
        { route: 'home', tab: '/ · Home', look: 'Orients first-time visitors to the product, its core functions, and the main paths of use, then leads into daily intelligence and the company directory.' },
        { route: 'insights', tab: '/insights', look: 'See the classifications, summaries, and source information produced by the news pipeline. The AI-chip example traced in module 07 is rendered here on the front end.' },
        { route: 'startups', tab: '/startups', look: 'Browse and find deep-tech companies by industry, and see how the bilingual taxonomy from module 06 supports filtering and data presentation in practice.' },
    ],
    zh: [
        { route: 'home', tab: '/ · Home', look: '為首次造訪者整理產品定位、核心功能與主要使用路徑，並引導進入每日情報與企業目錄。' },
        { route: 'insights', tab: '/insights', look: '查看由新聞管線產出的分類、摘要與來源資訊；模組 07 追蹤的 AI 晶片案例，也在這裡完成前端呈現。' },
        { route: 'startups', tab: '/startups', look: '依產業分類瀏覽與查找深科技企業，並查看 Module 06 的雙語分類架構如何實際支援篩選與資料呈現。' },
    ],
};

// Per-module glyphs for the index contact sheet. Simple line drawings; the
// accent stroke (class "a") marks each module's characteristic element.
const GS = { fill: 'none', stroke: 'var(--ni-line-2)', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
const THUMBS = {
    M01: <g {...GS}><rect x="6" y="15" width="5" height="9" /><rect x="14" y="9" width="5" height="15" className="a" /><rect x="22" y="6" width="5" height="18" /><rect x="34" y="16" width="8" height="8" /></g>,
    M02: <g {...GS}>{[0, 1, 2, 3].map(c => [0, 1].map(r => <rect key={`${c}${r}`} x={8 + c * 9} y={9 + r * 9} width="5" height="5" className={c < 2 ? 'a' : undefined} />))}</g>,
    M03: <g {...GS}>{[8, 15, 22].map(y => <g key={y}><circle cx="9" cy={y} r="1.6" className="a" /><line x1="14" y1={y} x2="40" y2={y} /></g>)}</g>,
    M04: <g {...GS}><line x1="8" y1="9" x2="34" y2="9" /><line x1="8" y1="15" x2="30" y2="15" className="a" /><path d="M38 12v6M35 15h6" className="a" /><line x1="8" y1="21" x2="26" y2="21" /></g>,
    M05: <g {...GS}><rect x="7" y="8" width="9" height="16" /><rect x="19" y="8" width="9" height="16" className="a" /><rect x="31" y="8" width="9" height="16" /></g>,
    M06: <g {...GS}><circle cx="10" cy="16" r="2.5" className="a" /><path d="M13 16h8M21 16v-7h8M21 16v7h8" /><circle cx="31" cy="9" r="2" /><circle cx="31" cy="23" r="2" /></g>,
    M07: <g {...GS}><line x1="6" y1="16" x2="42" y2="16" /><polyline points="6,16 14,16 18,8 22,24 26,12 30,16 42,16" className="a" /><circle cx="26" cy="12" r="2.4" className="a" /></g>,
    MP: <g {...GS}><rect x="7" y="7" width="34" height="18" rx="2" /><line x1="7" y1="12" x2="41" y2="12" /><circle cx="11" cy="9.5" r="1" className="a" /><rect x="11" y="16" width="10" height="5" className="a" /><rect x="24" y="16" width="6" height="5" /></g>,
    M08: <g {...GS}><path d="M9 8v16M9 12h5M9 20h5" /><path d="M22 8v16M22 12h5M22 20h5" className="a" /><path d="M35 8v16M35 12h5M35 20h5" /></g>,
    M09: <g {...GS}><rect x="7" y="8" width="34" height="16" rx="2" /><line x1="12" y1="13" x2="24" y2="13" /><circle cx="34" cy="18" r="2.2" className="a" /></g>,
    M10: <g {...GS}><rect x="7" y="8" width="34" height="16" rx="2" /><line x1="24" y1="8" x2="24" y2="24" className="a" /><circle cx="24" cy="16" r="2.4" className="a" /></g>,
    M11: <g {...GS}><rect x="7" y="8" width="14" height="16" rx="2" className="a" />{[26, 32, 38].map(x => <circle key={x} cx={x} cy="16" r="2" />)}</g>,
    M12: <g {...GS}><rect x="6" y="12" width="9" height="8" /><rect x="19" y="12" width="9" height="8" className="a" /><rect x="33" y="12" width="9" height="8" /><path d="M15 16h4M28 16h5" /></g>,
    M13: <g {...GS}><polyline points="6,16 16,16 20,8 24,24 28,16 42,16" className="a" /></g>,
    M14: <g {...GS}><line x1="8" y1="10" x2="20" y2="10" strokeWidth="3" className="a" /><line x1="8" y1="16" x2="40" y2="16" /><line x1="8" y1="21" x2="32" y2="21" /></g>,
    M15: <g {...GS}>{[9, 16, 23].map((y, i) => <g key={y}><path d={`M8 ${y}l2 2 3-4`} className={i === 1 ? 'a' : undefined} /><line x1="17" y1={y} x2="40" y2={y} /></g>)}</g>,
    M16: <g {...GS}><line x1="8" y1="9" x2="20" y2="9" /><line x1="8" y1="16" x2="20" y2="16" /><line x1="8" y1="23" x2="20" y2="23" /><path d="M28 16h12M35 11l5 5-5 5" className="a" /></g>,
};

function Navigator({ lang, indexLabel }) {
    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <nav className="ni ni-nav" aria-label={indexLabel}>
            <span className="ni-eyebrow ni-nav-label">{indexLabel} · {MODULES.length} {lang === 'zh' ? '件' : 'artifacts'}</span>
            <div className="ni-nav-grid">
                {MODULES.map(m => {
                    const act = ACTS.find(a => a.id === m.act);
                    return (
                        <button key={m.id} className="ni-nav-card" onClick={() => go(m.id)}>
                            <span className="ni-nav-thumb" aria-hidden="true"><svg viewBox="0 0 48 30">{THUMBS[m.key]}</svg></span>
                            <span className="ni-nav-meta">
                                <span className="ni-nav-num">{m.num}<span className="ni-nav-act">·{act.num}</span></span>
                                <span className="ni-nav-title">{m.title[lang]}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

function Skeleton() {
    return (
        <div className="ni ni-skel" role="status" aria-label="Loading module">
            <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 15 H70 l6 -10 l6 20 l6 -14 l5 4 H160 l6 -8 l6 8 H400"
                    fill="none" stroke="var(--ni-teal)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="ni-sr-only">Loading…</span>
        </div>
    );
}

function Ledger({ t, lang, activeFidelity, setFidelity }) {
    return (
        <div className="ni ni-ledger" id="ni-ledger">
            <div className="ni-ledger-acts" aria-label="Acts">
                {ACTS.map(a => (
                    <button key={a.id} className="ni-ledger-act" onClick={() => document.getElementById(`ni-act-${a.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                        <span className="ni-ledger-act-num">{a.num}</span>
                        <span className="ni-ledger-act-name">{a.name[lang]}</span>
                    </button>
                ))}
            </div>
            <div className="ni-ledger-filter" role="group" aria-label={t.filterHint}>
                <span className="ni-ledger-filter-label">{t.filterHint}</span>
                {FIDELITIES.map(f => {
                    const on = activeFidelity === f;
                    return (
                        <button key={f} className={`ni-fidchip${on ? ' is-on' : ''}`} aria-pressed={on}
                            onClick={() => setFidelity(on ? null : f)}>
                            <span className="ni-fidchip-name">{f}</span>
                            <span className="ni-fidchip-count">{String(FIDELITY_COUNTS[f]).padStart(2, '0')}</span>
                        </button>
                    );
                })}
                <button className="ni-fidchip-clear" onClick={() => setFidelity(null)} disabled={!activeFidelity}>{t.clear}</button>
            </div>
        </div>
    );
}

export default function NewsIntelEvidence() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const reduced = usePrefersReducedMotion();
    const [activeFidelity, setActiveFidelity] = useState(null);

    const setFidelity = useCallback(f => setActiveFidelity(f), []);
    useEffect(() => {
        if (!activeFidelity) return;
        const onKey = e => { if (e.key === 'Escape') setActiveFidelity(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [activeFidelity]);

    const grouped = ACTS.map(a => ({ act: a, modules: MODULES.filter(m => m.act === a.id) }));

    return (
        <section className="ni ni-layer proj-section" aria-label={t.title}>
            <a className="ni-skip" href="#ni-ledger">{t.skipLink}</a>

            <header className="ni-hero reveal">
                <span className="ni-eyebrow ni-hero-eyebrow">{t.eyebrow}</span>
                <h2 className="ni-hero-title">{t.title}</h2>
                <p className="ni-hero-lead">{t.lead}</p>
                <div className="ni-hero-wire"><WireTicker items={TICKER[lang] ?? TICKER.en} /></div>
            </header>

            <div className="ni-ledger-wrap reveal">
                <Ledger t={t} lang={lang} activeFidelity={activeFidelity} setFidelity={setFidelity} />
            </div>

            <Reveal><Navigator lang={lang} indexLabel={t.indexLabel} /></Reveal>

            <NiProvider activeFidelity={activeFidelity}>
                {grouped.map(({ act, modules }) => (
                    <div key={act.id} id={`ni-act-${act.id}`} className="ni-actgroup">
                        <ActDivider act={act} count={modules.length} />
                        {modules.map(m => {
                            const Comp = COMPONENTS[m.key];
                            return (
                                <Reveal key={m.id}>
                                    <Suspense fallback={<Skeleton />}><Comp /></Suspense>
                                </Reveal>
                            );
                        })}
                    </div>
                ))}
            </NiProvider>

            <div className="ni ni-demo reveal">
                <div className="ni-demo-head">
                    <span className="ni-eyebrow" style={{ color: 'var(--ni-teal)' }}>LIVE DEMO BRIDGE</span>
                    <h3 className="ni-display">{t.demoTitle}</h3>
                    <p className="ni-mod-lead">{t.demoLead}</p>
                </div>
                <div className="ni-demo-grid">
                    {(DEMO[lang] ?? DEMO.en).map((d, i) => (
                        <a key={i} className="ni-demo-card" href={ROUTES[d.route]} target="_blank" rel="noopener noreferrer">
                            <span className="ni-demo-card-tab">{d.tab}</span>
                            <span className="ni-demo-card-look">{d.look}</span>
                            <span className="ni-demo-card-open">OPEN ↗</span>
                        </a>
                    ))}
                </div>
                <p className="ni-demo-url">{t.demoPrintNote} <span className="ni-mono">{LIVE_URL}</span></p>
            </div>
        </section>
    );
}

injectStyles('ni-layer', `
.ni-layer { position: relative; margin-top: 20px; }
.ni-skip { position: absolute; left: -9999px; top: 0; z-index: 20; font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-bg-0); background: var(--ni-teal); padding: 8px 14px; border-radius: var(--ni-r-sm); }
.ni-skip:focus { left: 0; }

.ni-hero { position: relative; padding: 38px 34px 26px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.05), transparent 60%), var(--ni-bg-1); overflow: hidden; margin-bottom: 18px; }
.ni-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.014) 0 1px, transparent 1px 6px); opacity: 0.7; }
.ni-hero-eyebrow { color: var(--ni-teal); position: relative; }
.ni-hero-title { font-family: var(--ni-font-display); font-size: clamp(30px, 4.6vw, 52px); font-weight: 500; line-height: 1.04; letter-spacing: -0.018em; color: var(--ni-text-1); margin: 14px 0 0; position: relative; }
.ni-hero-lead { max-width: 660px; margin: 16px 0 0; font-size: 16px; line-height: 1.62; color: var(--ni-text-2); position: relative; }
.ni-hero-wire { margin-top: 24px; position: relative; }

/* sticky ledger */
.ni-ledger-wrap { position: sticky; top: 60px; z-index: 8; margin-bottom: 22px; }
.ni-ledger { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 10px 14px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); background: rgba(12,14,18,0.94); backdrop-filter: blur(8px); }
.ni-ledger-acts { display: flex; gap: 4px; flex-wrap: wrap; }
.ni-ledger-act { display: inline-flex; align-items: baseline; gap: 6px; padding: 5px 10px; border-radius: var(--ni-r-sm); color: var(--ni-text-3); transition: color 160ms var(--ni-ease), background 160ms var(--ni-ease); }
.ni-ledger-act:hover { color: var(--ni-text-1); background: var(--ni-bg-3); }
.ni-ledger-act-num { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--ni-teal); }
.ni-ledger-act-name { font-size: 12.5px; }
.ni-ledger-filter { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.ni-ledger-filter-label { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ni-text-3); margin-right: 2px; }
.ni-fidchip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; border: 1px solid var(--ni-line-2); border-radius: 999px; background: var(--ni-bg-2); transition: border-color 160ms var(--ni-ease), background 160ms var(--ni-ease); }
.ni-fidchip:hover { border-color: var(--ni-teal); }
.ni-fidchip.is-on { border-color: var(--ni-teal); background: var(--ni-teal-dim); }
.ni-fidchip-name { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.06em; color: var(--ni-text-2); }
.ni-fidchip.is-on .ni-fidchip-name { color: var(--ni-teal); }
.ni-fidchip-count { font-family: var(--ni-font-data); font-size: 10px; color: var(--ni-text-3); }
.ni-fidchip-clear { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.06em; color: var(--ni-text-3); padding: 4px 8px; border-radius: 999px; }
.ni-fidchip-clear:hover:not([disabled]) { color: var(--ni-text-1); }
.ni-fidchip-clear[disabled] { opacity: 0.35; cursor: default; }

/* module index / contact sheet */
.ni-nav { margin-bottom: 26px; }
.ni-nav-label { display: block; color: var(--ni-text-3); margin-bottom: 12px; }
.ni-nav-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.ni-nav-card { display: flex; flex-direction: column; text-align: left; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-sm); overflow: hidden; background: var(--ni-bg-1); transition: border-color 160ms var(--ni-ease), transform 160ms var(--ni-ease); }
.ni-nav-card:hover { border-color: var(--ni-teal); transform: translateY(-2px); }
.ni-nav-thumb { display: block; background: var(--ni-bg-2); border-bottom: 1px solid var(--ni-line-1); padding: 10px 12px 6px; }
.ni-nav-thumb svg { display: block; width: 100%; height: auto; }
.ni-nav-thumb svg .a { stroke: var(--ni-teal); }
.ni-nav-meta { padding: 8px 10px 10px; }
.ni-nav-num { display: block; font-family: var(--ni-font-data); font-size: 11px; color: var(--ni-teal); }
.ni-nav-act { color: var(--ni-text-3); margin-left: 4px; }
.ni-nav-title { display: block; font-size: 11.5px; line-height: 1.35; color: var(--ni-text-2); margin-top: 3px; }
.ni-nav-card:hover .ni-nav-title { color: var(--ni-text-1); }
@media (max-width: 1023px) { .ni-nav-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 640px) { .ni-nav-grid { grid-template-columns: repeat(2, 1fr); } }

.ni-actgroup { }
.ni-skel { padding: 30px 26px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-lg); background: var(--ni-bg-1); margin-bottom: 18px; }
.ni-skel svg { width: 100%; height: 30px; animation: ni-skel-pulse 1.6s var(--ni-ease) infinite; }
@keyframes ni-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.72; } }

/* live demo bridge */
.ni-demo { margin-top: 30px; padding: 30px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.045), transparent 55%), var(--ni-bg-1); }
.ni-demo-head .ni-display { margin-top: 8px; }
.ni-demo-head .ni-mod-lead { margin-top: 12px; }
.ni-demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 22px 0 18px; }
.ni-demo-card { display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); background: var(--ni-bg-2); text-decoration: none; transition: border-color 180ms var(--ni-ease), transform 180ms var(--ni-ease); }
.ni-demo-card:hover { border-color: var(--ni-teal); transform: translateY(-2px); }
.ni-demo-card-tab { font-family: var(--ni-font-data); font-size: 12px; letter-spacing: 0.04em; color: var(--ni-teal); }
.ni-demo-card-look { font-size: 13.5px; line-height: 1.55; color: var(--ni-text-2); }
.ni-demo-card-open { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.12em; color: var(--ni-text-3); margin-top: auto; }
.ni-demo-url { margin: 0; font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-text-3); }
.ni-demo-url .ni-mono { color: var(--ni-teal); word-break: break-all; }

@media (max-width: 900px) { .ni-demo-grid { grid-template-columns: 1fr; } }
@media (max-width: 767px) {
  .ni-hero { padding: 24px 18px 20px; }
  .ni-ledger-wrap { position: static; }
  .ni-ledger { flex-direction: column; align-items: flex-start; }
  .ni-demo { padding: 22px 16px; }
}
`);
