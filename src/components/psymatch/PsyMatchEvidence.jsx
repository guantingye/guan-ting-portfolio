import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
    injectStyles, useI18n, usePrefersReducedMotion, useInView, Reveal, onActivate,
} from './shared/psyKit.jsx';
import { SECTIONS, MODULES, SHELL, REFERENCES } from './data/psyContent.js';

const COMPONENTS = {
    M01: lazy(() => import('./M01_Abstract.jsx')),
    M02: lazy(() => import('./M02_WhyFit.jsx')),
    M03: lazy(() => import('./M03_Hypotheses.jsx')),
    M04: lazy(() => import('./M04_ScaleMatrix.jsx')),
    M05: lazy(() => import('./M05_ItemMapping.jsx')),
    M06: lazy(() => import('./M06_FlowUX.jsx')),
    M07: lazy(() => import('./M07_Playground.jsx')),
    M08: lazy(() => import('./M08_WeightDesign.jsx')),
    M09: lazy(() => import('./M09_DecisionRecord.jsx')),
    M10: lazy(() => import('./M10_ShippedScreens.jsx')),
    M11: lazy(() => import('./M11_DataFlow.jsx')),
    M12: lazy(() => import('./M12_EdgeCases.jsx')),
    M13: lazy(() => import('./M13_PilotResults.jsx')),
    M14: lazy(() => import('./M14_AlgorithmAudit.jsx')),
    M15: lazy(() => import('./M15_Ethics.jsx')),
    M16: lazy(() => import('./M16_Limitations.jsx')),
    M17: lazy(() => import('./M17_SystemMap.jsx')),
};

