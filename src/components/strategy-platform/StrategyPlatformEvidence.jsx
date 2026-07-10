import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import {
    injectStyles, useI18n, usePrefersReducedMotion, useInView, Reveal, ActDivider, WireTicker, IspProvider,
} from './shared/ispKit.jsx';
import {
    ACTS, LENSES, LENS_COUNTS, MODULES, SHELL, LIVE_URL, ROUTES,
} from './data/strategyPlatformContent.js';

const COMPONENTS = {
    M01: lazy(() => import('./M01_WhyDatabase.jsx')),
    M02: lazy(() => import('./M02_SchemaTaxonomy.jsx')),
    M03: lazy(() => import('./M03_CurationLoop.jsx')),
    M04: lazy(() => import('./M04_BriefAnatomy.jsx')),
    M05: lazy(() => import('./M05_AnalystNote.jsx')),
    M06: lazy(() => import('./M06_StrategistAgent.jsx')),
    M07: lazy(() => import('./M07_EditorialOps.jsx')),
    M08: lazy(() => import('./M08_RagConsole.jsx')),
    M09: lazy(() => import('./M09_Wireflow.jsx')),
    M10: lazy(() => import('./M10_ShippedSurfaces.jsx')),
    M11: lazy(() => import('./M11_ComponentSystem.jsx')),
    M12: lazy(() => import('./M12_ArchitectureLimits.jsx')),
};

const TICKER = {
    en: [
        { time: 'CURATE', text: 'A candidate is deduped against 201 rows and placed in the sector taxonomy' },
        { time: 'WRITE', text: 'Six analyst sections drafted — moat, model, funding, risks, verdict' },
        { time: 'AGENT', text: 'Concept: the skill pipeline drafts the same six sections at scale' },
        { time: 'REVIEW', text: 'Concept: editorial ops moves the row through review to publish' },
        { time: 'QUERY', text: 'Concept: a grounded RAG layer answers questions, citing the row' },
    ],
    zh: [
        { time: 'CURATE', text: '候選公司與 201 列去重比對，並定位到產業分類法' },
        { time: 'WRITE', text: '草擬六段分析師欄位——護城河、商模、資金、風險、判斷' },
        { time: 'AGENT', text: '概念：技能 pipeline 在規模化下草擬同樣的六段' },
        { time: 'REVIEW', text: '概念：文案管理把這一列推進審核直到發佈' },
        { time: 'QUERY', text: '概念：依據式 RAG 層回答問題並引用該列' },
    ],
};

const DEMO = {
    en: [
        { route: 'home', tab: '/ · Home', look: 'The globe hub-switcher — where a reader picks a geography before anything else.' },
        { route: 'insights', tab: '/insights', look: 'The real briefs, e.g. the power-constraint thesis traced end to end in M04.' },
        { route: 'startups', tab: '/startups', look: 'The real 201-row database. Expand any row — that six-section shape is what M05–M08 are built on.' },
    ],
    zh: [
        { route: 'home', tab: '/ · Home', look: '地球儀 hub 切換器——讀者在任何事發生之前，先選一個地理區域。' },
        { route: 'insights', tab: '/insights', look: '真實的簡報，例如在 M04 從頭追到尾的電力限制論點。' },
        { route: 'startups', tab: '/startups', look: '真實的 201 列資料庫。展開任一列——那個六段結構正是 M05–M08 建立的基礎。' },
    ],
};

