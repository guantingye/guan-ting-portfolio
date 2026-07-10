import React, { createContext, useContext, useState, useId } from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView } from '../../evidence-lab/shared/labKit.jsx';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView };

// ---- authenticity badges (portfolio standard, plan 3.2) --------------------
export const BADGES = {
    real:          { term: 'REAL',          en: 'Ported from the shipped code / verified against the live system.', zh: '取自已上線的程式碼／對照線上系統驗證。' },
    reconstructed: { term: 'RECONSTRUCTED', en: 'Rebuilt from the real system where raw records were unrecoverable.', zh: '在無法取得原始紀錄時，依真實系統重建。' },
    simulated:     { term: 'SIMULATED',     en: 'Illustrative values generated to demonstrate behaviour.', zh: '為示範行為而產生的示意數值。' },
    illustrative:  { term: 'ILLUSTRATIVE',  en: 'A diagram, not data — drawn to explain a concept.', zh: '概念示意圖，非資料。' },
};
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
        <span className={`pm-stamp pm-stamp--${tier}`} title={`${b.term} — ${b[lang] ?? b.en}`}>
            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor"
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {TIER_GLYPH[tier]}
            </svg>
            <span>{b.term}</span>
            <span className="pm-sr-only"> — {b[lang] ?? b.en}</span>
        </span>
    );
}

// ---- passive role chips (plan F2) ------------------------------------------
export const ROLE_MAP = {
    AIPD: { en: 'AI Product Designer', zh: 'AI 產品設計' },
    UXR:  { en: 'UX Researcher',       zh: 'UX 研究' },
    PD:   { en: 'Product Designer',    zh: '產品設計' },
    FE:   { en: 'Front-End Engineer',  zh: '前端工程' },
    TPM:  { en: 'Technical PM',        zh: '技術產品經理' },
};
export function RoleChips({ roles }) {
    const { lang } = useI18n();
    return (
        <span className="pm-roles" aria-label="Relevant roles">
            {roles.map(id => (
                <span key={id} className="pm-role" title={`${ROLE_MAP[id][lang] ?? ROLE_MAP[id].en}`}>{id}</span>
            ))}
        </span>
    );
}

