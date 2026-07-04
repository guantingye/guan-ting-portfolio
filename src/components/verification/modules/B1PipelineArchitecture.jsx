import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.B1;
const ACCENT = PHASE_MAP[M.phase].accent;

export default function B1PipelineArchitecture() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const reduced = usePrefersReducedMotion();
    const [active, setActive] = useState('resolve');

    return (
        <ModuleFrame id="vf-b1" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className={`vf-b1${reduced ? ' reduced' : ''}`} style={{ '--vf-accent': ACCENT }}>
                <p className="vf-caption vf-b1-flownote">{c.flowNote}</p>
                <div className="vf-b1-track" role="list" aria-label={c.title}>
                    {M.nodes.map((n, i) => (
                        <React.Fragment key={n.id}>
                            <button
                                role="listitem"
                                className={`vf-b1-node ${n.kind}${active === n.id ? ' on' : ''}`}
                                aria-pressed={active === n.id}
                                onMouseEnter={() => setActive(n.id)}
                                onFocus={() => setActive(n.id)}
                                onClick={() => setActive(n.id)}>
                                <span className="vf-b1-node-idx">{String(i + 1).padStart(2, '0')}</span>
                                <span className="vf-b1-node-name">{c.nodeNames[n.id]}</span>
                            </button>
                            {i < M.nodes.length - 1 && <span className="vf-b1-pipe" aria-hidden="true"><span className="vf-b1-flow" /></span>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="vf-b1-detail" aria-live="polite">
                    <span className="vf-b1-detail-name">{c.nodeNames[active]}</span>
                    <ul>{c.nodeDetails[active].map((d, i) => <li key={i}>{d}</li>)}</ul>
                </div>

                <div className="vf-b1-callouts">
                    {c.callouts.map((co, i) => (
                        <div className="vf-b1-callout" key={i}>
                            <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.calloutLabel}</span>
                            <h5>{co.t}</h5>
                            <p>{co.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-b1-style', `
.vf-b1-flownote { display: block; margin-bottom: 10px; }
.vf-b1-track { display: flex; align-items: center; overflow-x: auto; padding: 6px 2px 14px; scrollbar-width: thin; }
.vf-b1-node { flex: 0 0 auto; display: flex; flex-direction: column; gap: 4px; align-items: flex-start; padding: 11px 14px; border-radius: var(--vf-r-sm); border: 1px solid var(--vf-line-2); background: var(--vf-bg-2); transition: border-color 160ms var(--vf-ease), background 160ms var(--vf-ease), transform 140ms var(--vf-ease); }
.vf-b1-node.io { background: var(--vf-bg-3); }
.vf-b1-node.on { border-color: var(--vf-accent); background: color-mix(in srgb, var(--vf-accent) 12%, var(--vf-bg-2)); transform: translateY(-2px); }
.vf-b1-node-idx { font-family: var(--vf-font-data); font-size: 9.5px; color: var(--vf-accent); letter-spacing: 0.08em; }
.vf-b1-node-name { font-size: 12.5px; font-weight: 600; color: var(--vf-text-1); white-space: nowrap; }
.vf-b1-pipe { flex: 0 0 26px; height: 2px; background: var(--vf-line-2); position: relative; overflow: hidden; border-radius: 2px; }
.vf-b1-flow { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, var(--vf-accent), transparent); background-size: 40% 100%; background-repeat: no-repeat; animation: vf-b1-move 1.8s linear infinite; }
@keyframes vf-b1-move { from { background-position: -40% 0; } to { background-position: 140% 0; } }
.vf-b1.reduced .vf-b1-pipe { background: var(--vf-accent); opacity: 0.5; }
.vf-b1.reduced .vf-b1-flow { display: none; }
.vf-b1-detail { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-left: 2px solid var(--vf-accent); border-radius: var(--vf-r-md); padding: 14px 16px; margin-bottom: 14px; }
.vf-b1-detail-name { font-size: 14px; font-weight: 600; color: var(--vf-text-1); }
.vf-b1-detail ul { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 10px; }
.vf-b1-detail li { font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-text-2); background: var(--vf-bg-3); border-radius: 4px; padding: 4px 9px; }
.vf-b1-callouts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.vf-b1-callout { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 14px 16px; }
.vf-b1-callout h5 { margin: 8px 0 6px; font-size: 13.5px; color: var(--vf-text-1); }
.vf-b1-callout p { margin: 0; font-size: 12.5px; line-height: 1.55; color: var(--vf-text-2); }
@media (max-width: 720px) { .vf-b1-callouts { grid-template-columns: 1fr; } }
`);