function Outline({ lang, t, active }) {
    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <nav className="pm pm-outline" aria-label={t.outlineLabel}>
            <span className="pm-outline-label">{t.outlineLabel}</span>
            <ol className="pm-outline-list">
                {SECTIONS.map(s => {
                    const on = active === s.id;
                    return (
                        <li key={s.id}>
                            <button
                                className={`pm-outline-item${on ? ' is-on' : ''}`}
                                aria-current={on ? 'true' : undefined}
                                onClick={() => go(`pm-sec-${s.id}`)}
                                onKeyDown={onActivate(() => go(`pm-sec-${s.id}`))}>
                                <span className="pm-outline-tag">{s.tag}</span>
                                <span className="pm-outline-name">{s.full[lang]}</span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

function SectionHead({ section, lang, count }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -30% 0px' });
    return (
        <div ref={ref} className={`pm-sechead${inView ? ' in' : ''}`}>
            <span className="pm-sechead-tag">{section.tag}</span>
            <h2 className="pm-sechead-name">{section.full[lang]}</h2>
            <span className="pm-sechead-count">{String(count).padStart(2, '0')}</span>
            <span className="pm-sechead-rule" aria-hidden="true" />
        </div>
    );
}

function Skeleton() {
    return (
        <div className="pm pm-skel" role="status" aria-label="Loading module">
            <svg viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 13 H90 l6 -9 l6 18 l6 -12 l5 3 H180 l6 -7 l6 7 H400"
                    fill="none" stroke="var(--pm-teal)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="pm-sr-only">Loading…</span>
        </div>
    );
}

function References({ lang, t }) {
    return (
        <section className="pm pm-refs" id="pm-references" aria-label={t.referencesTitle}>
            <span className="pm-eyebrow" style={{ color: 'var(--pm-amber)' }}>REFERENCES</span>
            <h3 className="pm-refs-title">{t.referencesTitle}</h3>
            <p className="pm-refs-lead">{t.referencesLead}</p>
            <ol className="pm-refs-list">
                {REFERENCES.map(r => (
                    <li key={r.n} id={`pm-ref-${r.n}`} tabIndex={-1}>
                        <span className="pm-ref-n">{r.n}</span>
                        <span className="pm-ref-cite">
                            {r.cite[lang]}{' '}
                            {r.href && <a href={r.href} target="_blank" rel="noopener noreferrer" className="pm-ref-link">{r.href} ↗</a>}
                            <a className="pm-ref-back" href={`#pm-fnref-${r.n}`}
                                onClick={e => { e.preventDefault(); document.getElementById(`pm-fnref-${r.n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                                aria-label={lang === 'zh' ? '回到內文引用' : 'Back to citation'}>↩</a>
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default function PsyMatchEvidence() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const reduced = usePrefersReducedMotion();
    const [active, setActive] = useState(SECTIONS[0].id);

    // Scroll-spy over the section groups → highlight the current outline entry.
    useEffect(() => {
        const nodes = SECTIONS.map(s => document.getElementById(`pm-sec-${s.id}`)).filter(Boolean);
        if (!nodes.length || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(entries => {
            const vis = entries.filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (vis[0]) setActive(vis[0].target.id.replace('pm-sec-', ''));
        }, { rootMargin: '-14% 0px -74% 0px' });
        nodes.forEach(n => io.observe(n));
        return () => io.disconnect();
    });

    const grouped = SECTIONS.map(s => ({ section: s, modules: MODULES.filter(m => m.section === s.id) }));

    return (
        <section className="pm pm-layer proj-section" aria-label={t.eyebrow}>
            <a className="pm-skip" href="#pm-outline-anchor">{lang === 'zh' ? '跳至報告大綱' : 'Skip to protocol outline'}</a>

            <header className="pm-hero reveal">
                <span className="pm-eyebrow pm-hero-eyebrow">{t.eyebrow}</span>
                <h2 className="pm-hero-title">{t.title}</h2>
                <p className="pm-hero-lead">{t.lead}</p>
                <div className="pm-hero-meta">
                    {t.meta.map(m => <span className="pm-hero-metaitem" key={m}>{m}</span>)}
                </div>
            </header>

            <div className="pm-outline-wrap reveal" id="pm-outline-anchor">
                <Outline lang={lang} t={t} active={active} />
            </div>

            {grouped.map(({ section, modules }) => (
                <div key={section.id} id={`pm-sec-${section.id}`} className="pm-secgroup">
                    <SectionHead section={section} lang={lang} count={modules.length} />
                    {modules.map(m => (
                        <React.Fragment key={m.id}>
                            {m.id === 'pm-m17' && <Reveal><References lang={lang} t={t} /></Reveal>}
                            <Reveal>
                                <Suspense fallback={<Skeleton />}>
                                    {React.createElement(COMPONENTS[m.key])}
                                </Suspense>
                            </Reveal>
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </section>
    );
}

injectStyles('pm-layer', `
.pm-layer { position: relative; margin-top: 20px; }
.pm-skip { position: absolute; left: -9999px; top: 0; z-index: 20; font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-bg-0); background: var(--pm-teal); padding: 8px 14px; border-radius: var(--pm-r-sm); }
.pm-skip:focus { left: 0; }

/* hero — a title page for the report */
.pm-hero { position: relative; padding: 40px 36px 30px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.05), transparent 58%), var(--pm-bg-1); overflow: hidden; margin-bottom: 18px; }
.pm-hero::before { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(180deg, rgba(255,255,255,0.014) 0 1px, transparent 1px 26px); }
.pm-hero-eyebrow { color: var(--pm-teal); position: relative; }
.pm-hero-title { font-family: var(--pm-font-display); font-size: clamp(29px, 4.3vw, 50px); font-weight: 500; line-height: 1.06; letter-spacing: -0.016em; color: var(--pm-text-1); margin: 14px 0 0; max-width: 15ch; position: relative; }
.pm-hero-lead { max-width: 660px; margin: 16px 0 0; font-size: 16px; line-height: 1.62; color: var(--pm-text-2); position: relative; }
.pm-hero-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 22px; position: relative; }
.pm-hero-metaitem { font-family: var(--pm-font-data); font-size: 11px; letter-spacing: 0.04em; color: var(--pm-text-3); }
.pm-hero-metaitem::before { content: ''; display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: var(--pm-teal); box-shadow: 0 0 6px var(--pm-teal); margin-right: 7px; vertical-align: middle; }

/* protocol outline (sticky, pure navigation) */
.pm-outline-wrap { position: sticky; top: 60px; z-index: 8; margin-bottom: 22px; }
.pm-outline { display: flex; align-items: center; gap: 14px; padding: 9px 14px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); background: rgba(12,14,18,0.94); backdrop-filter: blur(8px); }
.pm-outline-label { flex: 0 0 auto; font-family: var(--pm-font-data); font-size: 10px; letter-spacing: 0.16em; color: var(--pm-text-3); }
.pm-outline-list { list-style: none; display: flex; gap: 4px; margin: 0; padding: 0; overflow-x: auto; scrollbar-width: thin; }
.pm-outline-item { display: inline-flex; align-items: baseline; gap: 7px; padding: 6px 11px; border-radius: var(--pm-r-sm); color: var(--pm-text-3); white-space: nowrap; transition: color 160ms var(--pm-ease), background 160ms var(--pm-ease); }
.pm-outline-item:hover { color: var(--pm-text-1); background: var(--pm-bg-3); }
.pm-outline-item.is-on { color: var(--pm-text-1); background: var(--pm-bg-3); }
.pm-outline-tag { font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.06em; color: var(--pm-teal); }
.pm-outline-name { font-family: var(--pm-font-display); font-size: 14px; }
@media (max-width: 620px) { .pm-outline-name { display: none; } }

/* section divider */
.pm-secgroup { margin-bottom: 8px; scroll-margin-top: 110px; }
.pm-sechead { display: flex; align-items: baseline; gap: 14px; margin: 34px 0 16px; opacity: 0; transform: translateY(10px); transition: opacity 0.6s var(--pm-ease), transform 0.6s var(--pm-ease); }
.pm-sechead.in { opacity: 1; transform: none; }
.pm-sechead-tag { font-family: var(--pm-font-data); font-size: 13px; font-weight: 500; letter-spacing: 0.2em; color: var(--pm-teal); }
.pm-sechead-name { font-family: var(--pm-font-display); font-size: clamp(22px, 3vw, 30px); font-weight: 500; color: var(--pm-text-1); margin: 0; letter-spacing: -0.01em; }
.pm-sechead-count { font-family: var(--pm-font-data); font-size: 11px; color: var(--pm-text-3); border: 1px solid var(--pm-line-2); border-radius: 999px; padding: 1px 8px; }
.pm-sechead-rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--pm-line-2), transparent); align-self: center; }

.pm-skel { padding: 26px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-lg); background: var(--pm-bg-1); margin-bottom: 18px; }
.pm-skel svg { width: 100%; height: 26px; animation: pm-skel-pulse 1.6s var(--pm-ease) infinite; }
@keyframes pm-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }

/* references */
.pm-refs { padding: 28px 32px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-lg); background: var(--pm-bg-1); margin-bottom: 18px; }
.pm-refs-title { font-family: var(--pm-font-display); font-size: 24px; font-weight: 500; color: var(--pm-text-1); margin: 8px 0 0; }
.pm-refs-lead { margin: 8px 0 18px; font-size: 14px; color: var(--pm-text-2); max-width: 620px; }
.pm-refs-list { list-style: none; margin: 0; padding: 0; counter-reset: none; }
.pm-refs-list li { display: flex; gap: 12px; padding: 11px 0; border-top: 1px solid var(--pm-line-1); }
.pm-refs-list li:focus-visible { outline: 2px solid var(--pm-teal); outline-offset: 2px; }
.pm-ref-n { flex: 0 0 auto; font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-amber); width: 18px; }
.pm-ref-cite { font-size: 13.5px; line-height: 1.55; color: var(--pm-text-2); }
.pm-ref-link { color: var(--pm-teal); text-decoration: none; word-break: break-all; font-family: var(--pm-font-data); font-size: 12px; }
.pm-ref-link:hover { text-decoration: underline; }
.pm-ref-back { color: var(--pm-text-3); text-decoration: none; margin-left: 6px; }
.pm-ref-back:hover { color: var(--pm-teal); }

@media (max-width: 767px) {
  .pm-hero { padding: 26px 18px 22px; }
  .pm-outline-wrap { position: static; }
  .pm-refs { padding: 22px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .pm-sechead { opacity: 1; transform: none; transition: none; }
}

/* margin note → real right gutter on wide screens (plan 2.2) */
@media (min-width: 1280px) {
  .pm-margin { float: right; clear: right; width: 210px; margin: 2px -150px 14px 26px; border-left: none; border-top: 1px solid var(--pm-line-2); padding-top: 8px; }
  .pm-margin-toggle { padding-left: 0; pointer-events: none; }
  .pm-margin-body { display: block; padding-left: 0; }
}
`);
