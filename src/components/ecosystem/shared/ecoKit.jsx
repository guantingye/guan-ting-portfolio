import React, { createContext, useContext } from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView, mulberry32 } from '../../evidence-lab/shared/labKit.jsx';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView, mulberry32 };

// ---- authenticity badges (portfolio standard) ------------------------------
export const BADGES = {
    real:          { term: 'REAL',          en: 'Shipped ITRI work — verified records and pipeline.', zh: '已交付的工研院成果——經驗證的資料與管線。' },
    reconstructed: { term: 'RECONSTRUCTED', en: 'Rebuilt from the real dataset where raw records are private.', zh: '在原始紀錄不公開時，依真實資料集重建。' },
    simulated:     { term: 'SIMULATED',     en: 'Proposed capability — behaviour shown on illustrative data.', zh: '提案能力——以示意資料展示行為。' },
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
        <span className={`eco-stamp eco-stamp--${tier}`} title={`${b.term} — ${b[lang] ?? b.en}`}>
            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor"
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {TIER_GLYPH[tier]}
            </svg>
            <span>{b.term}</span>
            <span className="eco-sr-only"> — {b[lang] ?? b.en}</span>
        </span>
    );
}

// ---- passive role chips ----------------------------------------------------
export const ROLE_MAP = {
    DE:  { en: 'Data Engineer',    zh: '資料工程' },
    DA:  { en: 'Data Analyst',     zh: '資料分析' },
    AIPD:{ en: 'AI Product',       zh: 'AI 產品' },
    FE:  { en: 'Front-End',        zh: '前端工程' },
    TPM: { en: 'Technical PM',     zh: '技術產品經理' },
    STR: { en: 'Strategy Analyst', zh: '策略分析' },
};
export function RoleChips({ roles }) {
    const { lang } = useI18n();
    return (
        <span className="eco-roles" aria-label="Relevant roles">
            {roles.map(id => <span key={id} className="eco-role" title={ROLE_MAP[id][lang] ?? ROLE_MAP[id].en}>{id}</span>)}
        </span>
    );
}

// ---- plate caption (mono, cartographic) ------------------------------------
export function Caption({ kind = 'Plate', n, children }) {
    return (
        <figcaption className="eco-caption">
            <span className="eco-caption-tag">{kind} {n}</span>
            <span className="eco-caption-text">{children}</span>
        </figcaption>
    );
}

// ---- map plate: framed panel with survey corner-ticks + coordinate label ---
export function MapPlate({ coord, children, className = '' }) {
    return (
        <div className={`eco-plate ${className}`}>
            <span className="eco-plate-tick eco-plate-tick--tl" aria-hidden="true" />
            <span className="eco-plate-tick eco-plate-tick--tr" aria-hidden="true" />
            <span className="eco-plate-tick eco-plate-tick--bl" aria-hidden="true" />
            <span className="eco-plate-tick eco-plate-tick--br" aria-hidden="true" />
            {coord && <span className="eco-plate-coord" aria-hidden="true">{coord}</span>}
            {children}
        </div>
    );
}

// ---- legend key ------------------------------------------------------------
export function LegendKey({ items }) {
    return (
        <ul className="eco-legend" aria-label="Legend">
            {items.map(it => (
                <li key={it.label}>
                    <span className="eco-legend-swatch" style={{ background: it.color }} aria-hidden="true" />
                    <span>{it.label}</span>
                </li>
            ))}
        </ul>
    );
}

// ---- so-what strip ---------------------------------------------------------
export function SoWhat({ children }) {
    return (
        <div className="eco-sowhat">
            <span className="eco-sowhat-label">READ →</span>
            <p className="eco-sowhat-text">{children}</p>
        </div>
    );
}

