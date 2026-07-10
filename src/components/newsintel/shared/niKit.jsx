import React, { createContext, useContext } from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView, mulberry32 } from '../../evidence-lab/shared/labKit.jsx';
import { ACTS, BADGES, ROLE_MAP } from '../data/newsIntelContent.js';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView, mulberry32 };

// ---- fidelity dimming context (F1 filter; unlike the sibling ROLE filter) --
const NiCtx = createContext({ activeFidelity: null });
export function NiProvider({ activeFidelity, children }) {
    return <NiCtx.Provider value={{ activeFidelity }}>{children}</NiCtx.Provider>;
}
export const useNi = () => useContext(NiCtx);

// ---- classification stamp (authenticity badge, plan 3.2) -----------------
// Distinct glyph per tier so the distinction survives grayscale.
const TIER_GLYPH = {
    real:          <><circle cx="7" cy="7" r="5.6" /><path d="M4.6 7.2l1.7 1.7 3.1-3.4" /></>,
    reconstructed: <><circle cx="7" cy="7" r="5.6" /><path d="M7 3.9v3.3l2.2 2.2" /></>,
    simulated:     <><path d="M1.6 7h2.2l1.4-3 2.6 6 1.4-3h2.2" /></>,
    illustrative:  <><path d="M7 1.6l5.4 3.1v4.6L7 12.4 1.6 9.3V4.7z" /></>,
};
export function AuthBadge({ tier }) {
    const { lang } = useI18n();
    const b = BADGES[tier];
    return (
        <span className={`ni-stamp ni-stamp--${tier}`} title={b[lang] ?? b.en}>
            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor"
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {TIER_GLYPH[tier]}
            </svg>
            <span>{b.term}</span>
            <span className="ni-sr-only"> — {b[lang] ?? b.en}</span>
        </span>
    );
}

// ---- role chips (passive labels only, plan 4.2 / F2) ---------------------
export function RoleChips({ roles }) {
    const { lang } = useI18n();
    return (
        <span className="ni-rolechips" aria-label="Relevant roles">
            {roles.map(id => (
                <span key={id} className="ni-rolechip" title={`Evidence relevant to ${ROLE_MAP[id].en} roles`}>{id}</span>
            ))}
        </span>
    );
}

// ---- module frame (dispatch header + so-what strip) ----------------------
export default function ModuleFrame({ mod, title, lead, soWhat, children }) {
    const { lang } = useI18n();
    const { activeFidelity } = useNi();
    const act = ACTS.find(a => a.id === mod.act);
    const muted = activeFidelity && !mod.fidelity.includes(activeFidelity);
    const dispatchId = `ING-${mod.num}·2026`;
    return (
        <section
            className={`ni ni-module${muted ? ' is-muted' : ''}`}
            id={mod.id}
            data-fidelity={mod.fidelity.join(' ')}
            aria-labelledby={`${mod.id}-t`}>
            <div className="ni-dispatch">
                <span className="ni-dispatch-line">
                    ACT {act.num} / {act.name[lang].toUpperCase()}
                    <span className="ni-dispatch-sep">·</span>
                    MODULE {mod.num}
                    <span className="ni-dispatch-sep">·</span>
                    <span className="ni-dispatch-id">{dispatchId}</span>
                </span>
                <AuthBadge tier={mod.badge} />
            </div>
            <header className="ni-mod-head">
                <h3 className="ni-display" id={`${mod.id}-t`}>{title}</h3>
                <p className="ni-mod-lead">{lead}</p>
                <div className="ni-mod-fidrow">
                    <span className="ni-fidtags" aria-label="Fidelity">
                        {mod.fidelity.map(f => <span className="ni-fidtag" key={f}>{f}</span>)}
                    </span>
                    <RoleChips roles={mod.roles} />
                </div>
            </header>
            <hr className="ni-rule" />
            <div className="ni-mod-body">{children}</div>
            <div className="ni-sowhat">
                <span className="ni-sowhat-label">READ →</span>
                <p className="ni-sowhat-text">{soWhat}</p>
            </div>
        </section>
    );
}

