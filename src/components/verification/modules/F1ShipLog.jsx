import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.F1;
const ACCENT = PHASE_MAP[M.phase].accent;

export default function F1ShipLog() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const [open, setOpen] = useState(null);

    return (
        <ModuleFrame id="vf-f1" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <ol className="vf-f1" style={{ '--vf-accent': ACCENT }}>
                {M.milestones.map(ms => {
                    const isOpen = open === ms.id;
                    return (
                        <li className="vf-f1-item" key={ms.id}>
                            <span className="vf-f1-dot" aria-hidden="true" />
                            <button
                                className="vf-f1-btn"
                                aria-expanded={isOpen}
                                onClick={() => setOpen(isOpen ? null : ms.id)}
                                onMouseEnter={() => setOpen(ms.id)}>
                                <span className="vf-f1-ver">{ms.ver}</span>
                                <span className="vf-f1-main">
                                    <span className="vf-f1-name">{c.milestoneNames[ms.id]}</span>
                                    <span className="vf-f1-meta">
                                        <span className="vf-f1-date">{ms.date}</span>
                                        <span className="vf-f1-tag">{ms.tag}</span>
                                    </span>
                                </span>
                            </button>
                            <div className={`vf-f1-why${isOpen ? ' open' : ''}`}>
                                <span className="vf-f1-why-label">{c.whyLabel}</span>
                                <p>{c.milestoneWhy[ms.id]}</p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </ModuleFrame>
    );
}

injectStyles('vf-f1-style', `
.vf-f1 { list-style: none; margin: 0; padding: 0 0 0 4px; position: relative; }
.vf-f1::before { content: ''; position: absolute; left: 9px; top: 6px; bottom: 6px; width: 1px; background: var(--vf-line-2); }
.vf-f1-item { position: relative; padding-left: 30px; padding-bottom: 4px; }
.vf-f1-dot { position: absolute; left: 5px; top: 15px; width: 9px; height: 9px; border-radius: 50%; background: var(--vf-bg-1); border: 2px solid var(--vf-accent); }
.vf-f1-btn { display: flex; align-items: center; gap: 14px; width: 100%; padding: 10px 12px; border-radius: var(--vf-r-sm); transition: background 160ms var(--vf-ease); }
.vf-f1-btn:hover { background: var(--vf-bg-2); }
.vf-f1-ver { font-family: var(--vf-font-data); font-size: 13px; font-weight: 500; color: var(--vf-accent); flex: 0 0 40px; }
.vf-f1-main { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex: 1 1 auto; min-width: 0; flex-wrap: wrap; }
.vf-f1-name { font-size: 14px; color: var(--vf-text-1); }
.vf-f1-meta { display: inline-flex; align-items: center; gap: 10px; }
.vf-f1-date { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-f1-tag { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.04em; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); border-radius: 999px; padding: 1px 8px; }
.vf-f1-why { max-height: 0; overflow: hidden; transition: max-height 260ms var(--vf-ease); }
.vf-f1-why.open { max-height: 120px; }
.vf-f1-why-label { display: block; font-family: var(--vf-font-data); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-accent); padding: 6px 12px 0; }
.vf-f1-why p { margin: 4px 12px 12px; font-size: 13px; line-height: 1.6; color: var(--vf-text-2); }
@media (prefers-reduced-motion: reduce) { .vf-f1-why { transition: none; } }
`);
