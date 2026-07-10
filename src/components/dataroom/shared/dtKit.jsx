import React from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView, mulberry32 } from '../../evidence-lab/shared/labKit.jsx';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView, mulberry32 };

// ---- provenance system (single source of truth) ---------------------------
// Every module carries one tier. Color is never the only channel — each tier
// also has a distinct glyph silhouette (survives grayscale/printing).
export const BADGE_TERMS = {
    real:          { en: 'REAL',          zh: '真實' },
    reconstructed: { en: 'RECONSTRUCTED', zh: '重建樣本' },
    simulated:     { en: 'SIMULATED',     zh: '模擬資料' },
    illustrative:  { en: 'ILLUSTRATIVE',  zh: '示意呈現' },
};

const BADGE_GLYPHS = {
    real: <path d="M4 12.5l5 5 11-11" />,
    reconstructed: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10.5h16M4 15.5h16" /></>,
    simulated: <circle cx="12" cy="12" r="8" strokeDasharray="3 3.4" />,
    illustrative: <><circle cx="12" cy="12" r="8" /><path d="M6.5 13c1.4-2 3.4-2 5-.2 1.5 1.8 3.4 1.8 5-.2" /></>,
};

function BadgeGlyph({ tier }) {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {BADGE_GLYPHS[tier] || BADGE_GLYPHS.reconstructed}
        </svg>
    );
}

// Database "audit cell" styling: a bracketed mono row-tag, not a wire stamp.
export function ProvenanceBadge({ tier, note }) {
    const { lang } = useI18n();
    const term = (BADGE_TERMS[tier] || BADGE_TERMS.reconstructed)[lang];
    return (
        <span className={`dt-badge dt-badge-${tier}`} title={note} aria-label={note ? `${term}: ${note}` : term}>
            <BadgeGlyph tier={tier} />
            <span>{term}</span>
        </span>
    );
}

// ---- role chips (passive, tooltip only) ------------------------------------
export const ROLE_LABELS = {
    AIPD: { en: 'AI Product Designer', zh: 'AI 產品設計' },
    UXR:  { en: 'UX Researcher',       zh: 'UX 研究員' },
    PD:   { en: 'Product Designer',    zh: '產品設計師' },
    FE:   { en: 'Front-End Engineer',  zh: '前端工程師' },
    TPM:  { en: 'Technical PM',        zh: '技術 PM' },
};

export function RoleChips({ roles = [] }) {
    const { lang } = useI18n();
    return (
        <div className="dt-role-map" aria-label={lang === 'zh' ? '適用職能' : 'Target roles'}>
            {roles.map(role => (
                <span className="dt-role-chip" key={role} title={(ROLE_LABELS[role] || {})[lang] || role}>
                    {role}
                </span>
            ))}
        </div>
    );
}

// ---- module frame -----------------------------------------------------------
// mod = { id, num, tone, badge, badgeNote, roles, kicker: {en,zh} }
export default function SectionModule({ mod, title, lead, soWhat, children }) {
    const { lang } = useI18n();
    const accent = mod.tone || 'var(--dt-teal)';
    const kicker = mod.kicker ? mod.kicker[lang] : '';
    return (
        <section className="dt dt-module" id={mod.id} aria-labelledby={`${mod.id}-t`} style={{ '--dt-accent': accent }}>
            <header className="dt-mod-head">
                <div className="dt-mod-num" aria-hidden="true"><span>{mod.num}</span></div>
                <div className="dt-mod-headings">
                    <div className="dt-mod-topline">
                        <span className="dt-eyebrow" style={{ color: accent }}>
                            {kicker} <span className="dt-eyebrow-tag">· dt.m{mod.num}</span>
                        </span>
                        <ProvenanceBadge tier={mod.badge} note={mod.badgeNote ? mod.badgeNote[lang] : undefined} />
                    </div>
                    <h3 className="dt-display" id={`${mod.id}-t`}>{title}</h3>
                    {lead && <p className="dt-lead">{lead}</p>}
                    <RoleChips roles={mod.roles} />
                </div>
            </header>
            <div className="dt-rule" role="presentation" />
            <div className="dt-mod-body">{children}</div>
            {soWhat && (
                <footer className="dt-sowhat">
                    <span className="dt-sowhat-tag">{lang === 'zh' ? '重點 →' : 'READ →'}</span>
                    <p>{soWhat}</p>
                </footer>
            )}
        </section>
    );
}

