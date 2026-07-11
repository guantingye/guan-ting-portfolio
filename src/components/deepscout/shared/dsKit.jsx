import React from 'react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView, mulberry32 } from '../../evidence-lab/shared/labKit.jsx';
import { ACTS, BADGES, SKILL_MAP } from '../data/dsContent.js';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView, mulberry32 };

// ---- authenticity stamp (file-tab dialect) --------------------------------
const TIER_GLYPH = {
    real:          <><circle cx="7" cy="7" r="5.6" /><path d="M4.6 7.2l1.7 1.7 3.1-3.4" /></>,
    reconstructed: <><circle cx="7" cy="7" r="5.6" /><path d="M7 3.9v3.3l2.2 2.2" /></>,
    illustrative:  <><path d="M7 1.6l5.4 3.1v4.6L7 12.4 1.6 9.3V4.7z" /></>,
};
export function AuthBadge({ tier }) {
    const { lang } = useI18n();
    const b = BADGES[tier];
    return (
        <span className={`ds-stamp ds-stamp--${tier}`} title={b[lang] ?? b.en}>
            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor"
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {TIER_GLYPH[tier]}
            </svg>
            <span>{b.term}</span>
            <span className="ds-sr-only"> — {b[lang] ?? b.en}</span>
        </span>
    );
}

// ---- skill chips (passive labels, no filtering) ---------------------------
export function SkillChips({ skills }) {
    const { lang } = useI18n();
    return (
        <span className="ds-skillchips" aria-label="Evidence for">
            {skills.map(id => (
                <span key={id} className="ds-skillchip" title={SKILL_MAP[id][lang] ?? SKILL_MAP[id].en}>{SKILL_MAP[id][lang] ?? SKILL_MAP[id].en}</span>
            ))}
        </span>
    );
}

// ---- module frame (file-folder dispatch header) ---------------------------
export default function ModuleFrame({ mod, title, lead, soWhat, children }) {
    const { lang } = useI18n();
    const act = ACTS.find(a => a.id === mod.act);
    const fileTab = `DS-${mod.num} · ${mod.key}`;
    return (
        <section className="ds ds-module" id={mod.id} aria-labelledby={`${mod.id}-t`}>
            <div className="ds-dispatch">
                <span className="ds-dispatch-line">
                    ACT {act.num} / {act.name[lang].toUpperCase()}
                    <span className="ds-dispatch-sep">·</span>
                    <span className="ds-dispatch-id">{fileTab}</span>
                </span>
                <AuthBadge tier={mod.badge} />
            </div>
            <header className="ds-mod-head">
                <h3 className="ds-display" id={`${mod.id}-t`}>{title}</h3>
                <p className="ds-mod-lead">{lead}</p>
                <SkillChips skills={mod.skills} />
            </header>
            <hr className="ds-rule" />
            <div className="ds-mod-body">{children}</div>
            {soWhat && (
                <div className="ds-sowhat">
                    <span className="ds-sowhat-label">{lang === 'zh' ? '重點 →' : 'READ →'}</span>
                    <p className="ds-sowhat-text">{soWhat}</p>
                </div>
            )}
        </section>
    );
}