// ---- reveal ----------------------------------------------------------------
export function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
    return <div ref={ref} className={`eco-reveal${inView ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Tag({ children, tone = 'neutral' }) {
    return <span className={`eco-tag eco-tag--${tone}`}>{children}</span>;
}
export function onActivate(fn) {
    return e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); } };
}

// ---- section module frame (cartographic sheet) -----------------------------
// mod: { id, num:'E3', section:{ tag:'SHEET B', name:'MAP' }, roles, badge, coord }
export default function SectionModule({ mod, sectionNo, title, lead, soWhat, children }) {
    return (
        <section className="eco eco-module" id={mod.id} aria-labelledby={`${mod.id}-t`}>
            <span className="eco-corner eco-corner--tl" aria-hidden="true" />
            <span className="eco-corner eco-corner--br" aria-hidden="true" />
            <div className="eco-mod-topline">
                <span className="eco-mod-eyebrow">
                    {mod.section.tag}<span className="eco-mod-slash">/</span>{mod.section.name}
                    <span className="eco-mod-dot">·</span>MODULE {mod.num}
                    {mod.coord && <span className="eco-mod-coord">{mod.coord}</span>}
                </span>
                <AuthBadge tier={mod.badge} />
            </div>
            <hr className="eco-mod-rule" />
            <header className="eco-mod-head">
                <h3 className="eco-mod-title" id={`${mod.id}-t`}>
                    <span className="eco-mod-no" aria-hidden="true">{sectionNo}</span>{title}
                </h3>
                <p className="eco-mod-lead">{lead}</p>
                <RoleChips roles={mod.roles} />
            </header>
            <div className="eco-mod-body">{children}</div>
            <SoWhat>{soWhat}</SoWhat>
        </section>
    );
}

injectStyles('eco-shared', `
.eco {
  --eco-bg-0: #060709;
  --eco-bg-1: #0C0E12;
  --eco-bg-2: #14171D;
  --eco-bg-3: #1C2028;
  --eco-line-1: #262B35;
  --eco-line-2: #333A47;
  --eco-text-1: #F2F0EB;
  --eco-text-2: #A8ADB8;
  --eco-text-3: #6B7280;
  --eco-ink: #E8A33D;          /* atlas ink — the leading accent */
  --eco-ink-dim: rgba(232,163,61,0.12);
  --eco-teal: #35C2B0;         /* verified / positive data */
  --eco-teal-dim: rgba(53,194,176,0.12);
  --eco-sky: #57A6E8;          /* flows / investment */
  --eco-sky-dim: rgba(87,166,232,0.12);
  --eco-red: #E5675A;
  --eco-red-dim: rgba(229,103,90,0.12);
  --eco-iris: #9B95E6;
  --eco-iris-dim: rgba(155,149,230,0.12);
  --eco-font-display: 'Newsreader', 'Noto Serif TC', serif;
  --eco-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --eco-font-data: 'JetBrains Mono', monospace;
  --eco-r-sm: 5px; --eco-r-md: 9px; --eco-r-lg: 14px;
  --eco-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--eco-font-body);
  color: var(--eco-text-2);
  line-height: 1.62;
  font-size: 16px;
}
.eco *, .eco *::before, .eco *::after { box-sizing: border-box; }
:where(.eco button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.eco :is(button, a, input, select, [tabindex="0"], [role="option"], [role="tab"]):focus-visible { outline: 2px solid var(--eco-ink); outline-offset: 2px; border-radius: 3px; }
.eco-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.eco-mono { font-family: var(--eco-font-data); }
.eco-eyebrow { font-family: var(--eco-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; color: var(--eco-text-3); }

/* module frame — a survey sheet */
.eco-module {
  position: relative;
  background:
    linear-gradient(var(--eco-line-1) 1px, transparent 1px) 0 0 / 100% 34px,
    var(--eco-bg-1);
  background-blend-mode: soft-light;
  border: 1px solid var(--eco-line-1);
  border-radius: var(--eco-r-lg);
  padding: 26px 32px 28px;
  margin: 0 0 18px;
  overflow: hidden;
}
.eco-module::before { content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: repeating-linear-gradient(0deg, rgba(232,163,61,0.02) 0 1px, transparent 1px 34px); }
.eco-corner { position: absolute; width: 12px; height: 12px; pointer-events: none; opacity: 0.6; }
.eco-corner--tl { top: 10px; left: 10px; border-top: 1px solid var(--eco-ink); border-left: 1px solid var(--eco-ink); }
.eco-corner--br { bottom: 10px; right: 10px; border-bottom: 1px solid var(--eco-ink); border-right: 1px solid var(--eco-ink); }
.eco-mod-topline { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.eco-mod-eyebrow { font-family: var(--eco-font-data); font-size: 10.5px; letter-spacing: 0.14em; color: var(--eco-text-3); display: inline-flex; align-items: center; flex-wrap: wrap; }
.eco-mod-slash { color: var(--eco-ink); margin: 0 6px; }
.eco-mod-dot { margin: 0 8px; color: var(--eco-line-2); }
.eco-mod-coord { margin-left: 10px; color: var(--eco-ink); opacity: 0.8; }
.eco-mod-rule { position: relative; border: none; border-top: 1px solid var(--eco-line-2); margin: 12px 0 18px; }
.eco-mod-title { position: relative; font-family: var(--eco-font-display); font-size: clamp(23px, 2.6vw, 31px); font-weight: 500; line-height: 1.18; letter-spacing: -0.006em; color: var(--eco-text-1); margin: 0; }
.eco-mod-no { font-family: var(--eco-font-data); font-size: 0.6em; color: var(--eco-ink); margin-right: 12px; vertical-align: 0.06em; }
.eco-mod-lead { position: relative; margin: 12px 0 0; color: var(--eco-text-2); font-size: 15.5px; max-width: 720px; }
.eco-mod-head .eco-roles { margin-top: 14px; }
.eco-mod-body { position: relative; margin-top: 22px; }

.eco-stamp { display: inline-flex; align-items: center; gap: 5px; font-family: var(--eco-font-data); font-size: 10px; font-weight: 500; letter-spacing: 0.11em; padding: 3px 8px; border-radius: 3px; border: 1px solid currentColor; white-space: nowrap; cursor: help; }
.eco-stamp--real { color: var(--eco-teal); background: var(--eco-teal-dim); }
.eco-stamp--reconstructed { color: var(--eco-ink); background: var(--eco-ink-dim); }
.eco-stamp--simulated { color: var(--eco-sky); background: var(--eco-sky-dim); }
.eco-stamp--illustrative { color: var(--eco-iris); background: var(--eco-iris-dim); }

.eco-roles { display: inline-flex; gap: 5px; flex-wrap: wrap; }
.eco-role { font-family: var(--eco-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--eco-text-3); border: 1px solid var(--eco-line-2); border-radius: 999px; padding: 2px 8px; cursor: help; }

.eco-caption { display: flex; gap: 9px; align-items: baseline; margin-top: 12px; font-family: var(--eco-font-data); font-size: 11px; line-height: 1.5; color: var(--eco-text-3); }
.eco-caption-tag { flex: 0 0 auto; color: var(--eco-ink); letter-spacing: 0.05em; }

/* map plate */
.eco-plate { position: relative; padding: 18px; border: 1px solid var(--eco-line-2); border-radius: var(--eco-r-md); background: var(--eco-bg-2); }
.eco-plate-tick { position: absolute; width: 8px; height: 8px; }
.eco-plate-tick--tl { top: 6px; left: 6px; border-top: 1px solid var(--eco-ink); border-left: 1px solid var(--eco-ink); }
.eco-plate-tick--tr { top: 6px; right: 6px; border-top: 1px solid var(--eco-ink); border-right: 1px solid var(--eco-ink); }
.eco-plate-tick--bl { bottom: 6px; left: 6px; border-bottom: 1px solid var(--eco-ink); border-left: 1px solid var(--eco-ink); }
.eco-plate-tick--br { bottom: 6px; right: 6px; border-bottom: 1px solid var(--eco-ink); border-right: 1px solid var(--eco-ink); }
.eco-plate-coord { position: absolute; top: 6px; right: 16px; font-family: var(--eco-font-data); font-size: 9.5px; letter-spacing: 0.08em; color: var(--eco-text-3); }

.eco-legend { list-style: none; margin: 12px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 16px; }
.eco-legend li { display: inline-flex; align-items: center; gap: 6px; font-family: var(--eco-font-data); font-size: 11px; color: var(--eco-text-2); }
.eco-legend-swatch { width: 12px; height: 12px; border-radius: 3px; }

.eco-sowhat { display: flex; align-items: baseline; gap: 12px; margin-top: 24px; padding: 12px 16px; background: var(--eco-bg-2); border-left: 2px solid var(--eco-ink); border-radius: 0 var(--eco-r-sm) var(--eco-r-sm) 0; }
.eco-sowhat-label { flex: 0 0 auto; font-family: var(--eco-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: var(--eco-ink); }
.eco-sowhat-text { margin: 0; font-family: var(--eco-font-display); font-size: 16px; font-style: italic; line-height: 1.5; color: var(--eco-text-1); }

.eco-reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.5s var(--eco-ease), transform 0.5s var(--eco-ease); }
.eco-reveal.in { opacity: 1; transform: none; }

.eco-panel { background: var(--eco-bg-2); border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-md); }
.eco-tag { display: inline-flex; align-items: center; gap: 5px; font-family: var(--eco-font-data); font-size: 10.5px; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--eco-line-2); color: var(--eco-text-3); }
.eco-tag--ink { color: var(--eco-ink); border-color: var(--eco-ink); background: var(--eco-ink-dim); }
.eco-tag--teal { color: var(--eco-teal); border-color: var(--eco-teal); background: var(--eco-teal-dim); }
.eco-tag--sky { color: var(--eco-sky); border-color: var(--eco-sky); background: var(--eco-sky-dim); }
.eco-tag--red { color: var(--eco-red); border-color: var(--eco-red); background: var(--eco-red-dim); }
.eco-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--eco-font-body); font-size: 13px; font-weight: 600; color: var(--eco-text-1); background: var(--eco-bg-3); border: 1px solid var(--eco-line-2); border-radius: var(--eco-r-sm); padding: 8px 14px; transition: border-color 160ms var(--eco-ease), background 160ms var(--eco-ease), transform 110ms var(--eco-ease); }
.eco-btn:hover { border-color: var(--eco-ink); }
.eco-btn:active { transform: translateY(1px); }
.eco-btn.is-on { color: var(--eco-bg-0); background: var(--eco-ink); border-color: transparent; }

