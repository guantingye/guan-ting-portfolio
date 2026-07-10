import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView, mulberry32 } from '../../evidence-lab/shared/labKit.jsx';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView, mulberry32 };

// ---- shell context ------------------------------------------------------
// The shell owns the active role (React state, never persisted) plus the
// language-resolved role map and badge labels, so modules stay copy-free.
const VfCtx = createContext({ activeRole: null, roleMap: {}, badges: {}, labels: {} });
export function VfProvider({ activeRole, roleMap, badges, labels, children }) {
    return <VfCtx.Provider value={{ activeRole, roleMap, badges, labels }}>{children}</VfCtx.Provider>;
}
export const useVf = () => useContext(VfCtx);

// ---- authenticity badge (spec 2.1) --------------------------------------
// Three tiers, each a distinct color AND a distinct glyph shape, so the
// distinction survives grayscale. Copy comes from verificationContent.
const TIER_GLYPH = {
    real:         <><circle cx="8" cy="8" r="6.2" /><path d="M5.4 8.2l1.9 1.9 3.4-3.8" /></>,
    simulated:    <><circle cx="8" cy="8" r="6.2" /><path d="M8 4.6v3.6l2.4 2.4" /></>,
    illustrative: <><path d="M8 1.8l6.2 3.6v5.2L8 14.2 1.8 10.6V5.4z" /></>,
};
export function AuthenticityBadge({ tier }) {
    const { badges } = useVf();
    const b = badges[tier];
    return (
        <span className={`vf-badge vf-badge--${tier}`} title={b.note}>
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor"
                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {TIER_GLYPH[tier]}
            </svg>
            <span>{b.term}</span>
            <span className="vf-sr-only"> — {b.note}</span>
        </span>
    );
}

// ---- role chips (display-only, inside a module header) -------------------
// Highlights the chip matching the active role filter (spec 4.2).
export function RoleChips({ roles }) {
    const { activeRole, roleMap } = useVf();
    return (
        <span className="vf-rolechips" aria-label="Relevant roles">
            {roles.map(id => (
                <span key={id} className={`vf-rolechip${activeRole === id ? ' is-on' : ''}`}>
                    {roleMap[id].abbr}
                </span>
            ))}
        </span>
    );
}

// ---- unified module frame (spec 4.3) ------------------------------------
export default function ModuleFrame({
    id, code, phase, accent, title, lead, roles, tier, footer, disclaimer, children,
}) {
    const { activeRole, labels } = useVf();
    const muted = activeRole && !roles.includes(activeRole);
    return (
        <section
            className={`vf vf-module${muted ? ' is-muted' : ''}`}
            id={id}
            data-phase={phase}
            style={{ '--vf-accent': accent }}
            aria-labelledby={`${id}-t`}>
            <span className="vf-corner vf-corner-tl" aria-hidden="true" />
            <span className="vf-corner vf-corner-br" aria-hidden="true" />
            <header className="vf-mod-head">
                <div className="vf-mod-code" aria-hidden="true">{code}</div>
                <div className="vf-mod-headings">
                    <div className="vf-mod-eyebrowrow">
                        <span className="vf-eyebrow vf-mod-phase">{phase}</span>
                        {muted && <span className="vf-muted-tag">{labels.mutedLabel}</span>}
                    </div>
                    <h3 className="vf-display" id={`${id}-t`}>{title}</h3>
                    <p className="vf-mod-lead">{lead}</p>
                </div>
                <div className="vf-mod-meta">
                    <AuthenticityBadge tier={tier} />
                    <RoleChips roles={roles} />
                </div>
            </header>
            <div className="vf-mod-body">{children}</div>
            {disclaimer && (
                <p className="vf-mod-disclaimer">
                    <span className="vf-mod-disclaimer-tag">{labels.disclaimerLabel}</span>{disclaimer}
                </p>
            )}
            {footer && (
                <footer className="vf-mod-foot">
                    <span className="vf-foot-label">{labels.footerLabel}</span>
                    <p className="vf-foot-text">{footer}</p>
                </footer>
            )}
        </section>
    );
}

