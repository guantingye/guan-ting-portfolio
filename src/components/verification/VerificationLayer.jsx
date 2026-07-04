import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import {
    injectStyles, useI18n, usePrefersReducedMotion, useInView, Reveal, PhaseGlyph, VfProvider, onActivate,
} from './shared/vfKit.jsx';
import {
    SHELL, ROLES, ROLE_MAP, PHASES, PHASE_MAP, BADGES, MODULE_LIST,
} from './data/verificationContent.js';

const MODULE_COMPONENTS = {
    D1: lazy(() => import('./modules/D1ResearchOpsPanel.jsx')),
    D2: lazy(() => import('./modules/D2CompetitiveTeardown.jsx')),
    D3: lazy(() => import('./modules/D3DataLandscapeAudit.jsx')),
    E1: lazy(() => import('./modules/E1IAObjectModel.jsx')),
    E2: lazy(() => import('./modules/E2KilledConcepts.jsx')),
    L1: lazy(() => import('./modules/L1WireflowGallery.jsx')),
    H2: lazy(() => import('./modules/H2MicroInteractionLab.jsx')),
    H3: lazy(() => import('./modules/H3ConfidenceTopography.jsx')),
    B1: lazy(() => import('./modules/B1PipelineArchitecture.jsx')),
    B2: lazy(() => import('./modules/B2EntityResolutionDemo.jsx')),
    B3: lazy(() => import('./modules/B3QualityMetricsBoard.jsx')),
    M1: lazy(() => import('./modules/M1UsabilityEvidence.jsx')),
    F1: lazy(() => import('./modules/F1ShipLog.jsx')),
    F2: lazy(() => import('./modules/F2Retrospective.jsx')),
};

// Order the phases the way they appear in the stack, keeping only phases used.
const PHASE_ORDER = PHASES.filter(p => MODULE_LIST.some(m => m.phase === p.id));

function Skeleton({ accent }) {
    return (
        <div className="vf-skel" style={{ '--vf-accent': accent }} role="status" aria-label="Loading module">
            <svg viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 17 H80 l7 -11 l7 22 l7 -16 l6 5 H180 l7 -9 l7 9 H400"
                    fill="none" stroke="var(--vf-accent)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="vf-sr-only">Loading…</span>
        </div>
    );
}

function RoleFilter({ lang, t, activeRole, setActiveRole }) {
    return (
        <div className="vf-rolefilter" role="group" aria-label={t.roleFilterLabel}>
            <span className="vf-eyebrow vf-rolefilter-label">{t.roleFilterLabel}</span>
            <div className="vf-rolefilter-chips">
                {ROLES.map(r => {
                    const on = activeRole === r.id;
                    return (
                        <button
                            key={r.id}
                            className={`vf-role-btn${on ? ' is-on' : ''}`}
                            aria-pressed={on}
                            onClick={() => setActiveRole(on ? null : r.id)}>
                            <span className="vf-role-abbr">{r.abbr}</span>
                            <span className="vf-role-name">{r.name[lang]}</span>
                        </button>
                    );
                })}
                <button
                    className="vf-role-clear"
                    onClick={() => setActiveRole(null)}
                    disabled={!activeRole}>
                    {t.clearLabel}
                </button>
            </div>
        </div>
    );
}