// Per-module glyphs for the index contact sheet. Simple line drawings; the
// accent stroke (class "a") marks each module's characteristic element.
const GS = { fill: 'none', stroke: 'var(--isp-line-2)', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
const THUMBS = {
    M01: <g {...GS}><rect x="5" y="10" width="14" height="14" className="a" /><rect x="24" y="13" width="18" height="8" /></g>,
    M02: <g {...GS}>{[0, 1, 2, 3].map(c => [0, 1].map(r => <rect key={`${c}${r}`} x={6 + c * 9} y={9 + r * 9} width="5" height="5" className={c < 2 ? 'a' : undefined} />))}</g>,
    M03: <g {...GS}><path d="M24 8a8 8 0 1 1-6.9 4" className="a" /><path d="M17 8l-3 1 1-4" className="a" /></g>,
    M04: <g {...GS}><line x1="6" y1="9" x2="36" y2="9" /><line x1="6" y1="15" x2="30" y2="15" className="a" /><line x1="6" y1="21" x2="34" y2="21" /><rect x="4" y="12" width="34" height="6" fill="var(--isp-amber)" opacity="0.14" stroke="none" /></g>,
    M05: <g {...GS}>{[0, 1, 2].map(c => [0, 1].map(r => <rect key={`${c}${r}`} x={6 + c * 12} y={7 + r * 10} width="10" height="8" className={r === 1 && c === 2 ? 'a' : undefined} />))}</g>,
    M06: <g {...GS}>{[6, 12, 18, 24, 30, 36].map((x, i) => <circle key={x} cx={x} cy="16" r="2.4" className={i % 2 === 0 ? 'a' : undefined} />)}<line x1="8" y1="16" x2="34" y2="16" /></g>,
    M07: <g {...GS}>{[6, 15, 24, 33].map((x, i) => <rect key={x} x={x} y="7" width="7" height="18" className={i === 1 ? 'a' : undefined} />)}</g>,
    M08: <g {...GS}><circle cx="14" cy="14" r="7" className="a" /><line x1="19" y1="19" x2="30" y2="28" /><line x1="24" y1="10" x2="38" y2="10" /><line x1="24" y1="16" x2="34" y2="16" /></g>,
    M09: <g {...GS}>{[6, 18, 30].map(x => <rect key={x} x={x} y="9" width="9" height="14" className={x === 18 ? 'a' : undefined} />)}</g>,
    M10: <g {...GS}><rect x="6" y="8" width="32" height="18" rx="2" /><line x1="6" y1="13" x2="38" y2="13" /><circle cx="10" cy="10.5" r="1" className="a" /></g>,
    M11: <g {...GS}><rect x="6" y="14" width="10" height="6" rx="3" className="a" /><circle cx="9" cy="17" r="2" fill="var(--isp-line-2)" stroke="none" /><rect x="22" y="14" width="10" height="6" rx="3" /></g>,
    M12: <g {...GS}><rect x="5" y="13" width="8" height="8" /><rect x="18" y="13" width="8" height="8" className="a" /><rect x="31" y="13" width="8" height="8" /><path d="M13 17h5M26 17h5" /></g>,
};

function Navigator({ lang, indexLabel }) {
    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <nav className="isp isp-nav" aria-label={indexLabel}>
            <span className="isp-eyebrow isp-nav-label">{indexLabel} · {MODULES.length} {lang === 'zh' ? '件' : 'modules'}</span>
            <div className="isp-nav-grid">
                {MODULES.map(m => {
                    const act = ACTS.find(a => a.id === m.act);
                    return (
                        <button key={m.id} className="isp-nav-card" onClick={() => go(m.id)}>
                            <span className="isp-nav-thumb" aria-hidden="true"><svg viewBox="0 0 44 30">{THUMBS[m.key]}</svg></span>
                            <span className="isp-nav-meta">
                                <span className="isp-nav-num">{m.num}<span className="isp-nav-act">·{act.num}</span></span>
                                <span className="isp-nav-title">{m.title[lang]}</span>
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
        <div className="isp isp-skel" role="status" aria-label="Loading module">
            <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 15 H70 l6 -10 l6 20 l6 -14 l5 4 H160 l6 -8 l6 8 H400"
                    fill="none" stroke="var(--isp-teal)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="isp-sr-only">Loading…</span>
        </div>
    );
}

function Ledger({ t, lang, activeLens, setLens }) {
    return (
        <div className="isp isp-ledger" id="isp-ledger">
            <div className="isp-ledger-acts" aria-label="Acts">
                {ACTS.map(a => (
                    <button key={a.id} className="isp-ledger-act" onClick={() => document.getElementById(`isp-act-${a.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                        <span className="isp-ledger-act-num">{a.num}</span>
                        <span className="isp-ledger-act-name">{a.name[lang]}</span>
                    </button>
                ))}
            </div>
            <div className="isp-ledger-filter" role="group" aria-label={t.lensHint}>
                <span className="isp-ledger-filter-label">{t.lensHint}</span>
                {LENSES.map(l => {
                    const on = activeLens === l.id;
                    return (
                        <button key={l.id} className={`isp-lenschip-btn${on ? ' is-on' : ''}`} style={{ '--isp-lc': l.tone }} aria-pressed={on}
                            onClick={() => setLens(on ? null : l.id)}>
                            <span className="isp-lenschip-name">{l.name[lang]}</span>
                            <span className="isp-lenschip-count">{String(LENS_COUNTS[l.id]).padStart(2, '0')}</span>
                        </button>
                    );
                })}
                <button className="isp-lenschip-clear" onClick={() => setLens(null)} disabled={!activeLens}>{t.clear}</button>
            </div>
        </div>
    );
}

export default function StrategyPlatformEvidence() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    usePrefersReducedMotion();
    const [activeLens, setActiveLens] = useState(null);

    const setLens = useCallback(l => setActiveLens(l), []);
    useEffect(() => {
        if (!activeLens) return;
        const onKey = e => { if (e.key === 'Escape') setActiveLens(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [activeLens]);

    const grouped = ACTS.map(a => ({ act: a, modules: MODULES.filter(m => m.act === a.id) }));

    return (
        <section className="isp isp-layer proj-section" aria-label={t.title}>
            <a className="isp-skip" href="#isp-ledger">{t.skipLink}</a>

            <header className="isp-hero reveal">
                <span className="isp-eyebrow isp-hero-eyebrow">{t.eyebrow}</span>
                <h2 className="isp-hero-title">{t.title}</h2>
                <p className="isp-hero-lead">{t.lead}</p>
                <div className="isp-hero-wire"><WireTicker items={TICKER[lang] ?? TICKER.en} /></div>
            </header>

            <div className="isp-ledger-wrap reveal">
                <Ledger t={t} lang={lang} activeLens={activeLens} setLens={setLens} />
            </div>

            <Reveal><Navigator lang={lang} indexLabel={t.indexLabel} /></Reveal>

            <IspProvider activeLens={activeLens}>
                {grouped.map(({ act, modules }) => (
                    <div key={act.id} id={`isp-act-${act.id}`} className="isp-actgroup">
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
            </IspProvider>

            <div className="isp isp-demo reveal">
                <div className="isp-demo-head">
                    <span className="isp-eyebrow" style={{ color: 'var(--isp-teal)' }}>LIVE DEMO BRIDGE</span>
                    <h3 className="isp-display">{t.demoTitle}</h3>
                    <p className="isp-mod-lead">{t.demoLead}</p>
                </div>
                <div className="isp-demo-grid">
                    {(DEMO[lang] ?? DEMO.en).map((d, i) => (
                        <a key={i} className="isp-demo-card" href={ROUTES[d.route]} target="_blank" rel="noopener noreferrer">
                            <span className="isp-demo-card-tab">{d.tab}</span>
                            <span className="isp-demo-card-look">{d.look}</span>
                            <span className="isp-demo-card-open">OPEN ↗</span>
                        </a>
                    ))}
                </div>
                <p className="isp-demo-url">{t.demoPrintNote} <span className="isp-mono">{LIVE_URL}</span></p>
            </div>
        </section>
    );
}

injectStyles('isp-layer', `
.isp-layer { position: relative; margin-top: 20px; }
.isp-skip { position: absolute; left: -9999px; top: 0; z-index: 20; font-family: var(--isp-font-data); font-size: 12px; color: var(--isp-bg-0); background: var(--isp-teal); padding: 8px 14px; border-radius: var(--isp-r-sm); }
.isp-skip:focus { left: 0; }

.isp-hero { position: relative; padding: 38px 34px 26px; border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.05), transparent 60%), var(--isp-bg-1); overflow: hidden; margin-bottom: 18px; }
.isp-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.014) 0 1px, transparent 1px 6px); opacity: 0.7; }
.isp-hero-eyebrow { color: var(--isp-teal); position: relative; }
.isp-hero-title { font-family: var(--isp-font-display); font-size: clamp(30px, 4.6vw, 52px); font-weight: 500; line-height: 1.04; letter-spacing: -0.018em; color: var(--isp-text-1); margin: 14px 0 0; position: relative; }
.isp-hero-lead { max-width: 680px; margin: 16px 0 0; font-size: 16px; line-height: 1.62; color: var(--isp-text-2); position: relative; }
.isp-hero-wire { margin-top: 24px; position: relative; }

/* sticky ledger */
.isp-ledger-wrap { position: sticky; top: 60px; z-index: 8; margin-bottom: 22px; }
.isp-ledger { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 10px 14px; border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); background: rgba(11,15,25,0.94); backdrop-filter: blur(8px); }
.isp-ledger-acts { display: flex; gap: 4px; flex-wrap: wrap; }
.isp-ledger-act { display: inline-flex; align-items: baseline; gap: 6px; padding: 5px 10px; border-radius: var(--isp-r-sm); color: var(--isp-text-3); transition: color 160ms var(--isp-ease), background 160ms var(--isp-ease); }
.isp-ledger-act:hover { color: var(--isp-text-1); background: var(--isp-bg-3); }
.isp-ledger-act-num { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--isp-teal); }
.isp-ledger-act-name { font-size: 12.5px; }
.isp-ledger-filter { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.isp-ledger-filter-label { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--isp-text-3); margin-right: 2px; }
.isp-lenschip-btn { display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; border: 1px solid var(--isp-line-2); border-radius: 999px; background: var(--isp-bg-2); transition: border-color 160ms var(--isp-ease), background 160ms var(--isp-ease); }
.isp-lenschip-btn:hover { border-color: var(--isp-lc, var(--isp-teal)); }
.isp-lenschip-btn.is-on { border-color: var(--isp-lc, var(--isp-teal)); background: color-mix(in srgb, var(--isp-lc, var(--isp-teal)) 14%, var(--isp-bg-2)); }
.isp-lenschip-name { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.06em; color: var(--isp-text-2); }
.isp-lenschip-btn.is-on .isp-lenschip-name { color: var(--isp-lc, var(--isp-teal)); }
.isp-lenschip-count { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); }
.isp-lenschip-clear { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.06em; color: var(--isp-text-3); padding: 4px 8px; border-radius: 999px; }
.isp-lenschip-clear:hover:not([disabled]) { color: var(--isp-text-1); }
.isp-lenschip-clear[disabled] { opacity: 0.35; cursor: default; }

/* module index / contact sheet */
.isp-nav { margin-bottom: 26px; }
.isp-nav-label { display: block; color: var(--isp-text-3); margin-bottom: 12px; }
.isp-nav-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.isp-nav-card { display: flex; flex-direction: column; text-align: left; border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-sm); overflow: hidden; background: var(--isp-bg-1); transition: border-color 160ms var(--isp-ease), transform 160ms var(--isp-ease); }
.isp-nav-card:hover { border-color: var(--isp-teal); transform: translateY(-2px); }
.isp-nav-thumb { display: block; background: var(--isp-bg-2); border-bottom: 1px solid var(--isp-line-1); padding: 10px 12px 6px; }
.isp-nav-thumb svg { display: block; width: 100%; height: auto; }
.isp-nav-thumb svg .a { stroke: var(--isp-teal); }
.isp-nav-meta { padding: 8px 10px 10px; }
.isp-nav-num { display: block; font-family: var(--isp-font-data); font-size: 11px; color: var(--isp-teal); }
.isp-nav-act { color: var(--isp-text-3); margin-left: 4px; }
.isp-nav-title { display: block; font-size: 11.5px; line-height: 1.35; color: var(--isp-text-2); margin-top: 3px; }
.isp-nav-card:hover .isp-nav-title { color: var(--isp-text-1); }
@media (max-width: 1023px) { .isp-nav-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 640px) { .isp-nav-grid { grid-template-columns: repeat(2, 1fr); } }

.isp-actgroup { }
.isp-skel { padding: 30px 26px; border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-lg); background: var(--isp-bg-1); margin-bottom: 18px; }
.isp-skel svg { width: 100%; height: 30px; animation: isp-skel-pulse 1.6s var(--isp-ease) infinite; }
@keyframes isp-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.72; } }

