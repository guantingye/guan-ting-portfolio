import React, { useEffect, useRef, useState } from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n };

// ---- status system (single source of truth; consumed by M02 / M06 / M09) --
// Contrast ratios are WCAG 2.1, computed against the panel surface #14171D
// (day) with the verified formula; night-shift ratios sit against #05080C.
// Color is never the only channel — every status also carries an icon SHAPE
// and a text label. That is this page's thesis, proven in the tokens.
export const STATUS = {
    normal:   { hex: '#35C2B0', ratio: '8.1', night: '#2FA99A', nightRatio: '6.9', icon: 'check', label: { en: 'Normal',   zh: '正常' } },
    advisory: { hex: '#57A6E8', ratio: '6.9', night: '#57A6E8', nightRatio: '7.7', icon: 'info',  label: { en: 'Advisory', zh: '注意' } },
    warning:  { hex: '#E8A33D', ratio: '8.3', night: '#CF9235', nightRatio: '7.5', icon: 'warn',  label: { en: 'Warning',  zh: '警告' } },
    critical: { hex: '#E5675A', ratio: '5.5', night: '#E5675A', nightRatio: '6.1', icon: 'alert', label: { en: 'Critical', zh: '危急' } },
    degraded: { hex: '#CBA255', ratio: '7.6', night: '#B98F3E', nightRatio: '6.7', icon: 'hatch', label: { en: 'Degraded', zh: '降級' } },
    offline:  { hex: '#8A929E', ratio: '5.7', night: '#8A929E', nightRatio: '6.4', icon: 'off',   label: { en: 'Offline',  zh: '離線' } },
    handoff:  { hex: '#9B95E6', ratio: '6.7', night: '#9B95E6', nightRatio: '7.5', icon: 'swap',  label: { en: 'Handoff',  zh: '交接' } },
};

const ICON_PATHS = {
    check: <path d="M5 12.5l4 4 10-10" />,
    info:  <><circle cx="12" cy="8" r="1.4" fill="currentColor" stroke="none" /><path d="M12 12v6" /></>,
    warn:  <><path d="M12 4L2.5 20h19L12 4z" /><path d="M12 10v5" /><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" /></>,
    alert: <><path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z" /><path d="M12 8v5" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" /></>,
    hatch: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M6 14l8-8M11 18l7-7" /></>,
    off:   <><circle cx="12" cy="12" r="8" /><path d="M6 6l12 12" /></>,
    swap:  <><path d="M4 9h13l-3.5-3.5M20 15H7l3.5 3.5" /></>,
};

// One shape per status — the redundant channel behind every color.
export function StatusIcon({ name, size = 16, strokeWidth = 1.8, style }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true" style={style}>
            {ICON_PATHS[name] || ICON_PATHS.info}
        </svg>
    );
}

// ---- oscilloscope signal glyph (page signature motif) --------------------
// Animated neural-signal trace in each module header. Flatlines to a straight
// baseline when prefers-reduced-motion is set — motion discipline as evidence.
export function SignalGlyph({ tone = 'var(--gx-teal)', width = 56, flat }) {
    const reduced = usePrefersReducedMotion();
    const still = flat ?? reduced;
    return (
        <span className="gx-glyph" aria-hidden="true" style={{ width }}>
            <svg viewBox="0 0 56 18" width={width} height={18} fill="none" preserveAspectRatio="none">
                {still ? (
                    <line x1="0" y1="9" x2="56" y2="9" stroke={tone} strokeWidth="1.4" opacity="0.7" />
                ) : (
                    <>
                        <line x1="0" y1="9" x2="56" y2="9" stroke="var(--gx-line-2)" strokeWidth="1" />
                        <path className="gx-glyph-trace"
                            d="M0 9 H14 l3 -6 l3 12 l3 -9 l2 3 H30 l3 -5 l3 5 H56"
                            stroke={tone} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                )}
            </svg>
        </span>
    );
}