// ---- reveal wrapper ---------------------------------------------------------
export function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
    return (
        <div ref={ref} className={`ds-reveal${inView ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

// ---- act divider ------------------------------------------------------------
export function ActDivider({ act, count }) {
    const { lang } = useI18n();
    const [ref, inView] = useInView({ rootMargin: '0px 0px -25% 0px' });
    return (
        <div ref={ref} className={`ds ds-actbreak${inView ? ' in' : ''}`}>
            <div className="ds-actbreak-rule" aria-hidden="true">
                {Array.from({ length: 24 }, (_, i) => (
                    <span key={i} className="ds-tick" style={{ opacity: 0.25 + (i % 4) * 0.18 }} />
                ))}
            </div>
            <div className="ds-actbreak-row">
                <span className="ds-actbreak-num">ACT {act.num}</span>
                <div className="ds-actbreak-headings">
                    <h2 className="ds-actbreak-name">{act.name[lang]}</h2>
                    <span className="ds-actbreak-tag">{act.tag[lang]}</span>
                </div>
                <span className="ds-actbreak-count">{String(count).padStart(2, '0')} {lang === 'zh' ? '件' : 'items'}</span>
            </div>
        </div>
    );
}

// small primitives -----------------------------------------------------------
export function Tag({ children, tone = 'neutral' }) {
    return <span className={`ds-tag ds-tag--${tone}`}>{children}</span>;
}
export function onActivate(fn) {
    return e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); } };
}

injectStyles('ds-shared', `
.ds {
  --ds-bg-0: #060709;
  --ds-bg-1: #0C0E12;
  --ds-bg-2: #14171D;
  --ds-bg-3: #1C2028;
  --ds-line-1: #262B35;
  --ds-line-2: #333A47;
  --ds-text-1: #F2F0EB;
  --ds-text-2: #A8ADB8;
  --ds-text-3: #6B7280;
  --ds-teal: #35C2B0;
  --ds-teal-dim: rgba(53,194,176,0.12);
  --ds-amber: #E8A33D;
  --ds-amber-dim: rgba(232,163,61,0.12);
  --ds-red: #E5675A;
  --ds-red-dim: rgba(229,103,90,0.12);
  --ds-sky: #57A6E8;
  --ds-sky-dim: rgba(87,166,232,0.12);
  --ds-iris: #9B95E6;
  --ds-iris-dim: rgba(155,149,230,0.12);
  --ds-slate: #94A0B0;
  --ds-slate-dim: rgba(148,160,176,0.10);
  --ds-font-display: 'Fraunces', 'Noto Serif TC', Georgia, serif;
  --ds-font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --ds-font-data: 'JetBrains Mono', monospace;
  --ds-r-sm: 5px;
  --ds-r-md: 9px;
  --ds-r-lg: 14px;
  --ds-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--ds-font-body);
  color: var(--ds-text-2);
  line-height: 1.62;
  font-size: 16px;
}
.ds *, .ds *::before, .ds *::after { box-sizing: border-box; }
:where(.ds button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.ds :is(button, a, input, select, [tabindex="0"], [role="slider"], [role="option"], [role="tab"]):focus-visible {
  outline: 2px solid var(--ds-teal); outline-offset: 2px; border-radius: 3px;
}
.ds-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.ds-mono { font-family: var(--ds-font-data); }
.ds-eyebrow { font-family: var(--ds-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; line-height: 1; color: var(--ds-text-3); }
.ds-display { font-family: var(--ds-font-display); font-size: clamp(24px, 2.7vw, 33px); font-weight: 500; line-height: 1.16; letter-spacing: -0.008em; color: var(--ds-text-1); margin: 0; }
.ds-data-sm { font-family: var(--ds-font-data); font-size: 12px; letter-spacing: 0.03em; line-height: 1.5; }

/* ---- module frame (file-folder tab) ---- */
.ds-module {
  position: relative;
  background: var(--ds-bg-1);
  border: 1px solid var(--ds-line-1);
  border-top: 2px solid var(--ds-line-2);
  border-radius: 0 0 var(--ds-r-lg) var(--ds-r-lg);
  padding: 22px 30px 26px;
  margin: 0 0 18px;
}
.ds-dispatch {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 14px; margin-bottom: 16px;
  border-bottom: 1px dashed var(--ds-line-1);
}
.ds-dispatch-line { font-family: var(--ds-font-data); font-size: 10.5px; letter-spacing: 0.14em; color: var(--ds-text-3); display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ds-dispatch-sep { color: var(--ds-line-2); }
.ds-dispatch-id { color: var(--ds-teal); }
.ds-mod-lead { margin: 10px 0 0; color: var(--ds-text-2); font-size: 15px; max-width: 680px; }
.ds-mod-head { }
.ds-mod-body { margin-top: 4px; }
.ds-rule { border: none; border-top: 1px solid var(--ds-line-1); margin: 18px 0; }

/* authenticity stamp */
.ds-stamp { display: inline-flex; align-items: center; gap: 5px; font-family: var(--ds-font-data); font-size: 10px; font-weight: 500; letter-spacing: 0.12em; padding: 3px 8px; border-radius: 3px; border: 1px solid currentColor; white-space: nowrap; cursor: help; }
.ds-stamp--real { color: var(--ds-teal); background: var(--ds-teal-dim); }
.ds-stamp--reconstructed { color: var(--ds-amber); background: var(--ds-amber-dim); }
.ds-stamp--illustrative { color: var(--ds-slate); background: var(--ds-slate-dim); }

/* skill chips */
.ds-skillchips { display: inline-flex; gap: 5px; flex-wrap: wrap; margin-top: 14px; }
.ds-skillchip { font-family: var(--ds-font-data); font-size: 10px; letter-spacing: 0.06em; color: var(--ds-text-3); border: 1px solid var(--ds-line-2); border-radius: 999px; padding: 2px 9px; }

/* so-what strip */
.ds-sowhat { display: flex; align-items: baseline; gap: 12px; margin-top: 22px; padding: 12px 16px; background: var(--ds-bg-2); border-left: 2px solid var(--ds-teal); border-radius: 0 var(--ds-r-sm) var(--ds-r-sm) 0; }
.ds-sowhat-label { flex: 0 0 auto; font-family: var(--ds-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: var(--ds-teal); }
.ds-sowhat-text { margin: 0; font-family: var(--ds-font-display); font-size: 16px; font-style: italic; line-height: 1.5; color: var(--ds-text-1); }

/* ---- shared primitives ---- */
.ds-panel { background: var(--ds-bg-2); border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); }
.ds-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--ds-font-body); font-size: 13px; font-weight: 600; color: var(--ds-text-1); background: var(--ds-bg-3); border: 1px solid var(--ds-line-2); border-radius: var(--ds-r-sm); padding: 8px 14px; transition: border-color 160ms var(--ds-ease), background 160ms var(--ds-ease), transform 110ms var(--ds-ease); }
.ds-btn:hover { border-color: var(--ds-teal); }
.ds-btn:active { transform: translateY(1px); }
.ds-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
.ds-btn.is-on { color: var(--ds-bg-0); background: var(--ds-teal); border-color: transparent; }
.ds-tag { display: inline-flex; align-items: center; gap: 5px; font-family: var(--ds-font-data); font-size: 10.5px; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--ds-line-2); color: var(--ds-text-3); }
.ds-tag--teal { color: var(--ds-teal); border-color: var(--ds-teal); background: var(--ds-teal-dim); }
.ds-tag--amber { color: var(--ds-amber); border-color: var(--ds-amber); background: var(--ds-amber-dim); }
.ds-tag--red { color: var(--ds-red); border-color: var(--ds-red); background: var(--ds-red-dim); }
.ds-caption { font-family: var(--ds-font-data); font-size: 11px; letter-spacing: 0.05em; color: var(--ds-text-3); }

/* reveal */
.ds-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s var(--ds-ease), transform 0.6s var(--ds-ease); }
.ds-reveal.in { opacity: 1; transform: none; }

