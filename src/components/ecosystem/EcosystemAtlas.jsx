import React, { Suspense, lazy, useEffect, useState } from 'react';
import { injectStyles, useI18n, useInView, Reveal, onActivate } from './shared/ecoKit.jsx';
import { SECTIONS, MODULES, SHELL } from './data/ecoContent.js';

const COMPONENTS = {
    E01: lazy(() => import('./E01_SourceAtlas.jsx')),
    E02: lazy(() => import('./E02_SchemaTagging.jsx')),
    E03: lazy(() => import('./E03_SectorAtlas.jsx')),
    E04: lazy(() => import('./E04_ValueChain.jsx')),
    E05: lazy(() => import('./E05_GapAnalysis.jsx')),
    E06: lazy(() => import('./E06_InvestmentFlow.jsx')),
    E07: lazy(() => import('./E07_PatentGrant.jsx')),
    E08: lazy(() => import('./E08_B2BSurfaces.jsx')),
    E09: lazy(() => import('./E09_RAGConsole.jsx')),
    E10: lazy(() => import('./E10_RoadmapSystem.jsx')),
};

function AtlasIndex({ lang, t, active }) {
    const go = id => document.getElementById(`eco-sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <nav className="eco eco-index" aria-label={t.navLabel}>
            <span className="eco-index-label">{t.navLabel}</span>
            <ol className="eco-index-list">
                {SECTIONS.map(s => {
                    const on = active === s.id;
                    return (
                        <li key={s.id}>
                            <button className={`eco-index-item${on ? ' is-on' : ''}`} aria-current={on ? 'true' : undefined}
                                onClick={() => go(s.id)} onKeyDown={onActivate(() => go(s.id))}>
                                <span className="eco-index-tag">{s.tag}</span>
                                <span className="eco-index-name">{s.full[lang]}</span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

function SheetHead({ section, lang, count }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -30% 0px' });
    return (
        <div ref={ref} className={`eco-sheethead${inView ? ' in' : ''}`}>
            <span className="eco-sheethead-tag">{section.tag}</span>
            <h2 className="eco-sheethead-name">{section.full[lang]}</h2>
            <span className="eco-sheethead-count">{String(count).padStart(2, '0')}</span>
            <span className="eco-sheethead-rule" aria-hidden="true" />
        </div>
    );
}

function Skeleton() {
    return (
        <div className="eco eco-skel" role="status" aria-label="Loading module">
            <svg viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 13 H80 l8 -8 l6 16 l7 -12 l6 4 H190 l7 -6 l6 6 H400" fill="none" stroke="var(--eco-ink)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="eco-sr-only">Loading…</span>
        </div>
    );
}

export default function EcosystemAtlas() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const [active, setActive] = useState(SECTIONS[0].id);

    useEffect(() => {
        const nodes = SECTIONS.map(s => document.getElementById(`eco-sec-${s.id}`)).filter(Boolean);
        if (!nodes.length || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(es => {
            const vis = es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (vis[0]) setActive(vis[0].target.id.replace('eco-sec-', ''));
        }, { rootMargin: '-14% 0px -74% 0px' });
        nodes.forEach(n => io.observe(n));
        return () => io.disconnect();
    });

    const grouped = SECTIONS.map(s => ({ section: s, modules: MODULES.filter(m => m.section === s.id) }));

    return (
        <section className="eco eco-layer proj-section" aria-label={t.eyebrow}>
            <a className="eco-skip" href="#eco-index-anchor">{lang === 'zh' ? '跳至地圖集索引' : 'Skip to atlas index'}</a>

            <header className="eco-hero reveal">
                <span className="eco-eyebrow eco-hero-eyebrow">{t.eyebrow}</span>
                <h2 className="eco-hero-title">{t.title}</h2>
                <p className="eco-hero-lead">{t.lead}</p>
                <div className="eco-hero-meta">{t.meta.map(m => <span className="eco-hero-metaitem" key={m}>{m}</span>)}</div>
            </header>

            <div className="eco-index-wrap reveal" id="eco-index-anchor">
                <AtlasIndex lang={lang} t={t} active={active} />
            </div>

            {grouped.map(({ section, modules }) => (
                <div key={section.id} id={`eco-sec-${section.id}`} className="eco-secgroup">
                    <SheetHead section={section} lang={lang} count={modules.length} />
                    {modules.map(m => (
                        <Reveal key={m.id}>
                            <Suspense fallback={<Skeleton />}>{React.createElement(COMPONENTS[m.key])}</Suspense>
                        </Reveal>
                    ))}
                </div>
            ))}
        </section>
    );
}

injectStyles('eco-layer', `
.eco-layer { position: relative; margin-top: 20px; }
.eco-skip { position: absolute; left: -9999px; top: 0; z-index: 20; font-family: var(--eco-font-data); font-size: 12px; color: var(--eco-bg-0); background: var(--eco-ink); padding: 8px 14px; border-radius: var(--eco-r-sm); }
.eco-skip:focus { left: 0; }

.eco-hero { position: relative; padding: 40px 36px 30px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-lg); background: linear-gradient(180deg, rgba(232,163,61,0.055), transparent 58%), var(--eco-bg-1); overflow: hidden; margin-bottom: 18px; }
.eco-hero::before { content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(var(--eco-line-1) 1px, transparent 1px), linear-gradient(90deg, var(--eco-line-1) 1px, transparent 1px);
  background-size: 44px 44px; opacity: 0.25; }
.eco-hero-eyebrow { color: var(--eco-ink); position: relative; }
.eco-hero-title { font-family: var(--eco-font-display); font-size: clamp(29px, 4.2vw, 48px); font-weight: 500; line-height: 1.08; letter-spacing: -0.016em; color: var(--eco-text-1); margin: 14px 0 0; max-width: 18ch; position: relative; }
.eco-hero-lead { max-width: 680px; margin: 16px 0 0; font-size: 16px; line-height: 1.62; color: var(--eco-text-2); position: relative; }
.eco-hero-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 22px; position: relative; }
.eco-hero-metaitem { font-family: var(--eco-font-data); font-size: 11px; letter-spacing: 0.04em; color: var(--eco-text-3); }
.eco-hero-metaitem::before { content: ''; display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: var(--eco-ink); box-shadow: 0 0 6px var(--eco-ink); margin-right: 7px; vertical-align: middle; }