/* shared table */
.eco-table-wrap { overflow-x: auto; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-md); }
.eco-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 540px; }
.eco-table thead th { text-align: left; font-family: var(--eco-font-data); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--eco-text-3); padding: 12px 16px; background: var(--eco-bg-3); border-bottom: 1px solid var(--eco-line-2); white-space: nowrap; }
.eco-table tbody td { padding: 13px 16px; border-bottom: 1px solid var(--eco-line-1); color: var(--eco-text-2); line-height: 1.5; vertical-align: top; }
.eco-table tbody tr:last-child td { border-bottom: none; }
.eco-table-lead { color: var(--eco-text-1); font-weight: 500; }
.eco-code { margin: 14px 0 0; padding: 16px 18px; background: var(--eco-bg-0); border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-sm); overflow-x: auto; font-family: var(--eco-font-data); font-size: 12px; line-height: 1.65; color: var(--eco-text-2); }
.eco-code code { white-space: pre; }

@media (max-width: 767px) {
  .eco-module { padding: 20px 16px 22px; }
  .eco-mod-body { margin-top: 18px; }
  .eco-table-wrap { border: none; overflow: visible; }
  .eco-table { min-width: 0; }
  .eco-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .eco-table, .eco-table tbody, .eco-table tr, .eco-table td { display: block; width: 100%; }
  .eco-table tr { border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-sm); margin-bottom: 10px; background: var(--eco-bg-2); }
  .eco-table td { border-bottom: 1px solid var(--eco-line-1); padding: 10px 14px; }
  .eco-table td::before { content: attr(data-label); display: block; font-family: var(--eco-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--eco-text-3); margin-bottom: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .eco *, .eco *::before, .eco *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
  .eco-reveal { opacity: 1; transform: none; transition: none; }
}
`);