// ---- reveal wrapper (managed per element; honors reduced-motion) --------
export function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -48px 0px' });
    return (
        <div ref={ref} className={`vf-reveal${inView ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

// ---- decorative phase glyph (contour ticks; flat under reduced-motion) --
export function PhaseGlyph({ accent, seed = 7 }) {
    const reduced = usePrefersReducedMotion();
    const rnd = mulberry32(seed);
    const bars = Array.from({ length: 22 }, () => 3 + Math.round(rnd() * 15));
    return (
        <svg className="vf-phaseglyph" viewBox="0 0 132 20" width="132" height="20"
            fill="none" preserveAspectRatio="none" aria-hidden="true">
            {bars.map((h, i) => (
                <line key={i} x1={i * 6 + 2} y1={10 - h / 2} x2={i * 6 + 2} y2={10 + h / 2}
                    stroke={accent} strokeWidth="1.4" strokeLinecap="round"
                    opacity={reduced ? 0.5 : 0.35 + (i % 5) * 0.13}
                    className={reduced ? undefined : 'vf-phaseglyph-bar'} style={{ animationDelay: `${i * 70}ms` }} />
            ))}
        </svg>
    );
}

// small helper: interactive element keyboard handler (Enter/Space)
export function onActivate(fn) {
    return e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); }
    };
}

injectStyles('vf-shared', `
.vf {
  --vf-bg-0: #05070A;
  --vf-bg-1: #0B0D12;
  --vf-bg-2: #13161D;
  --vf-bg-3: #1B1F28;
  --vf-line-1: #242A34;
  --vf-line-2: #333B47;
  --vf-text-1: #F3F1EC;
  --vf-text-2: #A9AEB9;
  --vf-text-3: #6C7480;
  --vf-teal: #35C2B0;
  --vf-teal-dim: rgba(53,194,176,0.13);
  --vf-iris: #9B95E6;
  --vf-iris-dim: rgba(155,149,230,0.13);
  --vf-slate: #94A0B0;
  --vf-slate-dim: rgba(148,160,176,0.12);
  --vf-sky: #57A6E8;
  --vf-sky-dim: rgba(87,166,232,0.13);
  --vf-amber: #E8A33D;
  --vf-amber-dim: rgba(232,163,61,0.13);
  --vf-gold: #CBA255;
  --vf-gold-dim: rgba(203,162,85,0.13);
  --vf-rose: #E0897B;
  --vf-rose-dim: rgba(224,137,123,0.13);
  --vf-font-display: 'Fraunces', 'Noto Serif TC', Georgia, serif;
  --vf-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --vf-font-data: 'JetBrains Mono', monospace;
  --vf-r-sm: 6px;
  --vf-r-md: 10px;
  --vf-r-lg: 18px;
  --vf-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --vf-accent: var(--vf-teal);
  font-family: var(--vf-font-body);
  color: var(--vf-text-2);
  line-height: 1.62;
}
.vf *, .vf *::before, .vf *::after { box-sizing: border-box; }
:where(.vf button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.vf :is(button, a, input, select, [tabindex="0"], [role="slider"], [role="tab"], [role="button"]):focus-visible {
  outline: 2px solid var(--vf-accent); outline-offset: 2px; border-radius: 3px;
}
.vf-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.vf-eyebrow { font-family: var(--vf-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; }
.vf-display { font-family: var(--vf-font-display); font-size: clamp(23px, 2.5vw, 31px); font-weight: 500; line-height: 1.16; color: var(--vf-text-1); margin: 9px 0 0; letter-spacing: -0.005em; }
.vf-mono { font-family: var(--vf-font-data); }
.vf-data-sm { font-family: var(--vf-font-data); font-size: 12px; letter-spacing: 0.03em; line-height: 1.5; }

/* ---- module frame ---- */
.vf-module {
  position: relative;
  background:
    radial-gradient(130% 105% at 0% 0%, color-mix(in srgb, var(--vf-accent) 6%, transparent), transparent 44%),
    var(--vf-bg-1);
  border: 1px solid var(--vf-line-1);
  border-radius: var(--vf-r-lg);
  padding: 30px 30px 26px;
  margin: 0 0 20px;
  overflow: hidden;
  transition: opacity 260ms var(--vf-ease), filter 260ms var(--vf-ease);
}
.vf-module.is-muted { opacity: 0.4; filter: saturate(0.55); }
.vf-corner { position: absolute; width: 13px; height: 13px; opacity: 0.55; pointer-events: none; }
.vf-corner-tl { top: 13px; left: 13px; border-top: 1.5px solid var(--vf-accent); border-left: 1.5px solid var(--vf-accent); }
.vf-corner-br { bottom: 13px; right: 13px; border-bottom: 1.5px solid var(--vf-accent); border-right: 1.5px solid var(--vf-accent); }

.vf-mod-head { display: grid; grid-template-columns: auto 1fr auto; gap: 18px; align-items: start; margin-bottom: 22px; }
.vf-mod-code { font-family: var(--vf-font-data); font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: var(--vf-bg-0); background: var(--vf-accent); border-radius: var(--vf-r-sm); padding: 5px 9px; line-height: 1; align-self: start; }
.vf-mod-headings { min-width: 0; }
.vf-mod-eyebrowrow { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.vf-mod-phase { color: var(--vf-accent); }
.vf-muted-tag { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vf-text-3); border: 1px dashed var(--vf-line-2); border-radius: 999px; padding: 2px 8px; }
.vf-mod-lead { margin: 11px 0 0; color: var(--vf-text-2); font-size: 15px; max-width: 660px; }
.vf-mod-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 9px; }

.vf-badge { display: inline-flex; align-items: center; gap: 6px; font-family: var(--vf-font-data); font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 9px; border-radius: 999px; border: 1px solid currentColor; white-space: nowrap; cursor: help; }
.vf-badge--real { color: var(--vf-teal); background: var(--vf-teal-dim); }
.vf-badge--simulated { color: var(--vf-amber); background: var(--vf-amber-dim); }
.vf-badge--illustrative { color: var(--vf-slate); background: var(--vf-slate-dim); }

.vf-rolechips { display: flex; gap: 5px; flex-wrap: wrap; justify-content: flex-end; }
.vf-rolechip { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.06em; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); border-radius: var(--vf-r-sm); padding: 2px 6px; transition: color 180ms var(--vf-ease), border-color 180ms var(--vf-ease); }
.vf-rolechip.is-on { color: var(--vf-accent); border-color: var(--vf-accent); }

.vf-mod-body { margin-top: 2px; }
.vf-mod-disclaimer { display: flex; align-items: baseline; gap: 8px; margin: 20px 0 0; font-family: var(--vf-font-data); font-size: 11.5px; line-height: 1.55; color: var(--vf-text-3); }
.vf-mod-disclaimer-tag { flex: 0 0 auto; color: var(--vf-amber); text-transform: uppercase; letter-spacing: 0.1em; font-size: 10px; border: 1px solid var(--vf-amber); border-radius: 4px; padding: 1px 6px; }
.vf-mod-foot { display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: baseline; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--vf-line-1); }
.vf-foot-label { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--vf-accent); white-space: nowrap; }
.vf-foot-text { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--vf-text-2); }