.eco-index-wrap { position: sticky; top: 60px; z-index: 8; margin-bottom: 22px; }
.eco-index { display: flex; align-items: center; gap: 14px; padding: 9px 14px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-md); background: rgba(12,14,18,0.94); backdrop-filter: blur(8px); }
.eco-index-label { flex: 0 0 auto; font-family: var(--eco-font-data); font-size: 10px; letter-spacing: 0.16em; color: var(--eco-text-3); }
.eco-index-list { list-style: none; display: flex; gap: 4px; margin: 0; padding: 0; overflow-x: auto; scrollbar-width: thin; }
.eco-index-item { display: inline-flex; align-items: baseline; gap: 7px; padding: 6px 11px; border-radius: var(--eco-r-sm); color: var(--eco-text-3); white-space: nowrap; transition: color 160ms var(--eco-ease), background 160ms var(--eco-ease); }
.eco-index-item:hover, .eco-index-item.is-on { color: var(--eco-text-1); background: var(--eco-bg-3); }
.eco-index-tag { font-family: var(--eco-font-data); font-size: 10.5px; letter-spacing: 0.06em; color: var(--eco-ink); }
.eco-index-name { font-family: var(--eco-font-display); font-size: 14px; }
@media (max-width: 620px) { .eco-index-name { display: none; } }

.eco-secgroup { margin-bottom: 8px; scroll-margin-top: 110px; }
.eco-sheethead { display: flex; align-items: baseline; gap: 14px; margin: 34px 0 16px; opacity: 0; transform: translateY(10px); transition: opacity 0.6s var(--eco-ease), transform 0.6s var(--eco-ease); }
.eco-sheethead.in { opacity: 1; transform: none; }
.eco-sheethead-tag { font-family: var(--eco-font-data); font-size: 13px; font-weight: 500; letter-spacing: 0.18em; color: var(--eco-ink); }
.eco-sheethead-name { font-family: var(--eco-font-display); font-size: clamp(22px, 3vw, 30px); font-weight: 500; color: var(--eco-text-1); margin: 0; letter-spacing: -0.01em; }
.eco-sheethead-count { font-family: var(--eco-font-data); font-size: 11px; color: var(--eco-text-3); border: 1px solid var(--eco-line-2); border-radius: 999px; padding: 1px 8px; }
.eco-sheethead-rule { flex: 1; height: 1px; background: repeating-linear-gradient(90deg, var(--eco-line-2) 0 6px, transparent 6px 12px); align-self: center; }

.eco-skel { padding: 26px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-lg); background: var(--eco-bg-1); margin-bottom: 18px; }
.eco-skel svg { width: 100%; height: 26px; animation: eco-skel-pulse 1.6s var(--eco-ease) infinite; }
@keyframes eco-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }

@media (max-width: 767px) {
  .eco-hero { padding: 26px 18px 22px; }
  .eco-index-wrap { position: static; }
}
@media (prefers-reduced-motion: reduce) { .eco-sheethead { opacity: 1; transform: none; transition: none; } }
`);