function PhaseNav({ lang, t, activePhase, reduced }) {
    const goTo = phaseId => {
        const first = MODULE_LIST.find(m => m.phase === phaseId);
        if (first) document.getElementById(first.id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    };
    return (
        <nav className="vf-phasenav" aria-label={t.navLabel}>
            <ol>
                {PHASE_ORDER.map(p => {
                    const on = activePhase === p.id;
                    return (
                        <li key={p.id}>
                            <button
                                className={`vf-phasenav-item${on ? ' is-on' : ''}`}
                                style={{ '--vf-accent': p.accent }}
                                aria-current={on ? 'true' : undefined}
                                onClick={() => goTo(p.id)}
                                onKeyDown={onActivate(() => goTo(p.id))}>
                                <span className="vf-phasenav-dot" aria-hidden="true" />
                                <span className="vf-phasenav-id">{p.id}</span>
                                <span className="vf-phasenav-name">{p.name[lang]}</span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

function PhaseDivider({ phase, lang, count, label }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -30% 0px' });
    return (
        <div ref={ref} className={`vf-phasehead${inView ? ' in' : ''}`} style={{ '--vf-accent': phase.accent }}>
            <div className="vf-phasehead-row">
                <span className="vf-phasehead-id">{phase.id}</span>
                <span className="vf-phasehead-name">{phase.name[lang]}</span>
                <span className="vf-phasehead-count">{count}</span>
            </div>
            <div className="vf-phasehead-glyph"><PhaseGlyph accent={phase.accent} seed={phase.id.length * 13 + 5} /></div>
        </div>
    );
}

export default function VerificationLayer() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const badges = BADGES[lang] ?? BADGES.en;
    const reduced = usePrefersReducedMotion();
    const [activeRole, setActiveRole] = useState(null);
    const [activePhase, setActivePhase] = useState(PHASE_ORDER[0].id);

    const grouped = useMemo(
        () => PHASE_ORDER.map(p => ({ phase: p, modules: MODULE_LIST.filter(m => m.phase === p.id) })),
        [],
    );

    // Scroll-spy: mark the phase whose module sits nearest the top of the viewport.
    useEffect(() => {
        const idToPhase = Object.fromEntries(MODULE_LIST.map(m => [m.id, m.phase]));
        const sections = MODULE_LIST.map(m => document.getElementById(m.id)).filter(Boolean);
        if (!sections.length || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(entries => {
            const visible = entries.filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (visible[0]) setActivePhase(idToPhase[visible[0].target.id]);
        }, { rootMargin: '-16% 0px -74% 0px' });
        sections.forEach(s => io.observe(s));
        return () => io.disconnect();
    });

    return (
        <section className="vf vf-layer proj-section" aria-label={t.eyebrow}>
            <header className="vf-hero reveal">
                <span className="vf-eyebrow vf-hero-eyebrow">{t.eyebrow}</span>
                <h2 className="vf-hero-title">{t.title}</h2>
                <p className="vf-hero-lead">{t.lead}</p>
                <div className="vf-hero-meta">
                    {t.meta.map(m => <span className="vf-caption vf-hero-metaitem" key={m}>{m}</span>)}
                </div>
                <RoleFilter lang={lang} t={t} activeRole={activeRole} setActiveRole={setActiveRole} />
            </header>

            <PhaseNav lang={lang} t={t} activePhase={activePhase} reduced={reduced} />

            <VfProvider activeRole={activeRole} roleMap={ROLE_MAP} badges={badges}
                labels={{ footerLabel: t.footerLabel, mutedLabel: t.mutedLabel, disclaimerLabel: t.disclaimerLabel }}>
                <div className="vf-stack">
                    {grouped.map(({ phase, modules }) => (
                        <div className="vf-phasegroup" key={phase.id} data-phase={phase.id}>
                            <PhaseDivider phase={phase} lang={lang} count={modules.length} />
                            {modules.map(m => {
                                const Comp = MODULE_COMPONENTS[m.key];
                                return (
                                    <Reveal key={m.id}>
                                        <Suspense fallback={<Skeleton accent={phase.accent} />}>
                                            <Comp />
                                        </Suspense>
                                    </Reveal>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </VfProvider>
        </section>
    );
}

injectStyles('vf-layer', `
.vf-layer { --vf-accent: var(--vf-teal); }
.vf-hero { position: relative; padding: 40px 36px 30px; border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.055), transparent 55%), var(--vf-bg-1); overflow: hidden; margin-bottom: 22px; }
.vf-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.016) 0 1px, transparent 1px 5px); opacity: 0.6; }
.vf-hero-eyebrow { color: var(--vf-teal); position: relative; }
.vf-hero-title { font-family: var(--vf-font-display); font-size: clamp(30px, 4.4vw, 50px); font-weight: 500; line-height: 1.04; color: var(--vf-text-1); margin: 14px 0 0; letter-spacing: -0.015em; }
.vf-hero-lead { max-width: 640px; margin: 16px 0 0; font-size: 16px; line-height: 1.62; color: var(--vf-text-2); position: relative; }
.vf-hero-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 20px; }
.vf-hero-metaitem::before { content: ''; display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: var(--vf-teal); box-shadow: 0 0 6px var(--vf-teal); margin-right: 6px; vertical-align: middle; }

.vf-rolefilter { margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--vf-line-1); position: relative; }
.vf-rolefilter-label { display: block; color: var(--vf-text-3); margin-bottom: 12px; }
.vf-rolefilter-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.vf-role-btn { display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border: 1px solid var(--vf-line-2); border-radius: 999px; background: var(--vf-bg-2); transition: border-color 180ms var(--vf-ease), background 180ms var(--vf-ease), color 180ms var(--vf-ease); }
.vf-role-btn:hover { border-color: var(--vf-teal); }
.vf-role-btn.is-on { border-color: var(--vf-teal); background: var(--vf-teal-dim); }
.vf-role-abbr { font-family: var(--vf-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.06em; color: var(--vf-teal); }
.vf-role-name { font-size: 12.5px; color: var(--vf-text-2); }
.vf-role-btn.is-on .vf-role-name { color: var(--vf-text-1); }
.vf-role-clear { font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.06em; color: var(--vf-text-3); padding: 7px 12px; border-radius: 999px; border: 1px solid transparent; }
.vf-role-clear:hover:not([disabled]) { color: var(--vf-text-1); }
.vf-role-clear[disabled] { opacity: 0.35; cursor: default; }

/* sticky phase nav */
.vf-phasenav { position: sticky; top: 64px; z-index: 6; margin: 0 0 18px; background: linear-gradient(180deg, var(--vf-bg-0) 62%, transparent); padding: 8px 0; }
.vf-phasenav ol { list-style: none; display: flex; gap: 6px; margin: 0; padding: 4px; overflow-x: auto; scrollbar-width: thin; -webkit-overflow-scrolling: touch; border: 1px solid var(--vf-line-1); border-radius: 999px; background: var(--vf-bg-1); }
.vf-phasenav-item { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 999px; white-space: nowrap; color: var(--vf-text-3); transition: color 180ms var(--vf-ease), background 180ms var(--vf-ease); }
.vf-phasenav-item:hover { color: var(--vf-text-1); }
.vf-phasenav-item.is-on { color: var(--vf-text-1); background: var(--vf-bg-3); }
.vf-phasenav-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--vf-line-2); transition: background 180ms var(--vf-ease), box-shadow 180ms var(--vf-ease); }
.vf-phasenav-item.is-on .vf-phasenav-dot { background: var(--vf-accent); box-shadow: 0 0 8px var(--vf-accent); }
.vf-phasenav-id { font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.08em; }
.vf-phasenav-name { font-size: 12.5px; }
@media (max-width: 640px) { .vf-phasenav-name { display: none; } }

/* phase divider */
.vf-phasegroup { margin-bottom: 6px; }
.vf-phasehead { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin: 30px 0 16px; opacity: 0; transform: translateY(14px); transition: opacity 0.6s var(--vf-ease), transform 0.6s var(--vf-ease); }
.vf-phasehead.in { opacity: 1; transform: none; }
.vf-phasehead-row { display: flex; align-items: baseline; gap: 12px; }
.vf-phasehead-id { font-family: var(--vf-font-data); font-size: 13px; font-weight: 500; letter-spacing: 0.22em; color: var(--vf-accent); }
.vf-phasehead-name { font-family: var(--vf-font-display); font-size: 20px; color: var(--vf-text-1); }
.vf-phasehead-count { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); border-radius: 999px; padding: 1px 8px; }
.vf-phasehead-glyph { flex: 0 0 auto; opacity: 0.8; }
@media (max-width: 640px) { .vf-phasehead-glyph { display: none; } }

.vf-skel { padding: 34px 28px; border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-lg); background: var(--vf-bg-1); margin-bottom: 20px; }
.vf-skel svg { width: 100%; height: 34px; animation: vf-skel-pulse 1.6s var(--vf-ease) infinite; }
@keyframes vf-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.75; } }

@media (max-width: 720px) {
  .vf-hero { padding: 26px 18px 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .vf-phasehead { opacity: 1; transform: none; transition: none; }
}
`);
