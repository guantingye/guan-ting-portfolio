import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { injectStyles, useI18n, SignalEdge } from './shared/blKit.jsx';
import { CHAPTERS, ABSTRACT, SHELL } from './data/blContent.js';

const COMPONENTS = {
    C01: lazy(() => import('./C01_Question.jsx')),
    C02: lazy(() => import('./C02_LabAndRole.jsx')),
    C03: lazy(() => import('./C03_Methods.jsx')),
    C04: lazy(() => import('./C04_Connectivity.jsx')),
    C05: lazy(() => import('./C05_Findings.jsx')),
    C06: lazy(() => import('./C06_TSCN.jsx')),
    C07: lazy(() => import('./C07_OHBM.jsx')),
    C08: lazy(() => import('./C08_Plates.jsx')),
    C09: lazy(() => import('./C09_Bridge.jsx')),
};

function Skeleton({ dark = false }) {
    return (
        <div className={`bl bl-skel${dark ? ' bl-skel--dark' : ''}`} role="status" aria-label="Loading section">
            <svg viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 11 H120 M150 11 H260 M290 11 H400" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="bl-sr-only">Loading…</span>
        </div>
    );
}

// Sticky table-of-contents rail: dotted track, scroll-progress fill, one stop
// per chapter (C02–C09). Desktop only; static under reduced motion.
function SectionRail({ targetRef, lang, t }) {
    const reduced = useReducedMotion();
    const [active, setActive] = useState(null);
    const stops = CHAPTERS.filter(c => c.key !== 'C01');
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 0.62', 'end 0.85'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const mid = window.innerHeight * 0.4;
                let cur = null;
                for (const c of stops) {
                    const el = document.getElementById(c.id);
                    if (el && el.getBoundingClientRect().top <= mid) cur = c.id;
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
        <div className="bl-rail" role="navigation" aria-label={t.railLabel}>
            <div className="bl-rail-track" aria-hidden="true">
                <motion.div className="bl-rail-fill" style={reduced ? undefined : { scaleY }} />
            </div>
            <div className="bl-rail-stops">
                {stops.map(c => (
                    <button
                        key={c.id}
                        className={`bl-rail-stop${active === c.id ? ' is-active' : ''}`}
                        onClick={() => go(c.id)}
                        aria-label={`${t.chapterLabel} ${c.num} · ${c.title[lang]}`}
                    >
                        <span className="bl-rail-dot" aria-hidden="true" />
                        <span className="bl-rail-name">{c.short[lang]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function BrainLearningEvidence() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const a = ABSTRACT[lang] ?? ABSTRACT.en;
    const paperRef = useRef(null);
    const paperChapters = CHAPTERS.filter(c => c.key !== 'C01');
    const C01 = COMPONENTS.C01;

    return (
        <section className="bl bl-zone" aria-label={a.title}>
            <button className="bl-skip" onClick={() => document.getElementById('bl-c02')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                {t.skipLink}
            </button>

            <div className="bl-dark">
                <div className="bl-inner">
                    <header className="bl-head">
                        <span className="bl-eyebrow bl-head-eyebrow">{a.eyebrow}</span>
                        <h2 className="bl-head-title">{a.title}</h2>
                        <p className="bl-head-lead">{a.lead}</p>
                        <div className="bl-head-meta">
                            <span className="bl-head-authors">{a.authors}</span>
                            <span className="bl-head-affil">{a.affiliation}</span>
                        </div>
                        <div className="bl-head-badges">{a.metaLine}</div>
                    </header>

                    <div className="bl-abstract">
                        <span className="bl-eyebrow">{a.abstractLabel}</span>
                        <p className="bl-abstract-body">{a.abstractBody}</p>
                        <div className="bl-keywords">
                            <span className="bl-keywords-label">{a.keywordsLabel}:</span>
                            {a.keywords.map((k, i) => <span key={i} className="bl-keyword">{k}{i < a.keywords.length - 1 ? ' ·' : ''}</span>)}
                        </div>
                    </div>

                    <Suspense fallback={<Skeleton dark />}><C01 /></Suspense>
                </div>
            </div>

            <SignalEdge />
            <div className="bl-paper" ref={paperRef}>
                <div className="bl-inner bl-paper-inner">
                    <SectionRail targetRef={paperRef} lang={lang} t={t} />
                    <div className="bl-paper-main">
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
            <SignalEdge flip />
        </section>
    );
}

// Same technique as field-journey's GRAIN (fjKit.jsx): a tiny fractal-noise
// SVG data-URI, desaturated, low-opacity — paper tooth with no image asset.
const GRAIN = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">'
    + '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>'
    + '<feColorMatrix type="saturate" values="0"/></filter>'
    + '<rect width="180" height="180" filter="url(#n)" opacity="0.05"/></svg>');

injectStyles('bl-layer-styles', `
.bl-zone { position: relative; width: 100vw; margin-left: calc(50% - 50vw); margin-top: 28px; margin-bottom: 28px; }
.bl-inner { position: relative; z-index: 1; width: min(1180px, calc(100% - 48px)); margin: 0 auto; }

.bl-skip { position: absolute; left: -9999px; top: 0; z-index: 20; font-family: var(--bl-font-data); font-size: 12px; color: #101018; background: #8C96FF; padding: 8px 14px; border-radius: var(--bl-r-sm); }
.bl-skip:focus { left: 12px; }

/* dark head: a deep-indigo "lab at night" ground — soft twin glows echoing the
   FPN/SN palette and a faint data-grid texture. The top fades in from
   transparent so the layer melts out of the dark case study above it (no
   hard edge); the bottom now settles into its own dark tone (not a fade to
   paper) — the SignalEdge below carries the actual paper transition, the
   way TornEdge does for field-journey. */
.bl-dark {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(1000px 640px at 8% 4%, rgba(102,118,255,0.30), transparent 60%),
    radial-gradient(820px 560px at 98% 8%, rgba(237,124,86,0.20), transparent 58%),
    linear-gradient(180deg, transparent 0%, #0A0B16 13%, #0D0E1D 55%, #0E0F1E 100%);
  padding: clamp(52px, 7vw, 88px) 0 clamp(32px, 4.5vw, 56px);
}
.bl-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(240,240,250,0.14) 1px, transparent 1px);
  background-size: 28px 28px;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0.55) 100%);
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0.55) 100%);
  pointer-events: none;
}
.bl-head { position: relative; max-width: 780px; }
.bl-head-eyebrow { color: #9AA3FF; }
.bl-head-title { font-family: var(--bl-font-display); font-size: clamp(30px, 4.4vw, 50px); font-weight: 500; line-height: 1.08; letter-spacing: -0.015em; color: #F2F2F7; margin: 14px 0 0; }
html.lang-zh .bl-head-title { letter-spacing: 0.02em; line-height: 1.3; }
.bl-head-lead { margin: 16px 0 0; font-size: 15.5px; line-height: 1.72; color: rgba(242,242,247,0.68); max-width: 680px; }
.bl-head-meta { display: flex; flex-direction: column; gap: 3px; margin-top: 22px; font-family: var(--bl-font-data); font-size: 11.5px; color: rgba(242,242,247,0.5); }
.bl-head-authors { color: rgba(242,242,247,0.78); }
.bl-head-badges { margin-top: 10px; font-family: var(--bl-font-data); font-size: 10.5px; letter-spacing: 0.05em; color: #9AA3FF; padding-top: 10px; border-top: 1px solid rgba(242,242,247,0.14); }

/* abstract block */
.bl-abstract { position: relative; margin-top: 30px; padding: 22px 22px 22px; background: rgba(242,242,247,0.045); border: 1px solid rgba(242,242,247,0.14); border-radius: var(--bl-r-lg); max-width: 780px; overflow: hidden; }
.bl-abstract::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--bl-fpn), var(--bl-sn)); opacity: 0.8; }
.bl-abstract-body { margin: 12px 0 0; font-size: 14.5px; line-height: 1.75; color: rgba(242,242,247,0.82); }
html.lang-zh .bl-abstract-body { line-height: 1.95; }
.bl-keywords { margin-top: 16px; padding-top: 14px; border-top: 1px dashed rgba(242,242,247,0.16); font-size: 11.5px; color: rgba(242,242,247,0.5); display: flex; flex-wrap: wrap; gap: 5px; }
.bl-keywords-label { font-family: var(--bl-font-data); letter-spacing: 0.08em; margin-right: 4px; color: rgba(242,242,247,0.6); }

/* paper zone — faint grain + hairline rule, same technique as field-journey's
   paper texture (fjKit's GRAIN), so the sheet the signal rises onto has tooth. */
.bl-paper { position: relative; background: var(--bl-paper-0, #F7F6F1); padding: clamp(8px, 2vw, 20px) 0 clamp(40px, 6vw, 64px); }
.bl-paper::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: url("${GRAIN}"), repeating-linear-gradient(0deg, rgba(27,29,36,0.012) 0 1px, transparent 1px 7px);
}
.bl-paper-inner { display: grid; grid-template-columns: 168px minmax(0, 1fr); gap: 36px; }
.bl-paper-main { min-width: 0; }

/* table-of-contents rail */
.bl-rail { position: sticky; top: 110px; align-self: start; display: flex; gap: 12px; padding-top: 10px; }
.bl-rail-track { position: relative; width: 2px; border-radius: 1px; background: var(--bl-line); flex: none; }
.bl-rail-fill { position: absolute; inset: 0; background: var(--bl-fpn); border-radius: 1px; transform-origin: top; will-change: transform; }
.bl-rail-stops { display: flex; flex-direction: column; gap: 22px; padding: 2px 0; }
.bl-rail-stop { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; color: var(--bl-ink-3); transition: color 160ms var(--bl-ease); text-align: left; }
.bl-rail-stop:hover, .bl-rail-stop.is-active { color: var(--bl-fpn-ink); }
.bl-rail-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--bl-line); transition: background 160ms var(--bl-ease), transform 160ms var(--bl-ease); }
.bl-rail-stop.is-active .bl-rail-dot { background: var(--bl-fpn); transform: scale(1.3); }
.bl-rail-name { font-family: var(--bl-font-data); font-size: 10.5px; letter-spacing: 0.03em; line-height: 1.3; max-width: 140px; }

/* skeleton */
.bl-skel { padding: 22px 20px; border: 1px dashed var(--bl-line); border-radius: var(--bl-r-lg); background: var(--bl-paper-1); color: var(--bl-accent-ink); margin-bottom: 20px; }
.bl-skel--dark { background: rgba(242,242,247,0.04); border-color: rgba(242,242,247,0.14); color: #9AA3FF; }
.bl-skel svg { width: 100%; height: 22px; animation: bl-skel-pulse 1.6s var(--bl-ease) infinite; }
@keyframes bl-skel-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.75; } }

@media (max-width: 1099px) {
  .bl-paper-inner { display: block; }
  .bl-rail { display: none; }
}
@media (max-width: 767px) {
  .bl-inner { width: calc(100% - 32px); }
}
@media (prefers-reduced-motion: reduce) {
  .bl-rail-fill { transform: none !important; }
  .bl-skel svg { animation: none; }
}
`);