// ---- deterministic RNG (seeded; reproducible screenshots) ----------------
export function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ---- hold-to-confirm button (spec M03 / M06) -----------------------------
// Friction as a design tool: irreversible-ish actions require an 800 ms hold.
// Under reduced motion the progress ring is replaced by live percent text —
// the same logic, no looping animation.
export function HoldButton({ label, holdingLabel, holdMs = 800, onConfirm, tone = 'var(--gx-red)', reduced }) {
    const [pct, setPct] = useState(0);
    const raf = useRef(0);
    const start = useRef(0);
    const holding = useRef(false);

    const stop = () => {
        holding.current = false;
        cancelAnimationFrame(raf.current);
        setPct(0);
    };
    const tick = now => {
        if (!holding.current) return;
        const p = Math.min(1, (now - start.current) / holdMs);
        setPct(p);
        if (p >= 1) { holding.current = false; setPct(0); onConfirm(); return; }
        raf.current = requestAnimationFrame(tick);
    };
    const begin = () => {
        if (holding.current) return;
        holding.current = true;
        start.current = performance.now();
        raf.current = requestAnimationFrame(tick);
    };
    useEffect(() => stop, []);

    const R = 15, C = 2 * Math.PI * R;
    return (
        <button
            className="gx-hold"
            style={{ '--gx-accent': tone }}
            onPointerDown={begin}
            onPointerUp={stop}
            onPointerLeave={stop}
            onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); begin(); } }}
            onKeyUp={e => { if (e.key === 'Enter' || e.key === ' ') stop(); }}
            aria-label={`${label} — hold to confirm`}>
            {!reduced && (
                <svg className="gx-hold-ring" viewBox="0 0 36 36" aria-hidden="true">
                    <circle cx="18" cy="18" r={R} fill="none" stroke="var(--gx-line-2)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r={R} fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round"
                        strokeDasharray={C} strokeDashoffset={C * (1 - pct)} transform="rotate(-90 18 18)" />
                </svg>
            )}
            <span className="gx-hold-label">
                {pct > 0 ? `${holdingLabel || label} ${Math.round(pct * 100)}%` : label}
            </span>
        </button>
    );
}

// ---- IntersectionObserver hook (reveal + rAF gating) ---------------------
export function useInView(options) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return [ref, inView];
}

// ---- module frame (spec 2.3 / 3.4) ---------------------------------------
export default function ModuleFrame({ id, num, eyebrow, title, intent, tone, children, notes }) {
    const accent = tone || 'var(--gx-teal)';
    return (
        <section className="gx gx-module" id={id} aria-labelledby={`${id}-t`} style={{ '--gx-accent': accent }}>
            <span className="gx-corner gx-corner-tl" aria-hidden="true" />
            <span className="gx-corner gx-corner-br" aria-hidden="true" />
            <header className="gx-mod-head">
                <div className="gx-mod-num" aria-hidden="true">
                    <span>{num}</span>
                    <SignalGlyph tone={accent} />
                </div>
                <div className="gx-mod-headings">
                    <span className="gx-eyebrow" style={{ color: accent }}>{eyebrow}</span>
                    <h3 className="gx-display" id={`${id}-t`}>{title}</h3>
                    <p className="gx-intent">{intent}</p>
                </div>
            </header>
            <div className="gx-mod-body">{children}</div>
            {notes && (
                <footer className="gx-notes">
                    {notes.map((note, i) => (
                        <div className="gx-note" key={i}>
                            <span className="gx-note-tag">{note.tag}</span>
                            <p>{note.text}</p>
                        </div>
                    ))}
                </footer>
            )}
        </section>
    );
}

