import React, { createContext, useContext } from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView, mulberry32 } from '../../evidence-lab/shared/labKit.jsx';
import { ACTS, BADGES, LENSES } from '../data/strategyPlatformContent.js';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView, mulberry32 };

// ---- lens dimming context (sibling of newsintel's fidelity filter) -------
const IspCtx = createContext({ activeLens: null });
export function IspProvider({ activeLens, children }) {
    return <IspCtx.Provider value={{ activeLens }}>{children}</IspCtx.Provider>;
}
export const useIsp = () => useContext(IspCtx);

// ---- authenticity stamp — five tiers, CONCEPT is new here -----------------
const TIER_GLYPH = {
    real:          <><circle cx="7" cy="7" r="5.6" /><path d="M4.6 7.2l1.7 1.7 3.1-3.4" /></>,
    reconstructed: <><circle cx="7" cy="7" r="5.6" /><path d="M7 3.9v3.3l2.2 2.2" /></>,
    simulated:     <><path d="M1.6 7h2.2l1.4-3 2.6 6 1.4-3h2.2" /></>,
    illustrative:  <><path d="M7 1.6l5.4 3.1v4.6L7 12.4 1.6 9.3V4.7z" /></>,
    concept:       <><path d="M7 2v2.4M7 9.6V12M2 7h2.4M9.6 7H12" /><circle cx="7" cy="7" r="2.4" /></>,
};
export function AuthBadge({ tier }) {
    const { lang } = useI18n();
    const b = BADGES[tier];
    return (
        <span className={`isp-stamp isp-stamp--${tier}`} title={b[lang] ?? b.en}>
            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor"
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {TIER_GLYPH[tier]}
            </svg>
            <span>{b.term}</span>
            <span className="isp-sr-only"> — {b[lang] ?? b.en}</span>
        </span>
    );
}

// ---- lens chip (passive label inside a module header) --------------------
export function LensChip({ lens }) {
    const { lang } = useI18n();
    const l = LENSES.find(x => x.id === lens);
    if (!l) return null;
    return <span className="isp-lenschip" style={{ '--isp-lc': l.tone }}>{l.name[lang]}</span>;
}

// ---- module frame (dispatch header + so-what strip) -----------------------
export default function ModuleFrame({ mod, title, lead, soWhat, children }) {
    const { lang } = useI18n();
    const { activeLens } = useIsp();
    const act = ACTS.find(a => a.id === mod.act);
    const muted = activeLens && !mod.lens.includes(activeLens);
    return (
        <section
            className={`isp isp-module${muted ? ' is-muted' : ''}`}
            id={mod.id}
            data-lens={mod.lens.join(' ')}
            aria-labelledby={`${mod.id}-t`}>
            <div className="isp-dispatch">
                <span className="isp-dispatch-line">
                    ACT {act.num} / {act.name[lang].toUpperCase()}
                    <span className="isp-dispatch-sep">·</span>
                    MODULE {mod.num}
                </span>
                <AuthBadge tier={mod.badge} />
            </div>
            <header className="isp-mod-head">
                <h3 className="isp-display" id={`${mod.id}-t`}>{title}</h3>
                <p className="isp-mod-lead">{lead}</p>
                <div className="isp-mod-fidrow">
                    <span className="isp-lenstags" aria-label="Lens">
                        {mod.lens.map(l => <LensChip key={l} lens={l} />)}
                    </span>
                </div>
            </header>
            <hr className="isp-rule" />
            <div className="isp-mod-body">{children}</div>
            {soWhat && (
                <div className="isp-sowhat">
                    <span className="isp-sowhat-label">READ →</span>
                    <p className="isp-sowhat-text">{soWhat}</p>
                </div>
            )}
        </section>
    );
}