/* ---- act divider ---- */
.ds-actbreak { margin: 40px 0 20px; opacity: 0; transform: translateY(14px); transition: opacity 0.6s var(--ds-ease), transform 0.6s var(--ds-ease); }
.ds-actbreak.in { opacity: 1; transform: none; }
.ds-actbreak-rule { display: flex; gap: 3px; align-items: flex-end; height: 12px; margin-bottom: 16px; }
.ds-tick { flex: 1; height: 100%; border-left: 1px solid var(--ds-teal); }
.ds-actbreak-row { display: flex; align-items: baseline; gap: 20px; }
.ds-actbreak-num { font-family: var(--ds-font-data); font-size: 13px; font-weight: 500; letter-spacing: 0.24em; color: var(--ds-teal); white-space: nowrap; }
.ds-actbreak-headings { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; }
.ds-actbreak-name { font-family: var(--ds-font-display); font-size: clamp(26px, 3.4vw, 40px); font-weight: 500; color: var(--ds-text-1); margin: 0; letter-spacing: -0.01em; }
.ds-actbreak-tag { font-size: 13px; color: var(--ds-text-3); }
.ds-actbreak-count { font-family: var(--ds-font-data); font-size: 11px; color: var(--ds-text-3); border: 1px solid var(--ds-line-2); border-radius: 999px; padding: 2px 10px; white-space: nowrap; }

@media (max-width: 767px) {
  .ds-module { padding: 18px 16px 22px; }
  .ds-actbreak-row { flex-direction: column; gap: 8px; }
  .ds-actbreak-count { align-self: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .ds *, .ds *::before, .ds *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
  .ds-reveal, .ds-actbreak { opacity: 1; transform: none; transition: none; }
}
`);