/* ---- shared primitives ---- */
.vf-panel { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); }
.vf-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--vf-font-body); font-size: 13px; font-weight: 600; color: var(--vf-text-1); background: var(--vf-bg-3); border: 1px solid var(--vf-line-2); border-radius: var(--vf-r-sm); padding: 8px 14px; transition: border-color 180ms var(--vf-ease), background 180ms var(--vf-ease), transform 120ms var(--vf-ease); }
.vf-btn:hover { border-color: var(--vf-accent); }
.vf-btn:active { transform: translateY(1px); }
.vf-btn[disabled] { opacity: 0.42; cursor: not-allowed; }
.vf-btn.is-on { color: var(--vf-bg-0); background: var(--vf-accent); border-color: transparent; }
.vf-tag { display: inline-flex; align-items: center; gap: 6px; font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.05em; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--vf-line-2); color: var(--vf-text-3); }
.vf-caption { font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.05em; color: var(--vf-text-3); }
.vf-kbd { font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); border-radius: 4px; padding: 1px 5px; }

/* reveal */
.vf-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.66s var(--vf-ease), transform 0.66s var(--vf-ease); }
.vf-reveal.in { opacity: 1; transform: none; }

/* phase glyph */
.vf-phaseglyph-bar { transform-origin: center; animation: vf-glyph-pulse 2.6s var(--vf-ease) infinite; }
@keyframes vf-glyph-pulse { 0%,100% { opacity: 0.28; } 50% { opacity: 0.8; } }

@media (max-width: 720px) {
  .vf-module { padding: 22px 16px 20px; }
  .vf-mod-head { grid-template-columns: auto 1fr; gap: 12px; }
  .vf-mod-meta { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: flex-start; flex-wrap: wrap; }
  .vf-rolechips { justify-content: flex-start; }
  .vf-mod-foot { grid-template-columns: 1fr; gap: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  .vf *, .vf *::before, .vf *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
  .vf-reveal { opacity: 1; transform: none; transition: none; }
}
`);
