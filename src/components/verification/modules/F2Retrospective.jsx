import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.F2;
const ACCENT = PHASE_MAP[M.phase].accent;

export default function F2Retrospective() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;

    // F2 intentionally has no footer — it is the page's own closing (spec F2).
    return (
        <ModuleFrame id="vf-f2" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier}>
            <div className="vf-f2" style={{ '--vf-accent': ACCENT }}>
                <span className="vf-eyebrow vf-f2-label" style={{ color: ACCENT }}>{c.tradeLabel}</span>
                <div className="vf-f2-trades">
                    {M.tradeoffs.map(id => {
                        const to = c.tradeoffs[id];
                        return (
                            <div className="vf-f2-trade" key={id}>
                                <p className="vf-f2-choice">{to.choice}</p>
                                <p className="vf-f2-line"><span className="vf-f2-key">↓</span>{to.cost}</p>
                                <p className="vf-f2-line"><span className="vf-f2-key">↻</span>{to.today}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="vf-f2-next">
                    <span className="vf-eyebrow vf-f2-label" style={{ color: ACCENT }}>{c.nextLabel}</span>
                    <ul>
                        {c.next.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                </div>

                <blockquote className="vf-f2-quote">{c.quote}</blockquote>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-f2-style', `
.vf-f2-label { display: block; margin-bottom: 14px; }
.vf-f2-trades { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px; }
.vf-f2-trade { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); border-top: 2px solid var(--vf-accent); padding: 16px; }
.vf-f2-choice { margin: 0 0 12px; font-size: 14px; line-height: 1.55; color: var(--vf-text-1); font-weight: 500; }
.vf-f2-line { display: grid; grid-template-columns: 18px 1fr; gap: 6px; margin: 8px 0 0; font-size: 12.5px; line-height: 1.55; color: var(--vf-text-2); }
.vf-f2-key { font-family: var(--vf-font-data); color: var(--vf-accent); }
.vf-f2-next { margin-top: 26px; }
.vf-f2-next ul { margin: 0; padding: 0; list-style: none; }
.vf-f2-next li { position: relative; padding-left: 20px; margin-top: 10px; font-size: 14px; line-height: 1.6; color: var(--vf-text-2); }
.vf-f2-next li::before { content: ''; position: absolute; left: 2px; top: 9px; width: 6px; height: 6px; border-radius: 50%; background: var(--vf-accent); }
.vf-f2-quote { margin: 30px 0 4px; padding: 0 0 0 22px; border-left: 3px solid var(--vf-accent); font-family: var(--vf-font-display); font-size: clamp(19px, 2.4vw, 25px); font-weight: 500; font-style: italic; line-height: 1.4; color: var(--vf-text-1); }
`);