injectStyles('dt-shared', `
.dt {
  --dt-bg-0: #060709;
  --dt-bg-1: #0C0E12;
  --dt-bg-2: #14171D;
  --dt-bg-3: #1C2028;
  --dt-line-1: #262B35;
  --dt-line-2: #333A47;
  --dt-text-1: #F2F0EB;
  --dt-text-2: #A8ADB8;
  --dt-text-3: #6B7280;
  --dt-teal: #35C2B0;
  --dt-teal-dim: rgba(53,194,176,0.12);
  --dt-amber: #E8A33D;
  --dt-amber-dim: rgba(232,163,61,0.12);
  --dt-red: #E5675A;
  --dt-red-dim: rgba(229,103,90,0.12);
  --dt-sky: #57A6E8;
  --dt-iris: #9B95E6;
  --dt-font-display: 'Newsreader', 'Noto Serif TC', serif;
  --dt-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --dt-font-data: 'JetBrains Mono', monospace;
  --dt-r-sm: 5px;
  --dt-r-md: 9px;
  --dt-r-lg: 14px;
  --dt-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--dt-font-body);
  color: var(--dt-text-2);
  line-height: 1.6;
}
.dt *, .dt *::before, .dt *::after { box-sizing: border-box; }
:where(.dt button) { font: inherit; color: inherit; background: none; border: none; padding: 0; text-align: inherit; cursor: pointer; }
.dt :is(button, a, input, select, [tabindex="0"], [role="slider"]):focus-visible {
  outline: 2px solid var(--dt-accent, var(--dt-teal)); outline-offset: 2px; border-radius: 3px;
}
.dt-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

.dt-eyebrow { font-family: var(--dt-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; line-height: 1; }
.dt-eyebrow-tag { color: var(--dt-text-3); font-weight: 400; letter-spacing: 0.08em; }
.dt-display { font-family: var(--dt-font-display); font-size: clamp(22px, 2.4vw, 30px); font-weight: 500; line-height: 1.2; color: var(--dt-text-1); margin: 10px 0 0; }
.dt-lead { margin: 10px 0 0; font-size: 15px; line-height: 1.7; color: var(--dt-text-2); max-width: 660px; }
.dt-mono { font-family: var(--dt-font-data); }
.dt-data-sm { font-family: var(--dt-font-data); font-size: 12px; letter-spacing: 0.04em; line-height: 1.5; }

/* provenance badge — "audit cell" tag */
.dt-badge { display: inline-flex; align-items: center; gap: 5px; font-family: var(--dt-font-data); font-size: 10.5px; letter-spacing: 0.08em; padding: 3px 7px 3px 6px; border-radius: 999px; border: 1px solid var(--dt-line-2); color: var(--dt-text-3); white-space: nowrap; cursor: default; }
.dt-badge-real { color: var(--dt-teal); border-color: var(--dt-teal); }
.dt-badge-reconstructed { color: var(--dt-sky); border-color: var(--dt-sky); }
.dt-badge-simulated { color: var(--dt-amber); border-color: var(--dt-amber); }
.dt-badge-illustrative { color: var(--dt-iris); border-color: var(--dt-iris); }

/* role chips */
.dt-role-map { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
.dt-role-chip { font-family: var(--dt-font-data); font-size: 10.5px; letter-spacing: 0.06em; color: var(--dt-text-3); border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); padding: 3px 7px; cursor: default; }

/* module frame */
.dt-module { position: relative; background: var(--dt-bg-1); border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-lg); padding: 30px; margin: 0 0 22px; }
.dt-mod-head { display: flex; gap: 18px; align-items: flex-start; }
.dt-mod-num { flex: 0 0 auto; padding-top: 3px; }
.dt-mod-num > span { font-family: var(--dt-font-data); font-size: 24px; font-weight: 500; color: var(--dt-accent, var(--dt-teal)); line-height: 1; }
.dt-mod-headings { min-width: 0; flex: 1; }
.dt-mod-topline { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }

/* console rule — the dialect motif: a ruled divider with a tick count */
.dt-rule { position: relative; height: 1px; background: var(--dt-line-1); margin: 22px 0; }
.dt-rule::before { content: ''; position: absolute; left: 0; top: -3px; width: 34px; height: 7px; background-image: repeating-linear-gradient(90deg, var(--dt-line-2) 0 1px, transparent 1px 5px); }

.dt-mod-body { margin-top: 2px; }

/* so-what strip */
.dt-sowhat { display: flex; gap: 10px; align-items: baseline; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--dt-line-1); }
.dt-sowhat-tag { flex: 0 0 auto; font-family: var(--dt-font-data); font-size: 10.5px; letter-spacing: 0.14em; color: var(--dt-accent, var(--dt-teal)); }
.dt-sowhat p { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--dt-text-2); }

/* reusable primitives */
.dt-panel { background: var(--dt-bg-2); border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-md); }
.dt-btn { display: inline-flex; align-items: center; gap: 7px; font-family: var(--dt-font-body); font-size: 13px; font-weight: 600; color: var(--dt-text-1); background: var(--dt-bg-3); border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); padding: 8px 14px; transition: border-color 160ms var(--dt-ease), transform 120ms var(--dt-ease); }
.dt-btn:hover { border-color: var(--dt-accent, var(--dt-teal)); }
.dt-btn:active { transform: translateY(1px); }
.dt-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
.dt-btn[aria-pressed="true"] { color: #060709; background: var(--dt-accent, var(--dt-teal)); border-color: transparent; }
.dt-tag { display: inline-flex; align-items: center; gap: 6px; font-family: var(--dt-font-data); font-size: 11px; letter-spacing: 0.05em; padding: 3px 8px; border-radius: 4px; border: 1px solid currentColor; }
.dt-table { width: 100%; border-collapse: collapse; font-family: var(--dt-font-data); font-size: 12.5px; }
.dt-table th, .dt-table td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--dt-line-1); color: var(--dt-text-2); vertical-align: top; }
.dt-table th { color: var(--dt-text-3); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; font-size: 10.5px; }
.dt-table tr:last-child td { border-bottom: none; }

@media (max-width: 767px) {
  .dt-module { padding: 20px 16px; }
  .dt-mod-head { gap: 12px; }
  .dt-mod-num > span { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .dt *, .dt *::before, .dt *::after { animation: none !important; transition-duration: 100ms !important; transition-property: opacity, background-color, border-color, color !important; }
}
`);