// ---- footnote superscript → references round-trip (plan 2.2 / 6.2) ---------
// Marker links down to the reference; the reference links back. aria-describedby
// ties the two so screen readers announce the citation on the marker.
export function Fn({ n }) {
    return (
        <sup className="pm-fn">
            <a id={`pm-fnref-${n}`} href={`#pm-ref-${n}`} aria-describedby={`pm-ref-${n}`}
                onClick={e => { e.preventDefault(); document.getElementById(`pm-ref-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); document.getElementById(`pm-ref-${n}`)?.focus?.(); }}>
                {n}
            </a>
        </sup>
    );
}

// ---- Fig./Table caption (mono, left-aligned, plan 2.2) ---------------------
export function Caption({ kind = 'Fig.', n, children }) {
    return (
        <figcaption className="pm-caption">
            <span className="pm-caption-tag">{kind} {n}</span>
            <span className="pm-caption-text">{children}</span>
        </figcaption>
    );
}

// ---- margin note: right gutter ≥1280px, inline collapsible below (plan 2.2)-
export function MarginNote({ label, children }) {
    const [open, setOpen] = useState(false);
    const id = useId();
    return (
        <aside className="pm-margin">
            <button className="pm-margin-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(o => !o)}>
                <span className="pm-margin-mark" aria-hidden="true">※</span>
                <span className="pm-margin-label">{label}</span>
            </button>
            <div id={id} className="pm-margin-body" data-open={open || undefined}>{children}</div>
        </aside>
    );
}

// ---- "Not a diagnostic instrument" notice (plan 3.3) -----------------------
export function DiagnosticNotice() {
    const { lang } = useI18n();
    return (
        <p className="pm-notice" role="note">
            <span className="pm-notice-mark" aria-hidden="true">⚕</span>
            {lang === 'zh'
                ? '非診斷工具。PsyMatch 是自陳式需求描繪與媒合流程，不進行心理衡鑑或診斷；治療由具國家證照的心理師提供。'
                : 'Not a diagnostic instrument. PsyMatch is a self-report needs-profiling and matching flow — it does not assess or diagnose; care is provided by nationally licensed psychologists.'}
        </p>
    );
}

// ---- so-what strip (plan 3.7) ----------------------------------------------
export function SoWhat({ children }) {
    return (
        <div className="pm-sowhat">
            <span className="pm-sowhat-label">READ →</span>
            <p className="pm-sowhat-text">{children}</p>
        </div>
    );
}

// ---- reveal (honours reduced motion via CSS) -------------------------------
export function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
    return (
        <div ref={ref} className={`pm-reveal${inView ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

// ---- section module frame (the paper apparatus, plan 2.2) ------------------
// mod: { id, num:'M4', section:{ tag:'§2', name:'INSTRUMENT' }, roles:[], badge }
export default function SectionModule({ mod, sectionNo, title, lead, soWhat, children }) {
    return (
        <section className="pm pm-module" id={mod.id} aria-labelledby={`${mod.id}-t`}>
            <div className="pm-mod-topline">
                <span className="pm-mod-eyebrow">
                    {mod.section.tag} {mod.section.name}<span className="pm-mod-dot">·</span>MODULE {mod.num}
                </span>
                <AuthBadge tier={mod.badge} />
            </div>
            <hr className="pm-mod-rule" />
            <header className="pm-mod-head">
                <h3 className="pm-mod-title" id={`${mod.id}-t`}>
                    <span className="pm-mod-no" aria-hidden="true">{sectionNo}</span>{title}
                </h3>
                <p className="pm-mod-lead">{lead}</p>
                <RoleChips roles={mod.roles} />
            </header>
            <div className="pm-mod-body">{children}</div>
            <SoWhat>{soWhat}</SoWhat>
        </section>
    );
}

// ---- profile radar: hand-rolled SVG, ≤7 axes, legend always present --------
// values / compare: { [topicId]: 1..max }. Never color-only — legend lists all.
export function ProfileRadar({ axes, values, compare, max = 7, size = 236,
    labels = { a: 'Profile', b: 'Compare' }, ariaLabel }) {
    const cx = size / 2, cy = size / 2, r = size / 2 - 34;
    const n = axes.length;
    const pt = (i, frac) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        return [cx + Math.cos(ang) * r * frac, cy + Math.sin(ang) * r * frac];
    };
    const poly = obj => axes.map((ax, i) => pt(i, Math.max(0, (obj[ax.id] || 0) / max)).join(',')).join(' ');
    const rings = [0.25, 0.5, 0.75, 1];
    const alt = ariaLabel || axes.map(a => `${a.short || a.label}: ${values[a.id] || 0}`).join(', ');
    return (
        <div className="pm-radar" role="img" aria-label={alt}>
            <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
                {rings.map((f, i) => (
                    <polygon key={i} points={axes.map((_, j) => pt(j, f).join(',')).join(' ')}
                        fill="none" stroke="var(--pm-line-1)" strokeWidth="1" />
                ))}
                {axes.map((_, i) => {
                    const [x, y] = pt(i, 1);
                    return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--pm-line-1)" strokeWidth="1" />;
                })}
                {compare && (
                    <polygon points={poly(compare)} fill="var(--pm-amber-dim)" stroke="var(--pm-amber)"
                        strokeWidth="1.5" strokeDasharray="4 3" />
                )}
                <polygon points={poly(values)} fill="var(--pm-teal-dim)" stroke="var(--pm-teal)" strokeWidth="2" />
                {axes.map((ax, i) => {
                    const [x, y] = pt(i, 1.16);
                    return (
                        <text key={i} x={x} y={y} className="pm-radar-axis"
                            textAnchor={Math.abs(x - cx) < 6 ? 'middle' : x > cx ? 'start' : 'end'}
                            dominantBaseline="middle">{ax.short || ax.label}</text>
                    );
                })}
            </svg>
            <ul className="pm-radar-legend">
                {axes.map(ax => (
                    <li key={ax.id}>
                        <span className="pm-radar-legend-name">{ax.label}</span>
                        <span className="pm-radar-legend-val">
                            {values[ax.id] || 0}{compare ? <span className="pm-radar-legend-cmp"> · {compare[ax.id] || 0}</span> : null}
                        </span>
                    </li>
                ))}
            </ul>
            {compare && (
                <div className="pm-radar-keys">
                    <span className="pm-radar-key pm-radar-key--a">{labels.a}</span>
                    <span className="pm-radar-key pm-radar-key--b">{labels.b}</span>
                </div>
            )}
        </div>
    );
}

// small primitives ----------------------------------------------------------
export function Tag({ children, tone = 'neutral' }) {
    return <span className={`pm-tag pm-tag--${tone}`}>{children}</span>;
}
export function onActivate(fn) {
    return e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); } };
}

injectStyles('pm-shared', `
.pm {
  --pm-bg-0: #060709;
  --pm-bg-1: #0C0E12;
  --pm-bg-2: #14171D;
  --pm-bg-3: #1C2028;
  --pm-line-1: #262B35;
  --pm-line-2: #333A47;
  --pm-text-1: #F2F0EB;
  --pm-text-2: #A8ADB8;
  --pm-text-3: #6B7280;
  --pm-teal: #35C2B0;
  --pm-teal-dim: rgba(53,194,176,0.12);
  --pm-amber: #E8A33D;
  --pm-amber-dim: rgba(232,163,61,0.12);
  --pm-red: #E5675A;
  --pm-red-dim: rgba(229,103,90,0.12);
  --pm-sky: #57A6E8;
  --pm-sky-dim: rgba(87,166,232,0.12);
  --pm-iris: #9B95E6;
  --pm-iris-dim: rgba(155,149,230,0.12);
  --pm-paper: #ECE7DC;
  --pm-font-display: 'Fraunces', 'Noto Serif TC', Georgia, serif;
  --pm-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --pm-font-data: 'JetBrains Mono', monospace;
  --pm-r-sm: 5px;
  --pm-r-md: 9px;
  --pm-r-lg: 14px;
  --pm-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--pm-font-body);
  color: var(--pm-text-2);
  line-height: 1.62;
  font-size: 16px;
}
.pm *, .pm *::before, .pm *::after { box-sizing: border-box; }
:where(.pm button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.pm :is(button, a, input, select, [tabindex="0"], [role="slider"], [role="option"], [role="tab"]):focus-visible {
  outline: 2px solid var(--pm-teal); outline-offset: 2px; border-radius: 3px;
}
.pm-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.pm-mono { font-family: var(--pm-font-data); }
.pm-eyebrow { font-family: var(--pm-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; color: var(--pm-text-3); }
.pm-serif { font-family: var(--pm-font-display); color: var(--pm-text-1); }

/* ---- module frame (journal article) ---- */
.pm-module {
  position: relative;
  background: var(--pm-bg-1);
  border: 1px solid var(--pm-line-1);
  border-radius: var(--pm-r-lg);
  padding: 26px 32px 28px;
  margin: 0 0 18px;
}
.pm-mod-topline { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.pm-mod-eyebrow { font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.16em; color: var(--pm-text-3); display: inline-flex; align-items: center; }
.pm-mod-eyebrow .pm-mod-dot { margin: 0 8px; color: var(--pm-line-2); }
.pm-mod-rule { border: none; border-top: 1px solid var(--pm-line-2); margin: 12px 0 18px; }
.pm-mod-title { font-family: var(--pm-font-display); font-size: clamp(23px, 2.6vw, 31px); font-weight: 500; line-height: 1.18; letter-spacing: -0.006em; color: var(--pm-text-1); margin: 0; }
.pm-mod-no { font-family: var(--pm-font-data); font-size: 0.62em; color: var(--pm-teal); margin-right: 12px; letter-spacing: 0.02em; vertical-align: 0.06em; }
.pm-mod-lead { margin: 12px 0 0; color: var(--pm-text-2); font-size: 15.5px; max-width: 720px; }
.pm-mod-head .pm-roles { margin-top: 14px; }
.pm-mod-body { margin-top: 22px; }

/* authenticity stamp */
.pm-stamp { display: inline-flex; align-items: center; gap: 5px; font-family: var(--pm-font-data); font-size: 10px; font-weight: 500; letter-spacing: 0.11em; padding: 3px 8px; border-radius: 3px; border: 1px solid currentColor; white-space: nowrap; cursor: help; }
.pm-stamp--real { color: var(--pm-teal); background: var(--pm-teal-dim); }
.pm-stamp--reconstructed { color: var(--pm-amber); background: var(--pm-amber-dim); }
.pm-stamp--simulated { color: var(--pm-sky); background: var(--pm-sky-dim); }
.pm-stamp--illustrative { color: var(--pm-iris); background: var(--pm-iris-dim); }

/* role chips */
.pm-roles { display: inline-flex; gap: 5px; flex-wrap: wrap; }
.pm-role { font-family: var(--pm-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--pm-text-3); border: 1px solid var(--pm-line-2); border-radius: 999px; padding: 2px 8px; cursor: help; }

/* footnotes */
.pm-fn { font-size: 0.62em; line-height: 0; }
.pm-fn a { color: var(--pm-amber); text-decoration: none; font-family: var(--pm-font-data); padding: 0 1px; }
.pm-fn a:hover { text-decoration: underline; }

/* captions */
.pm-caption { display: flex; gap: 9px; align-items: baseline; margin-top: 12px; font-family: var(--pm-font-data); font-size: 11px; line-height: 1.5; color: var(--pm-text-3); }
.pm-caption-tag { flex: 0 0 auto; color: var(--pm-teal); letter-spacing: 0.05em; }
.pm-caption-text { letter-spacing: 0.01em; }

/* margin note (inline collapsible; promoted to right gutter ≥1280 by layer) */
.pm-margin { margin: 14px 0; border-left: 2px solid var(--pm-line-2); }
.pm-margin-toggle { display: inline-flex; align-items: center; gap: 7px; padding: 2px 0 2px 12px; font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.08em; color: var(--pm-text-3); }
.pm-margin-toggle:hover { color: var(--pm-text-2); }
.pm-margin-mark { color: var(--pm-amber); }
.pm-margin-body { display: none; padding: 6px 0 4px 14px; font-size: 12.5px; line-height: 1.55; color: var(--pm-text-3); max-width: 340px; }
.pm-margin-body[data-open] { display: block; }

/* diagnostic notice */
.pm-notice { display: flex; gap: 10px; align-items: flex-start; margin: 0; padding: 11px 15px; border: 1px solid var(--pm-amber); border-radius: var(--pm-r-sm); background: var(--pm-amber-dim); font-size: 13px; line-height: 1.55; color: var(--pm-text-1); }
.pm-notice-mark { flex: 0 0 auto; color: var(--pm-amber); font-size: 15px; line-height: 1.4; }

/* so-what strip */
.pm-sowhat { display: flex; align-items: baseline; gap: 12px; margin-top: 24px; padding: 12px 16px; background: var(--pm-bg-2); border-left: 2px solid var(--pm-teal); border-radius: 0 var(--pm-r-sm) var(--pm-r-sm) 0; }
.pm-sowhat-label { flex: 0 0 auto; font-family: var(--pm-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: var(--pm-teal); }
.pm-sowhat-text { margin: 0; font-family: var(--pm-font-display); font-size: 16px; font-style: italic; line-height: 1.5; color: var(--pm-text-1); }

/* reveal */
.pm-reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.5s var(--pm-ease), transform 0.5s var(--pm-ease); }
.pm-reveal.in { opacity: 1; transform: none; }

/* ---- shared primitives ---- */
.pm-panel { background: var(--pm-bg-2); border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); }
.pm-tag { display: inline-flex; align-items: center; gap: 5px; font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--pm-line-2); color: var(--pm-text-3); }
.pm-tag--teal { color: var(--pm-teal); border-color: var(--pm-teal); background: var(--pm-teal-dim); }
.pm-tag--amber { color: var(--pm-amber); border-color: var(--pm-amber); background: var(--pm-amber-dim); }
.pm-tag--red { color: var(--pm-red); border-color: var(--pm-red); background: var(--pm-red-dim); }
.pm-tag--sky { color: var(--pm-sky); border-color: var(--pm-sky); background: var(--pm-sky-dim); }
.pm-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--pm-font-body); font-size: 13px; font-weight: 600; color: var(--pm-text-1); background: var(--pm-bg-3); border: 1px solid var(--pm-line-2); border-radius: var(--pm-r-sm); padding: 8px 14px; transition: border-color 160ms var(--pm-ease), background 160ms var(--pm-ease), transform 110ms var(--pm-ease); }
.pm-btn:hover { border-color: var(--pm-teal); }
.pm-btn:active { transform: translateY(1px); }
.pm-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
.pm-btn.is-on { color: var(--pm-bg-0); background: var(--pm-teal); border-color: transparent; }

/* profile radar */
.pm-radar { display: grid; grid-template-columns: auto 1fr; gap: 6px 22px; align-items: center; }
.pm-radar svg { display: block; overflow: visible; }
.pm-radar-axis { font-family: var(--pm-font-data); font-size: 9px; fill: var(--pm-text-3); letter-spacing: 0.02em; }
.pm-radar-legend { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.pm-radar-legend li { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; font-size: 12.5px; border-bottom: 1px dotted var(--pm-line-1); padding: 2px 0; }
.pm-radar-legend-name { color: var(--pm-text-2); }
.pm-radar-legend-val { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-teal); }
.pm-radar-legend-cmp { color: var(--pm-amber); }
.pm-radar-keys { grid-column: 1 / -1; display: flex; gap: 16px; margin-top: 4px; }
.pm-radar-key { font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 6px; }
.pm-radar-key::before { content: ''; width: 14px; height: 0; border-top-width: 2px; border-top-style: solid; }
.pm-radar-key--a { color: var(--pm-teal); } .pm-radar-key--a::before { border-color: var(--pm-teal); }
.pm-radar-key--b { color: var(--pm-amber); } .pm-radar-key--b::before { border-color: var(--pm-amber); border-top-style: dashed; }
@media (max-width: 560px) { .pm-radar { grid-template-columns: 1fr; justify-items: center; } .pm-radar-legend { width: 100%; } }

@media (max-width: 767px) {
  .pm-module { padding: 20px 16px 22px; }
  .pm-mod-body { margin-top: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .pm *, .pm *::before, .pm *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
  .pm-reveal { opacity: 1; transform: none; transition: none; }
}
`);