injectStyles('gx-shared-styles', `
.gx {
  --gx-bg-0: #060709;
  --gx-bg-1: #0C0E12;
  --gx-bg-2: #14171D;
  --gx-bg-3: #1C2028;
  --gx-line-1: #262B35;
  --gx-line-2: #333A47;
  --gx-text-1: #F2F0EB;
  --gx-text-2: #A8ADB8;
  --gx-text-3: #6B7280;
  --gx-teal: #35C2B0;
  --gx-teal-dim: rgba(53,194,176,0.12);
  --gx-sky: #57A6E8;
  --gx-amber: #E8A33D;
  --gx-amber-dim: rgba(232,163,61,0.12);
  --gx-red: #E5675A;
  --gx-red-dim: rgba(229,103,90,0.12);
  --gx-gold: #CBA255;
  --gx-iris: #9B95E6;
  --gx-font-display: 'Newsreader', 'Noto Serif TC', serif;
  --gx-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --gx-font-data: 'JetBrains Mono', monospace;
  --gx-r-sm: 6px;
  --gx-r-md: 10px;
  --gx-r-lg: 16px;
  --gx-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--gx-font-body);
  color: var(--gx-text-2);
  line-height: 1.6;
}
.gx *, .gx *::before, .gx *::after { box-sizing: border-box; }
:where(.gx button) { font: inherit; color: inherit; background: none; border: none; padding: 0; text-align: inherit; cursor: pointer; }
.gx :is(button, a, input, select, [tabindex="0"], [role="slider"], [role="tab"], [role="gridcell"]):focus-visible {
  outline: 2px solid var(--gx-accent, var(--gx-teal)); outline-offset: 2px; border-radius: 3px;
}
.gx-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.gx-eyebrow { font-family: var(--gx-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; }
.gx-display { font-family: var(--gx-font-display); font-size: clamp(24px, 2.6vw, 34px); font-weight: 500; line-height: 1.16; color: var(--gx-text-1); margin: 8px 0 0; }
.gx-mono { font-family: var(--gx-font-data); }
.gx-data-sm { font-family: var(--gx-font-data); font-size: 12px; letter-spacing: 0.04em; line-height: 1.5; }

/* module frame */
.gx-module {
  position: relative;
  background:
    radial-gradient(120% 100% at 0% 0%, rgba(53,194,176,0.04), transparent 42%),
    var(--gx-bg-1);
  border: 1px solid var(--gx-line-1);
  border-radius: var(--gx-r-lg);
  padding: 30px;
  margin: 0 0 22px;
  overflow: hidden;
}
.gx-corner { position: absolute; width: 14px; height: 14px; opacity: 0.5; pointer-events: none; }
.gx-corner-tl { top: 12px; left: 12px; border-top: 1px solid var(--gx-accent, var(--gx-teal)); border-left: 1px solid var(--gx-accent, var(--gx-teal)); }
.gx-corner-br { bottom: 12px; right: 12px; border-bottom: 1px solid var(--gx-accent, var(--gx-teal)); border-right: 1px solid var(--gx-accent, var(--gx-teal)); }
.gx-mod-head { display: flex; gap: 18px; align-items: flex-start; margin-bottom: 22px; }
.gx-mod-num { display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; padding-top: 4px; }
.gx-mod-num > span { font-family: var(--gx-font-data); font-size: 26px; font-weight: 500; color: var(--gx-accent, var(--gx-teal)); line-height: 1; letter-spacing: 0.02em; }
.gx-mod-headings { min-width: 0; }
.gx-intent { margin: 10px 0 0; color: var(--gx-text-2); font-size: 15px; max-width: 640px; }
.gx-mod-body { margin-top: 4px; }

/* signal glyph */
.gx-glyph { display: inline-block; height: 18px; }
.gx-glyph svg { display: block; width: 100%; height: 18px; }
.gx-glyph-trace { stroke-dasharray: 8 46; animation: gx-sweep 1.9s linear infinite; }
@keyframes gx-sweep { to { stroke-dashoffset: -54; } }

/* design-notes footer */
.gx-notes { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-top: 26px; padding-top: 18px; border-top: 1px solid var(--gx-line-1); }
.gx-note-tag { display: inline-block; font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gx-text-3); margin-bottom: 6px; }
.gx-note p { margin: 0; font-size: 13px; line-height: 1.6; color: var(--gx-text-2); }

/* reusable primitives */
.gx-panel { background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--gx-font-body); font-size: 13px; font-weight: 600; color: var(--gx-text-1); background: var(--gx-bg-3); border: 1px solid var(--gx-line-2); border-radius: var(--gx-r-sm); padding: 9px 15px; transition: border-color 180ms var(--gx-ease), background 180ms var(--gx-ease), transform 120ms var(--gx-ease); }
.gx-btn:hover { border-color: var(--gx-accent, var(--gx-teal)); }
.gx-btn:active { transform: translateY(1px); }
.gx-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
.gx-btn-accent { color: #060709; background: var(--gx-accent, var(--gx-teal)); border-color: transparent; }
.gx-btn-amber { color: var(--gx-amber); border-color: var(--gx-amber); background: var(--gx-amber-dim); }
.gx-tag { display: inline-flex; align-items: center; gap: 6px; font-family: var(--gx-font-data); font-size: 11px; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 999px; border: 1px solid currentColor; }
.gx-caption { font-family: var(--gx-font-data); font-size: 11px; letter-spacing: 0.06em; color: var(--gx-text-3); display: inline-flex; align-items: center; gap: 6px; }
.gx-caption::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--gx-teal); box-shadow: 0 0 6px var(--gx-teal); }
.gx-hold { display: inline-flex; align-items: center; gap: 9px; font-family: var(--gx-font-body); font-size: 13px; font-weight: 600; color: var(--gx-text-1); background: var(--gx-bg-3); border: 1px solid var(--gx-accent, var(--gx-red)); border-radius: var(--gx-r-sm); padding: 8px 16px 8px 12px; touch-action: none; user-select: none; }
.gx-hold-ring { width: 24px; height: 24px; flex: 0 0 auto; }
.gx-hold-label { white-space: nowrap; }

/* reveal (managed by EvidenceLab observer) */
.gx-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s var(--gx-ease), transform 0.7s var(--gx-ease); }
.gx-reveal.in { opacity: 1; transform: none; }

@media (max-width: 767px) {
  .gx-module { padding: 20px 15px; }
  .gx-mod-head { gap: 12px; }
  .gx-mod-num > span { font-size: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .gx *, .gx *::before, .gx *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
  .gx-reveal { opacity: 1; transform: none; transition: none; }
}
`);
