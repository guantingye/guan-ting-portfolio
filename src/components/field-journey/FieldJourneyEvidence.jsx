import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { injectStyles, useI18n, TornEdge, accentVars } from './shared/fjKit.jsx';
import { CHAPTERS, STATIONS, SHELL } from './data/fjContent.js';

const COMPONENTS = {
    C01: lazy(() => import('./C01_Threshold.jsx')),
    C02: lazy(() => import('./C02_StationMap.jsx')),
    C03: lazy(() => import('./C03_StationOne.jsx')),
    C04: lazy(() => import('./C04_StationTwo.jsx')),
    C05: lazy(() => import('./C05_StationThree.jsx')),
    C06: lazy(() => import('./C06_FieldAlbum.jsx')),
    C07: lazy(() => import('./C07_SkillsBridge.jsx')),
};

function Skeleton({ dark = false }) {
    return (
        <div className={`fj fj-skel${dark ? ' fj-skel--dark' : ''}`} role="status" aria-label="Loading chapter">
            <svg viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 13 H90 l8 -8 l8 14 l8 -10 l6 4 H210 l8 -6 l8 6 H400"
                    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="fj-sr-only">Loading…</span>
        </div>
    );
}

// Sticky journey rail: dotted track, scroll-progress fill, three station stops
// that scroll-spy the station chapters. Desktop only; static under reduced motion.
function JourneyRail({ targetRef, lang, t }) {
    const reduced = useReducedMotion();
    const [active, setActive] = useState(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 0.65', 'end 0.85'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const mid = window.innerHeight * 0.42;
                let cur = null;
                for (const s of STATIONS) {
                    const el = document.getElementById(s.chapterId);
                    if (el && el.getBoundingClientRect().top <= mid) cur = s.id;
                }
                setActive(cur);
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
    }, []);

    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // div + role, not <nav>: the global stylesheet styles the bare nav element
    // (fixed dark site bar) and would repaint the rail with it.
    return (
        <div className="fj-rail" role="navigation" aria-label={t.railLabel}>
            <div className="fj-rail-track" aria-hidden="true">
                <motion.div className="fj-rail-fill" style={reduced ? undefined : { scaleY }} />
            </div>
            <div className="fj-rail-stops">
                {STATIONS.map((s, i) => (
                    <button
                        key={s.id}
                        className={`fj-rail-stop${active === s.id ? ' is-active' : ''}`}
                        style={accentVars(s)}
                        onClick={() => go(s.chapterId)}
                        aria-label={`${t.stationWord} ${i + 1} · ${s.name[lang]}`}
                    >
                        <span className="fj-rail-dot" aria-hidden="true" />
                        <span className="fj-rail-name">{s.short[lang]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function FieldJourneyEvidence() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const paperRef = useRef(null);
    const paperChapters = CHAPTERS.filter(c => c.key !== 'C01');
    const C01 = COMPONENTS.C01;

    return (
        <section className="fj fj-zone" aria-label={t.title}>
            <button className="fj-skip" onClick={() => document.getElementById('fj-c02')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                {t.skipLink}
            </button>

            <div className="fj-dark">
                <div className="fj-inner">
                    <header className="fj-head">
                        <span className="fj-eyebrow fj-head-eyebrow">{t.eyebrow}</span>
                        <h2 className="fj-head-title">{t.title}</h2>
                        <p className="fj-head-lead">{t.lead}</p>
                    </header>
                    <Suspense fallback={<Skeleton dark />}><C01 /></Suspense>
                </div>
            </div>

            <TornEdge />
            <div className="fj-paper" ref={paperRef}>
                <div className="fj-inner fj-paper-inner">
                    <JourneyRail targetRef={paperRef} lang={lang} t={t} />
                    <div className="fj-paper-main">
                        {paperChapters.map(c => {
                            const Comp = COMPONENTS[c.key];
                            return (
                                <Suspense key={c.id} fallback={<Skeleton />}>
                                    <Comp />
                                </Suspense>
                            );
                        })}
                    </div>
                </div>
            </div>
            <TornEdge flip />
        </section>
    );
}

injectStyles('fj-layer-styles', `
.fj-zone { position: relative; width: 100vw; margin-left: calc(50% - 50vw); margin-top: 28px; margin-bottom: 28px; }
.fj-inner { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }

.fj-skip { position: absolute; left: -9999px; top: 0; z-index: 20; font-family: var(--fj-font-data); font-size: 12px; color: #141122; background: #E0956A; padding: 8px 14px; border-radius: var(--fj-r-sm); }
.fj-skip:focus { left: 12px; }

/* dark head: stages the luminance jump before the torn edge */
.fj-dark { background: linear-gradient(180deg, rgba(20,17,34,0) 0%, rgba(20,17,34,0.55) 42%, #141122 100%); padding: clamp(44px, 6vw, 76px) 0 clamp(30px, 4vw, 52px); }
.fj-head { max-width: 760px; }
.fj-head-eyebrow { color: #E0956A; }
.fj-head-title { font-family: var(--fj-font-display); font-size: clamp(30px, 4.6vw, 52px); font-weight: 500; line-height: 1.08; letter-spacing: -0.015em; color: #F0EFF9; margin: 14px 0 0; }
html.lang-zh .fj-head-title { letter-spacing: 0.02em; line-height: 1.3; }
.fj-head-lead { margin: 16px 0 0; font-size: 16px; line-height: 1.7; color: rgba(240,239,249,0.66); }

/* paper zone */
.fj-paper { padding: clamp(40px, 6vw, 72px) 0 clamp(40px, 6vw, 64px); }
.fj-paper-inner { display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 30px; }
.fj-paper-main { min-width: 0; }

/* journey rail */
.fj-rail { position: sticky; top: 110px; align-self: start; display: flex; gap: 12px; padding-top: 6px; }
.fj-rail-track { position: relative; width: 3px; border-radius: 2px; background: repeating-linear-gradient(180deg, var(--fj-line) 0 5px, transparent 5px 11px); }
.fj-rail-fill { position: absolute; inset: 0; background: #6E5426; border-radius: 2px; transform-origin: top; will-change: transform; }
.fj-rail-stops { display: flex; flex-direction: column; justify-content: space-between; gap: 40px; padding: 4px 0; }
.fj-rail-stop { display: flex; flex-direction: column; align-items: flex-start; gap: 5px; color: var(--fj-ink-3); transition: color 180ms var(--fj-ease); }
.fj-rail-stop:hover, .fj-rail-stop.is-active { color: var(--fj-accent-ink); }
.fj-rail-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid currentColor; background: var(--fj-paper-0); transition: background 180ms var(--fj-ease); }
.fj-rail-stop.is-active .fj-rail-dot { background: var(--fj-accent); border-color: var(--fj-accent-ink); }
.fj-rail-name { font-family: var(--fj-font-data); font-size: 10px; letter-spacing: 0.08em; writing-mode: initial; white-space: nowrap; }

/* skeleton */
.fj-skel { padding: 26px 22px; border: 1px dashed var(--fj-line); border-radius: var(--fj-r-lg); background: var(--fj-paper-1); color: var(--fj-accent-ink); margin-bottom: 22px; }
.fj-skel--dark { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.12); color: #E0956A; }
.fj-skel svg { width: 100%; height: 26px; animation: fj-skel-pulse 1.6s var(--fj-ease) infinite; }
@keyframes fj-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.75; } }

@media (max-width: 1199px) {
  .fj-paper-inner { display: block; }
  .fj-rail { display: none; }
}
@media (max-width: 767px) {
  .fj-inner { width: calc(100% - 32px); }
}
@media (prefers-reduced-motion: reduce) {
  .fj-rail-fill { transform: none !important; }
  .fj-skel svg { animation: none; }
}
`);