// ---- reveal wrapper (honors reduced-motion via CSS) ----------------------
export function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
    return (
        <div ref={ref} className={`ni-reveal${inView ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

// ---- act divider (editorial section break) -------------------------------
export function ActDivider({ act, count }) {
    const { lang } = useI18n();
    const [ref, inView] = useInView({ rootMargin: '0px 0px -25% 0px' });
    return (
        <div ref={ref} className={`ni ni-actbreak${inView ? ' in' : ''}`}>
            <div className="ni-actbreak-rule" aria-hidden="true">
                {Array.from({ length: 28 }, (_, i) => (
                    <span key={i} className="ni-tick" style={{ opacity: 0.25 + (i % 4) * 0.18 }} />
                ))}
            </div>
            <div className="ni-actbreak-row">
                <span className="ni-actbreak-num">ACT {act.num}</span>
                <div className="ni-actbreak-headings">
                    <h2 className="ni-actbreak-name">{act.name[lang]}</h2>
                    <span className="ni-actbreak-tag">{act.tag[lang]}</span>
                </div>
                <span className="ni-actbreak-count">{String(count).padStart(2, '0')} {lang === 'zh' ? '件' : 'items'}</span>
            </div>
        </div>
    );
}

// ---- wire-feed ticker (page flourish; static under reduced motion) -------
export function WireTicker({ items }) {
    const reduced = usePrefersReducedMotion();
    const row = items.map((it, i) => (
        <span className="ni-tickitem" key={i}>
            <span className="ni-tickitem-time">{it.time}</span>
            <span className="ni-tickitem-dot" aria-hidden="true" />
            <span className="ni-tickitem-text">{it.text}</span>
        </span>
    ));
    return (
        <div className="ni ni-wire" role="img" aria-label="Wire feed of pipeline dispatches">
            <span className="ni-wire-label">WIRE</span>
            <div className={`ni-wire-track${reduced ? ' is-static' : ''}`}>
                <div className="ni-wire-run">{row}</div>
                {!reduced && <div className="ni-wire-run" aria-hidden="true">{row}</div>}
            </div>
        </div>
    );
}

// small primitives -----------------------------------------------------------
export function Stamp({ children, tone = 'neutral' }) {
    return <span className={`ni-tag ni-tag--${tone}`}>{children}</span>;
}
export function onActivate(fn) {
    return e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); } };
}

injectStyles('ni-shared', `
.ni {
  --ni-bg-0: #060709;
  --ni-bg-1: #0C0E12;
  --ni-bg-2: #14171D;
  --ni-bg-3: #1C2028;
  --ni-line-1: #262B35;
  --ni-line-2: #333A47;
  --ni-text-1: #F2F0EB;
  --ni-text-2: #A8ADB8;
  --ni-text-3: #6B7280;
  --ni-teal: #35C2B0;
  --ni-teal-dim: rgba(53,194,176,0.12);
  --ni-amber: #E8A33D;
  --ni-amber-dim: rgba(232,163,61,0.12);
  --ni-red: #E5675A;
  --ni-red-dim: rgba(229,103,90,0.12);
  --ni-sky: #57A6E8;
  --ni-sky-dim: rgba(87,166,232,0.12);
  --ni-iris: #9B95E6;
  --ni-iris-dim: rgba(155,149,230,0.12);
  --ni-slate: #94A0B0;
  --ni-slate-dim: rgba(148,160,176,0.10);
  --ni-font-display: 'Fraunces', 'Noto Serif TC', Georgia, serif;
  --ni-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --ni-font-data: 'JetBrains Mono', monospace;
  --ni-r-sm: 5px;
  --ni-r-md: 9px;
  --ni-r-lg: 14px;
  --ni-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--ni-font-body);
  color: var(--ni-text-2);
  line-height: 1.62;
  font-size: 16px;
}
.ni *, .ni *::before, .ni *::after { box-sizing: border-box; }
:where(.ni button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.ni :is(button, a, input, select, [tabindex="0"], [role="slider"], [role="option"], [role="tab"]):focus-visible {
  outline: 2px solid var(--ni-teal); outline-offset: 2px; border-radius: 3px;
}
.ni-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.ni-mono { font-family: var(--ni-font-data); }
.ni-eyebrow { font-family: var(--ni-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; color: var(--ni-text-3); }
.ni-display { font-family: var(--ni-font-display); font-size: clamp(24px, 2.7vw, 33px); font-weight: 500; line-height: 1.16; letter-spacing: -0.008em; color: var(--ni-text-1); margin: 0; }
.ni-data-sm { font-family: var(--ni-font-data); font-size: 12px; letter-spacing: 0.03em; line-height: 1.5; }

/* ---- module frame (wire dispatch) ---- */
.ni-module {
  position: relative;
  background: var(--ni-bg-1);
  border: 1px solid var(--ni-line-1);
  border-top: 2px solid var(--ni-line-2);
  border-radius: 0 0 var(--ni-r-lg) var(--ni-r-lg);
  padding: 22px 30px 26px;
  margin: 0 0 18px;
  transition: opacity 260ms var(--ni-ease), filter 260ms var(--ni-ease);
}
.ni-module.is-muted { opacity: 0.32; filter: saturate(0.5); }
.ni-dispatch {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 14px; margin-bottom: 16px;
  border-bottom: 1px dashed var(--ni-line-1);
}
.ni-dispatch-line { font-family: var(--ni-font-data); font-size: 10.5px; letter-spacing: 0.14em; color: var(--ni-text-3); display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ni-dispatch-sep { color: var(--ni-line-2); }
.ni-dispatch-id { color: var(--ni-teal); }
.ni-mod-head { }
.ni-mod-lead { margin: 10px 0 0; color: var(--ni-text-2); font-size: 15px; max-width: 680px; }
.ni-mod-fidrow { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
.ni-fidtags { display: inline-flex; gap: 6px; flex-wrap: wrap; }
.ni-fidtag { font-family: var(--ni-font-data); font-size: 9.5px; letter-spacing: 0.12em; color: var(--ni-text-3); border: 1px solid var(--ni-line-1); border-radius: 3px; padding: 2px 6px; background: var(--ni-bg-2); }
.ni-mod-body { margin-top: 4px; }
.ni-rule { border: none; border-top: 1px solid var(--ni-line-1); margin: 18px 0; }

/* classification stamp */
.ni-stamp { display: inline-flex; align-items: center; gap: 5px; font-family: var(--ni-font-data); font-size: 10px; font-weight: 500; letter-spacing: 0.12em; padding: 3px 8px; border-radius: 3px; border: 1px solid currentColor; white-space: nowrap; cursor: help; }
.ni-stamp--real { color: var(--ni-teal); background: var(--ni-teal-dim); }
.ni-stamp--reconstructed { color: var(--ni-amber); background: var(--ni-amber-dim); }
.ni-stamp--simulated { color: var(--ni-sky); background: var(--ni-sky-dim); }
.ni-stamp--illustrative { color: var(--ni-slate); background: var(--ni-slate-dim); }

/* role chips */
.ni-rolechips { display: inline-flex; gap: 5px; flex-wrap: wrap; }
.ni-rolechip { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--ni-text-3); border: 1px solid var(--ni-line-2); border-radius: 999px; padding: 2px 8px; cursor: help; }

/* so-what strip */
.ni-sowhat { display: flex; align-items: baseline; gap: 12px; margin-top: 22px; padding: 12px 16px; background: var(--ni-bg-2); border-left: 2px solid var(--ni-teal); border-radius: 0 var(--ni-r-sm) var(--ni-r-sm) 0; }
.ni-sowhat-label { flex: 0 0 auto; font-family: var(--ni-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: var(--ni-teal); }
.ni-sowhat-text { margin: 0; font-family: var(--ni-font-display); font-size: 16px; font-style: italic; line-height: 1.5; color: var(--ni-text-1); }

/* ---- shared primitives ---- */
.ni-panel { background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--ni-font-body); font-size: 13px; font-weight: 600; color: var(--ni-text-1); background: var(--ni-bg-3); border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-sm); padding: 8px 14px; transition: border-color 160ms var(--ni-ease), background 160ms var(--ni-ease), transform 110ms var(--ni-ease); }
.ni-btn:hover { border-color: var(--ni-teal); }
.ni-btn:active { transform: translateY(1px); }
.ni-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
.ni-btn.is-on { color: var(--ni-bg-0); background: var(--ni-teal); border-color: transparent; }
.ni-tag { display: inline-flex; align-items: center; gap: 5px; font-family: var(--ni-font-data); font-size: 10.5px; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--ni-line-2); color: var(--ni-text-3); }
.ni-tag--teal { color: var(--ni-teal); border-color: var(--ni-teal); background: var(--ni-teal-dim); }
.ni-tag--amber { color: var(--ni-amber); border-color: var(--ni-amber); background: var(--ni-amber-dim); }
.ni-tag--red { color: var(--ni-red); border-color: var(--ni-red); background: var(--ni-red-dim); }
.ni-caption { font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.05em; color: var(--ni-text-3); }
.ni-kbd { font-family: var(--ni-font-data); font-size: 10px; color: var(--ni-text-3); border: 1px solid var(--ni-line-2); border-radius: 4px; padding: 1px 5px; }

/* reveal */
.ni-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s var(--ni-ease), transform 0.6s var(--ni-ease); }
.ni-reveal.in { opacity: 1; transform: none; }

/* ---- act divider ---- */
.ni-actbreak { margin: 40px 0 20px; opacity: 0; transform: translateY(14px); transition: opacity 0.6s var(--ni-ease), transform 0.6s var(--ni-ease); }
.ni-actbreak.in { opacity: 1; transform: none; }
.ni-actbreak-rule { display: flex; gap: 3px; align-items: flex-end; height: 12px; margin-bottom: 16px; }
.ni-tick { flex: 1; height: 100%; border-left: 1px solid var(--ni-teal); }
.ni-actbreak-row { display: flex; align-items: baseline; gap: 20px; }
.ni-actbreak-num { font-family: var(--ni-font-data); font-size: 13px; font-weight: 500; letter-spacing: 0.24em; color: var(--ni-teal); white-space: nowrap; }
.ni-actbreak-headings { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; }
.ni-actbreak-name { font-family: var(--ni-font-display); font-size: clamp(26px, 3.4vw, 40px); font-weight: 500; color: var(--ni-text-1); margin: 0; letter-spacing: -0.01em; }
.ni-actbreak-tag { font-size: 13px; color: var(--ni-text-3); }
.ni-actbreak-count { font-family: var(--ni-font-data); font-size: 11px; color: var(--ni-text-3); border: 1px solid var(--ni-line-2); border-radius: 999px; padding: 2px 10px; white-space: nowrap; }

/* ---- wire ticker ---- */
.ni-wire { display: flex; align-items: stretch; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-sm); background: var(--ni-bg-2); overflow: hidden; }
.ni-wire-label { flex: 0 0 auto; display: flex; align-items: center; font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.2em; color: var(--ni-bg-0); background: var(--ni-teal); padding: 0 12px; }
.ni-wire-track { position: relative; flex: 1; min-width: 0; display: flex; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); }
.ni-wire-run { display: inline-flex; align-items: center; flex: 0 0 auto; padding: 8px 0; animation: ni-wire-scroll 42s linear infinite; }
.ni-wire-track.is-static { mask-image: none; overflow-x: auto; }
.ni-wire-track.is-static .ni-wire-run { animation: none; }
.ni-tickitem { display: inline-flex; align-items: center; gap: 8px; padding: 0 22px; white-space: nowrap; }
.ni-tickitem-time { font-family: var(--ni-font-data); font-size: 11px; color: var(--ni-teal); }
.ni-tickitem-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ni-line-2); }
.ni-tickitem-text { font-size: 13px; color: var(--ni-text-2); }
@keyframes ni-wire-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }

@media (max-width: 767px) {
  .ni-module { padding: 18px 16px 22px; }
  .ni-actbreak-row { flex-direction: column; gap: 8px; }
  .ni-actbreak-count { align-self: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .ni *, .ni *::before, .ni *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
  .ni-reveal, .ni-actbreak { opacity: 1; transform: none; transition: none; }
  .ni-wire-run { animation: none; }
}
`);