// ---- reveal wrapper --------------------------------------------------------
export function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
    return (
        <div ref={ref} className={`isp-reveal${inView ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

// ---- act divider ------------------------------------------------------------
export function ActDivider({ act, count }) {
    const { lang } = useI18n();
    const [ref, inView] = useInView({ rootMargin: '0px 0px -25% 0px' });
    return (
        <div ref={ref} className={`isp isp-actbreak${inView ? ' in' : ''}`}>
            <div className="isp-actbreak-rule" aria-hidden="true">
                {Array.from({ length: 28 }, (_, i) => (
                    <span key={i} className="isp-tick" style={{ opacity: 0.25 + (i % 4) * 0.18 }} />
                ))}
            </div>
            <div className="isp-actbreak-row">
                <span className="isp-actbreak-num">ACT {act.num}</span>
                <div className="isp-actbreak-headings">
                    <h2 className="isp-actbreak-name">{act.name[lang]}</h2>
                    <span className="isp-actbreak-tag">{act.tag[lang]}</span>
                </div>
                <span className="isp-actbreak-count">{String(count).padStart(2, '0')} {lang === 'zh' ? '件' : 'items'}</span>
            </div>
        </div>
    );
}

// ---- wire-feed ticker -------------------------------------------------------
export function WireTicker({ items }) {
    const reduced = usePrefersReducedMotion();
    const row = items.map((it, i) => (
        <span className="isp-tickitem" key={i}>
            <span className="isp-tickitem-time">{it.time}</span>
            <span className="isp-tickitem-dot" aria-hidden="true" />
            <span className="isp-tickitem-text">{it.text}</span>
        </span>
    ));
    return (
        <div className="isp isp-wire" role="img" aria-label="Product day cycle">
            <span className="isp-wire-label">CYCLE</span>
            <div className={`isp-wire-track${reduced ? ' is-static' : ''}`}>
                <div className="isp-wire-run">{row}</div>
                {!reduced && <div className="isp-wire-run" aria-hidden="true">{row}</div>}
            </div>
        </div>
    );
}

// small primitives -----------------------------------------------------------
export function Stamp({ children, tone = 'neutral' }) {
    return <span className={`isp-tag isp-tag--${tone}`}>{children}</span>;
}
export function onActivate(fn) {
    return e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); } };
}

injectStyles('isp-shared', `
.isp {
  --isp-bg-0: #060911;
  --isp-bg-1: #0B0F19;
  --isp-bg-2: #131829;
  --isp-bg-3: #1B2136;
  --isp-line-1: #262D42;
  --isp-line-2: #333C57;
  --isp-text-1: #F1F2F6;
  --isp-text-2: #A9AFC2;
  --isp-text-3: #6C7690;
  --isp-teal: #35C2B0;
  --isp-teal-dim: rgba(53,194,176,0.12);
  --isp-amber: #E8A33D;
  --isp-amber-dim: rgba(232,163,61,0.12);
  --isp-red: #E5675A;
  --isp-red-dim: rgba(229,103,90,0.12);
  --isp-sky: #57A6E8;
  --isp-sky-dim: rgba(87,166,232,0.12);
  --isp-iris: #9B95E6;
  --isp-iris-dim: rgba(155,149,230,0.12);
  --isp-slate: #94A0B0;
  --isp-slate-dim: rgba(148,160,176,0.10);
  --isp-font-display: 'Newsreader', 'Noto Serif TC', serif;
  --isp-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --isp-font-data: 'JetBrains Mono', monospace;
  --isp-r-sm: 5px;
  --isp-r-md: 9px;
  --isp-r-lg: 14px;
  --isp-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--isp-font-body);
  color: var(--isp-text-2);
  line-height: 1.62;
  font-size: 16px;
}
.isp *, .isp *::before, .isp *::after { box-sizing: border-box; }
:where(.isp button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.isp :is(button, a, input, select, [tabindex="0"], [role="slider"], [role="option"], [role="tab"]):focus-visible {
  outline: 2px solid var(--isp-teal); outline-offset: 2px; border-radius: 3px;
}
.isp-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.isp-mono { font-family: var(--isp-font-data); }
.isp-eyebrow { font-family: var(--isp-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; color: var(--isp-text-3); }
.isp-display { font-family: var(--isp-font-display); font-size: clamp(24px, 2.7vw, 33px); font-weight: 500; line-height: 1.16; letter-spacing: -0.008em; color: var(--isp-text-1); margin: 0; }
.isp-data-sm { font-family: var(--isp-font-data); font-size: 12px; letter-spacing: 0.03em; line-height: 1.5; }

/* ---- module frame ---- */
.isp-module {
  position: relative;
  background: var(--isp-bg-1);
  border: 1px solid var(--isp-line-1);
  border-top: 2px solid var(--isp-line-2);
  border-radius: 0 0 var(--isp-r-lg) var(--isp-r-lg);
  padding: 22px 30px 26px;
  margin: 0 0 18px;
  transition: opacity 260ms var(--isp-ease), filter 260ms var(--isp-ease);
}
.isp-module.is-muted { opacity: 0.32; filter: saturate(0.5); }
.isp-dispatch {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 14px; margin-bottom: 16px;
  border-bottom: 1px dashed var(--isp-line-1);
}
.isp-dispatch-line { font-family: var(--isp-font-data); font-size: 10.5px; letter-spacing: 0.14em; color: var(--isp-text-3); display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.isp-dispatch-sep { color: var(--isp-line-2); }
.isp-mod-head { }
.isp-mod-lead { margin: 10px 0 0; color: var(--isp-text-2); font-size: 15px; max-width: 680px; }
.isp-mod-fidrow { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
.isp-lenstags { display: inline-flex; gap: 6px; flex-wrap: wrap; }
.isp-mod-body { margin-top: 4px; }
.isp-rule { border: none; border-top: 1px solid var(--isp-line-1); margin: 18px 0; }

/* lens chip */
.isp-lenschip { font-family: var(--isp-font-data); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--isp-lc, var(--isp-teal)); border: 1px solid var(--isp-lc, var(--isp-teal)); border-radius: 3px; padding: 2px 7px; background: color-mix(in srgb, var(--isp-lc, var(--isp-teal)) 12%, transparent); }

/* classification stamp */
.isp-stamp { display: inline-flex; align-items: center; gap: 5px; font-family: var(--isp-font-data); font-size: 10px; font-weight: 500; letter-spacing: 0.12em; padding: 3px 8px; border-radius: 3px; border: 1px solid currentColor; white-space: nowrap; cursor: help; }
.isp-stamp--real { color: var(--isp-teal); background: var(--isp-teal-dim); }
.isp-stamp--reconstructed { color: var(--isp-amber); background: var(--isp-amber-dim); }
.isp-stamp--simulated { color: var(--isp-sky); background: var(--isp-sky-dim); }
.isp-stamp--illustrative { color: var(--isp-slate); background: var(--isp-slate-dim); }
.isp-stamp--concept { color: var(--isp-iris); background: var(--isp-iris-dim); }

/* so-what strip */
.isp-sowhat { display: flex; align-items: baseline; gap: 12px; margin-top: 22px; padding: 12px 16px; background: var(--isp-bg-2); border-left: 2px solid var(--isp-teal); border-radius: 0 var(--isp-r-sm) var(--isp-r-sm) 0; }
.isp-sowhat-label { flex: 0 0 auto; font-family: var(--isp-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: var(--isp-teal); }
.isp-sowhat-text { margin: 0; font-family: var(--isp-font-display); font-size: 16px; font-style: italic; line-height: 1.5; color: var(--isp-text-1); }

/* ---- shared primitives ---- */
.isp-panel { background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--isp-font-body); font-size: 13px; font-weight: 600; color: var(--isp-text-1); background: var(--isp-bg-3); border: 1px solid var(--isp-line-2); border-radius: var(--isp-r-sm); padding: 8px 14px; transition: border-color 160ms var(--isp-ease), background 160ms var(--isp-ease), transform 110ms var(--isp-ease); }
.isp-btn:hover { border-color: var(--isp-teal); }
.isp-btn:active { transform: translateY(1px); }
.isp-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
.isp-btn.is-on { color: var(--isp-bg-0); background: var(--isp-teal); border-color: transparent; }
.isp-tag { display: inline-flex; align-items: center; gap: 5px; font-family: var(--isp-font-data); font-size: 10.5px; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--isp-line-2); color: var(--isp-text-3); }
.isp-tag--teal { color: var(--isp-teal); border-color: var(--isp-teal); background: var(--isp-teal-dim); }
.isp-tag--amber { color: var(--isp-amber); border-color: var(--isp-amber); background: var(--isp-amber-dim); }
.isp-tag--red { color: var(--isp-red); border-color: var(--isp-red); background: var(--isp-red-dim); }
.isp-tag--iris { color: var(--isp-iris); border-color: var(--isp-iris); background: var(--isp-iris-dim); }
.isp-caption { font-family: var(--isp-font-data); font-size: 11px; letter-spacing: 0.05em; color: var(--isp-text-3); }
.isp-kbd { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); border: 1px solid var(--isp-line-2); border-radius: 4px; padding: 1px 5px; }

/* reveal */
.isp-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s var(--isp-ease), transform 0.6s var(--isp-ease); }
.isp-reveal.in { opacity: 1; transform: none; }

/* ---- act divider ---- */
.isp-actbreak { margin: 40px 0 20px; opacity: 0; transform: translateY(14px); transition: opacity 0.6s var(--isp-ease), transform 0.6s var(--isp-ease); }
.isp-actbreak.in { opacity: 1; transform: none; }
.isp-actbreak-rule { display: flex; gap: 3px; align-items: flex-end; height: 12px; margin-bottom: 16px; }
.isp-tick { flex: 1; height: 100%; border-left: 1px solid var(--isp-teal); }
.isp-actbreak-row { display: flex; align-items: baseline; gap: 20px; }
.isp-actbreak-num { font-family: var(--isp-font-data); font-size: 13px; font-weight: 500; letter-spacing: 0.24em; color: var(--isp-teal); white-space: nowrap; }
.isp-actbreak-headings { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; }
.isp-actbreak-name { font-family: var(--isp-font-display); font-size: clamp(26px, 3.4vw, 40px); font-weight: 500; color: var(--isp-text-1); margin: 0; letter-spacing: -0.01em; }
.isp-actbreak-tag { font-size: 13px; color: var(--isp-text-3); }
.isp-actbreak-count { font-family: var(--isp-font-data); font-size: 11px; color: var(--isp-text-3); border: 1px solid var(--isp-line-2); border-radius: 999px; padding: 2px 10px; white-space: nowrap; }

/* ---- wire ticker ---- */
.isp-wire { display: flex; align-items: stretch; border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-sm); background: var(--isp-bg-2); overflow: hidden; }
.isp-wire-label { flex: 0 0 auto; display: flex; align-items: center; font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.2em; color: var(--isp-bg-0); background: var(--isp-teal); padding: 0 12px; }
.isp-wire-track { position: relative; flex: 1; min-width: 0; display: flex; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); }
.isp-wire-run { display: inline-flex; align-items: center; flex: 0 0 auto; padding: 8px 0; animation: isp-wire-scroll 42s linear infinite; }
.isp-wire-track.is-static { mask-image: none; overflow-x: auto; }
.isp-wire-track.is-static .isp-wire-run { animation: none; }
.isp-tickitem { display: inline-flex; align-items: center; gap: 8px; padding: 0 22px; white-space: nowrap; }
.isp-tickitem-time { font-family: var(--isp-font-data); font-size: 11px; color: var(--isp-teal); }
.isp-tickitem-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--isp-line-2); }
.isp-tickitem-text { font-size: 13px; color: var(--isp-text-2); }
@keyframes isp-wire-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }

@media (max-width: 767px) {
  .isp-module { padding: 18px 16px 22px; }
  .isp-actbreak-row { flex-direction: column; gap: 8px; }
  .isp-actbreak-count { align-self: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .isp *, .isp *::before, .isp *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
  .isp-reveal, .isp-actbreak { opacity: 1; transform: none; transition: none; }
  .isp-wire-run { animation: none; }
}
`);