/* live demo bridge */
.isp-demo { margin-top: 30px; padding: 30px; border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.045), transparent 55%), var(--isp-bg-1); }
.isp-demo-head .isp-display { margin-top: 8px; }
.isp-demo-head .isp-mod-lead { margin-top: 12px; }
.isp-demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 22px 0 18px; }
.isp-demo-card { display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); background: var(--isp-bg-2); text-decoration: none; transition: border-color 180ms var(--isp-ease), transform 180ms var(--isp-ease); }
.isp-demo-card:hover { border-color: var(--isp-teal); transform: translateY(-2px); }
.isp-demo-card-tab { font-family: var(--isp-font-data); font-size: 12px; letter-spacing: 0.04em; color: var(--isp-teal); }
.isp-demo-card-look { font-size: 13.5px; line-height: 1.55; color: var(--isp-text-2); }
.isp-demo-card-open { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.12em; color: var(--isp-text-3); margin-top: auto; }
.isp-demo-url { margin: 0; font-family: var(--isp-font-data); font-size: 12px; color: var(--isp-text-3); }
.isp-demo-url .isp-mono { color: var(--isp-teal); word-break: break-all; }

@media (max-width: 900px) { .isp-demo-grid { grid-template-columns: 1fr; } }
@media (max-width: 767px) {
  .isp-hero { padding: 24px 18px 20px; }
  .isp-ledger-wrap { position: static; }
  .isp-ledger { flex-direction: column; align-items: flex-start; }
  .isp-demo { padding: 22px 16px; }
}
`);
