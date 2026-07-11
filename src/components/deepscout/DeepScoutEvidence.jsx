import React, { Suspense, lazy } from 'react';
import { injectStyles, useI18n, Reveal, ActDivider } from './shared/dsKit.jsx';
import { ACTS, MODULES, SHELL, LIVE_URL } from './data/dsContent.js';

const COMPONENTS = {
    M01: lazy(() => import('./M01_TensionTriangle.jsx')),
    M02: lazy(() => import('./M02_SignalSchema.jsx')),
    M03: lazy(() => import('./M03_Wireflow.jsx')),
    M04: lazy(() => import('./M04_FourPasses.jsx')),
    M05: lazy(() => import('./M05_DesigningForDoubt.jsx')),
    M06: lazy(() => import('./M06_ComponentHonesty.jsx')),
    M07: lazy(() => import('./M07_BilingualCraft.jsx')),
    M08: lazy(() => import('./M08_FreshnessProblem.jsx')),
    M09: lazy(() => import('./M09_MetricTree.jsx')),
    M10: lazy(() => import('./M10_RiskGuardrail.jsx')),
    M11: lazy(() => import('./M11_EngineeringTheCase.jsx')),
    MB: lazy(() => import('./MB_LiveBridge.jsx')),
};

function Skeleton() {
    return (
        <div className="ds ds-skel" role="status" aria-label="Loading module">
            <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 15 H70 l6 -10 l6 20 l6 -14 l5 4 H160 l6 -8 l6 8 H400"
                    fill="none" stroke="var(--ds-teal)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="ds-sr-only">Loading…</span>
        </div>
    );
}

function ActRail({ lang }) {
    const go = id => document.getElementById(`ds-act-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <nav className="ds ds-rail" aria-label="Acts">
            {ACTS.map(a => (
                <button key={a.id} className="ds-rail-btn" onClick={() => go(a.id)}>
                    <span className="ds-rail-num">{a.num}</span>
                    <span className="ds-rail-name">{a.name[lang]}</span>
                </button>
            ))}
        </nav>
    );
}

function ModuleIndex({ lang, indexLabel }) {
    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <nav className="ds ds-index" aria-label={indexLabel}>
            <span className="ds-eyebrow ds-index-label">{indexLabel} · {MODULES.length} {lang === 'zh' ? '件' : 'artifacts'}</span>
            <div className="ds-index-grid">
                {MODULES.map(m => (
                    <button key={m.id} className="ds-index-card" onClick={() => go(m.id)}>
                        <span className="ds-index-num">{m.num}</span>
                        <span className="ds-index-title">{m.title[lang]}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default function DeepScoutEvidence() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const grouped = ACTS.map(a => ({ act: a, modules: MODULES.filter(m => m.act === a.id) }));

    return (
        <section className="ds ds-layer proj-section" aria-label={t.title}>
            <a className="ds-skip" href="#ds-index">{t.skipLink}</a>

            <header className="ds-hero reveal">
                <span className="ds-eyebrow ds-hero-eyebrow">{t.eyebrow}</span>
                <h2 className="ds-hero-title">{t.title}</h2>
                <p className="ds-hero-lead">{t.lead}</p>
                <a className="ds-hero-link" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                    {LIVE_URL} ↗
                </a>
            </header>

            <div className="ds-rail-wrap reveal">
                <ActRail lang={lang} />
            </div>

            <Reveal><ModuleIndex lang={lang} indexLabel={t.indexLabel} /></Reveal>

            {grouped.map(({ act, modules }) => (
                <div key={act.id} id={`ds-act-${act.id}`} className="ds-actgroup">
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
        </section>
    );
}

injectStyles('ds-layer', `
.ds-layer { position: relative; margin-top: 20px; }
.ds-skip { position: absolute; left: -9999px; top: 0; z-index: 20; font-family: var(--ds-font-data); font-size: 12px; color: var(--ds-bg-0); background: var(--ds-teal); padding: 8px 14px; border-radius: var(--ds-r-sm); }
.ds-skip:focus { left: 0; }

.ds-hero { position: relative; padding: 38px 34px 26px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.05), transparent 60%), var(--ds-bg-1); overflow: hidden; margin-bottom: 18px; }
.ds-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.014) 0 1px, transparent 1px 6px); opacity: 0.7; }
.ds-hero-eyebrow { color: var(--ds-teal); position: relative; }
.ds-hero-title { font-family: var(--ds-font-display); font-size: clamp(30px, 4.6vw, 52px); font-weight: 500; line-height: 1.04; letter-spacing: -0.018em; color: var(--ds-text-1); margin: 14px 0 0; position: relative; }
.ds-hero-lead { max-width: 700px; margin: 16px 0 0; font-size: 16px; line-height: 1.62; color: var(--ds-text-2); position: relative; }
.ds-hero-link { display: inline-flex; margin-top: 18px; font-family: var(--ds-font-data); font-size: 13px; color: var(--ds-teal); position: relative; text-decoration: none; border-bottom: 1px solid var(--ds-teal-dim); padding-bottom: 2px; }
.ds-hero-link:hover { border-bottom-color: var(--ds-teal); }

/* sticky act rail */
.ds-rail-wrap { position: sticky; top: 60px; z-index: 8; margin-bottom: 22px; }
.ds-rail { display: flex; gap: 4px; flex-wrap: wrap; padding: 10px 14px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); background: rgba(12,14,18,0.94); backdrop-filter: blur(8px); }
.ds-rail-btn { display: inline-flex; align-items: baseline; gap: 6px; padding: 5px 10px; border-radius: var(--ds-r-sm); color: var(--ds-text-3); transition: color 160ms var(--ds-ease), background 160ms var(--ds-ease); }
.ds-rail-btn:hover { color: var(--ds-text-1); background: var(--ds-bg-3); }
.ds-rail-num { font-family: var(--ds-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--ds-teal); }
.ds-rail-name { font-size: 12.5px; }

/* module index */
.ds-index { margin-bottom: 26px; }
.ds-index-label { display: block; color: var(--ds-text-3); margin-bottom: 12px; }
.ds-index-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.ds-index-card { display: flex; flex-direction: column; gap: 4px; text-align: left; padding: 10px 12px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-sm); background: var(--ds-bg-1); transition: border-color 160ms var(--ds-ease), transform 160ms var(--ds-ease); }
.ds-index-card:hover { border-color: var(--ds-teal); transform: translateY(-2px); }
.ds-index-num { font-family: var(--ds-font-data); font-size: 11px; color: var(--ds-teal); }
.ds-index-title { font-size: 11.5px; line-height: 1.35; color: var(--ds-text-2); }
.ds-index-card:hover .ds-index-title { color: var(--ds-text-1); }
@media (max-width: 1023px) { .ds-index-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 640px) { .ds-index-grid { grid-template-columns: repeat(2, 1fr); } }

.ds-actgroup { }
.ds-skel { padding: 30px 26px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-lg); background: var(--ds-bg-1); margin-bottom: 18px; }
.ds-skel svg { width: 100%; height: 30px; animation: ds-skel-pulse 1.6s var(--ds-ease) infinite; }
@keyframes ds-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.72; } }

@media (max-width: 767px) {
  .ds-hero { padding: 24px 18px 20px; }
  .ds-rail-wrap { position: static; }
}
`);
